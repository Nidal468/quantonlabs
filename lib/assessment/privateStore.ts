// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - Private Blob Store
// Source: DEVELOPER BRIEF ASSESSMENT, Launch Blocker 1

import { put, get, del } from "@vercel/blob";

// ============================================================
// CONFIG
// ============================================================

/**
 * The project carries two Blob stores. The public one holds brand assets
 * (logo) and is referenced by the report templates and the CSP. Reports and
 * briefs live in a separate private store. Every call here passes that
 * store's token explicitly so the SDK can never fall back to the public
 * store's BLOB_READ_WRITE_TOKEN.
 *
 * Set PRIVATE_BLOB_READ_WRITE_TOKEN in Vercel to the token Vercel generated
 * when the private store was connected. If the generated variable has a
 * different name, map it: PRIVATE_BLOB_READ_WRITE_TOKEN=${THAT_NAME}.
 */
function token(): string {
  const value = process.env.PRIVATE_BLOB_READ_WRITE_TOKEN;
  if (!value) throw new Error("PRIVATE_BLOB_READ_WRITE_TOKEN is missing.");
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
    token: token(),
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
    token: token(),
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
  await del(documentPath(kind, submissionId), { token: token() });
}
