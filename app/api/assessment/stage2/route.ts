// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Submission Handler

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

import {
  processStage2Submission,
  generateStage2Id,
  type Stage2Submission,
  type Stage2Profile,
  type Stage2SheetUpdate,
} from "@/lib/stage2";
import {
  formatCurrency,
  threeYearCost,
  getIdentityLanguage,
  getVisionParagraph,
  getVisionCostConnection,
  getCtaCopy,
  getInactionLine,
  getCostFraming,
} from "@/lib/stage2";

// ============================================================
// CONFIG
// ============================================================

export const runtime = "nodejs";
export const maxDuration = 60;

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.send";

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { submission, top_os, second_os } = body as {
      submission: Stage2Submission;
      top_os: string;
      second_os: string;
    };

    if (!submission || !top_os || !second_os) {
      return NextResponse.json(
        { error: "Incomplete Stage 2 submission." },
        { status: 400 }
      );
    }

    if (!submission.submission_id || !submission.owner_profile || !submission.section2 || !submission.section3) {
      return NextResponse.json(
        { error: "Missing required Stage 2 fields." },
        { status: 400 }
      );
    }

    // 1. Process submission — build profile and calculate cost of inaction
    const profile = processStage2Submission(submission, top_os, second_os);

    // 2. Generate Stage 2 ID and timestamp
    const stage2Id = generateStage2Id();
const completedAt = new Date().toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");

    // 3. Render the Extended Operator Brief HTML
    const briefHtml = renderBrief(profile, stage2Id);

    // 4. Upload HTML and PDF to Blob in parallel
    const [briefUrl, briefPdfUrl] = await Promise.all([
      safeUploadBriefHtml(stage2Id, briefHtml),
      safeUploadBriefPdf(stage2Id, briefHtml),
    ]);

    // 5. Fire Sheet update and Gmail notifications in parallel
    await Promise.allSettled([
      updateSheetRow(submission.submission_id, profile, briefUrl, briefPdfUrl, completedAt),
      sendOpsNotification(submission, profile, briefUrl, briefPdfUrl),
      sendBriefDeliveryEmail(submission, profile, briefUrl, briefPdfUrl),
    ]);

    // 6. Return to client
    return NextResponse.json({
      stage2_id: stage2Id,
      brief_url: briefUrl,
      brief_pdf_url: briefPdfUrl,
      cost_of_inaction: profile.cost_of_inaction,
      owner_profile: profile.owner_profile,
    });
  } catch (err) {
    console.error("[Stage 2 submission failed]", err);
    return NextResponse.json(
      { error: "Stage 2 processing failed." },
      { status: 500 }
    );
  }
}

// ============================================================
// BRIEF RENDERER
// ============================================================

