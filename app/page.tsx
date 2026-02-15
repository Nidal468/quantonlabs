"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Users,
  Zap,
  ChevronUp,
  Star,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoModal from "@/components/demoModal";
import ContactSection from "@/components/landingpage/ContactSection";
import HeaderL from "@/components/landingpage/header";
import { blogPosts } from "@/db/blogs";
import { caseStudies } from "@/db/caseStudy";
import { Section } from "@/components/landingpage/sectionProvider";
import { FeaturesSection } from "@/components/landingpage/featuresSection";
import { BlogSection } from "@/components/landingpage/blogSection";
import { Careers } from "@/components/landingpage/careersSection";
import { CustomerSupport } from "@/components/landingpage/customerSupport";
import { EnterpriseSolutions } from "@/components/landingpage/enterpriseSolutions";
import { EventsWebinars } from "@/components/landingpage/eventWebinars";
import { FAQSection } from "@/components/landingpage/faqSection";
import { FounderSection } from "@/components/landingpage/founderSection";
import { Integrations } from "@/components/landingpage/IntegrationSection";
import { NewsletterSection } from "@/components/landingpage/newsletterSection";
import { ProductUpdates } from "@/components/landingpage/productUpdates";
import { ResourcesSection } from "@/components/landingpage/resourceSection";
import { RoadmapSection } from "@/components/landingpage/roadMapSection";
import { TeamSection } from "@/components/landingpage/teamSection";
import { TestimonialsSection } from "@/components/landingpage/testimonialsSection";
import { WhitepapersEbooks } from "@/components/landingpage/whitepapersSection";
import HeroSection from "@/components/landingpage/heroSection";

