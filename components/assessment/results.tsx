// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Results Preview & Handoff
// Source: STRUCTURAL PATTERN REPORT TEMPLATE v1.0 Apr2026

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { OperatingSystem, ScoredPayload, SeverityTier } from "@/lib/stage1";

// ============================================================
// LOCAL LABEL MAPS
// ============================================================

const OS_LABELS: Record<OperatingSystem, string> = {
  strategy: "Strategy",
  platform: "Platform",
  operations: "Operations",
  growth: "Growth",
};

const TIER_LABELS: Record<SeverityTier, string> = {
  architected: "Architected",
  functional_gap: "Functional — Built on Effort",
  structural_gap: "Fragmented — Structural Drag",
  critical_gap: "Unstructured — Owner-Dependent",
};

const TIER_SHORT_DIAGNOSTIC: Record<OperatingSystem,Record<SeverityTier, string>> = {
  strategy: {
    architected: "Review cadence and metrics operate independently of any single person.",
    functional_gap: "Clarity exists, but it lives in your head rather than in a structured system.",
    structural_gap: "Review happens reactively. Performance data lives in pieces.",
    critical_gap: "No structured review, no defined metrics, no decision framework.",
  },
  platform: {
    architected: "Data moves between systems without manual reconciliation.",
    functional_gap: "Core platforms are in place but the connective tissue is human effort.",
    structural_gap: "Data is trapped where it sits. Platforms operate in isolation.",
    critical_gap: "Spreadsheets, email threads, and memory hold the business together.",
  },
  operations: {
    architected: "Documented processes, clear ownership, consistent execution.",
    functional_gap: "Work gets done, but consistency depends on who is doing it.",
    structural_gap: "Quality control is reactive. Execution is improvised within loose boundaries.",
    critical_gap: "No documented process layer. Every decision routes through you.",
  },
  growth: {
    architected: "Designed channels, documented sales motion, retention on system.",
    functional_gap: "Revenue happens because you drive it personally. You are the engine.",
    structural_gap: "Momentum does not compound. Handoffs between stages leak.",
    critical_gap: "No defined growth motion. Revenue comes from your network and effort.",
  }
};

// ============================================================
// COMPONENT
// ============================================================

interface ResultsProps {
  scored: ScoredPayload;
  reportUrl: string;
  pdfUrl: string;
  firstName: string;
}

export default function ResultsComponent({
  scored,
  reportUrl,
  pdfUrl,
  firstName,
}: ResultsProps) {
  const topOS = scored.top_os;
  const topTier = scored.scores[topOS].tier;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] mb-6">
          <svg
            className="w-8 h-8 text-white"
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
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Your Structural Intelligence Report is ready, {firstName}.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The full report walks through each operating system in detail and outlines what the structural gaps mean for your business.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-10 mb-8 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">Severity Map</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your four operating systems, ranked from most to least structural gap.
        </p>

        <div className="space-y-5">
          {scored.ranked_os.map((os, idx) => (
            <SeverityRow
              key={os}
              os={os}
              tier={scored.scores[os].tier}
              dots={scored.scores[os].dots}
              delay={0.2 + idx * 0.08}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-[#4655EB]/5 via-white to-[#8B37EA]/5 border-2 border-[#4655EB]/20 rounded-2xl p-8 md:p-10 mb-10"
      >
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          Primary Focus Area
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {OS_LABELS[topOS]} System — {TIER_LABELS[topTier]}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {TIER_SHORT_DIAGNOSTIC[topOS][topTier]} Your full report walks through
          what this pattern means for your business and what the path forward
          looks like.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        <Link
          href={reportUrl}
          className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20 transition-all text-center"
        >
          View Full Report
        </Link>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-gray-800 bg-white border-2 border-gray-800 hover:bg-gray-50 transition-all text-center"
          >
            Download PDF
          </a>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-sm text-gray-500 text-center mt-8"
      >
        A copy has also been sent to your inbox.
      </motion.p>
    </div>
  );
}

// ============================================================
// SEVERITY ROW
// ============================================================

interface SeverityRowProps {
  os: OperatingSystem;
  tier: SeverityTier;
  dots: 1 | 2 | 3 | 4 | 5;
  delay: number;
}

function SeverityRow({ os, tier, dots, delay }: SeverityRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4"
    >
      <div className="flex gap-1 pt-1.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i <= dots ? "bg-[#4655EB]" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-semibold text-gray-800">{OS_LABELS[os]}</span>
          <span className="text-sm text-gray-500">{TIER_LABELS[tier]}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {TIER_SHORT_DIAGNOSTIC[os][tier]}
        </p>
      </div>
    </motion.div>
  );
}