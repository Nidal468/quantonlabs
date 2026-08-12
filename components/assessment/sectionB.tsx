// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Section B: Symptom Diagnostic
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import type { SectionA, SectionB, QuestionWeight } from "@/lib/stage1";
import { getActiveQuestions } from "@/lib/stage1";

// ============================================================
// QUESTION TEXT LIBRARY
// ============================================================
// Keyed by question ID. Each entry has the question prompt and
// four weighted answer options in weight order (0, 1, 2, 3).

interface QuestionContent {
  prompt: string;
  options: [string, string, string, string]; // weight 0, 1, 2, 3
}

const QUESTION_CONTENT: Record<string, QuestionContent> = {
  // B.Core
  "B.Core.1": {
    prompt:
      "When a qualified lead arrives outside business hours, what happens first?",
    options: [
      "Immediate automated response with qualifying questions, followed by human touch within 24 hours",
      "Automated acknowledgment, but follow-up depends on who is available",
      "Nothing until someone sees it the next morning",
      "No consistent pattern, varies by who catches it first",
    ],
  },
  "B.Core.2": {
    prompt:
      "If I asked you right now which operational area is losing the most money, how confident would you be in your answer?",
    options: [
      "Very confident, I see it on a dashboard or report every week",
      "Confident, but I would need to pull data from multiple places to prove it",
      "Somewhat confident, mostly based on intuition and sporadic reports",
      "Not confident, I would have to guess",
    ],
  },
  "B.Core.3": {
    prompt:
      "How often are you personally required to approve, unblock, or execute operational tasks that someone else could handle if structure existed?",
    options: [
      "Rarely, my team operates within documented boundaries",
      "Weekly, a handful of items come to me that probably should not",
      "Daily, I am the clearing house for decisions across the business",
      "Constantly, nothing moves without me",
    ],
  },
  "B.Core.4": {
    prompt:
      "If a key team member left tomorrow, how easily could someone else step in and execute their work?",
    options: [
      "Easily, documented procedures exist for every core function",
      "With some effort, documentation exists but is inconsistent",
      "With significant disruption, most knowledge lives in people's heads",
      "We would lose months of productivity, almost nothing is documented",
    ],
  },
  "B.Core.5": {
    prompt: "How connected are the platforms your business runs on?",
    options: [
      "Our platforms talk to each other, data moves without manual intervention",
      "Some integrations exist, but critical data still gets copied manually",
      "Platforms are mostly disconnected, we export, reconcile, and re-enter often",
      "Everything lives in separate places, spreadsheets tie it together",
    ],
  },
  "B.Core.6": {
    prompt: "Which best describes how AI is currently being used in your business?",
    options: [
      "We have structured AI workflows operating within defined boundaries",
      "Individual team members use AI tools, but nothing is coordinated",
      "I use ChatGPT occasionally, the team mostly does not",
      "We are not using AI in any meaningful way",
    ],
  },
  "B.Core.7": {
    prompt:
      "When you plan a new marketing push or growth initiative, what typically happens?",
    options: [
      "We execute against a documented plan with tracked metrics and defined owners",
      "We launch, but momentum fades because no one is accountable for sustaining it",
      "Initiatives start with energy and die when I stop pushing them",
      "We talk about initiatives more than we run them",
    ],
  },
  "B.Core.8": {
    prompt:
      "How often do you review strategic performance against defined KPIs as a structured activity, not a status check?",
    options: [
      "Monthly, with a defined format and documented outcomes",
      "Quarterly, informally",
      "When something goes wrong",
      "Rarely or never in a structured way",
    ],
  },

  // B.CoreData
  "B.CoreData.1": {
    prompt:
      "At any given moment, how clearly can you see the state of your sales pipeline?",
    options: [
      "I can see it on a dashboard, updated in real time",
      "I can see it in the CRM, but I have to log in and interpret it",
      "I have to ask someone for an update",
      "The pipeline lives in spreadsheets and people's heads",
    ],
  },
  "B.CoreData.2": {
    prompt: "When you look at a customer record, how complete and current is it?",
    options: [
      "Complete and current, every interaction flows in automatically",
      "Mostly complete, team members log things when they remember",
      "Partial, some data is there, some is in email or someone's notes",
      "Thin, the record is a name and contact, if that",
    ],
  },
  "B.CoreData.3": {
    prompt: "How is a new customer proposal or quote generated in your business?",
    options: [
      "From a structured template with consistent pricing logic and version control",
      "From a template, but with heavy manual customization each time",
      "Built from scratch each time, based on the salesperson's judgment",
      "I write most of them myself",
    ],
  },

  // B.Financial
  "B.Financial.1": {
    prompt:
      "When someone asks what revenue will look like in 90 days, how do you answer?",
    options: [
      "From a model that ties pipeline and recognized revenue to expected timing",
      "From current run rate, adjusted by my judgment",
      "Rough estimate based on recent performance",
      "Honestly, I would guess",
    ],
  },
  "B.Financial.2": {
    prompt:
      "When a cost changes, how quickly can you see the margin impact?",
    options: [
      "Within days, cost changes flow through our financial reporting automatically",
      "Within a month, we reconcile at close",
      "Within a quarter, when we review financials",
      "We realize it when margin has already slipped",
    ],
  },

  // B.Communication
  "B.Communication.1": {
    prompt:
      "When a customer sends an inbound question or complaint, what determines how quickly it is resolved?",
    options: [
      "Defined routing and SLA, resolution path is documented by inquiry type",
      "Whoever sees it first handles it, usually well",
      "It depends on who is available and what else is on fire",
      "Things fall through the cracks more often than I would like to admit",
    ],
  },
  "B.Communication.2": {
    prompt:
      "How is ongoing communication with customers managed between transaction or service events?",
    options: [
      "Structured cadence with defined touchpoints and documented follow-ups",
      "Regular check-ins scheduled on the calendar",
      "Ad hoc, we respond when customers reach out",
      "Inconsistent, some customers get attention, others slip",
    ],
  },

  // B.Content
  "B.Content.1": {
    prompt: "How is content produced and published in your business?",
    options: [
      "A documented editorial calendar with defined ownership and approval",
      "Someone plans and publishes, but cadence is inconsistent",
      "We post when we remember or when something comes up",
      "We know we should, but nothing consistent is happening",
    ],
  },
  "B.Content.2": {
    prompt:
      "When a new customer or lead comes in, do you know which channel drove them?",
    options: [
      "Attribution is tracked across channels with multi-touch visibility",
      "First-touch attribution is tracked, but not the full journey",
      "We capture source sometimes, not consistently",
      "We do not track channel attribution",
    ],
  },

  // B.Scheduling
  "B.Scheduling.1": {
    prompt:
      "When a delivery milestone or internal deadline is missed or at risk, how do you find out?",
    options: [
      "A system flags the risk before the deadline",
      "A project manager or team lead catches it and escalates",
      "The customer or someone affected tells us",
      "We find out after the fact when something breaks",
    ],
  },
  "B.Scheduling.2": {
    prompt: "When a new customer signs, what happens next?",
    options: [
      "A documented onboarding sequence executes with clear milestones",
      "A team member runs through a checklist manually",
      "Onboarding happens, but the experience varies by who handles it",
      "Onboarding is reactive, we respond to customer questions as they arise",
    ],
  },

  // B.Commerce
  "B.Commerce.1": {
    prompt:
      "How do you know what your current inventory position is across all products?",
    options: [
      "Real-time inventory system updated automatically with every transaction",
      "Inventory system that requires periodic manual reconciliation",
      "Spreadsheets updated by hand",
      "We count when we have to and hope we are close",
    ],
  },
  "B.Commerce.2": {
    prompt:
      "When an order comes in, how does it move from received to shipped or delivered?",
    options: [
      "Documented fulfillment workflow with system-enforced status transitions",
      "Team follows a playbook, mostly consistently",
      "Orders get processed, but errors happen often enough to matter",
      "Every order feels like its own puzzle",
    ],
  },
  "B.Commerce.3": {
    prompt: "When stock runs low, what triggers the reorder?",
    options: [
      "Automated, the system triggers a reorder at a defined threshold",
      "A team member sees a report and decides",
      "Someone notices shelves are empty",
      "A customer complains or an order cannot be filled",
    ],
  },

  // B.People
  "B.People.1": {
    prompt:
      "When you hire someone new, how does their first 30 days unfold?",
    options: [
      "Structured onboarding sequence with clear milestones and ownership",
      "A loose onboarding plan, executed by their manager",
      "They are shown the ropes informally as they go",
      "They figure it out",
    ],
  },
  "B.People.2": {
    prompt:
      "How do you track team certifications, training, or compliance obligations?",
    options: [
      "Tracked in a system with automated renewal alerts",
      "Tracked in a spreadsheet someone owns",
      "We track it when we remember to, or when an audit is coming",
      "We do not track it systematically",
    ],
  },

  // B.External
  "B.External.1": {
    prompt:
      "How is external data used in your decision-making?",
    options: [
      "Integrated into dashboards and reviewed on a regular cadence",
      "Pulled manually when a specific question comes up",
      "Someone mentions it occasionally in meetings",
      "We do not actively use external data",
    ],
  },

  // B.Scale
  "B.Scale.1": {
    prompt:
      "When you delegate a complex task to a senior team member, what happens?",
    options: [
      "They execute within clear boundaries and report outcomes",
      "They execute, but check in often for direction",
      "I end up involved more than I planned to be",
      "Delegation usually ends with me doing it anyway",
    ],
  },
  "B.Scale.2": {
    prompt:
      "When work needs to move between departments or functions, what happens?",
    options: [
      "Defined handoffs with shared systems and status visibility",
      "Handoffs happen, but context is lost along the way",
      "Coordination depends on the individuals involved",
      "Silos are real, functions operate mostly independently",
    ],
  },
  "B.Scale.3": {
    prompt:
      "For decisions above a certain threshold, how are approvals routed?",
    options: [
      "Clear approval matrix with defined thresholds and documented owners",
      "Approval thresholds exist, but routing is informal",
      "People escalate to me or another leader when unsure",
      "Approval decisions are made on a case-by-case basis",
    ],
  },
  "B.Scale.4": {
    prompt:
      "Does your business carry compliance, regulatory, or certification obligations?",
    options: [
      "Yes, and we have structured governance with audit trails and scheduled reviews",
      "Yes, and we manage it, but documentation is uneven",
      "Yes, and we are behind where we should be", // weight 2 position, but actual weight 3 per scoring
      "No compliance obligations apply to us",
    ],
  },
};
// ============================================================
// B.Scale.4 WEIGHT REMAP
// ============================================================
// Per ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026, B.Scale.4 has
// a non-linear weight structure. UI index → semantic weight:
//   index 0 ("structured governance")     → weight 0
//   index 1 ("uneven documentation")      → weight 1
//   index 2 ("behind where we should be") → weight 3
//   index 3 ("no obligations")            → weight 0
// All other questions use weight === index.

