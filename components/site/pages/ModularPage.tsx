"use client";

import { motion } from "framer-motion";
import { Close, Head, Page, PHero, Table, rise, stagger } from "@/components/site/kit";

const FUNCS = [
  ["Sales", "Lead response, qualification, follow-up, and booked calls."],
  ["Customer experience", "Inquiry intake, chat, scheduling, and status updates."],
  ["Marketing", "Website, social posting, and the Google Business profile."],
  ["CRM", "Contact enrichment, compliance scrubbing, and sync across channels."],
  ["Vendor management", "Vendor scheduling and follow-up across properties or sites."],
  ["Live dashboard", "Pipeline, bookings, or occupancy as they happen, not at month end."],
];
const RESULTS = [
  ["Executive coaching", "$60K", "in sales within 24 hours of the sales agent's launch"],
  ["Charter", "400%", "increase in website traffic"],
  ["Real estate agent", "$48K", "annual labor cost saved, with a 150% gain in revenue-generating productivity"],
  ["Property management", "Every unit", "vendors, CRM, and advertising coordinated portfolio-wide"],
];

export default function ModularPage() {
  return (
    <Page>
      <PHero lab="Modular Agent Program" h1="One to three agents, each deployed for a specific function." lead="The Modular Agent Program deploys individual agents for specific functions. It is its own program with its own scope, not an entry version of Quanton OS." />

      <section className="sec qx-paper">
        <div className="wrap">
          <Head n="01" lab="How it runs" h2="Audit the function, install the agent, run it." lead="Each engagement starts with an audit of the function the agent will carry. The agent is built for that one function and connected to the tools the business already uses. Quanton Labs hosts, monitors, and operates it after launch." />
          <div className="cards c3">
            {[["Audit", "One domain or several"], ["Install", "One agent per function"], ["Operate", "Hosted, monitored, run"]].map(([h, p], i) => (
              <motion.div key={h} className="cd" {...stagger(i)}><span className="k">0{i + 1}</span><h3>{h}</h3><p>{p}</p></motion.div>
            ))}
          </div>
          <motion.p className="qx-body" style={{ marginTop: 28, fontSize: 14 }} {...rise}>Model usage runs on accounts the client owns and is billed to the client directly.</motion.p>
        </div>
      </section>

      <section className="sec p2">
        <div className="wrap">
          <Head n="02" lab="Functions" h2="Where a single agent earns its place." lead="A function with steady volume, a clear handoff, and a cost to every hour it waits on a person." />
          <div className="cards c3">
            {FUNCS.map(([h, p], i) => (
              <motion.div key={h} className="cd" {...stagger(i)}><h3>{h}</h3><p>{p}</p></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-ink">
        <div className="wrap">
          <Head n="03" lab="Results" h2="Four engagements, measured after launch." lead="Client identities withheld. Full detail is on the case studies page." />
          <div className="figs" style={{ gridTemplateColumns: "repeat(4,minmax(0,1fr))" }}>
            {RESULTS.map(([k, f, l], i) => (
              <motion.div key={k} {...stagger(i)}><span style={{ fontFamily: "var(--qx-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.45)" }}>{k}</span><strong>{f}</strong><span>{l}</span></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-paper">
        <div className="wrap">
          <Head n="04" lab="The limit" h2="The program stops at three agents." lead="Past three, a business is coordinating agents across functions, and agents working from separate records give separate answers. Coordination on one record the company owns is what Quanton OS is built for. A third agent opens that conversation." />
          <Table cols="180px minmax(0,1fr) minmax(0,1fr)" head={["", "Modular Agent Program", "Quanton OS"]} rows={[
            ["Scope", "One to three functions", "Every function"],
            ["Record", "The tools already in use", "One system of record the company owns"],
            ["Coordination", "Each agent on its own", "A Governing Agent across seven departments"],
            ["Leadership view", "Per function", "The Leadership Dashboard, every department"],
          ]} />
        </div>
      </section>

      <Close second={{ label: "See the case studies", href: "/case-studies" }} />
    </Page>
  );
}
