"use client";

/* Homepage sections below the scene, on the shared page kit. Copy from the approved comp. */
import { motion } from "framer-motion";
import { Close, Head, Table, rise, stagger } from "@/components/site/kit";
import "@/components/site/kit.css";
import "./home-sections.css";

const WORK = [
  ["01", "Operating", "The transactions: orders, receipts, shipments, invoices, payroll, postings, and field work.", "Quanton OS", "The company's system of record, the shared engines that compute on it, and the worker mobile app."],
  ["02", "Managing", "Coordination, commitments, and the many small decisions.", "Quanton OS", "The Governing Agent and seven department leads directing specialist agents, inside the rules and approvals leadership sets."],
  ["03", "Leading", "Where the company goes.", "Leadership", "With one governed record and the Leadership Dashboard."],
];
const DEPTS = [
  ["Marketing and Content", "Campaign planning, local presence and listings, email and messaging lists, social, and website content."],
  ["Sales", "Lead intake and response, estimating and quotes, and pipeline management. Bid management for contractors and manufacturers."],
  ["Customer Experience", "Inquiry intake, scheduling, status updates, case resolution, warranty and returns, and reviews and reputation."],
  ["People and Team", "Recruiting, employee onboarding and records, time and attendance, payroll and payroll tax, benefits, and training and credentials."],
  ["Operations", "Job control, scheduling and dispatch with daily task assignment, quality and inspection, equipment upkeep, safety records, and SOPs."],
  ["Inventory and Supply Chain", "Replenishment, purchasing and supplier communication, receiving and invoice matching, stock accuracy, returns and credits, and shipping and freight."],
  ["Finance", "General ledger, bookkeeping, and the month-end close, payables, receivables and collections, billing, and sales and use tax and vendor 1099s."],
];
const BASE = [
  ["System of record", "Holds every transaction, document, and obligation in one governed record. Built by Quanton Labs, owned by the company."],
  ["Shared engines", "Code computes every number. AI drafts and explains and never produces a figure."],
  ["Shared skill library", "Single steps such as drafting a message or extracting document fields, serving every agent."],
];
const PHASES = [
  ["Phase 1", "Two weeks for a base footprint", "Discovery and Diagnostic", "Quanton Labs maps the company's operations across every function and reviews every system in use. A books check covers the accounting file, reconciliations, and reporting accuracy; its findings set the migration scope before the Phase 2 quote.", "The Diagnostic Report, owned by the company regardless of what it decides next."],
  ["Phase 2", "8 to 16 weeks for most footprints", "Infrastructure Deployment", "The operational core is built and the records migrated, opening balances plus two years of history by default. The shared engines run, the Governing Agent and all seven department leads go live with their specialist agents, approval levels are configured per function, the worker mobile app and Leadership Dashboard go live, and the team is trained.", "The company owns the delivered operational core on completion and payment."],
  ["Phase 3", "Ongoing, six-month initial commitment", "Managed Services", "Quanton Labs runs and improves the system on the company's behalf: operation, hosting where elected, monitoring, optimization, governance enforcement, continuous improvement, and quarterly strategic reviews.", "A fixed monthly investment that starts at the first go-live."],
];

