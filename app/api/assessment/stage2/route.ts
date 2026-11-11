// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - Submission Handler
// Source: ASSESSMENT STAGE 2 QUESTION BANK; EXTENDED OPERATOR BRIEF TEMPLATE (Brief Assembly);
//         ASSESSMENT FRAMES AND TRANSITIONS (section 15); DEVELOPER BRIEF ASSESSMENT

import { NextRequest, NextResponse } from "next/server";
import { findSubmission, stage2Eligible, updateRecord } from "@/lib/assessment/sheet";
import { putPrivateHtml, deleteProgress } from "@/lib/assessment/privateStore";
import { briefUrl as signedBriefUrl, briefPdfUrl as signedBriefPdfUrl, siteBase } from "@/lib/assessment/linkToken";
import { escHtml, sendMail, SENDER, SIGNATURE_HTML, SIGNATURE_TEXT } from "@/lib/assessment/gmail";
import { renderPdf } from "@/lib/stage1/pdfRenderer";
import { activeS2, contextFromRecord, invalidS2, runEngine, S2_QUESTIONS, type EngineResult, type Stage1Context } from "@/lib/stage2";
import { cleanAnswers, ID_RE, loadProgress } from "@/lib/stage2/progress";
import { renderBrief } from "@/lib/stage2/briefRenderer";

export const runtime = "nodejs";
export const maxDuration = 60;

const KNOWN = new Set(S2_QUESTIONS.map((q) => q.id));
const CALENDLY = "https://calendly.com/quantonlabs/30min";

export async function POST(req: NextRequest) {
  let body: { id?: string; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const id = body.id ?? "";
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_available" }, { status: 404 });

  try {
    // 1. Gate and context from the stored Stage 1 record, never from the browser.
    const found = await findSubmission(id);
    if (!stage2Eligible(found)) return NextResponse.json({ error: "not_available" }, { status: 404 });
    const ctx = contextFromRecord(found);
    if (!ctx) return NextResponse.json({ error: "Stage 1 record incomplete." }, { status: 409 });

    // 2. Raw answers: saved progress plus the final payload. The profile is built here.
    const saved = await loadProgress(id).catch(() => null);
    const answers = { ...(saved?.answers ?? {}), ...cleanAnswers(body.answers, KNOWN) };
    const bad = invalidS2(ctx.focus, answers);
    if (bad) return NextResponse.json({ error: `Missing answer: ${bad}` }, { status: 400 });
    const shown = Object.fromEntries(activeS2(ctx.focus, answers).map((q) => [q.id, answers[q.id] ?? ""]));

    // 3. Cost engine and brief.
    const engine = runEngine({ revenue: ctx.revenue, team_size: ctx.team_size, focus: ctx.focus, answers: shown });
    const html = renderBrief({ first_name: ctx.first_name, last_name: ctx.last_name, company: ctx.company, focus: ctx.focus, answers: shown, engine, stage1: ctx.stage1 }, id);

    // 4. Store. The path is keyed to the submission, so a retake replaces the earlier brief.
    try {
      await putPrivateHtml("brief", id, html);
    } catch (err) {
      console.error("[Brief store failed]", err);
      return NextResponse.json({ error: "Brief could not be stored." }, { status: 500 });
    }
    const briefUrl = signedBriefUrl(id);
    const briefPdfUrl = signedBriefPdfUrl(id);
    const completedAt = new Date().toISOString();

    // 5. Respondent email first: a failure here fails the submission.
    try {
      await sendBriefEmail(ctx, html, briefUrl);
    } catch (err) {
      console.error("[Brief email failed]", err);
      return NextResponse.json({ error: "The brief could not be sent. Try again in a moment, or contact growth@quantonlabs.com." }, { status: 502 });
    }

    await Promise.allSettled([
      updateRecord(found, recordFields(shown, engine, briefUrl, completedAt)).catch((e) => console.error("[Stage 2 sheet update failed]", e)),
      sendOpsNotification(ctx, shown, engine, briefUrl, briefPdfUrl).catch((e) => console.error("[Stage 2 ops notification failed]", e)),
      deleteProgress(id).catch(() => undefined),
    ]);

    // The respondent's own address, for the completion frame.
    return NextResponse.json({ brief_url: briefUrl, sent_to: ctx.email });
  } catch (err) {
    console.error("[Stage 2 submission failed]", err);
    return NextResponse.json({ error: "Stage 2 processing failed." }, { status: 500 });
  }
}

// ============================================================
// RECORD: Stage 2 columns to the right, by header name
// ============================================================

function recordFields(answers: Record<string, string>, e: EngineResult, briefUrl: string, completedAt: string) {
  const s2: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(answers)) s2[`s2_${k}`] = v;
  const r = (n: number | null | undefined) => (n == null ? "" : Math.round(n));
  return {
    ...s2,
    s2_breakeven_monthly: r(e.breakeven),
    s2_profit_line_monthly: r(e.profit_line),
    s2_position: e.position,
    s2_gap_to_profit_line_monthly: r(e.gap_to_profit_line),
    s2_leadership_time: r(e.costs.leadership_time),
    s2_margin_leakage: r(e.costs.margin_leakage),
    s2_revenue_leakage: r(e.costs.revenue_leakage),
    s2_operational_waste: r(e.costs.operational_waste),
    s2_duplicate_work_hours: r(e.duplicate_hours),
    s2_duplicate_work_cost: r(e.costs.duplicate_work),
    s2_idle_capital: r(e.costs.idle_capital),
    s2_total: r(e.total),
    s2_share_of_revenue: e.share_of_revenue == null ? "" : Math.round(e.share_of_revenue * 1000) / 10,
    s2_findings: e.findings.join(", "),
    brief_url: briefUrl,
    stage_2_status: "completed",
    stage_2_completed_at: completedAt,
    last_contact_at: completedAt,
    last_updated: completedAt,
  };
}

