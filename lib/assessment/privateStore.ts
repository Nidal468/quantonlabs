// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - Private Blob Store
// Source: DEVELOPER BRIEF ASSESSMENT, Launch Blocker 1

import { put, get, del } from "@vercel/blob";

// ============================================================
// CONFIG
// ============================================================

/**
 * The project carries two Blob stores. The public one (quantonlabs-blob)
 * holds brand assets and still uses the legacy BLOB_READ_WRITE_TOKEN. The
 * private one (ql-assessment-private) holds reports and briefs and is
 * connected through OIDC: Vercel injects BLOB_STORE_ID and a short-lived
 * VERCEL_OIDC_TOKEN that the SDK reads on its own.
 *
 * Every call here passes storeId explicitly and no token. The SDK resolves
 * credentials as explicit token, then OIDC with the store ID, then
 * BLOB_READ_WRITE_TOKEN, so naming the store keeps these calls off the
 * public store. Requires @vercel/blob 2.8.0 or later.
 *
 * Local development: `vercel env pull .env.local` writes BLOB_STORE_ID and a
 * VERCEL_OIDC_TOKEN that expires after some hours; pull again when writes
 * start failing with an authentication error.
 */
function storeId(): string {
  const value = process.env.BLOB_STORE_ID;
  if (!value) throw new Error("BLOB_STORE_ID is missing.");
  return value;
}

export type StoredDocument = "report" | "brief";

export function documentPath(kind: StoredDocument, submissionId: string): string {
  const folder = kind === "report" ? "reports" : "briefs";
  return `${folder}/${submissionId}.html`;
}

// ============================================================
// WRITE
// ============================================================

/**
 * Stores the rendered HTML. The pathname is deterministic so a Stage 2
 * retake overwrites the earlier brief in place (DEVELOPER BRIEF ASSESSMENT
 * section 3, item 8). PDFs are never stored; they render on request.
 */
export async function putPrivateHtml(
  kind: StoredDocument,
  submissionId: string,
  html: string
): Promise<void> {
  await put(documentPath(kind, submissionId), html, {
    access: "private",
    contentType: "text/html; charset=utf-8",
    addRandomSuffix: false,
    allowOverwrite: true,
    storeId: storeId(),
  });
}

// ============================================================
// READ
// ============================================================

/**
 * Returns the stored HTML, or null when nothing is stored at that path.
 * useCache: false gives a read-after-write read, so a retake shows the new
 * brief immediately instead of the previous one for up to 60 seconds.
 */
export async function getPrivateHtml(
  kind: StoredDocument,
  submissionId: string
): Promise<string | null> {
  const result = await get(documentPath(kind, submissionId), {
    access: "private",
    useCache: false,
    storeId: storeId(),
  });

  if (!result || result.statusCode !== 200 || !result.stream) return null;

  return await new Response(result.stream).text();
}

// ============================================================
// DELETE
// ============================================================

export async function deletePrivateHtml(
  kind: StoredDocument,
  submissionId: string
): Promise<void> {
  await del(documentPath(kind, submissionId), { storeId: storeId() });
}

// ============================================================
// STAGE 2 PROGRESS (saved answers, keyed to the submission)
// ============================================================

const progressPath = (submissionId: string) => `progress/${submissionId}.json`;

export async function putProgress(submissionId: string, data: unknown): Promise<void> {
  await put(progressPath(submissionId), JSON.stringify(data), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    storeId: storeId(),
  });
}

export async function getProgress<T>(submissionId: string): Promise<T | null> {
  try {
    const result = await get(progressPath(submissionId), { access: "private", useCache: false, storeId: storeId() });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return JSON.parse(await new Response(result.stream).text()) as T;
  } catch {
    return null;
  }
}

export async function deleteProgress(submissionId: string): Promise<void> {
  await del(progressPath(submissionId), { storeId: storeId() });
}