export default function HomeSections() {
  return (
    <div className="qx pg hs">
      <section className="sec qx-paper" id="why">
        <div className="wrap">
          <Head n="01" lab="Why" h2="Leading gets whatever time is left." lead="Running a company takes three kinds of work. Managing carries the hidden load: knowing what is true right now, catching problems early, making hundreds of small calls, and holding people to their commitments. Quanton OS carries operating and managing as a system." />
          <div className="hs-work">
            <div className="hd"><span /><span /><span>What it is</span><span>Who carries it</span></div>
            {WORK.map(([n, h, what, who, how], i) => (
              <motion.div key={h} className={`r${who === "Leadership" ? " lead" : ""}`} {...stagger(i)}>
                <span className="n">{n}</span>
                <h3 className="qx-d3">{h}</h3>
                <p>{what}</p>
                <p><b>{who}</b> {how}</p>
              </motion.div>
            ))}
          </div>
          <motion.p className="hs-foot" {...rise}>Quanton OS is not software a company installs and runs itself. Quanton Labs builds it, operates it, and improves it continuously, and the operational core it builds belongs to the company.</motion.p>
        </div>
      </section>

      <section className="sec p2" id="org">
        <div className="wrap">
          <Head n="02" lab="How it is organized" h2="The agents are the managing layer, not the whole system." lead="A Governing Agent and seven department leads, each directing a standard team of specialist agents. Agents call the shared engines for every calculation and never duplicate them." />
          <motion.div className="hs-ga" {...rise}>
            <span className="k">Governing Agent</span>
            <h3>Directs all seven.</h3>
            <p>Detects conflicts between departments, routes every exception to the right person, enforces governance, and feeds the Leadership Dashboard.</p>
          </motion.div>
          <div className="hs-deps">
            {DEPTS.map(([h, p], i) => (
              <motion.div key={h} className="cd" {...stagger(i % 4)}><h3>{h}</h3><p>{p}</p></motion.div>
            ))}
          </div>
          <div className="cards c3" style={{ marginTop: 12 }}>
            {BASE.map(([h, p], i) => (
              <motion.div key={h} className="cd hs-base" {...stagger(i)}><span className="k">{h}</span><p>{p}</p></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-paper" id="how">
        <div className="wrap">
          <Head n="03" lab="How it works" h2="Three phases. Each a fixed investment, set by scope." lead="Phase 1 does not commit the company to Phase 2. Every phase is quoted from the footprint: entities, locations, people on the system, systems replaced, connections to systems kept, and operating volume. By scope, never by revenue." />
          <div className="cards c3">
            {PHASES.map(([n, t, h, p, d], i) => (
              <motion.div key={n} className="cd hs-ph" {...stagger(i)}>
                <div className="top"><span className="k">{n}</span><span className="k">{t}</span></div>
                <h3>{h}</h3>
                <p>{p}</p>
                <span className="ft">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec qx-ink" id="ctrl">
        <div className="wrap">
          <Head n="04" lab="Control and data" h2="Governance is built into the system itself." lead="Every action that affects customers, revenue, or compliance requires leadership's approval or a review window leadership controls. Every output is checked against the company's rules before it reaches an approval point." />
          <div className="hs-ctrl">
            <motion.div {...rise}>
              <div className="qx-lab">Approval levels, set per function</div>
              <Table dark cols="170px minmax(0,1fr)" head={["Level", "What happens"]} rows={[
                ["Full Autonomy", "The action runs without review."],
                ["Silent Approval", "The action is prepared and queued, then proceeds after a review window unless someone steps in."],
                ["Hard Block", "The action is prepared and presented, and nothing happens without explicit approval."],
              ]} />
              <p className="fx">Two rules are fixed: actions on tracked commitments always wait for explicit approval, and any outbound output that fails a rule check always goes to a person before it is sent.</p>
            </motion.div>
            <motion.div {...stagger(1)}>
              <div className="qx-lab">The company&apos;s data</div>
              <Table dark cols="170px minmax(0,1fr)" head={["", ""]} rows={[
                ["Isolation", "Data is never shared with another client and stays in the company's deployment, apart from the processing its Engagement Agreement sets out."],
                ["Trading partners", "When a trading partner also runs Quanton OS, the two companies exchange only the transaction documents of their trade. Each connection starts by invitation and confirmation from both sides. A company can opt out."],
                ["System improvement", "Quanton Labs studies de-identified system performance across deployments to improve Quanton OS for every client. No client records leave a deployment. A company can opt out."],
              ]} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="qx-ink hs-stays">
        <div className="wrap">
          <motion.div {...rise}>
            <div className="qx-lab">Quanton Labs</div>
            <h2 className="qx-d1">The consulting firm that stays.</h2>
            <p className="qx-body">Quanton OS gives a leadership team what a consulting firm would, every day instead of once a year, and stays to run it.</p>
          </motion.div>
        </div>
      </section>
      <Close />
    </div>
  );
}
