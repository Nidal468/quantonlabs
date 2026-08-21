"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Layers, ShieldCheck, GitBranch, Cpu } from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function Section({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{
        backgroundColor: dark ? "#041227" : "#ffffff",
        padding: "88px 24px",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: "820px", margin: "0 auto" }}
      >
        {eyebrow && (
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
              ...(dark ? { color: "#7B8FF5" } : GRADIENT_TEXT),
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 3.4vw, 34px)",
            color: dark ? "#ffffff" : "#1F2937",
            lineHeight: 1.25,
            margin: "0 0 24px",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: dark ? "rgba(255,255,255,0.78)" : "#374151",
          }}
        >
          {children}
        </div>
      </motion.div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "0 0 20px" }}>{children}</p>;
}

function LayerCard({
  icon,
  label,
  title,
  body,
  depth = 0,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  // Depth drives a stepped offset and accent weight so the three cards
  // read as stacked layers rather than three equal columns.
  depth?: number;
}) {
  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "14px",
        padding: "24px",
        background: "#ffffff",
        position: "relative",
        marginTop: `${depth * 18}px`,
        boxShadow: `0 ${6 + depth * 6}px ${18 + depth * 10}px rgba(15,23,42,${0.04 + depth * 0.03})`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "24px",
          right: "24px",
          height: "3px",
          borderRadius: "0 0 3px 3px",
          background: GRADIENT,
          opacity: 0.35 + depth * 0.32,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6B7280",
          }}
        >
          {label}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 700,
          fontSize: "17px",
          color: "#1F2937",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "#6B7280",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

const gateRows = [
  {
    level: "Full Autonomy",
    what: "The agent acts without review.",
    where: "Scheduled reports, internal notifications, data categorization, log entries.",
    examples: ["Scheduled reports", "Internal notifications", "Data categorization", "Log entries"],
    // Share of the decision the system carries before anything reaches you.
    systemShare: 100,
    accent: "#22C55E",
    note: "You see the outcome",
  },
  {
    level: "Silent Approval",
    what: "The agent prepares and queues, then proceeds after a review window unless you step in.",
    where: "Draft content, scheduled follow-ups, routine supplier communication.",
    examples: ["Draft content", "Scheduled follow-ups", "Routine supplier comms"],
    systemShare: 75,
    accent: "#F59E0B",
    note: "You can intervene",
  },
  {
    level: "Hard Block",
    what: "The agent prepares and presents. Nothing happens without your explicit approval.",
    where: "Client communications, proposals, invoices, pricing, hiring, compliance filings.",
    examples: ["Client communications", "Proposals", "Invoices", "Pricing", "Hiring", "Compliance filings"],
    systemShare: 0,
    accent: "#4655EB",
    note: "You decide",
  },
];

const startingPoints = [
  {
    from: "No formal systems",
    approach:
      "The fastest path. Nothing to migrate or untangle. The core is built directly around how you operate.",
  },
  {
    from: "Desktop accounting only",
    approach:
      "One careful migration in an otherwise clean field. Reconciliation criteria are agreed in writing and confirmed by your accountant before any financial data moves.",
  },
  {
    from: "Some tools in place",
    approach:
      "Agents connect to what exists during the build. Functions with no coverage are built natively from the start.",
  },
  {
    from: "Established platform stack",
    approach:
      "Existing platforms stay connected during the build and are retired function by function as each goes live on the core, on your authorization.",
  },
];

const buildSteps = [
  "Governing Agent shell and shared state schema. Without these, every other agent is a disconnected automation, so they are built first.",
  "Operational core schema and data model. The structure of your system of record, built against the domains scoped in Phase 1.",
  "Functional agent foundational capabilities. Workflow agents in each domain reading and writing to the core.",
  "Governing Agent coordination activated. Routing rules, gate enforcement, conflict detection, dashboard pipeline. The system becomes coordinated.",
  "Intelligence functions. Specialist reasoning running on cadence and writing findings back into shared state. The system becomes intelligent.",
  "Governing Agent synthesis expanded. Richer synthesis, cross-functional reasoning, deeper executive briefing.",
  "Strategic functions and full Governing Agent reasoning, where the deployment scope calls for it. The system becomes strategic.",
];

