"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  TrendingUp, CheckCircle, AlertTriangle, DollarSign,
  RefreshCw, LayoutGrid, BarChart2, Bell, User
} from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const LOGO_SRC = "/images/assets/ql-favicon.svg";

interface FeedItem {
  icon: string;
  color: string;
  event: string;
  meta: string;
  badge: { text: string; bg: string; color: string } | null;
  type: "default" | "alert" | "success";
}

interface MiniItem {
  text: string;
  urgent: boolean;
  id: number;
}

let idCounter = 0;
function makeItem(text: string, urgent: boolean): MiniItem {
  return { text, urgent, id: idCounter++ };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  sync: <RefreshCw size={12} color="white" />,
  alert: <AlertTriangle size={12} color="white" />,
  check: <CheckCircle size={12} color="white" />,
  trending: <TrendingUp size={12} color="white" />,
  dollar: <DollarSign size={12} color="white" />,
};

const INITIAL_FEED: FeedItem[] = [
  {
    icon: "sync",
    color: "#2B60EB",
    event: "SOP v2.1 approved, cross-domain applied",
    meta: "Operations Agent to all agents updated",
    badge: null,
    type: "default",
  },
  {
    icon: "trending",
    color: "#584DEB",
    event: "Pipeline velocity up 18% this month",
    meta: "Synthesis: Sales + Marketing + CX",
    badge: { text: "insight", bg: "rgba(88,77,235,0.10)", color: "#4338CA" },
    type: "default",
  },
  {
    icon: "check",
    color: "#4655EB",
    event: "Payroll confirmed, 8,400 processed",
    meta: "People Agent to Finance Agent confirmed",
    badge: null,
    type: "default",
  },
];

const INITIAL_PEOPLE: MiniItem[] = [
  makeItem("Performance review queued, Q2", false),
  makeItem("New hire onboarding, Day 3 tasks sent", false),
  makeItem("Payroll processed, 14 employees", false),
];

const INITIAL_SALES: MiniItem[] = [
  makeItem("Follow-up day 3, Meridian Logistics", false),
  makeItem("Pipeline: 3 active, 1 deferred", false),
  makeItem("CRM updated, 6 records synced", false),
];

const INITIAL_FINANCE: MiniItem[] = [
  makeItem("P&L report queued, sends 8AM", false),
  makeItem("Payroll confirmed, 8,400 processed", false),
  makeItem("Invoice generated, Phase 1", false),
];

const INITIAL_OPS: MiniItem[] = [
  makeItem("SOP v2.1 approved", false),
  makeItem("Task completion: 91% this week", false),
  makeItem("Vendor PO submitted, IT supplier", false),
];

