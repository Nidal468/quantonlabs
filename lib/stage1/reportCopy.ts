// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Pattern Report - Copy Library
// Source: STRUCTURAL PATTERN REPORT TEMPLATE (copy verbatim)

import type { ClosingVariant, OperatingSystem, SeverityTier } from "./types";

export const TIER_LABELS: Record<SeverityTier, string> = {
  architected: "Architected",
  functional_gap: "Functional: Built on Effort",
  structural_gap: "Fragmented: Structural Drag",
  critical_gap: "Unstructured: Leadership-Dependent",
};

/**
 * Severity colours by tier, as in the previous assessment. Managing Director
 * decision, 10 Nov 2026, replacing the template's single Blue-Indigo dot;
 * flagged for the template revision.
 */
export const TIER_COLORS: Record<SeverityTier, string> = {
  architected: "#22C55E",
  functional_gap: "#EAB308",
  structural_gap: "#F97316",
  critical_gap: "#EF4444",
};

/** Same hues, dark enough for text on white (4.5:1). */
export const TIER_TEXT_COLORS: Record<SeverityTier, string> = {
  architected: "#15803D",
  functional_gap: "#A16207",
  structural_gap: "#C2410C",
  critical_gap: "#B91C1C",
};

export const OS_LABELS: Record<OperatingSystem, string> = {
  strategy: "Strategy",
  platform: "Platform",
  operations: "Operations",
  growth: "Growth",
};

export const COVER_HEADLINES: Record<SeverityTier, string> = {
  architected: "A Company Operating with Structural Discipline",
  functional_gap: "A Company Running on Effort Instead of Architecture",
  structural_gap: "A Company Operating Through Structural Drag",
  critical_gap: "A Company Carried by Its Leadership",
};

export const PATTERN_DESCRIPTORS: Record<SeverityTier, string> = {
  architected: "structural discipline",
  functional_gap: "effort-based execution",
  structural_gap: "structural drag",
  critical_gap: "leadership-dependent operation",
};

/**
 * Structural Summary paragraph 1 fill-ins. The template fixes the sentence
 * structure and the pattern descriptor; it does not supply the tier-specific
 * diagnostic, relative severity, or synthesis libraries. These carry the
 * wording the report used before the rebuild, pending ratification in the
 * Core OS project.
 */
export const SUMMARY_PENDING = {
  diagnostic: "structural design has not yet caught up with what the company needs",
  relative: "lower severity",
  synthesis: "a gap in one system shows up as load on the others",
};

export const DIAGNOSTIC_LINES: Record<OperatingSystem, Record<SeverityTier, string>> = {
  strategy: {
    architected: "The numbers leadership decides from are current: margin, cost structure, and cash are known, not estimated.",
    functional_gap: "Leadership knows the numbers, but assembling them takes effort, and some of them live in a few people's heads.",
    structural_gap: "Key numbers are partial or late. Margin, cost, or cash is reconstructed when someone needs it.",
    critical_gap: "Leadership decides without knowing margin, break-even, or cash with confidence. The company moves because its leaders push it.",
  },
  platform: {
    architected: "One record holds the company's truth. Numbers match no matter who pulls them.",
    functional_gap: "The records exist, but people keep them aligned by hand.",
    structural_gap: "The truth lives in several places. Reconciling them is a recurring job.",
    critical_gap: "No single record. Spreadsheets, inboxes, and memory hold the company together.",
  },
  operations: {
    architected: "Work, commitments, and decisions run on defined rules, independent of who is on shift.",
    functional_gap: "Work gets done well when the right people are involved, and unevenly when they are not.",
    structural_gap: "Errors, missed commitments, and rework are absorbed as a normal cost of operating.",
    critical_gap: "Leadership is the operating procedure. Decisions and exceptions route through the same few people.",
  },
  growth: {
    architected: "Revenue comes from designed channels and a sales motion that does not depend on any one person.",
    functional_gap: "Revenue arrives because a few people drive it. The engine works, and those people are the engine.",
    structural_gap: "Momentum does not compound. Leads and opportunities leak between stages.",
    critical_gap: "No defined growth motion. Revenue depends on relationships and effort, not a system.",
  },
};

