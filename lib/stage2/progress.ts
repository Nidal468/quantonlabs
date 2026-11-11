// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 - Saved progress (server side)
//
// The progress file is created only after the gate passes, and it carries the
// Stage 1 context. Later saves check for the file instead of re-reading the
// Sheet; the final submission re-checks the record.

import { getProgress, putProgress } from "@/lib/assessment/privateStore";
import type { Stage1Context } from "./index";
import type { S2Answers } from "./questions";

export interface Progress {
  context: Stage1Context;
  step: 1 | 2 | 3 | 4;
  index: number;
  answers: S2Answers;
  updated_at: string;
}

export const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function loadProgress(id: string): Promise<Progress | null> {
  if (!ID_RE.test(id)) return null;
  return getProgress<Progress>(id);
}

export async function saveProgress(id: string, p: Progress): Promise<void> {
  await putProgress(id, { ...p, updated_at: new Date().toISOString() });
}

/** Keeps only known item IDs with bounded string values. */
export function cleanAnswers(raw: unknown, known: Set<string>): S2Answers {
  const out: S2Answers = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (known.has(k) && typeof v === "string" && v.length <= 400) out[k] = v;
  }
  return out;
}
