// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - HTML Renderer
// Source: EXTENDED OPERATOR BRIEF TEMPLATE (Brief Structure, Render Specification, Brief Assembly)

import { esc, wrapInPage } from "@/lib/stage1/reportRenderer";
import type { OperatingSystem } from "@/lib/stage1/types";
import { activeS2, S2_QUESTIONS, type S2Answers } from "./questions";
import type { EngineResult } from "./engine";
import * as C from "./briefCopy";

const CALENDLY = "https://calendly.com/quantonlabs/30min";

export interface BriefContext {
  first_name: string;
  last_name: string;
  company: string;
  focus: OperatingSystem[];
  answers: S2Answers;
  engine: EngineResult;
  /** Stage 1 weights for B.Core.6 and B.Core.11, when known. */
  stage1: { "B.Core.6"?: number; "B.Core.11"?: number };
}

/** Figures round to the nearest thousand. */
export const money = (n: number) => `$${(Math.round(n / 1000) * 1000).toLocaleString("en-US")}`;
const pct = (n: number) => `${Math.round(n * 100)}`;
const label = (id: string, key: string) => S2_QUESTIONS.find((q) => q.id === id)?.options?.find((o) => o.key === key)?.label ?? "";

function fill(t: string, map: Record<string, string>): string {
  return t.replace(/\[([A-Z0-9 /x.]+)\]/g, (m, k) => (k in map ? map[k] : m));
}

/** Break-even position line, also used for the Your Picture preview. */
export function positionLine(e: EngineResult): string {
  return fill(C.POSITION_COPY[e.position], {
    BREAKEVEN: e.breakeven != null ? money(e.breakeven) : "",
    "PROFIT LINE": e.profit_line != null ? money(e.profit_line) : "",
    TARGET: e.profit_target != null ? pct(e.profit_target) : "",
    "MONTHLY REVENUE": money(e.monthly_revenue),
    "GAP TO PROFIT LINE": e.gap_to_profit_line != null ? money(e.gap_to_profit_line) : "",
    MARGIN: e.margin != null ? pct(e.margin) : "",
  });
}

const p = (t: string, cls = "") => `<p${cls ? ` class="${cls}"` : ""}>${esc(t)}</p>`;
const section = (h: string, inner: string, cls = "") => `<section class="${cls}"><h2>${esc(h)}</h2>${inner}</section>`;
const quote = (lab: string, t: string) => `<div class="pull"><div class="pull-lab">${esc(lab)}</div><blockquote class="respondent-quote">&ldquo;${esc(t)}&rdquo;</blockquote></div>`;

