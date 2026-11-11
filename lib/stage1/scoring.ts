// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Scoring Engine
// Source: ASSESSMENT STAGE 1 QUESTION BANK (Scoring Model);
//         STRUCTURAL PATTERN REPORT TEMPLATE (Severity Map Render)

import type { OperatingSystem, OSScore, QuestionDefinition, SectionA, SectionB, SeverityTier } from "./types";
import { OPERATING_SYSTEMS } from "./types";
import { getActiveQuestions, weightOf } from "./questions";

const MAX_WEIGHT = 3;
const PRIMARY = 1;
const SECONDARY = 0.5;
/** People block weights are multiplied by this factor when A2 is "Just me". */
export const SOLO_DEWEIGHT = 0.5;

export function assignTier(n: number): SeverityTier {
  if (n <= 25) return "architected";
  if (n <= 50) return "functional_gap";
  if (n <= 75) return "structural_gap";
  return "critical_gap";
}

/**
 * Dots show how much structure is in place: five for the smallest gap, one for
 * the largest. Managing Director decision, 10 Nov 2026, reversing the template's
 * direction (more dots meant a larger gap); flagged for the template revision.
 */
export function scoreToDots(n: number): 1 | 2 | 3 | 4 | 5 {
  if (n <= 20) return 5;
  if (n <= 40) return 4;
  if (n <= 60) return 3;
  if (n <= 80) return 2;
  return 1;
}

/**
 * Primary full weight, secondary half, normalized against the maximum possible
 * for the questions this respondent was shown, rounded before tier and dots.
 * Higher score means a greater structural gap.
 */
export function scoreAssessment(sectionA: SectionA, sectionB: SectionB, questionSet?: QuestionDefinition[]) {
  const active = questionSet ?? getActiveQuestions(sectionA);
  const solo = sectionA.team_size === "solo";
  const scores = {} as Record<OperatingSystem, OSScore>;

  for (const os of OPERATING_SYSTEMS) {
    let raw = 0, max = 0, primary_raw = 0;
    for (const q of active) {
      const m = q.primary_os === os ? PRIMARY : q.secondary_os === os ? SECONDARY : 0;
      if (!m) continue;
      const f = solo && q.block === "people" ? SOLO_DEWEIGHT : 1;
      const w = weightOf(q, sectionB[q.id]);
      if (typeof w === "number") {
        raw += w * m * f;
        if (m === PRIMARY) primary_raw += w * f;
      }
      max += MAX_WEIGHT * m * f;
    }
    const normalized = max === 0 ? 0 : Math.round((raw / max) * 100);
    scores[os] = {
      raw: Math.round(raw * 100) / 100,
      max_possible: Math.round(max * 100) / 100,
      primary_raw: Math.round(primary_raw * 100) / 100,
      normalized,
      tier: assignTier(normalized),
      dots: scoreToDots(normalized),
    };
  }

  // Descending score; ties break on primary-weight score, then alphabetically.
  const ranked_os = [...OPERATING_SYSTEMS].sort(
    (a, b) => scores[b].normalized - scores[a].normalized || scores[b].primary_raw - scores[a].primary_raw || a.localeCompare(b)
  );
  return { scores, ranked_os, top_os: ranked_os[0], second_os: ranked_os[1] };
}
