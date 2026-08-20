"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Productivity from "@/components/landing/productivity";
import { HeroSection } from "@/components/landing/hero";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import Agents from "@/components/landing/agents";
import ProcessSection from "@/components/landing/ProcessSection";
import ContrastSection from "@/components/landing/ContrastSection";
import WhatCompoundsSection from "@/components/landing/WhatCompoundsSection";

// The dashboard demo is roughly 400 DOM nodes of animated, below-fold content.
// Loading it on demand keeps it off the critical render path on mobile. The
// placeholder height preserves layout so CLS stays at zero.
const QuantonDashboard = dynamic(
  () => import("@/components/landing/QuantonDashboard"),
  { ssr: false, loading: () => <div style={{ minHeight: 900 }} /> }
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.3;
      setIsScrolled(window.scrollY > triggerPoint);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
return (
  <div className="w-full">
  
    <div>
      <div className="hidden md:block fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl top-40 left-40 animate-bounce pointer-events-none"></div>
<div className="hidden md:block fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl bottom-10 right-40 animate-bounce pointer-events-none"></div>
<div className="hidden md:block fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl top-60 left-180 animate-bounce pointer-events-none"></div>
<div className="hidden md:block fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl -bottom-80 left-80 animate-bounce pointer-events-none"></div>
      <Navbar isScrolled={isScrolled} />
      <HeroSection />
      
{/* FOUR SYSTEMS SECTION - hidden, revisit if needed
      <Features />
      */}
      <QuantonDashboard />
      <Productivity />
      <Agents />
      <ProcessSection />
      <ContrastSection />
      <WhatCompoundsSection />
      <Footer />
    </div>
  </div>
);
}