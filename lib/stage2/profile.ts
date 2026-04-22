// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Assessment — Owner Profile Builder

import type {
  OwnerProfile,
  IdentityFrame,
  RiskStyle,
  DecisionActivator,
  VisionCategory,
  VisionProximity,
} from "./types";
import {
  INFERENCE_Q1_MAP,
  INFERENCE_Q2_MAP,
  INFERENCE_Q3_MAP,
  INFERENCE_Q4_MAP,
  INFERENCE_Q5_MAP,
  VISION_CATEGORY_MAP,
} from "./questions";

// ============================================================
// PROFILE BUILDER
// ============================================================

export interface InferenceAnswers {
  iq1: number; // 0-3
  iq2: number;
  iq3: number;
  iq4: number;
  iq5: number;
  vision: number;     // 0-5
  vision_proximity: number; // 0-4
  vision_open_text: string;
}

export function buildOwnerProfile(answers: InferenceAnswers): OwnerProfile {
  return {
    identity_frame: INFERENCE_Q1_MAP[answers.iq1],
    risk_style: INFERENCE_Q2_MAP[answers.iq2],
    time_horizon: INFERENCE_Q3_MAP[answers.iq3],
    emotional_driver: INFERENCE_Q4_MAP[answers.iq4],
    decision_activator: INFERENCE_Q5_MAP[answers.iq5],
    vision_category: VISION_CATEGORY_MAP[answers.vision],
    vision_proximity: resolveVisionProximity(answers.vision_proximity),
    vision_open_text: answers.vision_open_text.slice(0, 280),
  };
}

function resolveVisionProximity(index: number): VisionProximity {
  const map: VisionProximity[] = [
    "further_away",
    "not_close",
    "middle",
    "closer",
    "very_close",
  ];
  return map[index] ?? "middle";
}

// ============================================================
// NARRATIVE THREAD SELECTORS
// ============================================================
// These drive the brief copy variants. Each returns a string key
// that the brief renderer uses to select the correct paragraph.

export function getCostFraming(
  decisionActivator: DecisionActivator,
  riskStyle: RiskStyle
): "loss" | "opportunity" | "data" | "relationship" {
  if (decisionActivator === "loss_averse") return "loss";
  if (decisionActivator === "vision") return "opportunity";
  if (decisionActivator === "data") return "data";
  if (decisionActivator === "relationship") return "relationship";
  // Fallback: derive from risk style
  if (riskStyle === "loss_averse") return "loss";
  if (riskStyle === "opportunity_driven") return "opportunity";
  return "data";
}

export function getIdentityLanguage(frame: IdentityFrame): {
  opening: string;
  gap_framing: string;
} {
  switch (frame) {
    case "operator":
      return {
        opening:
          "You tend to think in systems and outcomes. You want to know what is happening, why it is happening, and what needs to change to produce a different result. When the business is not performing the way it should, your instinct is to find the process failure and fix it.",
        gap_framing:
          "Based on what your assessment revealed, there are specific structural gaps in how your business is currently designed to operate. These are not performance failures. They are architectural gaps, places where the business lacks the systems, visibility, or coordination required to execute consistently without depending on you to fill the space.",
      };
    case "builder":
      return {
        opening:
          "You think in terms of what the business is becoming, not just what it is today. You are building toward something and you measure progress by how much of that vision is already in place. When the business is not performing the way it should, your instinct is to find the structural constraint and remove it.",
        gap_framing:
          "Based on what your assessment revealed, there are structural constraints in your current operating architecture that are limiting the velocity of what you are building. These are not effort failures. They are design gaps, places where the infrastructure has not yet caught up with the ambition.",
      };
    case "steward":
      return {
        opening:
          "You think in terms of what you have built and what it needs to remain strong. You carry a responsibility that goes beyond revenue, to the people, the culture, and the legacy the business represents. When things are not working the way they should, your instinct is to protect what matters most while finding a sustainable path forward.",
        gap_framing:
          "Based on what your assessment revealed, there are structural vulnerabilities in how your business is currently operating that create risk to what you have built. These are not failures of care or attention. They are architectural gaps that accumulate quietly and surface as crises when conditions change.",
      };
    case "visionary":
      return {
        opening:
          "You think in terms of possibility and direction. You are less interested in where the business is than in where it is going. When the business is not performing the way it should, your instinct is to question whether the vision is clear enough and whether the people and systems around you are capable of executing it.",
        gap_framing:
          "Based on what your assessment revealed, there are structural gaps between the vision you are working toward and the operational architecture currently in place to support it. These are not execution failures. They are infrastructure gaps, places where the systems and coordination required to realize the vision at scale do not yet exist.",
      };
  }
}