export function renderBrief(ctx: BriefContext, submissionId: string): string {
  const { answers: a, engine: e, company } = ctx;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const name = `${ctx.first_name} ${ctx.last_name}`;
  const totals = { TOTAL: money(e.total), "LEADERSHIP TIME": e.costs.leadership_time != null ? money(e.costs.leadership_time) : "" };

  // Cover
  const cover = `
    <section class="cover-panel">
      <div class="eyebrow">${esc(C.COVER.eyebrow)}</div>
      <div class="cover-meta">Prepared for ${esc(name)} &nbsp;|&nbsp; ${esc(company)} &nbsp;|&nbsp; ${esc(date)}</div>
      <h1 class="cover-headline">${esc(fill(C.COVER.headline, { "COMPANY NAME": company }))}</h1>
    </section>`;

  // 1 Who You Are
  const who = section("Who You Are",
    p(`You lead like ${C.IQ1_ARTICLE[a.IQ1]}. What drives you is ${C.VQ1_LABEL[a.VQ1].toLowerCase()}.`, "lead") + p(C.IQ1_PARAGRAPH[a.IQ1]));

  // 2 Where You Are Trying to Go
  const where = section("Where You Are Trying to Go",
    `<div class="why-lab">Your why: ${esc(C.VQ1_LABEL[a.VQ1])}</div>` + p(C.VQ1_PARAGRAPH[a.VQ1]) + quote("In your words", a.VQ3.trim()) + p(C.VQ2_LINE[a.VQ2]));

  // 3 What You Described: every Section 2 answer, plus N.Growth.3 for a Growth focus
  const ids = activeS2(ctx.focus, a).filter((q) => (q.section === 2 && q.id !== "R.Urgency") || q.id === "N.Growth.3").map((q) => q.id);
  const lines = ids
    .map((id) => {
      const lib = C.DESCRIBED[id];
      if (!lib) return "";
      const band = label(id, a[id]);
      const t = lib._band ? fill(lib._band, { BAND: id === "R.Plat.2" ? band.toLowerCase() : band }) : lib[a[id]];
      return t ? `<li>${esc(t)}</li>` : "";
    })
    .join("");
  const described = section("What You Described", `<p class="intro">In your own answers:</p><ul class="described">${lines}</ul>`);

  // 4 The Financial Position
  const fin: string[] = [p(C.FINANCIAL_INTRO, "intro"), p(positionLine(e))];
  if (a["N.Miss"] === "no_track") fin.push(p(C.MARGIN_COPY.no_track));
  else if (e.costs.margin_leakage != null)
    fin.push(p(fill(C.MARGIN_COPY.computed, { "MISS SHARE": label("N.Miss", a["N.Miss"]).toLowerCase(), "MISS POINTS": label("N.MissBy", a["N.MissBy"]).toLowerCase(), "MARGIN LEAKAGE": money(e.costs.margin_leakage) })));
  else fin.push(p(fill(C.MARGIN_COPY.size_unknown, { "MISS SHARE": label("N.Miss", a["N.Miss"]).toLowerCase() })));
  fin.push(p(a["N.Burden"] === "not_sure" ? C.BURDEN_COPY.not_sure : fill(C.BURDEN_COPY.known, { BAND: label("N.Burden", a["N.Burden"]).toLowerCase() })));
  for (const id of ["B.Core.6", "B.Core.11"] as const) {
    const w = ctx.stage1[id];
    if (w === 2 || w === 3) fin.push(p(C.STAGE1_LINES[id][w]));
  }
  const financial = section("The Financial Position", fin.join(""));

  // 5 The Cost of Staying Here: computed rows only
  const rows = C.COST_ORDER.filter((k) => e.costs[k] != null)
    .map((k) => `<tr><td>${esc(C.COST_LABELS[k])}</td><td class="num">${money(e.costs[k]!)}</td></tr>`)
    .join("");
  const costParts = [p(C.IQ2_OPENING[a.IQ2], "lead"), p(C.IQ5_FRAMING[a.IQ5])];
  if (rows) {
    costParts.push(`<table class="cost"><thead><tr><th>Cost category</th><th class="num">Estimated annual impact</th></tr></thead><tbody>${rows}<tr class="total"><td>${esc(C.COST_LABELS.total)}</td><td class="num">${money(e.total)}</td></tr></tbody></table>`);
  }
  if (e.duplicate_hours != null) costParts.push(p(fill(C.DUPLICATE_HOURS_LINE, { HOURS: Math.round(e.duplicate_hours).toLocaleString("en-US") })));
  if (e.total > 0) {
    costParts.push(p(fill(C.IQ3_TIMEFRAME[a.IQ3], { "TOTAL / 4": money(e.total / 4), "TOTAL x 2": money(e.total * 2), "TOTAL x 3": money(e.total * 3), "TOTAL x 5": money(e.total * 5) })));
    if (e.share_of_revenue != null) costParts.push(p(fill(C.SHARE_LINE, { SHARE: (Math.round(e.share_of_revenue * 1000) / 10).toString() })));
  }
  costParts.push(p(C.ASSUMPTIONS_LINE, "assume"));
  const cost = section("The Cost of Staying Here", costParts.join(""));

  // 6 What This Means for You
  const iq4 = a.IQ4 === "time" && e.costs.leadership_time == null ? C.IQ4_LINE.without_me : C.IQ4_LINE[a.IQ4];
  const close = (a["N.Close"] ?? "").trim();
  const means = section("What This Means for You", (e.total > 0 ? p(fill(iq4, totals)) : "") + (close ? quote("You said", close) : ""));

  // 7 What Has to Change, 8 Phase 1
  const change = section("What Has to Change", C.WHAT_HAS_TO_CHANGE.map((t) => p(t)).join(""));
  const cards = C.PHASE1.cards.map(([h, t]) => `<div class="card"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join("");
  const phase1 = section("Phase 1", p(C.PHASE1.body) + `<div class="cards">${cards}</div><div class="invest"><h3>${esc(C.PHASE1.investment[0])}</h3><p>${esc(C.PHASE1.investment[1])}</p></div>`);

  // 9 The Next Step: week bar and the urgency CTA
  const dir = Math.round(e.week_direction * 100);
  const week = `<div class="week" role="img" aria-label="${esc(C.WEEK_LABELS[0])} ${dir}%, ${esc(C.WEEK_LABELS[1])} ${100 - dir}%">
      <div class="bar"><span class="dir" style="width:${dir}%"></span><span class="run" style="width:${100 - dir}%"></span></div>
      <div class="labels"><span>${esc(C.WEEK_LABELS[0])}</span><span>${esc(C.WEEK_LABELS[1])}</span></div>
    </div>`;
  const ns = C.NEXT_STEP[a["R.Urgency"]];
  const next = section("The Next Step", week + p(fill(ns.copy, { "COMPANY NAME": company })) + `<a class="cta cta-primary" href="${CALENDLY}" target="_blank" rel="noopener">${esc(ns.cta)}</a>` + p(C.CONTACT_LINE, "contact"));

  return wrapInPage({
    title: `Extended Operator Brief: ${company}`,
    body: [cover, who, where, described, financial, cost, means, change, phase1, next].join("\n"),
    submissionId,
    extraCss: BRIEF_CSS,
    footerMeta: fill(C.COVER.footer, { "FIRST NAME": ctx.first_name, "LAST NAME": ctx.last_name }),
  });
}

const BRIEF_CSS = `
.eyebrow { font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #4655EB; margin-bottom: 20px; }
.cover-panel .cover-headline { margin-top: 20px; }
.lead { font-weight: 600; color: #1F2937; }
.intro { color: #6B7280; font-style: italic; }
.why-lab { font-weight: 600; color: #4655EB; margin-bottom: 12px; }
.pull { margin: 24px 0; }
.pull-lab { font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #6B7280; }
.respondent-quote { border-left: 4px solid #4655EB; padding: 8px 0 8px 16px; margin: 8px 0 0; font-style: italic; color: #374151; }
ul.described { list-style: none; padding: 0; margin: 0; }
ul.described li { padding: 10px 0 10px 20px; position: relative; border-bottom: 1px solid #E5E7EB; }
ul.described li:before { content: ""; position: absolute; left: 0; top: 22px; width: 8px; height: 2px; background: #4655EB; }
table.cost { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 16px; }
table.cost th { text-align: left; font-weight: 600; color: #6B7280; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; border-bottom: 2px solid #1F2937; padding: 8px 0; }
table.cost td { padding: 12px 12px 12px 0; border-bottom: 1px solid #E5E7EB; vertical-align: top; }
table.cost .num { text-align: right; padding-right: 0; white-space: nowrap; }
table.cost tr.total td { font-weight: 700; color: #1F2937; border-bottom: 0; border-top: 2px solid #1F2937; }
.assume { font-size: 14px; color: #6B7280; }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
.card { border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; }
.card h3, .invest h3 { margin: 0 0 6px; font-size: 17px; }
.card p, .invest p { margin: 0; font-size: 15px; }
.invest { border-left: 4px solid #4655EB; padding: 12px 16px; background: #F9FAFB; }
.week { margin: 8px 0 24px; }
.week .bar { display: flex; height: 16px; border-radius: 8px; overflow: hidden; }
.week .dir { background: #4655EB; }
.week .run { background: #E5E7EB; }
.week .labels { display: flex; justify-content: space-between; font-size: 13px; color: #6B7280; margin-top: 8px; gap: 12px; }
.contact { margin-top: 16px; font-size: 15px; color: #6B7280; }
@media (max-width: 767px) { .cards { grid-template-columns: 1fr; } table.cost { font-size: 15px; } }
@media print { .section-cost, table.cost { page-break-inside: avoid; } }
`;
