"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Megaphone, Handshake, MessageSquareHeart, Users, Wrench, Package, Landmark, GitMerge } from "lucide-react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter, { CloseBox } from "@/components/site/SiteFooter";
import { useStage, useStep } from "@/components/site/useStage";
import "@/components/site/site.css";
import "./about.css";

const swap = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0, transition: { duration: 0.28, delay: 0.05 } }, exit: { opacity: 0, y: -6, transition: { duration: 0.18 } } };

/* ───────────── Hero: live activity across the system ───────────── */
const EVENTS: [string, string, string, string][] = [
  ["Sales", "Hartwell Group", "sale recorded, $142,000", "fa"],
  ["Inventory", "4 SKUs", "reserved against TXN-2041", "fa"],
  ["Finance", "INV-2041", "drafted, waiting for approval", "hb"],
  ["Customer Experience", "Hartwell kickoff", "queued from the sale record", "sa"],
  ["Governing Agent", "Capacity exception", "routed to the President", "ga"],
  ["Operations", "43 jobs", "scheduled, 91% on time", "fa"],
  ["People", "Payroll", "computed for 14 employees", "hb"],
  ["Inventory", "SKU-1042", "reorder under threshold", "sa"],
  ["Finance", "84 transactions", "coded and posted", "fa"],
  ["Marketing", "Acme Corp", "warm signal handed to Sales", "fa"],
  ["Customer Experience", "Meridian", "status update sent", "sa"],
  ["Finance", "Remittance", "posted, Meridian Logistics", "fa"],
  ["Operations", "Lift 2", "service scheduled from usage hours", "fa"],
  ["Sales", "Quote Q-1188", "waiting for approval", "hb"],
  ["People", "2 certifications", "act-by dates set", "fa"],
];
const GATE: Record<string, string> = { fa: "Full Autonomy", sa: "Silent Approval", hb: "Hard Block", ga: "Routed" };
const hhmmss = (d: Date) => d.toTimeString().slice(0, 8);

