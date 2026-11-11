// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - Question Bank and Activation
// Source: ASSESSMENT STAGE 2 QUESTION BANK (copy verbatim);
//         ASSESSMENT FRAMES AND TRANSITIONS (sections 11 to 13)

import type { OperatingSystem } from "@/lib/stage1/types";

export type S2Section = 1 | 2 | 3;

export interface S2Option {
  key: string;
  label: string;
}

export interface S2Question {
  id: string;
  section: S2Section;
  text: string;
  kind: "choice" | "number" | "text";
  options?: S2Option[];
  /** Operating system block; absent for universal items. */
  os?: OperatingSystem;
  optional?: boolean;
  min?: number; // characters for text, value for number
  max?: number;
  placeholder?: string;
  defaultValue?: string;
}

const opts = (...pairs: [string, string][]): S2Option[] => pairs.map(([key, label]) => ({ key, label }));

const MONEY_BANDS = opts(["u25k", "Under $25K"], ["25k_50k", "$25K to $50K"], ["50k_100k", "$50K to $100K"], ["100k_250k", "$100K to $250K"], ["250k_500k", "$250K to $500K"], ["o500k", "Over $500K"]);

export const S2_QUESTIONS: S2Question[] = [
  // ---------------- Section 1: Why ----------------
  { id: "IQ1", section: 1, kind: "choice", text: "What would have to be true for this company to be working the way it should?", options: opts(
    ["operator", "Leadership sees what is happening across the company and is in control of outcomes"],
    ["builder", "The company runs and grows without depending on a few people"],
    ["steward", "The team performs consistently and the culture reflects what the company stands for"],
    ["visionary", "The company is moving deliberately toward something larger than where it is today"]) },
  { id: "IQ2", section: 1, kind: "choice", text: "Where the company is right now, what weighs on you most?", options: opts(
    ["protecting", "Protecting what has been built: it works, and I know how quickly that can change"],
    ["recovering", "Recovering ground: we lost momentum somewhere and I want it back"],
    ["ceiling", "Finding the ceiling: I know we can perform better and cannot pin down why we are not"],
    ["accelerating", "Accelerating: the foundation is there and I want to move faster"]) },
  { id: "IQ3", section: 1, kind: "choice", text: "When you make decisions about the company, what time frame is most present?", options: opts(
    ["d30_90", "The next 30 to 90 days"],
    ["y1_2", "The next one to two years"],
    ["y3_5", "The next three to five years"],
    ["longer", "The longer horizon: what the company becomes, what it is worth, and what it means beyond the people running it today"]) },
  { id: "IQ4", section: 1, kind: "choice", text: "What would make the next 12 months a genuine success for you personally, not just for the company?", options: opts(
    ["pressure", "Less financial pressure and more certainty about where the money comes from"],
    ["time", "Real time back: fewer nights and weekends spent on problems the company should solve itself"],
    ["without_me", "Knowing the company could sustain and grow without everything running through me or a few people"],
    ["progress", "Measurable progress toward a goal that matters to me"]) },
  { id: "IQ5", section: 1, kind: "choice", text: "When something important has been broken or underperforming for a while, what finally moves you to act?", options: opts(
    ["cost", "When the cost of staying put becomes impossible to ignore"],
    ["picture", "When someone shows me a clear picture of the other side"],
    ["research", "When my own research shows me the real source of the problem"],
    ["advisor", "When a trusted advisor helps me see what I was too close to recognize"]) },
  // VQ1: option wording as in the prior build, with "business" read as "company";
  // Exit and independence carries the question bank wording.
  { id: "VQ1", section: 1, kind: "choice", text: "When you are honest about why you built or lead this company, which comes closest to what drives you?", options: opts(
    ["financial_freedom", "Financial freedom: I want income and wealth that gives me real options, not just a salary I work for"],
    ["time_lifestyle", "Time and lifestyle: I want control over how I spend my days. The company should serve my life, not consume it"],
    ["family_legacy", "Family and legacy: I am building something that outlasts me, provides for the people I care about, and means something beyond revenue"],
    ["exit_independence", "Exit and independence: building an asset I can step back from, sell, or hand off"],
    ["growth_scale", "Growth and scale: I want to build something genuinely significant. The goal is not stability, it is momentum"],
    ["proof_achievement", "Proof and achievement: I started this to prove something to myself or to others, and I am not done yet"]) },
  { id: "VQ2", section: 1, kind: "choice", text: "How close does the company feel to delivering that right now?", options: opts(
    ["further", "Further away than when I started"],
    ["see_path", "Not close, but I can see the path"],
    ["middle", "Somewhere in the middle"],
    ["closer", "Closer, but not there yet"],
    ["very_close", "Very close, which is why I want to protect it"]) },
  { id: "VQ3", section: 1, kind: "text", min: 12, max: 280, text: "What would have to change in the next 12 months for the company to be genuinely moving toward that?" },

  // ---------------- Section 2: Reality check ----------------
  { id: "R.Time", section: 2, kind: "choice", text: "How much of your own week goes toward the direction you just described, versus keeping the company running?", options: opts(
    ["almost_all", "Almost all toward the direction"], ["more_half", "More than half"], ["split", "Roughly split"], ["mostly_running", "Mostly keeping it running"], ["nearly_all_running", "Nearly all keeping it running"]) },
  { id: "R.Ops.1", section: 2, os: "operations", kind: "choice", text: "When a process breaks (a delivery goes wrong, work is redone, a deadline is missed), how does the team respond?", options: opts(
    ["clear", "A clear process finds the cause and fixes it"], ["case", "Case by case"], ["depends", "Depends on who is involved"], ["reactive", "Mostly reactive: the cause remains"]) },
  { id: "R.Ops.2", section: 2, os: "operations", kind: "choice", text: "If you and your senior people were unreachable for 30 days, what would you find on return?", options: opts(
    ["ran_well", "It ran well"], ["slipped", "Mostly fine, a few important things slipped"], ["problems", "Meaningful problems needing leadership to resolve"], ["hard", "Hard to imagine: leadership is woven into too much"]) },
  { id: "R.Ops.3", section: 2, os: "operations", kind: "choice", text: "How does leadership usually learn that something went wrong?", options: opts(
    ["team", "A team member flags it"], ["customer", "A customer tells us first"], ["notices", "Leadership notices it reviewing something"], ["significant", "It is already a significant problem by then"]) },
  { id: "R.Growth.1", section: 2, os: "growth", kind: "choice", text: "How often does a real opportunity fail to convert because something broke down on your side?", options: opts(
    ["rarely", "Rarely"], ["occasionally", "Occasionally"], ["regularly", "Regularly"], ["unknown", "We do not have the visibility to know"]) },
  { id: "R.Growth.2", section: 2, os: "growth", kind: "choice", text: "How much new revenue comes in without depending on a few people's relationships?", options: opts(
    ["most", "Most of it"], ["some", "Some"], ["little", "Little"], ["almost_none", "Almost none"]) },
  { id: "R.Growth.3", section: 2, os: "growth", kind: "choice", text: "What is the most common reason you lose or fail to convert customers?", options: opts(
    ["price", "Price"], ["speed", "Speed"], ["awareness", "Awareness"], ["follow_through", "Follow-through"], ["unknown", "We do not know why"]) },
  { id: "R.Strat.1", section: 2, os: "strategy", kind: "choice", text: "How clear are the one to three year goals, and can the current structure deliver them?", options: opts(
    ["clear_can", "Clear, and the structure can"], ["clear_may_not", "Clear, but the structure may not keep up"], ["not_specific", "Not specific enough to drive decisions"], ["shorter", "We run on shorter time frames"]) },
  { id: "R.Strat.2", section: 2, os: "strategy", kind: "choice", text: "If the company ran exactly as it does today for three years, where would it be against the vision you described?", options: opts(
    ["closer", "Closer"], ["about", "About where it is"], ["further", "Further behind"], ["burnout", "Someone would burn out or make a major change first"]) },
  { id: "R.Strat.3", section: 2, os: "strategy", kind: "choice", text: "What share of the week's decisions need leadership's direct approval?", options: opts(
    ["u25", "Under 25%"], ["25_50", "25 to 50%"], ["51_75", "51 to 75%"], ["o75", "Over 75%"]) },
  { id: "R.Plat.1", section: 2, os: "platform", kind: "choice", text: "How many places does a customer's full history live (orders, invoices, messages, job records)?", options: opts(
    ["one", "One"], ["two_three", "Two or three"], ["four_plus", "Four or more"], ["cannot", "We could not assemble it reliably"]) },
  { id: "R.Plat.2", section: 2, os: "platform", kind: "choice", text: "How many hours a week does a typical team member spend re-entering, copying, or reconciling information?", options: opts(
    ["u1", "Under 1"], ["1_3", "1 to 3"], ["4_8", "4 to 8"], ["o8", "Over 8"]) },
  { id: "R.Urgency", section: 2, kind: "choice", text: "Given everything you just reflected on, how urgent does this feel right now?", options: opts(
    ["critical", "Critical"], ["important", "Important, not yet urgent"], ["unsure", "Significant, but unsure of the right move"], ["understand", "I came to understand the picture"]) },

  // ---------------- Section 3: The numbers ----------------
  { id: "N.Rate", section: 3, kind: "number", min: 1, max: 100000, defaultValue: "150", text: "What is an hour of leadership time worth to the company?" },
  { id: "N.Leaders", section: 3, kind: "choice", text: "How many people are in leadership?", options: opts(["1", "1"], ["2_3", "2 to 3"], ["4_6", "4 to 6"], ["7p", "7 or more"]) },
  { id: "N.Managing", section: 3, kind: "choice", text: "Hours per week each leader spends on managing work a system or capable team member should handle", options: opts(
    ["u5", "Under 5"], ["5_10", "5 to 10"], ["11_20", "11 to 20"], ["o20", "Over 20"]) },
  { id: "N.Overhead", section: 3, kind: "choice", text: "Monthly overhead: costs that do not change with the work (rent, office salaries, insurance, vehicles, software)", options: [...MONEY_BANDS, { key: "not_sure", label: "Not sure" }] },
  { id: "N.Margin", section: 3, kind: "choice", text: "Gross margin: what is left of each sales dollar after the direct cost of the work", options: opts(
    ["u20", "Under 20%"], ["20_30", "20 to 30%"], ["31_40", "31 to 40%"], ["41_50", "41 to 50%"], ["o50", "Over 50%"], ["not_sure", "Not sure"]) },
  { id: "N.Miss", section: 3, kind: "choice", text: "Share of jobs, orders, or engagements that miss their target margin", options: opts(
    ["u10", "Under 10%"], ["10_25", "10 to 25%"], ["26_50", "26 to 50%"], ["o50", "Over 50%"], ["no_track", "We do not track margin per job"]) },
  { id: "N.MissBy", section: 3, kind: "choice", text: "When one misses, by how much, typically?", options: opts(
    ["u5", "Under 5 points"], ["5_10", "5 to 10 points"], ["11_20", "11 to 20 points"], ["o20", "Over 20 points"], ["not_sure", "Not sure"]) },
  { id: "N.Profit", section: 3, kind: "choice", text: "What net profit should the company earn, as a share of revenue?", options: opts(
    ["5", "5%"], ["10", "10%"], ["15", "15%"], ["20p", "20% or more"], ["none", "No target set"]) },
  { id: "N.Burden", section: 3, kind: "choice", text: "Average hourly cost of a team member, including payroll taxes, benefits, and insurance", options: opts(
    ["u25", "Under $25"], ["25_40", "$25 to $40"], ["41_60", "$41 to $60"], ["o60", "Over $60"], ["not_sure", "Not sure"]) },
  { id: "N.Ops.1", section: 3, os: "operations", kind: "choice", text: "Monthly payroll, all employees and regular contractors", options: MONEY_BANDS },
  { id: "N.Ops.2", section: 3, os: "operations", kind: "choice", text: "Share of paid team time that is genuinely productive", options: opts(["90p", "90% or more"], ["75_89", "75 to 89%"], ["60_74", "60 to 74%"], ["u60", "Under 60%"]) },
  { id: "N.Ops.3", section: 3, os: "operations", kind: "choice", text: "How often significant errors or rework happen", options: opts(["rarely", "Rarely"], ["monthly", "Once or twice a month"], ["weekly", "Weekly"], ["several_weekly", "Several times a week"]) },
  { id: "N.Ops.4", section: 3, os: "operations", kind: "choice", text: "Typical cost of one rework event", options: opts(["u500", "Under $500"], ["500_2k", "$500 to $2,000"], ["2k_5k", "$2,000 to $5,000"], ["o5k", "Over $5,000"]) },
  { id: "N.Growth.1", section: 3, os: "growth", kind: "number", min: 0, max: 10000, text: "Qualified opportunities lost each month to breakdowns on your side" },
  { id: "N.Growth.2", section: 3, os: "growth", kind: "choice", text: "Lifetime value of a typical customer", options: opts(["u5k", "Under $5K"], ["5k_15k", "$5K to $15K"], ["15k_50k", "$15K to $50K"], ["50k_150k", "$50K to $150K"], ["o150k", "Over $150K"]) },
  { id: "N.Growth.3", section: 3, os: "growth", kind: "choice", text: "Share of revenue from active outbound effort", options: opts(["u10", "Under 10%"], ["10_30", "10 to 30%"], ["31_60", "31 to 60%"], ["o60", "Over 60%"]) },
  { id: "N.Strat.1", section: 3, os: "strategy", kind: "choice", text: "Cash not working toward growth or infrastructure", options: opts(["u100k", "Under $100K"], ["100k_250k", "$100K to $250K"], ["250k_500k", "$250K to $500K"], ["500k_1m", "$500K to $1M"], ["o1m", "Over $1M"]) },
  { id: "N.Close", section: 3, kind: "text", optional: true, max: 280, text: "If the company recovered even half of what this brief shows, what would that change for you personally?" },
];

