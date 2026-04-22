// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — Report Copy Library
// Source: STRUCTURAL Intelligence REPORT TEMPLATE v1.0 Apr2026

import type { OperatingSystem, SeverityTier } from "./types";

// ============================================================
// TIER LABELS
// ============================================================
// Internal tier keys → respondent-facing labels
// Internal keys used for scoring and routing; respondent labels
// appear in the rendered report.

export const TIER_LABELS: Record<SeverityTier, string> = {
  architected: "Architected",
  functional_gap: "Functional — Built on Effort",
  structural_gap: "Fragmented — Structural Drag",
  critical_gap: "Unstructured — Owner-Dependent",
};

// OS display names (respondent-facing capitalization)
export const OS_LABELS: Record<OperatingSystem, string> = {
  strategy: "Strategy",
  platform: "Platform",
  operations: "Operations",
  growth: "Growth",
};

// ============================================================
// COVER PANEL HEADLINES
// ============================================================
// One headline renders on the cover panel, selected by the
// tier of the top-scoring operating system.

export const COVER_HEADLINES: Record<SeverityTier, string> = {
  architected: "A Business Operating with Structural Discipline",
  functional_gap: "A Business Running on Effort Rather Than Architecture",
  structural_gap: "A Business Operating Through Structural Drag",
  critical_gap: "A Business Carried by Its Owner",
};

// ============================================================
// STRUCTURAL SUMMARY — PATTERN DESCRIPTORS
// ============================================================
// Selected based on the average tier across all four OS.

export const PATTERN_DESCRIPTORS: Record<SeverityTier, string> = {
  architected: "structural discipline",
  functional_gap: "effort-based execution",
  structural_gap: "structural drag",
  critical_gap: "owner-dependent operation",
};

// ============================================================
// SEVERITY MAP — PER-OS DIAGNOSTIC LINES
// ============================================================
// One diagnostic line per OS per tier. Sixteen total.
// Displayed in the severity map next to each OS row.

export const DIAGNOSTIC_LINES: Record<
  OperatingSystem,
  Record<SeverityTier, string>
> = {
  strategy: {
    architected:
      "Strategic clarity is architected. Review cadence and metric framework operate independently of any single person.",
    functional_gap:
      "Strategic clarity exists, but it lives in your head. The cadence and framework that would make it persist have not been built.",
    structural_gap:
      "Review happens reactively. Performance data lives in pieces rather than being assembled into a coherent picture.",
    critical_gap:
      "No structured review, no defined metrics, no decision framework. The business moves because you move it.",
  },
  platform: {
    architected:
      "Platforms are connected. Data moves between systems without manual reconciliation.",
    functional_gap:
      "Core platforms are in place but the connective tissue between them is human effort.",
    structural_gap:
      "Data is trapped where it sits. Your platforms operate in isolation and are bridged by manual effort.",
    critical_gap:
      "No platform layer. Spreadsheets, email threads, and memory hold the business together.",
  },
  operations: {
    architected:
      "Operations are architected. Documented processes, clear ownership, consistent execution independent of who is doing the work.",
    functional_gap:
      "Work gets done, but consistency depends on who is doing it. Your best team members produce excellent outcomes; others are uneven.",
    structural_gap:
      "Quality control is reactive. Your team absorbs preventable errors because execution is improvised within loose boundaries.",
    critical_gap:
      "No documented process layer. You are the operating procedure — every execution decision routes through you.",
  },
  growth: {
    architected:
      "Growth is a standing capability. Designed channels, documented sales motion, retention running on system not relationship.",
    functional_gap:
      "Revenue happens because you drive it personally. The engine works, but you are the engine.",
    structural_gap:
      "Momentum does not compound. Each growth cycle starts close to zero because the handoffs between stages leak.",
    critical_gap:
      "No defined growth motion. Revenue comes from your network and your effort; there is no engine.",
  },
};

// ============================================================
// SYSTEM FRAMINGS
// ============================================================
// Two-paragraph framing displayed when an OS is a Structural Focus Area.
// Rendered once per OS at the start of its Focus Area section.

