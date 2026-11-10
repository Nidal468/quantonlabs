// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Modular Agent Program - Below-Threshold Routing
//
// Routes below-threshold respondents toward the Modular Agent Program.
// Instrumentation only: nothing this module computes reaches a respondent
// (DEVELOPER BRIEF ASSESSMENT, Stage 1 item 10).
//
// PROVISIONAL. The agent identifiers below are not governed. The Modular
// Agent Program is not yet versioned in the OS Framework, the Pricing
// Strategy, or the Definitions Index, and at least one name previously used
// here did not correspond to a real agent.
//
// Consequently nothing in this module reaches a respondent. The selection is
// computed for instrumentation only: it tells us which domain and which
// operational surface a below-threshold respondent presented, which is real
// signal regardless of what the agents end up being called. Client-facing
// copy names no agent.
//
// A modular engagement is not Quanton OS and is never a step toward it.

import type {
  InternalFlags,
  OperatingSystem,
  OSScore,
  SectionA,
} from "./types";

// ============================================================
// AGENTS
// ============================================================

export type ModularAgent =
  | "lead_follow_up"
  | "invoice_and_receivables"
  | "booking_and_confirmation";

/**
 * Internal identifiers only. Not respondent-facing, not confirmed, and not
 * to be used in any client artifact until the program is versioned.
 */
export const AGENT_NAME_PROVISIONAL: Record<ModularAgent, string> = {
  lead_follow_up: "Lead Follow-Up Agent",
  invoice_and_receivables: "Invoice and Receivables Agent",
  booking_and_confirmation: "Booking and Confirmation Agent",
};

// ============================================================
// SURFACE FILTER
// ============================================================

/**
 * Tests function presence from the respondent's A3 selection. Lead follow-up
 * is presumed present; invoicing is always present because Finance is always
 * active; booking needs the Customer service and scheduling function.
 */
function agentIsAvailable(agent: ModularAgent, sectionA: SectionA): boolean {
  switch (agent) {
    case "lead_follow_up":
    case "invoice_and_receivables":
      return true;
    case "booking_and_confirmation":
      return sectionA.functions.includes("customer");
  }
}

// ============================================================
// SELECTION
// ============================================================

// Which agents a weak domain can select, in preference order.
const DOMAIN_CANDIDATES: Record<OperatingSystem, ModularAgent[]> = {
  growth: ["lead_follow_up"],
  operations: ["booking_and_confirmation", "invoice_and_receivables"],
  // Strategy addresses operator judgment, which no single agent resolves.
  strategy: [],
  // Platform gaps are fixed by one function working end to end, not by
  // infrastructure, so they route to whatever operational agent is supported.
  platform: ["booking_and_confirmation", "invoice_and_receivables", "lead_follow_up"],
};

export interface ModularSelection {
  agent: ModularAgent | null;
  /** Domain that produced the selection, for instrumentation. */
  selected_by: OperatingSystem | null;
  /** Agents removed by the surface filter, for instrumentation. */
  filtered_out: ModularAgent[];
  /** True when no agent survived and the fallback applies. */
  fallback: boolean;
}

/**
 * Selection order: filter by surface, select by top_os, fall to second_os,
 * then fallback. Stated priority (C1) never overrides the diagnostic.
 */
export function selectModularAgent(
  sectionA: SectionA,
  scores: Record<OperatingSystem, OSScore>,
  rankedOs: OperatingSystem[],
  flags: InternalFlags
): ModularSelection {
  const allAgents: ModularAgent[] = [
    "lead_follow_up",
    "invoice_and_receivables",
    "booking_and_confirmation",
  ];

  const available = allAgents.filter(a => agentIsAvailable(a, sectionA));
  const filtered_out = allAgents.filter(a => !available.includes(a));

  for (const os of [rankedOs[0], rankedOs[1]]) {
    if (!os) continue;

    const candidates = DOMAIN_CANDIDATES[os].filter(a => available.includes(a));
    if (candidates.length === 0) continue;

    if (candidates.length === 1) {
      return { agent: candidates[0], selected_by: os, filtered_out, fallback: false };
    }

    // Leadership bottleneck present favours Booking and Confirmation: scheduling
    // decisions are the higher-frequency owner interrupt. Absent, receivables
    // is the heavier drag.
    const agent = flags.leadership_bottleneck
      ? candidates.find(a => a === "booking_and_confirmation") ?? candidates[0]
      : candidates.find(a => a === "invoice_and_receivables") ?? candidates[0];

    return { agent, selected_by: os, filtered_out, fallback: false };
  }

  return { agent: null, selected_by: null, filtered_out, fallback: true };
}