export const SYSTEM_FRAMINGS: Record<OperatingSystem, string> = {
  strategy: "The Strategy System is the Intelligence layer of the company. It is how leadership knows what is true and decides where the company goes. Three dimensions: financial truth (margin by job or order, the cost of an hour of labor, break-even, and cash ahead), leadership attention (how much of leadership's week goes to managing instead of leading), and decision architecture (how priorities and approvals get resolved).",
  platform: "The Platform System is the Architecture layer of the company: the record everything else runs on. Three dimensions: one version of the truth (does every number come from one place), record currency (are the books closed and the field captured on time), and intelligence readiness (is AI working on a governed record or scattered across individual tools).",
  operations: "The Operations System is the Precision layer: how work, commitments, and decisions actually get done. Three dimensions: execution (is work defined and consistent), commitments (are obligations tracked to the date they are due), and decision flow (do routine decisions run on rules or route to leadership).",
  growth: "The Growth System is the Momentum layer: how revenue is generated and whether that motion depends on a few people. Three dimensions: response (how fast leads are engaged), pipeline (can leadership see and trust it), and conversion (does the company know why it wins and loses).",
};

export interface TierBlock {
  headline: string;
  pattern: [string, string];
  implication: string;
}

export const TIER_BLOCKS: Record<OperatingSystem, Record<SeverityTier, TierBlock>> = {
  strategy: {
    architected: {
      headline: "Your Strategy System is architected.",
      pattern: [
        "Leadership decides from numbers that are current and computed. Margin is known by job or order, the cost of labor is calculated, break-even is tracked, and cash is visible months ahead. Leadership's time goes mostly to direction because the managing work runs on structure.",
        "This is the discipline most companies try to build and rarely finish. The question now is whether the other operating systems carry the same discipline, because a strong strategic layer is only as useful as the record and the operations underneath it.",
      ],
      implication: "Strategic clarity is not your constraint. The leverage now sits in execution: the systems that turn what leadership decides into consistent output. The rest of this report shows where.",
    },
    functional_gap: {
      headline: "Your Strategy System works, but it runs on effort instead of structure.",
      pattern: [
        "Leadership can answer most questions about performance, but getting to the answer takes work. Someone builds the margin report, someone estimates cash, someone carries the cost structure in their head. The numbers exist when people make them exist.",
        "The cost is twofold. Leadership time goes to assembling the picture instead of acting on it. And the picture degrades whenever the people who assemble it are busy, away, or gone.",
      ],
      implication: "The work ahead is turning the numbers leadership already relies on into figures the company computes on its own, every day, from one record.",
    },
    structural_gap: {
      headline: "Your Strategy System is fragmented, and it is creating visible drag.",
      pattern: [
        "Some key numbers are missing or late. Margin is known in total but not by job. Labor cost or break-even is estimated. Cash is read from the bank balance. Leadership meetings spend their time reconstructing what is true before anything can be decided.",
        "The effect is decisions made on partial information and priorities that drift. Pricing, hiring, and investment calls carry more risk than they should because the cost structure underneath them is not computed.",
      ],
      implication: "Fragmentation at the Strategy level spreads. Pricing that ignores overhead, jobs that lose money unseen, and cash surprises often trace back to numbers the company does not compute. Fixing the financial truth often resolves problems that look like they belong elsewhere.",
    },
    critical_gap: {
      headline: "Your Strategy System is not designed. Leadership is carrying it.",
      pattern: [
        "The company does not know its margin by job, its labor burden, or its break-even with confidence, and cash is visible only day to day. Most of leadership's week goes to managing. Decisions get made, but on judgment and memory instead of computed numbers.",
        "This is common in companies that grew faster than their structure. It sets a ceiling: the company can only be as well run as its leaders' available attention, and every new job, location, or hire adds to the load.",
      ],
      implication: "The work is architecture, not optimization: a record that computes margin, cost, and cash, and a structure that takes the managing load off leadership so it can lead.",
    },
  },
  platform: {
    architected: {
      headline: "Your Platform System is architected.",
      pattern: [
        "The company's numbers come from one record. Two people pulling sales or cash get the same answer. The books close promptly, and work done in the field reaches the record the same day.",
        "A clean record is the hardest part of the foundation to build. It also means a move onto a single operational core starts from strength: the core becomes the record for every function, and platforms that work well can stay connected by choice.",
      ],
      implication: "Data friction is not slowing you down. The question is whether operations and growth are designed to use what the record already makes possible.",
    },
    functional_gap: {
      headline: "Your Platform System works, but people hold it together.",
      pattern: [
        "The records exist, and they are mostly right, because people keep them aligned. Someone reconciles, re-enters, and checks. The numbers match after someone makes them match.",
        "No single act of reconciling feels expensive. Across a year it adds up to real hours, and the people doing it become the integration layer. When they are busy or leave, the records drift apart.",
      ],
      implication: "The work ahead is replacing the human effort that keeps your records aligned with one record that holds the truth on its own.",
    },
    structural_gap: {
      headline: "Your Platform System is fragmented, and the truth lives in several places.",
      pattern: [
        "Sales, operations, finance, and the field each keep their own version. Numbers disagree depending on who pulls them. The books close late, and field information arrives at week end or at billing.",
        "The effect is slow decisions and numbers leadership cannot fully trust. Teams build their own spreadsheets to fill the gaps, which adds another version of the truth.",
      ],
      implication: "You cannot coordinate a company on records that do not agree. Building one record often unlocks improvements that look like they belong to Strategy and Operations.",
    },
    critical_gap: {
      headline: "Your Platform System is not designed. Spreadsheets and memory hold it together.",
      pattern: [
        "There is no single record of the company. Information lives in spreadsheets, inboxes, texts, and people's heads. Answers come from asking someone.",
        "This works while the company is small enough for a few people to remember everything. Each new customer, job, or hire makes it harder, and the knowledge leaves with anyone who leaves.",
      ],
      implication: "At this tier the record comes first. Margin, cash, commitments, and every other number depend on one place that holds the truth.",
    },
  },
  operations: {
    architected: {
      headline: "Your Operations System is architected.",
      pattern: [
        "Work runs on defined procedures, commitments are tracked with due dates and responsible people, and routine decisions run on clear rules. When someone joins, the work is described; when someone leaves, the knowledge stays.",
        "That is a real asset. The cost of adding volume is not chaos.",
      ],
      implication: "The question is whether the record and the numbers that feed Operations are architected to match, and whether Growth can bring in the demand the operation can absorb.",
    },
    functional_gap: {
      headline: "Your Operations System runs, but consistency depends on who is doing the work.",
      pattern: [
        "Work gets done, and done well when the right people handle it. Commitments are tracked by whoever owns the spreadsheet. Routine decisions reach leadership more often than they should.",
        "Two costs follow. Output is hard to predict because quality depends on people, not design. And leadership becomes the quality control and the decision clearing house for work that has no defined standard.",
      ],
      implication: "The work ahead is capturing what your best people do as defined procedures and rules, so consistency does not depend on who shows up.",
    },
    structural_gap: {
      headline: "Your Operations System is fragmented, and errors are absorbed as normal.",
      pattern: [
        "Procedures exist for some work and not for others. Commitments live in email and memory. Handoffs lose context, rework recurs, and leadership learns about problems late.",
        "The company absorbs a steady level of preventable error: rework, missed renewals, customers chasing status, decisions made without the right information. No single failure is a crisis, and together they take real margin and capacity.",
      ],
      implication: "Operational fragmentation is expensive and mostly invisible. Defined procedures, tracked commitments, and decision rules often produce the fastest measurable gains.",
    },
    critical_gap: {
      headline: "Your Operations System is not designed. Leadership is the operating procedure.",
      pattern: [
        "How work gets done depends on who is doing it and what they remember. Commitments surface when they lapse. Routine decisions and exceptions route to the same few leaders, and the company cannot run well without them present.",
        "The company works because its leaders hold it together. That is also its limit: every new job, location, or hire adds to the load on the same people.",
      ],
      implication: "The work is building the operating layer from the ground up: procedures, commitment tracking, decision rules, and handoffs that run without leadership stepping in.",
    },
  },
  growth: {
    architected: {
      headline: "Your Growth System is architected.",
      pattern: [
        "Leads are engaged promptly, the pipeline is visible and current, and the company knows its win rate and why it loses. Marketing runs on a plan with tracked results. Revenue does not depend on any one person.",
        "A designed revenue engine is worth protecting and extending.",
      ],
      implication: "The question is whether Operations can absorb the demand it generates and whether the company's numbers show which work is worth winning.",
    },
    functional_gap: {
      headline: "Your Growth System generates revenue, because a few people push it.",
      pattern: [
        "Revenue is real, and it depends on the people who generate it. Leads get answered when those people are available. The pipeline is clear when they update it. Deals close because they close them.",
        "The results stop when those people stop. Campaigns fade when attention moves, and opportunities stall when the key people are busy.",
      ],
      implication: "The work ahead is turning the growth motion a few people run personally into a structure that runs without their constant push.",
    },
    structural_gap: {
      headline: "Your Growth System is fragmented, and momentum does not compound.",
      pattern: [
        "Growth activity happens, but the stages do not connect. Leads wait, the pipeline is assembled on request, and the reasons for lost work are not tracked. Each cycle starts close to zero.",
        "Demand is generated, and a meaningful share leaks before it becomes revenue.",
      ],
      implication: "The lead generation may be working. The leak is what happens after a lead arrives. Fixing the full path from lead to customer often produces outsized returns.",
    },
    critical_gap: {
      headline: "Your Growth System is not designed. Revenue comes from relationships and effort.",
      pattern: [
        "There is no defined path from lead to customer. Leads are handled when someone sees them, the pipeline lives in people's heads, and nobody tracks why work is won or lost.",
        "The company's revenue ceiling is the capacity of the people who generate it.",
      ],
      implication: "The work is building revenue architecture: response, pipeline, and conversion that run as a system the company owns.",
    },
  },
};

