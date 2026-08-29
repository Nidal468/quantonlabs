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

  if (typeof bottleneck === "number" && bottleneck >= 2) {
    return {
      observation: `You are running ${team} across ${domains} operational domains, and decisions still route through you ${frequency}.`,
      implication: `That is not a workload problem. One person is the integration layer for ${domains} domains, and there is a ceiling on that no matter how the hours are arranged.`,
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
 * One paragraph naming the specific failure the score implies, in language an
 * operator would use to describe their own week.
 */
export const WEAKEST_DOMAIN_COPY: Record<OperatingSystem, string> = {
  strategy:
    "Your weakest reading is Strategy, which is rarely about the plan. It is about what happens to the plan between the decision and the work. Priorities get set, then get renegotiated in the moment by whoever is closest to the problem. Six months later the business is somewhere nobody chose.",
  platform:
    "Your weakest reading is Platform. Every question that spans two systems becomes an errand: someone exports, someone reconciles, someone decides which number to believe. The cost is not the exporting. It is that the decision waits, and the decisions that wait are the ones that matter.",
  operations:
    "Your weakest reading is Operations. Work is moving on attention rather than on process, which is why it holds when the right people are watching and falls apart the week they are not. Quality is currently a function of who is present.",
  growth:
    "Your weakest reading is Growth. Revenue is arriving through effort, not through a system, which works until volume exceeds what personal attention can cover. That ceiling does not announce itself. It shows up as a good quarter followed by three bad ones.",
};

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

  if (sectionA.revenue === "under_1m") {
    return `${rev}, the gaps above are real but the answer is rarely a full system. Businesses at this stage get further by fixing the single thing costing the most hours than by rebuilding everything at once.`;
  }

  if (sectionA.revenue === "over_20m") {
    return `${rev}, structural gaps stop being an efficiency question and start being a valuation one. What holds a business together at this scale is architecture, and the gaps above are where it is thin.`;
  }

  if (avgSeverity >= 60) {
    return `${rev}, this is the range where informal operations stop working. The gaps above are the ones that widen fastest as revenue grows, because volume finds every seam.`;
  }

  return `${rev}, you are in the band where structure either compounds or starts costing you. What you have built is holding. The question is whether it holds at the next level.`;
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
      "Two fields. The report is yours whether or not we ever speak, and nothing follows it unless you ask.",
    button: "Continue to the full diagnostic",
  };

  if (closingVariant === "below_threshold") {
    return {
      ...base,
      note: "One thing worth saying now: at your stage the answer is usually not a full system. It is one agent aimed at the single thing costing you the most hours. The report will name which one.",
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