export default function HomePage() {
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    // Set footer year
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("ql-year");
    if (yearElement) {
      yearElement.textContent = String(currentYear);
    }

    // Handle scroll for back to top button
    const handleScroll = () => {
      setBackToTopVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    /* =========================================================
       Quanton Labs — Production Runtime JS
       ========================================================= */

    // Throttle utility
    function throttle<T extends (...args: any[]) => void>(fn: T, wait: number) {
      let lastTime = 0;
      let timeout: ReturnType<typeof setTimeout> | null = null;
      let lastArgs: any[] | null = null;
      let lastThis: any;

      return function (this: any, ...args: any[]) {
        const now = Date.now();
        const remaining = wait - (now - lastTime);

        lastArgs = args;
        lastThis = this;

        if (remaining <= 0) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }

          lastTime = now;
          fn.apply(lastThis, lastArgs);
          lastArgs = null;
        } else if (!timeout) {
          timeout = setTimeout(() => {
            lastTime = Date.now();
            timeout = null;

            if (lastArgs) {
              fn.apply(lastThis, lastArgs);
              lastArgs = null;
            }
          }, remaining);
        }
      };
    }


    /* 1) Motion preference */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* 2) Smooth anchor scrolling */
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    document.addEventListener("click", handleAnchorClick);

    /* 3) iOS viewport height fix */
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    const resizeHandler = throttle(setViewportHeight, 150);
    window.addEventListener("resize", resizeHandler);

    /* 4) Keyboard navigation detection */
    const onMouseDown = () =>
      document.documentElement.classList.remove("kb-nav");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.documentElement.classList.add("kb-nav");
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);

    /* 5) Button ripple effect */
    const buttons = document.querySelectorAll(
      'button[class*="btn"], a[class*="btn"]'
    );

    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        if (prefersReducedMotion) return;

        const el = btn as HTMLElement;
        const ripple = document.createElement("span");
        ripple.className = "ripple";

        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${(e as MouseEvent).clientX - rect.left - size / 2
          }px`;
        ripple.style.top = `${(e as MouseEvent).clientY - rect.top - size / 2
          }px`;

        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 450);
      });
    });

    /* Cleanup */
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.35/build/spline-viewer.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#041227] text-white">
      <video
        src="/video/bg.mp4"
        className="w-full h-screen absolute z-0 object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Header */}
      <HeaderL />

      {/* Hero Section */}
      <HeroSection/>

      {/* Who We Serve */}
      <Section id="who-we-serve" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto">
            Quanton OS is built for owner led, growth stage companies generating roughly one to twenty
            million in annual revenue that need an operating system, not more disconnected tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Who We Serve",
              description: "Owner-led companies with 5 to 50 employees that have outgrown ad hoc workflows and need a coherent operating system for the next stage of scale."
            },
            {
              title: "Where We Operate",
              description: "We sit at the intersection of fractional COOs, systems integrators, and AI automation firms, delivering infrastructure instead of isolated recommendations or disconnected automations."
            },
            {
              title: "What Changes",
              description: "Operational chaos gives way to governed execution, clear metrics, and an architecture that compounds momentum instead of constraining it."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border shadow-slate-800 hover:shadow-2xl border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Quanton OS */}
      <Section id="growth-os" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Is Quanton OS</h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto">
            Quanton OS is a deployable business operating system that integrates strategy,
            automation, and intelligence into a single governed infrastructure built on your
            existing platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Productized Architecture",
              description: "Pre-configured workspaces, standardized workflows, and governance fields that turn your project management stack into the control layer for the entire business."
            },
            {
              title: "AI Agent Orchestration",
              description: "Three tiers of AI agents, Launch, Elevate, and Command, orchestrate data flows, insights, and actions across your CRM, automations, and operational workspace."
            },
            {
              title: "Methodology, Not Just Tools",
              description: "A structured implementation methodology, performance reviews, and quarterly system audits ensure Quanton OS keeps evolving with your business instead of falling behind it."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Solutions */}
      <Section id="solutions" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions Built On Quanton OS</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Quanton OS functions like an intelligent ERP, with four interconnected operating systems
            that map directly to how your business actually runs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Strategy System",
              description: "Aligns vision, objectives, and KPIs. Runs diagnostics, planning cycles, and performance reviews so every initiative ties back to measurable outcomes."
            },
            {
              title: "Platform System",
              description: "Connects project management, CRM, data, and brand assets into a single architecture that supports automation, reporting, and decision velocity."
            },
            {
              title: "Operations System",
              description: "Governs day-to-day delivery, compliance, and quality control through standardized workflows, SOP references, and review cadences."
            },
            {
              title: "Growth System",
              description: "Drives revenue and visibility with structured campaigns, conversion optimization, and feedback loops that create compounding momentum."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Quanton OS Is Deployed</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            We deploy Quanton OS through a structured implementation cycle that balances strategic
            design, technical architecture, and human adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {[
            {
              title: "1. Diagnose",
              description: "Deep discovery, operational diagnostics, and KPI definition to map your current state, constraints, and growth objectives."
            },
            {
              title: "2. Design & Deploy",
              description: "Configure Quanton OS on your existing stack, deploy workflows and agents, and train your team on new execution patterns."
            },
            {
              title: "3. Optimize & Scale",
              description: "Monitor performance, increase automation coverage, and expand into managed services or partner licensing as your infrastructure matures."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="default" className="bg-linear-to-r from-blue-600 to-purple-600" onClick={() => window.location.href = "https://calendly.com/quantonlabs/30min"}>
            Discuss an Implementation
          </Button>
        </div>
      </Section>

      {/* Case Studies */}
      <Section id="case-studies" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Selected examples of how Quanton OS can be deployed to create clarity, control, and
            compound growth in real businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {caseStudies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between gap-4"

            >
              <div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{item.subtitle}</p>
              </div>
              <Link href={`/cases/${index}`} className="underline">Read more</Link>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="blogs" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blogs</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Selected articles exploring how Quanton OS can be deployed to create clarity, control,
            and compound growth in real businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{item.introduction}</p>
              </div>
              <Link href={`/blogs/${index}`} className="underline">Read more</Link>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* New Sections */}
      {FeaturesSection()}
      {FounderSection()}
      {TeamSection()}
      {FAQSection()}
      {NewsletterSection()}
      {ContactSection()}
      <ResourcesSection handleDownload={handleDownload} />
      <CustomerSupport />
      <WhitepapersEbooks handleDownload={handleDownload} />



      {/* Company */}
      <Section id="company" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quanton Labs</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Quanton Labs is a business infrastructure company behind Quanton OS, the architecture of
            intelligent business for growth stage companies. The system is the result of years of
            consulting work translating operating patterns into a repeatable, governed framework that
            AI can amplify without taking over the steering wheel.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#041227]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; <span id="ql-year">2025</span> Quanton Labs. All rights reserved.</div>
            <nav className="flex flex-wrap justify-center gap-4">
              {[
                "Quanton OS",
                "Solutions",
                "How It Works",
                "Who We Serve",
                "Case Studies",
                "Resources",
                "Docs",
                "Company"
              ].map((item, index) => (
                <Link
                  key={index}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {backToTopVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-linear-to-br from-blue-500/90 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Demo Modal */}
      <DemoModal showDemoModal={showDemoModal} setShowDemoModal={setShowDemoModal} />
    </div>
  );
}