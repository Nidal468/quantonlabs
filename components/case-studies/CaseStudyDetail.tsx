'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ArrowRight, Share2, Mail, Link2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { caseStudies } from '@/db/caseStudy'
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function CaseStudyDetail({ id }: { id: number }) {
  const [showShareModal, setShowShareModal] = useState(false)
  const caseStudyId = id

  const caseStudy = caseStudies.find(cs => cs.id === caseStudyId)

  if (!caseStudy) {
    return (
      <>
        <Navbar isScrolled={true} />
        <div style={{ fontFamily: "Manrope, sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1F2937", marginBottom: "16px" }}>Case study not found</h1>
            <Link href="/" style={{ color: "#2B60EB", fontWeight: 600, textDecoration: "none" }}>Return home</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const renderList = (title: string, items: string[]) => (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "15px", color: "#1F2937", marginBottom: "10px" }}>{title}</h3>
      <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "#374151", lineHeight: 1.65 }}>
            <span style={{ marginTop: "8px", width: "4px", height: "4px", borderRadius: "50%", background: "#9CA3AF", flexShrink: 0 }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    padding: "32px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  };

  return (
    <>
      <Navbar isScrolled={true} />
      <div style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#F9FAFB", minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <Link href="/#case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 600, color: "#6B7280", textDecoration: "none" }}>
                <ChevronLeft size={16} />
                Back to all cases
              </Link>
              <button
                onClick={() => setShowShareModal(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "6px 14px", fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 600, color: "#374151", cursor: "pointer" }}
              >
                <Share2 size={14} />
                Share
              </button>
            </div>

            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(43,96,235,0.2)", background: "rgba(43,96,235,0.05)", marginBottom: "20px" }}>
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", ...GRADIENT_TEXT }}>{caseStudy.subtitle}</span>
            </div>

            <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.2, color: "#1F2937", marginBottom: "48px" }}>
              {caseStudy.title}
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} style={{ ...cardStyle, marginBottom: "20px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "16px" }}>Before</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "20px", color: "#1F2937", marginBottom: "20px" }}>
              {caseStudy.before.heading}
            </h2>
            {renderList('Growth Driver', [caseStudy.before.growthDriver])}
            {renderList('AI Implementation', [caseStudy.before.aiUse])}
            {renderList('Operating Reality', [caseStudy.before.operatingReality])}
            <div style={{ paddingTop: "16px", borderTop: "1px solid #F3F4F6" }}>
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "14px", color: "#1F2937" }}>Pattern triggered: </span>
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "#374151" }}>{caseStudy.before.failurePattern}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }} style={{ marginBottom: "20px" }}>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1F2937", marginBottom: "14px" }}>Key Outcomes</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {caseStudy.before.outcomes.map((outcome, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "16px 18px", background: "#ffffff", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
                  <ChevronRight size={16} color="#2B60EB" style={{ flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "#374151", lineHeight: 1.6 }}>{outcome}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} style={{ ...cardStyle, marginBottom: "20px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px", ...GRADIENT_TEXT }}>The Solution</div>
            {renderList('Operating Architecture', [caseStudy.after.operatingArchitecture])}
            {renderList('Standardization', caseStudy.after.standardization)}
            {renderList('Governance and Review', caseStudy.after.governance)}
            <div style={{ paddingTop: "20px", borderTop: "1px solid #F3F4F6" }}>
              <h4 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "15px", color: "#1F2937", marginBottom: "8px" }}>Result</h4>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#374151", lineHeight: 1.75 }}>{caseStudy.after.result}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }} style={{ ...cardStyle, marginBottom: "20px" }}>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1F2937", marginBottom: "18px" }}>KPIs Tracked</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
              {caseStudy.after.kpis.map((kpi, index) => (
                <div key={index} style={{ padding: "12px 16px", background: "#F9FAFB", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#374151", fontWeight: 500 }}>{kpi}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
            <Link
              href="/assessment"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "16px 28px", borderRadius: "10px", background: GRADIENT, color: "white", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
            >
              Get Started With Quanton OS
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {showShareModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: "#ffffff", borderRadius: "16px", width: "100%", maxWidth: "400px", padding: "28px", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}
              >
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1F2937", marginBottom: "20px" }}>Share Case Study</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://quantonlabs.com/case-studies/${caseStudy.id}`)
                      toast('Link copied to clipboard', { duration: 2000 })
                      setShowShareModal(false)
                    }}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "#ffffff", fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1F2937", cursor: "pointer" }}
                  >
                    <Link2 size={16} />
                    Copy Link
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = `mailto:?subject=Check out this case study&body=${encodeURI(`https://quantonlabs.com/case-studies/${caseStudy.id}`)}`
                      setShowShareModal(false)
                    }}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "#ffffff", fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1F2937", cursor: "pointer" }}
                  >
                    <Mail size={16} />
                    Send via Email
                  </button>
                  <button
                    onClick={() => setShowShareModal(false)}
                    style={{ padding: "12px 16px", borderRadius: "8px", border: "none", background: "none", fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 600, color: "#6B7280", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}