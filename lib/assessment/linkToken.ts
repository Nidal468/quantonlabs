// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - Signed Report and Brief Links
// Source: DEVELOPER BRIEF ASSESSMENT, Launch Blocker 1

import { createHmac, timingSafeEqual } from "crypto";

// ============================================================
// TYPES
// ============================================================

export type LinkPurpose = "report" | "brief";

// ============================================================
// SECRET
// ============================================================

function secret(): string {
  const value = process.env.REPORT_LINK_SECRET;
  if (!value || value.length < 32) {
    throw new Error(
      "REPORT_LINK_SECRET is missing or shorter than 32 characters."
    );
  }
  return value;
}

// ============================================================
// SIGNING
// ============================================================

function mac(purpose: LinkPurpose, id: string): Buffer {
  return createHmac("sha256", secret()).update(`${purpose}:${id}`).digest();
}

/**
 * Token layout: base64url(id) + "." + base64url(HMAC-SHA256(secret, purpose:id)).
 * The ID travels with the signature because an HMAC cannot be reversed to
 * recover it. Binding the purpose stops a report token from opening a brief.
 */
export function signToken(purpose: LinkPurpose, id: string): string {
  const idPart = Buffer.from(id, "utf8").toString("base64url");
  const sigPart = mac(purpose, id).toString("base64url");
  return `${idPart}.${sigPart}`;
}

/**
 * Returns the submission ID when the token is intact and signed for this
 * purpose. Returns null on any defect: malformed, tampered, truncated, or
 * signed for another purpose. Callers return the same not-found response
 * for null, so the response never reveals which check failed.
 */
export function verifyToken(purpose: LinkPurpose, token: string): string | null {
  if (typeof token !== "string" || token.length > 512) return null;

  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return null;

  const idPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);

  if (!/^[A-Za-z0-9_-]+$/.test(idPart) || !/^[A-Za-z0-9_-]+$/.test(sigPart)) {
    return null;
  }

  let id: string;
  try {
    id = Buffer.from(idPart, "base64url").toString("utf8");
  } catch {
    return null;
  }
  if (!id || !/^[A-Za-z0-9-]{8,64}$/.test(id)) return null;

  const expected = mac(purpose, id);
  const provided = Buffer.from(sigPart, "base64url");

  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;

  return id;
}

// ============================================================
// URL HELPERS
// ============================================================

/** Absolute site address for every assessment link, report asset, and email. One setting: NEXTAUTH_URL. */
export function siteBase(): string {
  return (process.env.NEXTAUTH_URL ?? "https://quantonlabs.com").replace(/\/+$/, "");
}

export function reportUrl(submissionId: string): string {
  return `${siteBase()}/report/${signToken("report", submissionId)}`;
}

export function reportPdfUrl(submissionId: string): string {
  return `${reportUrl(submissionId)}?format=pdf`;
}

export function briefUrl(submissionId: string): string {
  return `${siteBase()}/brief/${signToken("brief", submissionId)}`;
}

export function briefPdfUrl(submissionId: string): string {
  return `${briefUrl(submissionId)}?format=pdf`;
}
