"use client";

import { motion } from "framer-motion";
import { Globe, Shield, Zap } from "lucide-react";

export default function GoverningAgent() {
  return (
    <section
      id="governing-agent"
      style={{ backgroundColor: "#041227", padding: "120px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            style={{
              background: "linear-gradient(to right, #2B60EB, #8B37EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textAlign: "center",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            THE GOVERNING AGENT
          </div>
          <h2
            style={{
              color: "#FFFFFF",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "56px",
              lineHeight: 1.15,
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            The Intelligence Layer That Makes the Whole System Work
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.70)",
              fontSize: "18px",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Most AI deployments are collections of tools that work in isolation. Quanton OS is different. The Governing Agent sits above all seven functional agents, receives structured data and exception flags from every domain, decides within its configured operating boundary, directs agents to act, and escalates what requires human judgment. Every function in your business is visible, coordinated, and governed from one view.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            className="rounded-xl transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "2px solid #2B60EB",
              borderRadius: "14px",
              padding: "32px",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.07)"; el.style.boxShadow = "0 8px 32px rgba(43,96,235,0.15)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "none"; }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "linear-gradient(135deg, #2B60EB, #8B37EA)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <Globe size={20} color="white" />
            </div>
            <h3 style={{ color: "#FFFFFF", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "12px" }}>
              Coordination
            </h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Manrope, sans-serif", fontSize: "15px", lineHeight: 1.65 }}>
              All seven agents operate from a unified shared state. The Governing Agent detects cross-functional conflicts, resolves coordination gaps, and ensures every domain is working from the same picture of the business.
            </p>
          </div>

          <div
            className="rounded-xl transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "2px solid #584DEB",
              borderRadius: "14px",
              padding: "32px",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.07)"; el.style.boxShadow = "0 8px 32px rgba(43,96,235,0.15)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "none"; }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "linear-gradient(135deg, #2B60EB, #8B37EA)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <Shield size={20} color="white" />
            </div>
            <h3 style={{ color: "#FFFFFF", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "12px" }}>
              Decision
            </h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Manrope, sans-serif", fontSize: "15px", lineHeight: 1.65 }}>
              The Governing Agent decides within its configured operating boundary without requiring human input on every action. Decisions that exceed the boundary are escalated immediately, with full context, to the appropriate decision-maker.
            </p>
          </div>

          <div
            className="rounded-xl transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "2px solid #8B37EA",
              borderRadius: "14px",
              padding: "32px",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.07)"; el.style.boxShadow = "0 8px 32px rgba(43,96,235,0.15)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "none"; }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "linear-gradient(135deg, #2B60EB, #8B37EA)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <Zap size={20} color="white" />
            </div>
            <h3 style={{ color: "#FFFFFF", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "12px" }}>
              Intelligence
            </h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Manrope, sans-serif", fontSize: "15px", lineHeight: 1.65 }}>
              Every agent action, exception, and resolution is captured and synthesised into the leadership dashboard in real time. The owner sees the full operational picture without assembling it manually.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
