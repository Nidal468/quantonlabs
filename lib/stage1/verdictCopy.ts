// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Quick Diagnostic - Verdict Screen Copy
//
// The verdict renders after the eight B.Core questions and before the email
// gate. Every line is built from an answer the respondent just gave. Nothing
// here names Quanton OS: the product belongs in the report, not the diagnosis.

import type {
  OperatingSystem,
  RevenueBand,
  SectionA,
  SectionB,
  TeamSize,
} from "./types";

// ============================================================
// DISPLAY LABELS
// ============================================================

export const DOMAIN_LABEL: Record<OperatingSystem, string> = {
  strategy: "Strategy",
  platform: "Platform",
  operations: "Operations",
  growth: "Growth",
};

// Re-exported from reportCopy so the verdict, the report, and the results
// screen all name the tiers identically.
export { TIER_LABELS as TIER_LABEL } from "./reportCopy";

// Written as a full clause so the sentence states what is being measured
// rather than assuming it. The open bands take a different shape, since
// "between under $1M" does not parse.
const REVENUE_PHRASE: Record<RevenueBand, string> = {
  under_1m: "With revenue under $1M",
  "1m_3m": "With revenue between $1M and $3M",
  "3m_8m": "With revenue between $3M and $8M",
  "8m_15m": "With revenue between $8M and $15M",
  "15m_20m": "With revenue between $15M and $20M",
  over_20m: "With revenue over $20M",
};

// Phrased to read inside a sentence: "You are running {phrase}..."
const TEAM_PHRASE: Record<TeamSize, string> = {
  solo: "the business on your own",
  "2_5": "a team of two to five",
  "6_15": "a team of six to fifteen",
  "16_30": "a team of sixteen to thirty",
  "31_50": "a team of thirty to fifty",
  over_50: "a team of more than fifty",
};

const COUNT_WORD: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
};

function countPhrase(n: number): string {
  return COUNT_WORD[n] ?? String(n);
}

// ============================================================
// OPENING
// ============================================================

export interface VerdictOpening {
  observation: string;
  implication: string;
}

/**
 * Two sentences. The first repeats the respondent's position back as fact.
 * The second draws the conclusion they did not state themselves.
 */
export function buildOpening(
  sectionA: SectionA,
  sectionB: SectionB,
  avgSeverity: number
): VerdictOpening {
  const team = TEAM_PHRASE[sectionA.team_size];
  const n = Math.max(sectionA.operational_surface.length, 2);
  const domains = countPhrase(n);
  const bottleneck = sectionB["B.Core.3"];
  const frequency = bottleneck === 3 ? "constantly" : "daily";

  // A solo operator being told decisions route through them is being told
  // something they already know and cannot act on. The constraint at that
  // scale is transferability, not delegation.
  if (sectionA.team_size === "solo") {
    return {
      observation: `You are running ${domains} operational domains on your own.`,
      implication:
        "The constraint is not hours. Every process in the business currently lives in your head, which works exactly as long as you do, and nothing built that way can be handed over, scaled, or sold with you outside it.",
    };
  }

  if (typeof bottleneck === "number" && bottleneck >= 2) {
    return {
      observation: `You are running ${team} across ${domains} operational domains, and decisions still route through you ${frequency}.`,
      implication: `That is not a workload problem. You have people, and the work still stops at you, which means the ceiling is structural rather than personal.`,
    };
  }

  if (avgSeverity >= 45) {
    return {
      observation: `You are running ${team} across ${domains} operational domains, and you have already pushed decisions out of your inbox.`,
      implication:
        "The gaps below are what happens next. Distributing decisions without distributing structure moves the bottleneck rather than removing it.",
    };
  }

  return {
    observation: `You are running ${team} across ${domains} operational domains, and the structure underneath is holding.`,
    implication:
      "That is uncommon at your size. What follows is where it thins first.",
  };
}

// ============================================================
// WEAKEST DOMAIN
// ============================================================

/**
 * What the respondent actually chose, restated as an observation.
 *
 * Only the two weakest answers per question carry an entry. Someone who
 * answered well on a question should never see it named. The point is to
 * repeat their own answers back, not to describe the domain in general.
 */
