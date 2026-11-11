// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 - Save and return
// Source: ASSESSMENT FRAMES AND TRANSITIONS (sections 6 and 7)
//
// A draft exists only after a valid email is entered in Section D. It holds the
// answers so far, expires 72 hours after the last activity, and triggers one
// resume email 15 minutes after the session goes quiet (see /api/cron/save-return).

import { NextRequest, NextResponse } from "next/server";
import { deleteDraft, getDraft, putDraft } from "@/lib/assessment/privateStore";
import { verifyToken } from "@/lib/assessment/linkToken";
import { DRAFT_TTL_MS, type Draft } from "@/lib/assessment/drafts";

export const runtime = "nodejs";

const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Save or refresh a draft. */
export async function PUT(req: NextRequest) {
  let body: { draft_id?: string; payload?: { section_d?: { work_email?: string; first_name?: string } } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const id = body.draft_id ?? "";
  const email = (body.payload?.section_d?.work_email ?? "").trim().toLowerCase();
  const raw = JSON.stringify(body.payload ?? null);
  if (!ID_RE.test(id) || !EMAIL_RE.test(email) || raw.length > 40_000) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const now = new Date().toISOString();
  const prev = await getDraft<Draft>(id);
  // A changed address gets its own resume email; otherwise one email per draft.
  const sent_at = prev && prev.email === email ? prev.sent_at : null;
  try {
    await putDraft(id, { email, first_name: String(body.payload?.section_d?.first_name ?? "").slice(0, 80), payload: body.payload, created_at: prev?.created_at ?? now, updated_at: now, sent_at } satisfies Draft);
  } catch (err) {
    console.error("[Draft save failed]", err);
    return NextResponse.json({ error: "save_failed" }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}

/** Resume: the token from the email returns the saved answers. */
export async function GET(req: NextRequest) {
  const id = verifyToken("resume", new URL(req.url).searchParams.get("token") ?? "");
  if (!id) return NextResponse.json({ available: false }, { status: 404 });
  const d = await getDraft<Draft>(id);
  if (!d || Date.now() - Date.parse(d.updated_at) > DRAFT_TTL_MS) {
    if (d) await deleteDraft(id).catch(() => undefined);
    return NextResponse.json({ available: false }, { status: 404 });
  }
  return NextResponse.json({ available: true, draft_id: id, payload: d.payload }, { headers: { "Cache-Control": "private, no-store" } });
}
