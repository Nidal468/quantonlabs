// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Scoring and Cost of Inaction Engine

import type {
  Section3Inputs,
  CostOfInaction,
  PayrollBand,
  ReworkFrequency,
  ReworkCostBand,
  ClientValueBand,
  IdleCapitalBand,
  PeopleGapCostBand,
  LateDiscoveryMultiplier,
} from "./types";

// ============================================================
// BAND MIDPOINT RESOLVERS
// ============================================================
// Each band resolves to a conservative midpoint for calculation.
// These are estimates, not audit figures. Phase 1 replaces them.

function resolvePayroll(band: PayrollBand): number {
  switch (band) {
    case "under_25k":     return 20000;
    case "25k_50k":       return 37500;
    case "50k_100k":      return 75000;
    case "100k_250k":     return 175000;
    case "over_250k":     return 300000;
  }
}

function resolveReworkCost(band: ReworkCostBand): number {
  switch (band) {
    case "under_500":     return 300;
    case "500_2000":      return 1250;
    case "2000_5000":     return 3500;
    case "over_5000":     return 7500;
  }
}

function resolveReworkFrequency(freq: ReworkFrequency): number {
  // Returns annual event count
  switch (freq) {
    case "rarely":              return 6;
    case "once_twice_month":    return 18;
    case "weekly":              return 52;
    case "multiple_weekly":     return 104;
  }
}

function resolveLateMultiplier(mult: LateDiscoveryMultiplier): number {
  switch (mult) {
    case "same":                return 1.0;
    case "twice":               return 2.0;
    case "three_to_five":       return 4.0;
    case "significantly_more":  return 6.0;
  }
}

function resolveClientValue(band: ClientValueBand): number {
  switch (band) {
    case "under_5k":      return 3500;
    case "5k_15k":        return 10000;
    case "15k_50k":       return 32500;
    case "50k_150k":      return 100000;
    case "over_150k":     return 200000;
  }
}

function resolveIdleCapital(band: IdleCapitalBand): number {
  switch (band) {
    case "under_100k":    return 75000;
    case "100k_250k":     return 175000;
    case "250k_500k":     return 375000;
    case "500k_1m":       return 750000;
    case "over_1m":       return 1250000;
  }
}

function resolvePeopleGapCost(band: PeopleGapCostBand): number {
  // Monthly cost — will be annualized in calculation
  switch (band) {
    case "under_5k":      return 3500;
    case "5k_15k":        return 10000;
    case "15k_30k":       return 22500;
    case "over_30k":      return 40000;
  }
}

// ============================================================
// COST OF INACTION ENGINE
// ============================================================

const IDLE_CAPITAL_RETURN_RATE = 0.05; // 5% conservative annual return

export function calculateCostOfInaction(
  inputs: Section3Inputs
): CostOfInaction {

  // ── 1. Owner Time Cost ─────────────────────────────────────
  // Total owner hours on non-strategic work × hourly rate × 52 weeks
  const owner_time_cost = Math.round(
    inputs.owner_non_strategic_hours_per_week *
    inputs.owner_hourly_rate *
    52
  );

  // ── 2. Revenue Leakage ────────────────────────────────────
  // Lost opportunities per month × 12 × average client value
  let revenue_leakage = 0;
  if (
    inputs.lost_opportunities_per_month !== undefined &&
    inputs.client_value_band !== undefined
  ) {
    revenue_leakage = Math.round(
      inputs.lost_opportunities_per_month *
      12 *
      resolveClientValue(inputs.client_value_band)
    );
  }

  // ── 3. Operational Waste ──────────────────────────────────
  // Team productivity loss + rework cost
  let operational_waste = 0;

  if (
    inputs.team_productive_pct !== undefined &&
    inputs.monthly_payroll_band !== undefined
  ) {
    const unproductive_pct = (100 - inputs.team_productive_pct) / 100;
    const annual_payroll = resolvePayroll(inputs.monthly_payroll_band) * 12;
    const productivity_loss = Math.round(annual_payroll * unproductive_pct);
    operational_waste += productivity_loss;
  }

  if (
    inputs.rework_frequency !== undefined &&
    inputs.rework_cost_band !== undefined
  ) {
    const annual_events = resolveReworkFrequency(inputs.rework_frequency);
    const cost_per_event = resolveReworkCost(inputs.rework_cost_band);
    let rework_cost = annual_events * cost_per_event;

    // Apply late discovery multiplier if captured
    if (inputs.late_discovery_multiplier !== undefined) {
      rework_cost *= resolveLateMultiplier(inputs.late_discovery_multiplier);
    }

    operational_waste += Math.round(rework_cost);
  }

  // ── 4. People Gap Cost ────────────────────────────────────
  // Annual cost of vacant or underperforming roles
  let people_gap_cost = 0;
  if (
    inputs.people_gap_count !== undefined &&
    inputs.people_gap_count !== "none" &&
    inputs.people_gap_cost_band !== undefined
  ) {
    people_gap_cost = Math.round(
      resolvePeopleGapCost(inputs.people_gap_cost_band) * 12
    );
  }

  // Add people management owner time cost if captured separately
  if (inputs.people_hours_per_week !== undefined) {
    const people_owner_time = Math.round(
      inputs.people_hours_per_week *
      inputs.owner_hourly_rate *
      52
    );
    people_gap_cost += people_owner_time;
  }

  // ── 5. Opportunity Cost ───────────────────────────────────
  // Idle capital × 5% conservative return rate
  let opportunity_cost = 0;
  if (inputs.idle_capital_band !== undefined) {
    opportunity_cost = Math.round(
      resolveIdleCapital(inputs.idle_capital_band) *
      IDLE_CAPITAL_RETURN_RATE
    );
  }

  const total = Math.round(
    owner_time_cost +
    revenue_leakage +
    operational_waste +
    people_gap_cost +
    opportunity_cost
  );

  return {
    owner_time_cost,
    revenue_leakage,
    operational_waste,
    people_gap_cost,
    opportunity_cost,
    total,
  };
}

// ============================================================
// FORMATTERS
// ============================================================

/**
 * Format a dollar figure for display in the brief and UI.
 * Rounds to nearest thousand for figures over $10K.
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 10_000) {
    const rounded = Math.round(amount / 1000) * 1000;
    return `$${rounded.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Returns the three-year cost of inaction for the rhetorical
 * closing question in Section 4.
 */
export function threeYearCost(annual: number): string {
  return formatCurrency(annual * 3);
}