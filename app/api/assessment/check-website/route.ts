// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 - Website reachability check for Section D validation

import { NextRequest, NextResponse } from "next/server";
import { verifyWebsite } from "@/lib/stage1";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url).searchParams.get("url") ?? "";
  if (!url || url.length > 300) return NextResponse.json({ ok: false });
  return NextResponse.json({ ok: await verifyWebsite(url) }, { headers: { "Cache-Control": "no-store" } });
}
