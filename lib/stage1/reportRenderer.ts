// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Pattern Report - HTML Renderer
// Source: STRUCTURAL PATTERN REPORT TEMPLATE (Report Structure, Render Specification, Report Assembly)

import { siteBase } from "@/lib/assessment/linkToken";
import type { AssessmentSubmission, OperatingSystem, ScoredPayload, SectionB, SeverityTier } from "./types";
import { getQuestionById, weightOf, C1_OPTIONS } from "./questions";
import { companyNameFromWebsite } from "./index";
import {
  CALLOUTS,
  CLOSING_VARIANTS,
  COVER_HEADLINES,
  DIAGNOSTIC_LINES,
  INTERPRETIVE_CLOSES,
  OS_LABELS,
  PATTERN_DESCRIPTORS,
  PATTERN_SUMMARIES,
  SUMMARY_PENDING,
  SYSTEM_FRAMINGS,
  TIER_BLOCKS,
  TIER_COLORS,
  TIER_LABELS,
  TIER_TEXT_COLORS,
} from "./reportCopy";

const COLORS = {
  blueIndigo: "#4655EB",
  gray800: "#1F2937",
  gray700: "#374151",
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  gray50: "#F9FAFB",
  white: "#FFFFFF",
};
const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const SITE = siteBase();
const CALENDLY = "https://calendly.com/quantonlabs/30min";
const LINKEDIN = "https://www.linkedin.com/company/quanton-labs";

/** Report assembly steps 1 to 8. The route stores the result and sends the email (step 9). */
export function renderReport(submission: AssessmentSubmission, scored: ScoredPayload, submissionId: string): string {
  const { section_b, section_c, section_d } = submission;
  const company = companyNameFromWebsite(section_d.website);
  const body = [
    cover(`${section_d.first_name} ${section_d.last_name}`, company, scored),
    summary(company, scored, section_c.priority),
    severityMap(scored),
    focusAreas(scored, section_b),
    otherSystems(scored),
    whatYouToldUs(section_c.outcome_text, scored),
    closing(company, scored, submissionId),
  ].join("\n");
  return wrapInPage({ title: `Structural Pattern Report: ${company}`, body, submissionId });
}

function cover(fullName: string, company: string, scored: ScoredPayload): string {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `
    <section class="cover-panel">
      <div class="cover-header">
        <img src="${SITE}/images/site/logo-ink@2x.png" alt="Quanton Labs" class="cover-logo" width="180" />
        <div class="cover-contact"><span>growth@quantonlabs.com</span><span>(929) 298-2162</span><span>quantonlabs.com</span></div>
      </div>
      <div class="cover-meta">Prepared for ${esc(fullName)} &nbsp;|&nbsp; ${esc(company)}</div>
      <div class="cover-date">${esc(date)}</div>
      <h1 class="cover-headline">${esc(COVER_HEADLINES[scored.scores[scored.top_os].tier])}</h1>
    </section>`;
}

function averageTier(scored: ScoredPayload): SeverityTier {
  const s = scored.scores;
  const avg = (s.strategy.normalized + s.platform.normalized + s.operations.normalized + s.growth.normalized) / 4;
  return avg <= 25 ? "architected" : avg <= 50 ? "functional_gap" : avg <= 75 ? "structural_gap" : "critical_gap";
}

function summary(company: string, scored: ScoredPayload, priority: string): string {
  const [a, b, c, d] = scored.ranked_os.map((os) => OS_LABELS[os]);
  const p1 = `${company} is operating with ${PATTERN_DESCRIPTORS[averageTier(scored)]} across all four operating systems. The most pronounced gaps sit in ${a} and ${b}, where ${SUMMARY_PENDING.diagnostic}. ${c} and ${d} show ${SUMMARY_PENDING.relative}, and the four are connected: ${SUMMARY_PENDING.synthesis}.`;
  const insertion = (C1_OPTIONS[priority] ?? C1_OPTIONS[scored.top_os]).insertion;
  const p2 = `You told us your priority is ${insertion}. This report is built around that goal.`;
  return `
    <section class="section-summary">
      <h2>Structural Summary</h2>
      <p>${esc(p1)}</p>
      <p>${esc(p2)}</p>
    </section>`;
}

function dots(n: number, color: string): string {
  return Array.from({ length: 5 }, (_, i) => (i < n ? `<span class="dot filled" style="background:${color}"></span>` : `<span class="dot empty"></span>`)).join("");
}

function severityMap(scored: ScoredPayload): string {
  const rows = scored.ranked_os
    .map((os) => {
      const s = scored.scores[os];
      return `
        <div class="severity-row">
          <div class="severity-dots" aria-label="${s.dots} of 5">${dots(s.dots, TIER_COLORS[s.tier])}</div>
          <div class="severity-body">
            <div class="severity-title">${esc(OS_LABELS[os])} <span class="severity-tier" style="color:${TIER_TEXT_COLORS[s.tier]}">${esc(TIER_LABELS[s.tier])}</span></div>
            <div class="severity-diagnostic">${esc(DIAGNOSTIC_LINES[os][s.tier])}</div>
          </div>
        </div>`;
    })
    .join("");
  return `
    <section class="section-severity">
      <h2>Severity Map</h2>
      <div class="severity-map">${rows}</div>
    </section>`;
}

