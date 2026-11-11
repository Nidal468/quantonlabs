// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Internal Flags, Footprint Estimate, Closing Variant
// Source: ASSESSMENT STAGE 1 QUESTION BANK (Internal Outputs)
// Internal only. Nothing in this file reaches a respondent.

import type { ClosingVariant, FootprintEstimate, InternalFlags, SectionA, SectionB, SectionD } from "./types";
import { getQuestionById, TEAM_RANK, weightOf } from "./questions";

// Confirmed list per decision on 18 Apr 2026 (unchanged in the question bank rebuild).
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "protonmail.com",
  "mail.com", "live.com", "msn.com", "yandex.com", "zoho.com", "gmx.com",
]);

const w = (b: SectionB, id: string) => weightOf(getQuestionById(id)!, b[id]);
const atLeast2 = (b: SectionB, id: string) => (w(b, id) ?? 0) >= 2;

export function deriveFlags(a: SectionA, b: SectionB, d: SectionD, websiteVerified: boolean): InternalFlags {
  const domain = (d.work_email.split("@")[1] ?? "").toLowerCase().trim();
  return {
    below_threshold: a.revenue === "under_2m",
    above_segment: a.revenue === "over_100m" || a.team_size === "over_250",
    managing_load: atLeast2(b, "B.Core.1"),
    leadership_bottleneck: atLeast2(b, "B.Core.9"),
    financial_clarity_gap: ["B.Core.3", "B.Core.4", "B.Core.5", "B.Core.6"].filter((id) => atLeast2(b, id)).length >= 2,
    capital_readiness_gap: atLeast2(b, "B.Core.11"),
    fragmented_ai: b["B.Core.14"] === "individual" || b["B.Core.14"] === "leadership_only",
    compliance: (b["B.Core.8"] ?? "").startsWith("yes_"),
    decision_maker: d.role === "owner_founder" || d.role === "ceo_president" || d.role === "executive",
    free_email: FREE_EMAIL_DOMAINS.has(domain),
    phone_captured: typeof d.phone === "string" && d.phone.trim().length > 0,
    website_verified: websiteVerified,
  };
}

/**
 * Below Threshold selects Variant 2. Above Segment selects Variant 3.
 * A company under $2M is below threshold even with a large team.
 */
export function determineClosingVariant(f: Pick<InternalFlags, "below_threshold" | "above_segment">): ClosingVariant {
  if (f.below_threshold) return "below_threshold";
  if (f.above_segment) return "above_segment";
  return "qualified";
}

/** Phase 1 footprint estimate: unit counts only. No dollar values. */
export function deriveFootprint(a: SectionA, b: SectionB): FootprintEstimate {
  const systems = a.functions.length + 1;
  const compliance = (b["B.Core.8"] ?? "").startsWith("yes_");
  const above: FootprintEstimate["above_base_units"] = [];
  if (TEAM_RANK[a.team_size] > TEAM_RANK["10_25"]) above.push("people");
  if (a.locations !== "1") above.push("locations");
  if (systems > 5) above.push("systems");
  if (compliance) above.push("compliance");
  return { people: a.team_size, locations: a.locations, systems, compliance, result: above.length ? "above_base" : "base", above_base_units: above };
}

export function footprintLabel(f: FootprintEstimate): string {
  if (f.result === "base") return "Base footprint";
  const names = { people: "people on the system", locations: "locations", systems: "systems", compliance: "compliance mapping" };
  return `Above base: ${f.above_base_units.map((u) => names[u]).join(", ")}`;
}
