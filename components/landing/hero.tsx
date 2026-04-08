"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IntelligentGridBackground } from "../animated/bg_grid";

export function HeroSection() {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [buttonState, setButtonState] = useState<"default" | "signing">("default");
  const [isAnimating, setIsAnimating] = useState(false);
  const [clicked, setClicked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const animFrameRef = useRef<number>(0);
  const repeatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickedRef = useRef(false);
  const animatingRef = useRef(false);

  const easeInOut = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
  };

  const drawModernCursor = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 17);
    ctx.lineTo(3.5, 12.5);
    ctx.lineTo(6, 19);
    ctx.lineTo(8, 18);
    ctx.lineTo(5.5, 12);
    ctx.lineTo(11, 12);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 1.2 / scale;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  };

  const getBtnCenter = () => {
    const btn = btnRef.current;
    const card = cardRef.current;
    if (!btn || !card) return { x: 150, y: 280 };
    const btnRect = btn.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    return {
      x: btnRect.left - cardRect.left + btnRect.width / 2 - 6,
      y: btnRect.top - cardRect.top + btnRect.height / 2 - 4,
    };
  };

  const stopPulse = () => {
    if (!btnRef.current) return;
    btnRef.current.style.animation = "none";
    btnRef.current.style.boxShadow = "none";
    btnRef.current.style.transform = "none";
  };

  const startPulse = () => {
    if (!btnRef.current) return;
    btnRef.current.style.animation = "btnGlow 2.5s ease-in-out infinite";
  };

  const triggerShake = () => {
    if (clickedRef.current || !btnRef.current) return;
    const btn = btnRef.current;
    const frames = [0, -4, 4, -3, 3, -2, 2, -1, 1, 0, 0, 0];
    let i = 0;
    const shake = setInterval(() => {
      btn.style.transform = `translateX(${frames[i]}px)`;
      i++;
      if (i >= frames.length) {
        clearInterval(shake);
        btn.style.transform = "none";
      }
    }, 55);
  };

  const runFillSequence = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setIsAnimating(true);
    stopPulse();
    if (repeatTimerRef.current) clearTimeout(repeatTimerRef.current);
    setEmailText("");
    setPasswordText("");
    setButtonState("default");

    const email = "hello@meridianlogistics.com";
    let ei = 0;

    const typeEmail = () => {
      if (ei < email.length) {
        const i = ei;
        ei++;
        setTimeout(() => {
          setEmailText(email.slice(0, i + 1));
          typeEmail();
        }, 38);
      } else {
        setTimeout(typePassword, 180);
      }
    };

    const typePassword = () => {
      let di = 0;
      const typeDot = () => {
        if (di < 12) {
          const d = di;
          di++;
          setTimeout(() => {
            setPasswordText("•".repeat(d + 1));
            typeDot();
          }, 55);
        } else {
          setButtonState("signing");
          setTimeout(() => {
            document
              .getElementById("dashboard-demo")
              ?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              setEmailText("");
              setPasswordText("");
              setButtonState("default");
              animatingRef.current = false;
              setIsAnimating(false);
              if (!clickedRef.current) {
                startPulse();
                repeatTimerRef.current = setTimeout(
                  fireCursorSequence,
                  7000
                );
              }
            }, 2000);
          }, 1200);
        }
      };
      typeDot();
    };

    typeEmail();
  };

  const animateCursor = (onClickReached: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas || clickedRef.current) return;
    sizeCanvas();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const target = getBtnCenter();
    const startX = canvas.width - 20;
    const startY = 10;
    const endX = target.x;
    const endY = target.y;

    const moveDuration = 1600;
    const hoverDuration = 400;
    const pressDuration = 200;
    const releaseDuration = 150;
    const fadeDuration = 400;

    const start = performance.now();
    let clickFired = false;

    const step = (now: number) => {
      if (clickedRef.current && clickFired) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      const e = now - start;

      if (e < moveDuration) {
        const t = easeInOut(e / moveDuration);
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t;
        ctx.globalAlpha = Math.min(e / 300, 1);
        drawModernCursor(ctx, x, y, 1);
      } else if (e < moveDuration + hoverDuration) {
        ctx.globalAlpha = 1;
        drawModernCursor(ctx, endX, endY, 1);
      } else if (
        e 
        moveDuration + hoverDuration + pressDuration
      ) {
        ctx.globalAlpha = 1;
        drawModernCursor(ctx, endX, endY, 0.84);
        if (!clickFired) {
          clickFired = true;
          onClickReached();
        }
      } else if (
        e 
        moveDuration + hoverDuration + pressDuration + releaseDuration
      ) {
        ctx.globalAlpha = 1;
        drawModernCursor(ctx, endX, endY, 1);
      } else {
        const fadeT = Math.min(
          (e -
            moveDuration -
            hoverDuration -
            pressDuration -
            releaseDuration) /
            fadeDuration,
          1
        );
        ctx.globalAlpha = 1 - fadeT;
        drawModernCursor(ctx, endX, endY, 1);
        if (fadeT >= 1) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const fireCursorSequence = () => {
    if (clickedRef.current || animatingRef.current) return;
    triggerShake();
    setTimeout(() => animateCursor(runFillSequence), 700);
  };

  const handleSignIn = () => {
    if (clickedRef.current || animatingRef.current) return;
    clickedRef.current = true;
    setClicked(true);
    if (repeatTimerRef.current) clearTimeout(repeatTimerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    stopPulse();
    runFillSequence();
  };

  useEffect(() => {
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    startPulse();
    const timer = setTimeout(fireCursorSequence, 2500);
    return () => {
      window.removeEventListener("resize", sizeCanvas);
      clearTimeout(timer);
      if (repeatTimerRef.current) clearTimeout(repeatTimerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

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
      <style>{`
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(43,96,235,0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(43,96,235,0); }
        }
        @keyframes signingPulse {
          from { opacity: 1; }
          to   { opacity: 0.45; }
        }
      `}</style>

      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: "3px",
          background:
            "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
        }}
      />

      <div className="relative container mx-auto w-full min-h-[85vh] flex flex-col items-center justify-center gap-16 z-10">
        <IntelligentGridBackground />

        <div className="flex items-center justify-between w-full">

          {/* Left Content */}
          <div className="flex flex-col items-start justify-center text-center md:text-left max-w-xl p-6">

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

            <h1
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
              style={{
                color: "#1F2937",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              The Architecture of Intelligent Business
            </h1>

            <p
              className="text-lg mb-4"
              style={{
                color: "#374151",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              You built a business. Now the business runs you. Quanton OS is
              the infrastructure that changes that.
            </p>

            <p
              className="text-lg mb-10"
              style={{
                color: "#1F2937",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                lineHeight: 1.7,
              }}
            >
              Eight coordinated AI agents. One governing intelligence layer.
              Built for businesses that have outgrown how they operate.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/assessment"
                style={{
                  background:
                    "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
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
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
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
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                Book a Discovery Call <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Content — floating login card */}
          <div className="hidden md:flex flex-col items-center justify-center relative w-full max-w-2xl">
            <div style={{ position: "relative", width: "320px" }}>
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              />
              <div
                ref={cardRef}
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(43,96,235,0.15)",
                  boxShadow: "0 0 80px rgba(43,96,235,0.18)",
                  background: "rgba(255,255,255,0.97)",
                  padding: "32px 28px",
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
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
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
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
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
                  ref={btnRef}
                  onClick={handleSignIn}
                  disabled={isAnimating}
                  style={{
                    background:
                      "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                    color: "white",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: isAnimating ? "default" : "pointer",
                    opacity: isAnimating ? 0.85 : 1,
                    animation:
                      buttonState === "signing"
                        ? "signingPulse 0.5s ease-in-out infinite alternate"
                        : undefined,
                    width: "100%",
                  }}
                >
                  {buttonState === "signing"
                    ? "Signing in..."
                    : "Sign in to Quanton OS"}
                </button>
              </div>
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
    </div>
  );
}
