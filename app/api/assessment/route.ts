// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Assessment Submission Handler
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026
//         STRUCTURAL INTELLIGENCE REPORT TEMPLATE v1.0 Apr2026

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

import {
  processSubmission,
  generateSubmissionId,
  verifyWebsite,
  type AssessmentSubmission,
  type ScoredPayload,
  type SheetRow,
} from "@/lib/stage1";
import { renderReport } from "@/lib/stage1/reportRenderer";
import { renderPdf } from "@/lib/stage1/pdfRenderer";

// ============================================================
// CONFIG
// ============================================================

// Force Node.js runtime (Puppeteer does not run on Edge)
export const runtime = "nodejs";

// Extend function timeout for PDF generation
// Vercel Pro default is 60s; Hobby is 10s which may be tight on cold starts
export const maxDuration = 60;

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.send";

// Sheet tab names — must match the Google Sheet exactly
const TAB_NAMES: Record<string, string> = {
  qualified: "Qualified",
  below_threshold: "Below_Threshold",
  above_segment: "Above_Segment",
};
function generateReportUrl(submissionId: string): string {
  const base = process.env.NEXTAUTH_URL ?? "https://quantonlabs.com";
  return `${base}/assessment/report/${submissionId}`;
}
// ============================================================
// POST HANDLER
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const submission = (await req.json()) as AssessmentSubmission;

    // Validate required sections
    if (
      !submission.section_a ||
      !submission.section_b ||
      !submission.section_c ||
      !submission.section_d
    ) {
      return NextResponse.json(
        { error: "Incomplete submission — all four sections required." },
        { status: 400 }
      );
    }

    // 1. Verify website
    const websiteVerified = await verifyWebsite(submission.section_d.website);

    // 2. Score
    const scoredPayload = processSubmission(submission, websiteVerified);

    // 3. Identifiers
    const submissionId = generateSubmissionId();
    const now = new Date();
const submittedAt = `${now.getUTCDate().toString().padStart(2,'0')}/${(now.getUTCMonth()+1).toString().padStart(2,'0')}/${now.getUTCFullYear()} ${now.getUTCHours().toString().padStart(2,'0')}:${now.getUTCMinutes().toString().padStart(2,'0')} UTC`;

    // 4. Render HTML report (needed for both the client response and PDF)
    const html = renderReport(submission, scoredPayload, submissionId);

   // 5. Generate PDF + upload HTML and PDF to Blob in parallel
    const [pdfUrl, htmlBlobUrl] = await Promise.all([
      safeUploadPdf(submissionId, html),
      safeUploadHtml(submissionId, html),
    ]);
    const reportUrl = generateReportUrl(submissionId);

    // 6. Fire sheet write and Gmail notify in parallel (non-blocking)
 await Promise.allSettled([
      writeToSheet(
        submissionId,
        submittedAt,
        submission,
        scoredPayload,
        reportUrl,
        pdfUrl
      ),
      sendGmailNotification(submission, scoredPayload, reportUrl, pdfUrl),
      sendSubmitterEmail(submission, reportUrl, pdfUrl),
    ]);

    // 7. Return scored payload + URLs to client
    return NextResponse.json({
      submission_id: submissionId,
      report_url: reportUrl,
      pdf_url: pdfUrl,
      scored: scoredPayload,
    });
  } catch (err) {
    console.error("[Assessment submission failed]", err);
    return NextResponse.json(
      { error: "Submission processing failed." },
      { status: 500 }
    );
  }
}

// ============================================================
// PDF UPLOAD (VERCEL BLOB)
// ============================================================

async function safeUploadPdf(
  submissionId: string,
  html: string
): Promise<string> {
  try {
    const pdfBuffer = await renderPdf(html);
    const filename = `reports/${submissionId}.pdf`;

    const blob = await put(filename, pdfBuffer, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });

    return blob.url;
  } catch (err) {
    console.error("[PDF upload failed]", err);
    return "";
  }
}

async function safeUploadHtml(
  submissionId: string,
  html: string
): Promise<string> {
  try {
    const filename = `reports/${submissionId}.html`;

  const blob = await put(filename, html, {
      access: "public",
      contentType: "text/html; charset=utf-8",
      addRandomSuffix: false,
    });

    console.log("[HTML Blob URL]", blob.url);
    return blob.url;
  } catch (err) {
    console.error("[HTML upload failed]", err);
    return "";
  }
}

