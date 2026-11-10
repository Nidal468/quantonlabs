"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { usePinned } from "@/components/site/useStage";
import type { Gate, SolutionData } from "@/content/solutions/types";
import type { SolutionExtras } from "@/content/solutions/extras";
import "@/components/site/site.css";
import "./solution.css";

const ease = [0.2, 0.7, 0.2, 1] as const;
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -12% 0px" }, transition: { duration: 0.8, ease } };
const GATE: Record<Gate, string> = { fa: "Full Autonomy", sa: "Silent Approval", hb: "Hard Block", ga: "Routed", held: "Held" };

function useProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [v, setV] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (x) => setV(x));
  return v;
}

function Hero({ d, x }: { d: SolutionData; x: SolutionExtras }) {
  return (
    <section className={`qx-ink sx-hero${x.flip ? " flip" : ""}`}>
      <div className="wrap">
        <div className="gr">
          <div className="tx">
            <motion.div className="qx-lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>Solutions · {d.name}</motion.div>
            <motion.h1 className="qx-d2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>{d.hero.h1}</motion.h1>
            <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>{d.hero.lead}</motion.p>
            <motion.p className="for" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}><span>Built for</span>{d.hero.builtFor}</motion.p>
          </div>
          <motion.figure className="ph" data-credit={d.hero.photo.credit} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }}>
            <Image src={d.hero.photo.src} alt={d.hero.photo.alt} fill priority sizes="(max-width: 900px) 100vw, 40vw" />
          </motion.figure>
        </div>
        <dl className="gets">
          {d.gets.map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}>
              <dt>{k}</dt><dd>{v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Breaks({ d, x }: { d: SolutionData; x: SolutionExtras }) {
  return (
    <section className={`qx-paper sx-brk ${x.breaks}`}>
      <div className="wrap">
        <motion.div className="hd" {...rise}>
          <div><div className="qx-lab"><b>01</b> Where the margin goes</div><h2 className="qx-d2">{d.breaks.h2}</h2></div>
          <p className="qx-body">{d.breaks.lead}</p>
        </motion.div>
        <div className="cards">
          {d.breaks.cards.map(([a, b, fig, find, cons, src], i) => (
            <motion.article key={i} className="cd" {...rise} transition={{ ...rise.transition, delay: i * 0.08 }}>
              <div className="pth"><span>{a}</span><i /><span>{b}</span></div>
              <div className="fig">{fig}</div>
              <p className="find">{find}</p>
              <p className="cons">{cons}</p>
              <p className="src">{src}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof({ d }: { d: SolutionData }) {
  if (!d.proof) return null;
  const p = d.proof;
  return (
    <section className="qx-ink sx-proof">
      <div className="wrap">
        <motion.div className="hd" {...rise}>
          <div className="qx-lab"><b>02</b> {p.eyebrow}</div>
          <h2 className="qx-d2">{p.h2}</h2>
          <p className="qx-body">{p.lead}</p>
        </motion.div>
        <div className="figs">
          {p.figures.map(([f, l], i) => (
            <motion.div key={l} className="f" {...rise} transition={{ ...rise.transition, delay: i * 0.1 }}>
              <strong>{f}</strong><span>{l}</span>
            </motion.div>
          ))}
        </div>
        {p.items && (
          <motion.div className="items" {...rise}>
            {p.itemsHead && <div className="ih">{p.itemsHead}</div>}
            <ul>{p.items.map(([b, r]) => <li key={b}><b>{b}</b> {r}</li>)}</ul>
          </motion.div>
        )}
        <p className="note">{p.note}</p>
      </div>
    </section>
  );
}

function Trace({ d, n, x }: { d: SolutionData; n: string; x: SolutionExtras }) {
  const ref = useRef<HTMLElement>(null);
  const pinned = usePinned();
  const p = useProgress(ref);
  const t = d.trace;
  const last = t.steps.length - 1;
  const at = pinned ? Math.max(-1, Math.min(last, Math.floor((p - 0.06) / (0.84 / t.steps.length)))) : last;
  const vals: Record<string, string> = { ...t.start };
  const changed = new Set<string>();
  t.steps.forEach((s, i) => {
    if (i <= at && s.set) Object.entries(s.set).forEach(([k, v]) => { vals[k] = v; if (i === at) changed.add(k); });
  });
  const cur = at >= 0 ? t.steps[at] : null;
  const decision = t.steps.find((s) => s.note);
  const decisionAt = decision ? t.steps.indexOf(decision) : -1;
  return (
    <section ref={ref} className={`qx-paper sx-trace${pinned ? "" : " free"}${x.traceFlip ? " flip" : ""}`} style={{ height: pinned ? `${100 + t.steps.length * 34}vh` : undefined }}>
      <div className="pin"><div className="wrap gr">
        <div className="lf">
          <div className="qx-lab"><b>{n}</b> One {t.noun} through the system</div>
          <h2 className="qx-d3">{t.h2}</h2>
          <p className="qx-body">{t.lead}</p>
          <ol className="steps">
            {t.steps.map((s, i) => (
              <li key={i} className={i === at ? "now" : i < at ? "done" : ""}>
                <span className="i">{String(i + 1).padStart(2, "0")}</span>
                <span className="dp">{s.dept}</span>
                <span className="ac">{s.act}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="card" aria-label={`Illustrative ${t.unit}`}>
          <div className="top"><b>{t.unit}</b><span>Illustrative</span></div>
          <div className="what">{t.what}</div>
          <dl className="fl">
            {t.fields.map((k) => (
              <div key={k} className={changed.has(k) ? "chg" : ""}>
                <dt>{k}</dt>
                <dd><AnimatePresence mode="wait"><motion.span key={vals[k]} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.08 } }} exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}>{vals[k]}</motion.span></AnimatePresence></dd>
              </div>
            ))}
          </dl>
          <div className="now">
            <AnimatePresence mode="wait">
              <motion.div key={at} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.08 } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                {cur ? (
                  <>
                    <div className="r"><b>{cur.dept}</b><span className={`gt ${cur.gate}`}>{cur.gateLabel ?? GATE[cur.gate]}</span></div>
                    <p>{cur.act}</p>
                  </>
                ) : <p className="idle">{t.idle}</p>}
              </motion.div>
            </AnimatePresence>
          </div>
          {decision && (
            <motion.div className="dec" initial={false} animate={{ opacity: at >= decisionAt ? 1 : 0, height: at >= decisionAt ? "auto" : 0 }} transition={{ duration: 0.45, ease }}>
              <span>Decision</span><p>{decision.note}</p>
            </motion.div>
          )}
          <motion.p className="end" initial={false} animate={{ opacity: at >= last ? 1 : 0, height: at >= last ? "auto" : 0 }} transition={{ duration: 0.4 }}>{t.end}</motion.p>
        </div>
      </div></div>
    </section>
  );
}

function Adds({ d, n }: { d: SolutionData; n: string }) {
  return (
    <section className="sx-adds">
      <div className="wrap">
        <motion.div {...rise}><div className="qx-lab"><b>{n}</b> Built for {d.name.toLowerCase()}</div><h2 className="qx-d2">{d.adds.h2}</h2></motion.div>
        <div className="cards">
          {d.adds.cards.map(([h, p], i) => (
            <motion.div key={h} className="cd" {...rise} transition={{ ...rise.transition, delay: i * 0.08 }}>
              <span className="cap">{h}</span><p>{p}</p>
            </motion.div>
          ))}
        </div>
        {d.adds.partner && <motion.p className="partner" {...rise}>{d.adds.partner}</motion.p>}
      </div>
    </section>
  );
}

function Faq({ d, x, n }: { d: SolutionData; x: SolutionExtras; n: string }) {
  return (
    <section className="qx-paper sx-faq">
      <div className="wrap gr">
        <motion.div {...rise}><div className="qx-lab"><b>{n}</b> Questions</div><h2 className="qx-d3">What {d.name.toLowerCase()} leaders ask first.</h2></motion.div>
        <div className="qs">
          {x.faq.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}<i /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Close({ d }: { d: SolutionData }) {
  return (
    <>
      <section className="qx-ink sx-close">
        <div className="wrap gr">
          <motion.div {...rise}>
            <h2 className="qx-d2">See where the operation stands.</h2>
            <p className="qx-body">A short assessment of how the business runs today, with a structural read of where operating and managing are consuming the people who should be leading.</p>
          </motion.div>
          <div className="cta">
            <Link className="b1" href="/assessment">Start the assessment</Link>
            <a className="b2" href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noreferrer">Book a discovery call</a>
          </div>
        </div>
      </section>
      <section className="qx-paper sx-src">
        <div className="wrap">
          <div className="qx-lab">Sources</div>
          <ol>
            {d.sources.map((s) => (
              <li key={s.href}>{s.text} <a href={s.href} target="_blank" rel="noreferrer">{s.host}</a></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export default function SolutionPage({ d, x }: { d: SolutionData; x: SolutionExtras }) {
  const traceN = d.proof ? "03" : "02";
  const addsN = d.proof ? "04" : "03";
  const faqN = d.proof ? "05" : "04";
  return (
    <div className="qx sx">
      <SiteNav theme="dark" />
      <main>
        <Hero d={d} x={x} />
        <Breaks d={d} x={x} />
        <Proof d={d} />
        <Trace d={d} n={traceN} x={x} />
        <Adds d={d} n={addsN} />
        <Faq d={d} x={x} n={faqN} />
        <Close d={d} />
      </main>
      <SiteFooter />
    </div>
  );
}