/** Callouts by question ID. minWeight 3 applies to B.Core.8 (behind where we should be). */
export const CALLOUTS: Record<OperatingSystem, { id: string; text: string; minWeight?: 3 }[]> = {
  strategy: [
    { id: "B.Core.1", text: "More than half of leadership's week goes to managing instead of setting direction." },
    { id: "B.Core.3", text: "Margin is not known job by job or order by order while the work is still in progress." },
    { id: "B.Core.4", text: "The fully burdened cost of an hour of labor is estimated or unknown." },
    { id: "B.Core.5", text: "Neither the revenue needed to break even nor the revenue needed to hit a profit target has been calculated." },
    { id: "B.Core.6", text: "Cash is visible only a few weeks ahead, or only as today's balance." },
    { id: "B.Core.11", text: "A clean financial package for a lender or buyer would take a month or more to produce." },
    { id: "B.Prod.2", text: "The actual cost of what the company produces is partly or wholly unknown." },
    { id: "B.Est.1", text: "Overhead is not calculated into prices, quotes, or bids." },
    { id: "B.Scale.3", text: "Approvals above a threshold are routed case by case instead of through a defined matrix." },
  ],
  platform: [
    { id: "B.Core.2", text: "The same number often comes out differently depending on who pulls it." },
    { id: "B.Core.14", text: "AI use is individual and uncoordinated, or absent, instead of working on a governed record." },
    { id: "B.Fin.1", text: "The books are closed late or irregularly." },
    { id: "B.Field.2", text: "Information from the field reaches the record late, or is rebuilt from memory." },
  ],
  operations: [
    { id: "B.Core.7", text: "Commitments such as renewals, filings, and warranties are tracked across email and memory, or found when they lapse." },
    { id: "B.Core.8", text: "Compliance obligations are behind where they should be.", minWeight: 3 },
    { id: "B.Core.9", text: "Many routine decisions reach leadership that clear rules could resolve." },
    { id: "B.Core.10", text: "Losing a key person would take much of how the work gets done with them." },
    { id: "B.Field.1", text: "Field crews get their day's work through calls and texts instead of a prepared task list." },
    { id: "B.Prod.1", text: "Production is scheduled day to day instead of against real capacity." },
    { id: "B.Supply.1", text: "Inventory is tracked by hand or counted only when needed." },
    { id: "B.Supply.2", text: "Supplier invoices are paid without matching them to the order and the receipt." },
    { id: "B.Cust.1", text: "Customer requests are resolved by availability instead of defined routing." },
    { id: "B.Cust.2", text: "Customers learn status when they ask, or chase it." },
    { id: "B.People.1", text: "New hires are onboarded informally." },
    { id: "B.People.2", text: "Certifications and required credentials are tracked informally or before an audit." },
    { id: "B.Scale.1", text: "Delegated work often returns to leadership." },
    { id: "B.Scale.2", text: "Work moving between departments loses context." },
  ],
  growth: [
    { id: "B.Core.12", text: "After-hours leads wait until someone sees them, or are handled inconsistently." },
    { id: "B.Core.13", text: "The pipeline is not visible without asking someone or piecing records together." },
    { id: "B.Est.2", text: "The company does not know its win rate or why it loses quotes and bids." },
    { id: "B.Mkt.1", text: "The source of new leads is captured partially or not at all." },
    { id: "B.Mkt.2", text: "Marketing runs when someone has time instead of on a plan." },
  ],
};

