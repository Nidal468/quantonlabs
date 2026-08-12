// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Type Definitions
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

// ============================================================
// OPERATING SYSTEMS
// ============================================================

export type OperatingSystem = "strategy" | "platform" | "operations" | "growth";

export const OPERATING_SYSTEMS: OperatingSystem[] = [
  "strategy",
  "platform",
  "operations",
  "growth",
];

// ============================================================
// SECTION A — STRUCTURAL QUALIFIERS
// ============================================================

export type RevenueBand =
  | "under_1m"
  | "1m_3m"
  | "3m_8m"
  | "8m_15m"
  | "15m_20m"
  | "over_20m";

export type TeamSize =
  | "solo"
  | "2_5"
  | "6_15"
  | "16_30"
  | "31_50"
  | "over_50";

export type IntegrationCategory =
  | "core_data_systems"
  | "financial_systems"
  | "communication_channels"
  | "content_and_digital_presence"
  | "scheduling_and_workflow"
  | "commerce_and_transactions"
  | "people_and_compliance"
  | "external_data_and_intelligence";

export interface SectionA {
  revenue: RevenueBand;
  team_size: TeamSize;
  operational_surface: IntegrationCategory[];
}

// ============================================================
// SECTION B — SYMPTOM DIAGNOSTIC
// ============================================================

// Every Section B answer is a weight integer 0-3
export type QuestionWeight = 0 | 1 | 2 | 3;

// Section B responses keyed by question_id
// Example: { "B.Core.1": 2, "B.Core.2": 1, "B.Commerce.1": 3 }
export type SectionB = Record<string, QuestionWeight>;

// ============================================================
// SECTION C — PRIORITY SURFACING
// ============================================================

export type PriorityOption =
  | "strategy_phrased"
  | "platform_phrased"
  | "operations_phrased"
  | "growth_phrased"
  | "owner_capacity"
  | "visibility_reporting";

export interface SectionC {
  priority_os: PriorityOption;
  outcome_text: string | null;
}

// ============================================================
// SECTION D — DELIVERY
// ============================================================

export type RespondentRole =
  | "founder_owner"
  | "executive_leadership"
  | "senior_operator"
  | "other";

export interface SectionD {
  first_name: string;
  last_name: string;
  work_email: string;
  phone: string;
  website: string;
  role: RespondentRole;
  location: string | null;
}

// ============================================================
// FULL SUBMISSION PAYLOAD (client → route.ts)
// ============================================================

export interface AssessmentSubmission {
  section_a: SectionA;
  section_b: SectionB;
  section_c: SectionC;
  section_d: SectionD;
}

// ============================================================
// SCORED OUTPUT
// ============================================================

export type SeverityTier =
  | "architected"
  | "functional_gap"
  | "structural_gap"
  | "critical_gap";

export interface OSScore {
  raw: number;               // Sum of weighted responses (primary full + secondary half)
  max_possible: number;      // Maximum possible raw score given activated question set
  normalized: number;        // 0-100 integer
  tier: SeverityTier;
  dots: 1 | 2 | 3 | 4 | 5;   // Five-dot indicator for report visualization
}

export interface ScoredPayload {
  // Ranking
  scores: Record<OperatingSystem, OSScore>;
  ranked_os: OperatingSystem[];  // length 4, highest severity first
  top_os: OperatingSystem;
  second_os: OperatingSystem;

  // Closing variant
  closing_variant: ClosingVariant;

  // Internal flags
  flags: InternalFlags;

  // Profile classifications
  complexity_profile: ComplexityProfile;
  configuration_profile: ConfigurationProfile;
}

// ============================================================
// CLOSING VARIANT
// ============================================================

export type ClosingVariant =
  | "qualified"
  | "below_threshold"
  | "above_segment";

// ============================================================
// INTERNAL FLAGS (pre-call brief)
// ============================================================

export interface InternalFlags {
  decision_maker: boolean;
  free_email: boolean;
  phone_captured: boolean;
  website_verified: boolean;
  above_threshold: boolean;
  below_threshold: boolean;
  owner_bottleneck: boolean;        // B.Core.3 weight >= 2
  fragmented_ai: boolean;           // B.Core.6 weight >= 2
  compliance: boolean;              // B.Scale.4 weight = 3 (behind where we should be)
  atypical_profile: boolean;        // Missing Core Data or Financial in A3
}

// ============================================================
// PROFILE CLASSIFICATIONS
// ============================================================

export type ComplexityProfile = "standard" | "complex" | "advanced";

export type ConfigurationProfile = "entry" | "mid" | "advanced";

// ============================================================
// QUESTION BANK METADATA
// ============================================================

export interface QuestionDefinition {
  id: string;                       // e.g., "B.Core.1"
  block: QuestionBlock;
  primary_os: OperatingSystem;
  secondary_os?: OperatingSystem;
  activation: ActivationRule;
}

export type QuestionBlock =
  | "core"
  | "core_data"
  | "financial"
  | "communication"
  | "content"
  | "scheduling"
  | "commerce"
  | "people"
  | "external"
  | "scale";

export type ActivationRule =
  | { type: "always" }
  | { type: "category"; category: IntegrationCategory }
  | { type: "team_size"; min: TeamSize };

// ============================================================
// SHEET ROW (for Google Sheets write)
// ============================================================

export interface SheetRow {
  // Identity
  submission_id: string;
  submitted_at: string;             // ISO 8601
  closing_variant: string;

  // Respondent
  first_name: string;
  last_name: string;
  work_email: string;
  phone: string;
  website: string;
  role: string;
  location: string;

  // Section A context
  revenue_band: string;
  team_size: string;
  integration_categories: string;   // comma-joined
  integration_category_count: number;

  // Section C
  priority_os: string;
  outcome_text: string;

  // Normalized scores
  strategy_score: number;
  platform_score: number;
  operations_score: number;
  growth_score: number;

  // Tiers
  strategy_tier: string;
  platform_tier: string;
  operations_tier: string;
  growth_tier: string;

  // Ranking
  top_os: string;
  top_os_score: number;
  second_os: string;
  second_os_score: number;

  // Flags
  complexity_profile: string;
  configuration_profile: string;
  decision_maker: boolean;
  free_email: boolean;
  phone_captured: boolean;
  website_verified: boolean;
  above_threshold: boolean;
  below_threshold: boolean;
  owner_bottleneck: boolean;
  fragmented_ai: boolean;
  compliance: boolean;
  atypical_profile: boolean;

  // Report metadata
  report_url: string;
  pdf_url: string;
  report_accessed: boolean;
  report_access_count: number;

  // Stage 2 tracking (empty on initial write)
  stage_2_eligible: boolean;
  stage_2_status: string;
  stage_2_invited_at: string;
  stage_2_completed_at: string;
  call_booked: boolean;
  call_booked_at: string;
  discovery_brief_sent: string;
  agreement_sent: string;
  agreement_executed: string;
  lifecycle_stage: string;

  // Ops
  notes: string;
  last_updated: string;
}
