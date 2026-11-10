// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Server-side submission validation

import type { AssessmentSubmission } from "./types";
import { A1, A2, A3, A4, C1_OPTIONS, ROLE_OPTIONS, getActiveQuestions } from "./questions";

const has = <T extends { key: string }>(list: T[], k: unknown) => typeof k === "string" && list.some((o) => o.key === k);
const str = (v: unknown, max = 300) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

/** Returns an error message, or null when the submission is complete and every answer key is valid. */
export function validateSubmission(s: AssessmentSubmission): string | null {
  const { section_a: a, section_b: b, section_c: c, section_d: d } = s ?? ({} as AssessmentSubmission);
  if (!a || !b || !c || !d) return "Incomplete submission.";
  if (!has(A1.options, a.revenue) || !has(A2.options, a.team_size) || !has(A4.options, a.locations)) return "Section A incomplete.";
  if (!Array.isArray(a.functions) || a.functions.length < 1 || !a.functions.every((f) => has(A3.options, f))) return "Section A incomplete.";
  for (const q of getActiveQuestions(a)) if (!q.options.some((o) => o.key === b[q.id])) return `Missing answer: ${q.id}`;
  if (!(c.priority in C1_OPTIONS)) return "Section C incomplete.";
  if (c.outcome_text != null && (typeof c.outcome_text !== "string" || c.outcome_text.length > 4000)) return "Section C invalid.";
  if (!str(d.first_name, 80) || !str(d.last_name, 80) || !str(d.phone, 40) || !str(d.website, 300)) return "Section D incomplete.";
  if (typeof d.work_email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.work_email.trim())) return "Section D incomplete.";
  if (!has(ROLE_OPTIONS, d.role)) return "Section D incomplete.";
  if (d.location != null && (typeof d.location !== "string" || d.location.length > 120)) return "Section D invalid.";
  return null;
}