export const PATTERN_SUMMARIES: Record<SeverityTier, string> = {
  architected: "This is an asset: it is not the constraint on the company.",
  functional_gap: "It works at current scale and carries risk as the company grows.",
  structural_gap: "It adds friction that shows up in the focus areas above.",
  critical_gap: "It depends on leadership's direct involvement to function.",
};

export const INTERPRETIVE_CLOSES: Record<SeverityTier, string> = {
  architected: "You have built structure many companies have not. What comes next is extending that discipline to the systems that can still benefit from it.",
  functional_gap: "What you describe is the difference between a company that runs on its people's effort and one that runs on structure. The work ahead converts one into the other.",
  structural_gap: "This is what the structure is producing. Not a talent problem. Not an effort problem. A structural one, with leadership filling the gaps the structure leaves.",
  critical_gap: "The path forward is not working harder. It is building the structure that can carry the load leadership is carrying today.",
};

export interface ClosingVariantCopy {
  header: string;
  body: string[];
  primary_cta: string;
  secondary_cta: string;
  /** Brief invitation copy; absent for Below Threshold. */
  secondary_body?: string;
  brief: boolean;
}

const BRIEF_SECONDARY =
  "The Extended Operator Brief puts numbers on what this report found: break-even, margin, leadership time, and the annual cost of the current structure, for [TOP OS NAME] and [SECOND OS NAME]. It takes about 10 minutes and builds on what you already answered.";