export const SYSTEM_FRAMINGS: Record<OperatingSystem, string[]> = {
  strategy: [
    "The Strategy System is the Intelligence layer of your business. It governs how the business sees itself: what the priorities are, what the metrics are, and how decisions get made when tradeoffs surface. When it is strong, the business has direction that persists without constant owner intervention. When it is weak, the business runs on whatever the owner happened to focus on this week.",
    "The Strategy System covers three dimensions: strategic visibility (what is actually happening in the business), review cadence (how often and how structurally that visibility gets examined), and decision architecture (who makes calls, with what information, and on what authority).",
  ],
  platform: [
    "The Platform System is the Architecture layer of your business. It is the technical and structural foundation that every other operating system runs on: the platforms, data pipelines, integrations, and infrastructure that determine whether information moves freely or gets trapped.",
    "The Platform System covers three dimensions: platform integration (do your tools talk to each other), data integrity (is information current and trustworthy where you need it), and system fragmentation (does work require moving between disconnected environments).",
  ],
  operations: [
    "The Operations System is the Precision layer of your business. It governs how work actually gets done: the processes, the documentation, the handoffs, the accountability. When it is strong, execution is consistent and independent of who happens to be handling a given task. When it is weak, consistency depends on individual effort and institutional memory.",
    "The Operations System covers three dimensions: process architecture (is how work happens documented and repeatable), execution accountability (do outcomes get surfaced and owned), and coordination integrity (does work move cleanly between people and functions).",
  ],
  growth: [
    "The Growth System is the Momentum layer of your business. It governs how revenue gets generated and compounds: the channels, the sales motion, the retention, the attribution. When it is strong, growth is a standing capability that runs on architecture. When it is weak, growth is an event that depends on the founder's effort.",
    "The Growth System covers three dimensions: demand architecture (where leads come from and how consistently), conversion motion (how prospects become customers), and retention structure (what happens after the sale).",
  ],
};

// ============================================================
// TIER BLOCKS — FULL COPY FOR STRUCTURAL FOCUS AREAS
// ============================================================
// Rendered for the top two OS by severity. Each block contains:
//   - headline: diagnostic headline
//   - pattern: two-paragraph pattern explanation (array of 2 strings)
//   - implication: operational implication paragraph

export interface TierBlock {
  headline: string;
  pattern: [string, string];
  implication: string;
}

export const TIER_BLOCKS: Record<
  OperatingSystem,
  Record<SeverityTier, TierBlock>
