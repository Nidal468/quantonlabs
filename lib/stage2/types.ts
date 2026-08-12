// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Type Definitions

import type { OperatingSystem, SeverityTier } from "@/lib/stage1";

// ============================================================
// RE-EXPORT STAGE 1 TYPES USED IN STAGE 2
// ============================================================

export type { OperatingSystem, SeverityTier };

// ============================================================
// SECTION 1 — BEHAVIORAL INFERENCE + VISION
// ============================================================

export type IdentityFrame =
  | "operator"
  | "builder"
  | "steward"
  | "visionary";

export type RiskStyle =
  | "loss_averse"
  | "opportunity_driven"
  | "pragmatic"
  | "growth_oriented";

export type TimeHorizon =
  | "short_term"
  | "medium_term"
  | "long_term"
  | "exit_legacy";

export type EmotionalDriver =
  | "financial_security"
  | "time_and_lifestyle"
  | "independence_and_legacy"
  | "achievement_and_scale";

export type DecisionActivator =
  | "loss_averse"
  | "vision"
  | "data"
  | "relationship";

export type VisionCategory =
  | "financial_freedom"
  | "time_and_lifestyle"
  | "family_and_legacy"
  | "exit_and_independence"
  | "growth_and_scale"
  | "proof_and_achievement";

export type VisionProximity =
  | "further_away"
  | "not_close"
  | "middle"
  | "closer"
  | "very_close";

export interface OwnerProfile {
  identity_frame: IdentityFrame;
  risk_style: RiskStyle;
  time_horizon: TimeHorizon;
  emotional_driver: EmotionalDriver;
  decision_activator: DecisionActivator;
  vision_category: VisionCategory;
  vision_proximity: VisionProximity;
  vision_open_text: string;          // 280 char max
}

// ============================================================
// SECTION 2 — REALITY CHECK RESPONSES
// ============================================================

export type TimeAllocation =
  | "almost_all_strategic"
  | "more_than_half_strategic"
  | "roughly_split"
  | "mostly_operational"
  | "almost_all_operational";

// Operations OS
export type ProcessResponse = "a" | "b" | "c" | "d";
export type VisibilityResponse = "a" | "b" | "c" | "d";
export type LateDiscoveryResponse = "a" | "b" | "c" | "d";
export type OwnerDependencyResponse = "a" | "b" | "c" | "d";

// Growth OS
export type LostOpportunityResponse = "a" | "b" | "c" | "d";
export type RevenueIndependenceResponse = "a" | "b" | "c" | "d";
export type LossVisibilityResponse = "a" | "b" | "c" | "d" | "e";

// Strategy OS
export type StrategyClarity = "a" | "b" | "c" | "d";
export type ThreeYearProjection = "a" | "b" | "c" | "d";

// People OS
export type PeopleTimeResponse = "a" | "b" | "c" | "d";
export type PeopleEnergyResponse = "a" | "b" | "c" | "d";

export type UrgencyRating =
  | "critical"
  | "important_not_urgent"
  | "significant_uncertain"
  | "came_to_understand";

export interface Section2Responses {
  time_allocation: TimeAllocation;

  // Operations (conditional on top_os or second_os === "operations")
  ops_process_response?: ProcessResponse;
  ops_visibility_response?: VisibilityResponse;
  ops_late_discovery?: LateDiscoveryResponse;       // conditional on visibility C or D
  ops_owner_dependency?: OwnerDependencyResponse;

  // Growth (conditional on top_os or second_os === "growth")
  growth_lost_opportunity?: LostOpportunityResponse;
  growth_revenue_independence?: RevenueIndependenceResponse;
  growth_revenue_pct_outbound?: number;             // slider 0-100
  growth_loss_visibility?: LossVisibilityResponse;

  // Strategy (conditional on top_os or second_os === "strategy")
  strategy_clarity?: StrategyClarity;
  strategy_three_year?: ThreeYearProjection;

  // People (conditional on top_os or second_os === "platform")
  people_time_response?: PeopleTimeResponse;
  people_energy_response?: PeopleEnergyResponse;
  people_hours_per_week?: number;                   // conditional on B/C/D

  urgency_rating: UrgencyRating;
}

// ============================================================
// SECTION 3 — COST INPUTS
// ============================================================

