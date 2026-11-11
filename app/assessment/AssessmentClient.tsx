// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Structural Diagnostic - Wizard
// Source: ASSESSMENT FRAMES AND TRANSITIONS (Stage 1, sections 1 to 6);
//         ASSESSMENT STAGE 1 QUESTION BANK (questions, branching)
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Page, Words, ease } from "@/components/site/kit";
import {
  A1, A2, A3, A4, C1_OPTIONS, C1_TEXT, C2_TEXT, ROLE_OPTIONS,
  getActiveQuestions, scoreAssessment,
  type CompanyFunction, type Locations, type PriorityOption, type RespondentRole,
  type RevenueBand, type SectionA, type SectionB, type TeamSize,
} from "@/lib/stage1";
import { OS_LABELS, TIER_LABELS } from "@/lib/stage1/reportCopy";
import { Choice, Dots, Err, ReportFrame } from "./ui";
import "./assessment.css";

type Step = "intro" | "a" | "b" | "c" | "d" | "done";

interface Result {
  report_url: string;
  brief_url: string | null;
  top_os_name: string;
  second_os_name: string;
}

const CALENDLY = "https://calendly.com/quantonlabs/30min";

const MSG = {
  required: "This one is required to move forward. Choose what comes closest to how the company runs today.",
  email: "That email address does not look valid. Check the format and try again.",
  phone: "That phone number format is not recognized. Any standard format works, with or without country code, dashes, parentheses, or spaces.",
  website: "That website does not resolve to a live domain. Check for typos or try another address.",
  a3: "Select at least one to continue: the functions closest to how the company runs today, even where they run on spreadsheets or by hand.",
};

const SECTIONS = {
  a: { tracker: "Section 1 of 4: About the Company", intro: "A few details about the company. They decide which questions apply to how it runs." },
  b: { tracker: "Section 2 of 4: How the Company Runs", intro: "When a question says leadership, it means whoever sets the direction of the company: an owner, a founder, or an executive team. Choose the answer closest to how things work today, even where it is not the answer you would like." },
  c: { tracker: "Section 3 of 4: What Would Matter Most", intro: "Two short questions about where the value would be highest if one thing changed." },
  d: { tracker: "Section 4 of 4: Delivery", intro: "Your Structural Pattern Report is ready. Here is a preview of the severity map from your answers." },
};