function BuildStep({
  step,
  index,
  isLast,
}: {
  step: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ display: "flex", gap: "18px", alignItems: "stretch" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9px",
            background: GRADIENT,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            boxShadow: inView ? "0 0 0 5px rgba(70,85,235,0.10)" : "none",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {index + 1}
        </motion.span>

        {!isLast && (
          <div
            style={{
              position: "relative",
              width: "2px",
              flex: 1,
              minHeight: "34px",
              margin: "6px 0",
              background: "rgba(43,96,235,0.12)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                background: "linear-gradient(to bottom, #2B60EB, #7341EA)",
              }}
            />
            {inView && (
              <motion.div
                initial={{ top: "-15%", opacity: 0 }}
                animate={{ top: "105%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.4,
                  delay: 0.3,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-3px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#8B37EA",
                  boxShadow: "0 0 8px 2px rgba(139,55,234,0.7)",
                }}
              />
            )}
          </div>
        )}
      </div>

      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "16px",
          lineHeight: 1.75,
          color: "#374151",
          paddingBottom: isLast ? 0 : "24px",
        }}
      >
        {step}
      </span>
    </motion.li>
  );
}

export default function ArchitectureClient() {
  return (
    <main style={{ backgroundColor: "#ffffff" }}>
      {/* HERO */}
      <section
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "140px",
          paddingBottom: "72px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "18px",
              ...GRADIENT_TEXT,
            }}
          >
            Architecture
          </div>
          <h1
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(30px, 4.6vw, 46px)",
              color: "#1F2937",
              lineHeight: 1.2,
              margin: "0 0 24px",
            }}
          >
            How Quanton OS is built
          </h1>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "19px",
              lineHeight: 1.7,
              color: "#374151",
              margin: 0,
            }}
          >
            Eight coordinated AI agents run on an operational core built as your system of record.
            A Governing Agent coordinates across every function. Approval gates sit on anything
            that touches customers, revenue, or compliance. This page explains how that actually
            works.
          </p>
        </div>
      </section>

      {/* PREMISE */}
      <Section eyebrow="The premise" title="Coordination is the hard problem, not capability">
        <P>
          The distinction between Quanton OS and any other AI offering is the Governing Agent and
          shared state architecture. Without them, eight agents are eight disconnected automations.
          With them, the business operates as a unified system where every agent works with
          awareness of the others.
        </P>
        <P>
          The intelligence layer is the product. The operational core is what makes that
          intelligence trustworthy, because an agent reasoning over a data model built for your
          business outperforms an agent reasoning through a third-party connection against partial
          data.
        </P>
        <P>
          All eight agents are deployed in every engagement. The Governing Agent is active in every
          deployment. What varies between deployments is capability depth, never architectural
          completeness.
        </P>
      </Section>

      {/* LAYERS */}
      <section style={{ backgroundColor: "#F9FAFB", padding: "88px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
              ...GRADIENT_TEXT,
            }}
          >
            Three capability layers
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3.4vw, 34px)",
              color: "#1F2937",
              lineHeight: 1.25,
              margin: "0 0 20px",
            }}
          >
            The system builds in layers, and delivers value at each one
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#374151",
              maxWidth: "760px",
              margin: "0 0 40px",
            }}
          >
            Every agent, including the Governing Agent, operates across three capability layers.
            They build progressively, which means the system is useful while it is being
            constructed rather than only at handoff.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            <LayerCard
              icon={<Layers size={17} />}
              depth={0}
              label="Layer 1"
              title="Foundational"
              body="The operational work each agent owns daily. Lead routing, invoice processing, purchase orders, expense handling, scheduled reporting, calendar coordination. Reliable and efficient. This is what makes the system functional from day one."
            />
            <LayerCard
              icon={<Cpu size={17} />}
              depth={1}
              label="Layer 2"
              title="Intelligence"
              body="Analytical and predictive work producing intelligence the business does not currently have. Churn prediction, supplier profiling, lost-deal analysis, demand-driven replenishment, margin variance investigation. This is what makes the system intelligent."
            />
            <LayerCard
              icon={<GitBranch size={17} />}
              depth={2}
              label="Layer 3"
              title="Strategic"
              body="High-leverage work that compounds. Cross-functional question answering, strategic anomaly detection, executive narrative synthesis, scenario modeling. This is what makes the system strategic."
            />
          </div>
        </div>
      </section>

      {/* GOVERNING AGENT */}
      <Section
        eyebrow="The Governing Agent"
        title="Without coordination, eight agents are just eight automations"
        dark
      >
        <P>
          The Governing Agent is the coordination, decision, and intelligence layer sitting above
          the seven functional agents. It receives structured data and exception flags from all of
          them, decides within a boundary you configure, directs agents to act, escalates what
          exceeds that boundary, and feeds your leadership dashboard in real time.
        </P>
        <P>
          It detects conflicts at departmental handoffs. A delivery date Sales commits that
          Operations cannot meet. A credit Customer Experience promises that Finance has not
          approved. Stock Inventory commits that Operations has reserved. None of those conflicts
          exist inside any single tool, which is exactly why single tools never catch them.
        </P>
        <P>
          It sequences dependent actions across departments, enforces approval gates across every
          agent, classifies exceptions and routes them to the right person with full context,
          rolls performance up into one view, and maintains an audit trail covering every action,
          escalation, and approval.
        </P>
        <P>
          At full reasoning depth it answers open-ended cross-functional questions, detects
          anomalies across long-cycle patterns no individual agent would flag, and proposes
          expanding its own autonomous boundary at governance review with evidence. Expansion is
          never automatic.
        </P>
      </Section>

      {/* DECISION MECHANISM */}
      <Section eyebrow="How decisions are made" title="Not everything routes through a language model">
        <P>
          The Governing Agent uses a hybrid decision mechanism. A rule engine handles structured,
          recurring decisions where the logic is deterministic: approval gate enforcement, SOP
          compliance checks, escalation routing. A classification layer routes each incoming
          decision to the right handler. A language model handles genuinely novel decisions where
          rules are insufficient or cross-domain synthesis is required.
        </P>
        <P>
          When the model resolves a novel decision and that resolution is validated, the pattern is
          encoded into the rule library. Over time more decisions are handled deterministically and
          model use narrows to genuinely new situations. The system becomes more consistent the
          longer it operates, rather than less.
        </P>
        <P>
          Model selection happens at the individual function level across multiple providers. As
          the frontier of AI capability advances, your system improves with it, with no repurchase
          and no rebuild.
        </P>
      </Section>

      {/* GOVERNANCE */}
      <section style={{ backgroundColor: "#F9FAFB", padding: "88px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
              ...GRADIENT_TEXT,
            }}
          >
            How you stay in control
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3.4vw, 34px)",
              color: "#1F2937",
              lineHeight: 1.25,
              margin: "0 0 20px",
            }}
          >
            The system reasons broadly and acts narrowly
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#374151",
              margin: "0 0 36px",
            }}
          >
            Every engagement configures an operating boundary for each domain and documents it in
            your agreement. Decisions inside the boundary execute without escalation. Decisions
            outside it escalate to the person you designate, with full context and a
            recommendation.
          </p>

          {/* Autonomy spectrum. The bar shows how much of each decision the
              system carries before anything reaches a person. */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {gateRows.map(row => (
              <div
                key={row.level}
                style={{
                  border: "1px solid #E5E7EB",
                  borderLeft: `4px solid ${row.accent}`,
                  borderRadius: "14px",
                  padding: "22px 24px",
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "#1F2937",
                    }}
                  >
                    {row.level}
                  </div>
                  <div
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: row.accent,
                    }}
                  >
                    {row.note}
                  </div>
                </div>

                {/* System share bar */}
                <div style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      height: "8px",
                      borderRadius: "6px",
                      background: "#EEF1F6",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: `${row.systemShare}%`,
                        background: row.accent,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "6px",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#9CA3AF",
                    }}
                  >
                    <span>System acts</span>
                    <span>Human approves</span>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "#374151",
                    marginBottom: "14px",
                  }}
                >
                  {row.what}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {row.examples.map(ex => (
                    <span
                      key={ex}
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "5px 11px",
                        borderRadius: "6px",
                        background: "#F6F8FC",
                        border: "1px solid #E5E7EB",
                        color: "#4B5563",
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#374151",
              marginTop: "32px",
              marginBottom: 0,
            }}
          >
            Hard Block applies to every agent action affecting customers, revenue, or compliance.
            This is the architectural answer to AI risk. Agents cannot change their own governance
            settings, and every action, escalation, and approval is recorded in a complete audit
            trail.
            .
          </p>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <Section eyebrow="How deployment works" title="Your starting point determines the path, never the destination">
        <P>
          Quanton Labs builds the operational core of your business and runs all eight agents
          natively against it. Where an external service is genuinely better handled by a
          specialist, such as payment processing, tax computation, shipping, or phone and email, it
          stays connected at the endpoint permanently.
        </P>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "28px" }}>
          {startingPoints.map(item => (
            <div
              key={item.from}
              style={{
                borderLeft: "3px solid #4655EB",
                paddingLeft: "18px",
              }}
            >
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#1F2937",
                  marginBottom: "6px",
                }}
              >
                {item.from}
              </div>
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#6B7280",
                }}
              >
                {item.approach}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* BUILD SEQUENCE */}
      <section style={{ backgroundColor: "#F9FAFB", padding: "88px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
              ...GRADIENT_TEXT,
            }}
          >
            The build sequence
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3.4vw, 34px)",
              color: "#1F2937",
              lineHeight: 1.25,
              margin: "0 0 20px",
            }}
          >
            Built in a fixed order, every time
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#374151",
              margin: "0 0 32px",
            }}
          >
            The sequence is the same for every deployment, because the foundation is shared.
          </p>

          <ol style={{ margin: 0, paddingLeft: "0", listStyle: "none" }}>
            {buildSteps.map((step, i) => (
              <BuildStep
                key={i}
                step={step}
                index={i}
                isLast={i === buildSteps.length - 1}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* COMPOUNDS */}
      <Section eyebrow="What compounds" title="Tools depreciate. Infrastructure compounds." dark>
        <P>
          The system improves along three axes at once. Behavioral profiles deepen as every
          customer interaction, supplier pattern, and decision is recorded, so each subsequent
          interaction starts with more context. The rule library grows as validated decisions are
          encoded, so the system becomes more consistent and predictable over time. And the model
          layer advances independently, with capability arriving through continuous improvement
          rather than through a version you have to buy.
        </P>
        <P>
          A system deployed today and operated for three years is materially more capable than the
          same system at handoff. That is the argument for infrastructure over tools.
        </P>
      </Section>

      {/* CTA */}
      <section style={{ backgroundColor: "#ffffff", padding: "88px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 30px)",
              color: "#1F2937",
              lineHeight: 1.3,
              margin: "0 0 16px",
            }}
          >
            See where your own operations stand
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#6B7280",
              margin: "0 0 32px",
            }}
          >
            A five-minute assessment across all eight functional domains, with an immediate
            structural diagnostic of how your business runs today.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/assessment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "12px",
                background: GRADIENT,
                color: "#ffffff",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Assess Your Business <ArrowRight size={16} />
            </Link>
            <Link
              href="/faq"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "12px",
                border: "2px solid #1F2937",
                color: "#1F2937",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}