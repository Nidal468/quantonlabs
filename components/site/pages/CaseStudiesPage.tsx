"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Close, Head, Page, PHero, Table, stagger } from "@/components/site/kit";
import { CASES } from "@/content/case-studies";
import "./cases.css";

export default function CaseStudiesPage() {
  const os = CASES.filter((c) => c.program === "Quanton OS deployment");
  const mod = CASES.filter((c) => c.program === "Modular Agent Program");
  const origin = CASES.find((c) => c.program === "Where Quanton OS came from")!;
  const mfg = os[0];
  return (
    <Page>
      <PHero lab="Case studies" h1="Where the system runs, and what changed." lead="Quanton OS deployments, Modular Agent Program engagements, and the business that shaped the architecture. Client identities are withheld." />

      <section className="sec qx-paper">
        <div className="wrap">
          <Head n="01" lab="Quanton OS deployments" h2="The whole system on one record the client owns." lead="Loss figures are diagnostic findings, sized before anything was built. Results are reported financials, trailing twelve months against the prior twelve." />
          <motion.article className="cs-lead" {...stagger(0)}>
            <div className="l">
              <span className="k">{mfg.sector} · {mfg.status}</span>
              <h3 className="qx-d3">{mfg.title}</h3>
              <p>{mfg.summary}</p>
              <Link href={`/case-studies/${mfg.id}`} className="more">Read the case study</Link>
            </div>
            <div className="r">
              {mfg.results && <Table cols="minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr)" head={mfg.results.cols.map((c, i) => (i === 0 ? mfg.results!.head : c))} rows={mfg.results.rows} />}
            </div>
          </motion.article>
          <div className="cards c2" style={{ marginTop: 12 }}>
            {os.slice(1).map((c, i) => (
              <motion.div key={c.id} {...stagger(i)}>
                <Link href={`/case-studies/${c.id}`} className="cd cs-card">
                  <span className="k">{c.sector} · {c.status}</span>
                  <h3>{c.title}</h3>
                  <div className="cs-figs">{c.figures.map(([f, l]) => <div key={l}><strong>{f}</strong><span>{l}</span></div>)}</div>
                  <span className="ft">Read the case study</span>
                </Link>
              </motion.div>
            ))}
            <motion.div className="cd cs-quiet" {...stagger(1)}>
              <span className="k">Diagnostic figures</span>
              <div className="cs-figs">{mfg.figures.slice(0, 2).map(([f, l]) => <div key={l}><strong>{f}</strong><span>{l}</span></div>)}</div>
              <p>{mfg.results?.note}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sec p2">
        <div className="wrap">
          <Head n="02" lab="Modular Agent Program" h2="Individual agents for specific functions, measured after launch." lead="The Modular Agent Program is its own program with its own scope, not an entry version of Quanton OS." />
          <div className="cards c4">
            {mod.map((c, i) => (
              <motion.div key={c.id} {...stagger(i)}>
                <Link href={`/case-studies/${c.id}`} className="cd cs-card">
                  <span className="k">{c.sector} · {c.status}</span>
                  <strong className="fig">{c.figures[0][0]}</strong>
                  <p>{c.figures[0][1]}</p>
                  <span className="ft">Agents: {c.agents}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="qx-body" style={{ marginTop: 24, fontSize: 14 }}><Link href="/modular-agent-program" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>About the program</Link></p>
        </div>
      </section>

      <section className="sec qx-ink">
        <div className="wrap">
          <Head n="03" lab="Where Quanton OS came from" h2={origin.title} lead={`${origin.summary} ${origin.situation[0]}`} />
          {origin.table && <Table dark cols="minmax(0,1fr) minmax(0,1fr)" head={origin.table.cols} rows={origin.table.rows} />}
        </div>
      </section>

      <Close />
    </Page>
  );
}