function remapScale4Weight(uiIndex: QuestionWeight): QuestionWeight {
  switch (uiIndex) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 0;
  }
}

// ============================================================
// COMPONENT
// ============================================================

interface SectionBProps {
  sectionA: SectionA;
  initialValue?: SectionB;
  onComplete: (sectionB: SectionB) => void;
  onBack: () => void;
}

export default function SectionBComponent({
  sectionA,
  initialValue,
  onComplete,
  onBack,
}: SectionBProps) {
  // Compute active questions from Section A responses
  const activeQuestions = useMemo(
    () => getActiveQuestions(sectionA.team_size, sectionA.operational_surface),
    [sectionA.team_size, sectionA.operational_surface]
  );

  const [responses, setResponses] = useState<SectionB>(initialValue ?? {});

  const answeredCount = Object.keys(responses).length;
  const totalCount = activeQuestions.length;
  const allAnswered = answeredCount === totalCount;

  const setResponse = (questionId: string, weight: QuestionWeight) => {
    // B.Scale.4 weight override: the UI presents options in narrative
    // order (best → worst → not applicable), but the Question Bank
    // v1.1 spec assigns weight 3 to "behind where we should be" (index 2)
    // and weight 0 to "no compliance obligations" (index 3).
    const semanticWeight =
      questionId === "B.Scale.4"
        ? remapScale4Weight(weight)
        : weight;
    setResponses((prev) => ({ ...prev, [questionId]: semanticWeight }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    onComplete(responses);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          Section B, 2 of 4
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Symptom Diagnostic
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Questions scoped to your operational surface. There are no right or
          wrong answers. The honest one is the useful one.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2B60EB] to-[#8B37EA]"
              initial={{ width: 0 }}
              animate={{ width: `${(answeredCount / totalCount) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
            {answeredCount} of {totalCount}
          </span>
        </div>
      </motion.div>

      {/* Questions */}
      <div className="space-y-10">
        {activeQuestions.map((q, idx) => {
          const content = QUESTION_CONTENT[q.id];
          if (!content) return null;

          return (
            <QuestionBlock
              key={q.id}
              questionId={q.id}
              prompt={content.prompt}
              options={content.options}
              selected={responses[q.id] ?? null}
              onSelect={(weight) => setResponse(q.id, weight)}
              delay={Math.min(idx * 0.03, 0.3)}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-between items-center mt-16"
      >
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
            allAnswered
              ? "bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to Section C
        </button>
      </motion.div>
    </div>
  );
}

// ============================================================
// QUESTION BLOCK
// ============================================================

interface QuestionBlockProps {
  questionId: string;
  prompt: string;
  options: [string, string, string, string];
  selected: QuestionWeight | null;
  onSelect: (weight: QuestionWeight) => void;
  delay: number;
}

function QuestionBlock({
  questionId,
  prompt,
  options,
  selected,
  onSelect,
  delay,
}: QuestionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
<div className="mb-4">
  <span className="text-lg font-semibold text-gray-800">{prompt}</span>
</div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((optText, idx) => {
          const weight = idx as QuestionWeight;
          const isSelected = selected === weight;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(weight)}
              className={`text-left px-5 py-3.5 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "border-[#4655EB]" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4655EB]" />
                  )}
                </span>
                <span className="text-sm md:text-base">{optText}</span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}