// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 - Extended Operator Brief, signed link
// Source: DEVELOPER BRIEF ASSESSMENT, Launch Blocker 1

import { NextRequest } from "next/server";
import { serveSignedDocument } from "@/lib/assessment/serveDocument";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ token: string }> }
) {
  const { token } = await ctx.params;
  return serveSignedDocument(
    req,
    "brief",
    token,
    "Quanton-Labs-Extended-Operator-Brief.pdf"
  );
}
