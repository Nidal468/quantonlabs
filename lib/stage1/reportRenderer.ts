// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic — HTML Report Renderer
// Source: STRUCTURAL PATTERN REPORT TEMPLATE v1.0 Apr2026

import type {
  AssessmentSubmission,
  OperatingSystem,
  ScoredPayload,
  SectionB,
  SeverityTier,
} from "./types";
import {
  C1_OS_PHRASING,
  C1_STANDARD_OPTIONS,
  CALLOUT_TRIGGERS,
  CLOSING_VARIANTS,
  COVER_HEADLINES,
  DIAGNOSTIC_LINES,
  INTERPRETIVE_CLOSES,
  OS_LABELS,
  PATTERN_DESCRIPTORS,
  PATTERN_SUMMARIES,
  SYSTEM_FRAMINGS,
  TIER_BLOCKS,
  TIER_LABELS,
} from "./reportCopy";

// ============================================================
// BRAND TOKENS
// ============================================================

const COLORS = {
  blueIndigo: "#4655EB",
  gray800: "#1F2937",
  gray700: "#374151",
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  gray50: "#F9FAFB",
  white: "#FFFFFF",
};

const GRADIENT =
  "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

// ============================================================
// PRIMARY RENDERER
// ============================================================

/**
 * Renders the complete Structural Intelligence Report as HTML.
 * Assembles all sections per STRUCTURAL Intelligence REPORT TEMPLATE v1.0
 * Report Assembly Logic (steps 1-9).
 */
export function renderReport(
  submission: AssessmentSubmission,
  scored: ScoredPayload,
  submissionId: string
): string {
  const { section_a, section_b, section_c, section_d } = submission;
  const companyName = extractCompanyName(section_d.website);
  const fullName = `${section_d.first_name} ${section_d.last_name}`;
  const date = formatDate(new Date());

  const cover = renderCoverPanel(fullName, companyName, date, scored);
  const summary = renderStructuralSummary(companyName, scored, section_c);
  const severityMap = renderSeverityMap(scored);
  const focusAreas = renderStructuralFocusAreas(scored, section_b);
  const otherOS = renderOtherOperatingSystems(scored);
  const whatYouToldUs = renderWhatYouToldUs(section_c, scored);
  const closing = renderClosingSection(companyName, scored, submissionId);

  return wrapInPage({
    title: `Structural Intelligence Report — ${companyName}`,
    body: [cover, summary, severityMap, focusAreas, otherOS, whatYouToldUs, closing].join("\n"),
    submissionId,
  });
}

// ============================================================
// COVER PANEL
// ============================================================

function renderCoverPanel(
  fullName: string,
  companyName: string,
  date: string,
  scored: ScoredPayload
): string {
  const topTier = scored.scores[scored.top_os].tier;
  const headline = COVER_HEADLINES[topTier];

  return `
    <section class="cover-panel">
      <div class="cover-header">
        <img
src="https://eru8zvxsrt6fabfe.public.blob.vercel-storage.com/QL%20LOGO%20BLACK%20VERSION%20WITH%20TAGLINE%20v1.0%20Feb2026.png"          alt="Quanton Labs"
          class="cover-logo"
        />
        <div class="cover-contact">
          <span>Growth@QuantonLabs.com</span>
          <span>(929) 298-2162</span>
          <span>quantonlabs.com</span>
        </div>
      </div>
      <div class="cover-meta">Prepared for ${esc(fullName)} &nbsp;|&nbsp; ${esc(companyName)}</div>
      <div class="cover-date">${esc(date)}</div>
      <h1 class="cover-headline">${esc(headline)}</h1>
    </section>
  `;
}

// ============================================================
// STRUCTURAL SUMMARY
// ============================================================

function renderStructuralSummary(
  companyName: string,
  scored: ScoredPayload,
  sectionC: AssessmentSubmission["section_c"]
): string {
  const averageTier = computeAverageTier(scored);
  const descriptor = PATTERN_DESCRIPTORS[averageTier];
  const topOS = OS_LABELS[scored.top_os];
  const secondOS = OS_LABELS[scored.second_os];
  const thirdOS = OS_LABELS[scored.ranked_os[2]];
  const fourthOS = OS_LABELS[scored.ranked_os[3]];
  const topTier = TIER_LABELS[scored.scores[scored.top_os].tier];

  const paragraph1 = `${esc(companyName)} is operating with ${esc(descriptor)} across the business. The most pronounced gaps sit in ${esc(topOS)} and ${esc(secondOS)}, where structural design has not yet caught up with what the business needs. ${esc(thirdOS)} and ${esc(fourthOS)} show lower severity, and in your case, they are almost certainly connected to the patterns above.`;

  const c1Text = getC1DisplayText(sectionC.priority_os, scored);
  const paragraph2 = `You told us your priority is ${esc(c1Text)}. This report is built around that goal.`;

  return `
    <section class="section-summary">
      <p>${paragraph1}</p>
      <p>${paragraph2}</p>
    </section>
  `;
}

