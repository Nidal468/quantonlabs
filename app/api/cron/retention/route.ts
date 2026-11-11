// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - 24-month retention job
// Source: DEVELOPER BRIEF ASSESSMENT (section 6); PRIVACY POLICY
//
// Daily. For every submission whose last contact is more than 24 months ago and
// that is not marked as a client: delete the stored report, brief, and saved
// progress, and clear the respondent's answers in the record. The row keeps its
// identifiers and a retention_purged_at date.

import { NextRequest, NextResponse } from "next/server";
import { readTab, TAB_NAMES, updateRecord } from "@/lib/assessment/sheet";
import { deletePrivateHtml, deleteProgress } from "@/lib/assessment/privateStore";

export const runtime = "nodejs";
export const maxDuration = 300;

const KEEP = new Set(["submission_id", "submitted_at", "closing_variant", "client", "lifecycle_stage", "last_contact_at", "retention_purged_at", "notes", "last_updated"]);
/** Answer columns: Stage 1 question keys, Section C, and every Stage 2 column. */
const isAnswer = (h: string) => /^b_[a-z]+_\d+$/.test(h) || h.startsWith("s2_") || h === "priority" || h === "outcome_text";

function retentionCutoff(now = new Date()): Date {
  const d = new Date(now);
  d.setUTCMonth(d.getUTCMonth() - 24);
  return d;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new NextResponse("Unauthorized", { status: 401 });

  const cutoff = retentionCutoff();
  const now = new Date().toISOString();
  let purged = 0;
  const errors: string[] = [];

  for (const tab of Object.values(TAB_NAMES)) {
    let rows;
    try {
      rows = await readTab(tab);
    } catch (e) {
      errors.push(`${tab}: ${String(e).slice(0, 120)}`);
      continue;
    }
    for (const { rowNumber, record: r } of rows) {
      const id = r.submission_id;
      if (!id || r.retention_purged_at || String(r.client).toLowerCase() === "true") continue;
      const last = new Date(r.last_contact_at || r.stage_2_completed_at || r.submitted_at);
      if (Number.isNaN(last.getTime()) || last > cutoff) continue;
      try {
        // Blob deletes are idempotent; any real failure leaves the row for the next run.
        await Promise.all([deletePrivateHtml("report", id), deletePrivateHtml("brief", id), deleteProgress(id)]);
        const cleared: Record<string, string> = {};
        for (const h of Object.keys(r)) if (isAnswer(h) && !KEEP.has(h) && r[h] !== "") cleared[h] = "";
        await updateRecord({ tab, rowNumber }, { ...cleared, report_url: "", brief_url: "", retention_purged_at: now, last_updated: now });
        purged++;
      } catch (e) {
        errors.push(`${id}: ${String(e).slice(0, 120)}`);
      }
    }
  }
  if (errors.length) console.error("[Retention]", errors);
  return NextResponse.json({ purged, errors: errors.length });
}
