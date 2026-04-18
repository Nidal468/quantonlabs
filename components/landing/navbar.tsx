"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

const solutions = [
  { label: "Professional Services", href: "/solutions/professional-services" },
  { label: "Health and Wellness", href: "/solutions/healthcare-wellness" },
  { label: "Home Services", href: "/solutions/home-services" },
  { label: "Automotive", href: "/solutions/automotive" },
  { label: "Retail", href: "/solutions/retail" },
  { label: "Manufacturing and Distribution", href: "/solutions/manufacturing-distribution" },
];

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="w-full h-[70px] fixed top-0 left-0 z-50 transition-all duration-500"
      style={{ background: "#041227" }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: "2px",
          width: "100%",
          background: GRADIENT,
        }}
      />

      <div className="flex items-center justify-between container mx-auto h-full px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src="/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png"
              width={200}
              height={60}
              alt="Quanton Labs"
              priority
              style={{ width: "200px", height: "auto", mixBlendMode: "screen" }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">

            {/* Solutions dropdown */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: dropdownOpen ? "#ffffff" : "rgba(255,255,255,0.70)",
                  transition: "color 0.2s ease",
                  padding: 0,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                onMouseLeave={e => { if (!dropdownOpen) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)"; }}
              >
                Solutions
                <ChevronDown
                  size={14}
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 16px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#041227",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "8px",
                    minWidth: "240px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                    zIndex: 100,
                  }}
                >
                  {/* Gradient top accent on dropdown */}
                  <div style={{ height: "2px", background: GRADIENT, borderRadius: "2px", marginBottom: "8px" }} />

                  {solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.70)",
                        textDecoration: "none",
                        transition: "background 0.15s ease, color 0.15s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)";
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <Link
          href="/dashboard"
          className="px-6 py-2 rounded-full text-white font-medium text-[12px]"
          style={{ background: GRADIENT }}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
