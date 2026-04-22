// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Internal Flags and Profile Classification
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

import type {
  ComplexityProfile,
  ConfigurationProfile,
  InternalFlags,
  OSScore,
  OperatingSystem,
  SectionA,
  SectionB,
  SectionD,
} from "./types";

// ============================================================
// FREE-EMAIL DOMAIN LIST
// ============================================================
// Confirmed list per decision on 18 Apr 2026
// Expand as edge cases arise

const FREE_EMAIL_DOMAINS = new Set<string>([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "mail.com",
  "live.com",
  "msn.com",
  "yandex.com",
  "zoho.com",
  "gmx.com",
]);

// ============================================================
// INTERNAL FLAGS
// ============================================================

/**
 * Derives all internal flags for the pre-call brief.
 * These flags feed the Google Sheet row and the Gmail notification.
 * They are never displayed to the respondent.
 */
export function deriveFlags(
  sectionA: SectionA,
  sectionB: SectionB,
  sectionD: SectionD,
  websiteVerified: boolean
): InternalFlags {
  return {
    decision_maker: isDecisionMaker(sectionD.role),
    free_email: isFreeEmail(sectionD.work_email),
    phone_captured: isPhoneCaptured(sectionD.phone),
    website_verified: websiteVerified,
    above_threshold: isAboveThreshold(sectionA),
    below_threshold: isBelowThreshold(sectionA),
    owner_bottleneck: isOwnerBottleneck(sectionB),
    fragmented_ai: isFragmentedAI(sectionB),
    compliance: hasComplianceGap(sectionB),
    atypical_profile: isAtypicalProfile(sectionA),
  };
}

// ============================================================
// INDIVIDUAL FLAG LOGIC
// ============================================================

function isDecisionMaker(role: string): boolean {
  return role === "founder_owner" || role === "executive_leadership";
}

function isFreeEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return false;
  return FREE_EMAIL_DOMAINS.has(domain);
}

function isPhoneCaptured(phone: string): boolean {
  // Phone was validated upstream; this flag confirms it exists and is non-empty
  return typeof phone === "string" && phone.trim().length > 0;
}

function isAboveThreshold(sectionA: SectionA): boolean {
  return sectionA.revenue === "over_20m" || sectionA.team_size === "over_50";
}

function isBelowThreshold(sectionA: SectionA): boolean {
  return sectionA.revenue === "under_1m";
}

function isOwnerBottleneck(sectionB: SectionB): boolean {
  // B.Core.3 — "Daily" (weight 2) or "Constantly" (weight 3)
  const weight = sectionB["B.Core.3"];
  return typeof weight === "number" && weight >= 2;
}

function isFragmentedAI(sectionB: SectionB): boolean {
  // B.Core.6 — weight 2 or 3 per Definitions Index qualification signal
  const weight = sectionB["B.Core.6"];
  return typeof weight === "number" && weight >= 2;
}

function hasComplianceGap(sectionB: SectionB): boolean {
  // B.Scale.4 — "Yes, and we are behind where we should be" (weight 3)
  // Only triggers compliance flag; weight 0 (no compliance obligations OR
  // structured governance) does not trigger
  const weight = sectionB["B.Scale.4"];
  return weight === 3;
}

function isAtypicalProfile(sectionA: SectionA): boolean {
  // A3 missing Core Data Systems OR Financial Systems
  // Per OS Framework v5.1, both are always active — but if the respondent
  // failed to check them, flag for research review
  const surface = new Set(sectionA.operational_surface);
  return (
    !surface.has("core_data_systems") || !surface.has("financial_systems")
  );
}

// ============================================================
// COMPLEXITY PROFILE
// ============================================================

/**
 * Derives Complexity Profile per QUESTION BANK v1.1:
 *   Standard / Complex / Advanced
 *
 * Drivers:
 *   - A1 revenue band
 *   - A2 team size
 *   - A3 integration category count
 *   - B.Scale.4 compliance response (elevates to Advanced)
 */
export function deriveComplexityProfile(
  sectionA: SectionA,
  sectionB: SectionB
): ComplexityProfile {
  // Compliance gap is an automatic elevator to Advanced
  if (hasComplianceGap(sectionB)) return "advanced";

  const revenue = sectionA.revenue;
  const teamSize = sectionA.team_size;
  const categoryCount = sectionA.operational_surface.length;

  // Revenue-driven baseline
  if (revenue === "15m_20m" || revenue === "over_20m") {
    return "advanced";
  }

  if (revenue === "8m_15m") {
    // Elevates to Advanced if broad operational surface OR large team
    if (categoryCount >= 6 || teamSize === "31_50" || teamSize === "over_50") {
      return "advanced";
    }
    return "complex";
  }

  if (revenue === "3m_8m") {
    // Complex if broad surface or growing team; otherwise Standard
    if (categoryCount >= 5 || teamSize === "16_30" || teamSize === "31_50") {
      return "complex";
    }
    return "standard";
  }

  // $1M-$3M or under $1M
  return "standard";
}

// ============================================================
// CONFIGURATION PROFILE
// ============================================================

/**
 * Derives Configuration Profile per QUESTION BANK v1.1:
 *   Entry / Mid / Advanced
 *
 * Drivers:
 *   - Integration category breadth (A3)
 *   - Severity scores across the four OS
 *   - B.Core.6 AI readiness response
 */
export function deriveConfigurationProfile(
  sectionA: SectionA,
  sectionB: SectionB,
  scores: Record<OperatingSystem, OSScore>
): ConfigurationProfile {
  const categoryCount = sectionA.operational_surface.length;
  const aiReadiness = sectionB["B.Core.6"] ?? 3;

  // Average normalized severity across the four OS
  const avgSeverity =
    (scores.strategy.normalized +
      scores.platform.normalized +
      scores.operations.normalized +
      scores.growth.normalized) /
    4;

  // Advanced: broad surface + high severity + fragmented AI
  if (categoryCount >= 7 && avgSeverity >= 60 && aiReadiness >= 2) {
    return "advanced";
  }

  // Mid: moderate surface + moderate-to-high severity
  if (categoryCount >= 5 && avgSeverity >= 45) {
    return "mid";
  }

  // Mid also covers high-severity narrower operations
  if (avgSeverity >= 65) {
    return "mid";
  }

  return "entry";
}

// ============================================================
// CLOSING VARIANT
// ============================================================

/**
 * Determines the closing variant for report output and sheet tab routing.
 * Logical order matters — below_threshold takes precedence over
 * above_segment to handle the rare case of sub-$1M revenue at 50+ team size.
 */
export function determineClosingVariant(
  flags: InternalFlags
): "qualified" | "below_threshold" | "above_segment" {
  if (flags.below_threshold) return "below_threshold";
  if (flags.above_threshold) return "above_segment";
  return "qualified";
}