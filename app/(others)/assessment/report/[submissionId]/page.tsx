// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Report Viewer
// Serves the stored HTML report from Vercel Blob storage.

import { notFound } from "next/navigation";


// ============================================================
// CONFIG
// ============================================================

// Force Node.js runtime (list() from @vercel/blob requires it)
export const runtime = "nodejs";

// Revalidate every hour — reports are immutable once written, but
// we allow occasional refresh in case Blob CDN needs a nudge.
export const revalidate = 3600;

// ============================================================
// PAGE
// ============================================================

interface PageProps {
  params: Promise<{ submissionId: string }>;
}

export default async function ReportViewerPage({ params }: PageProps) {
  const { submissionId } = await params;

  // Validate submission ID format to prevent Blob enumeration attacks
  if (!isValidSubmissionId(submissionId)) {
    notFound();
  }

  // Fetch the stored HTML from Blob
  const html = await fetchReportHtml(submissionId);

  if (!html) {
    notFound();
  }

  // Render the HTML inside an iframe-style container.
  // The stored HTML is a complete document with its own <html>, <head>,
  // and styles. Using srcDoc on an iframe isolates it from the
  // Next.js layout styles and prevents any CSS conflicts.
  return (
    <div style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}>
      <iframe
        srcDoc={html}
        title={`Structural Pattern Report ${submissionId}`}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      />
    </div>
  );
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps) {
  const { submissionId } = await params;
  return {
    title: `Structural Intelligence Report — Quanton Labs`,
    description: "Your Stage 1 Structural Diagnostic report from Quanton Labs.",
    robots: {
      index: false,
      follow: false,
    },
    other: {
      "submission-id": submissionId,
    },
  };
}

// ============================================================
// LAYOUT OVERRIDE
// ============================================================

// This page does not use the default Next.js layout. The report is a
// self-contained document. Reserving this comment to note the decision.
// The iframe approach means the report HTML's own styles apply without
// interference from globals.css or other layout wrappers.

// ============================================================
// HELPERS
// ============================================================

/**
 * Validates submission ID format to prevent enumeration of arbitrary
 * Blob storage paths. Expected format: QL-STG1-{timestamp}-{random}
 * e.g., QL-STG1-20260418T1532-k7m3p9
 */
function isValidSubmissionId(id: string): boolean {
  return /^QL-STG1-\d{8}T\d{4}-[a-z0-9]{6}$/.test(id);
}

/**
 * Fetches the stored HTML report from Vercel Blob.
 * Uses list() with a prefix to find the exact blob, then fetches it.
 * Returns null if the submission does not exist.
 */
async function fetchReportHtml(submissionId: string): Promise<string | null> {
  try {
    // Construct the Blob URL directly from the known store domain.
    // addRandomSuffix: false was set on upload, so the URL is deterministic.
    // Store ID extracted from the confirmed blob URL in logs:
    // https://eru8zvxsrt6fabfe.public.blob.vercel-storage.com/reports/{id}.html
    const blobUrl = `https://eru8zvxsrt6fabfe.public.blob.vercel-storage.com/reports/${submissionId}.html`;

    const response = await fetch(blobUrl, { cache: "no-store" });

    if (!response.ok) {
      console.error("[Report fetch] Blob returned", response.status, blobUrl);
      return null;
    }

    return await response.text();
  } catch (err) {
    console.error("[Report fetch failed]", err);
    return null;
  }
}