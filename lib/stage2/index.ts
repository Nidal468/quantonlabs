// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - Module surface and server-side context

import type { OperatingSystem, RevenueBand, TeamSize } from "@/lib/stage1/types";
import { getQuestionById, weightOf } from "@/lib/stage1/questions";
import { OPERATING_SYSTEMS } from "@/lib/stage1/types";
import type { FoundRecord } from "@/lib/assessment/sheet";

export * from "./questions";
export * from "./engine";

export interface Stage1Context {
  revenue: RevenueBand;
  team_size: TeamSize;
  focus: OperatingSystem[]; // top OS, second OS
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  stage1: { "B.Core.6"?: number; "B.Core.11"?: number };
}

/** Reads the Stage 1 record (normalised headers) into the context Stage 2 carries. Null when incomplete. */
export function contextFromRecord(found: FoundRecord): Stage1Context | null {
  const r = found.record;
  const top = r.top_os as OperatingSystem;
  const second = r.second_os as OperatingSystem;
  if (!OPERATING_SYSTEMS.includes(top) || !OPERATING_SYSTEMS.includes(second) || !r.revenue_band || !r.team_size || !r.work_email) return null;
  const w = (id: string) => weightOf(getQuestionById(id)!, r[id.toLowerCase().replace(/[^a-z0-9]+/g, "_")]);
  return {
    revenue: r.revenue_band as RevenueBand,
    team_size: r.team_size as TeamSize,
    focus: [top, second],
    first_name: r.first_name ?? "",
    last_name: r.last_name ?? "",
    company: r.company_name || "Your Company",
    email: r.work_email.trim(),
    stage1: { "B.Core.6": w("B.Core.6"), "B.Core.11": w("B.Core.11") },
  };
}