/** Up to three callouts from questions shown and scored 2 or 3, ranked by weight. */
function callouts(os: OperatingSystem, b: SectionB): string {
  const hits = CALLOUTS[os]
    .map((c, order) => ({ ...c, order, w: weightOf(getQuestionById(c.id)!, b[c.id]) }))
    .filter((c) => typeof c.w === "number" && c.w >= (c.minWeight ?? 2))
    .sort((x, y) => (y.w as number) - (x.w as number) || x.order - y.order)
    .slice(0, 3);
  return hits.map((c) => `<div class="callout"><p>${esc(c.text)}</p></div>`).join("");
}

function focusAreas(scored: ScoredPayload, b: SectionB): string {
  return [scored.top_os, scored.second_os]
    .map((os) => {
      const block = TIER_BLOCKS[os][scored.scores[os].tier];
      return `
        <section class="section-focus">
          <h2>${esc(OS_LABELS[os])} System</h2>
          <div class="framing"><p>${esc(SYSTEM_FRAMINGS[os])}</p></div>
          <h3>${esc(block.headline)}</h3>
          <p>${esc(block.pattern[0])}</p>
          <p>${esc(block.pattern[1])}</p>
          <div class="implication"><p>${esc(block.implication)}</p></div>
          ${callouts(os, b)}
        </section>`;
    })
    .join("");
}

function otherSystems(scored: ScoredPayload): string {
  const blocks = [scored.ranked_os[2], scored.ranked_os[3]]
    .map((os) => {
      const t = scored.scores[os].tier;
      return `
        <div class="other-os-block">
          <h3>${esc(OS_LABELS[os])}</h3>
          <p class="other-os-headline">${esc(DIAGNOSTIC_LINES[os][t])}</p>
          <p>${esc(PATTERN_SUMMARIES[t])}</p>
        </div>`;
    })
    .join("");
  return `
    <section class="section-other">
      <h2>Other Operating Systems</h2>
      ${blocks}
    </section>`;
}

/** Rendered only when C2 is 20 characters or longer; otherwise omitted with no substitute. */
function whatYouToldUs(outcome: string | null, scored: ScoredPayload): string {
  const text = (outcome ?? "").trim();
  if (text.length < 20) return "";
  return `
    <section class="section-told-us">
      <h2>What You Told Us</h2>
      <blockquote class="respondent-quote">&ldquo;${esc(text)}&rdquo;</blockquote>
      <p class="interpretive-close">${esc(INTERPRETIVE_CLOSES[scored.scores[scored.top_os].tier])}</p>
    </section>`;
}

function closing(company: string, scored: ScoredPayload, submissionId: string): string {
  const v = CLOSING_VARIANTS[scored.closing_variant];
  const fill = (t: string) =>
    t.replace(/\[COMPANY NAME\]/g, company).replace(/\[TOP OS NAME\]/g, OS_LABELS[scored.top_os]).replace(/\[SECOND OS NAME\]/g, OS_LABELS[scored.second_os]);
  const secondaryHref = v.brief ? `${SITE}/assessment/stage2/${encodeURIComponent(submissionId)}` : LINKEDIN;
  return `
    <section class="section-closing">
      <h2>${esc(v.header)}</h2>
      ${v.body.map((p) => `<p>${esc(fill(p))}</p>`).join("")}
      <a class="cta cta-primary" href="${CALENDLY}" target="_blank" rel="noopener">${esc(v.primary_cta)}</a>
      ${v.secondary_body ? `<p class="secondary-intro">${esc(fill(v.secondary_body))}</p>` : ""}
      <a class="cta cta-secondary" href="${secondaryHref}" target="_top">${esc(v.secondary_cta)}</a>
    </section>`;
}

export function esc(text: string): string {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function wrapInPage({ title, body, submissionId, extraCss = "", footerMeta }: { title: string; body: string; submissionId: string; extraCss?: string; footerMeta?: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
${reportStyles()}
${extraCss}
</style>
</head>
<body>
<main class="report">
${body}
<footer class="report-footer">
  <div class="wordmark">QUANTON LABS</div>
  <div class="meta">${footerMeta ? esc(footerMeta) : `Report ID: ${esc(submissionId)}`}</div>
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
.severity-tier { font-weight: 500; color: ${COLORS.gray500}; font-size: 14px; margin-left: 8px; }
.severity-diagnostic { font-size: 14px; color: ${COLORS.gray700}; margin-top: 4px; }

/* Focus Areas */
.framing { margin-bottom: 16px; }
.implication { margin: 20px 0; }
.implication p { margin-bottom: 0; font-weight: 600; color: ${COLORS.gray800}; }

/* Callouts: 4 px Blue-Indigo left border, 16 px padding, italic */
.callout {
  border-left: 4px solid ${COLORS.blueIndigo};
  padding: 16px;
  margin: 16px 0 0 0;
  font-style: italic;
  background: ${COLORS.gray50};
}
.callout p { margin: 0; }

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
  background: ${COLORS.white};
  color: ${COLORS.blueIndigo};
  border: 2px solid ${COLORS.blueIndigo};
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
  .section-other { page-break-before: always; }
}
@media (max-width: 767px) {
  body { font-size: 16px; }
  .report { padding: 40px 20px; }
  .cover-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .cover-contact { align-items: flex-start; }
  .cover-headline { font-size: 30px; }
  h2 { font-size: 24px; }
  .cta { display: block; text-align: center; margin-right: 0; }
}
`;
}