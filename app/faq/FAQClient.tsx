"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { faqs, faqCategories, type FaqItem } from "./faqData";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function FAQItem({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: "easeOut" }}
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
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Clear answers about what Quanton OS is, how it works, what you own, and what the engagement looks like.
            </p>
          </div>

          {faqCategories.map(category => {
            const items = faqs.filter(f => f.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: "56px" }}>
                <h2
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1.3,
                    margin: "0 0 8px",
                  }}
                >
                  {category}
                </h2>
                <div style={{ borderTop: "1px solid #E5E7EB" }}>
                  {items.map((faq, i) => (
                    <FAQItem key={faq.question} faq={faq} index={i} />
                  ))}
                </div>
              </div>
            );
          })}

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