function renderBrief(profile: Stage2Profile, stage2Id: string): string {
  const { owner_profile, cost_of_inaction, top_os, second_os } = profile;
  const totalFormatted = formatCurrency(cost_of_inaction.total);
  const threeYear = threeYearCost(cost_of_inaction.total);
  const identity = getIdentityLanguage(owner_profile.identity_frame);
  const visionParagraph = getVisionParagraph(owner_profile.vision_category);
  const visionCost = getVisionCostConnection(owner_profile.vision_category, totalFormatted);
  const ctaCopy = getCtaCopy(owner_profile.vision_category);
  const costFraming = getCostFraming(owner_profile.decision_activator, owner_profile.risk_style);
  const inactionLine = getInactionLine(owner_profile.decision_activator, totalFormatted, threeYear);

  const costOpeningMap: Record<string, string> = {
    loss: "Here is what your current structure is costing you every year it remains unchanged.",
    opportunity: "Here is what becomes recoverable when your current structure changes.",
    data: "Here are the estimated figures based on your inputs. Phase 1 replaces these estimates with verified numbers from your actual financial data.",
    relationship: "Here is the picture that came out of what you shared. This is the starting point for the conversation Phase 1 is designed to have.",
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Extended Operator Brief | Quanton Labs</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Manrope', sans-serif;
    background: #ffffff;
    color: #374151;
    font-size: 15px;
    line-height: 1.7;
  }
 .cover-panel {
    text-align: left;
    padding-bottom: 0;
    margin-bottom: 48px;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
  .cover-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48px;
    padding-bottom: 24px;
    border-bottom: 1px solid #E5E7EB;
  }
  .cover-logo {
    width: 180px;
    height: auto;
  }
  .cover-contact {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    font-size: 12px;
    color: #6B7280;
  }
  .cover-meta {
    color: #6B7280;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .cover-date {
    color: #6B7280;
    font-size: 14px;
    margin-bottom: 32px;
  }
  .cover-headline {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    color: #1F2937;
    margin-top: 32px;
  }
  .gradient-bar {
    height: 4px;
    background: linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA);
  }
  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 0px;
  }
  .section {
    margin-bottom: 36px;
  }
  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4655EB;
    margin-bottom: 8px;
  }
  .section-title {
    font-size: 22px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #2B60EB;
  }
  p {
    margin-bottom: 16px;
    color: #374151;
  }
  .pull-quote {
    border-left: 4px solid #4655EB;
    background: #F9FAFB;
    padding: 20px 24px;
    margin: 24px 0;
    border-radius: 0 8px 8px 0;
  }
  .pull-quote-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6B7280;
    margin-bottom: 8px;
  }
  .pull-quote-text {
    font-size: 15px;
    color: #1F2937;
    font-style: italic;
    line-height: 1.6;
  }
  .who-opener {
    font-size: 18px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 16px;
  }
  .cost-table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
  }
  .cost-table th {
    background: #1F2937;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 12px 16px;
    text-align: left;
  }
  .cost-table td {
    padding: 12px 16px;
    font-size: 14px;
    border-bottom: 1px solid #E5E7EB;
    color: #374151;
  }
  .cost-table tr:nth-child(even) td {
    background: #F9FAFB;
  }
  .cost-total td {
    font-weight: 700;
    font-size: 15px;
    color: #1F2937;
    border-top: 2px solid #1F2937;
    background: #F9FAFB !important;
  }
  .cost-note {
    font-size: 13px;
    color: #6B7280;
    font-style: italic;
    margin-top: 12px;
  }
  .deliverable {
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 20px 24px;
    margin-bottom: 12px;
    background: #ffffff;
  }
  .deliverable-title {
    font-size: 14px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 6px;
  }
  .deliverable-body {
    font-size: 14px;
    color: #374151;
    margin: 0;
  }
  .price-block {
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 24px;
    margin: 24px 0;
  }
  .price-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6B7280;
    margin-bottom: 8px;
  }
  .price-value {
    font-size: 20px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 6px;
  }
  .price-note {
    font-size: 13px;
    color: #6B7280;
    margin: 0;
  }
  .inaction-line {
    font-size: 15px;
    font-weight: 600;
    color: #1F2937;
    background: #F9FAFB;
    border-left: 4px solid #8B37EA;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin: 24px 0;
  }
  .cta-block {
    text-align: center;
    padding: 40px 0;
  }
  .cta-vision {
    font-size: 16px;
    color: #374151;
    margin-bottom: 24px;
    font-style: italic;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA);
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    padding: 16px 40px;
    border-radius: 8px;
    text-decoration: none;
    letter-spacing: 0.02em;
  }
  .cta-support {
    font-size: 13px;
    color: #6B7280;
    margin-top: 16px;
  }
  .footer {
    background: #ffffff;
    border-top: 1px solid #E5E7EB;
    color: #6B7280;
    text-align: center;
    padding: 16px 40px;
    font-size: 12px;
    margin-top: 40px;
  }
  .footer a {
    color: #4655EB;
    text-decoration: none;
  }
  }
  .footer a {
    color: #60A5FA;
    text-decoration: none;
  }
</style>
</head>
<body>