export default function MobileDemo() {
  const [feed, setFeed] = useState<FeedItem[]>(INITIAL_FEED);
  const [peopleItems, setPeopleItems] = useState<MiniItem[]>(INITIAL_PEOPLE);
  const [salesItems, setSalesItems] = useState<MiniItem[]>(INITIAL_SALES);
  const [financeItems, setFinanceItems] = useState<MiniItem[]>(INITIAL_FINANCE);
  const [opsItems, setOpsItems] = useState<MiniItem[]>(INITIAL_OPS);
  const [excCount, setExcCount] = useState("1 pending");
  const [excColor, setExcColor] = useState("#D97706");
  const [excBg, setExcBg] = useState("rgba(245,158,11,0.10)");
  const [excBorder, setExcBorder] = useState("rgba(245,158,11,0.25)");
  const [alertActive, setAlertActive] = useState(false);
  const [approvalVisible, setApprovalVisible] = useState(false);
  const [rewardVisible, setRewardVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "analytics" | "alerts" | "profile">("dashboard");
  const [alertBadge, setAlertBadge] = useState(false);
  const [clockStr, setClockStr] = useState("6:35:00 AM");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [buttonState, setButtonState] = useState<"default" | "signing">("default");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const dashboardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const manualClickedRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clockRef = useRef({ h: 6, m: 35, s: 0 });

  useEffect(() => {
    const t = setInterval(() => {
      const c = clockRef.current;
      c.s++;
      if (c.s >= 60) { c.s = 0; c.m++; }
      if (c.m >= 60) { c.m = 0; c.h++; }
      if (c.h >= 24) c.h = 0;
      const h = c.h % 12 || 12;
      const ampm = c.h < 12 ? "AM" : "PM";
      setClockStr(`${h}:${String(c.m).padStart(2, "0")}:${String(c.s).padStart(2, "0")} ${ampm}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const clearSequence = () => {
    sequenceTimers.current.forEach(clearTimeout);
    sequenceTimers.current = [];
  };

  const scrollToDashboard = useCallback(() => {
    const el = dashboardRef.current;
    if (!el) return;
    const navbarHeight = 46;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setHasScrolled(true);
  }, []);

  const pushFeed = useCallback((item: FeedItem) => {
    setFeed(prev => [item, ...prev].slice(0, 4));
  }, []);

  const pushPeople = useCallback((text: string, urgent: boolean) => {
    setPeopleItems(prev => [makeItem(text, urgent), ...prev].slice(0, 3));
  }, []);

  const runDashboardSequence = useCallback(() => {
    clearSequence();
    const t = (ms: number, fn: () => void) => {
      const timer = setTimeout(fn, ms);
      sequenceTimers.current.push(timer);
    };

    t(3000, () => {
      setSalesItems(prev => [makeItem("Deal closed, Hartwell Group $142,000", false), ...prev].slice(0, 3));
      setFinanceItems(prev => [makeItem("Invoice generated, $142,000 Hartwell Group", false), ...prev].slice(0, 3));
      pushFeed({
        icon: "dollar", color: "#059669",
        event: "Major sale closed, Hartwell Group $142,000",
        meta: "Sales Agent to Finance + CX coordination triggered",
        badge: { text: "major sale", bg: "rgba(5,150,105,0.10)", color: "#065F46" },
        type: "success",
      });
    });

    t(7000, () => {
      setAlertActive(true);
      setAlertBadge(true);
      setExcCount("2 pending");
      setExcColor("#DC2626");
      setExcBg("rgba(239,68,68,0.08)");
      setExcBorder("rgba(239,68,68,0.25)");
      pushPeople("ALERT: J. Walsh, missed timecard punch 6:00 AM", true);
    });

    t(10000, () => {
      pushPeople("6:18 AM, called J. Walsh (843) 291-7734, no answer", true);
      pushFeed({
        icon: "alert", color: "#EF4444",
        event: "People Agent escalation, J. Walsh no call/no show",
        meta: "6:18 AM, mobile contact attempted, no answer. SMS sent.",
        badge: { text: "urgent", bg: "rgba(239,68,68,0.10)", color: "#DC2626" },
        type: "alert",
      });
    });

    t(13000, () => {
      pushPeople("6:18 AM, text sent, no reply. Emergency contact at 10AM", true);
      setOpsItems(prev => [makeItem("Routing: J. Walsh shift coverage review", true), ...prev].slice(0, 3));
    });

    t(17000, () => {
      pushFeed({
        icon: "alert", color: "#7341EA",
        event: "Approval required, shift coverage plan ready",
        meta: "People + Operations awaiting Managing Director decision",
        badge: { text: "action required", bg: "rgba(239,68,68,0.10)", color: "#DC2626" },
        type: "alert",
      });
      setApprovalVisible(true);
    });

    t(50000, () => resetDemo());
  }, [pushFeed, pushPeople]); // eslint-disable-line react-hooks/exhaustive-deps

  const runFillSequence = useCallback((afterFill: () => void) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setIsAnimating(true);
    setEmailText("");
    setPasswordText("");
    setButtonState("default");

    const email = "name@yourcompany.com";
    let ei = 0;

    const typeEmail = () => {
      if (ei < email.length) {
        const i = ei; ei++;
        setTimeout(() => { setEmailText(email.slice(0, i + 1)); typeEmail(); }, 38);
      } else {
        setTimeout(typePassword, 180);
      }
    };

    const typePassword = () => {
      let di = 0;
      const typeDot = () => {
        if (di < 12) {
          const d = di; di++;
          setTimeout(() => { setPasswordText("•".repeat(d + 1)); typeDot(); }, 55);
        } else {
          setButtonState("signing");
          setTimeout(() => {
            animatingRef.current = false;
            setIsAnimating(false);
            afterFill();
          }, 900);
        }
      };
      typeDot();
    };

    typeEmail();
  }, []);

  const resetDemo = useCallback(() => {
    clearSequence();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    animatingRef.current = false;
    manualClickedRef.current = false;
    setEmailText("");
    setPasswordText("");
    setButtonState("default");
    setIsAnimating(false);
    setHasScrolled(false);
    setFeed(INITIAL_FEED);
    setPeopleItems(INITIAL_PEOPLE);
    setSalesItems(INITIAL_SALES);
    setFinanceItems(INITIAL_FINANCE);
    setOpsItems(INITIAL_OPS);
    setExcCount("1 pending");
    setExcColor("#D97706");
    setExcBg("rgba(245,158,11,0.10)");
    setExcBorder("rgba(245,158,11,0.25)");
    setAlertActive(false);
    setAlertBadge(false);
    setApprovalVisible(false);
    setRewardVisible(false);
    setActiveTab("dashboard");
    const el = wrapperRef.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleApprove = useCallback(() => {
    clearSequence();
    setApprovalVisible(false);
    setRewardVisible(true);
    setAlertActive(false);
    setAlertBadge(false);
    setExcCount("0 pending");
    setExcColor("#16A34A");
    setExcBg("rgba(74,222,128,0.10)");
    setExcBorder("rgba(74,222,128,0.25)");
    pushFeed({
      icon: "check", color: "#059669",
      event: "Shift coverage plan approved, exception closed",
      meta: "Governing Agent to People + Operations updated",
      badge: { text: "resolved", bg: "rgba(5,150,105,0.10)", color: "#065F46" },
      type: "success",
    });
  }, [pushFeed]);

  const handleDefer = useCallback(() => {
    clearSequence();
    setApprovalVisible(false);
    setAlertActive(false);
    pushFeed({
      icon: "sync", color: "#6B7280",
      event: "Shift coverage decision deferred, flagged for review",
      meta: "Governing Agent to exception remains open",
      badge: { text: "deferred", bg: "rgba(107,114,128,0.10)", color: "#4B5563" },
      type: "default",
    });
    const timer = setTimeout(resetDemo, 8000);
    sequenceTimers.current.push(timer);
  }, [pushFeed, resetDemo]);

  const handleSignIn = useCallback(() => {
    if (animatingRef.current) return;
    manualClickedRef.current = true;
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    runFillSequence(() => {
      scrollToDashboard();
      setTimeout(() => runDashboardSequence(), 600);
    });
  }, [runFillSequence, scrollToDashboard, runDashboardSequence]);

  useEffect(() => {
    autoTimerRef.current = setTimeout(() => {
      if (manualClickedRef.current || animatingRef.current) return;
      runFillSequence(() => {
        scrollToDashboard();
        setTimeout(() => runDashboardSequence(), 600);
      });
    }, 8000);
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearSequence(), []);

  const feedCardStyle = (type: FeedItem["type"]) => {
    if (type === "alert") return {
      background: "#fff8f8", border: "1px solid rgba(239,68,68,0.20)",
      borderRadius: "14px", padding: "12px", marginBottom: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    };
    if (type === "success") return {
      background: "#f0fdf9", border: "1px solid rgba(5,150,105,0.20)",
      borderRadius: "14px", padding: "12px", marginBottom: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    };
    return {
      background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: "14px", padding: "12px", marginBottom: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    };
  };

  return (
    <div
      ref={wrapperRef}
      className="block md:hidden w-full"
      style={{ backgroundColor: "#F8F9FC", cursor: "default" }}
    >
      {/* Fixed Navbar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.97)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ height: "2px", background: GRADIENT }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={LOGO_SRC} width={26} height={26} alt="Quanton Labs" style={{ display: "block" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#1F2937", fontFamily: "Manrope, sans-serif" }}>
              QUANTON OS
            </span>
          </div>
          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            <a href="tel:+19292982162" style={{ color: "rgba(0,0,0,0.40)", display: "flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </a>
            <a href="mailto:growth@quantonlabs.com" style={{ color: "rgba(0,0,0,0.40)", display: "flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* LOGIN SCREEN */}
      <div style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px 40px",
      }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "6px 12px", borderRadius: "20px",
          background: "rgba(43,96,235,0.08)",
          border: "1px solid rgba(43,96,235,0.20)",
          marginBottom: "24px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2B60EB" }} />
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", color: "#2B60EB", fontFamily: "Manrope, sans-serif", textTransform: "uppercase" }}>
            Workspace Preview
          </span>
        </div>

        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
          <img src={LOGO_SRC} width={80} height={80} alt="Quanton Labs" style={{ display: "block" }} />
        </div>

        <div style={{ textAlign: "center", marginBottom: "28px", maxWidth: "320px" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#1F2937", fontFamily: "Manrope, sans-serif", letterSpacing: "-0.3px", marginBottom: "8px", lineHeight: 1.3 }}>
            See Quanton OS in action
          </div>
          <div style={{ fontSize: "13px", color: "rgba(0,0,0,0.55)", fontFamily: "Manrope, sans-serif", lineHeight: 1.5 }}>
            A live preview of the operator workspace. Sign in to enter, or watch the demo run automatically.
          </div>
        </div>

        <div style={{
          width: "100%", maxWidth: "360px",
          background: "#ffffff", borderRadius: "20px",
          border: "1px solid rgba(43,96,235,0.15)",
          boxShadow: "0 8px 48px rgba(43,96,235,0.12), 0 2px 12px rgba(0,0,0,0.06)",
          padding: "28px 24px",
        }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", color: "rgba(0,0,0,0.40)", fontFamily: "Manrope, sans-serif", textTransform: "uppercase", marginBottom: "16px" }}>
            Demo Workspace
          </div>

          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", fontFamily: "Manrope, sans-serif" }}>Email</label>
          <div style={{
            border: "1px solid rgba(43,96,235,0.25)", borderRadius: "10px",
            padding: "11px 14px", fontSize: "14px",
            color: emailText ? "#1F2937" : "#9CA3AF",
            fontFamily: "Manrope, sans-serif", background: "#F9FAFB",
            marginTop: "6px", marginBottom: "16px", minHeight: "42px",
          }}>
            {emailText || "name@yourcompany.com"}
          </div>

          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", fontFamily: "Manrope, sans-serif" }}>Password</label>
          <div style={{
            border: "1px solid rgba(43,96,235,0.25)", borderRadius: "10px",
            padding: "11px 14px", fontSize: "14px",
            color: passwordText ? "#1F2937" : "#9CA3AF",
            fontFamily: "Manrope, sans-serif", background: "#F9FAFB",
            marginTop: "6px", marginBottom: "20px", minHeight: "42px",
            letterSpacing: passwordText ? "0.15em" : "normal",
          }}>
            {passwordText || "••••••••"}
          </div>

          <button
            onClick={handleSignIn}
            disabled={isAnimating}
            style={{
              width: "100%", padding: "13px", borderRadius: "10px",
              background: GRADIENT, color: "white",
              fontFamily: "Manrope, sans-serif", fontWeight: 600,
              fontSize: "15px", border: "none",
              cursor: isAnimating ? "default" : "pointer",
              opacity: isAnimating ? 0.85 : 1,
            }}
          >
            {buttonState === "signing" ? "Signing in..." : "Enter the workspace"}
          </button>
        </div>

        <p style={{ color: "rgba(0,0,0,0.35)", fontFamily: "Manrope, sans-serif", fontSize: "11px", marginTop: "20px", textAlign: "center", letterSpacing: "0.02em" }}>
          Demo runs automatically in 8 seconds
        </p>
      </div>

      {/* DASHBOARD SCREEN */}
      <div ref={dashboardRef} style={{ paddingBottom: hasScrolled ? "72px" : "0" }}>

        <div style={{ background: "linear-gradient(135deg,#F8F9FC 0%,#EEF2FF 100%)", padding: "20px 16px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
            <div>
              <div style={{ color: "#1F2937", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.3px", marginBottom: "2px" }}>
                Meridian Logistics
              </div>
              <div style={{ color: "rgba(0,0,0,0.40)", fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 500 }}>
                {clockStr} · Live session
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.30)", padding: "5px 10px", borderRadius: "20px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#16A34A" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#16A34A", fontFamily: "Manrope, sans-serif" }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", paddingBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "20px", background: "rgba(43,96,235,0.10)", border: "1px solid rgba(43,96,235,0.20)" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2B60EB" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#2B60EB", fontFamily: "Manrope, sans-serif" }}>8/8 Agents Active</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "20px", background: excBg, border: `1px solid ${excBorder}` }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: excColor }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: excColor, fontFamily: "Manrope, sans-serif" }}>{excCount}</span>
            </div>
          </div>
        </div>

        <div style={{ padding: "12px 16px 0" }}>

          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(0,0,0,0.30)", textTransform: "uppercase", fontFamily: "Manrope, sans-serif", marginBottom: "8px" }}>
            Governing Agent · Live Feed
          </div>

          {feed.map((item, i) => (
            <div key={i} style={feedCardStyle(item.type)}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {ICON_MAP[item.icon]}
                </div>
                <div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 600, color: "#1F2937", lineHeight: 1.35, marginBottom: "2px" }}>
                    {item.event}
                    {item.badge && (
                      <span style={{ display: "inline-block", fontSize: "9px", fontWeight: 700, padding: "1px 7px", borderRadius: "4px", marginLeft: "5px", verticalAlign: "middle", background: item.badge.bg, color: item.badge.color }}>
                        {item.badge.text}
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(0,0,0,0.40)" }}>
                    {item.meta}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(0,0,0,0.30)", textTransform: "uppercase", fontFamily: "Manrope, sans-serif", marginBottom: "8px", marginTop: "4px" }}>
            Agent Status
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
            {[
              { label: "People and Team", items: peopleItems, alert: alertActive },
              { label: "Sales", items: salesItems, alert: false },
              { label: "Finance", items: financeItems, alert: false },
              { label: "Operations", items: opsItems, alert: false },
            ].map((agent, ai) => (
              <div
                key={ai}
                style={{
                  background: agent.alert ? "#fff8f8" : "#ffffff",
                  border: agent.alert ? "1px solid rgba(239,68,68,0.20)" : "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "12px", padding: "10px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "Manrope, sans-serif",
                  marginBottom: "6px",
                  color: agent.alert ? "#EF4444" : "transparent",
                  background: agent.alert ? "none" : "linear-gradient(to right, #2B60EB, #8B37EA)",
                  WebkitBackgroundClip: agent.alert ? "unset" : "text",
                  WebkitTextFillColor: agent.alert ? "#EF4444" : "transparent",
                  backgroundClip: agent.alert ? "unset" : "text",
                }}>
                  {agent.label}
                </div>
                {agent.items.slice(0, 3).map((item, ii) => (
                  <div key={item.id} style={{
                    fontFamily: "Manrope, sans-serif", fontSize: "10px",
                    fontWeight: item.urgent ? 700 : 500,
                    color: item.urgent ? "#DC2626" : "rgba(0,0,0,0.55)",
                    padding: "3px 0",
                    borderBottom: ii < 2 ? `1px solid ${item.urgent ? "rgba(239,68,68,0.08)" : "rgba(0,0,0,0.05)"}` : "none",
                    lineHeight: 1.4,
                  }}>
                    {item.text}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {approvalVisible && !rewardVisible && (
            <div style={{
              background: "rgba(43,96,235,0.05)",
              border: "1.5px solid rgba(70,85,235,0.25)",
              borderRadius: "14px", padding: "14px", marginBottom: "12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#D97706", letterSpacing: "0.08em", fontFamily: "Manrope, sans-serif" }}>
                  APPROVAL REQUIRED
                </span>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937", marginBottom: "4px", fontFamily: "Manrope, sans-serif" }}>
                Shift coverage plan ready
              </div>
              <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.50)", lineHeight: 1.6, marginBottom: "12px", fontFamily: "Manrope, sans-serif" }}>
                People + Operations: redistribute Walsh's tasks across Martinez and Chen. Your approval activates the plan across both agents.
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={handleApprove} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: GRADIENT, color: "#fff", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>
                  Approve
                </button>
                <button onClick={handleDefer} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "#F1F5F9", color: "#64748B", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "13px", border: "1px solid rgba(0,0,0,0.10)", cursor: "pointer" }}>
                  Defer
                </button>
              </div>
            </div>
          )}

          {rewardVisible && (
            <div style={{
              background: "#f0fdf9",
              border: "1.5px solid rgba(5,150,105,0.25)",
              borderRadius: "14px", padding: "14px", marginBottom: "12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937", marginBottom: "6px", fontFamily: "Manrope, sans-serif" }}>
                Decision executed across three agents.
              </div>
              <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.50)", lineHeight: 1.65, marginBottom: "12px", fontFamily: "Manrope, sans-serif" }}>
                People Agent logged the escalation. Operations Agent redistributed shift tasks. Governing Agent closed the exception. That is governed AI infrastructure: a system that coordinates, escalates, and acts on your approval.
              </div>
              <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "10px", background: GRADIENT, color: "#fff", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                Assess your business
              </Link>
            </div>
          )}

        </div>
      </div>

      {hasScrolled && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(255,255,255,0.98)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "10px 24px 20px",
          display: "flex", justifyContent: "space-around", alignItems: "center",
          backdropFilter: "blur(12px)",
        }}>
          {[
            { id: "dashboard", icon: <LayoutGrid size={20} />, label: "Dashboard" },
            { id: "analytics", icon: <BarChart2 size={20} />, label: "Analytics" },
            { id: "alerts", icon: <Bell size={20} />, label: "Alerts", badge: alertBadge },
            { id: "profile", icon: <User size={20} />, label: "Profile" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
                background: "none", border: "none", cursor: "pointer", position: "relative",
                color: activeTab === tab.id ? "#2B60EB" : "rgba(0,0,0,0.30)",
              }}
            >
              {tab.icon}
              {tab.badge && (
                <div style={{ position: "absolute", top: 0, right: -2, width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444" }} />
              )}
              <span style={{ fontSize: "9px", fontWeight: activeTab === tab.id ? 700 : 600, fontFamily: "Manrope, sans-serif", color: activeTab === tab.id ? "#2B60EB" : "rgba(0,0,0,0.30)" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}