const ANSWER_OBSERVATION: Record<string, { 2: string; 3: string }> = {
  "B.Core.1": {
    2: "a lead arriving after hours waits until someone sees it the next morning",
    3: "what happens to an after-hours lead depends on who catches it first",
  },
  "B.Core.2": {
    2: "you would be working from intuition and sporadic reports if asked which area is losing the most money",
    3: "you would have to guess which operational area is losing the most money",
  },
  "B.Core.3": {
    2: "you are the clearing house for decisions across the business, daily",
    3: "nothing moves without you",
  },
  "B.Core.4": {
    2: "if a key person left, most of what they know would leave with them",
    3: "if a key person left, you would lose months of productivity",
  },
  "B.Core.5": {
    2: "platforms are mostly disconnected, so data gets exported, reconciled, and re-entered",
    3: "everything lives in separate places, with spreadsheets tying it together",
  },
  "B.Core.6": {
    2: "AI use in the business is largely your own",
    3: "AI is not being used in any meaningful way",
  },
  "B.Core.7": {
    2: "initiatives start with energy and stop when you stop pushing them",
    3: "initiatives get discussed more often than they get run",
  },
  "B.Core.8": {
    2: "performance gets reviewed when something goes wrong",
    3: "performance is rarely reviewed in any structured way",
  },
};

// Which core questions feed which domain, primary questions first.
const DOMAIN_QUESTIONS: Record<OperatingSystem, string[]> = {
  strategy: ["B.Core.2", "B.Core.8", "B.Core.3", "B.Core.6"],
  platform: ["B.Core.5", "B.Core.6", "B.Core.2", "B.Core.4"],
  operations: ["B.Core.3", "B.Core.4", "B.Core.5"],
  growth: ["B.Core.1", "B.Core.7", "B.Core.8"],
};

// The consequence, drawn once their own answers have been named.
const DOMAIN_CONSEQUENCE: Record<OperatingSystem, string> = {
  strategy:
    "Priorities get set and then renegotiated in the moment by whoever is closest to the problem. Six months later the business is somewhere nobody chose.",
  platform:
    "The cost is not the reconciling. It is that decisions wait on it, and the decisions that wait are the ones that matter.",
  operations:
    "Work is moving on attention rather than on process, which holds while the right people are watching and stops when they are not.",
  growth:
    "Revenue is arriving through effort rather than through a system. That works until volume exceeds what personal attention can cover.",
};

export interface WeakestDomainCopy {
  lead: string;
  observations: string[];
  consequence: string;
}

/**
 * Builds the weakest-domain block from the answers that actually drove the
 * score, rather than describing the domain in the abstract.
 */
export function buildWeakestDomain(
  topOs: OperatingSystem,
  sectionB: SectionB
): WeakestDomainCopy {
  const observations = DOMAIN_QUESTIONS[topOs]
    .map((qid) => {
      const w = sectionB[qid];
      if (w === 2 || w === 3) return ANSWER_OBSERVATION[qid]?.[w];
      return null;
    })
    .filter((x): x is string => Boolean(x))
    .slice(0, 3);

  return {
    lead: `${DOMAIN_LABEL[topOs]} scored weakest, and these are the answers that put it there.`,
    observations,
    consequence: DOMAIN_CONSEQUENCE[topOs],
  };
}

/**
 * Replaces the weakest-domain paragraph when nothing is actually weak. The
 * copy must not manufacture a problem that the scoring did not find.
 */
export const NO_GAP_COPY =
  "Nothing in this read suggests a structural constraint. Businesses that score this way are usually either early enough that complexity has not arrived yet, or already running on deliberate architecture. The full report will tell you which.";

// ============================================================
// SECOND SIGNAL
// ============================================================

/**
 * Connects two answers the respondent gave separately. This is what makes the
 * read feel diagnostic rather than templated. At most one is shown, in
 * priority order.
 */
export function buildSecondSignal(
  sectionA: SectionA,
  sectionB: SectionB
): string | null {
  // B.Core.6 runs from structured AI use (0) to none at all (3). Each
  // answer is a different situation, so a single line covering all of them
  // is wrong for most respondents.
  const aiUse = sectionB["B.Core.6"];

  if (aiUse === 1) {
    return "You also told us people are using AI tools independently, with nothing coordinating them. Each tool sees a fraction of the business and none of them share what they learn, so the work gets faster in places without the business getting better anywhere.";
  }

  if (aiUse === 2) {
    return "You also told us AI use in the business is largely your own. That makes it another thing routing through you, and it means whatever leverage it creates stops when you stop.";
  }

  if (aiUse === 3) {
    return "You also told us AI is not being used in any meaningful way. That is not the problem. Deployed onto the gaps above it would inherit them, and the structural work has to come first either way.";
  }

  const n = sectionA.operational_surface.length;
  if (n >= 7) {
    const team = TEAM_PHRASE[sectionA.team_size];
    return `${countPhrase(n).charAt(0).toUpperCase() + countPhrase(n).slice(1)} operational domains run by ${team} means most of them are held in one person's memory. That is survivable. It is not transferable, and it is the reason a business in this shape cannot be handed over, scaled, or sold as it stands.`;
  }

  return null;
}