<div class="cover-panel">
  <div class="cover-header">
    <img
      src="https://eru8zvxsrt6fabfe.public.blob.vercel-storage.com/QL%20LOGO%20BLACK%20VERSION%20WITH%20TAGLINE%20v1.0%20Feb2026.png"
      alt="Quanton Labs"
      class="cover-logo"
    />
    <div class="cover-contact">
      <span>Growth@QuantonLabs.com</span>
      <span>(929) 298-2162</span>
      <span>quantonlabs.com</span>
    </div>
  </div>
  <div class="cover-meta">Extended Operator Brief</div>
  <div class="cover-date">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
  <h1 class="cover-headline">Your Business Has a Cost of Inaction.<br>Here Is What It Is.</h1>
</div>
<div class="gradient-bar"></div>

<div class="container">

  <!-- SECTION 1: WHO YOU ARE -->
  <div class="section">
    <div class="section-label">Section 1</div>
    <div class="section-title">Who You Are</div>
    <div class="who-opener">You are a ${capitalize(owner_profile.identity_frame)}. Your why is ${formatVisionLabel(owner_profile.vision_category)}.</div>
    <p>${identity.opening}</p>
  </div>

  <!-- SECTION 2: WHERE YOU ARE TRYING TO GO -->
  <div class="section">
    <div class="section-label">Section 2</div>
    <div class="section-title">Where You Are Trying to Go</div>
    <div class="section-label" style="margin-bottom:4px;">Your Why: ${formatVisionLabel(owner_profile.vision_category)}</div>
    <div class="pull-quote">
      <div class="pull-quote-label">In your own words</div>
      <div class="pull-quote-text">${escapeHtml(owner_profile.vision_open_text)}</div>
    </div>
    <p>${visionParagraph}</p>
  </div>

  <!-- SECTION 3: WHAT IS STANDING BETWEEN YOU AND THAT -->
  <div class="section">
    <div class="section-label">Section 3</div>
    <div class="section-title">What Is Standing Between You and That</div>
    <p>${identity.gap_framing}</p>
    <p>Your assessment identified your most significant structural gaps in two areas: <strong>${formatOsLabel(top_os)}</strong> and <strong>${formatOsLabel(second_os)}</strong>. These are the domains where the distance between your current operating architecture and what is required to reach your vision is greatest.</p>
  </div>

  <!-- SECTION 4: THE COST OF STAYING HERE -->
  <div class="section">
    <div class="section-label">Section 4</div>
    <div class="section-title">The Cost of Staying Here</div>
    <p>${costOpeningMap[costFraming]}</p>
    <table class="cost-table">
      <thead>
        <tr>
          <th>Cost Category</th>
          <th>Annual Estimated Impact</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Owner time spent on work the business should handle</td><td>${formatCurrency(cost_of_inaction.owner_time_cost)}</td></tr>
        <tr><td>Revenue leaving through gaps in your growth process</td><td>${formatCurrency(cost_of_inaction.revenue_leakage)}</td></tr>
        <tr><td>Operational waste from process and productivity gaps</td><td>${formatCurrency(cost_of_inaction.operational_waste)}</td></tr>
        <tr><td>People-related drag on output and leadership capacity</td><td>${formatCurrency(cost_of_inaction.people_gap_cost)}</td></tr>
        <tr><td>Capital sitting idle rather than working toward your goals</td><td>${formatCurrency(cost_of_inaction.opportunity_cost)}</td></tr>
      </tbody>
      <tfoot>
        <tr class="cost-total"><td>Annual cost of your current structure</td><td>${totalFormatted}</td></tr>
      </tfoot>
    </table>
    <p class="cost-note">These figures are built from your estimates. Phase 1 Discovery replaces them with figures derived from your actual financial data. In our experience, the verified figures are rarely lower than the estimates.</p>
  </div>

  <!-- SECTION 5: WHAT THIS MEANS FOR YOUR WHY -->
  <div class="section">
    <div class="section-label">Section 5</div>
    <div class="section-title">What This Means for Your Why</div>
    <p>${visionCost}</p>
    <div class="pull-quote">
      <div class="pull-quote-label">You said</div>
      <div class="pull-quote-text">${escapeHtml(profile.section3.recovery_impact_text)}</div>
    </div>
  </div>

  <!-- SECTION 6: WHAT HAS TO CHANGE -->
  <div class="section">
    <div class="section-label">Section 6</div>
    <div class="section-title">What Has to Change</div>
    <p>Closing the gap your assessment revealed is not a matter of working harder or making better decisions. The decisions you are making are reasonable given the infrastructure you have. The infrastructure is the problem.</p>
    <p>What has to change is the underlying architecture of how your business perceives information, coordinates action, enforces consistency, and surfaces exceptions before they become crises. That is not a software problem. It is not a consulting problem. It is an operating system problem.</p>
    <p>Quanton OS is the infrastructure layer that creates that state. It deploys eight coordinated AI agents across your business, each covering a specific functional domain, governed by a central coordination layer that synthesizes data, manages exceptions, and surfaces what requires your attention. It connects directly to the platforms you already use. It does not replace your team. It gives your team, and you, the architecture to perform at a level your current structure does not support.</p>
  </div>

  <!-- SECTION 7: WHAT PHASE 1 DISCOVERY ACTUALLY IS -->
  <div class="section">
    <div class="section-label">Section 7</div>
    <div class="section-title">What Phase 1 Discovery Actually Is</div>
    <p>Before any infrastructure is deployed, Phase 1 Discovery produces the document that makes deployment possible. It is a structured diagnostic engagement, two to three weeks, that audits your business across all eight functional domains, validates the cost-of-inaction figures you estimated here with numbers from your actual financial data, and produces a prioritized implementation roadmap specific to your business.</p>
    <p>You own the Diagnostic Report on delivery. If you decide not to proceed to deployment, you walk away with a clearer picture of your business than you had before, built from your actual data, not estimates.</p>

    <div class="deliverable">
      <div class="deliverable-title">Operational Audit</div>
      <p class="deliverable-body">A structured review across all eight functional domains identifying gap severity, root cause, and priority sequence.</p>
    </div>
    <div class="deliverable">
      <div class="deliverable-title">Validated Cost-of-Inaction</div>
      <p class="deliverable-body">Your estimated figures replaced with verified numbers from your actual financial records and operational data.</p>
    </div>
    <div class="deliverable">
      <div class="deliverable-title">Implementation Roadmap</div>
      <p class="deliverable-body">A prioritized plan showing which gaps to close first, in what sequence, and what each stage produces operationally and financially.</p>
    </div>
    <div class="deliverable">
      <div class="deliverable-title">Baseline Metrics Capture</div>
      <p class="deliverable-body">The pre-deployment measurement foundation that makes ROI verifiable. If Quanton OS is deployed, this is how we prove it worked.</p>
    </div>

    <div class="price-block">
      <div class="price-label">Phase 1 Discovery Investment</div>
      <div class="price-value">$7,500 &ndash; $15,000</div>
      <p class="price-note">Fixed investment determined by operational complexity. Does not change based on what Phase 1 finds. Defined in the Engagement Agreement before work begins.</p>
    </div>

    <div class="inaction-line">${inactionLine}</div>
  </div>

  <!-- SECTION 8: THE NEXT STEP -->
  <div class="section">
    <div class="section-label">Section 8</div>
    <div class="section-title">The Next Step</div>
    <div class="cta-block">
      <p class="cta-vision">${ctaCopy}</p>
      <p style="margin-bottom:24px;color:#374151;">A Discovery call is 30 minutes. It is a conversation about whether what we deploy is the right fit for where you are and where you are trying to go. If it is not, we will tell you that on the call.</p>
      <a href="https://calendly.com/quantonlabs/30min" class="cta-button">Book Your Discovery Call</a>
      <p class="cta-support">Or reach us at <a href="mailto:growth@quantonlabs.com" style="color:#4655EB;">growth@quantonlabs.com</a> or 929-298-2162</p>
    </div>
  </div>