// ============================================================
// GOOGLE SHEETS WRITE
// ============================================================

async function getServiceAccountToken(scope: string): Promise<string> {
const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  if (!privateKeyRaw || !clientEmail) {
    throw new Error("Missing Google service account credentials.");
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  // Import the key using Web Crypto (Node 18+ native, no OpenSSL dependency)
 // Strip PEM headers, all whitespace, and any residual newline escape sequences
  const pemBody = privateKeyRaw
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\\n/g, "")
    .replace(/\n/g, "")
    .replace(/\r/g, "")
    .replace(/\s/g, "");
  const keyBuffer = Buffer.from(pemBody, "base64");

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Build the JWT manually
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" }))
    .toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signingInput = `${header}.${body}`;

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  const signedJwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

  // Exchange for an access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const { access_token } = await tokenRes.json();
  return access_token;
}

async function writeToSheet(
  submissionId: string,
  submittedAt: string,
  submission: AssessmentSubmission,
  scored: ScoredPayload,
  reportUrl: string,
  pdfUrl: string
): Promise<void> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID.");

    const accessToken = await getServiceAccountToken(SHEETS_SCOPE);
    const tabName = TAB_NAMES[scored.closing_variant];
    const range = `${tabName}!A1`;

    const row = buildSheetRow(
      submissionId,
      submittedAt,
      submission,
      scored,
      reportUrl,
      pdfUrl
    );

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
        range
      )}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [rowToArray(row)] }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Sheets API error: ${errorText}`);
    }
  } catch (err) {
    console.error("[Sheet write failed]", err);
  }
}

function buildSheetRow(
  submissionId: string,
  submittedAt: string,
  submission: AssessmentSubmission,
  scored: ScoredPayload,
  reportUrl: string,
  pdfUrl: string
): SheetRow {
  const { section_a, section_c, section_d } = submission;

  return {
    // Identity
    submission_id: submissionId,
    submitted_at: submittedAt,
    closing_variant: scored.closing_variant,

    // Respondent
    first_name: section_d.first_name,
    last_name: section_d.last_name,
    work_email: section_d.work_email,
    phone: section_d.phone,
    website: section_d.website,
    role: section_d.role,
    location: section_d.location ?? "",

    // Section A context
    revenue_band: section_a.revenue,
    team_size: section_a.team_size,
    integration_categories: section_a.operational_surface.join(", "),
    integration_category_count: section_a.operational_surface.length,

    // Section C
    priority_os: section_c.priority_os,
    outcome_text: section_c.outcome_text ?? "",

    // Normalized scores
    strategy_score: scored.scores.strategy.normalized,
    platform_score: scored.scores.platform.normalized,
    operations_score: scored.scores.operations.normalized,
    growth_score: scored.scores.growth.normalized,

    // Tiers
    strategy_tier: scored.scores.strategy.tier,
    platform_tier: scored.scores.platform.tier,
    operations_tier: scored.scores.operations.tier,
    growth_tier: scored.scores.growth.tier,

    // Ranking
    top_os: scored.top_os,
    top_os_score: scored.scores[scored.top_os].normalized,
    second_os: scored.second_os,
    second_os_score: scored.scores[scored.second_os].normalized,

    // Profile classifications
    complexity_profile: scored.complexity_profile,
    configuration_profile: scored.configuration_profile,

    // Flags
    decision_maker: scored.flags.decision_maker,
    free_email: scored.flags.free_email,
    phone_captured: scored.flags.phone_captured,
    website_verified: scored.flags.website_verified,
    above_threshold: scored.flags.above_threshold,
    below_threshold: scored.flags.below_threshold,
    owner_bottleneck: scored.flags.owner_bottleneck,
    fragmented_ai: scored.flags.fragmented_ai,
    compliance: scored.flags.compliance,
    atypical_profile: scored.flags.atypical_profile,

    // Report access
    report_url: reportUrl,
    pdf_url: pdfUrl,
    report_accessed: false,
    report_access_count: 0,

    // Stage 2 tracking
    stage_2_eligible: scored.closing_variant === "qualified",
    stage_2_status: "",
    stage_2_invited_at: "",
    stage_2_completed_at: "",
    call_booked: false,
    call_booked_at: "",
    discovery_brief_sent: "",
    agreement_sent: "",
    agreement_executed: "",
    lifecycle_stage: "stage_1_complete",

    // Ops
    notes: "",
    last_updated: submittedAt,
  };
}

function rowToArray(row: SheetRow): (string | number | boolean)[] {
  return [
    row.submission_id,
    row.submitted_at,
    row.closing_variant,
    row.first_name,
    row.last_name,
    row.work_email,
    row.phone,
    row.website,
    row.role,
    row.location,
    row.revenue_band,
    row.team_size,
    row.integration_categories,
    row.integration_category_count,
    row.priority_os,
    row.outcome_text,
    row.strategy_score,
    row.platform_score,
    row.operations_score,
    row.growth_score,
    row.strategy_tier,
    row.platform_tier,
    row.operations_tier,
    row.growth_tier,
    row.top_os,
    row.top_os_score,
    row.second_os,
    row.second_os_score,
    row.complexity_profile,
    row.configuration_profile,
    row.decision_maker,
    row.free_email,
    row.phone_captured,
    row.website_verified,
    row.above_threshold,
    row.below_threshold,
    row.owner_bottleneck,
    row.fragmented_ai,
    row.compliance,
    row.atypical_profile,
    row.report_url,
    row.pdf_url,
    row.report_accessed,
    row.report_access_count,
    row.stage_2_eligible,
    row.stage_2_status,
    row.stage_2_invited_at,
    row.stage_2_completed_at,
    row.call_booked,
    row.call_booked_at,
    row.discovery_brief_sent,
    row.agreement_sent,
    row.agreement_executed,
    row.lifecycle_stage,
    row.notes,
    row.last_updated,
  ];
}

// ============================================================
// GMAIL NOTIFICATION
// ============================================================

async function sendGmailNotification(
  submission: AssessmentSubmission,
  scored: ScoredPayload,
  reportUrl: string,
  pdfUrl: string
): Promise<void> {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const sendAs = process.env.GMAIL_SEND_AS;

    if (!privateKey || !clientEmail || !sendAs) {
      throw new Error("Missing Gmail environment variables.");
    }

// Domain-wide delegation via Web Crypto signed JWT — bypasses OpenSSL
    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      iss: clientEmail,
      scope: GMAIL_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
      sub: sendAs, // impersonate growth@quantonlabs.com
    };

const pemBody = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\\n/g, "")
    .replace(/\n/g, "")
    .replace(/\r/g, "")
    .replace(/\s/g, "");
  const keyBuffer = Buffer.from(pemBody, "base64");

    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      keyBuffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" }))
      .toString("base64url");
    const body = Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
    const signingInput = `${header}.${body}`;

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      Buffer.from(signingInput)
    );

    const signedJwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: signedJwt,
      }),
    });

    if (!tokenRes.ok) {
      const tokenErr = await tokenRes.text();
      throw new Error(`Gmail token exchange failed: ${tokenErr}`);
    }

const { access_token: gmailToken } = await tokenRes.json();
    console.log("[Gmail token obtained]", gmailToken ? "token present" : "token missing");

    const emailBody = buildNotificationBody(submission, scored, reportUrl, pdfUrl);
    const subject = "A New Assessment has been Completed";
    const raw = buildMimeMessage(sendAs, sendAs, subject, emailBody);

    const sendRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${gmailToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
      }
    );

const sendResBody = await sendRes.json();
    if (!sendRes.ok) {
      throw new Error(`Gmail send failed: ${JSON.stringify(sendResBody)}`);
    }

    console.log("[Gmail send response]", JSON.stringify(sendResBody));
  } catch (err) {
    console.error("[Gmail send failed]", err);
  }
}
async function sendSubmitterEmail(
  submission: AssessmentSubmission,
  reportUrl: string,
  pdfUrl: string
): Promise<void> {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const sendAs = process.env.GMAIL_SEND_AS;
    const toEmail = submission.section_d.work_email;

    if (!privateKey || !clientEmail || !sendAs || !toEmail) {
      throw new Error("Missing submitter email variables.");
    }

    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      iss: clientEmail,
      scope: GMAIL_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
      sub: sendAs,
    };

    const pemBody = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----/g, "")
      .replace(/-----END PRIVATE KEY-----/g, "")
      .replace(/\\n/g, "")
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(/\s/g, "");
    const keyBuffer = Buffer.from(pemBody, "base64");

    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      keyBuffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" }))
      .toString("base64url");
    const body = Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
    const signingInput = `${header}.${body}`;

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      Buffer.from(signingInput)
    );

    const signedJwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: signedJwt,
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      throw new Error(`Submitter token exchange failed: ${err}`);
    }

    const { access_token: gmailToken } = await tokenRes.json();

    const firstName = submission.section_d.first_name;
    const emailBody = [
      `Hi ${firstName},`,
      "",
      "Your Structural Intelligence Report from Quanton Labs is ready.",
      "",
      "View your full report here:",
      reportUrl,
      "",
      pdfUrl ? `Download PDF: ${pdfUrl}` : "",
      "",
      "This report is the output of your Stage 1 Structural Diagnostic. It maps your business across four operating systems and identifies where structural gaps are creating drag on growth, execution, and decision-making.",
      "",
      "If you have questions or would like to discuss your results, reply to this email or book a call directly:",
      "https://calendly.com/quantonlabs",
      "",
      "Quanton Labs",
      "The Architecture of Intelligent Business",
      "quantonlabs.com",
    ].join("\n");

    const subject = `Your Structural Intelligence Report from Quanton Labs`;
    const raw = buildMimeMessage(sendAs, toEmail, subject, emailBody);

    const sendRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${gmailToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
      }
    );

    if (!sendRes.ok) {
      const sendErr = await sendRes.text();
      throw new Error(`Submitter email send failed: ${sendErr}`);
    }

    console.log("[Submitter email sent]", toEmail);
  } catch (err) {
    console.error("[Submitter email failed]", err);
  }
}
function buildNotificationBody(
  submission: AssessmentSubmission,
  scored: ScoredPayload,
  reportUrl: string,
  pdfUrl: string
): string {
  const { section_d } = submission;
  const statusLabel = statusLabelFor(scored.closing_variant);

  return [
    "A new Stage 1 Structural Diagnostic assessment has been completed.",
    "",
    "RESPONDENT",
    `Name: ${section_d.first_name} ${section_d.last_name}`,
    `Email: ${section_d.work_email}`,
    `Phone: ${section_d.phone}`,
    `Website: ${section_d.website}`,
    `Role: ${section_d.role}`,
    "",
    "QUALIFICATION",
    `Status: ${statusLabel}`,
    `Top OS: ${scored.top_os} (${scored.scores[scored.top_os].normalized})`,
    `Second OS: ${scored.second_os} (${scored.scores[scored.second_os].normalized})`,
    `Complexity Profile: ${scored.complexity_profile}`,
    `Configuration Profile: ${scored.configuration_profile}`,
    "",
    "REPORT",
    `HTML: ${reportUrl}`,
    `PDF: ${pdfUrl || "(generation failed — see logs)"}`,
    "",
    "NEXT STEPS",
    ...nextStepsFor(scored.closing_variant),
    "",
    "---",
    "View full row in Google Sheet for complete scoring and flag set.",
  ].join("\n");
}

function statusLabelFor(variant: string): string {
  switch (variant) {
    case "qualified":
      return "Qualified — Stage 2 eligible";
    case "below_threshold":
      return "Below Threshold — long-term nurture, no qualification call";
    case "above_segment":
      return "Above Segment — direct Ryan follow-up";
    default:
      return variant;
  }
}

function nextStepsFor(variant: string): string[] {
  switch (variant) {
    case "qualified":
      return [
        "1. Review full scored payload in Google Sheet",
        "2. Research company via website and LinkedIn",
        "3. Stage 2 invitation auto-triggered",
        "4. On Stage 2 completion, route to qualification call booking",
      ];
    case "below_threshold":
      return [
        "1. Report delivered automatically",
        "2. Added to long-term nurture sequence",
        "3. No qualification call offered",
        "4. Re-engage if revenue crosses $1M threshold",
      ];
    case "above_segment":
      return [
        "1. Review full scored payload in Google Sheet",
        "2. Direct outreach from Ryan — enterprise configuration conversation",
        "3. Research company deeply before outreach",
        "4. Standard Stage 2 not applicable",
      ];
    default:
      return ["Review submission in Google Sheet"];
  }
}

function buildMimeMessage(
  from: string,
  to: string,
  subject: string,
  body: string,
  displayName: string = "Quanton Labs"
): string {
  const message = [
    "From: " + displayName + " <" + from + ">",
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    body,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}