// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Wizard Orchestrator

"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import type {
  OwnerProfile,
  Stage2Submission,
  Section2Responses,
  Section3Inputs,
  CostOfInaction,
  OperatingSystem,
} from "@/lib/stage2";
import {
  INFERENCE_QUESTIONS,
  VISION_QUESTION,
  SECTION2_QUESTIONS,
  getSection2Questions,
} from "@/lib/stage2";
import type { InferenceAnswers } from "@/lib/stage2";
import { buildOwnerProfile } from "@/lib/stage2";

// ============================================================
// TYPES
// ============================================================

type WizardStep =
  | "device_check"
  | "inference"
  | "vision"
  | "vision_followon"
  | "section2"
  | "section3_universal"
  | "section3_os"
  | "section4"
  | "complete";

interface Stage1Context {
  top_os: OperatingSystem;
  second_os: OperatingSystem;
  first_name: string;
  work_email: string;
}

interface ApiResponse {
  stage2_id: string;
  brief_url: string;
  brief_pdf_url: string;
  cost_of_inaction: CostOfInaction;
  owner_profile: OwnerProfile;
}

// ============================================================
// DEVICE CHECK
// ============================================================

function DeviceBlock() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleSend = () => {
    if (!email) return;
    const subject = encodeURIComponent("Your Quanton Labs Stage 2 Assessment Link");
    const body = encodeURIComponent(
      `Here is your Stage 2 assessment link:\n\n${currentUrl}\n\nThis experience is designed for a focused desktop or tablet session. Give yourself 15 uninterrupted minutes.`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-4">
          One moment
        </p>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          This experience is designed for a focused session on a tablet or larger screen.
        </h1>
        <p className="text-gray-600 mb-8">
          For the best results and the most useful brief, give yourself 15 uninterrupted minutes on a device that gives you space to think.
        </p>
        <div className="flex flex-col gap-3">
          {!sent ? (
            <>
              <input
                type="email"
                placeholder="Send this link to your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4655EB]"
              />
              <button
                onClick={handleSend}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA]"
              >
                Send to My Email
              </button>
            </>
          ) : (
            <p className="text-green-600 font-semibold">Link sent. Come back on a larger screen.</p>
          )}
          <a 
            href="https://calendly.com/quantonlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3 rounded-lg font-semibold text-[#4655EB] border-2 border-[#4655EB] hover:bg-[#4655EB]/5 transition-colors text-center"
          >
            Book a Call Instead
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Stage2Page() {
  const params = useParams();
  const submissionId = params.submissionId as string;

  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState<WizardStep>("inference");
  const [stage1Context, setStage1Context] = useState<Stage1Context | null>(null);
  const [isLoadingContext, setIsLoadingContext] = useState(false);

  // Section 1 state
  const [inferenceAnswers, setInferenceAnswers] = useState<Partial<InferenceAnswers>>({});
  const [visionAnswer, setVisionAnswer] = useState<number | null>(null);
  const [visionProximity, setVisionProximity] = useState<number | null>(null);
  const [visionOpenText, setVisionOpenText] = useState("");

  // Section 2 state
  const [section2, setSection2] = useState<Partial<Section2Responses>>({});

  // Section 3 state
  const [ownerHourlyRate, setOwnerHourlyRate] = useState<number>(150);
  const [ownerNonStrategicHours, setOwnerNonStrategicHours] = useState<number>(10);
  const [annualRevenueBand, setAnnualRevenueBand] = useState<string>("3m_5m");
  const [section3Os, setSection3Os] = useState<Partial<Section3Inputs>>({});
  const [recoveryImpactText, setRecoveryImpactText] = useState("");

  // Section 4 state
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Exit intent
  const [showExitOverlay, setShowExitOverlay] = useState(false);

  // ── Device check ──────────────────────────────────────────
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // ── Fetch Stage 1 context ─────────────────────────────────
  useEffect(() => {
    async function fetchContext() {
      try {
        const res = await fetch(`/api/assessment/stage2/context?id=${submissionId}`);
        if (res.ok) {
          const data = await res.json();
          setStage1Context(data);
        }
      } catch {
        // Non-fatal — proceed without context
      } finally {
        setIsLoadingContext(false);
      }
    }
    fetchContext();
  }, [submissionId]);

  // ── Exit intent detection ─────────────────────────────────
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
  if (
    e.clientY <= 0 &&
    e.relatedTarget === null &&
    step !== "complete"
  ) {
    setShowExitOverlay(true);
  }
};
document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [step]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ── Profile builder ───────────────────────────────────────
  const buildProfile = useCallback((): OwnerProfile | null => {
    const ia = inferenceAnswers;
    if (
      ia.iq1 === undefined || ia.iq2 === undefined || ia.iq3 === undefined ||
      ia.iq4 === undefined || ia.iq5 === undefined ||
      visionAnswer === null || visionProximity === null
    ) return null;

    return buildOwnerProfile({
      iq1: ia.iq1,
      iq2: ia.iq2,
      iq3: ia.iq3,
      iq4: ia.iq4,
      iq5: ia.iq5,
      vision: visionAnswer,
      vision_proximity: visionProximity,
      vision_open_text: visionOpenText,
    });
  }, [inferenceAnswers, visionAnswer, visionProximity, visionOpenText]);

  // ── Submit handler ────────────────────────────────────────
  const handleSubmit = async () => {
    const profile = buildProfile();
    if (!profile) return;

    const section3: Section3Inputs = {
      owner_hourly_rate: ownerHourlyRate,
      owner_non_strategic_hours_per_week: ownerNonStrategicHours,
      annual_revenue_band: annualRevenueBand as any,
      recovery_impact_text: recoveryImpactText,
      ...section3Os,
    };

    const submission: Stage2Submission = {
      submission_id: submissionId,
      owner_profile: profile,
      section2: section2 as Section2Responses,
      section3,
    };

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/assessment/stage2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission,
          top_os: stage1Context?.top_os ?? "operations",
          second_os: stage1Context?.second_os ?? "growth",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Submission failed (${res.status})`);
      }

      const data: ApiResponse = await res.json();
      setApiResponse(data);
      setStep("complete");
      scrollToTop();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isMobile) return <DeviceBlock />;

  const progress = computeProgress(step);
  const activeOs = stage1Context
    ? getSection2Questions(stage1Context.top_os, stage1Context.second_os)
    : [];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background grid */}
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

      {/* Header */}
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
          {step !== "complete" && (
            <button
              onClick={() => setShowExitOverlay(true)}
              className="text-sm font-medium duration-200"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              Exit
            </button>
          )}
        </div>
        {step !== "complete" && (
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
                {progressLabel(step)}
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="relative z-10 px-6 py-16 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {step === "inference" && (
              <InferenceSection
                answers={inferenceAnswers}
                onUpdate={(key, val) => setInferenceAnswers(prev => ({ ...prev, [key]: val }))}
                onComplete={() => { setStep("vision"); scrollToTop(); }}
              />
            )}

            {step === "vision" && (
              <VisionSection
                visionAnswer={visionAnswer}
                onSelect={(v) => setVisionAnswer(v)}
                onComplete={() => { setStep("vision_followon"); scrollToTop(); }}
                onBack={() => { setStep("inference"); scrollToTop(); }}
              />
            )}

            {step === "vision_followon" && (
              <VisionFollowOn
                visionProximity={visionProximity}
                visionOpenText={visionOpenText}
                onProximitySelect={(v) => setVisionProximity(v)}
                onTextChange={(t) => setVisionOpenText(t)}
                onComplete={() => { setStep("section2"); scrollToTop(); }}
                onBack={() => { setStep("vision"); scrollToTop(); }}
              />
            )}

            {step === "section2" && (
              <Section2
                questions={activeOs}
                responses={section2}
                onUpdate={(key, val) => setSection2(prev => ({ ...prev, [key]: val }))}
                onComplete={() => { setStep("section3_universal"); scrollToTop(); }}
                onBack={() => { setStep("vision_followon"); scrollToTop(); }}
              />
            )}

            {step === "section3_universal" && (
              <Section3Universal
                ownerHourlyRate={ownerHourlyRate}
                ownerNonStrategicHours={ownerNonStrategicHours}
                annualRevenueBand={annualRevenueBand}
                onRateChange={setOwnerHourlyRate}
                onHoursChange={setOwnerNonStrategicHours}
                onBandChange={setAnnualRevenueBand}
                onComplete={() => { setStep("section3_os"); scrollToTop(); }}
                onBack={() => { setStep("section2"); scrollToTop(); }}
              />
            )}

            {step === "section3_os" && (
              <Section3OS
                topOs={stage1Context?.top_os ?? "operations"}
                secondOs={stage1Context?.second_os ?? "growth"}
                inputs={section3Os}
                recoveryImpactText={recoveryImpactText}
                onUpdate={(key, val) => setSection3Os(prev => ({ ...prev, [key]: val }))}
                onTextChange={setRecoveryImpactText}
                onComplete={() => { setStep("section4"); scrollToTop(); }}
                onBack={() => { setStep("section3_universal"); scrollToTop(); }}
              />
            )}

            {step === "section4" && (
              <Section4
                ownerHourlyRate={ownerHourlyRate}
                ownerNonStrategicHours={ownerNonStrategicHours}
                section3Os={section3Os}
                visionAnswer={visionAnswer}
                decisionActivator={inferenceAnswers.iq5 ?? 2}
                riskStyle={inferenceAnswers.iq2 ?? 2}
                isSubmitting={isSubmitting}
                submitError={submitError}
                onSubmit={handleSubmit}
                onBack={() => { setStep("section3_os"); scrollToTop(); }}
              />
            )}

            {step === "complete" && apiResponse && (
              <CompleteScreen
                briefUrl={apiResponse.brief_url}
                briefPdfUrl={apiResponse.brief_pdf_url}
                costOfInaction={apiResponse.cost_of_inaction}
                firstName={stage1Context?.first_name}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Exit overlay */}
      <AnimatePresence>
        {showExitOverlay && (
          <ExitOverlay
            submissionId={submissionId}
            onDismiss={() => setShowExitOverlay(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// SECTION COMPONENTS
// ============================================================

// ── Inference Section ─────────────────────────────────────

interface InferenceSectionProps {
  answers: Partial<InferenceAnswers>;
  onUpdate: (key: keyof InferenceAnswers, val: number) => void;
  onComplete: () => void;
}

function InferenceSection({ answers, onUpdate, onComplete }: InferenceSectionProps) {
  const keys: (keyof InferenceAnswers)[] = ["iq1", "iq2", "iq3", "iq4", "iq5"];
  const allAnswered = keys.every(k => answers[k] !== undefined);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          A few questions before we begin
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Tell us about how you think
        </h1>
        <p className="text-lg text-gray-600">
          There are no right or wrong answers. These questions help us personalize what follows.
        </p>
      </motion.div>

      <div className="space-y-10">
        {INFERENCE_QUESTIONS.map((q, idx) => {
          const key = keys[idx];
          return (
            <OptionBlock
              key={q.id}
              prompt={q.prompt}
              options={q.options as unknown as string[]}
              selected={typeof answers[key] === "number" ? answers[key] as number : null}
              onSelect={(v) => onUpdate(key, v)}
              delay={idx * 0.05}
            />
          );
        })}
      </div>

      <NavRow
        onBack={null}
        onContinue={onComplete}
        continueDisabled={!allAnswered}
        continueLabel="Continue"
      />
    </div>
  );
}

// ── Vision Section ────────────────────────────────────────

interface VisionSectionProps {
  visionAnswer: number | null;
  onSelect: (v: number) => void;
  onComplete: () => void;
  onBack: () => void;
}

function VisionSection({ visionAnswer, onSelect, onComplete, onBack }: VisionSectionProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          Now, a question about why you built this
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {VISION_QUESTION.prompt}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {VISION_QUESTION.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`text-left px-5 py-4 rounded-lg border-2 transition-all ${
              visionAnswer === idx
                ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${visionAnswer === idx ? "border-[#4655EB]" : "border-gray-300"}`}>
                {visionAnswer === idx && <span className="w-2.5 h-2.5 rounded-full bg-[#4655EB]" />}
              </span>
              <span className="text-sm md:text-base">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      <NavRow
        onBack={onBack}
        onContinue={onComplete}
        continueDisabled={visionAnswer === null}
        continueLabel="Continue"
      />
    </div>
  );
}

// ── Vision Follow-On ──────────────────────────────────────

interface VisionFollowOnProps {
  visionProximity: number | null;
  visionOpenText: string;
  onProximitySelect: (v: number) => void;
  onTextChange: (t: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const PROXIMITY_OPTIONS = [
  "Further away than when I started.",
  "Not close, but I can see the path.",
  "Somewhere in the middle.",
  "Closer than I was, but not there yet.",
  "Very close, which is why I want to protect it.",
];

function VisionFollowOn({
  visionProximity, visionOpenText,
  onProximitySelect, onTextChange,
  onComplete, onBack,
}: VisionFollowOnProps) {
  const canContinue = visionProximity !== null && visionOpenText.trim().length > 10;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          One more
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How close does your business feel to actually delivering that right now?
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-2 mb-12">
        {PROXIMITY_OPTIONS.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onProximitySelect(idx)}
            className={`text-left px-5 py-3.5 rounded-lg border-2 transition-all ${
              visionProximity === idx
                ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${visionProximity === idx ? "border-[#4655EB]" : "border-gray-300"}`}>
                {visionProximity === idx && <span className="w-2.5 h-2.5 rounded-full bg-[#4655EB]" />}
              </span>
              <span className="text-sm md:text-base">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          What would have to change in the next 12 months for you to feel like the business is genuinely moving toward that?
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Be specific if you can. This will appear in your Extended Operator Brief exactly as you write it.
        </p>
        <textarea
          value={visionOpenText}
          onChange={(e) => onTextChange(e.target.value.slice(0, 280))}
          placeholder="In your own words..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#4655EB] resize-none"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{visionOpenText.length}/280</p>
      </div>

      <NavRow
        onBack={onBack}
        onContinue={onComplete}
        continueDisabled={!canContinue}
        continueLabel="Continue"
      />
    </div>
  );
}

// ── Section 2 ─────────────────────────────────────────────

interface Section2Props {
  questions: typeof SECTION2_QUESTIONS;
  responses: Partial<Section2Responses>;
  onUpdate: (key: string, val: string | number) => void;
  onComplete: () => void;
  onBack: () => void;
}

const S2_KEY_MAP: Record<string, keyof Section2Responses> = {
  "S2.Universal.1": "time_allocation",
  "S2.Ops.1": "ops_process_response",
  "S2.Ops.2": "ops_visibility_response",
  "S2.Ops.3": "ops_late_discovery",
  "S2.Ops.4": "ops_owner_dependency",
  "S2.Growth.1": "growth_lost_opportunity",
  "S2.Growth.2": "growth_revenue_independence",
  "S2.Growth.3": "growth_loss_visibility",
  "S2.Strategy.1": "strategy_clarity",
  "S2.Strategy.2": "strategy_three_year",
  "S2.People.1": "people_time_response",
  "S2.People.2": "people_energy_response",
  "S2.Urgency": "urgency_rating",
};

const OPTION_LETTERS = ["a", "b", "c", "d", "e"];

const TIME_ALLOCATION_VALUES = [
  "almost_all_strategic",
  "more_than_half_strategic",
  "roughly_split",
  "mostly_operational",
  "almost_all_operational",
];

const URGENCY_VALUES = [
  "critical",
  "important_not_urgent",
  "significant_uncertain",
  "came_to_understand",
];

function resolveResponseValue(questionId: string, optionIndex: number): string {
  if (questionId === "S2.Universal.1") return TIME_ALLOCATION_VALUES[optionIndex];
  if (questionId === "S2.Urgency") return URGENCY_VALUES[optionIndex];
  return OPTION_LETTERS[optionIndex];
}

function isQuestionVisible(
  q: typeof SECTION2_QUESTIONS[0],
  responses: Partial<Section2Responses>
): boolean {
  if (!q.conditional_on) return true;
  const depKey = S2_KEY_MAP[q.conditional_on.question_id];
  if (!depKey) return true;
  const currentVal = responses[depKey];
  return currentVal !== undefined && q.conditional_on.answers.includes(currentVal as string);
}

function Section2({ questions, responses, onUpdate, onComplete, onBack }: Section2Props) {
  const visibleQuestions = questions.filter(q => isQuestionVisible(q, responses));
  const requiredIds = visibleQuestions.map(q => S2_KEY_MAP[q.id]).filter(Boolean);
  const allAnswered = requiredIds.every(k => responses[k] !== undefined);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          The reality check
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Now let us look at the business itself.
        </h1>
        <p className="text-lg text-gray-600">
          Thank you. There are no right or wrong answers here. The more honest you are, the more useful what follows will be.
        </p>
      </motion.div>

      <div className="space-y-10">
        {visibleQuestions.map((q, idx) => {
          const responseKey = S2_KEY_MAP[q.id];
          const currentVal = responseKey ? responses[responseKey] : undefined;

          return (
            <OptionBlock
              key={q.id}
              prompt={q.prompt}
              options={q.options}
              selected={currentVal !== undefined ? q.options.findIndex((_, i) => resolveResponseValue(q.id, i) === currentVal) : null}
              onSelect={(optIdx) => {
                if (responseKey) {
                  onUpdate(responseKey, resolveResponseValue(q.id, optIdx));
                }
              }}
              delay={idx * 0.04}
            />
          );
        })}
      </div>

      <NavRow
        onBack={onBack}
        onContinue={onComplete}
        continueDisabled={!allAnswered}
        continueLabel="Continue"
      />
    </div>
  );
}

// ── Section 3 Universal ───────────────────────────────────

interface Section3UniversalProps {
  ownerHourlyRate: number;
  ownerNonStrategicHours: number;
  annualRevenueBand: string;
  onRateChange: (v: number) => void;
  onHoursChange: (v: number) => void;
  onBandChange: (v: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const REVENUE_BANDS = [
  { value: "under_1m", label: "Under $1M" },
  { value: "1m_3m", label: "$1M – $3M" },
  { value: "3m_5m", label: "$3M – $5M" },
  { value: "5m_10m", label: "$5M – $10M" },
  { value: "10m_20m", label: "$10M – $20M" },
  { value: "over_20m", label: "Over $20M" },
];

function Section3Universal({
  ownerHourlyRate, ownerNonStrategicHours, annualRevenueBand,
  onRateChange, onHoursChange, onBandChange, onComplete, onBack,
}: Section3UniversalProps) {
  const canContinue = ownerHourlyRate > 0 && ownerNonStrategicHours > 0 && annualRevenueBand;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          Putting numbers around it
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          A few inputs to build your picture.
        </h1>
        <p className="text-lg text-gray-600">
          These do not need to be exact. Honest estimates are more useful than precise guesses.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* Owner hourly rate */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            As the owner, what is your rough estimate of what your time is worth to the business per hour?
          </label>
          <p className="text-sm text-gray-500 mb-4">
            Think about what it would cost to replace the strategic value you bring, not just your salary. If unsure, consider what a fractional executive with your knowledge would cost per hour.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-semibold">$</span>
            <input
              type="number"
              value={ownerHourlyRate}
              onChange={(e) => onRateChange(Number(e.target.value))}
              min={50}
              max={2000}
              step={25}
              className="w-40 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#4655EB]"
            />
            <span className="text-gray-500">per hour</span>
          </div>
        </div>

        {/* Non-strategic hours */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Roughly how many hours per week do you personally spend on work that a well-structured system or capable team member should be handling instead of you?
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={ownerNonStrategicHours}
              onChange={(e) => onHoursChange(Number(e.target.value))}
              min={1}
              max={80}
              step={1}
              className="w-32 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#4655EB]"
            />
            <span className="text-gray-500">hours per week</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Estimated annual owner time cost: <strong className="text-gray-700">${(ownerHourlyRate * ownerNonStrategicHours * 52).toLocaleString()}</strong>
          </p>
        </div>

        {/* Revenue band */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            What is your business's approximate annual revenue?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {REVENUE_BANDS.map((band) => (
              <button
                key={band.value}
                onClick={() => onBandChange(band.value)}
                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  annualRevenueBand === band.value
                    ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <NavRow
        onBack={onBack}
        onContinue={onComplete}
        continueDisabled={!canContinue}
        continueLabel="Continue"
      />
    </div>
  );
}

// ── Section 3 OS-Specific ─────────────────────────────────

interface Section3OSProps {
  topOs: OperatingSystem;
  secondOs: OperatingSystem;
  inputs: Partial<Section3Inputs>;
  recoveryImpactText: string;
  onUpdate: (key: keyof Section3Inputs, val: any) => void;
  onTextChange: (t: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const PAYROLL_BANDS = [
  { value: "under_25k", label: "Under $25K/mo" },
  { value: "25k_50k", label: "$25K – $50K/mo" },
  { value: "50k_100k", label: "$50K – $100K/mo" },
  { value: "100k_250k", label: "$100K – $250K/mo" },
  { value: "over_250k", label: "Over $250K/mo" },
];

const REWORK_FREQUENCY_OPTIONS = [
  { value: "rarely", label: "Rarely (less than once a month)" },
  { value: "once_twice_month", label: "Once or twice a month" },
  { value: "weekly", label: "Weekly" },
  { value: "multiple_weekly", label: "Multiple times per week" },
];

const REWORK_COST_OPTIONS = [
  { value: "under_500", label: "Under $500" },
  { value: "500_2000", label: "$500 – $2,000" },
  { value: "2000_5000", label: "$2,000 – $5,000" },
  { value: "over_5000", label: "Over $5,000" },
];

const CLIENT_VALUE_BANDS = [
  { value: "under_5k", label: "Under $5K" },
  { value: "5k_15k", label: "$5K – $15K" },
  { value: "15k_50k", label: "$15K – $50K" },
  { value: "50k_150k", label: "$50K – $150K" },
  { value: "over_150k", label: "Over $150K" },
];

const IDLE_CAPITAL_BANDS = [
  { value: "under_100k", label: "Under $100K" },
  { value: "100k_250k", label: "$100K – $250K" },
  { value: "250k_500k", label: "$250K – $500K" },
  { value: "500k_1m", label: "$500K – $1M" },
  { value: "over_1m", label: "Over $1M" },
];

const PEOPLE_GAP_COUNT_OPTIONS = [
  { value: "none", label: "No, our team is well aligned" },
  { value: "one", label: "Yes, one role" },
  { value: "two_to_three", label: "Yes, two to three roles" },
  { value: "more_than_three", label: "Yes, more than three roles" },
];

const PEOPLE_GAP_COST_OPTIONS = [
  { value: "under_5k", label: "Under $5K/mo" },
  { value: "5k_15k", label: "$5K – $15K/mo" },
  { value: "15k_30k", label: "$15K – $30K/mo" },
  { value: "over_30k", label: "Over $30K/mo" },
];

function Section3OS({
  topOs, secondOs, inputs, recoveryImpactText,
  onUpdate, onTextChange, onComplete, onBack,
}: Section3OSProps) {
  const activeOs = new Set([topOs, secondOs]);
  const showOps = activeOs.has("operations");
  const showGrowth = activeOs.has("growth");
  const showStrategy = activeOs.has("strategy");
  const showPeople = activeOs.has("platform");

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          A few more inputs
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Specific to your gap areas.
        </h1>
        <p className="text-lg text-gray-600">
          Answer what applies. Skip what does not. The system will calculate from what you provide.
        </p>
      </motion.div>

      <div className="space-y-12">

        {/* Operations */}
        {showOps && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-[#2B60EB] pb-2">Operations</h2>

            <BandSelector
              label="What is your approximate total monthly payroll, including all employees and regular contractors?"
              options={PAYROLL_BANDS}
              selected={inputs.monthly_payroll_band as string}
              onSelect={(v) => onUpdate("monthly_payroll_band", v)}
            />

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Thinking about your team as a whole, what percentage of their paid working time would you estimate is genuinely productive?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={30}
                  max={100}
                  step={5}
                  value={inputs.team_productive_pct ?? 75}
                  onChange={(e) => onUpdate("team_productive_pct", Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-bold text-[#4655EB] w-16 text-right">
                  {inputs.team_productive_pct ?? 75}%
                </span>
              </div>
            </div>

            <BandSelector
              label="How often do significant errors or rework events occur?"
              options={REWORK_FREQUENCY_OPTIONS}
              selected={inputs.rework_frequency as string}
              onSelect={(v) => onUpdate("rework_frequency", v)}
            />

            {inputs.rework_frequency && inputs.rework_frequency !== "rarely" && (
              <BandSelector
                label="What is your rough estimate of what each rework event costs?"
                options={REWORK_COST_OPTIONS}
                selected={inputs.rework_cost_band as string}
                onSelect={(v) => onUpdate("rework_cost_band", v)}
              />
            )}
          </div>
        )}

        {/* Growth */}
        {showGrowth && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-[#2B60EB] pb-2">Growth</h2>

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                How many qualified leads or opportunities does your business fail to convert each month due to process breakdown on your end?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={inputs.lost_opportunities_per_month ?? ""}
                  onChange={(e) => onUpdate("lost_opportunities_per_month", Number(e.target.value))}
                  min={0}
                  max={500}
                  placeholder="e.g. 3"
                  className="w-32 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#4655EB]"
                />
                <span className="text-gray-500">per month</span>
              </div>
            </div>

            <BandSelector
              label="What is the approximate lifetime value of a typical client relationship?"
              options={CLIENT_VALUE_BANDS}
              selected={inputs.client_value_band as string}
              onSelect={(v) => onUpdate("client_value_band", v)}
            />

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Of your current revenue, roughly what percentage comes from active outbound effort versus inbound or repeat business?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={inputs.outbound_revenue_pct ?? 20}
                  onChange={(e) => onUpdate("outbound_revenue_pct", Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-bold text-[#4655EB] w-24 text-right">
                  {inputs.outbound_revenue_pct ?? 20}% outbound
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Strategy */}
        {showStrategy && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-[#2B60EB] pb-2">Strategy</h2>

            <BandSelector
              label="Approximately how much working capital or cash is not actively deployed toward growth or infrastructure?"
              options={IDLE_CAPITAL_BANDS}
              selected={inputs.idle_capital_band as string}
              onSelect={(v) => onUpdate("idle_capital_band", v)}
            />

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Of the decisions made in your business in a typical week, what percentage require your direct involvement or approval?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={inputs.decision_bottleneck_pct ?? 60}
                  onChange={(e) => onUpdate("decision_bottleneck_pct", Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-bold text-[#4655EB] w-16 text-right">
                  {inputs.decision_bottleneck_pct ?? 60}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* People */}
        {showPeople && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-[#2B60EB] pb-2">People</h2>

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Roughly how many hours per week do you spend on people issues that a clear system should be handling?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={inputs.people_hours_per_week ?? ""}
                  onChange={(e) => onUpdate("people_hours_per_week", Number(e.target.value))}
                  min={0}
                  max={40}
                  placeholder="e.g. 5"
                  className="w-32 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#4655EB]"
                />
                <span className="text-gray-500">hours per week</span>
              </div>
            </div>

            <BandSelector
              label="Do you have roles that are vacant, underperforming, or misaligned with what the business actually needs?"
              options={PEOPLE_GAP_COUNT_OPTIONS}
              selected={inputs.people_gap_count as string}
              onSelect={(v) => onUpdate("people_gap_count", v)}
            />

            {inputs.people_gap_count && inputs.people_gap_count !== "none" && (
              <BandSelector
                label="What is your rough estimate of what that costs the business per month?"
                options={PEOPLE_GAP_COST_OPTIONS}
                selected={inputs.people_gap_cost_band as string}
                onSelect={(v) => onUpdate("people_gap_cost_band", v)}
              />
            )}
          </div>
        )}

        {/* Closing open text */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            If you recovered even half of what this analysis suggests you are leaving on the table each year, what would that change for you personally?
          </label>
          <textarea
            value={recoveryImpactText}
            onChange={(e) => onTextChange(e.target.value.slice(0, 280))}
            placeholder="Be specific if you can..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#4655EB] resize-none"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{recoveryImpactText.length}/280</p>
        </div>
      </div>

      <NavRow
        onBack={onBack}
        onContinue={onComplete}
        continueDisabled={false}
        continueLabel="See Your Picture"
      />
    </div>
  );
}

// ── Section 4 ─────────────────────────────────────────────

interface Section4Props {
  ownerHourlyRate: number;
  ownerNonStrategicHours: number;
  section3Os: Partial<Section3Inputs>;
  visionAnswer: number | null;
  decisionActivator: number;
  riskStyle: number;
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
  onBack: () => void;
}

const VISION_LABELS = [
  "Financial Freedom",
  "Time and Lifestyle",
  "Family and Legacy",
  "Exit and Independence",
  "Growth and Scale",
  "Proof and Achievement",
];

const INACTION_LINES = [
  "If your current structure is costing you this much every year, what does staying here cost you over three years?",
  "The gap between where you are and where you described wanting to be does not close on its own. It closes when the structure changes.",
  "These figures are estimates. Phase 1 replaces them with verified numbers from your actual financial data.",
  "The Discovery call is a conversation, not a commitment. It is where we determine together whether what we deploy is the right fit.",
];

function Section4({
  ownerHourlyRate, ownerNonStrategicHours, section3Os,
  visionAnswer, decisionActivator, riskStyle,
  isSubmitting, submitError, onSubmit, onBack,
}: Section4Props) {
  // Quick estimate calculation for display
  const ownerTimeCost = ownerHourlyRate * ownerNonStrategicHours * 52;
  const revLeakage = (section3Os.lost_opportunities_per_month ?? 0) * 12 *
    resolveClientValueMidpoint(section3Os.client_value_band as string);
  const totalEstimate = ownerTimeCost + revLeakage;

  const inactionLine = INACTION_LINES[decisionActivator] ?? INACTION_LINES[0];
  const visionLabel = visionAnswer !== null ? VISION_LABELS[visionAnswer] : "your vision";

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          You have done something most business owners never do.
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          You put honest numbers around what staying where you are is actually costing you.
        </h1>
        <p className="text-lg text-gray-600">
          Here is what that means, and what one logical next step looks like.
        </p>
      </motion.div>

      {/* Cost preview */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 mb-10">
        <p className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wide">
          Estimated annual cost of your current structure
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Owner time on work the business should handle</span>
            <span className="font-semibold">${ownerTimeCost.toLocaleString()}</span>
          </div>
          {revLeakage > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Revenue leaving through growth process gaps</span>
              <span className="font-semibold">${revLeakage.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-400 italic">
            <span>Additional categories calculated in your brief</span>
            <span>+ more</span>
          </div>
        </div>
        <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
          <span className="text-base font-bold text-gray-800">Estimated minimum</span>
          <span className="text-2xl font-bold text-[#4655EB]">${totalEstimate.toLocaleString()}/yr</span>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Your full breakdown with all five cost categories appears in your Extended Operator Brief.
        </p>
      </div>

      {/* Vision reconnect */}
      <div className="border-l-4 border-[#4655EB] bg-[#4655EB]/5 px-6 py-5 rounded-r-lg mb-10">
        <p className="text-base text-gray-700">
          You told us your why is <strong>{visionLabel}</strong>. The question worth asking is whether your current structure is capable of getting you there, or whether it is the thing standing in the way.
        </p>
      </div>

      {/* Phase 1 intro */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What Phase 1 Discovery Actually Is</h2>
        <p className="text-gray-600 mb-4">
          What you have built here is a picture. It is honest and it is yours. But a picture is not a plan.
        </p>
        <p className="text-gray-600 mb-6">
          Phase 1 Discovery is how Quanton Labs turns what you have identified into a defined implementation roadmap, with a validated cost of inaction, a prioritized deployment plan, and a clear picture of what your business looks like on the other side.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { title: "Operational Audit", body: "A structured review across all eight functional domains." },
            { title: "Validated Cost-of-Inaction", body: "Your estimates replaced with verified figures from your actual data." },
            { title: "Implementation Roadmap", body: "Prioritized plan showing which gaps to close first and in what sequence." },
            { title: "Baseline Metrics Capture", body: "The measurement foundation that makes ROI verifiable." },
          ].map((d) => (
            <div key={d.title} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">{d.title}</p>
              <p className="text-sm text-gray-600">{d.body}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Phase 1 Investment</p>
          <p className="text-xl font-bold text-gray-800 mb-1">$7,500 – $15,000</p>
          <p className="text-sm text-gray-500">Fixed. You own the Diagnostic Report on delivery regardless of what you decide next.</p>
        </div>
      </div>

      {/* Inaction line */}
      <div className="border-l-4 border-[#8B37EA] bg-gray-50 px-6 py-4 rounded-r-lg mb-10">
        <p className="text-base font-semibold text-gray-800">{inactionLine}</p>
      </div>

      {/* CTA */}
      <div className="text-center mb-6">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`inline-block px-10 py-5 rounded-lg font-bold text-white text-base transition-all ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20"
          }`}
        >
{isSubmitting ? "Preparing your brief..." : "Generate My Extended Operator Brief"}        </button>
        <p className="text-sm text-gray-400 mt-3">
          30 minutes. No preparation required. If it is not the right fit, we will tell you that on the call.
        </p>
        {submitError && (
          <p className="text-sm text-red-600 mt-3">{submitError}</p>
        )}
      </div>

      <div className="text-center mb-12">
        <p className="text-sm text-gray-500">
          Your Extended Operator Brief will be delivered to your email within a few minutes of submitting.
        </p>
      </div>

      <div className="flex justify-start">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm">
          Back
        </button>
      </div>
    </div>
  );
}

// ── Complete Screen ───────────────────────────────────────

interface CompleteScreenProps {
  briefUrl: string;
  briefPdfUrl: string;
  costOfInaction: CostOfInaction;
  firstName?: string;
}

function CompleteScreen({ briefUrl, briefPdfUrl, costOfInaction, firstName }: CompleteScreenProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2B60EB] to-[#8B37EA] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {firstName ? `${firstName}, your brief is ready.` : "Your brief is ready."}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your Extended Operator Brief has been sent to your email. It contains your full cost-of-inaction breakdown and your Phase 1 roadmap.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a 
            href={briefUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA]"
          >
            Preview Your Brief
          </a>
          <a 
            href="https://calendly.com/quantonlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg font-bold text-[#4655EB] border-2 border-[#4655EB] hover:bg-[#4655EB]/5 transition-colors"
          >
            Book Your Discovery Call
          </a>
        </div>
        {briefPdfUrl && (
          <a
            href={briefPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-[#4655EB] underline"
          >
            Download PDF version
          </a>
        )}
      </motion.div>
    </div>
  );
}

// ── Exit Overlay ──────────────────────────────────────────

interface ExitOverlayProps {
  submissionId: string;
  onDismiss: () => void;
}

function ExitOverlay({ submissionId, onDismiss }: ExitOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(4,18,39,0.85)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl p-8 max-w-md w-full relative"
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-3">Before you go.</h2>
        <p className="text-gray-600 mb-6">
          You just built an honest picture of what your current structure is costing you. That work should not sit in a browser tab. Your Extended Operator Brief can be sent to you right now, along with a link to book a conversation when you are ready.
        </p>
        <div className="flex flex-col gap-3">
          <a 
            href="https://calendly.com/quantonlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3 rounded-lg font-semibold text-white text-center bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA]"
          >
            Book a Call Now
          </a>
          <button
            onClick={onDismiss}
            className="w-full px-6 py-3 rounded-lg font-semibold text-[#4655EB] border-2 border-[#4655EB] hover:bg-[#4655EB]/5 transition-colors"
          >
            Continue My Assessment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Loading Screen ────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#4655EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Preparing your session...</p>
      </div>
    </div>
  );
}

// ============================================================
// SHARED UI COMPONENTS
// ============================================================

interface OptionBlockProps {
  prompt: string;
  options: readonly string[];
  selected: number | null;
  onSelect: (idx: number) => void;
  delay?: number;
}

function OptionBlock({ prompt, options, selected, onSelect, delay = 0 }: OptionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <p className="text-lg font-semibold text-gray-800 mb-4">{prompt}</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`text-left px-5 py-3.5 rounded-lg border-2 transition-all ${
              selected === idx
                ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === idx ? "border-[#4655EB]" : "border-gray-300"}`}>
                {selected === idx && <span className="w-2.5 h-2.5 rounded-full bg-[#4655EB]" />}
              </span>
              <span className="text-sm md:text-base">{opt}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

interface BandSelectorProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string | undefined;
  onSelect: (v: string) => void;
}

function BandSelector({ label, options, selected, onSelect }: BandSelectorProps) {
  return (
    <div>
      <label className="block text-base font-semibold text-gray-800 mb-3">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
              selected === opt.value
                ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface NavRowProps {
  onBack: (() => void) | null;
  onContinue: () => void;
  continueDisabled: boolean;
  continueLabel: string;
}

function NavRow({ onBack, onContinue, continueDisabled, continueLabel }: NavRowProps) {
  return (
    <div className="flex justify-between items-center mt-16">
      {onBack ? (
        <button onClick={onBack} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">
          Back
        </button>
      ) : <div />}
      <button
        onClick={onContinue}
        disabled={continueDisabled}
        className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
          continueDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20 cursor-pointer"
        }`}
      >
        {continueLabel}
      </button>
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================

function computeProgress(step: WizardStep): number {
  switch (step) {
    case "inference": return 10;
    case "vision": return 20;
    case "vision_followon": return 28;
    case "section2": return 45;
    case "section3_universal": return 60;
    case "section3_os": return 75;
    case "section4": return 90;
    case "complete": return 100;
    default: return 0;
  }
}

function progressLabel(step: WizardStep): string {
  switch (step) {
    case "inference": return "About you";
    case "vision": return "Your why";
    case "vision_followon": return "Your why";
    case "section2": return "The reality check";
    case "section3_universal": return "The numbers";
    case "section3_os": return "The numbers";
    case "section4": return "Your picture";
    case "complete": return "Complete";
    default: return "";
  }
}

function resolveClientValueMidpoint(band: string): number {
  switch (band) {
    case "under_5k": return 3500;
    case "5k_15k": return 10000;
    case "15k_50k": return 32500;
    case "50k_150k": return 100000;
    case "over_150k": return 200000;
    default: return 0;
  }
}