export type RevenueBand2 =
  | "under_1m"
  | "1m_3m"
  | "3m_5m"
  | "5m_10m"
  | "10m_20m"
  | "over_20m";

export type PayrollBand =
  | "under_25k"
  | "25k_50k"
  | "50k_100k"
  | "100k_250k"
  | "over_250k";

export type ReworkFrequency =
  | "rarely"
  | "once_twice_month"
  | "weekly"
  | "multiple_weekly";

export type ReworkCostBand =
  | "under_500"
  | "500_2000"
  | "2000_5000"
  | "over_5000";

export type LateDiscoveryMultiplier =
  | "same"
  | "twice"
  | "three_to_five"
  | "significantly_more";

export type ClientValueBand =
  | "under_5k"
  | "5k_15k"
  | "15k_50k"
  | "50k_150k"
  | "over_150k";

export type IdleCapitalBand =
  | "under_100k"
  | "100k_250k"
  | "250k_500k"
  | "500k_1m"
  | "over_1m";

export type PeopleGapCount =
  | "none"
  | "one"
  | "two_to_three"
  | "more_than_three";

export type PeopleGapCostBand =
  | "under_5k"
  | "5k_15k"
  | "15k_30k"
  | "over_30k";

export type VisibilityGapValue =
  | "under_50k"
  | "50k_150k"
  | "150k_500k"
  | "over_500k"
  | "dont_know";

export interface Section3Inputs {
  // Universal
  owner_hourly_rate: number;
  owner_non_strategic_hours_per_week: number;
  annual_revenue_band: RevenueBand2;

  // Operations OS
  team_productive_pct?: number;                     // slider 30-100
  monthly_payroll_band?: PayrollBand;
  rework_frequency?: ReworkFrequency;
  rework_cost_band?: ReworkCostBand;
  late_discovery_multiplier?: LateDiscoveryMultiplier;

  // Growth OS
  lost_opportunities_per_month?: number;
  client_value_band?: ClientValueBand;
  outbound_revenue_pct?: number;                    // slider 0-100
  visibility_gap_value?: VisibilityGapValue;        // conditional on E answer in S2

  // Strategy OS
  idle_capital_band?: IdleCapitalBand;
  decision_bottleneck_pct?: number;                 // slider 10-100

  // People OS
  people_hours_per_week?: number;
  people_gap_count?: PeopleGapCount;
  people_gap_cost_band?: PeopleGapCostBand;         // conditional on gap_count > none

  // Closing open text
  recovery_impact_text: string;                     // 280 char max, what would recovering half change
}

// ============================================================
// CALCULATED COST OF INACTION
// ============================================================

export interface CostOfInaction {
  owner_time_cost: number;
  revenue_leakage: number;
  operational_waste: number;
  people_gap_cost: number;
  opportunity_cost: number;
  total: number;
}

// ============================================================
// OWNER PROFILE OUTPUT (for brief generation)
// ============================================================

export interface Stage2Profile {
  owner_profile: OwnerProfile;
  section2: Section2Responses;
  section3: Section3Inputs;
  cost_of_inaction: CostOfInaction;
  top_os: OperatingSystem;
  second_os: OperatingSystem;
}

// ============================================================
// FULL STAGE 2 SUBMISSION PAYLOAD
// ============================================================

export interface Stage2Submission {
  submission_id: string;            // from Stage 1, passed via URL
  owner_profile: OwnerProfile;
  section2: Section2Responses;
  section3: Section3Inputs;
}

// ============================================================
// SHEET ROW ADDITIONS (Stage 2 columns appended to existing row)
// ============================================================

export interface Stage2SheetUpdate {
  submission_id: string;

  // Profile
  identity_frame: string;
  risk_style: string;
  time_horizon: string;
  emotional_driver: string;
  decision_activator: string;
  vision_category: string;
  vision_proximity: string;
  vision_open_text: string;

  // Reality check
  time_allocation: string;
  urgency_rating: string;

  // Cost of inaction
  owner_time_cost: number;
  revenue_leakage: number;
  operational_waste: number;
  people_gap_cost: number;
  opportunity_cost: number;
  cost_of_inaction_total: number;

  // Brief
  brief_url: string;
  brief_pdf_url: string;

  // Status
  stage_2_status: string;
  stage_2_completed_at: string;
  recovery_impact_text: string;
}