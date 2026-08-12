// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Section C: Priority Surfacing
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type {
  OperatingSystem,
  PriorityOption,
  SectionA,
  SectionB,
  SectionC,
} from "@/lib/stage1";
import { preliminaryRanking } from "@/lib/stage1";
import {
  C1_OS_PHRASING,
  C1_STANDARD_OPTIONS,
} from "@/lib/stage1/reportCopy";

// ============================================================
// COMPONENT
// ============================================================

interface SectionCProps {
  sectionA: SectionA;
  sectionB: SectionB;
  initialValue?: SectionC;
  onComplete: (sectionC: SectionC) => void;
  onBack: () => void;
}

export default function SectionCComponent({
  sectionA,
  sectionB,
  initialValue,
  onComplete,
  onBack,
}: SectionCProps) {
  // Preliminary scoring to determine C1 option labels
  const { top_os, second_os } = useMemo(
    () => preliminaryRanking(sectionA, sectionB),
    [sectionA, sectionB]
  );

  const [priorityOS, setPriorityOS] = useState<PriorityOption | null>(
    initialValue?.priority_os ?? null
  );
  const [outcomeText, setOutcomeText] = useState<string>(
    initialValue?.outcome_text ?? ""
  );

  const canProceed = priorityOS !== null;

  // Build the four option list: top OS phrasing, second OS phrasing,
  // then the two standard options
  const options = useMemo(
    () => buildPriorityOptions(top_os, second_os),
    [top_os, second_os]
  );

  const handleSubmit = () => {
    if (!canProceed || !priorityOS) return;
    const trimmed = outcomeText.trim();
    onComplete({
      priority_os: priorityOS,
      outcome_text: trimmed.length > 0 ? trimmed : null,
    });
  };

  const charCount = outcomeText.length;
  const charCountColor =
    charCount === 0
      ? "text-gray-400"
      : charCount < 20
      ? "text-gray-400"
      : "text-[#4655EB]";

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          Section C, 3 of 4
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Priority Surfacing
        </h1>
        <p className="text-lg text-gray-600">
          Two quick questions to calibrate your report to what you actually
          care about.
        </p>
      </motion.div>

      {/* C1 — Priority OS */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-12"
      >
        <div className="mb-5">
          <span className="text-xs font-semibold tracking-wide uppercase text-[#4655EB] mr-2">
            C1
          </span>
          <span className="text-lg font-semibold text-gray-800">
            Based on what you have just described, which of the following would
            create the most value if resolved first?
          </span>
          <p className="text-sm text-gray-500 mt-1">Select one</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPriorityOS(opt.value)}
              className={`text-left px-5 py-4 rounded-lg border-2 transition-all ${
                priorityOS === opt.value
                  ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    priorityOS === opt.value
                      ? "border-[#4655EB]"
                      : "border-gray-300"
                  }`}
                >
                  {priorityOS === opt.value && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4655EB]" />
                  )}
                </span>
                <span className="text-base">{opt.label}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* C2 — Outcome Framing */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-12"
      >
        <div className="mb-5">
          <span className="text-xs font-semibold tracking-wide uppercase text-[#4655EB] mr-2">
            C2
          </span>
          <span className="text-lg font-semibold text-gray-800">
            If that one thing were resolved, what would change for the business?
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Optional. Two or three sentences recommended.
          </p>
        </div>
        <div className="relative">
          <textarea
            value={outcomeText}
            onChange={(e) => setOutcomeText(e.target.value)}
            maxLength={1000}
            rows={5}
            placeholder="Your words here. The more specific, the better the report."
            className="w-full px-5 py-4 rounded-lg border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-[#4655EB] focus:outline-none resize-none transition-all"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              We use this directly in your report and in our notes before a
              conversation.
            </span>
            <span className={`text-xs font-medium ${charCountColor}`}>
              {charCount}/1000
            </span>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex justify-between items-center mt-12"
      >
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
            canProceed
              ? "bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to Section D
        </button>
      </motion.div>
    </div>
  );
}

// ============================================================
// OPTION BUILDER
// ============================================================

interface PriorityOptionDisplay {
  value: PriorityOption;
  label: string;
}

function buildPriorityOptions(
  topOS: OperatingSystem,
  secondOS: OperatingSystem
): PriorityOptionDisplay[] {
  // Order per Question Bank spec: top OS phrased, second OS phrased,
  // then the two standard options
  const osToPriorityValue = (os: OperatingSystem): PriorityOption => {
    switch (os) {
      case "strategy":
        return "strategy_phrased";
      case "platform":
        return "platform_phrased";
      case "operations":
        return "operations_phrased";
      case "growth":
        return "growth_phrased";
    }
  };

  return [
    {
      value: osToPriorityValue(topOS),
      label: C1_OS_PHRASING[topOS],
    },
    {
      value: osToPriorityValue(secondOS),
      label: C1_OS_PHRASING[secondOS],
    },
    {
      value: "owner_capacity",
      label: C1_STANDARD_OPTIONS.owner_capacity,
    },
    {
      value: "visibility_reporting",
      label: C1_STANDARD_OPTIONS.visibility_reporting,
    },
  ];
}