// ============================================================
// SEVERITY MAP
// ============================================================

function renderSeverityMap(scored: ScoredPayload): string {
  const rows = scored.ranked_os
    .map((os) => {
      const score = scored.scores[os];
      const tierLabel = TIER_LABELS[score.tier];
      const diagnostic = DIAGNOSTIC_LINES[os][score.tier];
      const dots = renderDots(score.dots);
      return `
        <div class="severity-row">
          <div class="severity-dots">${dots}</div>
          <div class="severity-body">
            <div class="severity-title">${esc(OS_LABELS[os])} <span class="severity-tier">${esc(tierLabel)}</span></div>
            <div class="severity-diagnostic">${esc(diagnostic)}</div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="section-severity">
      <h2>Severity Map</h2>
      <div class="severity-map">${rows}</div>
    </section>
  `;
}

function renderDots(count: 1 | 2 | 3 | 4 | 5): string {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    const filled = i <= count ? "filled" : "empty";
    html += `<span class="dot ${filled}"></span>`;
  }
  return html;
}

// ============================================================
// STRUCTURAL FOCUS AREAS (top two OS)
// ============================================================

function renderStructuralFocusAreas(
  scored: ScoredPayload,
  sectionB: SectionB
): string {
  const focusSet = [scored.top_os, scored.second_os];

  const blocks = focusSet
    .map((os) => {
      const tier = scored.scores[os].tier;
      const framing = SYSTEM_FRAMINGS[os]
        .map((p) => `<p>${esc(p)}</p>`)
        .join("");
      const block = TIER_BLOCKS[os][tier];
      const callouts = renderCallouts(os, sectionB);

      return `
        <section class="section-focus">
          <h2>${esc(OS_LABELS[os])} System</h2>
          <div class="framing">${framing}</div>
          <h3>${esc(block.headline)}</h3>
          <p>${esc(block.pattern[0])}</p>
          <p>${esc(block.pattern[1])}</p>
          <div class="implication"><p>${esc(block.implication)}</p></div>
          ${callouts}
        </section>
      `;
    })
    .join("");

  return blocks;
}

function renderCallouts(os: OperatingSystem, sectionB: SectionB): string {
  const triggers = CALLOUT_TRIGGERS[os];
  const triggered = triggers
    .filter((t) => {
      const weight = sectionB[t.question_id];
      return typeof weight === "number" && weight >= t.min_weight;
    })
    .map((t) => ({
      ...t,
      actualWeight: sectionB[t.question_id] as number,
    }))
    .sort((a, b) => b.actualWeight - a.actualWeight)
    .slice(0, 3);

  if (triggered.length === 0) return "";

  const items = triggered
    .map((t) => `<li>${esc(t.copy)}</li>`)
    .join("");

  return `
    <div class="callouts">
      <h4>What Drove This Assessment</h4>
      <ul>${items}</ul>
    </div>
  `;
}

// ============================================================
// OTHER OPERATING SYSTEMS (bottom two OS)
// ============================================================

function renderOtherOperatingSystems(scored: ScoredPayload): string {
  const bottomTwo = [scored.ranked_os[2], scored.ranked_os[3]];

  const blocks = bottomTwo
    .map((os) => {
      const tier = scored.scores[os].tier;
      const headline = DIAGNOSTIC_LINES[os][tier];
      const summary = PATTERN_SUMMARIES[os][tier];
      return `
        <div class="other-os-block">
          <h3>${esc(OS_LABELS[os])}</h3>
          <p class="other-os-headline">${esc(headline)}</p>
          <p>${esc(summary)}</p>
        </div>
      `;
    })
    .join("");

  return `
    <section class="section-other">
      <h2>Other Operating Systems</h2>
      ${blocks}
    </section>
  `;
}

// ============================================================
// WHAT YOU TOLD US
// ============================================================

function renderWhatYouToldUs(
  sectionC: AssessmentSubmission["section_c"],
  scored: ScoredPayload
): string {
  const text = (sectionC.outcome_text ?? "").trim();
  if (text.length < 20) return "";

  const topTier = scored.scores[scored.top_os].tier;
  const close = INTERPRETIVE_CLOSES[topTier];

  return `
    <section class="section-told-us">
      <h2>What You Told Us</h2>
      <blockquote class="respondent-quote">${esc(text)}</blockquote>
      <p class="interpretive-close">${esc(close)}</p>
    </section>
  `;
}

// ============================================================
// CLOSING SECTION
// ============================================================

function renderClosingSection(
  companyName: string,
  scored: ScoredPayload,
  submissionId: string
): string {
  const variant = CLOSING_VARIANTS[scored.closing_variant];

  // Interpolate placeholders in body and secondary_body
  const bodyHtml = variant.body
    .map((p) => `<p>${esc(interpolate(p, companyName, scored))}</p>`)
    .join("");

  const secondaryBodyHtml = variant.secondary_body
    ? `<p class="secondary-intro">${esc(interpolate(variant.secondary_body, companyName, scored))}</p>`
    : "";

  const secondaryCtaHtml = variant.secondary_cta
  ? `<a class="cta cta-secondary" href="/assessment/stage2/${submissionId}">${esc(variant.secondary_cta)}</a>`
  : "";

  return `
    <section class="section-closing">
      <h2>${esc(variant.header)}</h2>
      ${bodyHtml}
<a class="cta cta-primary" href="https://calendly.com/quantonlabs/30min" target="_blank">${esc(variant.primary_cta)}</a>      ${secondaryBodyHtml}
      ${secondaryCtaHtml}
    </section>
  `;
}

// ============================================================
// HELPERS
// ============================================================

function computeAverageTier(scored: ScoredPayload): SeverityTier {
  const avg =
    (scored.scores.strategy.normalized +
      scored.scores.platform.normalized +
      scored.scores.operations.normalized +
      scored.scores.growth.normalized) /
    4;

  if (avg <= 25) return "architected";
  if (avg <= 50) return "functional_gap";
  if (avg <= 75) return "structural_gap";
  return "critical_gap";
}

function getC1DisplayText(
  priorityOption: string,
  scored: ScoredPayload
): string {
  switch (priorityOption) {
    case "strategy_phrased":
      return C1_OS_PHRASING.strategy;
    case "platform_phrased":
      return C1_OS_PHRASING.platform;
    case "operations_phrased":
      return C1_OS_PHRASING.operations;
    case "growth_phrased":
      return C1_OS_PHRASING.growth;
    case "owner_capacity":
      return C1_STANDARD_OPTIONS.owner_capacity;
    case "visibility_reporting":
      return C1_STANDARD_OPTIONS.visibility_reporting;
    default:
      return C1_OS_PHRASING[scored.top_os];
  }
}

function interpolate(
  template: string,
  companyName: string,
  scored: ScoredPayload
): string {
  return template
    .replace(/\[COMPANY NAME\]/g, companyName)
    .replace(/\[TOP OS NAME\]/g, OS_LABELS[scored.top_os])
    .replace(/\[SECOND OS NAME\]/g, OS_LABELS[scored.second_os]);
}

function extractCompanyName(website: string): string {
  if (!website) return "Your Company";
  const cleaned = website
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0]
    .split(".")[0]
    .toLowerCase();
  // Known brand corrections
  const corrections: Record<string, string> = {
    quantonlabs: "Quanton Labs",
  };
  if (corrections[cleaned]) return corrections[cleaned];
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// HTML escape to prevent injection from respondent input
function esc(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
// PAGE WRAPPER (full HTML document with styles)
// ============================================================

function wrapInPage({
  title,
  body,
  submissionId,
}: {
  title: string;
  body: string;
  submissionId: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
${reportStyles()}
</style>
</head>
<body>
<main class="report">
${body}
<footer class="report-footer">
  <div class="wordmark">QUANTON LABS</div>
  <div class="meta">Report ID: ${esc(submissionId)}</div>
</footer>
</main>
</body>
</html>`;
}

function reportStyles(): string {
  return `
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Manrope', Arial, sans-serif;
  color: ${COLORS.gray700};
  background: ${COLORS.white};
  line-height: 1.6;
  font-size: 17px;
}
.report {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 32px;
}
section {
  margin-bottom: 56px;
  padding-bottom: 40px;
  border-bottom: 2px solid ${COLORS.blueIndigo};
}
section:last-of-type { border-bottom: none; }
h1, h2, h3, h4 { font-family: 'Manrope', Arial, sans-serif; }
h1 {
  font-weight: 700;
  color: ${COLORS.blueIndigo};
  font-size: 36px;
  line-height: 1.25;
  margin-bottom: 16px;
}
h2 {
  font-weight: 600;
  color: ${COLORS.gray800};
  font-size: 28px;
  margin-bottom: 20px;
}
h3 {
  font-weight: 600;
  color: ${COLORS.gray800};
  font-size: 22px;
  margin: 24px 0 12px 0;
}
h4 {
  font-weight: 600;
  color: ${COLORS.gray800};
  font-size: 18px;
  margin: 20px 0 10px 0;
}
p {
  margin-bottom: 16px;
}

/* Cover */
.cover-panel { text-align: left; border-bottom: none; padding-bottom: 0; }
.cover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${COLORS.gray200};
}
.cover-logo {
  width: 180px;
  height: auto;
}
.cover-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 12px;
  color: ${COLORS.gray500};
}
.cover-meta { color: ${COLORS.gray500}; font-size: 14px; margin-bottom: 4px; }
.cover-date { color: ${COLORS.gray500}; font-size: 14px; margin-bottom: 32px; }
.cover-headline {
  font-size: 40px;
  line-height: 1.2;
  color: ${COLORS.gray800};
  margin-top: 32px;
}

/* Severity Map */
.severity-map { display: flex; flex-direction: column; gap: 20px; }
.severity-row { display: flex; gap: 16px; align-items: flex-start; }
.severity-dots { display: flex; gap: 4px; padding-top: 6px; flex-shrink: 0; }
.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.dot.filled { background: ${COLORS.blueIndigo}; }
.dot.empty { background: ${COLORS.gray200}; }
.severity-body { flex: 1; }
.severity-title { font-weight: 600; color: ${COLORS.gray800}; font-size: 16px; }
.severity-tier { font-weight: 400; color: ${COLORS.gray500}; font-size: 14px; margin-left: 8px; }
.severity-diagnostic { font-size: 14px; color: ${COLORS.gray700}; margin-top: 4px; }

/* Focus Areas */
.framing { margin-bottom: 16px; }
.implication {
  border-left: 4px solid ${COLORS.blueIndigo};
  padding: 8px 0 8px 16px;
  margin: 20px 0;
}
.implication p { margin-bottom: 0; font-style: italic; color: ${COLORS.gray700}; }

/* Callouts */
.callouts {
  background: ${COLORS.gray50};
  padding: 20px 24px;
  margin-top: 24px;
  border-radius: 4px;
}
.callouts h4 { margin-top: 0; }
.callouts ul { list-style: none; padding: 0; }
.callouts li {
  padding: 8px 0 8px 20px;
  position: relative;
  font-size: 15px;
  color: ${COLORS.gray700};
}
.callouts li:before {
  content: "";
  position: absolute;
  left: 0;
  top: 16px;
  width: 8px;
  height: 2px;
  background: ${COLORS.blueIndigo};
}

/* Other OS */
.other-os-block { margin-bottom: 28px; }
.other-os-block:last-child { margin-bottom: 0; }
.other-os-headline { font-weight: 600; color: ${COLORS.gray800}; margin-bottom: 8px; }

/* What You Told Us */
.respondent-quote {
  border-left: 4px solid ${COLORS.blueIndigo};
  padding: 8px 0 8px 16px;
  margin: 20px 0;
  font-style: italic;
  color: ${COLORS.gray700};
}
.interpretive-close { margin-top: 20px; }

/* Closing */
.cta {
  display: inline-block;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  border-radius: 8px;
  margin: 20px 12px 8px 0;
}
.cta-primary {
  background: ${GRADIENT};
  color: ${COLORS.white};
}
.cta-secondary {
  background: ${GRADIENT};
  color: ${COLORS.white};
  opacity: 0.85;
}
.secondary-intro { margin-top: 32px; }

/* Footer */
.report-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid ${COLORS.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLORS.gray500};
  font-size: 12px;
}
.report-footer .wordmark {
  font-weight: 700;
  color: ${COLORS.blueIndigo};
  letter-spacing: 0.12em;
}

/* Print / PDF adjustments */
@media print {
  .report { padding: 24px 32px; max-width: none; }
  section { page-break-inside: avoid; }
  .cover-panel { page-break-after: always; }
  .section-focus { page-break-before: always; }
}
`;
}