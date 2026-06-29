"use client";

import { useEffect, useState, useRef } from "react";
import TabButton from "@/components/ui/tabbutton";
import ManufacturingDistribution from "@/components/landing-page/manufacturing&distribution";
import Retail from "@/components/landing-page/retail";
import Automotive from "@/components/landing-page/automotive";
import HomeServices from "@/components/landing-page/homeservices";
import HealthWellness from "@/components/landing-page/health&wellness";
import ProfessionalServices from "@/components/landing-page/professionalservices";
import HeroBackground from "@/app/HeroBackground";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Layers, ShieldAlert, LineChart } from "lucide-react";


const tabs = [
  { label: "Manufacturing & Distribution", value: "manufacturingdistribution" },
  { label: "Retail", value: "retail" },
  { label: "Automotive", value: "automotive" },
  { label: "Home Services", value: "homeservices" },
  { label: "Health & Wellness", value: "healthwellness" },
  { label: "Professional Services", value: "professionalservices" },
];

const AGENTS = [
  { agent: "SALES", text: "Booked 3 meetings · qualified $48K pipeline.", color: "text-blue-600 dark:text-blue-400" },
  { agent: "OPS",   text: "Routed 12 tickets · SLA 100%.",          color: "text-blue-600 dark:text-blue-400" },
  { agent: "MKT",   text: "Drafted weekly campaign · 4 variants live.",   color: "text-blue-600 dark:text-blue-400" },
  { agent: "CS",    text: "Resolved 27 chats · CSAT 4.9/5.",             color: "text-blue-600 dark:text-blue-400" },
  { agent: "FIN",   text: "Reconciled invoices · flagged 2 anomalies.",   color: "text-blue-600 dark:text-blue-400" },
  { agent: "DEV",   text: "Deploying patch 2.3.1",                        color: "text-amber-500" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedRows, setDisplayedRows] = useState<{ agent: string; text: string; color: string; done: boolean }[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setDisplayedRows([]);
        await delay(400);
        for (let i = 0; i < AGENTS.length; i++) {
          if (cancelled) return;
          const { agent, text, color } = AGENTS[i];
          setDisplayedRows((prev) => [...prev, { agent, text: "", color, done: false }]);
          await delay(120);
          for (let c = 1; c <= text.length; c++) {
            if (cancelled) return;
            const partial = text.slice(0, c);
            setDisplayedRows((prev) =>
              prev.map((r, idx) => (idx === i ? { ...r, text: partial } : r))
            );
            await delay(28);
          }
          setDisplayedRows((prev) =>
            prev.map((r, idx) => (idx === i ? { ...r, done: true } : r))
          );
          await delay(180);
        }
        await delay(2200);
      }
    };
    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    window.history.replaceState({ tab: "Home" }, "");
    const handlePopState = (e: PopStateEvent) => setActiveTab(e.state?.tab ?? "Home");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const changeTab = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setMenuOpen(false);
    window.history.pushState({ tab }, "");
  };

  return (
    /* FIXED: Changed from "w-full" to "w-full overflow-x-hidden" to clean container overflow metrics */
    <div className="w-full overflow-x-hidden">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 font-medium border-b border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6 md:px-10 lg:px-16 xl:px-40 py-4">
        <div className="flex items-center justify-between">
          <div onClick={() => changeTab("Home")} className="flex items-center gap-2 cursor-pointer select-none">
            <img src="/images/assets/seo/ql_logo.png" className="h-7 w-auto" alt="logo" />
            <img src="/images/assets/seo/ql_text.png" className="h-4 w-auto dark:hidden" alt="QuickLead" />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {tabs.map((tab) => (
              <TabButton key={tab.value} label={tab.label} value={tab.value} activeTab={activeTab} onTabChange={changeTab} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center cursor-pointer border border-gray-500 bg-transparent px-4 sm:px-6 py-1.5 text-sm font-medium text-slate-800 transition-all duration-200 ease-out hover:border-transparent hover:bg-gradient-to-tr hover:from-[#1a56ff] hover:to-[#9d31f5] hover:text-white"
            >
              Sign in
            </Link>
            <button
              className="lg:hidden p-1 text-slate-700 dark:text-slate-200"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-3 flex flex-col gap-1 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => changeTab(tab.value)}
                className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === tab.value
                    ? "bg-gradient-to-tr from-[#1a56ff] to-[#9d31f5] text-white font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div>
        {activeTab === "Home" && (
          <div>
            {/* HERO */}
            <div className="relative flex items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-40 py-8 md:py-12 min-h-[85vh]">
              <HeroBackground />
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 w-full">

                {/* LEFT */}
                <div className="flex-1 w-full text-center lg:text-left">

                  {/* BADGE */}
                  <div className="inline-flex items-center gap-2 mb-6 animate-[heroBadgePulse_2.8s_ease-in-out_infinite]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-transparent bg-clip-text bg-green-600 uppercase">
                     // SYS.ONLINE //
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900">
                    The{" "}
                    <span className="bg-gradient-to-tr from-[#1a56ff] to-[#9d31f5] bg-clip-text text-transparent">
                      Architecture
                    </span>{" "}
                    <br className="hidden sm:block" />
                    of Intelligent Business
                  </h1>
                  <p className="mt-6 text-base sm:text-lg leading-8 text-gray-600">
                    You built a business; now the business runs you.
                  </p>
                  <p className="text-base sm:text-lg leading-8 text-gray-600">
                    Quanton OS is the eight-agent infrastructure that changes that.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer border border-gray-500 bg-transparent px-6 py-2 text-sm font-medium text-slate-800 transition-all duration-200 ease-out hover:border-transparent hover:bg-gradient-to-tr hover:from-[#1a56ff] hover:to-[#9d31f5] hover:text-white">
                      Assess Your Business <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer border border-gray-500 bg-transparent px-6 py-2 text-sm font-medium text-slate-800 transition-all duration-200 ease-out hover:border-transparent hover:bg-gradient-to-tr hover:from-[#1a56ff] hover:to-[#9d31f5] hover:text-white">
                      Book a Discovery Call <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* RIGHT — Quanton OS live panel */}
                <div className="flex-1 w-full font-mono">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-medium tracking-widest text-gray-900 dark:text-gray-100">
                        QUANTON OS
                      </span>
                    </div>
                    <span className="text-[10px] tracking-wider text-gray-400">8 AGENTS ACTIVE</span>
                  </div>

                  <div className="border-l border-gray-300 dark:border-zinc-700 min-h-[240px]">
                    {displayedRows.map(({ agent, text, color, done }, i) => (
                      <div key={i} className="flex items-baseline gap-3 py-1.5 pl-3.5">
                        <span className={`text-[10px] font-medium tracking-widest w-10 shrink-0 ${color}`}>
                          {agent}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          {text}
                          {!done && <span className="animate-[blink_0.75s_step-end_infinite]">_</span>}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-zinc-800">
                    <span className="text-[9px] tracking-widest text-gray-400">
                      // REAL-TIME KERNEL VIEW — FULL DASHBOARD ABOVE
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* THE GOVERNING AGENT SECTION */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-40 py-16 md:py-24">
                
                {/* Top Metadata */}
                <div className="text-[10px] uppercase font-mono text-zinc-400 tracking-[0.2em] mb-6 flex items-center gap-4">
                  <span>[04]</span>
                  <div className="h-[1px] w-12 bg-zinc-300 dark:bg-zinc-700" />
                  <span>GOVERNANCE // SYSTEM LAYER</span>
                </div>

                {/* Section Headers Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
                  <div className="lg:col-span-7">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      The Governing Agent.
                    </h2>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-3 font-medium">
                      Without coordination, eight agents are just eight automations.
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
                      The Governing Agent is the structural layer that makes Quanton OS a system rather than a collection of tools. It receives data and exception flags from every functional agent, decides within its configured boundary, directs agents to act, and escalates what requires human judgment. Every function in your business visible, coordinated, and governed from one view.
                    </p>
                  </div>
                  <div className="lg:col-span-5 lg:text-right text-xs uppercase font-mono text-zinc-400 dark:text-zinc-500 tracking-wider leading-relaxed pt-2">
                    // ONE SYSTEM. ONE STATE. COMPOSABLE, MODULAR, DEPLOYED IN WEEKS NOT QUARTERS.
                  </div>
                </div>

                {/* Grid Content Column Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                  
                  {/* Column 1: Coordination */}
                  <div className="md:pr-8 py-6 md:py-0">
                    <div className="flex items-center justify-between mb-6 font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500">
                      <span>GOV_01 / CRD</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span className="text-zinc-900 dark:text-zinc-300">READY</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 rounded text-zinc-700 dark:text-zinc-300">
                      <Layers size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold text-lg mb-2">Coordination</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      All seven agents operate from a unified shared state. Cross-functional conflicts detected and resolved automatically.
                    </p>
                  </div>

                  {/* Column 2: Decision */}
                  <div className="md:px-8 py-6 md:py-0 border-t md:border-t-0 md:border-x border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-6 font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500">
                      <span>GOV_02 / DSC</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span className="text-zinc-900 dark:text-zinc-300">READY</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 rounded text-zinc-700 dark:text-zinc-300">
                      <ShieldAlert size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold text-lg mb-2">Decision</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Operates within its configured boundary without requiring human input on every action. Escalates what exceeds the boundary with full context.
                    </p>
                  </div>

                  {/* Column 3: Intelligence */}
                  <div className="md:pl-8 py-6 md:py-0 border-t md:border-t-0 border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-6 font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500">
                      <span>GOV_03 / INT</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span className="text-zinc-900 dark:text-zinc-300">READY</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 rounded text-zinc-700 dark:text-zinc-300">
                      <LineChart size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold text-lg mb-2">Intelligence</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Every agent action, exception, and resolution synthesised into the leadership dashboard in real time.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === "professionalservices" && <ProfessionalServices />}
        {activeTab === "manufacturingdistribution" && <ManufacturingDistribution />}
        {activeTab === "retail" && <Retail />}
        {activeTab === "automotive" && <Automotive />}
        {activeTab === "homeservices" && <HomeServices />}
        {activeTab === "healthwellness" && <HealthWellness />}
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}