// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Submission Handler
// Source: ASSESSMENT STAGE 1 QUESTION BANK; STRUCTURAL PATTERN REPORT TEMPLATE;
//         ASSESSMENT FRAMES AND TRANSITIONS (section 9); DEVELOPER BRIEF ASSESSMENT

import { siteBase, publicBase } from "@/lib/assessment/linkToken";
import { NextRequest, NextResponse } from "next/server";
import { appendRecord, TAB_NAMES } from "@/lib/assessment/sheet";
import { deleteDraft, putPrivateHtml } from "@/lib/assessment/privateStore";
import { reportUrl as signedReportUrl, reportPdfUrl as signedReportPdfUrl } from "@/lib/assessment/linkToken";
import { escHtml, sendMail, SENDER, SIGNATURE_HTML, SIGNATURE_TEXT } from "@/lib/assessment/gmail";
import { renderPdf } from "@/lib/stage1/pdfRenderer";
import { renderReport } from "@/lib/stage1/reportRenderer";
import { OS_LABELS } from "@/lib/stage1/reportCopy";
import { validateSubmission } from "@/lib/stage1/validate";
import {
  AGENT_NAME_PROVISIONAL,
  companyNameFromWebsite,
  footprintLabel,
  generateSubmissionId,
  getActiveQuestions,
  processSubmission,
  selectModularAgent,
  verifyWebsite,
  type AssessmentSubmission,
  type ModularSelection,
  type ScoredPayload,
} from "@/lib/stage1";

export const runtime = "nodejs";
export const maxDuration = 60;

const SITE = siteBase();

// ============================================================
// POST
// ============================================================

