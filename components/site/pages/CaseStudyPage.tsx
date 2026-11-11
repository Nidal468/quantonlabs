"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Close, Page, PHero, Table, rise, stagger } from "@/components/site/kit";
import { CASES, type CaseStudy } from "@/content/case-studies";
import "./cases.css";

export default function CaseStudyPage({ c }: { c: CaseStudy }) {
  const others = CASES.filter((o) => o.id !== c.id && o.program === c.program).slice(0, 3);
  return (
    <Page>
      <PHero lab={`Case study · ${c.program}`} h1={c.title} lead={c.summary}>
        <div className="figs cs-hfigs" style={{ gridTemplateColumns: `repeat(${Math.max(c.figures.length, 2)},minmax(0,1fr))` }}>
          {c.figures.map(([f, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}><strong>{f}</strong><span>{l}</span></motion.div>
          ))}
        </div>
      </PHero>

      <section className="sec qx-paper">
        <div className="wrap split">
          <motion.div className="stick" {...rise}>
            <div className="qx-lab"><b>01</b> {c.sector} · {c.status}</div>
            <h2 className="qx-d3" style={{ marginTop: 22 }}>The situation</h2>
          </motion.div>
          <motion.div className="prose" {...rise}>{c.situation.map((p) => <p key={p}>{p}</p>)}</motion.div>
        </div>
      </section>

      {c.built.length > 0 && (
        <section className="sec p2">
          <div className="wrap split">
            <motion.div className="stick" {...rise}><div className="qx-lab"><b>02</b> {c.agents ? `Agents: ${c.agents}` : "The system"}</div><h2 className="qx-d3" style={{ marginTop: 22 }}>{c.builtHead}</h2></motion.div>
            <ul className="cs-built">{c.built.map((b, i) => <motion.li key={b} {...stagger(i)}>{b}</motion.li>)}</ul>
          </div>
        </section>
      )}

      {c.results && (
        <section className="sec qx-paper">
          <div className="wrap split">
            <motion.div className="stick" {...rise}><div className="qx-lab"><b>03</b> Reported financials</div><h2 className="qx-d3" style={{ marginTop: 22 }}>{c.results.head}</h2></motion.div>
            <div>
              <Table cols="minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr)" head={c.results.cols} rows={c.results.rows} />
              <motion.p className="cs-note" {...rise}>{c.results.note}</motion.p>
            </div>
          </div>
        </section>
      )}

      {c.table && (
        <section className="sec qx-paper">
          <div className="wrap split">
            <motion.div className="stick" {...rise}><div className="qx-lab"><b>02</b> {c.builtHead}</div><h2 className="qx-d3" style={{ marginTop: 22 }}>{c.table.head}</h2></motion.div>
            <Table cols="minmax(0,1fr) minmax(0,1fr)" head={c.table.cols} rows={c.table.rows} />
          </div>
        </section>
      )}

      <section className="sec tight qx-paper" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="cs-note">{c.note}</p>
          <div className="cs-links">
            {c.solution && <Link href={c.solution.href}>Solutions · {c.solution.label}</Link>}
            <Link href="/case-studies">All case studies</Link>
            {others.map((o) => <Link key={o.id} href={`/case-studies/${o.id}`}>{o.sector} · {o.status}</Link>)}
          </div>
        </div>
      </section>

      <Close />
    </Page>
  );
}
