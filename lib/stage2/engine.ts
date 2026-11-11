// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - Cost Engine
// Source: ASSESSMENT STAGE 2 QUESTION BANK (Cost Engine)
//
// Band values use the middle of each band; the open top band uses its floor.
// A "Under X" band runs from zero. A missing or "Not sure" input removes the
// category and records a finding; it is never computed as zero.

import type { OperatingSystem, RevenueBand, TeamSize } from "@/lib/stage1/types";
import type { S2Answers } from "./questions";

// ============================================================
// CONSTANTS: every midpoint in one table
// ============================================================

export const IDLE_CAPITAL_RETURN = 0.05;

const MONEY = { u25k: 12_500, "25k_50k": 37_500, "50k_100k": 75_000, "100k_250k": 175_000, "250k_500k": 375_000, o500k: 500_000 };

export const MIDPOINTS: Record<string, Record<string, number>> = {
  A1: { under_2m: 1_000_000, "2m_5m": 3_500_000, "5m_15m": 10_000_000, "15m_40m": 27_500_000, "40m_100m": 70_000_000, over_100m: 100_000_000 },
  A2: { solo: 1, "2_9": 5.5, "10_25": 17.5, "26_50": 38, "51_100": 75.5, "101_250": 175.5, over_250: 250 },
  "N.Leaders": { "1": 1, "2_3": 2.5, "4_6": 5, "7p": 7 },
  "N.Managing": { u5: 2.5, "5_10": 7.5, "11_20": 15.5, o20: 20 },
  "N.Overhead": MONEY,
  "N.Margin": { u20: 0.1, "20_30": 0.25, "31_40": 0.355, "41_50": 0.455, o50: 0.5 },
  "N.Miss": { u10: 0.05, "10_25": 0.175, "26_50": 0.38, o50: 0.5 },
  "N.MissBy": { u5: 0.025, "5_10": 0.075, "11_20": 0.155, o20: 0.2 },
  "N.Profit": { "5": 0.05, "10": 0.1, "15": 0.15, "20p": 0.2 },
  "N.Burden": { u25: 12.5, "25_40": 32.5, "41_60": 50.5, o60: 60 },
  "N.Ops.1": MONEY,
  "N.Ops.2": { "90p": 0.9, "75_89": 0.82, "60_74": 0.67, u60: 0.3 },
  /** Rework events per year: once or twice a month = 1.5 a month; several a week = 3 a week. */
  "N.Ops.3": { rarely: 0, monthly: 18, weekly: 52, several_weekly: 156 },
  "N.Ops.4": { u500: 250, "500_2k": 1_250, "2k_5k": 3_500, o5k: 5_000 },
  "N.Growth.2": { u5k: 2_500, "5k_15k": 10_000, "15k_50k": 32_500, "50k_150k": 100_000, o150k: 150_000 },
  "N.Strat.1": { u100k: 50_000, "100k_250k": 175_000, "250k_500k": 375_000, "500k_1m": 750_000, o1m: 1_000_000 },
  "R.Plat.2": { u1: 0.5, "1_3": 2, "4_8": 6, o8: 8 },
  /** Week bar: share of the respondent's week toward direction. */
  "R.Time": { almost_all: 0.9, more_half: 0.65, split: 0.5, mostly_running: 0.3, nearly_all_running: 0.1 },
};

const mid = (id: string, key: string | undefined): number | null => (key != null && key in (MIDPOINTS[id] ?? {}) ? MIDPOINTS[id][key] : null);

// ============================================================
// OUTPUT
// ============================================================

export type CostCategory = "leadership_time" | "margin_leakage" | "revenue_leakage" | "operational_waste" | "duplicate_work" | "idle_capital";

export type Finding =
  | "breakeven_not_computable"
  | "margin_not_tracked"
  | "margin_miss_size_unknown"
  | "labor_burden_unknown";

export type Position = "below" | "between" | "above" | "not_reachable" | "no_target" | "not_computable";

export interface EngineResult {
  monthly_revenue: number;
  annual_revenue: number;
  breakeven: number | null;
  profit_line: number | null;
  margin: number | null;
  profit_target: number | null;
  position: Position;
  gap_to_profit_line: number | null;
  costs: Partial<Record<CostCategory, number>>;
  duplicate_hours: number | null;
  total: number;
  share_of_revenue: number | null;
  findings: Finding[];
  week_direction: number;
}