export const CLOSING_VARIANTS: Record<ClosingVariant, ClosingVariantCopy> = {
  qualified: {
    header: "What Comes Next",
    body: [
      "This report shows where the structural gaps are. Closing them depends on the specifics of your company: how it operates, what it runs on, and how leadership wants it to run.",
      "Quanton OS is an AI-native business system that carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead. It computes margin and cash on every job and order, tracks every commitment to its due date, and runs inside the rules and approvals leadership sets. Phase 1 Discovery and Diagnostic produces a Diagnostic Report with Baseline Metrics and a prioritized roadmap, and you own it on delivery.",
      "If you want to explore what that would look like for [COMPANY NAME], the next step is a qualification conversation.",
    ],
    primary_cta: "Schedule a qualification conversation",
    secondary_cta: "Continue to the Extended Operator Brief",
    secondary_body: BRIEF_SECONDARY,
    brief: true,
  },
  below_threshold: {
    header: "Where to Go From Here",
    body: [
      "This report is yours regardless of what comes next. The patterns it identifies hold whether you address them now or as the company grows.",
      "Quanton OS is built for companies whose operational complexity calls for a full system of record. Where that is not yet the case, the right starting point is the Modular Agent Program: one to three agents in the functions this report shows carry the most drag. It is a separate program sized to where the company is today, not a smaller version of Quanton OS. A short conversation will tell us which path fits.",
    ],
    primary_cta: "Talk to us about the right starting point",
    secondary_cta: "Stay connected with Quanton Labs",
    brief: false,
  },
  above_segment: {
    header: "A Different Conversation",
    body: [
      "Your answers place the company above the scale Quanton Labs typically works with. The patterns in this report still apply. Whether Quanton OS fits a company of your size is a question we would rather answer with you directly than assume.",
      "The next step is a direct conversation with Ryan Remington, Managing Director. We will look at how the company operates and tell you plainly whether it fits what Quanton Labs builds.",
    ],
    primary_cta: "Request a conversation with Ryan Remington",
    secondary_cta: "Continue to the Extended Operator Brief",
    secondary_body: BRIEF_SECONDARY,
    brief: true,
  },
};
