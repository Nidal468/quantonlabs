"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NavigationBar, { Section } from "@/components/landing-page/NavigationBar";
import HeroSection from "@/components/landing-page/HeroSection";
import GoverningAgentSection from "@/components/landing-page/GoverningAgentSection";
import AgentDemonstration from "@/components/landing-page/AgentDemonstration";
import LiveDashboard from "@/components/landing-page/LiveDashboard";
import FunctionalAgentsGrid from "@/components/landing-page/FunctionalAgentsGrid";
import BusinessValue from "@/components/landing-page/BusinessValue";
import ServicesSection from "@/components/landing-page/ServicesSection";
import FinalCTA from "@/components/landing-page/FinalCTA";
import StackDevelopmentSection from "@/components/landing-page/StackDevelopmentSection";
import ReviewsSection from "@/components/landing-page/ReviewsSection";
import AgentsSkillsSection from "@/components/landing-page/AgentsSkillsSection";

// AgentDemonstration data interface
interface AgentTask {
  id: string;
  name: string;
  task: string;
  findings: string;
  status: string;
}

interface DemonstrationData {
  workflowId: string;
  governingAnalysis: string;
  agents: AgentTask[];
  exceptions: Array<{ agentId: string; message: string; severity: "low" | "medium" | "high" }>;
  pending: Array<{ agentId: string; message: string; severity: "low" | "medium" | "high" }>;
  metrics: {
    workflows: number;
    confidence: number;
    activeAgents: number;
  };
  executiveSummary: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [demoData, setDemoData] = useState<DemonstrationData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
       const sections: Section[] = [
         "home",
         "governing",
         "demonstration",
         "dashboard",
         "agents",
         "benefits",
         "services",
         "stacks",
         "reviews",
         "agents-skills",
         "contact",
       ];
      const sectionElements = document.querySelectorAll(sections.map((s) => `[id="${s}"]`).join(","));

      let currentSection: Section = "home";
      sectionElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            currentSection = el.id as Section;
          } else if (rect.top < 200 && rect.bottom > 200) {
            currentSection = el.id as Section;
          }
        }
      });

      // If no section is in view, default to home or the closest one
      if (currentSection === "home" && window.scrollY < 100) {
        currentSection = "home";
      }

      setActiveSection(currentSection);
    };

    const throttledScroll = throttle(handleScroll, 150);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={scrollRef} className="relative min-h-screen bg-white">
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
        style={{
          background: "linear-gradient(to right, #3b82f6, #8b5cf6, #6366f1)",
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      />

      {/* Navigation */}
      <NavigationBar activeSection={activeSection} onSectionChange={scrollToSection} />

      {/* Main Content */}
      <main>
        {/* Hero Section (id="home") */}
        <div id="home">
          <HeroSection />
        </div>

        {/* Governing Agent Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <GoverningAgentSection />
        </motion.div>

        {/* Interactive Agent Demonstration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <AgentDemonstration onDemoComplete={setDemoData} />
        </motion.div>

        {/* Live Operations Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <LiveDashboard demoData={demoData} />
        </motion.div>

        {/* Functional Agents Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <FunctionalAgentsGrid />
        </motion.div>

        {/* Business Value — Industries & Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <BusinessValue />
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <ServicesSection />
        </motion.div>

         {/* Final CTA — Custom Implementation & Contact */}
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: "-10%" }}
         >
           <FinalCTA />
         </motion.div>

         {/* Stack Development Section */}
         <StackDevelopmentSection />

         {/* Reviews Section */}
         <ReviewsSection />

         {/* Agents Skills Section */}
         <AgentsSkillsSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/assets/seo/ql_logo.png" className="h-6 w-auto opacity-70" alt="Quanton Labs logo" />
              <span className="text-xs text-gray-500 font-mono tracking-wider">
                © {new Date().getFullYear()} QUANTON LABS
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              // Built with intelligence. Operated by you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function throttle(fn: () => void, limit: number) {
  let inThrottle = false;
  return function () {
    if (!inThrottle) {
      fn();
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}