export interface EngineInput {
  revenue: RevenueBand;
  team_size: TeamSize;
  focus: OperatingSystem[];
  answers: S2Answers;
}

export function runEngine({ revenue, team_size, focus, answers: a }: EngineInput): EngineResult {
  const findings: Finding[] = [];
  const costs: Partial<Record<CostCategory, number>> = {};
  const annual = mid("A1", revenue) ?? 0;
  const monthly = annual / 12;

  // Break-even and the profit-engineered break-even
  const overhead = mid("N.Overhead", a["N.Overhead"]);
  const margin = mid("N.Margin", a["N.Margin"]);
  const profit = mid("N.Profit", a["N.Profit"]);
  let breakeven: number | null = null;
  let profitLine: number | null = null;
  let position: Position;
  let gap: number | null = null;
  if (overhead == null || margin == null) {
    position = "not_computable";
    findings.push("breakeven_not_computable");
  } else {
    breakeven = overhead / margin;
    if (profit == null) position = "no_target";
    else if (margin <= profit) position = "not_reachable";
    else {
      profitLine = overhead / (margin - profit);
      gap = Math.max(0, profitLine - monthly);
      position = monthly < breakeven ? "below" : monthly < profitLine ? "between" : "above";
    }
  }

  // Leadership time on managing
  const rate = Number(a["N.Rate"]);
  const leaders = mid("N.Leaders", a["N.Leaders"]);
  const managing = mid("N.Managing", a["N.Managing"]);
  if (Number.isFinite(rate) && rate > 0 && leaders != null && managing != null) costs.leadership_time = rate * leaders * managing * 52;

  // Margin leakage
  if (a["N.Miss"] === "no_track") findings.push("margin_not_tracked");
  else {
    const share = mid("N.Miss", a["N.Miss"]);
    const by = mid("N.MissBy", a["N.MissBy"]);
    if (share != null && by != null) costs.margin_leakage = annual * share * by;
    else findings.push("margin_miss_size_unknown");
  }

  // Labor burden (finding applies to every respondent)
  const burden = mid("N.Burden", a["N.Burden"]);
  if (burden == null) findings.push("labor_burden_unknown");

  // Growth: revenue leakage
  if (focus.includes("growth")) {
    const lost = Number(a["N.Growth.1"]);
    const ltv = mid("N.Growth.2", a["N.Growth.2"]);
    if (Number.isFinite(lost) && lost >= 0 && ltv != null) costs.revenue_leakage = lost * 12 * ltv;
  }

  // Operations: operational waste
  if (focus.includes("operations")) {
    const payroll = mid("N.Ops.1", a["N.Ops.1"]);
    const productive = mid("N.Ops.2", a["N.Ops.2"]);
    const events = mid("N.Ops.3", a["N.Ops.3"]);
    const each = a["N.Ops.3"] === "rarely" ? 0 : mid("N.Ops.4", a["N.Ops.4"]);
    if (payroll != null && productive != null && events != null && each != null) costs.operational_waste = payroll * 12 * (1 - productive) + events * each;
  }

  // Platform: duplicate work, hours always; cost only with a known burden
  let dupHours: number | null = null;
  if (focus.includes("platform")) {
    const hrs = mid("R.Plat.2", a["R.Plat.2"]);
    const heads = mid("A2", team_size);
    if (hrs != null && heads != null) {
      dupHours = hrs * heads * 52;
      if (burden != null) costs.duplicate_work = dupHours * burden;
    }
  }

  // Strategy: idle capital at the assumed return
  if (focus.includes("strategy")) {
    const cash = mid("N.Strat.1", a["N.Strat.1"]);
    if (cash != null) costs.idle_capital = cash * IDLE_CAPITAL_RETURN;
  }

  const total = Object.values(costs).reduce((s, v) => s + (v ?? 0), 0);
  return {
    monthly_revenue: monthly,
    annual_revenue: annual,
    breakeven,
    profit_line: profitLine,
    margin,
    profit_target: profit,
    position,
    gap_to_profit_line: gap,
    costs,
    duplicate_hours: dupHours,
    total,
    share_of_revenue: annual > 0 && total > 0 ? total / annual : null,
    findings,
    week_direction: mid("R.Time", a["R.Time"]) ?? 0.5,
  };
}
