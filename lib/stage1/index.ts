// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Module Orchestrator
// Source: ASSESSMENT STAGE 1 QUESTION BANK

import type { AssessmentSubmission, ScoredPayload } from "./types";
import { scoreAssessment } from "./scoring";
import { deriveFlags, deriveFootprint, determineClosingVariant } from "./flags";

export * from "./types";
export { scoreAssessment, assignTier, scoreToDots, SOLO_DEWEIGHT } from "./scoring";
export { deriveFlags, deriveFootprint, determineClosingVariant, footprintLabel } from "./flags";
export * from "./modularRouting";
export * from "./questions";

/** End-to-end scoring of a complete submission. Website verification is passed in from the route. */
export function processSubmission(submission: AssessmentSubmission, websiteVerified: boolean): ScoredPayload {
  const { section_a, section_b, section_d } = submission;
  const { scores, ranked_os, top_os, second_os } = scoreAssessment(section_a, section_b);
  const flags = deriveFlags(section_a, section_b, section_d, websiteVerified);
  return {
    scores,
    ranked_os,
    top_os,
    second_os,
    closing_variant: determineClosingVariant(flags),
    flags,
    footprint: deriveFootprint(section_a, section_b),
  };
}

/** Version 4 UUID from the platform CSPRNG. Never exposed alone in a URL; links carry a signed token. */
export function generateSubmissionId(): string {
  return globalThis.crypto.randomUUID();
}

/**
 * True when the address resolves to a live domain: any HTTP response counts,
 * since some servers refuse HEAD or bot traffic. A DNS or connection failure
 * within 5 seconds does not. Only http(s) to a public-looking hostname.
 */
export async function verifyWebsite(url: string): Promise<boolean> {
  if (!url || typeof url !== "string") return false;
  const normalized = /^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`;
  let host: string;
  try {
    host = new URL(normalized).hostname;
  } catch {
    return false;
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host) || /^(localhost|.*\.local|.*\.internal)$/i.test(host)) return false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(normalized, { method: "HEAD", signal: controller.signal, redirect: "follow" });
    clearTimeout(timeout);
    return response.status > 0;
  } catch {
    return false;
  }
}

/** Company name for respondent copy, from the website domain. */
export function companyNameFromWebsite(website: string): string {
  if (!website) return "Your Company";
  const host = website.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(/[/?#]/)[0];
  const base = host.split(".")[0] ?? "";
  if (!base) return "Your Company";
  return base.split(/[-_]/).filter(Boolean).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