function Hero() {
  const [rows, setRows] = useState<{ id: number; t: string; e: (typeof EVENTS)[number] }[]>([]);
  const [clock, setClock] = useState("");
  useEffect(() => {
    const now = Date.now();
    const seed = setTimeout(() => {
      setRows(Array.from({ length: 11 }, (_, i) => ({ id: i, t: hhmmss(new Date(now - (11 - i) * 47000)), e: EVENTS[i % EVENTS.length] })).reverse());
      setClock(hhmmss(new Date()));
    }, 0);
    let n = 11;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = setInterval(() => setClock(hhmmss(new Date())), 1000);
    if (reduce) return () => { clearTimeout(seed); clearInterval(tick); };
    const feed = setInterval(() => {
      n += 1;
      setRows((r) => [{ id: n, t: hhmmss(new Date()), e: EVENTS[n % EVENTS.length] }, ...r].slice(0, 12));
    }, 2200);
    return () => { clearTimeout(seed); clearInterval(tick); clearInterval(feed); };
  }, []);
  return (
    <section className="ab-hero">
      <div>
        <div className="qx-ey">About Quanton Labs</div>
        <h1>Quanton Labs builds the system that <em>runs the company.</em></h1>
        <p className="lead">Quanton OS carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead. Quanton Labs builds it, runs it, and stays.</p>
        <div className="meta"><div><b>7</b>departments</div><div><b>1</b>system of record</div><div><b>3</b>approval levels</div></div>
      </div>
      <div className="qx-panel ab-feed" aria-label="Illustrative live activity across the system">
        <div className="qx-ph"><span className="t"><i className="qx-live" />Governing Agent · activity, every department</span><span className="m">{clock}</span></div>
        <div className="rows">
          <AnimatePresence initial={false}>
            {rows.map((r, i) => (
              <motion.div key={r.id} className={`ab-row${i === 0 ? " new" : ""}`} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}>
                <span className="ts">{r.t}</span>
                <span className="dp"><i />{r.e[0]}</span>
                <span className="ac"><b>{r.e[1]}</b> {r.e[2]}</span>
                <span className={`qx-gate ${r.e[3]}`}>{GATE[r.e[3]]}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="ft"><span>Illustrative data</span><span>Every action carries its approval level</span></div>
      </div>
    </section>
  );
}

/* ───────────── Chapter 1: who carries the work ───────────── */
const DEPTS = [
  { k: "Sales", I: Handshake, wait: "Quote Q-1188 waiting on a call back", live: "Lead routed in 4 minutes. Quote drafted from the cost database.", n: 4 },
  { k: "Customer Experience", I: MessageSquareHeart, wait: "Six inquiries unanswered since Friday", live: "Inquiries routed. Status updates sent from approved templates.", n: 3 },
  { k: "Operations", I: Wrench, wait: "Tomorrow's schedule built by hand tonight", live: "43 jobs scheduled. Two at risk, flagged with cause and owner.", n: 3 },
  { k: "Inventory", I: Package, wait: "Stock count disagrees with the shelf", live: "4 SKUs reserved against the order. Reorder under threshold.", n: 3 },
  { k: "Finance", I: Landmark, wait: "Close is three weeks behind", live: "84 transactions coded. Close day 3 of 5, reconciliations on track.", n: 4 },
  { k: "People", I: Users, wait: "Timesheets chased one by one", live: "Payroll computed for 14. Two certifications with act-by dates set.", n: 3 },
  { k: "Marketing", I: Megaphone, wait: "Listings out of date, no calendar", live: "14 pieces queued. Warm signal handed to Sales.", n: 2 },
];
const C1_CUTS = [0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.7];

function WorkChapter() {
  const ref = useRef<HTMLElement>(null);
  const { p, pinned } = useStage(ref);
  const step = useStep(p, C1_CUTS, pinned);
  const live = Math.min(step, DEPTS.length);
  const done = step >= C1_CUTS.length;
  const waiting = 1 + DEPTS.slice(live).reduce((a, d) => a + d.n, 0);
  const manOS = live >= 4, opOS = live >= 7;
  const words = [
    { w: "Leading.", who: "Leadership", os: false, hi: done },
    { w: "Managing.", who: manOS ? "Quanton OS" : "Leadership", os: manOS, hi: false },
    { w: "Operating.", who: opOS ? "Quanton OS" : "The team, chased by leadership", os: opOS, hi: false },
  ];
  return (
    <section ref={ref} className={`ab-stage ab-c1${pinned ? "" : " free"}`} id="work">
      <div className="ab-pin">
        <div className="gr">
          <div>
            <div className="qx-ey">The work</div>
            <div className="ab-words">
              {words.map((x, i) => (
                <div className="ab-word" key={x.w}>
                  <motion.div className="w" animate={{ color: x.hi ? "#c9cfff" : i > 0 && x.os ? "rgba(255,255,255,.32)" : "#ffffff" }} transition={{ duration: 0.5 }}>{x.w}</motion.div>
                  <div className="own">Carried by
                    <AnimatePresence mode="wait"><motion.span key={x.who} className={`who${x.os ? " os" : ""}`} {...swap}>{x.who}</motion.span></AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
            <div className="line">
              <AnimatePresence mode="wait">
                {done
                  ? <motion.span key="b" className="ab-swap" {...swap}><b>Quanton OS runs the company so its leadership can lead it.</b></motion.span>
                  : <motion.span key="a" className="ab-swap" {...swap}>Today leadership carries all three, and <b>leading gets whatever time is left.</b></motion.span>}
              </AnimatePresence>
            </div>
          </div>
          <div className="qx-panel ab-board" aria-label="Illustrative department board">
            <div className="top">
              <div>
                <div className="qx-tag">Leadership Dashboard · departments</div>
                <div className="count" style={{ marginTop: 10 }}>
                  <motion.strong animate={{ color: waiting <= 1 ? "#c9cfff" : "#f3c45c" }}>{waiting}</motion.strong>
                  <span>{waiting <= 1 ? "item waiting on leadership" : "items waiting on leadership"}</span>
                </div>
              </div>
              <span className="qx-tag">Illustrative</span>
            </div>
            <div className="ab-depts">
              {DEPTS.map((d, i) => {
                const on = i < live;
                return (
                  <div key={d.k} className={`ab-dep ${on ? "live" : "wait"}`}>
                    <div className="h"><span><d.I />{d.k}</span>
                      <AnimatePresence mode="wait"><motion.span key={on ? "l" : "w"} className="st" {...swap}><i />{on ? "Running" : "Waiting"}</motion.span></AnimatePresence>
                    </div>
                    <AnimatePresence mode="wait"><motion.div key={on ? "l" : "w"} className="tx" {...swap}>{on ? d.live : d.wait}</motion.div></AnimatePresence>
                  </div>
                );
              })}
              <div className={`ab-dep lead ${done ? "live" : "wait"}`}>
                <div className="h"><span><GitMerge />Governing Agent</span><span className="qx-gate hb">Decision</span></div>
                <div className="tx">Hartwell Group start date: 490 crew hours short. Three options routed to the President.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Chapter 2: one record ───────────── */
type Row = { ts: string; dp: string; rec: string; ref: string; amt: string; g: string; fx?: Partial<Record<"cash" | "ar" | "res" | "wait", number>> };
const LEDGER: Row[] = [
  { ts: "09:14:02", dp: "Sales", rec: "Sale recorded, Hartwell Group", ref: "J-2041", amt: "$142,000", g: "fa" },
  { ts: "09:14:09", dp: "Inventory", rec: "Stock reserved, 4 SKUs", ref: "TXN-2041", amt: "$18,600", g: "fa", fx: { res: 18.6 } },
  { ts: "09:14:41", dp: "Finance", rec: "Invoice drafted, net 30", ref: "INV-2041", amt: "$142,000", g: "hb", fx: { wait: 1 } },
  { ts: "09:15:10", dp: "Customer Experience", rec: "Kickoff scheduled", ref: "J-2041", amt: "", g: "sa" },
  { ts: "09:16:27", dp: "Governing Agent", rec: "Capacity exception routed", ref: "J-2041", amt: "", g: "ga", fx: { wait: 1 } },
  { ts: "09:21:05", dp: "People", rec: "Overtime eligibility checked", ref: "Crew of 14", amt: "", g: "fa" },
  { ts: "09:32:40", dp: "Inventory", rec: "Receipt matched, variance held", ref: "PO-7731", amt: "$9,840", g: "fa" },
  { ts: "09:40:12", dp: "Finance", rec: "Remittance posted, Meridian", ref: "INV-2017", amt: "$18,400", g: "fa", fx: { cash: 18.4, ar: -18.4 } },
];
const C2_CUTS = LEDGER.map((_, i) => 0.1 + i * 0.085);

function RecordChapter() {
  const ref = useRef<HTMLElement>(null);
  const { p, pinned } = useStage(ref);
  const shown = useStep(p, C2_CUTS, pinned);
  const k = { cash: 486, ar: 203, res: 48, wait: 0 };
  LEDGER.slice(0, shown).forEach((r) => Object.entries(r.fx || {}).forEach(([a, v]) => { k[a as keyof typeof k] += v as number; }));
  const money = (v: number) => `$${v.toFixed(v % 1 ? 1 : 0)}k`;
  const KP = [["Cash", money(k.cash), "operating"], ["Receivables", money(k.ar), "4 accounts 30+"], ["Stock reserved", money(k.res), "against open orders"], ["Waiting on approval", String(k.wait), "routed to the President"]];
  return (
    <section ref={ref} className={`ab-stage ab-c2${pinned ? "" : " free"}`} id="record">
      <div className="ab-pin">
        <div className="gr">
          <div>
            <div className="qx-ey">The record</div>
            <h2 className="ab-h2">Every transaction on one record the company owns.</h2>
            <p className="ab-p">Bids and purchasing through payroll and the month-end close write to the same record, and code computes every figure from it. The client owns the delivered operational core and all of its data outright.</p>
          </div>
          <div className="qx-panel ab-led" aria-label="Illustrative system of record">
            <div className="qx-ph"><span className="t"><i className="qx-live" />System of record · today</span><span className="m">{shown} of {LEDGER.length} records this hour</span></div>
            <div className="kpis">
              {KP.map(([a, v, d]) => (
                <div className="kpi" key={a}><div className="k">{a}</div>
                  <AnimatePresence mode="wait"><motion.div key={v} className="v" {...swap}>{v}</motion.div></AnimatePresence>
                  <div className="d">{d}</div></div>
              ))}
            </div>
            <table>
              <colgroup><col className="c1" /><col className="c2" /><col /><col className="c4" /><col className="c5" /><col className="c6" /></colgroup>
              <thead><tr><th>Time</th><th>Written by</th><th>Record</th><th>Ref</th><th className="r">Amount</th><th>Level</th></tr></thead>
              <tbody>
                {LEDGER.map((r, i) => (
                  <tr key={r.ts} className={i >= shown ? "pending" : i === shown - 1 ? "fresh" : ""}>
                    <td className="ts">{r.ts}</td><td className="dp">{r.dp}</td><td>{r.rec}</td><td className="ts">{r.ref}</td>
                    <td className="amt r">{r.amt || " "}</td><td><span className={`qx-gate ${r.g}`}>{GATE[r.g]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ft"><span>Illustrative data. Figures computed by the engines, never by a model.</span><span>Owned by the company</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Chapter 3: rules, horizontal ───────────── */
const RULES = [
  { c: "fa", lv: "Full Autonomy", df: "The agent acts without review.", item: { t: "Ledger posting", m: "84 transactions coded", s: "Done 09:02" }, ex: "Scheduled reports, internal notifications, data categorization, ledger postings the accounting rules already map." },
  { c: "sa", lv: "Silent Approval", df: "The agent prepares and queues the action. It proceeds after a review window unless leadership steps in.", item: { t: "Follow-up, Meridian Logistics", m: "Approved template, day 3", s: "Sends in 18:42" }, ex: "Draft content, scheduled follow-ups, template messages, purchase orders under a set threshold." },
  { c: "hb", lv: "Hard Block", df: "The agent prepares and presents. Nothing happens until leadership explicitly approves.", item: { t: "Quote Q-1188, Pinecrest", m: "$38,400 at 36.2% margin", s: "Waiting" }, ex: "Quotes, proposals, invoices, contracts, pricing changes, financial decisions, hiring." },
  { c: "fx", lv: "Fixed for every client", df: "Obligations always wait for explicit approval. An outbound output that breaks a business rule always goes to a person.", item: { t: "License renewal, contractor", m: "Act-by Friday, owner: Operations lead", s: "Waiting" }, ex: "Cannot be configured away." },
];

function RulesChapter() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { p, pinned } = useStage(ref);
  const [max, setMax] = useState(0);
  useLayoutEffect(() => {
    const m = () => setMax(track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0);
    m(); window.addEventListener("resize", m); return () => window.removeEventListener("resize", m);
  }, []);
  const x = useTransform(p, [0.1, 0.9], [0, -max]);
  const w = useTransform(p, [0.1, 0.9], ["0%", "100%"]);
  return (
    <section ref={ref} className={`ab-stage ab-c3${pinned ? "" : " free"}`} id="rules">
      <div className="ab-pin">
        <div className="hd">
          <div><div className="qx-ey">The rules</div><h2 className="ab-h2">Work runs inside the rules leadership sets.</h2></div>
          <p className="ab-p">Every action carries an approval level, enforced in the system at the point of action. Agents cannot change their own governance settings.</p>
        </div>
        <motion.div ref={track} className="ab-track" style={pinned ? { x } : undefined}>
          {RULES.map((r) => (
            <div key={r.lv} className={`qx-panel ab-rule ${r.c}`}>
              <div className="rh"><div className="lv">{r.lv}</div><div className="df">{r.df}</div></div>
              <div className="ab-item">
                <div className="r1"><b>{r.item.t}</b><span className={`qx-gate ${r.c === "fx" ? "hb" : r.c}`}>{r.item.s}</span></div>
                <div className="r2">{r.item.m}</div>
                {r.c === "sa" && <div className="bar"><i /></div>}
                {(r.c === "hb" || r.c === "fx") && <div className="acts"><span className="pr">Approve</span><span>Edit</span><span>Decline</span></div>}
              </div>
              <div className="ex">{r.ex}</div>
            </div>
          ))}
        </motion.div>
        {pinned && <div className="ab-prog"><motion.i style={{ width: w }} /></div>}
      </div>
    </section>
  );
}

/* ───────────── Chapter 4: the model ───────────── */
function Count({ to, pre = "", suf = "", dec = 0 }: { to: number; pre?: string; suf?: string; dec?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = animate(0, to, { duration: reduce ? 0 : 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <strong ref={ref}>{pre}{v.toFixed(dec)}{suf}</strong>;
}

function ModelChapter() {
  return (
    <section className="ab-c4" id="model">
      <div className="qx-wrap">
        <div className="hd">
          <div><div className="qx-ey">The model</div><h2 className="ab-h2">The consulting firm that stays.</h2></div>
          <p className="ab-p">Quanton OS gives a leadership team what a consulting firm would, every day instead of once a year, and stays to run it.</p>
        </div>
        <div className="ab-phases">
          <div><span className="n">PHASE 1</span><b>Discovery and Diagnostic</b><p>Operations mapped, books checked, baseline captured, and a Diagnostic Report the client owns.</p></div>
          <div><span className="n">PHASE 2</span><b>Infrastructure Deployment</b><p>The operational core built and records migrated. The client owns it on completion and payment.</p></div>
          <div><span className="n">PHASE 3</span><b>Managed Services</b><p>Quanton Labs runs and improves the system, with quarterly reviews against the baseline.</p></div>
        </div>
        <div className="ab-figs">
          <div className="ab-fig"><Count to={68} pre="$" suf="M" /><span>combined revenue growth led across rental, lending, and an owned business</span></div>
          <div className="ab-fig"><Count to={25} /><span>locations led across vehicle rental and consumer lending</span></div>
          <div className="ab-fig"><Count to={300} suf="%" /><span>first-year revenue growth on a $1.5M-a-month operation</span></div>
          <div className="ab-fig"><Count to={4.2} pre="+" suf=" pts" dec={1} /><span>gross margin at a manufacturer after the diagnostic became a deployment</span></div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Chapter 5: leadership ───────────── */
const CHAPTERS = [
  { ix: "01 · Rental", h: "A standard that depends on presence is not a standard.", p: "Running a $1.5M-a-month rental operation, he grew revenue 300% in his first year. Upsell discipline, fleet utilization, KPIs every branch reported against, and customer service built into the process did the work. Every rule in Quanton OS is enforced the same way.", f: ["300%", "first-year revenue growth"] },
  { ix: "02 · Lending", h: "Controls that live in site visits fail between them.", p: "He took over a lending region carrying $400K in losses from thin oversight, missing systems, and fraud. KPIs, training, and compliance went into every branch, and revenue came from process instead of pressure. The region grew by more than $12M. The approval gates in Quanton OS come from that region.", f: ["$12M+", "regional growth after $400K in losses"] },
  { ix: "03 · Automotive", h: "An owner who is the system caps the business at his own hours.", p: "He built an automotive facility from zero to $1.9M. Pricing, scheduling, quality, and hiring ran through him, and the business grew as far as his hours allowed. Quanton OS carries the managing work so the owner's hours stop being the ceiling.", f: ["$1.9M", "built from zero"] },
  { ix: "04 · Consulting", h: "A diagnosis lasts as long as the consultant stays.", p: "As a consulting project director he found the same gap inside other owners' businesses: a succession after an owner's death, a founder handing the business to family, operating knowledge held by one or two people. At one manufacturer the diagnostic became a Quanton OS deployment that stayed. Over the trailing twelve months to April 2026, gross margin rose from 43.8% to 48.0% and operating profit went from $115K to $316K.", f: ["48.0%", "gross margin, up from 43.8%"] },
];

function Chapter({ c }: { c: (typeof CHAPTERS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });
  return (
    <motion.div ref={ref} className="ab-ch" animate={{ opacity: inView ? 1 : 0.38 }} transition={{ duration: 0.5 }}>
      <div className="ix">{c.ix}</div><h3>{c.h}</h3><p>{c.p}</p>
      <div className="f"><strong>{c.f[0]}</strong><span>{c.f[1]}</span></div>
    </motion.div>
  );
}

function LeadershipChapter() {
  const fig = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: fig, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  return (
    <section className="ab-c5" id="leadership">
      <div className="qx-wrap">
        <div className="qx-ey">Leadership</div>
        <h2 className="ab-h2" style={{ maxWidth: "20ch" }}>Each part of Quanton OS answers a problem solved by hand first.</h2>
        <div className="gr">
          <figure ref={fig} className="ab-photo">
            <motion.img src="/images/site/founder.jpg" alt="Ryan Remington, Founder and Managing Director of Quanton Labs" style={{ y }} />
            <figcaption><b>Ryan Remington</b><span>Founder and Managing Director</span></figcaption>
          </figure>
          <div>
            {CHAPTERS.map((c) => <Chapter key={c.ix} c={c} />)}
            <dl className="ab-cred"><dt>Education</dt><dd>MBA, The Citadel<br />B.A., Organizational Leadership and Communication, Marist College</dd><dt>Service</dt><dd>Veteran</dd><dt>Languages</dt><dd>English, Spanish</dd></dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutClient() {
  return (
    <div className="qx qx-dark ab">
      <SiteNav theme="dark" />
      <main>
        <Hero />
        <WorkChapter />
        <RecordChapter />
        <RulesChapter />
        <ModelChapter />
        <LeadershipChapter />
        <CloseBox />
      </main>
      <SiteFooter theme="dark" />
    </div>
  );
}
