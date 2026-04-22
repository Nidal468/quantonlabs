// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — PDF Renderer (Puppeteer)
// Renders the HTML report into a PDF via headless Chromium.
// Uses @sparticuz/chromium on Vercel serverless, local Chrome on dev.

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// ============================================================
// ENVIRONMENT DETECTION
// ============================================================

/**
 * Detects whether we are running on Vercel serverless vs local dev.
 * Vercel injects VERCEL and AWS_LAMBDA_FUNCTION_NAME env vars.
 */
function isServerless(): boolean {
  return (
    !!process.env.VERCEL ||
    !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NODE_ENV === "production"
  );
}

/**
 * Local Chrome executable paths. Used only when running dev on Windows/macOS.
 * The handler tries each path and uses the first one that exists.
 */
const LOCAL_CHROME_PATHS = [
  // Windows
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  // macOS
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  // Linux
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
];

async function resolveLocalChromePath(): Promise<string | null> {
  const { existsSync } = await import("fs");
  for (const path of LOCAL_CHROME_PATHS) {
    try {
      if (existsSync(path)) return path;
    } catch {
      // Continue to next path
    }
  }
  return null;
}

// ============================================================
// BROWSER LAUNCH
// ============================================================

async function launchBrowser() {
  if (isServerless()) {
    // Vercel serverless — use @sparticuz/chromium bundled binary
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  // Local development — use installed Chrome
  const localPath = await resolveLocalChromePath();
  if (!localPath) {
    throw new Error(
      "Local Chrome not found. Install Google Chrome, or set PUPPETEER_EXECUTABLE_PATH."
    );
  }

  return puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ?? localPath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

// ============================================================
// PDF GENERATION
// ============================================================

/**
 * Renders the provided HTML string to a PDF buffer.
 * PDF page size: US Letter. Margins: 1 inch all sides.
 * Matches PDF Backup Render spec in STRUCTURAL PATTERN REPORT TEMPLATE v1.0.
 */
export async function renderPdf(html: string): Promise<Buffer> {
  let browser;

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Load the HTML. waitUntil:networkidle0 ensures Google Fonts load
    // before the PDF is generated — critical for Manrope rendering.
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    // Allow fonts additional time to render
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ensure web fonts are fully loaded before PDF render.
    // Prevents Arial fallback from appearing in the PDF.
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "1in",
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: pdfFooterTemplate(),
      preferCSSPageSize: false,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (err) {
        console.error("[Browser close failed]", err);
      }
    }
  }
}

// ============================================================
// FOOTER TEMPLATE
// ============================================================

/**
 * PDF footer: Quanton Labs wordmark left, page number right.
 * Puppeteer renders this inside an iframe that does not inherit
 * the document's CSS, so styles are inlined.
 */
function pdfFooterTemplate(): string {
  return `
    <div style="
      width: 100%;
      padding: 0 1in;
      font-family: 'Manrope', Arial, sans-serif;
      font-size: 9px;
      color: #6B7280;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #E5E7EB;
      padding-top: 8px;
    ">
      <div style="font-weight: 700; color: #4655EB; letter-spacing: 0.12em;">
        QUANTON LABS
      </div>
      <div>
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    </div>
  `;
}

// ============================================================
// CONVENIENCE: FULL PIPELINE
// ============================================================

/**
 * Combined HTML render + PDF pipeline. Takes scored payload,
 * produces PDF buffer. Used by the route handler.
 */
export async function renderReportPdf(
  html: string
): Promise<Buffer> {
  return renderPdf(html);
}