> = {
  strategy: {
    architected: {
      headline: "Your Strategy System is architected.",
      pattern: [
        "Strategic review is a structured activity in your business. Priorities are defined, metrics are tracked against a cadence, and decisions escalate through a documented framework rather than through ad hoc conversation. When competing priorities surface, resolution follows a process rather than depending on whoever is in the room.",
        "This is uncommon at your scale. Most businesses in the $1M to $20M band operate on strategic intuition rather than strategic architecture, which produces consistency when the founder is engaged and drift when the founder's attention is elsewhere. You have built something more durable than that.",
      ],
      implication:
        "A strong Strategy System at this tier means your business has the intelligence layer that the other operating systems can run on. The question is whether Platform, Operations, and Growth are architected to match or whether strategic clarity is reaching an execution layer that cannot carry it.",
    },
    functional_gap: {
      headline:
        "Your Strategy System works, but it works because of you.",
      pattern: [
        "You have strategic clarity. You know what the priorities are, you know which metrics matter, and you know how to interpret performance against them. The challenge is that this clarity lives in your head rather than in a structured system. When you are engaged, the business moves in the right direction. When your attention is elsewhere, the strategic signal gets weaker.",
        "This pattern is common in founder-led businesses that grew through the founder's strategic instinct. What it produces is a business that is directionally sound as long as the founder is actively in the loop, and directionally uncertain when the founder steps back. The ceiling is not strategic thinking, the ceiling is how much strategic thinking can be held in one person's head without a structured framework to carry it.",
      ],
      implication:
        "A Functional Strategy System is a Strategy System with a single point of failure, and that point is you. The work ahead is converting the strategic clarity in your head into a structured cadence and a set of tracked metrics that persist whether you are in the room or not.",
    },
    structural_gap: {
      headline:
        "Your Strategy System is fragmented, and it is creating visible operational drag.",
      pattern: [
        "Strategic direction exists, but it is not connected to daily operations in a way that produces consistent outcomes. Reviews happen reactively, often in response to something that went wrong. Performance data is available in pieces but not assembled into a coherent picture. When priorities compete, resolution depends on whoever is in the conversation rather than on a documented framework.",
        "The operational effect of this pattern is friction. Team members optimize for different signals because there is no unified set of priorities. Decisions take longer than they should because the context required to make them is scattered. You carry the full cognitive load of holding the business together strategically because no other structure is doing it.",
      ],
      implication:
        "Fragmentation at the Strategy level propagates downward. Platform fragmentation, operational inconsistency, and uneven growth execution are often symptoms of strategic fragmentation rather than independent problems. Addressing Strategy first often resolves issues that appear elsewhere. Your report likely shows elevated severity across at least one other operating system for this reason.",
    },
    critical_gap: {
      headline:
        "Your Strategy System is not designed. You are the Strategy System.",
      pattern: [
        "There is no structured strategic review cadence, no defined set of metrics that get examined on a schedule, and no framework that determines how competing priorities get resolved. The business moves forward because you move it forward. Every strategic decision, every reallocation of attention, every priority call comes back to you.",
        "This is not a sign of failure. Most founder-led businesses at this stage operate this way because they grew faster than their structure. What it does signal is a ceiling. The business cannot grow beyond your personal bandwidth, and your personal bandwidth is the limit on how much strategic thinking can happen. Strategic bottlenecks become operational bottlenecks, which become revenue bottlenecks.",
      ],
      implication:
        "At this tier, the work is not optimization. It is architecture. Building a Strategy System means defining the strategic frame, the review cadence, the metric set, and the decision authority that can operate independently of your direct intervention. Until that architecture exists, every other operating system will be constrained by the same bottleneck.",
    },
  },
  platform: {
    architected: {
      headline: "Your Platform System is architected.",
      pattern: [
        "Your platforms are connected. Data moves between systems without manual reconciliation, and the information you see in one place reflects the reality of what is happening in another. When a customer record updates, financial reporting catches it. When an order ships, inventory adjusts. The platforms have been selected and integrated deliberately, not accumulated over time.",
        "This is rare in the $1M to $20M band. Most businesses in this range run on a collection of tools that were adopted one at a time to solve isolated problems, and the connective tissue between those tools was never built. You have built the connective tissue. The infrastructure is capable of supporting what comes next.",
      ],
      implication:
        "A strong Platform System at this tier means data friction is no longer what is slowing you down. The architecture is ready to carry additional intelligence layers, automation, and coordinated agent activity. The question is whether the other operating systems are architected to match.",
    },
    functional_gap: {
      headline:
        "Your Platform System functions, but the connective tissue is human effort.",
      pattern: [
        "Your core platforms are in place and mostly doing what they should. The problem is between them. Data gets copied, reconciled, and re-entered by people. Someone exports a report from one system and uploads it to another. Someone notices a discrepancy and chases it down. The work gets done, but the cost is measured in hours that could be spent elsewhere and in the errors that slip through when attention lapses.",
        "This pattern is common and invisible. No single act of manual reconciliation feels expensive. The cumulative cost, measured across a month or a quarter, is substantial. It also carries a structural risk: the people doing the reconciliation become the integration layer, and if they leave, the platforms revert to operating in isolation.",
      ],
      implication:
        "The work ahead is converting the human effort that currently bridges your platforms into actual integration. This is rarely a rip-and-replace exercise. It is usually a matter of building the connections that should have existed from the start.",
    },
    structural_gap: {
      headline:
        "Your Platform System is fragmented, and data is trapped where it sits.",
      pattern: [
        "Your platforms operate in isolation. What happens in your CRM does not automatically reach your accounting software. What happens in email does not reach your customer record. What happens on your website does not connect to your pipeline. Each system has its own truth, and reconciling them into a single picture of the business requires deliberate effort every time you need an answer.",
        "The operational effect of this pattern is slow decisions and imperfect data. You cannot answer questions quickly because the information lives in multiple places. You cannot trust what you are looking at because you know it may be out of sync with another system. Team members do the best they can with what they have, which often means working off outdated information or building their own informal systems to fill the gaps.",
      ],
      implication:
        "Platform fragmentation is rarely isolated. It typically shows up alongside Strategy fragmentation and Operations fragmentation, because you cannot run coordinated operations on uncoordinated platforms. Addressing the Platform System often unlocks improvements that appear to be about other operating systems entirely.",
    },
    critical_gap: {
      headline:
        "Your Platform System is not designed. Spreadsheets and memory hold it together.",
      pattern: [
        "The tools your business runs on do not form a system. They are a collection. Information lives in spreadsheets, email threads, text messages, and people's heads. When you need to know something, you ask someone or go dig. When something important needs to get remembered across time, it depends on whoever happens to be involved.",
        "This is not uncommon at earlier stages, but it becomes a structural liability as a business grows. The absence of a platform layer means every new customer, team member, or product line adds friction that would not exist with infrastructure in place. The business runs on memory and manual coordination, and both of those scale poorly.",
      ],
      implication:
        "At this tier, the work is building platform infrastructure, not optimizing what exists. This is usually the foundational step that makes every other operating system improvement possible. A Strategy System without data cannot function. A Growth System without a CRM cannot scale. Platform is typically the first operating system that needs architectural investment.",
    },
  },
  operations: {
    architected: {
      headline: "Your Operations System is architected.",
      pattern: [
        "Your business has documented processes for its core functions, and those processes are followed. When a task needs to happen, it is clear who owns it, how it should be executed, and how completion gets confirmed. When someone new joins the team, they can step into the work because the work is described. When someone leaves, the business does not lose institutional knowledge because the knowledge lives in the system, not in the person.",
        "This is unusual at your scale. Most businesses in the $1M to $20M band operate on a combination of documented intent and undocumented execution, where the procedures that exist do not fully reflect how work actually happens. You have closed that gap. Your operational architecture is a real asset.",
      ],
      implication:
        "A strong Operations System at this tier means the cost of adding scale is not operational chaos. The question is whether the systems that feed Operations (Strategy, Platform) are architected to match, and whether Growth is structured to drive demand that the operational layer can absorb.",
    },
    functional_gap: {
      headline:
        "Your Operations System runs, but consistency depends on who is doing the work.",
      pattern: [
        "The core work of your business gets done, and it gets done acceptably. The challenge is that acceptable varies. When your best team members handle a task, the outcome is excellent. When someone newer or less experienced handles the same task, the outcome is uneven. The difference is not documented process. It is individual skill, judgment, and effort.",
        "This pattern carries two costs. The first is operational: you cannot predict the output of your own business because consistency is not architected. The second is personal: you end up involved in more execution than you should be, because you are the quality control mechanism for work that does not have a documented standard. The business works, but it works because of who is doing it, not because of how it is designed.",
      ],
      implication:
        "The work ahead is converting what your best team members do implicitly into documented procedures that anyone can follow. This is not about removing judgment from the business. It is about capturing the structural components of good execution so that quality is not contingent on who shows up that day.",
    },
    structural_gap: {
      headline:
        "Your Operations System is fragmented, and quality control is reactive.",
      pattern: [
        "Processes exist for some things and not for others. Documentation is inconsistent. Handoffs between people and functions lose context more often than they should. When something goes wrong, the diagnosis is usually we thought someone else was handling that or we have done it differently the last few times. Execution is not architected. It is improvised within loose boundaries.",
        "The operational effect of this pattern is a business that absorbs a steady level of preventable error. Customer issues that should not have happened. Internal rework that adds no value. Decisions made with incomplete information because the information never reached the right person. Your team is not underperforming. The system they are operating within is not supporting them.",
      ],
      implication:
        "Operational fragmentation is expensive and largely invisible, because no single error is catastrophic. The cumulative cost shows up in margin, in team capacity, and in the share of your time you spend cleaning up work that should have cleaned up itself. Addressing Operations often produces immediate, measurable gains.",
    },
    critical_gap: {
      headline:
        "Your Operations System is not designed. You are the operating procedure.",
      pattern: [
        "There is no documented process layer for the core work of your business. How things get done depends on who is doing them and what they remember about the last time a similar thing came up. When a question comes up that no one has seen before, it routes to you. When something goes wrong, the explanation is that there was no system to catch it. When someone new joins the team, they learn by watching and asking.",
        "This is common in founder-led businesses that grew through the founder's direct involvement. What it produces is a business that cannot function without the founder present. Every operational decision either gets made by you or gets made by someone trying to guess what you would decide. The business is not a system. It is an extension of your attention.",
      ],
      implication:
        "At this tier, the work is building operational architecture from the ground up. Documented procedures for core functions. Defined ownership. Handoff protocols. Quality standards. This is substantial work, but it is also the work that converts a founder-dependent business into a business that can run on its own, and it is the prerequisite for almost every other kind of scale.",
    },
  },
  growth: {
    architected: {
      headline: "Your Growth System is architected.",
      pattern: [
        "Growth in your business is a standing capability rather than an event. You have designed channels that produce demand reliably, a sales motion that converts that demand through documented stages, and a retention structure that keeps existing customers engaged on system rather than on individual relationship. Revenue is not constrained by your personal bandwidth.",
        "This is rare. Most businesses in your range run on growth activity rather than a growth system — campaigns happen, deals close, customers stay, but the mechanics sit in the founder's head or in a handful of key relationships. You have built something more structural. The engine runs whether or not you are pushing it.",
      ],
      implication:
        "A strong Growth System at this tier means the ceiling on revenue is not founder bandwidth. The question is whether the other operating systems are architected to absorb what Growth produces, whether Operations can deliver consistently, whether Platform carries the data to see what is working, whether Strategy defines where growth should go next.",
    },
    functional_gap: {
      headline:
        "Your Growth System works, but revenue depends on your effort.",
      pattern: [
        "Revenue happens in your business, and it happens at meaningful volume. The challenge is where that revenue comes from. It comes from your network, your relationships, your personal involvement in deals, and campaigns you drive. The engine is not broken, you are the engine. When you step back from growth activity, growth slows.",
        "This pattern produces real revenue but creates a structural ceiling. The business cannot grow beyond your personal bandwidth for growth work, because no other structure is producing it. Marketing happens when you make it happen. Deals close when you push them. Retention holds because customers have a relationship with you. These are not sustainable architectures for scaling revenue.",
      ],
      implication:
        "The work ahead is converting founder-driven revenue activity into a system that produces revenue without requiring founder energy as the fuel. This does not mean removing the founder from growth, it means building the structural layer that keeps growth running when the founder is focused elsewhere.",
    },
    structural_gap: {
      headline:
        "Your Growth System is fragmented, and momentum does not compound.",
      pattern: [
        "Growth activities happen, but they do not build on each other. Each marketing push starts close to zero because the pipeline from the last one did not get maintained. Each sales cycle is its own puzzle because the process is not documented. Each new customer is onboarded slightly differently because the handoff from sales to delivery leaks context. The business grows, but the cost of that growth is higher than it should be.",
        "The operational effect of this pattern is revenue that feels harder than it should. You run campaigns that produce leads that do not convert because the follow-up was inconsistent. You close deals that do not retain because the onboarding lost the early momentum. You build reputation with customers who do not return because no retention structure was built. The effort is real. The compounding is not.",
      ],
      implication:
        "Growth fragmentation usually indicates an upstream structural issue. When Platform is fragmented, attribution fails. When Operations is fragmented, delivery is uneven. When Strategy is fragmented, growth priorities shift before any one channel compounds. Growth rarely resolves on its own, it resolves when the structure feeding it gets architected.",
    },
    critical_gap: {
      headline:
        "Your Growth System is not designed. Revenue comes from you.",
      pattern: [
        "There is no defined growth motion in your business. Revenue comes from your network, your direct effort, and the customers who happened to find you. There is no pipeline in any meaningful sense, there are conversations you are in. There is no retention structure, there are relationships you maintain. When you step back from growth activity, growth stops.",
        "This is common at earlier stages and becomes a liability as the business matures. The ceiling is your personal capacity for relationship work and direct selling. The risk is that every growth channel is a single point of failure, because the channel is you. The business has revenue, but it does not have a revenue system.",
      ],
      implication:
        "At this tier, the work is building a Growth System from the ground up. Defined channels. Documented sales motion. Structured retention. This is not about replacing the founder's relationships, those remain valuable. It is about building the structural layer underneath them so that revenue is not capped by how many conversations the founder can hold at once.",
    },
  },
};

