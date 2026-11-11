// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 - Save answers between steps; Your Picture preview
// Source: ASSESSMENT FRAMES AND TRANSITIONS (sections 11 and 12)

import { NextRequest, NextResponse } from "next/server";
import { S2_QUESTIONS, runEngine } from "@/lib/stage2";
import { cleanAnswers, loadProgress, saveProgress } from "@/lib/stage2/progress";
import { money, positionLine } from "@/lib/stage2/briefRenderer";

export const runtime = "nodejs";

const KNOWN = new Set(S2_QUESTIONS.map((q) => q.id));

export async function PUT(req: NextRequest) {
  let body: { id?: string; step?: number; index?: number; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const id = body.id ?? "";
  const progress = await loadProgress(id).catch(() => null);
  if (!progress) return NextResponse.json({ available: false }, { status: 404 });

  const step = [1, 2, 3, 4].includes(Number(body.step)) ? (Number(body.step) as 1 | 2 | 3 | 4) : progress.step;
  const index = Number.isInteger(body.index) && (body.index as number) >= 0 && (body.index as number) < 60 ? (body.index as number) : 0;
  const answers = { ...progress.answers, ...cleanAnswers(body.answers, KNOWN) };
  try {
    await saveProgress(id, { ...progress, step, index, answers });
  } catch (err) {
    console.error("[Stage 2 progress save failed]", err);
    return NextResponse.json({ error: "save_failed" }, { status: 503 });
  }

  // Your Picture preview: the break-even position line and the leadership time figure. No total.
  if (step === 4) {
    const e = runEngine({ revenue: progress.context.revenue, team_size: progress.context.team_size, focus: progress.context.focus, answers });
    return NextResponse.json({
      ok: true,
      preview: {
        position: positionLine(e),
        leadership_time: e.costs.leadership_time != null ? money(e.costs.leadership_time) : null,
      },
    });
  }
  return NextResponse.json({ ok: true });
}
