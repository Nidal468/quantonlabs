// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Module Orchestrator
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

import type {
  AssessmentSubmission,
  ScoredPayload,
} from "./types";
import { scoreAssessment } from "./scoring";
import {
  deriveFlags,
  deriveComplexityProfile,
  deriveConfigurationProfile,
  determineClosingVariant,
} from "./flags";

// ============================================================
// RE-EXPORTS
// ============================================================
// Public surface of the stage1 module. Consumers import from
// "@/lib/stage1" rather than reaching into individual files.

export * from "./types";
export { scoreAssessment, preliminaryRanking } from "./scoring";
export {
  deriveFlags,
  deriveComplexityProfile,
  deriveConfigurationProfile,
  determineClosingVariant,
} from "./flags";
export { getActiveQuestions, getQuestionById } from "./questions";

// ============================================================
// FULL SCORING PIPELINE
// ============================================================

/**
 * End-to-end scoring of a complete assessment submission.
 *
 * Input: raw submission (Sections A, B, C, D) from the client.
 * Output: fully scored payload ready for report rendering,
 *         Google Sheet write, and Gmail notification.
 *
 * This is the single entry point from the route handler.
 * Website verification is passed in as a separate parameter because
 * DNS resolution is an async IO operation that belongs in the route,
 * not inside a pure scoring function.
 */
export function processSubmission(
  submission: AssessmentSubmission,
  websiteVerified: boolean
): ScoredPayload {
  const { section_a, section_b, section_d } = submission;

  // 1. Score the four operating systems
  const { scores, ranked_os, top_os, second_os } = scoreAssessment(
    section_a,
    section_b
  );

  // 2. Derive internal flags
  const flags = deriveFlags(section_a, section_b, section_d, websiteVerified);

  // 3. Classify complexity and configuration profiles
  const complexity_profile = deriveComplexityProfile(section_a, section_b);
  const configuration_profile = deriveConfigurationProfile(
    section_a,
    section_b,
    scores
  );

  // 4. Determine closing variant (drives sheet tab routing)
  const closing_variant = determineClosingVariant(flags);

  // 5. Return the complete scored payload
  return {
    scores,
    ranked_os,
    top_os,
    second_os,
    closing_variant,
    flags,
    complexity_profile,
    configuration_profile,
  };
}

// ============================================================
// SUBMISSION ID GENERATOR
// ============================================================

/**
 * Generates a deterministic submission ID.
 * Format: QL-STG1-{timestamp}-{random}
 * Example: QL-STG1-20260418T1532-k7m3p9
 *
 * Used as the primary key in the Google Sheet and in report URLs.
 * Includes timestamp for chronological sorting and a random suffix
 * to prevent collisions on simultaneous submissions.
 */
export function generateSubmissionId(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mi = String(now.getUTCMinutes()).padStart(2, "0");
  const timestamp = `${yyyy}${mm}${dd}T${hh}${mi}`;

  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `QL-STG1-${timestamp}-${randomSuffix}`;
}

// ============================================================
// WEBSITE VERIFICATION
// ============================================================

/**
 * Verifies that a submitted website URL resolves to a live domain.
 * Uses a HEAD request with a short timeout. Returns boolean.
 *
 * Does not validate content, just reachability. Used to populate
 * the website_verified flag in the pre-call brief.
 *
 * Called from the route handler before processSubmission().
 */
export async function verifyWebsite(url: string): Promise<boolean> {
  if (!url || typeof url !== "string") return false;

  // Normalize: add https:// if missing
  const normalized = url.trim().match(/^https?:\/\//i)
    ? url.trim()
    : `https://${url.trim()}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(normalized, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    // 2xx or 3xx counts as resolvable
    return response.status < 400;
  } catch {
    return false;
  }
}