// ============================================================
// OTHER OPERATING SYSTEMS — PATTERN SUMMARIES
// ============================================================
// Lighter analysis for the bottom two OS by severity.
// Single paragraph per OS per tier. Sixteen total.

export const PATTERN_SUMMARIES: Record< 
  OperatingSystem,
  Record<SeverityTier, string>
> = {
  strategy: {
    architected:
      "Strategic clarity is architected. Review cadence, metrics, and decision authority operate independently of any single person. This is an asset and a constraint that is not constraining.",
    functional_gap:
      "Strategy runs on your energy rather than on structure. The clarity exists in your head but the cadence and framework that would make it persist without you have not been built.",
    structural_gap:
      "Strategic review happens reactively. Performance data exists in pieces but is not assembled into a coherent picture. Revenue and margin visibility depend on estimate rather than on a structured model.",
    critical_gap:
      "No structured strategic review, no defined metric set, no decision framework. The business moves forward because you move it forward. Every strategic call routes through you.",
  },
  platform: {
    architected:
      "Platforms are integrated. Data moves between systems automatically. The information infrastructure is capable of supporting additional intelligence layers and coordinated activity.",
    functional_gap:
      "Core platforms are in place but the connective tissue is human effort. Manual reconciliation between systems works at current scale but carries a structural risk as the business grows.",
    structural_gap:
      "Platforms operate largely in isolation. Data is copied and reconciled manually rather than flowing between systems. Addressing Platform typically unlocks improvements that look like they belong to other operating systems.",
    critical_gap:
      "No platform layer. Spreadsheets, email, and memory hold the business together. The absence of infrastructure makes every new customer, team member, or product line add friction that would not otherwise exist.",
  },
  operations: {
    architected:
      "Operations are architected. Documented processes, clear ownership, and consistent execution independent of individual effort. The cost of adding scale is not operational chaos.",
    functional_gap:
      "Work gets done but consistency depends on who is doing it. Your best team members produce excellent outcomes; others are uneven because the difference is individual skill rather than documented process.",
    structural_gap:
      "Processes exist for some things and not others. Handoffs lose context. Your team absorbs preventable errors because execution is improvised within loose boundaries.",
    critical_gap:
      "No documented process layer for core work. Every operational decision either gets made by you or gets made by someone guessing what you would decide. The business cannot function without you present.",
  },
  growth: {
    architected:
      "Growth is a standing capability. Designed channels, documented sales motion, retention running on system rather than on relationship. Revenue is not constrained by founder bandwidth.",
    functional_gap:
      "Revenue happens because you drive it. The engine works, but you are the engine. Campaigns, deals, and retention all depend on your direct involvement.",
    structural_gap:
      "Growth activities happen but do not compound. Each cycle starts near zero because handoffs between stages leak. The business grows, but the cost of that growth is higher than it should be.",
    critical_gap:
      "No defined growth motion. Revenue comes from network and founder activity. Pipeline is a concept more than a system, and retention depends on individual relationships rather than on structure.",
  },
};