// ============================================================
// SCALE
// ============================================================

/**
 * Revenue drives every routing decision in the system yet never appeared in
 * the verdict, so a business at nine hundred thousand and one at eight
 * million read identically. This line says what the scale means for what
 * happens next, without repeating the number back as a boast.
 */
export function buildScaleLine(
  sectionA: SectionA,
  avgSeverity: number
): string {
  const rev = REVENUE_PHRASE[sectionA.revenue];
  const strained = avgSeverity >= 55;

  switch (sectionA.revenue) {
    case "under_1m":
      return `${rev}, the gaps above are real but the answer is rarely a full system. Businesses at this stage get further by fixing the single thing costing the most hours than by rebuilding everything at once.`;

    case "1m_3m":
      return strained
        ? `${rev}, this is usually the first time informal operations stop working. What carried the business to here will not carry it much further, and the gaps above are where it gives first.`
        : `${rev}, the structure is still mostly personal, and at this size that is normal. The question is what gets built before the next hire makes it everyone's problem.`;

    case "3m_8m":
      return strained
        ? `${rev}, the business has outgrown the way it is run. Nothing above is new, it has simply stopped being absorbable, and every additional customer makes it more expensive.`
        : `${rev}, you have held things together further than most. The gaps above are the ones that will surface when volume rises rather than when it does not.`;

    case "8m_15m":
      return strained
        ? `${rev}, gaps this size stop being operational friction and start setting the ceiling. A business at this scale does not fail on these. It just stops growing and nobody can say exactly why.`
        : `${rev}, most of the structure is working. What remains is the difference between a business that runs and one that could be handed to someone else.`;

    case "15m_20m":
      return strained
        ? `${rev}, this is not a business that lacks systems. It is a business whose systems were built for a smaller version of itself, and the gaps above are where the seams are showing.`
        : `${rev}, the architecture is largely sound. At this scale the remaining gaps are worth resolving because they are what a buyer, a lender, or a successor would find.`;

    case "over_20m":
      return `${rev}, structural gaps stop being an efficiency question and start being a valuation one. What holds a business together at this scale is architecture, and the gaps above are where it is thin.`;
  }
}

// ============================================================
// THE GATE
// ============================================================

export const GATE_REASON = [
  "Eight questions can tell you where the drag is. They cannot tell you what it costs.",
  "They also cannot tell you which of these gaps is causing the others. Usually only one is structural and the rest are symptoms, and treating a symptom is how businesses spend two years fixing the wrong thing.",
  "The Structural Intelligence Report answers both. It runs the full diagnostic against the domains that actually apply to your business, puts an annual figure against each gap, and returns the sequence in which they should be resolved.",
];

export interface GateCopy {
  heading: string;
  support: string;
  button: string;
  note?: string;
}

/**
 * Gate copy varies by qualification route. Below-threshold respondents are
 * told plainly that a full deployment is not the honest recommendation at
 * their stage, which is where Modular routing surfaces.
 */
export function buildGateCopy(
  closingVariant: "qualified" | "below_threshold" | "above_segment"
): GateCopy {
  const base: GateCopy = {
    heading: "Where should we send it?",
    support:
      "The full diagnostic follows, and your report is generated at the end of it. Nothing else follows unless you ask.",
    button: "Continue to the full diagnostic",
  };

  if (closingVariant === "below_threshold") {
    return {
      ...base,
      note: "One thing worth saying now: at your stage the answer is usually not a full system. A single agent aimed at your sharpest constraint does more than a rebuild. Your report covers where that constraint sits, and we can scope the rest on a call.",
    };
  }

  if (closingVariant === "above_segment") {
    return {
      ...base,
      note: "At your scale the standard sequence rarely fits. Expect a direct note rather than an automated one.",
    };
  }

  return base;
}

export const CALENDLY_URL = "https://calendly.com/quantonlabs/30min";
export const SKIP_LINK_LABEL = "Rather just talk it through? Book a call";