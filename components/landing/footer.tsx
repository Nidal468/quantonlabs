"use client";

import Link from "next/link";
import { Mail, Phone, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const solutions = [
  { label: "Professional Services", href: "/solutions/professional-services" },
  { label: "Home Services", href: "/solutions/home-services" },
  { label: "Automotive", href: "/solutions/automotive" },
  { label: "Health and Wellness", href: "/solutions/healthcare-wellness" },
  { label: "Manufacturing and Distribution", href: "/solutions/manufacturing-distribution" },
  { label: "Retail", href: "/solutions/retail" },
];

const headingStyle: React.CSSProperties = {
  color: "#FFFFFF",
  fontWeight: 600,
  marginBottom: "12px",
  fontFamily: "Manrope, sans-serif",
};

const columnStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.75)",
};

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Back to top button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2B60EB, #8B37EA)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 24px rgba(43,96,235,0.35)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateX(-50%) translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateX(-50%)")}
        >
          <ArrowUp size={18} color="white" aria-hidden="true" />
        </button>
      )}

      <footer
        style={{
          backgroundColor: "#041227",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "32px",
          paddingBottom: "16px",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.7 }}>
                Quanton OS is not software you install or a tool you configure yourself. It is an AI-native business system built by Quanton Labs, operated on our infrastructure, and shaped around how your business actually runs. You own what we build.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h3 style={headingStyle}>Platform</h3>
              <div className="flex flex-col gap-2" style={columnStyle}>
                <Link href="/architecture" className="hover:text-white transition">
                  Architecture
                </Link>
                <Link href="/case-studies" className="hover:text-white transition">
                  Case Studies
                </Link>
                <Link href="/insights" className="hover:text-white transition">
                  Insights
                </Link>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 style={headingStyle}>
                <Link href="/solutions" className="hover:text-white transition" style={{ color: "#FFFFFF", textDecoration: "none" }}>
                  Solutions
                </Link>
              </h3>
              <div className="flex flex-col gap-2" style={columnStyle}>
                {solutions.map(item => (
                  <Link key={item.href} href={item.href} className="hover:text-white transition">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 style={headingStyle}>Contact</h3>
              <div className="flex flex-col gap-2" style={columnStyle}>
                <Link href="/assessment" className="hover:text-white transition">
                  Assess Your Business
                </Link>
                <Link href="https://calendly.com/quantonlabs/30min" className="hover:text-white transition">
                  Book a Discovery Call
                </Link>
                <a
                  href="tel:+19292982162"
                  className="flex items-center gap-2 hover:text-white transition"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  <Phone size={16} aria-hidden="true" />
                  +1 929-298-2162
                </a>
                <a
                  href="mailto:growth@quantonlabs.com"
                  className="flex items-center gap-2 hover:text-white transition"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  <Mail size={16} aria-hidden="true" />
                  growth@quantonlabs.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 style={headingStyle}>Product Updates</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", marginBottom: "12px" }}>
                Subscribe to receive platform updates and new feature announcements.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: "20px",
              paddingTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.70)",
            }}
          >
            <div className="flex items-center gap-6">
              <p>© {new Date().getFullYear()} Quanton Labs. All rights reserved.</p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/quanton-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Quanton Labs on LinkedIn"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  className="hover:text-white transition"
                >
                  <Linkedin size={16} aria-hidden="true" />
                </a>
                <a
                  href="https://www.youtube.com/@QuantonLabsOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Quanton Labs on YouTube"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  className="hover:text-white transition"
                >
                  <Youtube size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-6">
                <Link href="/privacy" style={{ color: "rgba(255,255,255,0.75)" }} className="hover:text-white transition">
                  Privacy
                </Link>
                <Link href="/terms" style={{ color: "rgba(255,255,255,0.75)" }} className="hover:text-white transition">
                  Terms
                </Link>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}