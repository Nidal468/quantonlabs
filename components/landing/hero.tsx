"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { notifications } from "@/db/landingPage";
import { IntelligentGridBackground } from "../animated/bg_grid";

export function HeroSection() {
  const randomNotifications = useMemo(() => {
    const shuffled = [...notifications].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [buttonState, setButtonState] = useState<"default" | "signing">("default");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSignIn = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setButtonState("default");
    setEmailText("");
    setPasswordText("");

    const email = "meridian@quantonlabs.com";
    let emailIndex = 0;

    const typeEmail = () => {
      if (emailIndex < email.length) {
        const i = emailIndex;
        emailIndex++;
        setTimeout(() => {
          setEmailText(email.slice(0, i + 1));
          typeEmail();
        }, 40);
      } else {
        typePassword();
      }
    };

    const typePassword = () => {
      const totalDots = 12;
      let dotIndex = 0;
      const typeDot = () => {
        if (dotIndex < totalDots) {
          const d = dotIndex;
          dotIndex++;
          setTimeout(() => {
            setPasswordText("•".repeat(d + 1));
            typeDot();
          }, 60);
        } else {
          setButtonState("signing");
          setTimeout(() => {
            document.getElementById("dashboard-demo")?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              setEmailText("");
              setPasswordText("");
              setButtonState("default");
              setIsAnimating(false);
            }, 2000);
          }, 1200);
        }
      };
      typeDot();
    };

    typeEmail();
  };

  const bubbleGradients = [
    {
      bg: "rgba(43,96,235,0.12)",
      border: "1px solid rgba(43,96,235,0.25)",
      iconBg: "linear-gradient(135deg, #2B60EB, #4655EB)",
    },
    {
      bg: "rgba(88,77,235,0.12)",
      border: "1px solid rgba(88,77,235,0.25)",
      iconBg: "linear-gradient(135deg, #4655EB, #584DEB)",
    },
    {
      bg: "rgba(115,65,234,0.12)",
      border: "1px solid rgba(115,65,234,0.25)",
      iconBg: "linear-gradient(135deg, #584DEB, #7341EA)",
    },
    {
      bg: "rgba(139,55,234,0.12)",
      border: "1px solid rgba(139,55,234,0.25)",
      iconBg: "linear-gradient(135deg, #7341EA, #8B37EA)",
    },
  ];

  return (
    <div
      className="w-full relative overflow-hidden pt-16 md:pt-[80px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43, 96, 235, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139, 55, 234, 0.05) 0%, transparent 70%),
          radial-gradient(circle, rgba(43, 96, 235, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 28px 28px",
        backgroundColor: "white",
      }}
    >
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: "3px",
          background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
        }}
      />

      <div className="relative container mx-auto w-full min-h-[85vh] flex flex-col items-center justify-center gap-16 z-10">
        <IntelligentGridBackground />

        <div className="flex items-center justify-between w-full">

          {/* Left Content */}
          <div className="flex flex-col items-start justify-center text-center md:text-left max-w-xl p-6">

            {/* Eyebrow */}
            <p
              className="text-xs tracking-[0.25em] mb-6"
              style={{
                background: "linear-gradient(to right, #2B60EB, #8B37EA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
              }}
            >
              FOR OPERATORS WHO HAVE OUTGROWN HOW THEY OPERATE
            </p>

            {/* H1 */}
            <h1
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
              style={{
                color: "#1F2937",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              The Architecture of Intelligent Business
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg mb-4"
              style={{
                color: "#374151",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              You built a business. Now the business runs you. Quanton OS is the infrastructure that changes that.
            </p>

            {/* Product line */}
            <p
              className="text-lg mb-10"
              style={{
                color: "#1F2937",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                lineHeight: 1.7,
              }}
            >
              Eight coordinated AI agents. One governing intelligence layer. Built for businesses that have outgrown how they operate.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/assessment"
                style={{
                  background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                  color: "white",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  border: "none",
                  display: "inline-block",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.88";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Assess Your Business
              </Link>

              <Link
                href="https://calendly.com/quantonlabs/30min"
                style={{
                  background: "transparent",
                  color: "#1F2937",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  border: "1.5px solid #1F2937",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Book a Discovery Call <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Content — notifications and login card */}
          <div className="hidden md:flex flex-col items-center justify-center relative w-full max-w-2xl">

            {/* Notification bubbles */}
            <div className="flex flex-col gap-3 absolute left-0 top-1/2 -translate-y-1/2 z-20 w-72">
              {randomNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  style={{
                    background: bubbleGradients[index % 4].bg,
                    border: bubbleGradients[index % 4].border,
                    borderRadius: "12px",
                    padding: "10px 14px",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: bubbleGradients[index % 4].iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {notification.icon && (
                      <notification.icon size={14} color="white" />
                    )}
                  </div>
                  <p
                    style={{
                      color: "#1F2937",
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      margin: 0,
                    }}
                  >
                    {notification.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Floating login card */}
            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(43,96,235,0.15)",
                boxShadow: "0 0 80px rgba(43,96,235,0.18)",
                background: "rgba(255,255,255,0.97)",
                padding: "32px 28px",
                width: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#6B7280",
                  margin: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}
              >
                Quanton OS
              </p>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1F2937",
                  margin: 0,
                }}
              >
                Sign in to your workspace
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                  Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={emailText}
                  placeholder="you@company.com"
                  style={{
                    border: "1px solid rgba(43,96,235,0.25)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    fontSize: "14px",
                    color: "#1F2937",
                    fontFamily: "Manrope, sans-serif",
                    outline: "none",
                    background: "#F9FAFB",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                  Password
                </label>
                <input
                  type="text"
                  readOnly
                  value={passwordText}
                  placeholder="••••••••"
                  style={{
                    border: "1px solid rgba(43,96,235,0.25)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    fontSize: "14px",
                    color: "#1F2937",
                    fontFamily: "Manrope, sans-serif",
                    letterSpacing: "0.15em",
                    outline: "none",
                    background: "#F9FAFB",
                  }}
                />
              </div>
              <button
                onClick={handleSignIn}
                disabled={isAnimating}
                style={{
                  background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                  color: "white",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: isAnimating ? "default" : "pointer",
                  opacity: isAnimating ? 0.85 : 1,
                  animation: buttonState === "signing" ? "pulse-opacity 0.5s ease-in-out infinite alternate" : "none",
                }}
              >
                {buttonState === "signing" ? "Signing in..." : "Sign in to Quanton OS"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #ffffff)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />
      <style>{`
        @keyframes pulse-opacity {
          from { opacity: 1; }
          to { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