</div>

<div class="footer">
  <img src="https://eru8zvxsrt6fabfe.public.blob.vercel-storage.com/QL%20LOGO%20BLACK%20VERSION%20WITH%20TAGLINE%20v1.0%20Feb2026.png" alt="Quanton Labs" style="width:120px;height:auto;margin-bottom:8px;" />
  <p>The Architecture of Intelligent Business &nbsp;&middot;&nbsp; <a href="https://quantonlabs.com">quantonlabs.com</a></p>
  <p style="margin-top:4px;">This brief is confidential and prepared exclusively for the recipient.</p>
</div>

</body>
</html>`;
}

// ============================================================
// HELPERS
// ============================================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatVisionLabel(vision: string): string {
  const map: Record<string, string> = {
    financial_freedom: "Financial Freedom",
    time_and_lifestyle: "Time and Lifestyle",
    family_and_legacy: "Family and Legacy",
    exit_and_independence: "Exit and Independence",
    growth_and_scale: "Growth and Scale",
    proof_and_achievement: "Proof and Achievement",
  };
  return map[vision] ?? vision;
}

function formatOsLabel(os: string): string {
  const map: Record<string, string> = {
    strategy: "Strategy",
    platform: "Platform",
    operations: "Operations",
    growth: "Growth",
  };
  return map[os] ?? os;
}

// ============================================================
// BLOB UPLOADS
// ============================================================

async function safeUploadBriefHtml(id: string, html: string): Promise<string> {
  try {
    const blob = await put(`briefs/${id}.html`, html, {
      access: "public",
      contentType: "text/html; charset=utf-8",
      addRandomSuffix: false,
    });
    return blob.url;
  } catch (err) {
    console.error("[Brief HTML upload failed]", err);
    return "";
  }
}

async function safeUploadBriefPdf(id: string, html: string): Promise<string> {
  try {
    const { renderPdf } = await import("@/lib/stage1/pdfRenderer");
    const pdfBuffer = await renderPdf(html);
    const blob = await put(`briefs/${id}.pdf`, pdfBuffer, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });
    return blob.url;
  } catch (err) {
    console.error("[Brief PDF upload failed]", err);
    return "";
  }
}

// ============================================================
// GOOGLE SHEETS UPDATE (appends to existing row by submission_id)
// ============================================================

async function getAccessToken(scope: string): Promise<string> {
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  if (!privateKeyRaw || !clientEmail) throw new Error("Missing Google credentials.");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

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

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signingInput = `${header}.${body}`;
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, Buffer.from(signingInput));
  const signedJwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${await tokenRes.text()}`);
  const { access_token } = await tokenRes.json();
  return access_token;
}

