// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - Copy Library
// Source: EXTENDED OPERATOR BRIEF TEMPLATE (copy verbatim). Bracketed tokens are filled by the renderer.

import type { CostCategory } from "./engine";

export const COVER = {
  eyebrow: "Extended Operator Brief",
  headline: "What the Current Structure Is Costing [COMPANY NAME], and What It Would Take to Change It",
  footer: "Prepared for [FIRST NAME] [LAST NAME]. Built from your answers.",
};

export const IQ1_ARTICLE: Record<string, string> = { operator: "an operator", builder: "a builder", steward: "a steward", visionary: "a visionary" };

export const IQ1_PARAGRAPH: Record<string, string> = {
  operator: "You think in systems and outcomes. You want to know what is happening, why, and what has to change to produce a different result. When the company underperforms, your instinct is to find the process that failed and fix it.",
  builder: "You think in terms of what the company is becoming. You measure progress by how much of the structure you are building is already in place. When the company underperforms, your instinct is to find the constraint and remove it.",
  steward: "You think in terms of what has been built and what it needs to stay strong: the people, the culture, and the reputation behind the revenue. When the company underperforms, your instinct is to protect what matters while finding a sustainable path forward.",
  visionary: "You think in terms of direction. You care less about where the company is than where it is going. When the company underperforms, your instinct is to ask whether the direction is clear and whether the people and systems can carry it.",
};

export const VQ1_LABEL: Record<string, string> = {
  financial_freedom: "Financial freedom",
  time_lifestyle: "Time and lifestyle",
  family_legacy: "Family and legacy",
  exit_independence: "Exit and independence",
  growth_scale: "Growth and scale",
  proof_achievement: "Proof and achievement",
};

export const VQ1_PARAGRAPH: Record<string, string> = {
  financial_freedom: "Financial freedom is a structural outcome, not a revenue number. It means income that does not depend on any one person's constant presence, and enough certainty about cash that the company feels like an asset instead of a job.",
  time_lifestyle: "The promise of building a company is more control over your time. Getting it back is not a scheduling problem. It is a structural one: the company has to make routine decisions, run its processes, and handle exceptions without routing them through leadership first.",
  family_legacy: "Building something that outlasts you means building something that runs without you. Legacy is an operating requirement: a company that depends on a few people for daily continuity ends when they step back.",
  exit_independence: "A buyer pays for revenue and for transferability. A company that performs well but depends on a few people is harder to sell than one that runs on documented systems, clean numbers, and a team that operates on its own.",
  growth_scale: "Scale is an architectural state, not a revenue target. A company that grows revenue faster than structure builds up complexity faster than capability, and that complexity becomes the ceiling.",
  proof_achievement: "The drive to build something significant is powerful, and it is the motivation most exposed to the gap between what the company is and what it should be by now. That gap is structural, not motivational.",
};

export const VQ2_LINE: Record<string, string> = {
  further: "You told us the company is further from this than when you started. That distance does not close on its own.",
  see_path: "You can see the path. The sections below show what stands on it.",
  middle: "You are partway there. The question is what is holding the rest back.",
  closer: "You are closer than you were. The last stretch is usually the structural one.",
  very_close: "You are close, and protecting that position is the priority. The risks below are what could take it away.",
};