// ============================================================
// WHAT DROVE THIS ASSESSMENT — CALLOUT TRIGGERS
// ============================================================
// Per-OS callout library. Each entry defines:
//   - question_id: the Section B question that triggers it
//   - min_weight: minimum score to trigger (2 = fragmented, 3 = absent)
//   - copy: the callout text shown to the respondent
//
// Assembly logic: filter by triggered entries for the focus OS,
// rank by combined weight, cap at 3 per OS. Omit section if none
// triggered (all weights 0 or 1).

export interface CalloutTrigger {
  question_id: string;
  min_weight: 2 | 3;
  copy: string;
}

export const CALLOUT_TRIGGERS: Record<OperatingSystem, CalloutTrigger[]> = {
  strategy: [
    {
      question_id: "B.Core.2",
      min_weight: 2,
      copy: "You indicated you would need to guess or piece together data from multiple places to identify which operational area is losing the most money.",
    },
    {
      question_id: "B.Core.8",
      min_weight: 2,
      copy: "Strategic performance review happens reactively in your business, not on a structured schedule.",
    },
    {
      question_id: "B.Financial.1",
      min_weight: 2,
      copy: "Revenue forecasting in your business is based on rough estimates or judgment, not a structured model.",
    },
    {
      question_id: "B.Financial.2",
      min_weight: 2,
      copy: "Cost changes reach your reporting after the margin impact has already occurred.",
    },
    {
      question_id: "B.External.1",
      min_weight: 2,
      copy: "External data and benchmarks are not actively integrated into your decision-making.",
    },
    {
      question_id: "B.Scale.3",
      min_weight: 2,
      copy: "Approval routing in your business happens case-by-case rather than through a defined matrix.",
    },
  ],
  platform: [
    {
      question_id: "B.Core.5",
      min_weight: 2,
      copy: "You described platforms that are mostly disconnected or tied together by spreadsheets rather than by integration.",
    },
    {
      question_id: "B.Core.6",
      min_weight: 2,
      copy: "AI usage in your business is fragmented or absent rather than structured into coordinated workflows.",
    },
    {
      question_id: "B.CoreData.2",
      min_weight: 2,
      copy: "Customer records in your business are partial or thin, with context living outside the system of record.",
    },
    {
      question_id: "B.Commerce.1",
      min_weight: 2,
      copy: "Inventory position is tracked manually or approximately rather than in a real-time system.",
    },
    {
      question_id: "B.Commerce.2",
      min_weight: 2,
      copy: "Order fulfillment operates through individual judgment or playbooks rather than system-enforced workflow.",
    },
    {
      question_id: "B.Financial.2",
      min_weight: 2,
      copy: "Cost and margin changes do not flow through your reporting automatically.",
    },
  ],
  operations: [
    {
      question_id: "B.Core.3",
      min_weight: 2,
      copy: "You indicated that daily or constant owner involvement is required to move operational work forward.",
    },
    {
      question_id: "B.Core.4",
      min_weight: 2,
      copy: "Process documentation in your business is inconsistent or mostly absent.",
    },
    {
      question_id: "B.Communication.1",
      min_weight: 2,
      copy: "Customer inquiries are resolved based on availability rather than defined routing.",
    },
    {
      question_id: "B.Scheduling.1",
      min_weight: 2,
      copy: "Delivery milestones and deadlines are surfaced reactively rather than through system alerts.",
    },
    {
      question_id: "B.Scheduling.2",
      min_weight: 2,
      copy: "Customer onboarding execution varies by who handles it rather than following a documented sequence.",
    },
    {
      question_id: "B.People.1",
      min_weight: 2,
      copy: "New team member onboarding is loose or informal rather than structured with defined milestones.",
    },
    {
      question_id: "B.People.2",
      min_weight: 2,
      copy: "Team certifications, training, or compliance tracking is manual or reactive.",
    },
    {
      question_id: "B.Commerce.3",
      min_weight: 2,
      copy: "Inventory reorder decisions happen through individual judgment rather than automated triggers.",
    },
    {
      question_id: "B.Scale.1",
      min_weight: 2,
      copy: "Delegation to senior team members requires more owner involvement than the boundaries should require.",
    },
    {
      question_id: "B.Scale.2",
      min_weight: 2,
      copy: "Cross-functional coordination depends on the individuals involved rather than on defined handoffs.",
    },
    {
      question_id: "B.Scale.4",
      min_weight: 3,
      copy: "Compliance obligations exist and governance is behind where the business needs it to be.",
    },
  ],
  growth: [
    {
      question_id: "B.Core.1",
      min_weight: 2,
      copy: "Lead response outside business hours depends on who catches it rather than on structured automation.",
    },
    {
      question_id: "B.Core.7",
      min_weight: 2,
      copy: "Growth initiatives in your business lose momentum when you stop pushing them.",
    },
    {
      question_id: "B.CoreData.1",
      min_weight: 2,
      copy: "Sales pipeline visibility requires asking someone or interpreting data rather than a live dashboard.",
    },
    {
      question_id: "B.CoreData.3",
      min_weight: 2,
      copy: "Proposal and quote generation is manual or built from scratch rather than from structured templates.",
    },
    {
      question_id: "B.Content.1",
      min_weight: 2,
      copy: "Content production is inconsistent or driven by circumstance rather than an editorial calendar.",
    },
    {
      question_id: "B.Content.2",
      min_weight: 2,
      copy: "Marketing channel attribution is partial or absent.",
    },
    {
      question_id: "B.Financial.1",
      min_weight: 2,
      copy: "Revenue forecasting is estimate-based rather than model-based.",
    },
  ],
};