export type S2Answers = Record<string, string>;

/** Items shown for this respondent, in order, given the top two systems and the answers so far. */
export function activeS2(focus: OperatingSystem[], answers: S2Answers): S2Question[] {
  return S2_QUESTIONS.filter((q) => {
    if (q.os && !focus.includes(q.os)) return false;
    if (q.id === "N.MissBy" && answers["N.Miss"] === "no_track") return false;
    if (q.id === "N.Ops.4" && answers["N.Ops.3"] === "rarely") return false;
    return true;
  });
}

export const S2_SECTIONS: Record<1 | 2 | 3 | 4, { tracker: string; intro: string }> = {
  1: { tracker: "Step 1 of 4: Why", intro: "There are no right or wrong answers. These shape how your brief is written." },
  2: { tracker: "Step 2 of 4: The Reality Check", intro: "Now the company itself. The more honest the answers, the more useful the brief." },
  3: { tracker: "Step 3 of 4: The Numbers", intro: "Estimates are fine. \"Not sure\" is an answer too, and it tells us something." },
  4: { tracker: "Step 4 of 4: Your Picture", intro: "Here is the start of your picture. Your full brief is one click away." },
};

/** Returns the first invalid item ID, or null when every shown item is answered validly. */
export function invalidS2(focus: OperatingSystem[], answers: S2Answers): string | null {
  for (const q of activeS2(focus, answers)) {
    const v = (answers[q.id] ?? "").trim();
    if (q.kind === "choice") {
      if (!q.options!.some((o) => o.key === v)) return q.id;
    } else if (q.kind === "number") {
      const n = Number(v);
      if (v === "" || !Number.isFinite(n) || n < (q.min ?? 0) || n > (q.max ?? Infinity)) return q.id;
    } else {
      if (!v && q.optional) continue;
      if (v.length < (q.min ?? 0) || v.length > (q.max ?? Infinity)) return q.id;
    }
  }
  return null;
}
