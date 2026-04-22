// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Question Definitions

import type {
  IdentityFrame,
  RiskStyle,
  TimeHorizon,
  EmotionalDriver,
  DecisionActivator,
  VisionCategory,
  OperatingSystem,
} from "./types";

// ============================================================
// INFERENCE QUESTION MAPS
// ============================================================
// Each inference question maps answer index (0-3) to a profile value.
// These run silently. The owner never sees the mapping.

export const INFERENCE_Q1_MAP: Record<number, IdentityFrame> = {
  0: "operator",
  1: "builder",
  2: "steward",
  3: "visionary",
};

export const INFERENCE_Q2_MAP: Record<number, RiskStyle> = {
  0: "loss_averse",
  1: "opportunity_driven",
  2: "pragmatic",
  3: "growth_oriented",
};

export const INFERENCE_Q3_MAP: Record<number, TimeHorizon> = {
  0: "short_term",
  1: "medium_term",
  2: "long_term",
  3: "exit_legacy",
};

export const INFERENCE_Q4_MAP: Record<number, EmotionalDriver> = {
  0: "financial_security",
  1: "time_and_lifestyle",
  2: "independence_and_legacy",
  3: "achievement_and_scale",
};

export const INFERENCE_Q5_MAP: Record<number, DecisionActivator> = {
  0: "loss_averse",
  1: "vision",
  2: "data",
  3: "relationship",
};

export const VISION_CATEGORY_MAP: Record<number, VisionCategory> = {
  0: "financial_freedom",
  1: "time_and_lifestyle",
  2: "family_and_legacy",
  3: "exit_and_independence",
  4: "growth_and_scale",
  5: "proof_and_achievement",
};

// ============================================================
// INFERENCE QUESTION CONTENT
// ============================================================

export interface InferenceQuestion {
  id: string;
  prompt: string;
  options: [string, string, string, string];
}

export const INFERENCE_QUESTIONS: InferenceQuestion[] = [
  {
    id: "IQ1",
    prompt:
      "What would have to be true for you to feel like this business is finally working the way it should?",
    options: [
      "I would have clear visibility into what is happening across the business and feel genuinely in control of outcomes.",
      "The business would run and grow without requiring my constant presence or involvement.",
      "My team would be performing consistently and the culture would reflect what I originally built this for.",
      "We would be moving measurably and deliberately toward something larger than where we are today.",
    ],
  },
  {
    id: "IQ2",
    prompt:
      "When you think about where your business is right now, what sits heaviest on you?",
    options: [
      "Protecting what we have built. Things are working but I am aware of how quickly that can change.",
      "Recovering ground. We have lost momentum somewhere and I want it back.",
      "Finding the ceiling. I know we can perform better than we are and I cannot identify exactly why we are not.",
      "Accelerating. The foundation is there and I want to move faster toward where we are going.",
    ],
  },
  {
    id: "IQ3",
    prompt:
      "When you are making decisions about the business, what time frame is most present in your thinking?",
    options: [
      "The next 30 to 90 days. Cash flow, immediate problems, what needs to happen this quarter.",
      "The next one to two years. Building systems, growing the team, getting ahead of where we are.",
      "The next three to five years. What this business looks like when it is running at its real potential.",
      "The longer horizon. What this business becomes, what it is worth, and what it means beyond me.",
    ],
  },
  {
    id: "IQ4",
    prompt:
      "What would make the next 12 months feel like a genuine success to you personally, not just for the business?",
    options: [
      "Significantly less financial stress and more certainty about where the money is coming from.",
      "Getting real time back. Fewer nights and weekends consumed by problems the business should be solving itself.",
      "Knowing the business could sustain and grow without everything running through me.",
      "Being able to point to measurable progress toward a goal that actually matters to me.",
    ],
  },
  {
    id: "IQ5",
    prompt:
      "When something important in your life or business has been broken or underperforming for a while, what finally moved you to do something about it?",
    options: [
      "When the cost of staying where I was became impossible to ignore.",
      "When someone showed me a clear picture of what things could look like on the other side.",
      "After doing my own research and finally understanding the real source of the problem.",
      "When a trusted advisor, whether an accountant, attorney, or mentor, helped me see something I had been too close to recognize.",
    ],
  },
];

