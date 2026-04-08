"use client";
import { useEffect, useState } from "react";
import Productivity from "@/components/landing/productivity";
import { HeroSection } from "@/components/landing/hero";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import Agents from "@/components/landing/agents";
import QuantonDashboard from "@/components/landing/QuantonDashboard";

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
      {/* Background */}
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl top-40 left-40 animate-bounce"></div>
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl bottom-10 right-40 animate-bounce"></div>
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl top-60 left-180 animate-bounce"></div>
      <div className="fixed z-0 bg-slate-400/10 w-[500px] h-[500px] blur-3xl -bottom-80 left-80 animate-bounce"></div>
      {/* Navbar */}
      <Navbar isScrolled={isScrolled} />
      {/* Hero */}
      <HeroSection />
      <Features />
      <Productivity />
      <Agents />
      <QuantonDashboard />
      <CTA />
      <Footer />
    </div>
  );
}
