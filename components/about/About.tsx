"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Building2,
  Wrench,
  Target,
} from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const trackRecord = [
  {
    icon: Building2,
    stat: "12+",
    label: "Locations run",
    detail: "Up to 75 staff, triple-digit revenue growth through process redesign, not added headcount.",
  },
  {
    icon: TrendingUp,
    stat: "$400K to $12M",
    label: "Regional turnaround",
    detail: "A 10-branch lending region moved from losses to growth through structure: KPIs, training, and compliance systems.",
  },
  {
    icon: Wrench,
    stat: "$1M+",
    label: "Built from zero",
    detail: "A premium automotive services company, ownership and operating model built from scratch. Porsche NA, BMW, Boeing, and Baker Motor Company signed on as partners.",
  },
  {
    icon: Target,
    stat: "3",
    label: "Ownership crises, one pattern",
    detail: "Consulting engagements spanning systems-poor operations, unplanned succession, and mid-transition leadership gaps.",
  },
];

const narrativeParagraphs = [
  "Ryan Remington has spent eighteen years inside businesses that were growing faster than their systems could support, across industries with nothing in common on the surface: vehicle rental, consumer lending, luxury automotive services, manufacturing. What repeated across all of them wasn't the business model. It was the failure pattern, revenue outpacing the infrastructure built to handle it.",
  "Twelve-plus rental locations and a staff of 75 taught him that revenue growth without process redesign just multiplies the chaos at scale. A lending region bleeding $400K in losses taught him the fix wasn't more oversight, it was better structure: KPIs, training, and compliance systems built for scale instead of built around one owner's memory. A premium automotive services company, built from the ground up under his own ownership, taught him the same lesson from the builder's side, where pricing, staffing, and service workflows had to be architected before the business could be trusted with a national brand partnership. Porsche NA, BMW, Boeing, and Baker Motor Company signed on because the operation could support that level of scrutiny, not because of the brand appeal of a car studio.",
  "By 2025, Remington was consulting directly for owner-led manufacturing and automotive businesses navigating three different versions of the same crisis: an established owner running systems-poor operations, an owner-successor with no formal training after losing a parent mid-transition, and an owner mid-handoff whose leadership authority hadn't yet caught up with the org chart. The triggers varied, but the underlying deficit was constant across all three: none of these businesses had built the infrastructure to run without the owner physically present in every decision.",
  "One engagement went further than a diagnosis. A precision manufacturer carrying $1.45M in annual controllable losses, most of it sitting in 23-plus weeks of excess inventory, needed more than a recommendation, and Remington built the fix directly: a 776-SKU data architecture and shipping action plan, deployed as a live operating system instead of handed off as a report.",
];

// ── STAT CARD ─────────────────────────────────────────────────────────────────

function StatCard({ item, index }: { item: typeof trackRecord[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        padding: "28px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(43,96,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
        <Icon size={20} color="#2B60EB" />
      </div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "26px", marginBottom: "6px", ...GRADIENT_TEXT }}>{item.stat}</div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "15px", color: "#1F2937", marginBottom: "10px" }}>{item.label}</div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#6B7280", lineHeight: 1.65 }}>{item.detail}</div>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function About() {
  const trackRef = useRef(null);
  const narrativeRef = useRef(null);
  const proofRef = useRef(null);
  const ctaRef = useRef(null);

  const trackInView = useInView(trackRef, { once: true, margin: "-80px" });
  const narrativeInView = useInView(narrativeRef, { once: true, margin: "-80px" });
  const proofInView = useInView(proofRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <div style={{ fontFamily: "Manrope, sans-serif" }}>

      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43,96,235,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139,55,234,0.05) 0%, transparent 70%),
            radial-gradient(circle, rgba(43,96,235,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 28px 28px",
          paddingTop: "120px",
          paddingBottom: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GRADIENT }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(43,96,235,0.2)", background: "rgba(43,96,235,0.05)", marginBottom: "28px" }}>
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", ...GRADIENT_TEXT }}>About</span>
              <ChevronRight size={12} color="#4655EB" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6B7280" }}>Quanton Labs</span>
            </div>

            <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.15, color: "#1F2937", marginBottom: "24px", letterSpacing: "-0.5px" }}>
              Built by someone who ran the chaos{" "}
              <span style={{ ...GRADIENT_TEXT }}>before he built the fix.</span>
            </h1>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "18px", color: "#374151", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 40px" }}>
              Quanton OS was not built from a theory about AI. It was built from eighteen years of running operations that outgrew their own systems, and from a consulting practice that watched the same failure repeat across every kind of owner-led business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TRACK RECORD ── */}
      <section ref={trackRef} style={{ backgroundColor: "#F9FAFB", padding: "100px 24px", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={trackInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>Track record</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "600px", margin: "0 auto" }}>Four ownership transitions. One repeated pattern.</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {trackRecord.map((item, i) => <StatCard key={item.label} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── NARRATIVE ── */}
      <section ref={narrativeRef} style={{ backgroundColor: "#ffffff", padding: "100px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={narrativeInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>Why Quanton Labs exists</div>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {narrativeParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={narrativeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#374151", lineHeight: 1.85 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF POINT ── */}
<section ref={proofRef} style={{ backgroundColor: "#041227", padding: "100px 24px" }}>
  <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
    <motion.div initial={{ opacity: 0, y: 24 }} animate={proofInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }}>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px", ...GRADIENT_TEXT }}>The infrastructure, not the theory</div>
      <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#ffffff", lineHeight: 1.3, marginBottom: "24px" }}>
        Quanton OS is the system built from that pattern: size the controllable loss, then deploy the infrastructure that removes it.
      </h2>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto 32px" }}>
        Multiple deployments are live right now, across manufacturing, real estate, events, and consumer platforms, each running on the same governed architecture.
      </p>
      <Link href="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "14px", ...GRADIENT_TEXT, textDecoration: "none" }}>
        See current deployments <ArrowRight size={14} />
      </Link>
    </motion.div>
  </div>
</section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ backgroundColor: "#ffffff", padding: "80px 24px 120px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", background: "#F9FAFB", borderRadius: "24px", border: "1px solid #E5E7EB", padding: "64px 48px", boxShadow: "0 8px 40px rgba(43,96,235,0.08)" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "16px" }}>See what the diagnostic finds in your business.</h2>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 40px" }}>The same discipline applied across every engagement: quantify the loss, then build the system that closes it.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: GRADIENT, color: "white", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>
              Assess Your Business <ArrowRight size={16} />
            </Link>
            <Link href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: "transparent", color: "#1F2937", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "1.5px solid #1F2937" }}>
              Book a Discovery Call <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}