// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Question Bank and Activation
// Source: ASSESSMENT STAGE 1 QUESTION BANK (copy verbatim)

import type {
  AnswerOption,
  CompanyFunction,
  Locations,
  OperatingSystem,
  QuestionBlock,
  QuestionDefinition,
  QuestionWeight,
  RespondentRole,
  RevenueBand,
  SectionA,
  TeamSize,
} from "./types";

// ============================================================
// SECTION A
// ============================================================

export const A1 = {
  text: "What is the company's annual revenue?",
  options: [
    { key: "under_2m", label: "Under $2M" },
    { key: "2m_5m", label: "$2M to $5M" },
    { key: "5m_15m", label: "$5M to $15M" },
    { key: "15m_40m", label: "$15M to $40M" },
    { key: "40m_100m", label: "$40M to $100M" },
    { key: "over_100m", label: "Over $100M" },
  ] as { key: RevenueBand; label: string }[],
};

export const A2 = {
  text: "How many people work in the company, including leadership?",
  options: [
    { key: "solo", label: "Just me" },
    { key: "2_9", label: "2 to 9" },
    { key: "10_25", label: "10 to 25" },
    { key: "26_50", label: "26 to 50" },
    { key: "51_100", label: "51 to 100" },
    { key: "101_250", label: "101 to 250" },
    { key: "over_250", label: "Over 250" },
  ] as { key: TeamSize; label: string }[],
};

export const A3 = {
  text: "Which of these does the company run today? (select all that apply)",
  options: [
    { key: "field", label: "Field work, jobs, or projects at customer sites" },
    { key: "production", label: "Production or manufacturing" },
    { key: "supply", label: "Inventory, purchasing, or shipping" },
    { key: "estimating", label: "Estimating, quotes, or bids" },
    { key: "customer", label: "Customer service and scheduling" },
    { key: "people", label: "Hiring, payroll, and team management" },
    { key: "marketing", label: "Marketing and lead generation" },
  ] as { key: CompanyFunction; label: string }[],
};

export const A4 = {
  text: "How many locations does the company operate from?",
  options: [
    { key: "1", label: "1" },
    { key: "2_3", label: "2 to 3" },
    { key: "4_10", label: "4 to 10" },
    { key: "over_10", label: "Over 10" },
  ] as { key: Locations; label: string }[],
};

export const ROLE_OPTIONS: { key: RespondentRole; label: string }[] = [
  { key: "owner_founder", label: "Owner or Founder" },
  { key: "ceo_president", label: "CEO or President" },
  { key: "executive", label: "COO, CFO, or other executive" },
  { key: "director_manager", label: "Director or manager" },
  { key: "other", label: "Other" },
];

export const TEAM_RANK: Record<TeamSize, number> = { solo: 0, "2_9": 1, "10_25": 2, "26_50": 3, "51_100": 4, "101_250": 5, over_250: 6 };

// ============================================================
// SECTION B
// ============================================================

/** Four options at weights 0 to 3, keyed w0 to w3. */
function ladder(l0: string, l1: string, l2: string, l3: string): AnswerOption[] {
  return [l0, l1, l2, l3].map((label, w) => ({ key: `w${w}`, label, weight: w as QuestionWeight }));
}

function q(
  id: string,
  name: string,
  block: QuestionBlock,
  text: string,
  options: AnswerOption[],
  primary_os: OperatingSystem,
  secondary_os?: OperatingSystem,
  min_team?: TeamSize
): QuestionDefinition {
  return { id, name, block, text, options, primary_os, secondary_os, min_team };
}

