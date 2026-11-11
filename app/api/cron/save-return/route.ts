// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 - Save and return email and draft expiry
// Source: ASSESSMENT FRAMES AND TRANSITIONS (section 7)

import { NextRequest, NextResponse } from "next/server";
import { deleteDraft, getDraft, listDraftIds, putDraft } from "@/lib/assessment/privateStore";
import { signToken, siteBase, publicBase } from "@/lib/assessment/linkToken";
import { escHtml, sendMail, SIGNATURE_HTML, SIGNATURE_TEXT } from "@/lib/assessment/gmail";
import { DRAFT_QUIET_MS, DRAFT_TTL_MS, type Draft } from "@/lib/assessment/drafts";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new NextResponse("Unauthorized", { status: 401 });

  const now = Date.now();
  let sent = 0, expired = 0;
  const errors: string[] = [];
  for (const id of await listDraftIds()) {
    const d = await getDraft<Draft>(id);
    if (!d) continue;
    const quiet = now - Date.parse(d.updated_at);
    try {
      if (quiet > DRAFT_TTL_MS) {
        await deleteDraft(id);
        expired++;
      } else if (!d.sent_at && quiet >= DRAFT_QUIET_MS) {
        await sendResumeEmail(d, `${siteBase()}/assessment?resume=${signToken("resume", id)}`);
        await putDraft(id, { ...d, sent_at: new Date().toISOString() });
        sent++;
      }
    } catch (e) {
      errors.push(`${id}: ${String(e).slice(0, 120)}`);
    }
  }
  if (errors.length) console.error("[Save and return]", errors);
  return NextResponse.json({ sent, expired, errors: errors.length });
}

async function sendResumeEmail(d: Draft, link: string) {
  const body = "You stopped just before your report. Your answers are saved, and the last step takes less than a minute:";
  const text = [body, link, "", SIGNATURE_TEXT].join("\n");
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:32px 16px;background:#ffffff;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;margin:0 auto;">
  <tr><td style="padding:0 0 28px;"><img src="${publicBase()}/images/site/logo-ink@2x.png" width="120" alt="Quanton Labs" style="display:block;border:0;"></td></tr>
  <tr><td><p style="margin:0 0 20px;font-family:Manrope,Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#374151;">${escHtml(body)}</p></td></tr>
  <tr><td style="padding:0 0 28px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:8px;background-color:#4655EB;">
    <a href="${link}" style="display:inline-block;padding:13px 26px;font-family:Manrope,Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Finish Your Structural Pattern Report</a>
  </td></tr></table></td></tr>
  <tr><td style="padding-top:20px;border-top:1px solid #E5E7EB;">${SIGNATURE_HTML}</td></tr>
</table></body></html>`;
  await sendMail({ to: d.email, subject: "Finish Your Structural Pattern Report", text, html });
}