export async function POST(req: NextRequest) {
  let submission: AssessmentSubmission;
  try {
    submission = (await req.json()) as AssessmentSubmission;
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  const invalid = validateSubmission(submission);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  try {
    const websiteVerified = await verifyWebsite(submission.section_d.website);
    const scored = processSubmission(submission, websiteVerified);

    // Instrumentation only: nothing it computes reaches a respondent.
    const modular =
      scored.closing_variant === "below_threshold"
        ? selectModularAgent(submission.section_a, scored.scores, scored.ranked_os, scored.flags)
        : null;

    const submissionId = generateSubmissionId();
    const submittedAt = new Date().toISOString();
    const html = renderReport(submission, scored, submissionId);

    try {
      await putPrivateHtml("report", submissionId, html);
    } catch (err) {
      console.error("[Report store failed]", err);
      return NextResponse.json({ error: "Report could not be stored." }, { status: 500 });
    }
    const reportUrl = signedReportUrl(submissionId);
    const pdfUrl = signedReportPdfUrl(submissionId);

    const draftId = (submission as { draft_id?: unknown }).draft_id;
    await Promise.allSettled([
      typeof draftId === "string" && /^[0-9a-f-]{36}$/i.test(draftId) ? deleteDraft(draftId) : Promise.resolve(),
      appendRecord(TAB_NAMES[scored.closing_variant], sheetRow(submissionId, submittedAt, submission, scored, reportUrl, modular)).catch((e) =>
        console.error("[Sheet write failed]", e)
      ),
      sendOpsNotification(submission, scored, reportUrl, pdfUrl, modular).catch((e) => console.error("[Ops notification failed]", e)),
      sendReportEmail(submission, scored, html, reportUrl, submissionId).catch((e) => console.error("[Report email failed]", e)),
    ]);

    // Respondent-facing response: no flags, scores, tiers, or footprint.
    const brief = scored.closing_variant !== "below_threshold";
    return NextResponse.json({
      report_url: reportUrl,
      brief_url: brief ? `/assessment/stage2/${encodeURIComponent(submissionId)}` : null,
      top_os_name: OS_LABELS[scored.top_os],
      second_os_name: OS_LABELS[scored.second_os],
    });
  } catch (err) {
    console.error("[Assessment submission failed]", err);
    return NextResponse.json({ error: "Submission processing failed." }, { status: 500 });
  }
}

// ============================================================
// RECORD
// ============================================================

/** Header-keyed row. Every answer key is stored, not only the weight. */
function sheetRow(
  submissionId: string,
  submittedAt: string,
  s: AssessmentSubmission,
  scored: ScoredPayload,
  reportUrl: string,
  modular: ModularSelection | null
): Record<string, string | number | boolean> {
  const { section_a: a, section_b: b, section_c: c, section_d: d } = s;
  const answers: Record<string, string> = {};
  for (const q of getActiveQuestions(a)) answers[q.id] = b[q.id];
  const f = scored.flags;
  const fp = scored.footprint;
  return {
    submission_id: submissionId,
    submitted_at: submittedAt,
    closing_variant: scored.closing_variant,
    first_name: d.first_name,
    last_name: d.last_name,
    work_email: d.work_email.trim(),
    phone: d.phone,
    website: d.website,
    company_name: companyNameFromWebsite(d.website),
    role: d.role,
    location: d.location ?? "",
    revenue_band: a.revenue,
    team_size: a.team_size,
    functions: a.functions.join(", "),
    function_count: a.functions.length,
    locations: a.locations,
    ...answers,
    priority: c.priority,
    outcome_text: c.outcome_text ?? "",
    strategy_score: scored.scores.strategy.normalized,
    platform_score: scored.scores.platform.normalized,
    operations_score: scored.scores.operations.normalized,
    growth_score: scored.scores.growth.normalized,
    strategy_tier: scored.scores.strategy.tier,
    platform_tier: scored.scores.platform.tier,
    operations_tier: scored.scores.operations.tier,
    growth_tier: scored.scores.growth.tier,
    top_os: scored.top_os,
    top_os_score: scored.scores[scored.top_os].normalized,
    second_os: scored.second_os,
    second_os_score: scored.scores[scored.second_os].normalized,
    below_threshold: f.below_threshold,
    above_segment: f.above_segment,
    managing_load: f.managing_load,
    leadership_bottleneck: f.leadership_bottleneck,
    financial_clarity_gap: f.financial_clarity_gap,
    capital_readiness_gap: f.capital_readiness_gap,
    fragmented_ai: f.fragmented_ai,
    compliance: f.compliance,
    decision_maker: f.decision_maker,
    free_email: f.free_email,
    phone_captured: f.phone_captured,
    website_verified: f.website_verified,
    footprint_result: fp.result,
    footprint_units: footprintLabel(fp),
    footprint_people: fp.people,
    footprint_locations: fp.locations,
    footprint_systems: fp.systems,
    footprint_compliance: fp.compliance,
    report_url: reportUrl,
    stage_2_eligible: scored.closing_variant !== "below_threshold",
    stage_2_status: "",
    stage_2_completed_at: "",
    lifecycle_stage: "stage_1_complete",
    client: false,
    last_contact_at: submittedAt,
    modular_agent: modular?.agent ? AGENT_NAME_PROVISIONAL[modular.agent] : "",
    modular_selected_by: modular?.selected_by ?? "",
    modular_filtered_out: modular?.filtered_out.join(", ") ?? "",
    modular_fallback: modular?.fallback ?? false,
    notes: "",
    last_updated: submittedAt,
  };
}

// ============================================================
// OPS NOTIFICATION (internal only)
// ============================================================

async function sendOpsNotification(s: AssessmentSubmission, scored: ScoredPayload, reportUrl: string, pdfUrl: string, modular: ModularSelection | null) {
  const d = s.section_d;
  const f = scored.flags;
  const on = (Object.keys(f) as (keyof typeof f)[]).filter((k) => f[k]);
  const status = { qualified: "Qualified: Stage 2 eligible", below_threshold: "Below Threshold: Variant 2, starting-point conversation", above_segment: "Above Segment: Variant 3, direct conversation with Ryan" }[scored.closing_variant];
  const text = [
    "A Stage 1 Structural Diagnostic has been completed.",
    "",
    "RESPONDENT",
    `Name: ${d.first_name} ${d.last_name}`,
    `Email: ${d.work_email}`,
    `Phone: ${d.phone}`,
    `Website: ${d.website}`,
    `Role: ${d.role}`,
    "",
    "QUALIFICATION",
    `Status: ${status}`,
    `Revenue: ${s.section_a.revenue} | Team: ${s.section_a.team_size} | Locations: ${s.section_a.locations}`,
    `Functions: ${s.section_a.functions.join(", ")}`,
    `Ranking: ${scored.ranked_os.map((os) => `${os} ${scored.scores[os].normalized}`).join(", ")}`,
    `Flags: ${on.join(", ") || "none"}`,
    `Footprint: ${footprintLabel(scored.footprint)}`,
    ...(modular
      ? ["", "MODULAR ROUTING (internal signal, provisional; nothing named to the respondent)", `Indicated: ${modular.agent ? AGENT_NAME_PROVISIONAL[modular.agent] : "none (fallback)"}`, `Selected by: ${modular.selected_by ?? "none"}`]
      : []),
    "",
    "REPORT",
    reportUrl,
    `PDF: ${pdfUrl}`,
  ].join("\n");
  await sendMail({ to: process.env.GMAIL_SEND_AS ?? SENDER, subject: `Stage 1 completed: ${companyNameFromWebsite(d.website)}`, text });
}

// ============================================================
// REPORT DELIVERY EMAIL (FRAMES section 9)
// ============================================================

async function sendReportEmail(s: AssessmentSubmission, scored: ScoredPayload, reportHtml: string, reportUrl: string, submissionId: string) {
  const d = s.section_d;
  const company = companyNameFromWebsite(d.website);
  const brief = scored.closing_variant !== "below_threshold";
  const briefUrl = `${SITE}/assessment/stage2/${encodeURIComponent(submissionId)}`;

  const intro = `${d.first_name}, your Structural Pattern Report is ready. It ranks the four operating systems by structural gap, analyzes the two creating the most drag at ${company}, and shows the answers that drove each finding. Your report is at the link below; the link stays active for 24 months. A PDF copy is attached.`;
  const briefLine = "Next step: the Extended Operator Brief puts numbers on what the report found, from your own figures. About 10 minutes.";
  const close = "Questions about anything in the report? Reply to this email and we will answer within one business day.";

  const text = [
    intro,
    "",
    `View Your Structural Pattern Report: ${reportUrl}`,
    ...(brief ? ["", briefLine, `Continue to the Extended Operator Brief: ${briefUrl}`] : []),
    "",
    close,
    "",
    SIGNATURE_TEXT,
  ].join("\n");

  const button = (href: string, label: string, solid: boolean) => `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="border-radius:8px;${solid ? "background-color:#4655EB;" : "border:2px solid #4655EB;"}">
        <a href="${href}" style="display:inline-block;padding:13px 26px;font-family:Manrope,Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;color:${solid ? "#ffffff" : "#4655EB"};text-decoration:none;">${escHtml(label)}</a>
      </td></tr></table>`;
  const p = (t: string) => `<p style="margin:0 0 18px;font-family:Manrope,Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#374151;">${escHtml(t)}</p>`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
  <tr><td style="padding:0 0 28px;"><img src="${publicBase()}/images/site/logo-ink@2x.png" width="120" alt="Quanton Labs" style="display:block;border:0;"></td></tr>
  <tr><td>${p(intro)}</td></tr>
  <tr><td style="padding:4px 0 28px;">${button(reportUrl, "View Your Structural Pattern Report", true)}</td></tr>
  ${brief ? `<tr><td style="padding:20px 0 28px;border-top:1px solid #E5E7EB;">${p(briefLine)}${button(briefUrl, "Continue to the Extended Operator Brief", false)}</td></tr>` : ""}
  <tr><td style="padding:20px 0 24px;border-top:1px solid #E5E7EB;">${p(close)}</td></tr>
  <tr><td>${SIGNATURE_HTML}</td></tr>
</table></td></tr></table></body></html>`;

  let attachment: { filename: string; contentType: string; data: Buffer } | undefined;
  try {
    attachment = { filename: "Structural Pattern Report.pdf", contentType: "application/pdf", data: await renderPdf(reportHtml) };
  } catch (err) {
    console.error("[Report PDF render failed; sending without attachment]", err);
  }

  await sendMail({ to: d.work_email.trim(), subject: `Your Structural Pattern Report: ${company}`, text, html, attachment });
}
