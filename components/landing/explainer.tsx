"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Linkedin, Instagram, Youtube, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

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
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
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
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <ArrowUp size={18} color="white" />
        </button>
      )}

      <footer
        style={{
          backgroundColor: "#041227",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "96px",
          paddingBottom: "48px",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <p style={{ color: "rgba(255,255,255,0.60)", fontSize: "14px", lineHeight: 1.7 }}>
                Quanton OS is not software you install or a tool you configure yourself. It is a governed AI operating system built by Quanton Labs, deployed on our proprietary infrastructure, and connected directly to how your business already runs.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "16px", fontFamily: "Manrope, sans-serif" }}>
                Platform
              </h3>
              <div className="flex flex-col gap-3" style={{ fontSize: "14px", color: "rgba(255,255,255,0.60)" }}>
                <Link href="/assessment" className="hover:text-white transition">
                  Assess Your Business
                </Link>
                <Link href="https://calendly.com/quantonlabs/30min" className="hover:text-white transition">
                  Book a Discovery Call
                </Link>
                <Link href="/auth/signin" className="hover:text-white transition">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "16px", fontFamily: "Manrope, sans-serif" }}>
                Contact
              </h3>
              <div className="flex flex-col gap-3" style={{ fontSize: "14px", color: "rgba(255,255,255,0.60)" }}>
                
                <a
                  href="tel:+19292982162"
                  className="flex items-center gap-2 hover:text-white transition"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  <Phone size={16} />
                  +1 929-298-2162
                </a>
                
                <a
                  href="mailto:growth@quantonlabs.com"
                  className="flex items-center gap-2 hover:text-white transition"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  <Mail size={16} />
                  growth@quantonlabs.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "16px", fontFamily: "Manrope, sans-serif" }}>
                Product Updates
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.60)", marginBottom: "16px" }}>
                Subscribe to receive platform updates and new feature announcements.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
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
              marginTop: "40px",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <div className="flex items-center gap-6">
              <p>© {new Date().getFullYear()} Quanton Labs. All rights reserved.</p>
              <div className="flex gap-4">
                
                <a
                  href="https://www.instagram.com/quantonlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                  className="hover:text-white transition"
                >
                  <Instagram size={16} />
                </a>
                
                <a
                  href="https://linkedin.com/company/quantonlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                  className="hover:text-white transition"
                >
                  <Linkedin size={16} />
                </a>
                
                <a
                  href="https://www.youtube.com/@QuantonLabsOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                  className="hover:text-white transition"
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-6">
                <Link href="/privacy" style={{ color: "rgba(255,255,255,0.60)" }} className="hover:text-white transition">
                  Privacy
                </Link>
                <Link href="/terms" style={{ color: "rgba(255,255,255,0.60)" }} className="hover:text-white transition">
                  Terms
                </Link>
              </div>
         <Link 
  href="/" 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  <Image
    src="/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png"
    width={160}
    height={48}
    alt="Quanton Labs"
    style={{
      width: "160px",
      height: "auto",
      mixBlendMode: "screen",
    }}
  />
</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
