// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - Signed Link Handler (shared by /report and /brief)
// Source: DEVELOPER BRIEF ASSESSMENT, Launch Blocker 1

import { NextRequest, NextResponse } from "next/server";

import { verifyToken, type LinkPurpose } from "./linkToken";
import { getPrivateHtml } from "./privateStore";
import { renderPdf } from "@/lib/stage1/pdfRenderer";

// ============================================================
// RESPONSES
// ============================================================

const PRIVATE_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

/**
 * One response for every failure. A tampered token, a missing file, and a
 * storage error all look the same from outside.
 */
function notFound(): NextResponse {
  return new NextResponse("Not found", {
    status: 404,
    headers: { ...PRIVATE_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
  });
}

// ============================================================
// HANDLER
// ============================================================

export async function serveSignedDocument(
  req: NextRequest,
  purpose: "report" | "brief",
  token: string,
  pdfFilename: string
): Promise<NextResponse> {
  const submissionId = verifyToken(purpose, token);
  if (!submissionId) return notFound();

  let html: string | null;
  try {
    html = await getPrivateHtml(purpose, submissionId);
  } catch (err) {
    console.error(`[${purpose} read failed]`, err);
    return notFound();
  }
  if (!html) return notFound();

  const wantsPdf = req.nextUrl.searchParams.get("format") === "pdf";

  if (!wantsPdf) {
    return new NextResponse(html, {
      status: 200,
      headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  try {
    const pdf = await renderPdf(html);
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        ...PRIVATE_HEADERS,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFilename}"`,
      },
    });
  } catch (err) {
    console.error(`[${purpose} PDF render failed]`, err);
    return notFound();
  }
}