async function updateSheetRow(
  submissionId: string,
  profile: Stage2Profile,
  briefUrl: string,
  briefPdfUrl: string,
  completedAt: string
): Promise<void> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID.");

    const accessToken = await getAccessToken(SHEETS_SCOPE);

    // Find the row by submission_id across all three tabs
    const tabs = ["Qualified", "Below_Threshold", "Above_Segment"];
    let targetTab = "";
    let targetRow = -1;

    for (const tab of tabs) {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab + "!A:A")}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const rows: string[][] = data.values ?? [];
      const rowIndex = rows.findIndex((r) => r[0] === submissionId);
      if (rowIndex !== -1) {
        targetTab = tab;
        targetRow = rowIndex + 1; // Sheets is 1-indexed
        break;
      }
    }

  if (!targetTab || targetRow === -1) {
  console.error("[Sheet update] submission_id not found in any tab:", submissionId);
  console.error("[Sheet update] Searched tabs:", tabs.join(", "));
  return;
}
console.log("[Sheet update] Found row", targetRow, "in tab", targetTab);

    // Build the Stage 2 update object
    const update: Stage2SheetUpdate = {
      submission_id: submissionId,
      identity_frame: profile.owner_profile.identity_frame,
      risk_style: profile.owner_profile.risk_style,
      time_horizon: profile.owner_profile.time_horizon,
      emotional_driver: profile.owner_profile.emotional_driver,
      decision_activator: profile.owner_profile.decision_activator,
      vision_category: profile.owner_profile.vision_category,
      vision_proximity: profile.owner_profile.vision_proximity,
      vision_open_text: profile.owner_profile.vision_open_text,
      time_allocation: profile.section2.time_allocation,
      urgency_rating: profile.section2.urgency_rating,
      owner_time_cost: profile.cost_of_inaction.owner_time_cost,
      revenue_leakage: profile.cost_of_inaction.revenue_leakage,
      operational_waste: profile.cost_of_inaction.operational_waste,
      people_gap_cost: profile.cost_of_inaction.people_gap_cost,
      opportunity_cost: profile.cost_of_inaction.opportunity_cost,
      cost_of_inaction_total: profile.cost_of_inaction.total,
      brief_url: briefUrl,
      brief_pdf_url: briefPdfUrl,
      stage_2_status: "completed",
      stage_2_completed_at: completedAt,
      recovery_impact_text: profile.section3.recovery_impact_text,
    };

    // Append Stage 2 columns starting after the last Stage 1 column
    // Stage 1 writes columns A through BD (56 columns). Stage 2 starts at BE.
    const startCol = "BE";
    const values = [
      update.identity_frame,
      update.risk_style,
      update.time_horizon,
      update.emotional_driver,
      update.decision_activator,
      update.vision_category,
      update.vision_proximity,
      update.vision_open_text,
      update.time_allocation,
      update.urgency_rating,
      update.owner_time_cost,
      update.revenue_leakage,
      update.operational_waste,
      update.people_gap_cost,
      update.opportunity_cost,
      update.cost_of_inaction_total,
      update.brief_url,
      update.brief_pdf_url,
      update.stage_2_status,
      update.stage_2_completed_at,
      update.recovery_impact_text,
    ];

    const range = `${targetTab}!${startCol}${targetRow}`;
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [values] }),
      }
    );

    if (!updateRes.ok) {
      console.error("[Sheet update failed]", await updateRes.text());
    }

    // Also update stage_2_status in Stage 1 columns (column AV = index 47)
    const statusRange = `${targetTab}!AV${targetRow}`;
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(statusRange)}?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [["completed"]] }),
      }
    );
  } catch (err) {
    console.error("[Sheet update failed]", err);
  }
}