// ============================================================
// C1 PRIORITY OPTION PHRASING
// ============================================================
// OS-specific phrasing for Section C1 priority options.
// Top two OS get their phrased variant; fallbacks are the two
// standard options (owner capacity, visibility and reporting).

export const C1_OS_PHRASING: Record<OperatingSystem, string> = {
  strategy:
    "Clearer strategic visibility into what is working, what is not, and where to focus.",
  platform:
    "A connected system where tools, data, and workflows actually talk to each other.",
  operations:
    "Documented operations that run consistently without my direct involvement.",
  growth:
    "A predictable revenue engine that does not depend on me pushing it.",
};

export const C1_STANDARD_OPTIONS = {
  owner_capacity:
    "Taking myself out of the day-to-day so I can focus on the direction of the business.",
  visibility_reporting:
    "Real-time visibility into the metrics that actually matter.",
};

// ============================================================
// WHAT YOU TOLD US — INTERPRETIVE CLOSES
// ============================================================
// One interpretive close per top-OS tier. Displayed under the C2
// callout block. Reflects the respondent's stated outcome back
// through the lens of their structural pattern.

export const INTERPRETIVE_CLOSES: Record<SeverityTier, string> = {
  architected:
    "You have built the architecture that most businesses at your scale have not. What comes next is extending that discipline into the systems that can still benefit from it.",
  functional_gap:
    "The outcome you are describing is the difference between a business that runs on your effort and a business that runs on architecture. The work ahead is converting one into the other.",
  structural_gap:
    "This is the pattern the architecture is producing. Not a capacity problem. Not a team problem. A structural problem that has you functioning as the operating system your business has not built yet.",
  critical_gap:
    "Every founder-led business at your stage faces this ceiling. The path forward is not working harder. It is architecting the systems that can carry the load you are currently carrying personally.",
};

