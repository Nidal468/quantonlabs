// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Question Bank
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

import type { QuestionDefinition } from "./types";

// ============================================================
// QUESTION BANK
// ============================================================
// Authoritative mapping of every Section B question to its
// Primary OS, Secondary OS, block membership, and activation rule.
// Matches QUESTION BANK v1.1 exactly.
// ============================================================

export const QUESTION_BANK: QuestionDefinition[] = [
  // --------------------------------------------------------
  // B.Core — Universal Questions (always asked)
  // --------------------------------------------------------
  {
    id: "B.Core.1",
    block: "core",
    primary_os: "growth",
    activation: { type: "always" },
  },
  {
    id: "B.Core.2",
    block: "core",
    primary_os: "strategy",
    secondary_os: "platform",
    activation: { type: "always" },
  },
  {
    id: "B.Core.3",
    block: "core",
    primary_os: "operations",
    secondary_os: "strategy",
    activation: { type: "always" },
  },
  {
    id: "B.Core.4",
    block: "core",
    primary_os: "operations",
    secondary_os: "platform",
    activation: { type: "always" },
  },
  {
    id: "B.Core.5",
    block: "core",
    primary_os: "platform",
    activation: { type: "always" },
  },
  {
    id: "B.Core.6",
    block: "core",
    primary_os: "platform",
    secondary_os: "strategy",
    activation: { type: "always" },
  },
  {
    id: "B.Core.7",
    block: "core",
    primary_os: "growth",
    activation: { type: "always" },
  },
  {
    id: "B.Core.8",
    block: "core",
    primary_os: "strategy",
    activation: { type: "always" },
  },

  // --------------------------------------------------------
  // B.CoreData — Core Data Systems (always active)
  // --------------------------------------------------------
  {
    id: "B.CoreData.1",
    block: "core_data",
    primary_os: "growth",
    secondary_os: "strategy",
    activation: { type: "category", category: "core_data_systems" },
  },
  {
    id: "B.CoreData.2",
    block: "core_data",
    primary_os: "platform",
    secondary_os: "operations",
    activation: { type: "category", category: "core_data_systems" },
  },
  {
    id: "B.CoreData.3",
    block: "core_data",
    primary_os: "growth",
    secondary_os: "operations",
    activation: { type: "category", category: "core_data_systems" },
  },

  // --------------------------------------------------------
  // B.Financial — Financial Systems (always active)
  // --------------------------------------------------------
  {
    id: "B.Financial.1",
    block: "financial",
    primary_os: "strategy",
    secondary_os: "growth",
    activation: { type: "category", category: "financial_systems" },
  },
  {
    id: "B.Financial.2",
    block: "financial",
    primary_os: "strategy",
    secondary_os: "platform",
    activation: { type: "category", category: "financial_systems" },
  },

  // --------------------------------------------------------
  // B.Communication — Communication Channels (conditional)
  // --------------------------------------------------------
  {
    id: "B.Communication.1",
    block: "communication",
    primary_os: "operations",
    secondary_os: "growth",
    activation: { type: "category", category: "communication_channels" },
  },
  {
    id: "B.Communication.2",
    block: "communication",
    primary_os: "operations",
    secondary_os: "growth",
    activation: { type: "category", category: "communication_channels" },
  },

  // --------------------------------------------------------
  // B.Content — Content and Digital Presence (conditional)
  // --------------------------------------------------------
  {
    id: "B.Content.1",
    block: "content",
    primary_os: "growth",
    activation: { type: "category", category: "content_and_digital_presence" },
  },
  {
    id: "B.Content.2",
    block: "content",
    primary_os: "growth",
    secondary_os: "strategy",
    activation: { type: "category", category: "content_and_digital_presence" },
  },

  // --------------------------------------------------------
  // B.Scheduling — Scheduling and Workflow (conditional)
  // --------------------------------------------------------
  {
    id: "B.Scheduling.1",
    block: "scheduling",
    primary_os: "operations",
    secondary_os: "strategy",
    activation: { type: "category", category: "scheduling_and_workflow" },
  },
  {
    id: "B.Scheduling.2",
    block: "scheduling",
    primary_os: "operations",
    secondary_os: "growth",
    activation: { type: "category", category: "scheduling_and_workflow" },
  },

  // --------------------------------------------------------
  // B.Commerce — Commerce and Transactions (conditional)
  // --------------------------------------------------------
  {
    id: "B.Commerce.1",
    block: "commerce",
    primary_os: "operations",
    secondary_os: "platform",
    activation: { type: "category", category: "commerce_and_transactions" },
  },
  {
    id: "B.Commerce.2",
    block: "commerce",
    primary_os: "operations",
    secondary_os: "platform",
    activation: { type: "category", category: "commerce_and_transactions" },
  },
  {
    id: "B.Commerce.3",
    block: "commerce",
    primary_os: "operations",
    secondary_os: "platform",
    activation: { type: "category", category: "commerce_and_transactions" },
  },

  // --------------------------------------------------------
  // B.People — People and Compliance (conditional)
  // --------------------------------------------------------
  {
    id: "B.People.1",
    block: "people",
    primary_os: "operations",
    activation: { type: "category", category: "people_and_compliance" },
  },
  {
    id: "B.People.2",
    block: "people",
    primary_os: "operations",
    activation: { type: "category", category: "people_and_compliance" },
  },

  // --------------------------------------------------------
  // B.External — External Data and Intelligence (conditional)
  // --------------------------------------------------------
  {
    id: "B.External.1",
    block: "external",
    primary_os: "strategy",
    secondary_os: "platform",
    activation: { type: "category", category: "external_data_and_intelligence" },
  },

  // --------------------------------------------------------
  // B.Scale — Team Size Block (conditional on A2)
  // --------------------------------------------------------
  {
    id: "B.Scale.1",
    block: "scale",
    primary_os: "operations",
    secondary_os: "strategy",
    activation: { type: "team_size", min: "16_30" },
  },
  {
    id: "B.Scale.2",
    block: "scale",
    primary_os: "operations",
    secondary_os: "platform",
    activation: { type: "team_size", min: "16_30" },
  },
  {
    id: "B.Scale.3",
    block: "scale",
    primary_os: "strategy",
    secondary_os: "operations",
    activation: { type: "team_size", min: "31_50" },
  },
  {
    id: "B.Scale.4",
    block: "scale",
    primary_os: "operations",
    secondary_os: "platform",
    activation: { type: "team_size", min: "31_50" },
  },
];

