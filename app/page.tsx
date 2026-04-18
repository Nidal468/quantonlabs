"use client";
import { useEffect, useState } from "react";
import Productivity from "@/components/landing/productivity";
import { HeroSection } from "@/components/landing/hero";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import Agents from "@/components/landing/agents";
import GoverningAgentCTA from "@/components/landing/GoverningAgentCTA";
import QuantonDashboard from "@/components/landing/QuantonDashboard";
import MobileDemo from "@/components/landing/MobileDemo";

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
  <div className="w-full min-h-[200vh]">
    {/* Mobile demo — shown only below md breakpoint */}
    <MobileDemo />
    {/* Desktop — hidden on mobile */}
    <div className="hidden md:block">
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl top-40 left-40 animate-bounce pointer-events-none"></div>
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl bottom-10 right-40 animate-bounce pointer-events-none"></div>
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl top-60 left-180 animate-bounce pointer-events-none"></div>
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl -bottom-80 left-80 animate-bounce pointer-events-none"></div>
      <Navbar isScrolled={isScrolled} />
      <HeroSection />
{/* FOUR SYSTEMS SECTION — hidden, revisit if needed
      <Features />
      */}
      <Productivity />
      <Agents />
      <GoverningAgentCTA />
      <QuantonDashboard />
      <CTA />
      <Footer />
    </div>
  </div>
);
}