// ============================================================
// CLOSING SECTION VARIANTS
// ============================================================

export interface ClosingVariantCopy {
  header: string;
  body: string[]; // array of paragraphs
  primary_cta: string;
  secondary_cta?: string;
  secondary_body?: string; // descriptive body above secondary CTA
}

export const CLOSING_VARIANTS: Record< 
  "qualified" | "below_threshold" | "above_segment",
  ClosingVariantCopy
> = {
  qualified: {
    header: "What Comes Next",
    body: [
      "This report identifies where the structural gaps are. It does not tell you how to close them, because the right approach depends on the specifics of your business, your platforms, your team, and your constraints.",
      "Quanton Labs deploys governed AI operating systems for businesses in exactly your range: $1M to $20M, founder-led or operator-led, experiencing the kind of structural drag this report describes. Our Phase 1 Discovery engagement produces a tailored architectural plan with Baseline Metrics and a prioritized implementation roadmap.",
      "If you would like to explore what that would look like for [COMPANY NAME], the next step is a qualification conversation. We cover your operational reality in more depth, confirm fit, and determine whether Phase 1 makes sense.",
    ],
    primary_cta: "Schedule a qualification conversation",
    secondary_body:
      "You can also continue with the optional Deep Dive extension of this assessment, which produces an expanded Operator Brief with agent-level analysis for [TOP OS NAME] and [SECOND OS NAME] — your two focus areas. It takes an additional 8 to 10 minutes.",
    secondary_cta: "Continue to Deep Dive",
  },
  below_threshold: {
    header: "Where to Go From Here",
    body: [
      "This report is yours regardless of what comes next. The structural patterns it identifies hold whether you address them now, in a year, or incrementally as the business grows.",
      "Quanton Labs typically engages with businesses generating $1M or more in annual revenue, where the operational complexity justifies the architectural investment our engagement model requires. If that is where your business is heading, the insights in this report will remain relevant as you approach that scale.",
      "In the meantime, we publish writing on operational architecture, AI infrastructure, and the structural patterns that determine whether growth compounds or fragments. If you would like to stay connected, you can continue to receive that material.",
    ],
    primary_cta: "Stay connected with Quanton Labs",
  },
  above_segment: {
    header: "A Different Conversation",
    body: [
      "Your profile sits above Quanton Labs' typical engagement segment. The structural patterns this report describes apply to your business, but the implementation approach that works for a $5M company and the implementation approach that works for a $40M company are not the same.",
      "If the patterns in this report resonate, the right next step is not a standard qualification conversation. It is a direct conversation with Ryan Remington, Managing Director, about whether a tailored engagement makes sense for a business at your scale. These engagements look different from our standard Phase 1 Discovery — the scope, the timeline, and the approach all adjust to match.",
    ],
    primary_cta: "Request a direct conversation with Ryan Remington",
    secondary_body:
      "The Stage 2 Deep Dive is also available if you would like an expanded operator brief before the conversation. It takes an additional 8 to 10 minutes.",
    secondary_cta: "Continue to Deep Dive",
  },
};