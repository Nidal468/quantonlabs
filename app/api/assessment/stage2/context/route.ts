// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 - Entry gate and resume
// Source: DEVELOPER BRIEF ASSESSMENT (Launch Blocker 2, Stage 2 items 1 and 4)

import { NextRequest, NextResponse } from "next/server";
import { findSubmission, stage2Eligible } from "@/lib/assessment/sheet";
import { contextFromRecord } from "@/lib/stage2";
import { ID_RE, loadProgress, saveProgress } from "@/lib/stage2/progress";
import { OS_LABELS } from "@/lib/stage1/reportCopy";

export const runtime = "nodejs";

const NA = () => NextResponse.json({ available: false }, { status: 404, headers: { "Cache-Control": "no-store" } });

/**
 * Opens Stage 2 only for a stored submission whose closing variant is qualified
 * or above_segment. Returns saved progress so a reload resumes at the same step.
 * The respondent email, revenue band, and team size never leave the server.
 */
export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!ID_RE.test(id)) return NA();
  try {
    let progress = await loadProgress(id);
    if (!progress) {
      const found = await findSubmission(id);
      if (!stage2Eligible(found)) return NA();
      const context = contextFromRecord(found);
      if (!context) {
        console.error("[Stage 2 context] record incomplete", id);
        return NA();
      }
      progress = { context, step: 1, index: 0, answers: {}, updated_at: "" };
      await saveProgress(id, progress);
    }
    const { context: c } = progress;
    return NextResponse.json(
      {
        available: true,
        focus: c.focus,
        focus_names: c.focus.map((o) => OS_LABELS[o]),
        first_name: c.first_name,
        company: c.company,
        step: progress.step,
        index: progress.index,
        answers: progress.answers,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[Stage 2 context lookup failed]", err);
    return NextResponse.json({ available: false, error: "lookup_failed" }, { status: 503 });
  }
}