export const QUESTION_BANK: QuestionDefinition[] = [
  // B.Core: Leadership and Financial Core (every respondent)
  q("B.Core.1", "Managing Load", "core",
    "In a typical week, how much of leadership's time goes to managing (checking status, chasing follow-ups, approving routine items) instead of setting direction?",
    ladder("Under a quarter", "A quarter to a half", "More than half", "Almost all of it"), "strategy", "operations"),
  q("B.Core.2", "One Version of the Truth", "core",
    "When two people pull the same number, such as sales this month, cash, or backlog, how often do they match?",
    ladder("Always: one system holds it", "Usually, after some reconciling", "Often not: the numbers live in different places", "We rarely pull them the same way twice"), "platform", "strategy"),
  q("B.Core.3", "Margin by Job or Order", "core",
    "How well does leadership know the margin on each job, order, or engagement?",
    ladder("Known for each one while the work is in progress", "Known for each one after it closes", "Known in total at month end, not per job or order", "Not known with confidence"), "strategy", "operations"),
  q("B.Core.4", "Labor Burden", "core",
    "Does the company know its fully burdened labor cost per hour: wages plus payroll taxes, benefits, insurance, and paid time off?",
    ladder("Yes, calculated and used in pricing", "Calculated, but not used in pricing", "A rough estimate", "No"), "strategy", "growth"),
  q("B.Core.5", "Break-Even and Profit Target", "core",
    "Does leadership know the revenue the company needs each month to break even, and the revenue it needs to hit its profit target?",
    ladder("Both, and we track against them every month", "Break-even, but no profit target built into it", "We have a sense, but have not calculated either", "No"), "strategy", "platform"),
  q("B.Core.6", "Cash Horizon", "core",
    "How far ahead can the company see its cash position with confidence?",
    ladder("Three months or more, from a forecast that stays current", "About a month, from a forecast someone maintains", "A few weeks, from the bank balance and memory", "Only today's bank balance"), "strategy", "operations"),
  q("B.Core.7", "Commitments", "core",
    "How are the company's commitments tracked: contract terms, renewals, permits, filings, insurance, and warranties?",
    ladder("In one place, each with a due date, a responsible person, and reminders", "In a calendar or spreadsheet someone owns", "Spread across email, files, and people's memory", "We find out when something lapses"), "operations", "strategy"),
  q("B.Core.8", "Compliance Surface", "core",
    "Does the company carry compliance, regulatory, or licensing obligations (healthcare, food safety, financial services, licensed trades, data privacy)?",
    [
      { key: "yes_governed", label: "Yes, with structured governance and scheduled reviews", weight: 0 },
      { key: "yes_uneven", label: "Yes, managed, but documentation is uneven", weight: 1 },
      { key: "yes_behind", label: "Yes, and we are behind where we should be", weight: 3 },
      { key: "none", label: "No obligations apply", weight: 0 },
    ], "operations", "platform"),
  q("B.Core.9", "Decision Routing", "core",
    "How many routine decisions (approvals, exceptions, small purchases, scheduling conflicts) reach leadership each week that someone else could make with clear rules?",
    ladder("Few: rules and authority are defined", "A handful", "Many: leadership is the clearing house", "Nearly all: nothing moves without leadership"), "operations", "strategy"),
  q("B.Core.10", "Knowledge Retention", "core",
    "If a key person left tomorrow, what would leave with them?",
    ladder("Very little: procedures and history live in the system", "Some, but documentation covers most of it", "Most of how their work gets done", "Relationships, pricing knowledge, and processes we could not rebuild quickly"), "operations", "platform"),
  q("B.Core.11", "Capital Readiness", "core",
    "If a lender or buyer asked tomorrow for a clean financial package (current financials, margins, backlog, receivables), how long would it take?",
    ladder("A day or two: the books close monthly and the numbers are current", "About a week of preparation", "A month or more, with the accountant's help", "We could not produce one we trust"), "strategy", "platform"),
  q("B.Core.12", "Lead Response", "core",
    "When a qualified lead arrives outside business hours, what happens first?",
    ladder("Immediate response with qualifying questions, then a person within 24 hours", "An acknowledgment, then follow-up depends on who is available", "Nothing until someone sees it the next morning", "No consistent pattern"), "growth"),
  q("B.Core.13", "Pipeline Visibility", "core",
    "How clearly can leadership see the sales pipeline at any moment?",
    ladder("On a dashboard that stays current", "In a system, but someone has to interpret it", "We have to ask for an update", "It lives in spreadsheets and people's heads"), "growth", "strategy"),
  q("B.Core.14", "Current AI Use", "core",
    "Which best describes how AI is used in the company today?",
    [
      { key: "structured", label: "Structured AI workflows inside defined boundaries", weight: 0 },
      { key: "individual", label: "Individual people use AI tools, nothing coordinated", weight: 2 },
      { key: "leadership_only", label: "Leadership uses AI occasionally, the team mostly does not", weight: 2 },
      { key: "none", label: "Not in any meaningful way", weight: 3 },
    ], "platform", "strategy"),

  // B.Finance (every respondent)
  q("B.Fin.1", "Month-End Close", "finance",
    "How soon after month end are the books closed and the numbers ready?",
    ladder("Within 10 days", "Within the month", "It varies; sometimes months behind", "The books are not closed monthly"), "platform", "strategy"),

  // Function blocks (opened by A3)
  q("B.Field.1", "Daily Work", "field",
    "How do field crews or staff get their work for the day?",
    ladder("A task list with job details, ready before the day starts", "A morning call or meeting with a supervisor", "Texts and calls as the day goes", "They work it out on site"), "operations", "platform"),
  q("B.Field.2", "Field to Record", "field",
    "How does information from the field (hours, materials, photos, completed work) reach the company's records?",
    ladder("Captured on site and recorded the same day", "Paper or photos, entered within a few days", "Collected at week end or at billing", "Often lost or rebuilt from memory"), "platform", "operations"),
  q("B.Prod.1", "Production Scheduling", "production",
    "How is production scheduled against capacity?",
    ladder("Against real capacity and material availability, updated as orders change", "A weekly plan someone maintains", "Day to day, by the most urgent request", "First in, first out, and we expedite"), "operations", "platform"),
  q("B.Prod.2", "Product Cost", "production",
    "How well does the company know the actual cost of what it produces?",
    ladder("Actual labor, material, and overhead per order or unit", "Standard costs, reviewed occasionally", "Material cost only", "Not known with confidence"), "strategy", "operations"),
  q("B.Supply.1", "Inventory Accuracy", "supply",
    "How does the company know its inventory position?",
    ladder("A system updated with every transaction", "A system that needs periodic manual correction", "Spreadsheets updated by hand", "We count when we have to"), "operations", "platform"),
  q("B.Supply.2", "Invoice Matching", "supply",
    "When a supplier invoice arrives, how is it checked before payment?",
    ladder("Matched to the purchase order and the receipt", "Checked against the purchase order", "Approved if it looks right", "Paid as it arrives"), "operations", "strategy"),
  q("B.Est.1", "Overhead in Pricing", "estimating",
    "How is overhead built into prices, quotes, or bids?",
    ladder("An overhead rate is calculated and applied to every quote", "A markup that roughly covers overhead", "We price to the market and hope overhead is covered", "Overhead is not part of pricing"), "strategy", "growth"),
  q("B.Est.2", "Win Rate", "estimating",
    "Does the company know its win rate and why it loses quotes or bids?",
    ladder("Tracked, with reasons", "Win rate tracked, reasons not", "A rough sense", "No"), "growth", "strategy"),
  q("B.Cust.1", "Inbound Requests", "customer",
    "When a customer sends a question or complaint, what decides how fast it is resolved?",
    ladder("Defined routing and response times by request type", "Whoever sees it first, usually well", "Who is available and what else is urgent", "Things slip more often than they should"), "operations", "growth"),
  q("B.Cust.2", "Status Updates", "customer",
    "How do customers learn the status of their order or job?",
    ladder("Automatic updates at each stage", "We update them at key points", "When they call or email", "They often have to chase us"), "operations", "growth"),
  q("B.People.1", "New Hires", "people",
    "How do a new hire's first 30 days unfold?",
    ladder("A structured sequence with milestones and a responsible person", "A loose plan run by their manager", "Shown the ropes as they go", "They work it out"), "operations"),
  q("B.People.2", "Credentials", "people",
    "How are certifications, training, and required credentials tracked?",
    ladder("In a system with renewal reminders", "In a spreadsheet someone owns", "When we remember or an audit is coming", "Not tracked systematically"), "operations"),
  q("B.Mkt.1", "Attribution", "marketing",
    "When a new lead or customer comes in, does the company know which channel drove them?",
    ladder("Tracked across channels", "First source tracked, not the full path", "Captured sometimes", "Not tracked"), "growth", "strategy"),
  q("B.Mkt.2", "Marketing Cadence", "marketing",
    "How does marketing actually run?",
    ladder("A plan with owners, a calendar, and tracked results", "Someone runs it, but cadence is uneven", "When someone has time", "We know we should, but little happens"), "growth"),

  // B.Scale: Leadership Scale Block (opened by A2)
  q("B.Scale.1", "Delegation", "scale",
    "When leadership delegates a complex piece of work, what happens?",
    ladder("It is done within clear boundaries and the outcome is reported", "It is done, with frequent check-ins", "Leadership ends up more involved than planned", "It usually comes back to leadership"), "operations", "strategy", "10_25"),
  q("B.Scale.2", "Handoffs", "scale",
    "When work moves between departments, what happens?",
    ladder("Defined handoffs on one shared record", "Handoffs happen, but context is lost", "It depends on the people involved", "Departments work mostly on their own"), "operations", "platform", "10_25"),
  q("B.Scale.3", "Approval Authority", "scale",
    "For decisions above a threshold (spend, hiring, customer commitments), how are approvals routed?",
    ladder("A defined approval matrix with thresholds and responsible people", "Thresholds exist, routing is informal", "People escalate when unsure", "Case by case"), "strategy", "operations", "51_100"),
];