/** What You Described: one line per Section 2 answer (and N.Growth.3). [BAND] tokens are filled from the answer label. */
export const DESCRIBED: Record<string, Record<string, string>> = {
  "R.Time": {
    almost_all: "You spend almost all of your week on the direction you described.",
    more_half: "More than half of your week goes to the direction you described.",
    split: "Your week is split between direction and keeping the company running, and neither gets your full attention.",
    mostly_running: "Most of your week goes to keeping the company running. The direction you described gets what is left.",
    nearly_all_running: "Nearly all of your week goes to keeping the company running.",
  },
  "R.Ops.1": {
    clear: "When a process breaks, the cause is found and fixed.",
    case: "When a process breaks, it is handled case by case, and some problems recur.",
    depends: "How a breakdown is handled depends on who is involved.",
    reactive: "Breakdowns are fixed on the surface, and the cause usually remains.",
  },
  "R.Ops.2": {
    ran_well: "If leadership stepped away for 30 days, the company would run well.",
    slipped: "If leadership stepped away for 30 days, important things would slip.",
    problems: "If leadership stepped away for 30 days, it would return to problems only leadership could resolve.",
    hard: "Leadership is woven into too much of the work to step away for 30 days.",
  },
  "R.Ops.3": {
    team: "Problems reach leadership through the team.",
    customer: "Customers often report problems before the team does.",
    notices: "Leadership finds problems by reviewing things itself.",
    significant: "Problems are usually significant by the time leadership knows.",
  },
  "R.Growth.1": {
    rarely: "Opportunities are rarely lost to breakdowns on your side.",
    occasionally: "Real opportunities are occasionally lost to breakdowns on your side.",
    regularly: "Convertible opportunities are lost regularly to breakdowns on your side.",
    unknown: "You do not have the visibility to know how many opportunities are lost.",
  },
  "R.Growth.2": {
    most: "Most of the company's new revenue comes in without depending on a few people's relationships.",
    some: "Some of the company's new revenue comes in without depending on a few people's relationships.",
    little: "Little of the company's new revenue comes in without depending on a few people's relationships.",
    almost_none: "Almost none of the company's new revenue comes in without depending on a few people's relationships.",
  },
  "R.Growth.3": {
    price: "The most common reason customers are lost is price.",
    speed: "The most common reason customers are lost is speed.",
    awareness: "The most common reason customers are lost is awareness.",
    follow_through: "The most common reason customers are lost is follow-through.",
    unknown: "The company does not know why it loses customers.",
  },
  "R.Strat.1": {
    clear_can: "The goals are clear and the structure can deliver them.",
    clear_may_not: "The goals are clear, and the structure may not keep up with them.",
    not_specific: "The goals are not specific enough to drive daily decisions.",
    shorter: "The company runs on short time frames, and longer planning gets crowded out.",
  },
  "R.Strat.2": {
    closer: "Three more years of the current structure would leave the company closer to the vision you described.",
    about: "Three more years of the current structure would leave the company about where it is against the vision you described.",
    further: "Three more years of the current structure would leave the company further behind the vision you described.",
    burnout: "You expect burnout or a major change before three more years of the current structure.",
  },
  "R.Strat.3": { _band: "[BAND] of the week's decisions need leadership's direct approval." },
  "R.Plat.1": {
    one: "A customer's full history lives in one place.",
    two_three: "A customer's full history lives in two or three places.",
    four_plus: "A customer's full history lives in four or more places.",
    cannot: "A customer's full history could not be reliably assembled.",
  },
  "R.Plat.2": { _band: "A typical team member spends [BAND] hours a week re-entering, copying, or reconciling information." },
  "N.Growth.3": { _band: "[BAND] of revenue comes from active outbound effort." },
};

export const FINANCIAL_INTRO = "The numbers that tell leadership whether the company is safe, and whether it is priced to make money.";

export const POSITION_COPY: Record<string, string> = {
  below: "On the figures you gave, the company needs about [BREAKEVEN] a month to cover its overhead and about [PROFIT LINE] to earn the [TARGET]% profit you set. It brings in about [MONTHLY REVENUE]. The figures suggest the company is running below break-even, about [GAP TO PROFIT LINE] a month short of its profit target.",
  between: "On the figures you gave, the company covers its overhead, which takes about [BREAKEVEN] a month. Earning the [TARGET]% profit you set takes about [PROFIT LINE]. It brings in about [MONTHLY REVENUE]: about [GAP TO PROFIT LINE] a month short of the profit the company is built to earn.",
  above: "On the figures you gave, the company clears both lines: about [BREAKEVEN] a month covers overhead, and about [PROFIT LINE] earns the [TARGET]% profit you set. It brings in about [MONTHLY REVENUE]. The question is how much of that holds job by job.",
  not_reachable: "At a gross margin of about [MARGIN]%, the company cannot reach a [TARGET]% profit at any revenue: every added dollar of sales costs too much to deliver. The target depends on pricing and cost, not volume.",
  no_target: "The company needs about [BREAKEVEN] a month to cover its overhead and brings in about [MONTHLY REVENUE]. No profit target is set, so break-even is the only line the company is measured against.",
  not_computable: "Break-even cannot be calculated from what the company knows today. Without it, leadership cannot tell how much margin a slow month can absorb, or what revenue the profit it wants requires.",
};

export const MARGIN_COPY = {
  computed: "About [MISS SHARE] of jobs or orders miss their target margin, typically by [MISS POINTS]. On your revenue, that is about [MARGIN LEAKAGE] a year.",
  no_track: "Margin is not tracked job by job, so the company cannot see which work makes money and which does not.",
  /** Not in the template: N.MissBy "Not sure". Pending ratification in the Core OS project. */
  size_unknown: "About [MISS SHARE] of jobs or orders miss their target margin. How far they typically miss is not known, so the cost cannot be estimated yet.",
};

export const BURDEN_COPY = {
  known: "You put the fully burdened cost of a team member at [BAND] an hour.",
  not_sure: "The company cannot put a cost on its own labor hours today. Every price, bid, and margin is set without knowing what an hour of work actually costs.",
};

export const STAGE1_LINES = {
  "B.Core.6": { 2: "Cash is visible only a few weeks ahead.", 3: "Cash is visible only as today's balance." },
  "B.Core.11": { 2: "A clean financial package for a lender or buyer would take a month or more.", 3: "A clean financial package for a lender or buyer would take longer than the company can produce with confidence." },
};

