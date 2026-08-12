// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Scoring Engine
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

import type {
  OperatingSystem,
  OSScore,
  SectionA,
  SectionB,
  SeverityTier,
  QuestionDefinition,
} from "./types";
import { OPERATING_SYSTEMS } from "./types";
import { getActiveQuestions } from "./questions";

// ============================================================
// CONSTANTS
// ============================================================

const MAX_WEIGHT_PER_QUESTION = 3;
const PRIMARY_WEIGHT_MULTIPLIER = 1.0;
const SECONDARY_WEIGHT_MULTIPLIER = 0.5;

// Severity tier thresholds per QUESTION BANK v1.1
// Score is INVERTED: higher = more structural gap
const TIER_THRESHOLDS = {
  architected: { min: 0, max: 25 },
  functional_gap: { min: 26, max: 50 },
  structural_gap: { min: 51, max: 75 },
  critical_gap: { min: 76, max: 100 },
};

// ============================================================
// SCORING ENGINE
// ============================================================

/**
 * Primary scoring function. Takes Section A + Section B responses
 * and produces the four OS scores with tiers and ranking.
 *
 * Inverted scoring: higher normalized score = greater structural gap.
 * The ranking places the MOST structurally deficient OS first, which
 * aligns the report with what Quanton OS would resolve first.
 */
export function scoreAssessment(sectionA: SectionA, sectionB: SectionB) {
  // 1. Determine which questions should have been shown
  const activeQuestions = getActiveQuestions(
    sectionA.team_size,
    sectionA.operational_surface
  );

  // 2. Compute raw + max_possible per OS
  const scores = computeOSScores(activeQuestions, sectionB);

  // 3. Rank by normalized score (highest = most gap = top of report)
  const ranked_os = rankOS(scores);

  return {
    scores,
    ranked_os,
    top_os: ranked_os[0],
    second_os: ranked_os[1],
  };
}

// ============================================================
// PER-OS SCORE COMPUTATION
// ============================================================

function computeOSScores(
  activeQuestions: QuestionDefinition[],
  sectionB: SectionB
): Record<OperatingSystem, OSScore> {
  const result: Partial<Record<OperatingSystem, OSScore>> = {};

  for (const os of OPERATING_SYSTEMS) {
    let raw = 0;
    let max_possible = 0;

    for (const q of activeQuestions) {
      const weight = sectionB[q.id];

      if (q.primary_os === os) {
        // Primary mapping — full weight
        if (typeof weight === "number") {
          raw += weight * PRIMARY_WEIGHT_MULTIPLIER;
        }
        max_possible += MAX_WEIGHT_PER_QUESTION * PRIMARY_WEIGHT_MULTIPLIER;
      } else if (q.secondary_os === os) {
        // Secondary mapping — half weight
        if (typeof weight === "number") {
          raw += weight * SECONDARY_WEIGHT_MULTIPLIER;
        }
        max_possible += MAX_WEIGHT_PER_QUESTION * SECONDARY_WEIGHT_MULTIPLIER;
      }
    }

    // Guard against divide-by-zero (no active questions for this OS)
    const normalized =
      max_possible === 0 ? 0 : Math.round((raw / max_possible) * 100);

    const tier = assignTier(normalized);
    const dots = tierToDots(tier);

    result[os] = {
      raw: Math.round(raw * 10) / 10, // preserve one decimal for audit
      max_possible: Math.round(max_possible * 10) / 10,
      normalized,
      tier,
      dots,
    };
  }

  return result as Record<OperatingSystem, OSScore>;
}

// ============================================================
// TIER ASSIGNMENT
// ============================================================

function assignTier(normalized: number): SeverityTier {
  if (normalized <= TIER_THRESHOLDS.architected.max) return "architected";
  if (normalized <= TIER_THRESHOLDS.functional_gap.max) return "functional_gap";
  if (normalized <= TIER_THRESHOLDS.structural_gap.max) return "structural_gap";
  return "critical_gap";
}

/**
 * Convert tier to a five-dot indicator for report visualization.
 * Dot count correlates with severity — more dots = greater structural gap.
 */
function tierToDots(tier: SeverityTier): 1 | 2 | 3 | 4 | 5 {
  switch (tier) {
    case "architected":
      return 1;
    case "functional_gap":
      return 2;
    case "structural_gap":
      return 3;
    case "critical_gap":
      return 4;
  }
}

// ============================================================
// RANKING
// ============================================================

/**
 * Rank operating systems by severity (highest normalized score first).
 * Ties broken by predefined OS order (strategy, platform, operations, growth)
 * to ensure deterministic output across identical scored payloads.
 */
function rankOS(
  scores: Record<OperatingSystem, OSScore>
): OperatingSystem[] {
  const osOrder: Record<OperatingSystem, number> = {
    strategy: 0,
    platform: 1,
    operations: 2,
    growth: 3,
  };

  return [...OPERATING_SYSTEMS].sort((a, b) => {
    const scoreDiff = scores[b].normalized - scores[a].normalized;
    if (scoreDiff !== 0) return scoreDiff;
    return osOrder[a] - osOrder[b];
  });
}

// ============================================================
// PRELIMINARY SCORING (for Section C option rendering)
// ============================================================

/**
 * Quick score pass for determining which OS-specific options to render
 * in Section C. This runs before the respondent reaches Section C, using
 * only Section A and whatever of Section B has been completed.
 *
 * Returns the top two OS so the frontend can render C1 options dynamically.
 */
export function preliminaryRanking(
  sectionA: SectionA,
  sectionB: SectionB
): { top_os: OperatingSystem; second_os: OperatingSystem } {
  const { top_os, second_os } = scoreAssessment(sectionA, sectionB);
  return { top_os, second_os };
}