const FUNCTION_BLOCKS: CompanyFunction[] = ["field", "production", "supply", "estimating", "customer", "people", "marketing"];

// ============================================================
// ACTIVATION
// ============================================================

/**
 * Core and Finance always render. A function block renders only when its A3
 * option is selected (Field only for field work). B.Scale.1 and 2 open at 10
 * or more people; B.Scale.3 at 51 or more.
 */
export function getActiveQuestions(a: Pick<SectionA, "team_size" | "functions">): QuestionDefinition[] {
  const fns = new Set(a.functions);
  const rank = TEAM_RANK[a.team_size];
  return QUESTION_BANK.filter((q) => {
    if (q.block === "core" || q.block === "finance") return true;
    if (q.block === "scale") return rank >= TEAM_RANK[q.min_team!];
    return FUNCTION_BLOCKS.includes(q.block as CompanyFunction) && fns.has(q.block as CompanyFunction);
  });
}

export function getQuestionById(id: string): QuestionDefinition | undefined {
  return QUESTION_BANK.find((q) => q.id === id);
}

/** Weight of a stored answer key, or undefined when the key is unknown. */
export function weightOf(q: QuestionDefinition, key: string | undefined): QuestionWeight | undefined {
  return q.options.find((o) => o.key === key)?.weight;
}