// ============================================================
// HELPERS
// ============================================================

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
const validPhone = (p: string) => { const n = p.replace(/\D/g, "").length; return n >= 7 && n <= 15; };
const normPhone = (p: string) => { const d = p.replace(/\D/g, ""); return d.length === 10 ? `+1${d}` : `+${d}`; };
const validDomain = (u: string) => /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(u.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, ""));
const normUrl = (u: string) => (/^https?:\/\//i.test(u.trim()) ? u.trim().toLowerCase() : `https://${u.trim().toLowerCase()}`);

// ============================================================
// WIZARD
// ============================================================

export default function AssessmentClient() {
  const [step, setStep] = useState<Step>("intro");
  const [a, setA] = useState<Partial<SectionA>>({ functions: [] });
  const [b, setB] = useState<SectionB>({});
  const [bi, setBi] = useState(0);
  const [priority, setPriority] = useState<PriorityOption | null>(null);
  const [outcome, setOutcome] = useState("");
  const [d, setD] = useState({ first_name: "", last_name: "", work_email: "", phone: "", website: "", role: "" as RespondentRole | "", location: "" });
  const [errs, setErrs] = useState<Record<string, string | null>>({});
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [sentTo, setSentTo] = useState("");
  const aStart = useRef(0);
  const pace = useRef(15);
  const topRef = useRef<HTMLDivElement>(null);

  const aDone = !!(a.revenue && a.team_size && a.locations && a.functions?.length);
  const questions = useMemo(() => (aDone ? getActiveQuestions(a as SectionA) : []), [aDone, a]);
  const scored = useMemo(() => (aDone && step !== "intro" && step !== "a" && step !== "b" ? scoreAssessment(a as SectionA, b) : null), [aDone, a, b, step]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, bi]);

  // Supplementary tracker line, from the respondent's own pace through Section A.
  const remaining = (() => {
    if (step === "intro" || step === "a" || step === "done") return null;
    const left = step === "b" ? questions.length - bi + 2 : step === "c" ? 2 : 0;
    const secs = left * pace.current + 60; // Section D capture
    const n = Math.round(secs / 60);
    return secs <= 60 ? "Less than a minute" : `About ${n} ${n === 1 ? "minute" : "minutes"} remaining`;
  })();

  const go = (s: Step) => { setErrs({}); setStep(s); };
  const clear = (k: string) => setErrs((e) => (e[k] ? { ...e, [k]: null } : e));
  const setAF = (k: string, next: Partial<SectionA>) => { setA(next); clear(k); };
  const setDF = (k: keyof typeof d, v: string) => { setD({ ...d, [k]: v }); clear(k); };

  // ---------- Section A ----------
  const submitA = () => {
    const e: Record<string, string | null> = {
      A1: a.revenue ? null : MSG.required,
      A2: a.team_size ? null : MSG.required,
      A3: a.functions?.length ? null : MSG.a3,
      A4: a.locations ? null : MSG.required,
    };
    setErrs(e);
    if (Object.values(e).some(Boolean)) return;
    pace.current = Math.min(30, Math.max(6, (Date.now() - aStart.current) / 1000 / 4));
    setBi(0);
    go("b");
  };

  // ---------- Section B ----------
  const q = questions[bi];
  const answerB = (key: string) => {
    setB((prev) => ({ ...prev, [q.id]: key }));
    setErrs({});
    window.setTimeout(() => {
      if (bi + 1 < questions.length) setBi(bi + 1);
      else go("c");
    }, 220);
  };

  // ---------- Section C ----------
  const c1Keys: PriorityOption[] = scored ? [scored.top_os, scored.second_os, "leadership_capacity", "visibility"] : [];
  const submitC = () => {
    if (!priority || !c1Keys.includes(priority)) return setErrs({ C1: MSG.required });
    go("d");
  };

  // ---------- Section D ----------
  const checkD = async () => {
    const e: Record<string, string | null> = {
      first_name: d.first_name.trim() ? null : MSG.required,
      last_name: d.last_name.trim() ? null : MSG.required,
      work_email: !d.work_email.trim() ? MSG.required : validEmail(d.work_email) ? null : MSG.email,
      phone: !d.phone.trim() ? MSG.required : validPhone(d.phone) ? null : MSG.phone,
      website: !d.website.trim() ? MSG.required : validDomain(d.website) ? null : MSG.website,
      role: d.role ? null : MSG.required,
    };
    if (!e.website) {
      try {
        const r = await fetch(`/api/assessment/check-website?url=${encodeURIComponent(normUrl(d.website))}`);
        if (!(await r.json()).ok) e.website = MSG.website;
      } catch {
        /* network trouble here should not block the respondent */
      }
    }
    setErrs(e);
    return !Object.values(e).some(Boolean);
  };

  const submitD = async () => {
    if (sending) return;
    setSendErr(null);
    setSending(true);
    try {
      if (!(await checkD())) return;
      const payload = {
        section_a: a,
        section_b: Object.fromEntries(questions.map((x) => [x.id, b[x.id]])),
        section_c: { priority, outcome_text: outcome.trim() || null },
        section_d: {
          first_name: d.first_name.trim(),
          last_name: d.last_name.trim(),
          work_email: d.work_email.trim().toLowerCase(),
          phone: normPhone(d.phone),
          website: normUrl(d.website),
          role: d.role,
          location: d.location.trim() || null,
        },
      };
      const res = await fetch("/api/assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("submit");
      setResult(await res.json());
      setSentTo(payload.section_d.work_email);
      go("done");
    } catch {
      setSendErr("Something went wrong sending the report. Try again in a moment, or contact growth@quantonlabs.com.");
    } finally {
      setSending(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  if (step === "intro") return <Intro onStart={() => { aStart.current = Date.now(); go("a"); }} />;

  const sec = step === "done" ? null : SECTIONS[step];
  const progress = step === "a" ? 6 : step === "b" ? 10 + (bi / Math.max(1, questions.length)) * 62 : step === "c" ? 78 : step === "d" ? 92 : 100;

  return (
    <Page nav="paper">
      <div className="as qx-paper" ref={topRef}>
        {sec && (
          <div className="as-track" aria-live="polite">
            <div className="wrap">
              <div className="row">
                <span className="lab">{sec.tracker}</span>
                {remaining && <span className="rem">{remaining}</span>}
              </div>
              <div className="bar"><motion.i animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease }} /></div>
            </div>
          </div>
        )}

        <div className="wrap as-body">
          <AnimatePresence mode="wait">
            <motion.div key={step === "b" ? `b${bi}` : step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease }}>
              {sec && (step !== "b" || bi === 0) && <p className="as-intro">{sec.intro}</p>}

              {step === "a" && (
                <div className="as-stack">
                  <fieldset className="as-q">
                    <legend><span className="id">A1</span>{A1.text}</legend>
                    <div className="as-grid">{A1.options.map((o) => <Choice key={o.key} name="A1" label={o.label} checked={a.revenue === o.key} onChange={() => setAF("A1", { ...a, revenue: o.key as RevenueBand })} />)}</div>
                    <Err msg={errs.A1 ?? null} />
                  </fieldset>
                  <fieldset className="as-q">
                    <legend><span className="id">A2</span>{A2.text}</legend>
                    <div className="as-grid">{A2.options.map((o) => <Choice key={o.key} name="A2" label={o.label} checked={a.team_size === o.key} onChange={() => setAF("A2", { ...a, team_size: o.key as TeamSize })} />)}</div>
                    <Err msg={errs.A2 ?? null} />
                  </fieldset>
                  <fieldset className="as-q">
                    <legend><span className="id">A3</span>{A3.text}</legend>
                    <div className="as-list">
                      {A3.options.map((o) => {
                        const on = a.functions!.includes(o.key as CompanyFunction);
                        return <Choice key={o.key} multi name="A3" label={o.label} checked={on} onChange={() => setAF("A3", { ...a, functions: on ? a.functions!.filter((f) => f !== o.key) : [...a.functions!, o.key as CompanyFunction] })} />;
                      })}
                    </div>
                    <Err msg={errs.A3 ?? null} />
                  </fieldset>
                  <fieldset className="as-q">
                    <legend><span className="id">A4</span>{A4.text}</legend>
                    <div className="as-grid g4">{A4.options.map((o) => <Choice key={o.key} name="A4" label={o.label} checked={a.locations === o.key} onChange={() => setAF("A4", { ...a, locations: o.key as Locations })} />)}</div>
                    <Err msg={errs.A4 ?? null} />
                  </fieldset>
                  <div className="as-nav"><span /><button className="as-b1" onClick={submitA}>Continue</button></div>
                </div>
              )}

              {step === "b" && q && (
                <fieldset className="as-q solo">
                  <legend className="big"><span className="as-count">{bi + 1} of {questions.length}</span>{q.text}</legend>
                  <div className="as-list">{q.options.map((o) => <Choice key={o.key} name={q.id} label={o.label} checked={b[q.id] === o.key} onChange={() => answerB(o.key)} />)}</div>
                  <Err msg={errs.B ?? null} />
                  <div className="as-nav">
                    <button className="as-b2" onClick={() => (bi === 0 ? go("a") : setBi(bi - 1))}>Back</button>
                    {b[q.id] && <button className="as-b1" onClick={() => (bi + 1 < questions.length ? setBi(bi + 1) : go("c"))}>Next</button>}
                  </div>
                </fieldset>
              )}

              {step === "c" && (
                <div className="as-stack">
                  <fieldset className="as-q">
                    <legend><span className="id">C1</span>{C1_TEXT}</legend>
                    <div className="as-list">{c1Keys.map((k) => <Choice key={k} name="C1" label={C1_OPTIONS[k].display} checked={priority === k} onChange={() => { setPriority(k); setErrs({}); }} />)}</div>
                    <Err msg={errs.C1 ?? null} />
                  </fieldset>
                  <div className="as-q">
                    <label className="as-legend" htmlFor="c2"><span className="id">C2</span>{C2_TEXT} <em>Optional</em></label>
                    <textarea id="c2" className="as-in" rows={4} maxLength={2000} value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                  </div>
                  <div className="as-nav">
                    <button className="as-b2" onClick={() => { setBi(questions.length - 1); go("b"); }}>Back</button>
                    <button className="as-b1" onClick={submitC}>Continue</button>
                  </div>
                </div>
              )}

              {step === "d" && scored && (
                <div className="as-d">
                  <section className="as-prev" aria-labelledby="prev-h">
                    <h2 id="prev-h" className="qx-d3">Your Severity Map: Preview</h2>
                    <ol>
                      {scored.ranked_os.map((os) => (
                        <li key={os}>
                          <Dots n={scored.scores[os].dots} />
                          <span className="os">{OS_LABELS[os]}</span>
                          <span className="tl">{TIER_LABELS[scored.scores[os].tier]}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="qx-body">The full report adds the analysis for each system, the answers that drove it, and what the pattern means for the company. Where should we send it?</p>
                  </section>

                  <form className="as-form" noValidate onSubmit={(e) => { e.preventDefault(); submitD(); }}>
                    <h2 className="qx-d3">Your full Structural Pattern Report is ready. Where should we send it?</h2>
                    <div className="as-fields">
                      <Field id="first_name" label="First name" auto="given-name" v={d.first_name} set={(v) => setDF("first_name", v)} err={errs.first_name} />
                      <Field id="last_name" label="Last name" auto="family-name" v={d.last_name} set={(v) => setDF("last_name", v)} err={errs.last_name} />
                      <Field id="work_email" label="Work email" type="email" auto="email" v={d.work_email} set={(v) => setDF("work_email", v)} err={errs.work_email} />
                      <Field id="phone" label="Phone" type="tel" auto="tel" v={d.phone} set={(v) => setDF("phone", v)} err={errs.phone} />
                      <Field id="website" label="Company website" auto="url" v={d.website} set={(v) => setDF("website", v)} err={errs.website} ph="company.com" />
                      <div className="as-field">
                        <label htmlFor="role">Role</label>
                        <select id="role" className="as-in" value={d.role} onChange={(e) => setDF("role", e.target.value as RespondentRole)} aria-invalid={!!errs.role}>
                          <option value="" disabled>Select</option>
                          {ROLE_OPTIONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
                        </select>
                        <Err msg={errs.role ?? null} />
                      </div>
                      <Field id="location" label="Location" optional auto="address-level2" v={d.location} set={(v) => setDF("location", v)} ph="City, State" />
                    </div>
                    <p className="as-foot">We never sell your information. Our <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> explains how we handle it.</p>
                    {sendErr && <p className="as-err" role="alert">{sendErr}</p>}
                    <div className="as-nav">
                      <button type="button" className="as-b2" onClick={() => go("c")}>Back</button>
                      <button type="submit" className="as-b1" disabled={sending}>{sending ? "Sending" : "Send My Report"}</button>
                    </div>
                  </form>
                </div>
              )}

              {step === "done" && result && (
                <div className="as-done">
                  <div className="qx-lab">Sent</div>
                  <h1 className="qx-d2"><Words text="Your Report Is On Its Way" /></h1>
                  <p className="qx-body">Your Structural Pattern Report has been sent to <b>{sentTo}</b>. It should arrive within two minutes. If it does not, check your spam folder.</p>

                  {result.brief_url && (
                    <section className="as-inv">
                      <div className="qx-lab">One more step, if you want the numbers</div>
                      <h2 className="qx-d3">Put a Number on What This Is Costing</h2>
                      <p className="qx-body">Your report shows where the gaps are. The Extended Operator Brief puts numbers on them, from your own figures: where the company stands against break-even and its profit target, what leadership time spent managing costs, and the annual cost of the current structure in {result.top_os_name} and {result.second_os_name}. It takes about 10 minutes and builds on what you already answered.</p>
                      <div className="cta">
                        <a className="as-b1" href={result.brief_url}>Continue to the Extended Operator Brief</a>
                      </div>
                      <p className="as-sub">You can also <a href={CALENDLY} target="_blank" rel="noopener">book a qualification conversation</a> now and come back to the brief later.</p>
                    </section>
                  )}

                  <p className="as-sub">Your report also appears below. Scroll to read it.</p>
                  <ReportFrame url={result.report_url} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Page>
  );
}

function Field({ id, label, v, set, err, type = "text", auto, ph, optional }: { id: string; label: string; v: string; set: (v: string) => void; err?: string | null; type?: string; auto?: string; ph?: string; optional?: boolean }) {
  return (
    <div className="as-field">
      <label htmlFor={id}>{label}{optional && <em> Optional</em>}</label>
      <input id={id} className="as-in" type={type} autoComplete={auto} placeholder={ph} value={v} onChange={(e) => set(e.target.value)} aria-invalid={!!err} />
      <Err msg={err ?? null} />
    </div>
  );
}

// ============================================================
// LANDING (FRAMES section 1)
// ============================================================

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <Page nav="dark">
      <section className="qx-ink pg-hero">
        <div className="wrap">
          <div className="qx-lab">Structural Diagnostic</div>
          <h1 className="qx-d2"><Words text="Where Is Your Company Under-Architected?" delay={0.1} /></h1>
          <motion.p className="lead" initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>
            Running a company takes operating, managing, and leading. This 6 to 9 minute diagnostic shows where managing is consuming the time leadership should spend leading, across Strategy, Platform, Operations, and Growth.
          </motion.p>
          <motion.div className="as-hcta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <button className="b1" onClick={onStart}>Start the Diagnostic</button>
          </motion.div>
        </div>
      </section>
      <section className="qx-paper sec tight">
        <div className="wrap">
          <div className="as-land">
            {[
              ["What you will receive", "A Structural Pattern Report that ranks the four operating systems by structural gap, analyzes the two creating the most drag, shows the answers that drove each finding, and reflects back what you said would change if they were resolved."],
              ["Who this is for", "Owners, founders, and executives of established companies whose operations have outgrown the way they are run: where the numbers take effort to assemble, commitments live in people's memory, and leadership spends its week managing."],
              ["Before you start", "The diagnostic takes 6 to 9 minutes. Answer for how the company runs today, not how you plan for it to run. Honest answers produce a useful report; there is no advantage in presenting the company as more or less structured than it is."],
            ].map(([k, t], i) => (
              <motion.div key={k} className="cd mx-glow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease }}>
                <div className="k">{k}</div>
                <p>{t}</p>
              </motion.div>
            ))}
          </div>
          <div className="as-lcta"><button className="as-b1" onClick={onStart}>Begin the Diagnostic</button></div>
        </div>
      </section>
    </Page>
  );
}