// ============================================================
// GMAIL — OPS NOTIFICATION
// ============================================================

async function sendOpsNotification(
  submission: Stage2Submission,
  profile: Stage2Profile,
  briefUrl: string,
  briefPdfUrl: string
): Promise<void> {
  try {
    const sendAs = process.env.GMAIL_SEND_AS;
    if (!sendAs) throw new Error("Missing GMAIL_SEND_AS.");

    const token = await getGmailToken();
    const { owner_profile, cost_of_inaction } = profile;

    const body = [
      "Stage 2 Assessment Completed.",
      "",
      "SUBMISSION",
      `Stage 1 ID: ${submission.submission_id}`,
      "",
      "OWNER PROFILE",
      `Identity Frame: ${owner_profile.identity_frame}`,
      `Risk Style: ${owner_profile.risk_style}`,
      `Time Horizon: ${owner_profile.time_horizon}`,
      `Decision Activator: ${owner_profile.decision_activator}`,
      `Vision: ${owner_profile.vision_category}`,
      `Vision Proximity: ${owner_profile.vision_proximity}`,
      "",
      "COST OF INACTION",
      `Owner Time Cost: ${formatCurrency(cost_of_inaction.owner_time_cost)}`,
      `Revenue Leakage: ${formatCurrency(cost_of_inaction.revenue_leakage)}`,
      `Operational Waste: ${formatCurrency(cost_of_inaction.operational_waste)}`,
      `People Gap Cost: ${formatCurrency(cost_of_inaction.people_gap_cost)}`,
      `Opportunity Cost: ${formatCurrency(cost_of_inaction.opportunity_cost)}`,
      `Total Annual: ${formatCurrency(cost_of_inaction.total)}`,
      "",
      "OWNER'S WORDS",
      `Vision: ${owner_profile.vision_open_text}`,
      `Recovery Impact: ${profile.section3.recovery_impact_text}`,
      "",
      "URGENCY",
      `Rating: ${profile.section2.urgency_rating}`,
      "",
      "BRIEF",
      `HTML: ${briefUrl}`,
      `PDF: ${briefPdfUrl}`,
      "",
      "RECOMMENDED CALL FRAMING",
      getCallFramingNote(profile),
    ].join("\n");

const visionLabel = formatVisionLabel(owner_profile.vision_category);
    const urgency = profile.section2.urgency_rating ?? "completed";
    const subject = `Stage 2 Complete: ${visionLabel} - ${urgency}`;
    const mimeRaw = buildMime(sendAs, sendAs, subject, body);

    await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw: mimeRaw }),
    });
  } catch (err) {
    console.error("[Ops notification failed]", err);
  }
}

