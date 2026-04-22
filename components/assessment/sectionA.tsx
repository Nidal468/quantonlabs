// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Section A: Structural Qualifiers
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type {
  RevenueBand,
  TeamSize,
  IntegrationCategory,
  SectionA,
} from "@/lib/stage1";

// ============================================================
// QUESTION DATA
// ============================================================

const REVENUE_OPTIONS: { value: RevenueBand; label: string }[] = [
  { value: "under_1m", label: "Under $1M" },
  { value: "1m_3m", label: "$1M to $3M" },
  { value: "3m_8m", label: "$3M to $8M" },
  { value: "8m_15m", label: "$8M to $15M" },
  { value: "15m_20m", label: "$15M to $20M" },
  { value: "over_20m", label: "Over $20M" },
];

const TEAM_OPTIONS: { value: TeamSize; label: string }[] = [
  { value: "solo", label: "Just me (solo operator)" },
  { value: "2_5", label: "2 to 5" },
  { value: "6_15", label: "6 to 15" },
  { value: "16_30", label: "16 to 30" },
  { value: "31_50", label: "31 to 50" },
  { value: "over_50", label: "Over 50" },
];

const CATEGORY_OPTIONS: {
  value: IntegrationCategory;
  label: string;
}[] = [
  { value: "core_data_systems", label: "CRM or pipeline tracking" },
  { value: "financial_systems", label: "Accounting, bookkeeping, or payroll" },
  { value: "communication_channels", label: "Email, SMS, or inbound messaging" },
  {
    value: "content_and_digital_presence",
    label: "Website, social channels, or content publishing",
  },
  {
    value: "scheduling_and_workflow",
    label: "Calendar, booking, or task management",
  },
  {
    value: "commerce_and_transactions",
    label: "E-commerce, point of sale, or order management",
  },
  { value: "people_and_compliance", label: "Hiring, onboarding, or certification tracking" },
  {
    value: "external_data_and_intelligence",
    label: "Industry data, supplier feeds, or market intelligence",
  },
];

// ============================================================
// COMPONENT
// ============================================================

interface SectionAProps {
  initialValue?: Partial<SectionA>;
  onComplete: (sectionA: SectionA) => void;
}

export default function SectionAComponent({
  initialValue,
  onComplete,
}: SectionAProps) {
  const [revenue, setRevenue] = useState<RevenueBand | null>(
    initialValue?.revenue ?? null
  );
  const [teamSize, setTeamSize] = useState<TeamSize | null>(
    initialValue?.team_size ?? null
  );
  const [categories, setCategories] = useState<IntegrationCategory[]>(
    initialValue?.operational_surface ?? []
  );

  const canProceed = revenue !== null && teamSize !== null && categories.length > 0;

  const toggleCategory = (cat: IntegrationCategory) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = () => {
    if (!canProceed || !revenue || !teamSize) return;
    onComplete({
      revenue,
      team_size: teamSize,
      operational_surface: categories,
    });
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
          Section A of 4
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Structural Qualifiers
        </h1>
        <p className="text-lg text-gray-600">
          Three quick questions to establish qualification status and the
          operational surface of your business.
        </p>
      </motion.div>

      {/* A1 — Revenue */}
      <QuestionBlock
        number="A1"
        label="What is your company's current annual revenue?"
        delay={0.1}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {REVENUE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              label={opt.label}
              selected={revenue === opt.value}
              onClick={() => setRevenue(opt.value)}
            />
          ))}
        </div>
      </QuestionBlock>

      {/* A2 — Team Size */}
      <QuestionBlock
        number="A2"
        label="How many people are on your team, including you?"
        delay={0.2}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TEAM_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              label={opt.label}
              selected={teamSize === opt.value}
              onClick={() => setTeamSize(opt.value)}
            />
          ))}
        </div>
      </QuestionBlock>

      {/* A3 — Operational Surface */}
      <QuestionBlock
        number="A3"
        label="Which of the following are active parts of your operation today?"
        sublabel="Select all that apply"
        delay={0.3}
      >
        <div className="grid grid-cols-1 gap-3">
          {CATEGORY_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              label={opt.label}
              selected={categories.includes(opt.value)}
              onClick={() => toggleCategory(opt.value)}
              multi
            />
          ))}
        </div>
      </QuestionBlock>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex justify-end mt-12"
      >
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
            canProceed
              ? "bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to Section B
        </button>
      </motion.div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

interface QuestionBlockProps {
  number: string;
  label: string;
  sublabel?: string;
  delay: number;
  children: React.ReactNode;
}

function QuestionBlock({
  number,
  label,
  sublabel,
  delay,
  children,
}: QuestionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="mb-10"
    >
      <div className="mb-5">
        <span className="text-xs font-semibold tracking-wide uppercase text-[#4655EB] mr-2">
          {number}
        </span>
        <span className="text-lg font-semibold text-gray-800">{label}</span>
        {sublabel && (
          <p className="text-sm text-gray-500 mt-1">{sublabel}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

function OptionCard({ label, selected, onClick, multi }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left px-5 py-4 rounded-lg border-2 transition-all ${
        selected
          ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        {multi ? (
          <span
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
              selected
                ? "border-[#4655EB] bg-[#4655EB]"
                : "border-gray-300 bg-white"
            }`}
          >
            {selected && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
        ) : (
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
              selected ? "border-[#4655EB]" : "border-gray-300"
            }`}
          >
            {selected && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#4655EB]" />
            )}
          </span>
        )}
      </div>
    </button>
  );
}