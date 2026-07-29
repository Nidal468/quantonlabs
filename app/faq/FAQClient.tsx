"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const faqs = [
  {
    question: "What is Quanton OS?",
    answer:
      "Quanton OS is a governed AI operating system built for owner-led businesses generating $1M to $20M annually. It deploys eight coordinated AI agents across your business, covering sales, marketing, operations, finance, customer experience, people management, inventory, and strategy, all connected through a single Governing Agent that coordinates decisions, enforces boundaries, and surfaces what requires your attention. It is not software you install or a tool you configure yourself. It is infrastructure built, deployed, and operated by Quanton Labs on your existing platforms.",
  },
  {
    question: "How is this different from hiring a consultant or buying another SaaS tool?",
    answer:
      "A consultant gives you a recommendation and leaves. A SaaS tool handles one function and sits in a silo. Quanton OS is neither. It is a permanent operating layer that connects every function in your business through a single governed system. The agents do not just automate tasks. They coordinate across domains, flag exceptions, and escalate what exceeds their configured boundary. You get a system that runs continuously, not a project that ends or a subscription you have to manage yourself.",
  },
  {
    question: "What types of businesses is Quanton OS built for?",
    answer:
      "Owner-led businesses generating between $1M and $20M in annual revenue across six verticals: professional services, home services, automotive, healthcare and wellness, manufacturing and distribution, and retail. The common thread is businesses that have outgrown their current operating structure, where the owner is still the glue holding everything together and growth is limited by how much that person can personally oversee.",
  },
  {
    question: "How does Quanton OS connect to the tools I already use?",
    answer:
      "Through direct API integration. Quanton OS connects to your existing platforms, your CRM, accounting software, scheduling tools, communication channels, and inventory systems, without requiring you to migrate off any of them. The agents operate on top of what you already have, not instead of it.",
  },
  {
    question: "What happens during Phase 1 Discovery?",
    answer:
      "Phase 1 is a two-to-three-week diagnostic engagement. We audit your business across all eight functional domains, validate your cost of inaction with figures from your actual financial data, and produce a prioritized implementation roadmap. The output is a Diagnostic Report that you own regardless of what you decide next. Phase 1 is a fixed-fee engagement with no ongoing commitment attached.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Phase 1 Discovery is priced to your specific business based on integration complexity, team structure, and operational environment. That investment is confirmed on your Discovery call and fixed before work begins. Phase 2 Deployment and Phase 3 Managed Services are scoped based on what Phase 1 reveals. We do not publish a general price range because every engagement is configured to a specific business, not sold off a menu.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "Phase 2 Infrastructure Deployment typically takes 8 to 16 weeks. During that period, all eight agents are configured against your specific environment, the Governing Agent goes live, your leadership dashboard is built, and your team is trained. The timeline depends on how many integration categories are involved and the complexity of your existing systems.",
  },
  {
    question: "What does Managed Services include?",
    answer:
      "Once deployed, Quanton Labs operates the system on your behalf. System hosting, monitoring, workflow optimization, governance enforcement, SOP maintenance, and quarterly strategic reviews are all included in a fixed monthly retainer. Strategic advisory hours are included per management profile, with overage billed separately. AI model token usage is funded through your own account, giving you full visibility and control over consumption costs. Third-party platform subscription and API access fees (your CRM, accounting software, and other connected platforms) remain your responsibility, as they would with or without Quanton OS. The minimum commitment is six months, then month-to-month.",
  },
  {
    question: "Who owns the data and the infrastructure?",
    answer:
      "You do. The Diagnostic Report produced in Phase 1 is yours on delivery. The infrastructure deployed in Phase 2 is yours on completion. Your business data stays in your existing platforms. Quanton OS reads from and writes to them via API but does not store your data in a separate proprietary database.",
  },
  {
    question: "How do I get started?",
    answer:
      "Take the assessment on our site. It takes about five minutes and produces an immediate structural diagnostic of where your business stands today. If the results indicate a fit, the next step is a 30-minute Discovery call where we determine together whether Quanton OS is the right infrastructure for your business. If it is not, we will tell you that on the call.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      style={{
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "24px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "17px",
            color: "#1F2937",
            lineHeight: 1.4,
          }}
        >
          {faq.question}
        </span>
        <ChevronDown
          size={20}
          color="#6B7280"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "15px",
                color: "#374151",
                lineHeight: 1.75,
                paddingBottom: "24px",
                maxWidth: "720px",
                margin: 0,
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar isScrolled={false} />
      <main
        style={{
          paddingTop: "120px",
          paddingBottom: "100px",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "16px",
                ...GRADIENT_TEXT,
              }}
            >
              FAQ
            </div>
            <h1
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#1F2937",
                lineHeight: 1.25,
                margin: "0 0 16px",
              }}
            >
              Frequently asked questions
            </h1>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "16px",
                color: "#6B7280",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Clear answers about what Quanton OS is, how it works, and what the engagement looks like.
            </p>
          </div>

          <div style={{ borderTop: "1px solid #E5E7EB" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "64px" }}>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "16px",
                color: "#6B7280",
                marginBottom: "24px",
              }}
            >
              Still have questions?
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
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
                Assess Your Business
              </Link>
              <Link
                href="https://calendly.com/quantonlabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  borderRadius: "12px",
                  border: "2px solid #1F2937",
                  background: "transparent",
                  color: "#1F2937",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}