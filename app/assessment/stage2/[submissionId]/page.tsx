// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 Extended Operator Brief - Wizard
// Source: ASSESSMENT STAGE 2 QUESTION BANK; ASSESSMENT FRAMES AND TRANSITIONS (sections 10 to 14)
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Page, Words, ease } from "@/components/site/kit";
import { activeS2, S2_SECTIONS, type S2Answers } from "@/lib/stage2/questions";
import type { OperatingSystem } from "@/lib/stage1/types";
import { Choice, Err, ReportFrame } from "../../ui";
import "../../assessment.css";

type Step = 1 | 2 | 3 | 4;
const CALENDLY = "https://calendly.com/quantonlabs/30min";
const REQUIRED = "This one is required to move forward. Choose what comes closest to how the company runs today.";

interface Ctx {
  focus: OperatingSystem[];
  focus_names: string[];
  first_name: string;
  company: string;
}

export default function Stage2Page() {
  const id = String(useParams().submissionId ?? "");
  const [state, setState] = useState<"loading" | "na" | "ready" | "done">("loading");
  const [ctx, setCtx] = useState<Ctx | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<S2Answers>({});
  const [err, setErr] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ position: string; leadership_time: string | null } | null>(null);
  const [exitOpen, setExitOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState<string | null>(null);
  const [briefUrl, setBriefUrl] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");
  const saveTimer = useRef<number | undefined>(undefined);

  // Entry: gate plus saved progress
  useEffect(() => {
    fetch(`/api/assessment/stage2/context?id=${encodeURIComponent(id)}`)
      .then(async (r) => ({ ok: r.ok, d: await r.json().catch(() => ({})) }))
      .then(({ ok, d }) => {
        if (!ok || !d.available) return setState("na");
        setCtx({ focus: d.focus, focus_names: d.focus_names, first_name: d.first_name, company: d.company });
        setAnswers(d.answers ?? {});
        setStep(d.step ?? 1);
        setIndex(d.index ?? 0);
        setState("ready");
      })
      .catch(() => setState("na"));
  }, [id]);

  const items = useMemo(() => (ctx ? activeS2(ctx.focus, answers) : []), [ctx, answers]);
  const sectionItems = useMemo(() => items.filter((q) => q.section === step), [items, step]);
  const q = step < 4 ? sectionItems[Math.min(index, sectionItems.length - 1)] : undefined;
  const value = q ? answers[q.id] ?? q.defaultValue ?? "" : "";

  const save = useCallback(
    (next: { step: Step; index: number; answers: S2Answers }, immediate = false) => {
      window.clearTimeout(saveTimer.current);
      const run = () =>
        fetch("/api/assessment/stage2/progress", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...next }) })
          .then((r) => r.json())
          .then((d) => d.preview && setPreview(d.preview))
          .catch(() => undefined);
      if (immediate) run();
      else saveTimer.current = window.setTimeout(run, 400);
    },
    [id]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, index, state]);

  const goTo = (s: Step, i: number, a = answers) => {
    setErr(null);
    setStep(s);
    setIndex(i);
    save({ step: s, index: i, answers: a }, s === 4);
  };

  const valid = (v: string) => {
    if (!q) return true;
    if (q.kind === "choice") return q.options!.some((o) => o.key === v);
    if (q.kind === "number") return v.trim() !== "" && Number.isFinite(Number(v)) && Number(v) >= (q.min ?? 0) && Number(v) <= (q.max ?? Infinity);
    if (!v.trim()) return !!q.optional;
    return v.trim().length >= (q.min ?? 0) && v.length <= (q.max ?? Infinity);
  };

  const next = (a = answers) => {
    if (!q) return;
    const v = a[q.id] ?? q.defaultValue ?? "";
    if (!valid(v)) return setErr(q.kind === "text" && q.min ? `A few words are needed here: at least ${q.min} characters.` : REQUIRED);
    const filled = { ...a, [q.id]: v };
    setAnswers(filled);
    const list = activeS2(ctx!.focus, filled).filter((x) => x.section === step);
    const pos = list.findIndex((x) => x.id === q.id);
    if (pos + 1 < list.length) goTo(step, pos + 1, filled);
    else goTo((step + 1) as Step, 0, filled);
  };

  const back = () => {
    if (index > 0) return goTo(step, index - 1);
    if (step > 1) {
      const prev = (step - 1) as Step;
      goTo(prev, Math.max(0, items.filter((x) => x.section === prev).length - 1));
    }
  };

  const choose = (key: string) => {
    const a = { ...answers, [q!.id]: key };
    setAnswers(a);
    setErr(null);
    window.setTimeout(() => next(a), 220);
  };

  const submit = async () => {
    if (sending) return;
    setSending(true);
    setSendErr(null);
    try {
      const r = await fetch("/api/assessment/stage2", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, answers }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(typeof d.error === "string" && d.error.length < 160 ? d.error : "Something went wrong sending the brief.");
      setBriefUrl(d.brief_url);
      setSentTo(d.sent_to ?? "");
      setState("done");
    } catch (e) {
      setSendErr(e instanceof Error ? e.message : "Something went wrong sending the brief.");
    } finally {
      setSending(false);
    }
  };

  // ---------- states ----------
  if (state === "loading") return <Page nav="paper"><div className="as qx-paper" aria-busy="true" /></Page>;

  if (state === "na")
    return (
      <Page nav="paper">
        <div className="as qx-paper">
          <div className="wrap as-body">
            <p className="as-na">This link is not active. If you completed the diagnostic, use the link in your report email, or contact <a href="mailto:growth@quantonlabs.com">growth@quantonlabs.com</a>.</p>
          </div>
        </div>
      </Page>
    );

  const sec = S2_SECTIONS[step];
  const done = state === "done";
  const answeredBefore = items.filter((x) => x.section < step).length + (step < 4 ? index : 0);
  const progress = done ? 100 : Math.min(96, 4 + (answeredBefore / Math.max(1, items.length)) * 88);

  return (
    <Page nav="paper">
      <div className="as qx-paper">
        {!done && (
          <div className="as-track" aria-live="polite">
            <div className="wrap">
              <div className="row">
                <span className="lab">{sec.tracker}</span>
                <button className="as-exit" onClick={() => setExitOpen(true)}>Exit</button>
              </div>
              <div className="bar"><motion.i animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease }} /></div>
            </div>
          </div>
        )}

        <div className="wrap as-body">
          <AnimatePresence mode="wait">
            <motion.div key={done ? "done" : `${step}-${index}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease }}>
              {!done && index === 0 && <p className="as-intro">{sec.intro}</p>}

              {!done && q && (
                <div className="as-q solo">
                  <div className="as-count">{index + 1} of {sectionItems.length}</div>
                  {q.kind === "choice" ? (
                    <fieldset className="as-q">
                      <legend className="big">{q.text}</legend>
                      <div className="as-list">{q.options!.map((o) => <Choice key={o.key} name={q.id} label={o.label} checked={value === o.key} onChange={() => choose(o.key)} />)}</div>
                    </fieldset>
                  ) : (
                    <>
                      <label className="as-legend big" htmlFor={q.id}>{q.text}{q.optional && <em> Optional</em>}</label>
                      {q.kind === "number" ? (
                        <div className="as-num">
                          {q.id === "N.Rate" && <span className="pre">$</span>}
                          <input id={q.id} className="as-in" type="number" inputMode="numeric" min={q.min} max={q.max} value={value} onChange={(e) => { setAnswers({ ...answers, [q.id]: e.target.value }); setErr(null); }} onKeyDown={(e) => e.key === "Enter" && next()} />
                        </div>
                      ) : (
                        <>
                          <textarea id={q.id} className="as-in" rows={4} maxLength={q.max} value={value} onChange={(e) => { setAnswers({ ...answers, [q.id]: e.target.value }); setErr(null); }} />
                          <div className="as-chars">{value.length} / {q.max}</div>
                        </>
                      )}
                    </>
                  )}
                  <Err msg={err} />
                  <div className="as-nav">
                    {step > 1 || index > 0 ? <button className="as-b2" onClick={back}>Back</button> : <span />}
                    {(q.kind !== "choice" || value) && <button className="as-b1" onClick={() => next()}>{q.kind === "text" && q.optional && !value.trim() ? "Skip" : "Continue"}</button>}
                  </div>
                </div>
              )}

              {!done && step === 4 && (
                <div className="as-d">
                  <section className="as-prev">
                    <div className="qx-lab" style={{ color: "rgba(255,255,255,.62)" }}>You put honest numbers on how the company runs.</div>
                    <p className="qx-body" style={{ marginTop: 16 }}>Your brief sets out where the company stands against break-even and its profit target, what the current structure costs each year, and what one logical next step looks like.</p>
                    {preview ? (
                      <div className="as-pv">
                        <p>{preview.position}</p>
                        {preview.leadership_time && <div className="fig"><span className="k">Leadership time spent managing, per year</span><span className="v">{preview.leadership_time}</span></div>}
                      </div>
                    ) : (
                      <div className="as-pv" aria-busy="true" />
                    )}
                  </section>
                  {sendErr && <p className="as-err" role="alert">{sendErr}</p>}
                  <div className="as-nav">
                    <button className="as-b2" onClick={back}>Back</button>
                    <button className="as-b1" onClick={submit} disabled={sending}>{sending ? "Sending" : "Send My Extended Operator Brief"}</button>
                  </div>
                </div>
              )}

              {done && briefUrl && (
                <div className="as-done">
                  <div className="qx-lab">Sent</div>
                  <h1 className="qx-d2"><Words text="Your Extended Operator Brief Is On Its Way" /></h1>
                  <p className="qx-body">It has been sent to <b>{sentTo}</b> and appears below. If the email does not arrive within two minutes, check your spam folder.</p>
                  <ReportFrame url={briefUrl} title="Extended Operator Brief" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {exitOpen && (
          <div className="as-modal" role="dialog" aria-modal="true" aria-labelledby="exit-h" onClick={(e) => e.target === e.currentTarget && setExitOpen(false)}>
            <div className="box">
              <h2 id="exit-h" className="qx-d3">Leave for now?</h2>
              <p className="qx-body">Your answers are saved. Use the link in your report email to come back to this step.</p>
              <div className="as-nav">
                <button className="as-b2" onClick={() => setExitOpen(false)}>Keep Going</button>
                <a className="as-b1" href={CALENDLY} target="_blank" rel="noopener">Book a Conversation Instead</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
