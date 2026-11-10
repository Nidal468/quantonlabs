"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { usePinned } from "@/components/site/useStage";
import "@/components/site/site.css";
import "./about.css";

const fade = { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.06 } }, exit: { opacity: 0, y: -5, transition: { duration: 0.16 } } };
const rise = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -12% 0px" }, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as const } };

/** Progress of a tall pinned section, as React state. */
function useProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [v, setV] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (x) => setV(x));
  return v;
}

/* A. Hero: one photograph, one sentence */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const o = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  return (
    <section ref={ref} className="h2-hero">
      <motion.div className="img" style={{ scale, y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/site/photo/hero-sparks.jpg" alt="A fabricator cutting steel in a dark shop" />
      </motion.div>
      <div className="shade" />
      <motion.div className="cn" style={{ opacity: o }}>
        <div className="wrap gr">
          <div>
            <div className="qx-lab">About Quanton Labs</div>
            <motion.h1 className="qx-d1" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>
              Quanton Labs builds the system that runs the company.
            </motion.h1>
          </div>
          <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
            Quanton OS carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

/* B. Statement: the sentence fills in as the reader scrolls */
const SAY = "Running a company takes three kinds of work: operating it, managing it, and leading it. Managing carries the hidden load. Leadership carries it through reports, meetings, chasing, and memory, and leading gets whatever time is left.";
function Statement() {
  const ref = useRef<HTMLElement>(null);
  const pinned = usePinned();
  const p = useProgress(ref);
  const words = SAY.split(" ");
  const lit = pinned ? Math.round(Math.min(1, Math.max(0, (p - 0.08) / 0.72)) * words.length) : words.length;
  return (
    <section ref={ref} className={`qx-paper stage h2-say${pinned ? "" : " free"}`}>
      <div className="pin"><div className="wrap" style={{ width: "100%" }}>
        <div className="qx-lab"><b>01</b> The work</div>
        <p className="txt">{words.map((w, i) => <span key={i} style={{ color: i < lit ? "var(--qx-text)" : "#c2c7ce" }}>{w}{i < words.length - 1 ? " " : ""}</span>)}</p>
      </div></div>
    </section>
  );
}

/* C. The product moment: departments go live */
const DEPTS = [
  { k: "Sales", wait: "Quote Q-1188 waiting on a call back", live: "Lead routed in 4 minutes. Quote drafted from the cost database.", n: 4 },
  { k: "Customer Experience", wait: "Six inquiries unanswered since Friday", live: "Inquiries routed. Status updates sent from approved templates.", n: 3 },
  { k: "Operations", wait: "Tomorrow's schedule built by hand tonight", live: "43 jobs scheduled. Two at risk, flagged with cause and owner.", n: 3 },
  { k: "Inventory", wait: "Stock count disagrees with the shelf", live: "4 SKUs reserved against the order. Reorder under threshold.", n: 3 },
  { k: "Finance", wait: "Close running three weeks behind", live: "84 transactions coded. Close day 3 of 5, on track.", n: 4 },
  { k: "People", wait: "Timesheets chased one by one", live: "Payroll computed for 14. Certifications tracked with act-by dates.", n: 3 },
  { k: "Marketing", wait: "Listings out of date, no calendar", live: "14 pieces queued. Warm signal handed to Sales.", n: 2 },
];
function Board() {
  const ref = useRef<HTMLElement>(null);
  const pinned = usePinned();
  const p = useProgress(ref);
  const live = pinned ? Math.max(0, Math.min(DEPTS.length, Math.floor((p - 0.1) / 0.085) + 1)) : DEPTS.length;
  const shown = pinned && p < 0.1 ? 0 : live;
  return (
    <section ref={ref} className={`qx-ink stage h2-board${pinned ? "" : " free"}`}>
      <div className="pin"><div className="wrap gr">
        <div>
          <div className="qx-lab"><b>02</b> The system</div>
          <h2 className="qx-d2" style={{ marginTop: 28 }}>Quanton OS carries operating and managing as a system.</h2>
          <p className="qx-body" style={{ marginTop: 28, maxWidth: "36ch" }}>Each department runs inside the approval levels leadership sets. Anything that needs a decision reaches the right person with the analysis already done.</p>
        </div>
        <div className="bd" aria-label="Illustrative department view">
          <div className="top"><b>Leadership Dashboard</b><span>Departments · illustrative</span></div>
          <div className="grid">
            {DEPTS.map((d, i) => {
              const on = i < shown;
              return (
                <div key={d.k} className={`dep${on ? " on" : ""}`}>
                  <div className="h">{d.k}
                    <AnimatePresence mode="wait"><motion.span key={on ? "a" : "b"} className="s" {...fade}><i />{on ? "Running" : "Waiting"}</motion.span></AnimatePresence>
                  </div>
                  <AnimatePresence mode="wait"><motion.div key={on ? "a" : "b"} className="t" {...fade}>{on ? d.live : d.wait}</motion.div></AnimatePresence>
                </div>
              );
            })}
            <div className="dep dec">
              <div className="h">Governing Agent<span className="s"><i />Routed</span></div>
              <div className="t">Hartwell Group start date: 490 crew hours short. Three options routed to the President.</div>
            </div>
          </div>
          <div className="ft"><span>Every action carries its approval level</span><span>Illustrative data</span></div>
        </div>
      </div></div>
    </section>
  );
}

/* D. The record */
function Record() {
  const ph = useRef<HTMLDivElement>(null);
  const inView = useInView(ph, { once: true, margin: "0px 0px -20% 0px" });
  return (
    <section className="qx-paper h2-rec">
      <div className="wrap gr">
        <motion.div ref={ph} className="ph" initial={{ clipPath: "inset(14% 14% 14% 14% round 6px)" }} animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 6px)" } : {}} transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/site/photo/shop-hands.jpg" alt="A technician's hands working on an engine" />
        </motion.div>
        <motion.div {...rise}>
          <div className="qx-lab"><b>03</b> The record</div>
          <h2 className="qx-d2" style={{ marginTop: 28 }}>Every transaction on one record the company owns.</h2>
          <p className="qx-body" style={{ marginTop: 24, maxWidth: "44ch" }}>Bids and purchasing through payroll and the month-end close write to the same record. The client owns the delivered operational core and all of its data outright.</p>
          <div className="facts">
            <div className="fact"><b>One record</b><span>Every transaction, document, and obligation in one place.</span></div>
            <div className="fact"><b>Computed figures</b><span>Code computes every number. A model never produces one.</span></div>
            <div className="fact"><b>Owned outright</b><span>The operational core belongs to the client on completion and payment.</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* E. The rules: a quiet mosaic */
const RULES = [
  { n: "Full Autonomy", df: "The agent acts without review.", it: { t: "Ledger posting", s: "Done 09:02", m: "84 transactions coded" }, kind: "done" },
  { n: "Silent Approval", df: "The agent prepares and queues the action. It proceeds after a review window unless leadership steps in.", it: { t: "Follow-up, Meridian Logistics", s: "Sends in 18:42", m: "Approved template, day 3" }, kind: "wait" },
  { n: "Hard Block", df: "The agent prepares and presents. Nothing happens until leadership explicitly approves.", it: { t: "Quote Q-1188, Pinecrest", s: "$38,400", m: "36.2% margin, computed from the record" }, kind: "act" },
  { n: "Fixed for every client", df: "Obligations always wait for explicit approval. An outbound output that breaks a business rule always goes to a person.", it: { t: "License renewal", s: "Act-by Fri", m: "Owner: Operations lead" }, kind: "act" },
];
function Rules() {
  return (
    <section className="qx-paper h2-rules">
      <div className="wrap">
        <div className="hd">
          <motion.div {...rise}><div className="qx-lab"><b>04</b> The rules</div><h2 className="qx-d2" style={{ marginTop: 28 }}>Work runs inside the rules leadership sets.</h2></motion.div>
          <motion.p className="qx-body" {...rise}>Every action carries an approval level, enforced in the system at the point of action. Agents cannot change their own governance settings.</motion.p>
        </div>
        <div className="mo">
          {RULES.map((r, i) => (
            <motion.div key={r.n} className="tile" {...rise} transition={{ ...rise.transition, delay: i * 0.08 }}>
              <span className="n">0{i + 1}</span>
              <h3 className="qx-d3">{r.n}</h3>
              <p className="df">{r.df}</p>
              <div className="it">
                <div className="r">{r.it.t}<span>{r.it.s}</span></div>
                <div className="m">{r.it.m}</div>
                {r.kind === "wait" && <div className="bar"><i /></div>}
                {r.kind === "act" && <div className="a"><span className="p">Approve</span><span>Edit</span><span>Decline</span></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* F + G. The model */
function Model() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <>
      <section ref={ref} className="h2-band">
        <motion.div className="img" style={{ y }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/site/photo/warehouse.jpg" alt="A forklift moving stock through a timber warehouse" />
        </motion.div>
        <div className="shade" />
        <div className="cn"><div className="wrap">
          <motion.div {...rise}>
            <div className="qx-lab" style={{ color: "rgba(255,255,255,.7)" }}><b style={{ color: "#fff" }}>05</b> The model</div>
            <h2 className="qx-d1" style={{ marginTop: 28 }}>The consulting firm that stays.</h2>
            <p className="qx-body">Quanton OS gives a leadership team what a consulting firm would, every day instead of once a year, and stays to run it.</p>
          </motion.div>
        </div></div>
      </section>
      <section className="qx-ink h2-ph">
        <div className="wrap">
          {[
            ["Phase 1", "Discovery and Diagnostic", "Operations mapped, books checked, baseline captured, and a Diagnostic Report the client owns regardless of what it decides next.", "Two weeks for a base footprint"],
            ["Phase 2", "Infrastructure Deployment", "The operational core built and records migrated. Departments go live with their approval levels configured.", "8 to 16 weeks for most footprints"],
            ["Phase 3", "Managed Services", "Quanton Labs runs and improves the system, with quarterly reviews against the baseline.", "Ongoing"],
          ].map((r) => (
            <motion.div key={r[0]} className="row" {...rise}>
              <span className="n">{r[0]}</span><h3 className="qx-d3">{r[1]}</h3><p className="t">{r[2]}</p><span className="tm">{r[3]}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

/* H. Leadership */
const CH = [
  { n: "Rental", h: "A standard that depends on presence is not a standard.", p: "Running a $1.5M-a-month rental operation, he grew revenue 300% in his first year. Upsell discipline, fleet utilization, KPIs every branch reported against, and customer service built into the process did the work. Every rule in Quanton OS is enforced the same way.", f: ["300%", "first-year revenue growth"] },
  { n: "Lending", h: "Controls that live in site visits fail between them.", p: "He took over a lending region carrying $400K in losses from thin oversight, missing systems, and fraud. KPIs, training, and compliance went into every branch, and revenue came from process instead of pressure. The region grew by more than $12M. The approval gates in Quanton OS come from that region.", f: ["$12M+", "regional growth after $400K in losses"] },
  { n: "Automotive", h: "An owner who is the system caps the business at his own hours.", p: "He built an automotive facility from zero to $1.9M. Pricing, scheduling, quality, and hiring ran through him, and the business grew as far as his hours allowed. Quanton OS carries the managing work so the owner's hours stop being the ceiling.", f: ["$1.9M", "built from zero"] },
  { n: "Consulting", h: "A diagnosis lasts as long as the consultant stays.", p: "As a consulting project director he found the same gap inside other owners' businesses: a succession after an owner's death, a founder handing the business to family, operating knowledge held by one or two people. At one manufacturer the diagnostic became a Quanton OS deployment that stayed. Over the trailing twelve months to April 2026, gross margin rose from 43.8% to 48.0% and operating profit went from $115K to $316K.", f: ["48.0%", "gross margin, up from 43.8%"] },
];
function Leadership() {
  const fig = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: fig, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  return (
    <section className="qx-paper h2-lead">
      <div className="wrap">
        <motion.div {...rise}>
          <div className="qx-lab"><b>06</b> Leadership</div>
          <h2 className="qx-d2" style={{ marginTop: 28, maxWidth: "18ch" }}>Each part of Quanton OS answers a problem solved by hand first.</h2>
          <p className="intro">Ryan Remington built Quanton OS from what worked across 25 locations, his own business, and $68M in combined revenue growth.</p>
        </motion.div>
        <div className="gr">
          <figure ref={fig} className="ph" style={{ position: "sticky" }}>
            <motion.img src="/images/site/founder-bw.jpg" alt="Ryan Remington, Founder and Managing Director of Quanton Labs" style={{ y }} />
            <figcaption><b>Ryan Remington</b><span>Founder and Managing Director</span></figcaption>
          </figure>
          <div>
            {CH.map((c, i) => (
              <motion.div key={c.n} className="ch2" {...rise}>
                <span className="n">0{i + 1} · {c.n}</span>
                <h3 className="qx-d3">{c.h}</h3>
                <p>{c.p}</p>
                <div className="f"><strong>{c.f[0]}</strong><span>{c.f[1]}</span></div>
              </motion.div>
            ))}
            <dl className="cred2"><dt>Education</dt><dd>MBA, The Citadel<br />B.A., Organizational Leadership and Communication, Marist College</dd><dt>Service</dt><dd>Veteran</dd><dt>Languages</dt><dd>English, Spanish</dd></dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* I. Close */
function Close() {
  return (
    <section className="h2-close">
      <div className="img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/site/photo/crew.jpg" alt="A crew working on a site" />
      </div>
      <div className="shade" />
      <div className="cn"><div className="wrap gr">
        <motion.div {...rise}>
          <h2 className="qx-d2">See where the operation stands.</h2>
          <p className="qx-body" style={{ marginTop: 20, color: "rgba(255,255,255,.75)", maxWidth: "46ch" }}>A short assessment of how the business runs today, with a structural read of where operating and managing are consuming the people who should be leading.</p>
        </motion.div>
        <div className="cta">
          <Link className="b1" href="/assessment">Start the assessment</Link>
          <a className="b2" href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noreferrer">Book a discovery call</a>
        </div>
      </div></div>
    </section>
  );
}

export default function AboutClient() {
  return (
    <div className="qx ab2">
      <SiteNav theme="overlay" />
      <main>
        <Hero />
        <Statement />
        <Board />
        <Record />
        <Rules />
        <Model />
        <Leadership />
        <Close />
      </main>
      <SiteFooter />
    </div>
  );
}