// ============================================================
// EMAILS
// ============================================================

async function sendBriefEmail(ctx: Stage1Context, html: string, briefUrl: string) {
  const intro = `${ctx.first_name}, your Extended Operator Brief is ready. It puts numbers on what your Structural Pattern Report found, built from your own figures. The link stays active for 24 months. A PDF copy is attached.`;
  const closeText = `If you want to talk it through, reply to this email or book a 30-minute conversation: ${CALENDLY}`;
  const text = [intro, "", `View Your Extended Operator Brief: ${briefUrl}`, "", closeText, "", SIGNATURE_TEXT].join("\n");
  const site = siteBase();
  const p = (t: string) => `<p style="margin:0 0 18px;font-family:Manrope,Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#374151;">${t}</p>`;
  const htmlBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
  <tr><td style="padding:0 0 28px;"><img src="${site}/images/site/logo-ink@2x.png" width="120" alt="Quanton Labs" style="display:block;border:0;"></td></tr>
  <tr><td>${p(escHtml(intro))}</td></tr>
  <tr><td style="padding:4px 0 28px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:8px;background-color:#4655EB;">
    <a href="${briefUrl}" style="display:inline-block;padding:13px 26px;font-family:Manrope,Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">View Your Extended Operator Brief</a>
  </td></tr></table></td></tr>
  <tr><td style="padding:20px 0 24px;border-top:1px solid #E5E7EB;">${p(`If you want to talk it through, reply to this email or <a href="${CALENDLY}" style="color:#4655EB;">book a 30-minute conversation</a>.`)}</td></tr>
  <tr><td>${SIGNATURE_HTML}</td></tr>
</table></td></tr></table></body></html>`;

  let attachment: { filename: string; contentType: string; data: Buffer } | undefined;
  try {
    attachment = { filename: "Extended Operator Brief.pdf", contentType: "application/pdf", data: await renderPdf(html) };
  } catch (err) {
    console.error("[Brief PDF render failed; sending without attachment]", err);
  }
  await sendMail({ to: ctx.email, subject: `Your Extended Operator Brief: ${ctx.company}`, text, html: htmlBody, attachment });
}

async function sendOpsNotification(ctx: Stage1Context, answers: Record<string, string>, e: EngineResult, briefUrl: string, pdfUrl: string) {
  const r = (n: number | null | undefined) => (n == null ? "n/a" : `$${Math.round(n).toLocaleString("en-US")}`);
  const text = [
    "A Stage 2 Extended Operator Brief has been completed.",
    "",
    `Respondent: ${ctx.first_name} ${ctx.last_name} (${ctx.email})`,
    `Company: ${ctx.company}`,
    `Revenue band: ${ctx.revenue} | Team: ${ctx.team_size} | Focus: ${ctx.focus.join(", ")}`,
    `Urgency: ${answers["R.Urgency"]}`,
    "",
    "COST ENGINE",
    `Position: ${e.position} | Break-even ${r(e.breakeven)}/mo | Profit line ${r(e.profit_line)}/mo | Gap ${r(e.gap_to_profit_line)}/mo`,
    `Leadership time ${r(e.costs.leadership_time)} | Margin leakage ${r(e.costs.margin_leakage)} | Revenue leakage ${r(e.costs.revenue_leakage)}`,
    `Operational waste ${r(e.costs.operational_waste)} | Duplicate work ${r(e.costs.duplicate_work)} (${e.duplicate_hours == null ? "n/a" : Math.round(e.duplicate_hours)} hrs) | Idle capital ${r(e.costs.idle_capital)}`,
    `Total ${r(e.total)} | Share of revenue ${e.share_of_revenue == null ? "n/a" : `${Math.round(e.share_of_revenue * 1000) / 10}%`}`,
    `Findings: ${e.findings.join(", ") || "none"}`,
    "",
    "BRIEF",
    briefUrl,
    `PDF: ${pdfUrl}`,
  ].join("\n");
  await sendMail({ to: process.env.GMAIL_SEND_AS ?? SENDER, subject: `Stage 2 completed: ${ctx.company}`, text });
}
