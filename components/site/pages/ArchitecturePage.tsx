"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Close, Head, Page, PHero, Table, rise, stagger } from "@/components/site/kit";
import { usePinned } from "@/components/site/useStage";
import "./architecture.css";

const PLANES = [
  { n: "Plane 1", q: "What happened", h: "The record", p: "Every transaction, document, obligation, and approval, kept in order and never edited in place. The books are a double-entry ledger that balances at write. Everything else the system knows rebuilds from this plane.", li: ["Business events, in sequence", "The general ledger", "Source documents and signed approvals"] },
  { n: "Plane 2", q: "What it means", h: "The model", p: "The company's own vocabulary, the methods that compute every figure from the record, the lineage of each number, and the history of every decision. The only path by which agents act on the record.", li: ["Computed metrics with lineage", "Decision history", "The action surface agents use"] },
  { n: "Plane 3", q: "What happens next", h: "The forward view", p: "The simulated effect of every gated action before it runs, and the value attributed to each event as it happens. Cash, capacity, and demand, thirteen weeks out.", li: ["Forward cash, capacity, demand", "Scenario evaluation", "Value attribution per event"] },
];

function Planes() {
  const ref = useRef<HTMLElement>(null);
  const pinned = usePinned();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setP);
  const at = pinned ? Math.min(2, Math.floor(p * 3.2)) : 2;
  return (
    <section ref={ref} className={`qx-ink ar-planes${pinned ? "" : " free"}`}>
      <div className="pin"><div className="wrap gr">
        <div>
          <div className="qx-lab"><b>01</b> How the system is built</div>
          <h2 className="qx-d2" style={{ marginTop: 26 }}>Three planes on one system of record.</h2>
          <p className="qx-body" style={{ marginTop: 24, maxWidth: "40ch" }}>One deployment serves one client. Code is shared across clients. Data never is. Agents read all three planes and act on the record through one controlled path.</p>
        </div>
        <div className="stack">
          {PLANES.map((pl, i) => (
            <div key={pl.h} className={`pl${i === at ? " on" : ""}${i < at ? " past" : ""}`}>
              <div className="r"><span>{pl.n}</span><span>{pl.q}</span></div>
              <h3>{pl.h}</h3>
              <p>{pl.p}</p>
              <ul>{pl.li.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div></div>
    </section>
  );
}

const LAYERS = [
  ["Layer 1", "Operating", "Every transaction, handoff, and follow-up in the day-to-day of each department, from lead intake to the month-end close. The engines compute; specialist agents route, prepare, and draft.", "Runs the business from day one"],
  ["Layer 2", "Intelligence", "Analytical and predictive work producing intelligence the business does not currently have: campaign and sales performance, key-account growth, retention and renewals, performance and coaching, demand planning, supplier performance, job and margin costing, and treasury and cash forecasting. These run on a cadence rather than on every event.", "Makes the system intelligent"],
  ["Layer 3", "Strategic", "Cross-department reasoning with the Governing Agent at full depth: open-ended questions answered across every department, long-cycle anomaly detection, scenario evaluation through the forward view, department strategy, and gap and upgrade recommendations.", "Makes the system strategic"],
];

const GA: [string, string[]][] = [
  ["From day one", ["Detects conflicts at departmental handoffs: a delivery date Sales commits that Operations cannot meet, a credit Customer Experience promises that Finance has not approved, stock Inventory commits that Operations has reserved.", "Sequences dependent actions across departments: quote, availability check, credit decision, contract, order entry, production schedule, fulfillment, invoice.", "Enforces the rules check and approval levels across every agent.", "Classifies every exception and missed obligation and routes it to the right person with a complete context package.", "Publishes performance across every department to the Leadership Dashboard and maintains a decision audit trail covering every agent action, escalation, and approval."]],
  ["As capability deepens", ["Resolution of routine decision requests within the boundary, escalating everything beyond it.", "A daily pulse and weekly and monthly performance reviews in written narrative, drawn from figures the engines computed.", "A quarterly review pack assembled from every department's state.", "Scoring of every specialist agent, with sustained underperformance flagged for SOP review."]],
  ["At full reasoning depth", ["Open-ended cross-functional questions answered across every department.", "Long-cycle anomaly detection no single department would flag.", "Scenario evaluation through the forward view.", "Department strategy, and gap and upgrade recommendations raised at governance review with evidence. Expansion of the boundary is never automatic."]],
];

export default function ArchitecturePage() {
  return (
    <Page>
      <PHero lab="Architecture" h1="How Quanton OS is built, how it decides, and how leadership stays in control." lead="The product is the whole system: one system of record the company owns, shared engines that compute on it, and an agent organization that runs on both. A Governing Agent coordinates seven department leads, each directing specialist agents. The agents are the managing layer, not the whole system."
        side={<div className="ar-non"><div className="qx-lab">Architectural non-negotiables</div><ul>
          <li>Every engagement deploys the whole system</li>
          <li>Code computes every number; AI never produces a figure</li>
          <li>Every output checked against the company&apos;s business rules</li>
          <li>Approval levels enforced in the system for every agent action</li>
          <li>A dedicated environment per client; data never shared</li>
        </ul></div>} />

      <Planes />

      <section className="sec qx-paper">
        <div className="wrap">
          <Head n="02" lab="Three layers of work" h2="The system runs the business from day one, then deepens." lead="Which layers are active is set by the scope of the deployment, established during Phase 1 Discovery. Margin and cash on every job, the forward view, and the Leadership Dashboard are computed by the engines in every deployment." />
          <div className="ar-layers">
            {LAYERS.map((l, i) => (
              <motion.div key={l[0]} className="ly" {...stagger(i)}>
                <span className="n">{l[0]}</span><h3 className="qx-d3">{l[1]}</h3><p>{l[2]}</p><span className="t">{l[3]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec p2">
        <div className="wrap">
          <Head n="03" lab="The Governing Agent" h2="Coordination, decision, and intelligence above seven department leads." lead="It receives work and exception flags from all seven department leads, decides within a boundary leadership configures, directs agents to act, escalates what exceeds that boundary, and feeds the Leadership Dashboard in real time. It routes; it never resolves an exception on its own." />
          <div className="cards c3">
            {GA.map(([h, li], i) => (
              <motion.div key={h} className="cd" {...stagger(i)}><span className="k">{h}</span><ul>{li.map((x) => <li key={x}>{x}</li>)}</ul></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-paper">
        <div className="wrap">
          <Head n="04" lab="How decisions are made" h2="Not everything routes through a language model." lead="Structured, recurring decisions run on rules. A deterministic classification layer routes each decision to the right handler. A language model is reserved for decisions that require reasoning." />
          <Table cols="180px minmax(0,1.4fr) minmax(0,1fr)" head={["Handler", "Handles", "How"]} rows={[
            ["Rule engine", "Structured, recurring decisions where the logic is deterministic: approval level enforcement, SOP compliance checks, escalation routing against configured thresholds.", "Fully predictable. No model involved."],
            ["Classification layer", "Routing each incoming decision to the right handler.", "Evaluates decision type, department, severity, and prior resolution patterns. Deterministic."],
            ["Language model", "Novel decisions where rules are insufficient, context is ambiguous, or cross-department synthesis is required.", "Selected per task from an approved list across multiple providers. Reserved for work that requires reasoning."],
          ]} />
          <div className="cards c3" style={{ marginTop: 40 }}>
            {[["Code computes every number", "Every figure the system produces, including forecasts, scenarios, margins, and valuations, is computed by the engines. Models classify, extract, draft, and narrate. No model output becomes a figure, and model output containing a number absent from its inputs is discarded."],
              ["More predictable over time", "When the model resolves a novel decision and that resolution is validated, the pattern is encoded into the rule library. More decisions are handled deterministically over time, and model consumption falls as it does."],
              ["Model choice and spend", "Models are selected per function from an approved list. Leadership can change models only within the list, with the projected monthly amount shown before the change saves. Every function carries a monthly spend ceiling with alerts."]].map(([h, p], i) => (
              <motion.div key={h} className="cd" {...stagger(i)}><h3>{h}</h3><p>{p}</p></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-ink">
        <div className="wrap">
          <Head n="05" lab="How leadership stays in control" h2="The system reasons broadly and acts narrowly." lead="Every engagement configures an operating boundary for each department in Phase 1 and documents it in the agreement. Every action that affects customers, revenue, or compliance requires leadership's approval or a review window leadership controls." />
          <div className="cards c3">
            {[["Full Autonomy", "The action runs without review."], ["Silent Approval", "The action is prepared and queued, then proceeds after a review window unless someone steps in."], ["Hard Block", "The action is prepared and presented, and nothing happens without explicit approval."]].map(([h, p], i) => (
              <motion.div key={h} className="cd" {...stagger(i)}><span className="k">Approval level</span><h3>{h}</h3><p>{p}</p></motion.div>
            ))}
          </div>
          <motion.p className="ar-fixed" {...rise}>Two rules are fixed and cannot be configured: actions on tracked commitments always wait for explicit approval, and any outbound output that fails a rule check always goes to a person before it is sent.</motion.p>
          <div className="cards c3" style={{ marginTop: 40 }}>
            {[["Change its own governance", "Agents cannot alter approval levels, boundaries, or rules. Changes after go-live are made by signed change order."], ["Produce a figure", "Every number comes from the engines. A model that returns a number not present in its inputs is discarded."], ["Act without a trace", "Every action, escalation, and approval is recorded in a complete audit trail, with approver and timestamp, held as part of the record."]].map(([h, p], i) => (
              <motion.div key={h} className="cd" {...stagger(i)}><span className="k">What the system cannot do</span><h3>{h}</h3><p>{p}</p></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-paper">
        <div className="wrap split">
          <motion.div className="stick" {...rise}><div className="qx-lab"><b>06</b> Field work</div><h2 className="qx-d3" style={{ marginTop: 22 }}>Employees work through the mobile app. Subcontractors need no account.</h2></motion.div>
          <motion.div className="prose" {...rise}>
            <p>Employees work through the worker mobile app: clock in and out, pay stubs, time off, the daily task list, and field capture, with offline operation.</p>
            <p>Subcontractors need no app and no account. They work by text: an assignment text, a start-day text, and a completion text, each with a link to the job. What a subcontractor can do is limited to the job&apos;s punch list, and every action through the link is written to the audit trail. Any free-form message to a subcontractor and any subcontractor payment waits for leadership&apos;s approval.</p>
          </motion.div>
        </div>
      </section>

      <section className="sec p2">
        <div className="wrap">
          <Head n="07" lab="What Quanton OS is not" h2="The alternatives, and where each one stops." />
          <Table cols="190px minmax(0,1fr) minmax(0,1fr)" head={["Alternative", "Where it stops", "Quanton OS"]} rows={[
            ["Point solutions", "One function each. No shared state and no awareness of the rest of the business. When a vendor fails, its customers are left with nothing running.", "The whole business on one system of record: a Governing Agent and seven department leads directing specialist agents, on shared engines, under governance enforced in the system."],
            ["CRM-based agent suites", "Agents bounded by a single vendor's ecosystem, seeing only what lives inside that platform. Built and sold for enterprise buyers.", "Agents operating on a core built for the business, where engines compute from the full record, not from whatever a vendor exposes."],
            ["Self-service AI platforms", "Toolboxes the company designs, builds, and runs itself. No coordination, no governance.", "A deployed governed system with coordination, a rules check on every output, approval levels, and shared state from day one."],
            ["Automation agencies", "Workflow assembly on open-ended retainers. No agent intelligence beyond bounded automation, and the company owns nothing at the end.", "The company's system of record, with engines that compute every number and an agent organization that manages on it, on an operational core the company owns."],
            ["Fractional executives", "Advisory only. No infrastructure deployed. Value ends when the engagement ends.", "A system that carries operating and managing and compounds, on an operational core that remains the company's property."],
          ]} />
        </div>
      </section>

      <section className="sec qx-paper">
        <div className="wrap split">
          <motion.div className="stick" {...rise}><div className="qx-lab"><b>08</b> What compounds</div><h2 className="qx-d3" style={{ marginTop: 22 }}>Tools depreciate. Infrastructure compounds.</h2></motion.div>
          <motion.div className="prose" {...rise}>
            <p>The system improves along three axes at once. Behavioral profiles deepen as every customer interaction, supplier pattern, and decision is recorded, so each subsequent interaction starts with more context.</p>
            <p>The rule library grows as validated decisions are encoded, so the system becomes more consistent and predictable over time. And the model layer advances independently, with capability arriving through continuous improvement instead of a version the company has to buy.</p>
            <p>A system deployed today and operated for three years is materially more capable than the same system at handoff.</p>
          </motion.div>
        </div>
      </section>

      <Close second={{ label: "Read the FAQ", href: "/faq" }} />
    </Page>
  );
}
