// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Modular Agent Program - Below-Threshold Routing
//
// Routes below-threshold respondents toward the Modular Agent Program.
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
 * Tests function presence, not platform presence.
 *
 * Absence of an Integration Category means one of two things: the business
 * does not perform that function, or it performs it without a formal system.
 * For lead follow-up the second case is the norm below $1M and is the
 * qualifying signal rather than a disqualifier, so the agent is presumed
 * present.
 *
 * Invoicing and booking are genuinely not universal, so their absence is
 * informative and does filter.
 *
 * Note: operational_surface is the respondent's raw A3 selection. It is
 * deliberately not passed through the baseline forcing applied in
 * getActiveQuestions, which treats core data and financial systems as always
 * active for scoring purposes. Using the forced set here would make the
 * Invoice filter unable to exclude anything.
 */
function agentIsAvailable(agent: ModularAgent, sectionA: SectionA): boolean {
  const surface = new Set(sectionA.operational_surface);

  switch (agent) {
    case "lead_follow_up":
      // Presumed present. No exclusion condition in v1; instrumentation will
      // show whether one is ever needed.
      return true;

    case "invoice_and_receivables":
      return (
        surface.has("financial_systems") ||
        surface.has("commerce_and_transactions")
      );

    case "booking_and_confirmation":
      return surface.has("scheduling_and_workflow");
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

    // Owner bottleneck present favours Booking and Confirmation: scheduling
    // decisions are the higher-frequency owner interrupt. Absent, receivables
    // is the heavier drag.
    const agent = flags.owner_bottleneck
      ? candidates.find(a => a === "booking_and_confirmation") ?? candidates[0]
      : candidates.find(a => a === "invoice_and_receivables") ?? candidates[0];

    return { agent, selected_by: os, filtered_out, fallback: false };
  }

  return { agent: null, selected_by: null, filtered_out, fallback: true };
}

// ============================================================
// REPORT COPY
// ============================================================

/**
 * Deliberately empty of capability claims.
 *
 * The Modular Agent Program is not yet versioned in the OS Framework, the
 * Pricing Strategy, or the Definitions Index. Until it is, there is no
 * authoritative source for what each agent does, how long installation
 * takes, or what it costs, and inventing those details for a client-facing
 * report is not acceptable.
 *
 * The agent name itself is governed and can be used. Everything else waits
 * for the documents. When they land, the specifics belong here.
 */

export interface ModularReportBlock {
  header: string;
  body: string[];
  primary_cta: string;
}

/**
 * Client-facing block. Names no agent.
 *
 * Naming one commits the engagement before a conversation has happened, and
 * the names are not governed in any case. The report establishes that a
 * modular engagement is the right shape and routes to a person.
 */
export function buildModularBlock(
  selection: ModularSelection,
  topOs: OperatingSystem
): ModularReportBlock {
  if (selection.fallback) {
    return {
      header: "Where to Go From Here",
      body: [
        "A full system deployment is built for operational complexity your business has not reached yet, and recommending one at this stage would be the wrong advice.",
        "What this diagnostic found does not point at a single obvious fix either, which makes the useful next step a conversation rather than a recommendation.",
        "It costs nothing, it is not a qualification call, and if the honest answer is that nothing should be built yet, you will hear that.",
      ],
      primary_cta: "Book a scoping conversation",
    };
  }

  return {
    header: "Where to Go From Here",
    body: [
      "A full system deployment is built for operational complexity your business has not reached yet, and recommending one at this stage would be the wrong advice. That does not mean the answer is to wait.",
      `Most of the drag described above traces back to one constraint rather than four, and in your case it sits in the ${topOs} layer. That is the shape our Modular Agent Program is built for: a single agent installed against the one thing costing you the most, rather than a rebuild.`,
      "Which agent, what it would take, and whether it is the right call at all are worth a short conversation. Someone from Quanton Labs will reach out, or you can book that conversation now. It costs nothing and it is not a qualification call.",
    ],
    primary_cta: "Book a scoping conversation",
  };
}