// ============================================================
// SECTION C
// ============================================================

export const C1_TEXT = "Based on what you just described, which of these would create the most value if resolved first?";
export const C2_TEXT = "If that one thing were resolved, what would change for the company?";

export const C1_OPTIONS: Record<string, { display: string; insertion: string }> = {
  strategy: { display: "Clear, current numbers for deciding where the company goes.", insertion: "clear, current numbers for deciding where the company goes" },
  platform: { display: "One record of the business that everyone works from.", insertion: "one record of the business that everyone works from" },
  operations: { display: "Operations that run consistently without leadership stepping in.", insertion: "operations that run consistently without leadership stepping in" },
  growth: { display: "A revenue engine that does not depend on a few people pushing it.", insertion: "a revenue engine that does not depend on a few people pushing it" },
  leadership_capacity: { display: "Getting leadership out of managing so it can lead the company.", insertion: "getting leadership out of managing so it can lead the company" },
  visibility: { display: "Real-time visibility into margin, cash, and the numbers that matter.", insertion: "real-time visibility into margin, cash, and the numbers that matter" },
};

// ============================================================
// TIMING MODEL
// ============================================================

/** Seconds: A 15 per question, B 12 per question, C 60, D 60. */
export function estimatedSeconds(bCount: number): number {
  return 4 * 15 + bCount * 12 + 60 + 60;
}
