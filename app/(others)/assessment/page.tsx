// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Wizard Orchestrator
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import SectionAComponent from "@/components/assessment/sectionA";
import SectionBComponent from "@/components/assessment/sectionB";
import SectionCComponent from "@/components/assessment/sectionC";
import SectionDComponent from "@/components/assessment/sectionD";
import ResultsComponent from "@/components/assessment/results";

import type {
  AssessmentSubmission,
  ScoredPayload,
  SectionA,
  SectionB,
  SectionC,
  SectionD,
} from "@/lib/stage1";

// ============================================================
// TYPES
// ============================================================

type WizardStep = "a" | "b" | "c" | "d" | "results";

interface ApiResponse {
  submission_id: string;
  report_url: string;
  pdf_url: string;
  scored: ScoredPayload;
}

// ============================================================
// COMPONENT
// ============================================================

export default function AssessmentPage() {
  const [step, setStep] = useState<WizardStep>("a");

  const [sectionA, setSectionA] = useState<SectionA | null>(null);
  const [sectionB, setSectionB] = useState<SectionB | null>(null);
  const [sectionC, setSectionC] = useState<SectionC | null>(null);
  const [sectionD, setSectionD] = useState<SectionD | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const handleSectionAComplete = (data: SectionA) => {
    setSectionA(data);
    setStep("b");
    scrollToTop();
  };

  const handleSectionBComplete = (data: SectionB) => {
    const normalized = { ...data };
    setSectionB(normalized);
    setStep("c");
    scrollToTop();
  };

  const handleSectionCComplete = (data: SectionC) => {
    setSectionC(data);
    setStep("d");
    scrollToTop();
  };

  const handleSectionDComplete = async (data: SectionD) => {
    setSectionD(data);
    await submitAssessment(data);
  };

  const handleBackFromB = () => { setStep("a"); scrollToTop(); };
  const handleBackFromC = () => { setStep("b"); scrollToTop(); };
  const handleBackFromD = () => { setStep("c"); scrollToTop(); };

  const submitAssessment = async (dData: SectionD) => {
    if (!sectionA || !sectionB || !sectionC) {
      setSubmitError("Missing section data. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload: AssessmentSubmission = {
      section_a: sectionA,
      section_b: sectionB,
      section_c: sectionC,
      section_d: dData,
    };

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error ?? `Submission failed (${response.status})`);
      }

      const data: ApiResponse = await response.json();
      setApiResponse(data);
      setStep("results");
      scrollToTop();
    } catch (err) {
      console.error("[Assessment submission]", err);
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const progress = computeProgress(step);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(70, 85, 235, 0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.3,
          }}
        />
      </div>

      <header className="relative z-10 w-full" style={{ background: "#041227" }}>
        <div
          style={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
          }}
        />
        <div className="flex items-center justify-between container mx-auto h-[66px] px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png"
              width={200}
              height={60}
              alt="Quanton Labs"
              priority
              style={{ width: "200px", height: "auto", mixBlendMode: "screen" }}
            />
          </Link>
          {step !== "results" && (
            <Link
              href="/"
              className="text-sm font-medium duration-200"
              style={{ color: "rgba(255,255,255,0.70)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)"; }}
            >
              Exit
            </Link>
          )}
        </div>
        {step !== "results" && (
          <div className="container mx-auto px-6 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full"
                  style={{ background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: "rgba(255,255,255,0.50)" }}>
                Section {stepLabel(step)} of 4
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 px-6 py-16 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {step === "a" && (
              <SectionAComponent
                initialValue={sectionA ?? undefined}
                onComplete={handleSectionAComplete}
              />
            )}
            {step === "b" && sectionA && (
              <SectionBComponent
                sectionA={sectionA}
                initialValue={sectionB ?? undefined}
                onComplete={handleSectionBComplete}
                onBack={handleBackFromB}
              />
            )}
            {step === "c" && sectionA && sectionB && (
              <SectionCComponent
                sectionA={sectionA}
                sectionB={sectionB}
                initialValue={sectionC ?? undefined}
                onComplete={handleSectionCComplete}
                onBack={handleBackFromC}
              />
            )}
            {step === "d" && (
              <SectionDComponent
                initialValue={sectionD ?? undefined}
                onComplete={handleSectionDComplete}
                onBack={handleBackFromD}
                isSubmitting={isSubmitting}
              />
            )}
            {step === "results" && apiResponse && sectionD && (
              <ResultsComponent
                scored={apiResponse.scored}
                reportUrl={apiResponse.report_url}
                pdfUrl={apiResponse.pdf_url}
                firstName={sectionD.first_name}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {submitError && step === "d" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-8 p-4 rounded-lg border-2 border-red-200 bg-red-50"
          >
            <p className="text-sm font-semibold text-red-800 mb-1">Submission failed</p>
            <p className="text-sm text-red-700">{submitError}</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================

function computeProgress(step: WizardStep): number {
  switch (step) {
    case "a": return 15;
    case "b": return 45;
    case "c": return 70;
    case "d": return 90;
    case "results": return 100;
  }
}

function stepLabel(step: WizardStep): string {
  switch (step) {
    case "a": return "A";
    case "b": return "B";
    case "c": return "C";
    case "d": return "D";
    default: return "";
  }
}