export const IQ2_OPENING: Record<string, string> = {
  protecting: "This is what is exposed every year the structure stays as it is.",
  recovering: "This is where the lost ground is going.",
  ceiling: "This is the ceiling, in dollars.",
  accelerating: "This is the drag on the speed you want.",
};

export const IQ5_FRAMING: Record<string, string> = {
  cost: "Every figure below comes from your own answers.",
  picture: "Read each line as something that becomes recoverable when the structure changes.",
  research: "These are estimates built from your inputs. Phase 1 replaces them with figures from the company's own records.",
  advisor: "This is the picture your answers produce. It is the starting point for the conversation Phase 1 is built to have.",
};

export const COST_LABELS: Record<CostCategory | "total", string> = {
  leadership_time: "Leadership time spent managing work the company should handle",
  margin_leakage: "Jobs and orders that miss their target margin",
  revenue_leakage: "Opportunities lost to breakdowns on your side",
  operational_waste: "Unproductive paid time and rework",
  duplicate_work: "Team time spent re-entering and reconciling information",
  idle_capital: "Cash not working toward growth",
  total: "Estimated annual cost of the current structure",
};

export const COST_ORDER: CostCategory[] = ["leadership_time", "margin_leakage", "revenue_leakage", "operational_waste", "duplicate_work", "idle_capital"];

export const DUPLICATE_HOURS_LINE = "About [HOURS] team hours a year go to re-entering and reconciling information.";

export const IQ3_TIMEFRAME: Record<string, string> = {
  d30_90: "That is about [TOTAL / 4] this quarter.",
  y1_2: "Over the next two years, that is about [TOTAL x 2].",
  y3_5: "Over three years, that is about [TOTAL x 3], and over five, about [TOTAL x 5].",
  longer: "Every year it remains, it is also a cost a buyer or lender would see in the numbers.",
};

export const SHARE_LINE = "On your revenue band, that is about [SHARE]% of annual revenue.";
export const ASSUMPTIONS_LINE = "Estimates use the middle of each range you selected. Idle cash assumes a 5% annual return. Phase 1 replaces every estimate with figures from the company's records.";

export const IQ4_LINE: Record<string, string> = {
  pressure: "[TOTAL] a year is pressure the company is carrying that its structure could remove.",
  time: "Much of [LEADERSHIP TIME] in leadership time is nights and weekends spent on work the company should handle itself.",
  without_me: "[TOTAL] a year is the cost of a company that still runs through a few people.",
  progress: "[TOTAL] a year is the distance between current performance and the goal you named.",
};

export const WHAT_HAS_TO_CHANGE = [
  "Closing the gaps in this brief is not a matter of working harder. The decisions leadership makes are reasonable given what it can see. The structure is the problem.",
  "Quanton OS is an AI-native business system that carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead. It computes margin and cash on every job and order, the cost of labor, and break-even from one record. It tracks every commitment to its due date. A Governing Agent coordinates seven department leads, each directing specialist agents, and work runs inside the rules and approvals leadership sets.",
];

export const PHASE1 = {
  body: "Before anything is built, Phase 1 Discovery and Diagnostic maps the company as it runs today. For a base footprint it takes two weeks. It checks the books, measures the baseline, replaces the estimates in this brief with figures from the company's own records, and produces a prioritized roadmap.",
  cards: [
    ["Diagnostic Report", "Every function assessed, with the gaps ranked by severity and cost. You own it on delivery, whatever you decide next."],
    ["Books check", "A review of the accounting file, reconciliations, and reporting accuracy."],
    ["Baseline Metrics", "The measurements every later result is compared against."],
    ["Roadmap", "What to build first, in what order, and what each stage produces."],
  ] as [string, string][],
  investment: ["Phase 1 Investment", "Fixed, and quoted from the company's footprint: locations, people, systems, and compliance scope."] as [string, string],
};

export const NEXT_STEP: Record<string, { copy: string; cta: string }> = {
  critical: { copy: "You said this is critical and has waited long enough. The next step is a 30-minute conversation about what Phase 1 would cover for [COMPANY NAME].", cta: "Book the conversation" },
  important: { copy: "The cost in this brief accrues whether or not it feels urgent. A 30-minute conversation will show what Phase 1 would cover for [COMPANY NAME].", cta: "Book the conversation" },
  unsure: { copy: "Not knowing the right move is what Phase 1 resolves. A 30-minute conversation will show whether it fits.", cta: "Book the conversation" },
  understand: { copy: "You came to understand the picture. If you want to go further, a 30-minute conversation is the place to start, with no commitment.", cta: "Book a conversation when you are ready" },
};

export const CONTACT_LINE = "Or reach us at growth@quantonlabs.com or (929) 298-2162.";
export const WEEK_LABELS = ["Your week: direction", "Your week: keeping it running"];