// ============================================================
// VISION QUESTION CONTENT
// ============================================================

export const VISION_QUESTION = {
  id: "VQ1",
  prompt:
    "When you are honest with yourself about why you started this business, or why you are still building it, which of these comes closest to what drives you?",
  options: [
    "Financial freedom. I want income and wealth that gives me real options, not just a salary I work for.",
    "Time and lifestyle. I want control over how I spend my days. The business should serve my life, not consume it.",
    "Family and legacy. I am building something that outlasts me, provides for the people I care about, and means something beyond revenue.",
    "Exit and independence. I am building an asset. At some point I want to step back, sell, or hand it off and have something to show for it.",
    "Growth and scale. I want to build something genuinely significant. The goal is not stability, it is momentum.",
    "Proof and achievement. I started this to prove something to myself or to others, and I am not done yet.",
  ] as const,
};

// ============================================================
// SECTION 2 QUESTION CONTENT
// ============================================================

export interface Section2Question {
  id: string;
  os: OperatingSystem | "universal";
  prompt: string;
  options: string[];
  conditional_on?: { question_id: string; answers: string[] };
}

export const SECTION2_QUESTIONS: Section2Question[] = [
  // Universal bridge
  {
    id: "S2.Universal.1",
    os: "universal",
    prompt:
      "Thinking about what you just shared, how much of your current week as an owner is actually spent working toward the vision you described, versus managing the day to day demands of keeping the business running?",
    options: [
      "Almost all of my time goes toward the vision. I have built enough structure that the business largely runs itself.",
      "More than half of my time is directed toward growth and the things that matter most.",
      "It is roughly split. I move between strategic and operational constantly and neither gets my full attention.",
      "Most of my time is consumed by the day to day. The vision is something I think about but rarely have time to act on.",
      "Nearly all of my time is operational. I am in the business almost entirely, not working on it.",
    ],
  },

  // Operations OS
  {
    id: "S2.Ops.1",
    os: "operations",
    prompt:
      "When a process breaks down in your business, whether a delivery goes wrong, a job gets reworked, or a deadline is missed, how does your team typically respond?",
    options: [
      "We have a clear process for identifying the cause and correcting it. It rarely happens twice.",
      "We address it case by case. Some things get fixed, others recur.",
      "It depends on who is involved. Some people handle it well, others do not.",
      "We are mostly reactive. We fix the immediate problem but the underlying cause usually remains.",
    ],
  },
  {
    id: "S2.Ops.2",
    os: "operations",
    prompt:
      "How would you describe the visibility you currently have into what is actually happening in your business on any given day?",
    options: [
      "Strong. I have reliable data and reporting that tells me where things stand without having to ask.",
      "Adequate. I can get the information I need but it requires effort to pull it together.",
      "Limited. I rely heavily on conversations and gut feel rather than data.",
      "Minimal. Most of what I know comes from problems surfacing rather than systems reporting.",
    ],
  },
  {
    id: "S2.Ops.3",
    os: "operations",
    prompt:
      "When something goes wrong in the business and you find out about it, how did you typically learn?",
    options: [
      "A team member told me directly.",
      "A customer told me before my team did.",
      "I noticed it myself when reviewing something.",
      "It had already become a significant problem before I was aware of it.",
    ],
    conditional_on: { question_id: "S2.Ops.2", answers: ["c", "d"] },
  },
  {
    id: "S2.Ops.4",
    os: "operations",
    prompt:
      "If you were completely removed from your business for 30 days with no contact, what would you expect to find when you returned?",
    options: [
      "The business would have run well. My team has what they need to operate without me.",
      "Most things would be fine but a few important things would have slipped.",
      "There would be meaningful problems that required my direct attention to resolve.",
      "It is difficult to imagine. My involvement is woven into too many things for that to work right now.",
    ],
  },

  // Growth OS
  {
    id: "S2.Growth.1",
    os: "growth",
    prompt:
      "Think about the last time a real opportunity came into your business and did not convert. Not because the fit was wrong, but because something on your end broke down. How often does that happen?",
    options: [
      "Rarely. We lose business but it is usually on price or fit, not on our process.",
      "Occasionally. I can think of specific instances where we left real money on the table.",
      "Regularly. I know we are losing convertible opportunities and it bothers me more than I let on.",
      "I honestly do not have enough visibility to know for certain, which is a problem in itself.",
    ],
  },
  {
    id: "S2.Growth.2",
    os: "growth",
    prompt:
      "How would you describe your business's ability to generate new revenue independent of your personal relationships and direct involvement?",
    options: [
      "Strong. We have channels and processes that bring in business without requiring me to be the driver.",
      "Developing. We have some structure but I am still central to most new revenue conversations.",
      "Limited. Most new business comes through my relationships or my direct effort.",
      "Almost entirely dependent on me. If I stepped back from business development, new revenue would slow significantly.",
    ],
  },
  {
    id: "S2.Growth.3",
    os: "growth",
    prompt:
      "When you think about the clients or customers you have lost or never converted in the past 12 months, what was the most common reason?",
    options: [
      "Price. We lost on cost.",
      "Speed. We were not responsive enough.",
      "Awareness. They did not know enough about us to choose us.",
      "Follow through. We had the opportunity but did not pursue it consistently enough.",
      "I do not have clear visibility into why we lose business.",
    ],
  },

  // Strategy OS
  {
    id: "S2.Strategy.1",
    os: "strategy",
    prompt:
      "How clearly defined are the one to three year goals for your business, and how confident are you that your current operational structure can actually deliver them?",
    options: [
      "Goals are clearly defined and I am confident the structure can support them.",
      "Goals are clear but I have real uncertainty about whether the structure can keep up.",
      "Goals exist but they are not specific enough to drive meaningful decisions day to day.",
      "We operate mostly on shorter time frames. Longer term planning is difficult given how much of my time the business requires.",
    ],
  },
  {
    id: "S2.Strategy.2",
    os: "strategy",
    prompt:
      "If your business continued operating exactly as it does today for the next three years, where would you expect to be relative to the vision you described earlier?",
    options: [
      "Closer to it. The trajectory feels right even if the pace could be faster.",
      "About where I am now. We would maintain but not meaningfully advance.",
      "Further behind. The gap between where I am and where I want to be would widen.",
      "I would have burned out or made a significant change before three years passed.",
    ],
  },

  // People OS (mapped to platform gaps)
  {
    id: "S2.People.1",
    os: "platform",
    prompt:
      "When you think about the people-related decisions and conversations you have had in the last 30 days, how many of them should have been handled by a system, a process, or a capable team member rather than requiring your direct involvement?",
    options: [
      "Very few. My involvement in people issues is strategic, not operational.",
      "Some. There are recurring situations that I handle personally that probably should not require me.",
      "Many. A significant portion of my week involves people issues that a better structure would eliminate.",
      "Almost all of them. People management is one of the largest consumers of my time and attention right now.",
    ],
  },
  {
    id: "S2.People.2",
    os: "platform",
    prompt:
      "When you think about your team right now, which best describes where most of your energy goes?",
    options: [
      "Developing people who are already performing well.",
      "Managing performance gaps in people who are not meeting expectations.",
      "Filling roles or managing the impact of positions that are vacant or underperforming.",
      "Dealing with the same issues repeatedly because the underlying structure to resolve them does not exist yet.",
    ],
  },

  // Urgency — universal closing
  {
    id: "S2.Urgency",
    os: "universal",
    prompt:
      "Given everything you just reflected on, how urgent does addressing these gaps feel to you right now?",
    options: [
      "Critical. This needs to change and I know it. I have been putting it off and I should not be.",
      "Important but not yet urgent. I know it matters but I have not felt the pressure to act yet.",
      "Significant but uncertain. I know something needs to change but I am not sure what the right move is.",
      "I came here to understand the picture better. I did not expect it to feel this pressing.",
    ],
  },
];

// ============================================================
// HELPERS
// ============================================================

/**
 * Returns the Section 2 questions active for a given respondent
 * based on their top two OS from Stage 1.
 * Universal questions always appear. OS questions appear only
 * if that OS is in the top two. Conditional questions are
 * filtered at render time based on prior answers.
 */
export function getSection2Questions(
  topOs: OperatingSystem,
  secondOs: OperatingSystem
): Section2Question[] {
  const activeOs = new Set<string>([topOs, secondOs, "universal"]);
  return SECTION2_QUESTIONS.filter((q) => activeOs.has(q.os));
}