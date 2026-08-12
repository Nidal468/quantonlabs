// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Module Orchestrator

import type {
  Stage2Submission,
  Stage2Profile,
  CostOfInaction,
} from "./types";
import { calculateCostOfInaction } from "./scoring";
import { buildOwnerProfile } from "./profile";
import type { InferenceAnswers } from "./profile";

// ============================================================
// RE-EXPORTS
// ============================================================

export * from "./types";
export { calculateCostOfInaction, formatCurrency, threeYearCost } from "./scoring";
export {
  buildOwnerProfile,
  getCostFraming,
  getIdentityLanguage,
  getVisionParagraph,
  getVisionCostConnection,
  getCtaCopy,
  getInactionLine,
} from "./profile";
export type { InferenceAnswers } from "./profile";
export { getSection2Questions } from "./questions";
export {
  INFERENCE_QUESTIONS,
  VISION_QUESTION,
  SECTION2_QUESTIONS,
} from "./questions";

// ============================================================
// FULL STAGE 2 PROCESSING PIPELINE
// ============================================================

/**
 * End-to-end processing of a Stage 2 submission.
 * Called from the route handler after validating the payload.
 *
 * Input: raw Stage 2 submission + top two OS from Stage 1.
 * Output: complete Stage 2 profile with cost of inaction,
 *         ready for brief generation, Sheet update, and delivery.
 */
export function processStage2Submission(
  submission: Stage2Submission,
  topOs: string,
  secondOs: string
): Stage2Profile {
  const { owner_profile, section2, section3 } = submission;

  // 1. Calculate cost of inaction from Section 3 inputs
  const cost_of_inaction = calculateCostOfInaction(section3);

  // 2. Return complete profile
  return {
    owner_profile,
    section2,
    section3,
    cost_of_inaction,
    top_os: topOs as any,
    second_os: secondOs as any,
  };
}

// ============================================================
// SUBMISSION ID GENERATOR
// ============================================================

/**
 * Generates a Stage 2 submission ID linked to the Stage 1 ID.
 * Format: QL-STG2-{timestamp}-{random}
 * The Stage 1 submission_id is stored separately in the payload
 * as the foreign key for the Sheet row update.
 */
export function generateStage2Id(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mi = String(now.getUTCMinutes()).padStart(2, "0");
  const timestamp = `${yyyy}${mm}${dd}T${hh}${mi}`;
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `QL-STG2-${timestamp}-${randomSuffix}`;
}