function getCallFramingNote(profile: Stage2Profile): string {
  const { identity_frame, risk_style, decision_activator, vision_category } = profile.owner_profile;
  return `This owner identifies as a ${identity_frame} with a ${risk_style} risk style and a ${vision_category} vision driver. Decision activator is ${decision_activator}. Lead the call with ${decision_activator === "data" ? "the validated cost figure and Phase 1 scope specifics" : decision_activator === "loss_averse" ? "the cost of inaction and what compounds if nothing changes" : decision_activator === "vision" ? "the operational state that becomes possible after deployment" : "a genuine conversation about fit before introducing any numbers"}.`;
}

// ============================================================
// GMAIL — BRIEF DELIVERY TO OWNER
// ============================================================

async function sendBriefDeliveryEmail(
  submission: Stage2Submission,
  profile: Stage2Profile,
  briefUrl: string,
  briefPdfUrl: string
): Promise<void> {
  try {
    const sendAs = process.env.GMAIL_SEND_AS;
    if (!sendAs) throw new Error("Missing GMAIL_SEND_AS.");

    // Fetch contact info from Stage 1 sheet row
    // For now we use a generic greeting — the submission_id can be used
    // to look up first_name from the sheet if needed in a future pass
    const token = await getGmailToken();

    const body = [
      "Your Extended Operator Brief from Quanton Labs is ready.",
      "",
      "View your brief here:",
      briefUrl,
      "",
      briefPdfUrl ? `Download PDF: ${briefPdfUrl}` : "",
      "",
      "Your brief contains everything you built in this session: your owner profile, a full breakdown of your cost of inaction, and a clear picture of what Phase 1 Discovery produces for your business specifically.",
      "",
      "When you are ready to talk through it, book a Discovery call directly:",
      "https://calendly.com/quantonlabs/30min",
      "",
      "Or reply to this email with any questions.",
      "",
      "Quanton Labs",
      "The Architecture of Intelligent Business",
      "growth@quantonlabs.com | 929-298-2162",
      "quantonlabs.com",
    ].join("\n");

    // We need the owner email. Fetch from sheet using submission_id.
    // For now route to ops as a fallback — wire owner email lookup in next pass.
    const toEmail = submission.owner_profile.vision_open_text
      ? sendAs // fallback until we thread email through submission
      : sendAs;

    // Pull owner email from the Stage 2 submission contact lookup
    let ownerEmail = sendAs;
    try {
      const ctx = await fetch(
        `${process.env.NEXTAUTH_URL}/api/assessment/stage2/context?id=${submission.submission_id}`
      );
      if (ctx.ok) {
        const ctxData = await ctx.json();
        if (ctxData.work_email) ownerEmail = ctxData.work_email;
      }
    } catch {
      // Non-fatal, fall back to ops
    }
    const subject = `Your Extended Operator Brief - Quanton Labs`;
    const raw = buildMime(sendAs, ownerEmail, subject, body);

    await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw }),
    });
  } catch (err) {
    console.error("[Brief delivery email failed]", err);
  }
}

// ============================================================
// GMAIL TOKEN (shared helper)
// ============================================================

async function getGmailToken(): Promise<string> {
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const sendAs = process.env.GMAIL_SEND_AS;
  if (!privateKeyRaw || !clientEmail || !sendAs) throw new Error("Missing Gmail credentials.");

  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    iss: clientEmail,
    scope: GMAIL_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
    sub: sendAs,
  };

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

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
  const signingInput = `${header}.${body}`;
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, Buffer.from(signingInput));
  const signedJwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenRes.ok) throw new Error(`Gmail token failed: ${await tokenRes.text()}`);
  const { access_token } = await tokenRes.json();
  return access_token;
}

function buildMime(from: string, to: string, subject: string, body: string): string {
  const message = [
    `From: Quanton Labs <${from}>`,
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