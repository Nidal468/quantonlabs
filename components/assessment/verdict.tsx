// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Quick Diagnostic - Verdict Screen
//
// Renders after the eight B.Core questions, before any email is requested.

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  buildOpening,
  buildScaleLine,
  buildSecondSignal,
  DOMAIN_LABEL,
  TIER_LABEL,
  WEAKEST_DOMAIN_COPY,
  NO_GAP_COPY,
  GATE_REASON,
  CALENDLY_URL,
  SKIP_LINK_LABEL,
} from "@/lib/stage1";
import type {
  OSScore,
  OperatingSystem,
  SectionA,
  SectionB,
  SeverityTier,
} from "@/lib/stage1";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

// Severity increases from architected to critical, so the colour degrades
// green -> yellow -> orange -> red. Lime read as positive and had to go.
const TIER_COLOR: Record<SeverityTier, string> = {
  architected: "#22C55E",
  functional_gap: "#EAB308",
  structural_gap: "#F97316",
  critical_gap: "#EF4444",
};

export default function Verdict({
  sectionA,
  sectionB,
  scores,
  rankedOs,
  onContinue,
}: {
  sectionA: SectionA;
  sectionB: SectionB;
  scores: Record<OperatingSystem, OSScore>;
  rankedOs: OperatingSystem[];
  onContinue: () => void;
}) {
  const avgSeverity =
    (scores.strategy.normalized +
      scores.platform.normalized +
      scores.operations.normalized +
      scores.growth.normalized) /
    4;

  const opening = buildOpening(sectionA, sectionB, avgSeverity);
  const scaleLine = buildScaleLine(sectionA, avgSeverity);
  const secondSignal = buildSecondSignal(sectionA, sectionB);
  const weakest = rankedOs[0];
  const nothingWeak = scores[weakest].tier === "architected";

  return (
    <div className="max-w-3xl mx-auto" style={{ fontFamily: "Manrope, sans-serif" }}>
      {/* Opening */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "18px",
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Your structural read
        </div>

        <p
          style={{
            fontSize: "clamp(20px, 2.6vw, 26px)",
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#1F2937",
            marginBottom: "16px",
          }}
        >
          {opening.observation}
        </p>

        <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#374151", marginBottom: "44px" }}>
          {opening.implication}
        </p>
      </motion.div>

      {/* Four-domain readout. Showing all four proves an instrument was used. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          padding: "26px 24px",
          marginBottom: "40px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "1px solid #F1F4F9",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#9CA3AF",
          }}
        >
          <span>Domain</span>
          <span>Structure holding</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {rankedOs.map((os, i) => {
            const score = scores[os];
            const color = TIER_COLOR[score.tier];
            return (
              <div key={os}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "7px",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#1F2937" }}>
                    {DOMAIN_LABEL[os]}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color }}>
                    {TIER_LABEL[score.tier]}
                  </span>
                </div>
                {/* Scoring is inverted internally: a higher normalized value
                    means a larger gap. The bar shows the inverse, so a longer
                    bar reads as more structure holding, which matches the
                    colour. */}
                <div
                  style={{
                    height: "8px",
                    borderRadius: "6px",
                    background: "#F1F4F9",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(100 - score.normalized, 3)}%` }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: "easeOut" }}
                    style={{ height: "100%", background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Weakest domain */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
        style={{
          fontSize: "17px",
          lineHeight: 1.8,
          color: "#374151",
          marginBottom: secondSignal ? "28px" : "44px",
          paddingLeft: "20px",
          borderLeft: `3px solid ${TIER_COLOR[scores[weakest].tier]}`,
        }}
      >
        {nothingWeak ? NO_GAP_COPY : WEAKEST_DOMAIN_COPY[weakest]}
      </motion.p>

      {/* What the scale means for what happens next. Revenue drives every
          routing decision but never appeared on this screen. */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28, ease: "easeOut" }}
        style={{
          fontSize: "16px",
          lineHeight: 1.8,
          color: "#4B5563",
          marginBottom: "28px",
        }}
      >
        {scaleLine}
      </motion.p>

      {/* Second signal, shown only when a flag fires */}
      {secondSignal && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#4B5563",
            marginBottom: "44px",
            padding: "20px 22px",
            background: "#F6F8FC",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
          }}
        >
          {secondSignal}
        </motion.p>
      )}

      {/* What this read does not tell you */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
        style={{ borderTop: "1px solid #E5E7EB", paddingTop: "36px" }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: "18px",
            lineHeight: 1.3,
          }}
        >
          What this read does not tell you
        </h2>

        {GATE_REASON.map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#374151",
              marginBottom: "18px",
            }}
          >
            {para}
          </p>
        ))}

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "28px" }}>
          <button
            onClick={onContinue}
            style={{
              background: GRADIENT,
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              padding: "15px 30px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              alignSelf: "flex-start",
            }}
          >
            Get the full report <ArrowRight size={17} aria-hidden="true" />
          </button>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#4655EB",
              textDecoration: "none",
            }}
          >
            {SKIP_LINK_LABEL}
          </a>
        </div>
      </motion.div>
    </div>
  );
}