export function getVisionParagraph(vision: VisionCategory): string {
  switch (vision) {
    case "financial_freedom":
      return "Financial freedom means different things to different owners. For most, it means income that does not require their constant presence to sustain it, and enough certainty about where the money is coming from that the business feels like an asset rather than a job. That is a structural outcome, not a revenue outcome. It requires the business to operate independently of the owner in ways that most growth-stage businesses are not yet designed to do.";
    case "time_and_lifestyle":
      return "The original promise of building a business is more control, not less. For most owners at this stage, the reality is the opposite. The business owns more of their time than they own of it. Reclaiming that time is not a scheduling problem. It is a structural problem. It requires the business to make decisions, execute processes, and manage exceptions without routing everything through the owner first.";
    case "family_and_legacy":
      return "Building something that outlasts you requires building something that can run without you. Legacy is not a sentiment. It is an operational requirement. A business that depends on its founder for daily continuity is a business that ends when the founder steps back. The structural work of building a legacy business is the same work required to build a scalable one.";
    case "exit_and_independence":
      return "Exit value is a function of two things: revenue and transferability. A business that generates strong revenue but cannot operate without its founder is worth significantly less than one that generates the same revenue with documented systems, independent teams, and governed processes. The structural gap between where most growth-stage businesses are and where they need to be for a credible exit is exactly what Phase 1 is designed to map.";
    case "growth_and_scale":
      return "Scale is not a revenue target. It is an architectural state. A business that grows revenue without growing its underlying structure accumulates complexity faster than it accumulates capability. At some point the weight of that complexity becomes the ceiling. The businesses that scale past it are the ones that build the infrastructure before they need it, not after.";
    case "proof_and_achievement":
      return "The drive to build something significant is one of the most powerful motivators in business. It is also one of the most vulnerable to the gap between what the business is and what it should be by now. Most owners who started with this motivation find that the day-to-day demands of running the business have crowded out the progress that would make the achievement feel real. That gap is structural, not motivational.";
  }
}

export function getVisionCostConnection(
  vision: VisionCategory,
  totalFormatted: string
): string {
  switch (vision) {
    case "financial_freedom":
      return `Every year your current structure remains unchanged, ${totalFormatted} that could be working toward your financial independence is instead being absorbed by inefficiency, dependency, and structural gaps. Financial freedom is not a revenue milestone. It is what happens when the business generates and retains value without requiring your constant presence to do it.`;
    case "time_and_lifestyle":
      return `${totalFormatted} represents the annual cost of a business that has not yet been designed to run without you. Every dollar of that figure is connected to a decision you made, a process you ran, an exception you resolved, or an opportunity you missed because the structure required your involvement instead of handling it independently.`;
    case "family_and_legacy":
      return `A business built to outlast its founder requires infrastructure that most growth-stage businesses have not yet built. ${totalFormatted} is the annual cost of the gap between the business you have now and the one you are trying to leave behind. Every year that gap remains, the legacy you are building is more dependent on your continued presence than it should be.`;
    case "exit_and_independence":
      return `Exit value is determined by transferability as much as revenue. ${totalFormatted} represents the annual drag of a business that is not yet designed to operate independently of its owner. At a conservative valuation multiple, that figure represents a meaningful reduction in what your business is worth to a buyer. Phase 1 quantifies that gap precisely.`;
    case "growth_and_scale":
      return `${totalFormatted} is the annual cost of infrastructure that has not yet caught up with your ambition. Every dollar of that figure is a constraint on the velocity of what you are building. A business that resolves these structural gaps does not just recover that cost. It compounds on top of it because the infrastructure that eliminates waste is the same infrastructure that enables scale.`;
    case "proof_and_achievement":
      return `${totalFormatted} is the annual distance between the business you are running and the one you set out to build. Achievement is not just a revenue milestone. It is the feeling that the business is performing at its real potential. The structural gaps your assessment revealed are what stand between the current performance and that standard.`;
  }
}

export function getCtaCopy(
  vision: VisionCategory,
): string {
  switch (vision) {
    case "financial_freedom":
      return "The structure that produces financial freedom does not build itself. But it also does not require you to figure out how to build it alone.";
    case "time_and_lifestyle":
      return "The time you are spending on work your business should be handling is not coming back. But the structure that changes that can be built.";
    case "family_and_legacy":
      return "The business you are trying to leave behind starts with the infrastructure you build today.";
    case "exit_and_independence":
      return "The gap between what your business is worth now and what it could be worth is a structural gap. Phase 1 maps it precisely.";
    case "growth_and_scale":
      return "The infrastructure that enables scale is the same infrastructure that eliminates the drag your assessment revealed.";
    case "proof_and_achievement":
      return "The distance between where you are and what you set out to build is smaller than it feels. But it requires a different structure to close.";
  }
}

export function getInactionLine(
  activator: DecisionActivator,
  totalFormatted: string,
  threeYearFormatted: string
): string {
  switch (activator) {
    case "loss_averse":
      return `If your current structure costs you ${totalFormatted} this year, what does it cost you over three years while you are deciding? That figure is ${threeYearFormatted}.`;
    case "vision":
      return "The gap between where you are and where you described wanting to be does not close on its own. It closes when the structure changes.";
    case "data":
      return "The numbers you just built are estimates. Phase 1 replaces them with verified figures from your actual financial data. That is where the real analysis begins.";
    case "relationship":
      return "The Discovery call is a conversation, not a commitment. It is where we determine together whether what we deploy is the right fit for where you are trying to go.";
  }
}