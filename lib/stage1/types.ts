// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Type Definitions
// Source: ASSESSMENT STAGE 1 QUESTION BANK

// ============================================================
// OPERATING SYSTEMS
// ============================================================

export type OperatingSystem = "strategy" | "platform" | "operations" | "growth";
export const OPERATING_SYSTEMS: OperatingSystem[] = ["strategy", "platform", "operations", "growth"];

// ============================================================
// SECTION A: ABOUT THE COMPANY
// ============================================================

export type RevenueBand = "under_2m" | "2m_5m" | "5m_15m" | "15m_40m" | "40m_100m" | "over_100m";
export type TeamSize = "solo" | "2_9" | "10_25" | "26_50" | "51_100" | "101_250" | "over_250";
export type CompanyFunction = "field" | "production" | "supply" | "estimating" | "customer" | "people" | "marketing";
export type Locations = "1" | "2_3" | "4_10" | "over_10";

export interface SectionA {
  revenue: RevenueBand;
  team_size: TeamSize;
  functions: CompanyFunction[];
  locations: Locations;
}

// ============================================================
// SECTION B: HOW THE COMPANY RUNS
// ============================================================

export type QuestionWeight = 0 | 1 | 2 | 3;

/** Section B answers keyed by question ID; the value is the answer key, never the weight. */
export type SectionB = Record<string, string>;

// ============================================================
// SECTION C: PRIORITY
// ============================================================

export type PriorityOption = OperatingSystem | "leadership_capacity" | "visibility";

export interface SectionC {
  priority: PriorityOption;
  outcome_text: string | null;
}

// ============================================================
// SECTION D: DELIVERY
// ============================================================

export type RespondentRole = "owner_founder" | "ceo_president" | "executive" | "director_manager" | "other";

export interface SectionD {
  first_name: string;
  last_name: string;
  work_email: string;
  phone: string;
  website: string;
  role: RespondentRole;
  location: string | null;
}

export interface AssessmentSubmission {
  section_a: SectionA;
  section_b: SectionB;
  section_c: SectionC;
  section_d: SectionD;
}

// ============================================================
// SCORED OUTPUT
// ============================================================

export type SeverityTier = "architected" | "functional_gap" | "structural_gap" | "critical_gap";

export interface OSScore {
  raw: number;
  max_possible: number;
  primary_raw: number; // primary-weight contribution only, for tie breaks
  normalized: number; // 0 to 100 integer
  tier: SeverityTier;
  dots: 1 | 2 | 3 | 4 | 5;
}

export type ClosingVariant = "qualified" | "below_threshold" | "above_segment";

export interface InternalFlags {
  below_threshold: boolean;
  above_segment: boolean;
  managing_load: boolean;
  leadership_bottleneck: boolean;
  financial_clarity_gap: boolean;
  capital_readiness_gap: boolean;
  fragmented_ai: boolean;
  compliance: boolean;
  decision_maker: boolean;
  free_email: boolean;
  phone_captured: boolean;
  website_verified: boolean;
}

export interface FootprintEstimate {
  people: TeamSize;
  locations: Locations;
  systems: number; // active functions plus Finance
  compliance: boolean;
  result: "base" | "above_base";
  above_base_units: ("people" | "locations" | "systems" | "compliance")[];
}

export interface ScoredPayload {
  scores: Record<OperatingSystem, OSScore>;
  ranked_os: OperatingSystem[];
  top_os: OperatingSystem;
  second_os: OperatingSystem;
  closing_variant: ClosingVariant;
  flags: InternalFlags;
  footprint: FootprintEstimate;
}

// ============================================================
// QUESTION BANK
// ============================================================

export type QuestionBlock = "core" | "finance" | CompanyFunction | "scale";

export interface AnswerOption {
  key: string;
  label: string;
  weight: QuestionWeight;
}

export interface QuestionDefinition {
  id: string;
  name: string;
  block: QuestionBlock;
  text: string;
  options: AnswerOption[];
  primary_os: OperatingSystem;
  secondary_os?: OperatingSystem;
  /** Minimum A2 rank for Leadership Scale questions. */
  min_team?: TeamSize;
}