// ============================================================
// HELPERS
// ============================================================

/**
 * Team size ordering for comparison in activation rules.
 * Used to resolve "min: 16_30" and "min: 31_50" activation.
 */
export const TEAM_SIZE_RANK: Record<string, number> = {
  solo: 0,
  "2_5": 1,
  "6_15": 2,
  "16_30": 3,
  "31_50": 4,
  over_50: 5,
};

/**
 * Returns all question definitions that are active for a given respondent
 * based on their Section A responses (team_size and operational_surface).
 *
 * Core Data Systems and Financial Systems are always active per
 * OS FRAMEWORK v5.1, regardless of whether the respondent checks them
 * in A3. This function enforces that baseline.
 */
export function getActiveQuestions(
  teamSize: string,
  operationalSurface: string[]
): QuestionDefinition[] {
  const respondentTeamRank = TEAM_SIZE_RANK[teamSize] ?? 0;

  // Ensure baseline categories are always treated as active
  const effectiveSurface = new Set<string>([
    "core_data_systems",
    "financial_systems",
    ...operationalSurface,
  ]);

  return QUESTION_BANK.filter((q) => {
    switch (q.activation.type) {
      case "always":
        return true;

      case "category":
        return effectiveSurface.has(q.activation.category);

      case "team_size":
        const requiredRank = TEAM_SIZE_RANK[q.activation.min] ?? 99;
        return respondentTeamRank >= requiredRank;

      default:
        return false;
    }
  });
}

/**
 * Lookup a question by its ID.
 */
export function getQuestionById(id: string): QuestionDefinition | undefined {
  return QUESTION_BANK.find((q) => q.id === id);
}