"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { caseStudies } from "@/db/caseStudy";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function CaseStudiesIndex() {
  return (
    <>
      <Navbar isScrolled={true} />
      <div style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#ffffff", minHeight: "100vh", paddingTop: "120px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>Case Studies</div>
            <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 48px)", color: "#1F2937", lineHeight: 1.2, maxWidth: "700px", margin: "0 auto 16px" }}>
              Live deployments, across different industries.
            </h1>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
              Each build starts the same way: size the controllable loss, then deploy the infrastructure that removes it.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <Link
                  href={`/case-studies/${cs.id}`}
                  style={{
                    display: "block",
                    height: "100%",
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    padding: "28px",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(43,96,235,0.3)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(43,96,235,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  }}
                >
                  <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "19px", color: "#1F2937", marginBottom: "12px", lineHeight: 1.35 }}>
                    {cs.title}
                  </h2>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "#6B7280", lineHeight: 1.65, marginBottom: "20px" }}>
                    {cs.before.heading}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "13px", ...GRADIENT_TEXT }}>
                    Read the full case study
                    <ChevronRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }} style={{ marginTop: "64px", textAlign: "center", background: "#F9FAFB", borderRadius: "20px", border: "1px solid #E5E7EB", padding: "48px" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 30px)", color: "#1F2937", marginBottom: "14px" }}>See where your business stands.</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#6B7280", marginBottom: "28px", maxWidth: "440px", margin: "0 auto 28px" }}>
              The same diagnostic that started every deployment above.
            </p>
            <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: GRADIENT, color: "white", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>
              Assess Your Business <ArrowRight size={16} />
            </Link>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
}