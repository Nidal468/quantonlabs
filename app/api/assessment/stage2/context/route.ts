// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 - Stage 1 context lookup and gate

import { NextRequest, NextResponse } from "next/server";
import { findSubmission, stage2Eligible } from "@/lib/assessment/sheet";

export const runtime = "nodejs";

/**
 * Stage 2 opens only when the submission exists in the record with closing variant
 * qualified or above_segment. Every other ID gets { available: false } and the
 * not-available frame. No defaults are invented: top_os and second_os come from
 * the stored record. The respondent email is never returned to the browser.
 */
export async function GET(req: NextRequest) {
  const submissionId = new URL(req.url).searchParams.get("id") ?? "";
  if (!submissionId) return NextResponse.json({ available: false }, { status: 404 });

  try {
    const found = await findSubmission(submissionId);
    if (!stage2Eligible(found)) return NextResponse.json({ available: false }, { status: 404 });

    const r = found.record;
    const top_os = r.top_os ?? "";
    const second_os = r.second_os ?? "";
    if (!top_os || !second_os) {
      console.error("[Stage 2 context] record missing top_os/second_os", submissionId);
      return NextResponse.json({ available: false }, { status: 404 });
    }

    return NextResponse.json({
      available: true,
      top_os,
      second_os,
      first_name: r.first_name ?? "",
      company: r.company_name ?? r.company ?? "",
    });
  } catch (err) {
    console.error("[Stage 2 context lookup failed]", err);
    return NextResponse.json({ available: false, error: "lookup_failed" }, { status: 503 });
  }
}
