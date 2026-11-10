"use client";
import dynamic from "next/dynamic";
import Productivity from "@/components/landing/productivity";
import { HeroSection } from "@/components/landing/hero";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import "@/components/site/site.css";
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
return (
  <div className="w-full">
  
    <div>
      <SiteNav theme="dark" />
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
      <SiteFooter />
    </div>
  </div>
);
}