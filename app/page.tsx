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
  Menu,
  X,
  Play,
  Star,
  Calendar,
  Mail,
  FileText,
  BarChart3,
  Settings,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoModal from "@/components/demoModal";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState("editor");
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

  // Section wrapper component
  const Section = ({ id, children, className = "" }: {
    id: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );

  // Interactive Demo Component
  const DemoSection = () => (
    <Section id="interactive-demo" className="bg-linear-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive AI Workflow Demo</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
          See Quanton OS in action with our interactive workflow builder.
          Experience how AI can automate your Google Workspace tools.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => setShowDemoModal(true)}
            className="bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <Play className="mr-2 w-4 h-4" />
            Try the Demo
          </Button>

          <Button variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Download Workflow Template
          </Button>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Workflow Builder",
            description: "Design AI workflows with drag-and-drop interface",
            icon: <Settings className="w-5 h-5" />
          },
          {
            title: "Real-time Execution",
            description: "Watch your workflow run across Google tools",
            icon: <Zap className="w-5 h-5" />
          },
          {
            title: "Performance Analytics",
            description: "View logs and metrics of each step",
            icon: <BarChart3 className="w-5 h-5" />
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  // New Sections
  const FeaturesSection = () => (
    <Section id="features" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Quanton OS provides enterprise-grade capabilities for growth-stage companies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "AI-Powered Automation",
            description: "Intelligent agents that work across your entire stack without vendor lock-in.",
            icon: <Zap className="w-5 h-5" />
          },
          {
            title: "Scalable Architecture",
            description: "Built to grow with your business, not constrain it through rigid processes.",
            icon: <Globe className="w-5 h-5" />
          },
          {
            title: "Unified Platform",
            description: "Single control layer for strategy, operations, and growth - no more scattered tools.",
            icon: <Users className="w-5 h-5" />
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const TeamSection = () => (
    <Section id="team" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          The people behind Quanton OS - experts in business architecture and AI integration.
        </p>
      </div>

      <div className="flex items-center justify-center max-w-6xl mx-auto gap-20">
        {[
          {
            name: "Ryan Remington",
            role: "CEO & Founder",
            bio: "Former CEO of 3 tech startups, with a focus on scalable business architecture."
          },
          {
            name: "Abu Saleh",
            role: "Lead Software Engineer",
            bio: "AI systems architect with experience in enterprise automation platforms and software development."
          }
        ].map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="mx-auto w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-purple-600 mb-4 overflow-hidden">
              <img src={'/images/space.png'} className="w-full h-full object-cover object-center" />
            </div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-blue-400 text-sm">{member.role}</p>
            <p className="text-slate-400 text-sm mt-2 max-w-[250px]">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const FAQSection = () => (
    <Section id="faq" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Answers to common questions about Quanton OS implementation and benefits.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          {
            question: "How long does it take to implement?",
            answer: "Most companies complete the initial implementation in 6-8 weeks, with continuous optimization phases."
          },
          {
            question: "Do you support integrations with our existing tools?",
            answer: "Yes - Quanton OS integrates natively with most popular business platforms and tools without vendor lock-in."
          },
          {
            question: "What happens during the transition period?",
            answer: "We provide full training, gradual adoption plans, and a dedicated implementation partner to ensure smooth transitions."
          },
          {
            question: "Can I scale up or down as my company grows?",
            answer: "Absolutely. Quanton OS is built with scalability in mind, allowing you to add features and users without re-architecture."
          }
        ].map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-slate-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const TestimonialsSection = () => (
    <Section id="testimonials" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Testimonials</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Hear what our clients say about their experience with Quanton OS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            quote: "Quanton OS transformed how we operate. We've seen 40% faster execution times and clearer performance metrics.",
            author: "Sarah Johnson",
            role: "CTO, TechSolutions Inc."
          },
          {
            quote: "The AI orchestration has saved us countless hours each week. It's not just automation - it's intelligent intelligence.",
            author: "Michael Chen",
            role: "Operations Director, GrowthCo"
          },
          {
            quote: "Our team could never have achieved this level of operational clarity without Quanton OS. It's truly the difference between chaos and control.",
            author: "Elena Rodriguez",
            role: "CEO, ScaleUp Corp"
          }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-slate-300 italic mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <div className="font-semibold">{testimonial.author}</div>
              <div className="mx-2 text-slate-500">•</div>
              <div className="text-sm text-slate-400">{testimonial.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const PartnersSection = () => (
    <Section id="partners" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Trusted by innovative companies across industries.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 max-w-6xl mx-auto justify-items-center">
        {["No partners"].map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="h-20 flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>
            <p className="text-slate-300 mt-2">{partner}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const BlogSection = () => (
    <Section id="blog" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Explore our latest articles on business architecture and AI integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Building Scalable Business Systems",
            excerpt: "How to create architectures that grow with your company instead of constraining it.",
            date: "May 15, 2025"
          },
          {
            title: "The Future of AI in Operations",
            excerpt: "Exploring how intelligent agents are transforming day-to-day business operations.",
            date: "June 2, 2025"
          }
        ].map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
            <p className="text-slate-300 mb-3">{article.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">{article.date}</span>
              <Button variant="link" size="sm" className="px-0 text-white">
                Read more
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const NewsletterSection = () => (
    <Section id="newsletter" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Subscribe to our newsletter for the latest articles and updates.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="grow px-4 py-3 rounded-lg bg-white/10 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button variant="default" className="px-6">
            Subscribe
          </Button>
        </div>
      </div>
    </Section>
  );

  const ContactSection = () => (
    <Section id="contact" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Have questions about Quanton OS? Our team is ready to help.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Email Us",
            description: "We typically respond within 24 hours",
            icon: <Mail className="w-5 h-5" />
          },
          {
            title: "Book a Demo",
            description: "Schedule time with our team to see Quanton OS in action",
            icon: <Calendar className="w-5 h-5" />
          }
        ].map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {contact.icon}
              </div>
              <h3 className="text-xl font-semibold">{contact.title}</h3>
            </div>
            <p className="text-slate-300">{contact.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-md mx-auto mt-8">
        <Button variant="outline" className="w-full">
          View Contact Form
        </Button>
      </div>
    </Section>
  );

  const RoadmapSection = () => (
    <Section id="roadmap" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Roadmap</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Discover upcoming features and improvements.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-blue-500 to-purple-500"></div>

        <div className="space-y-8">
          {[
            {
              title: "Q2 2026",
              description: "Advanced AI agent training and deployment tools"
            },
            {
              title: "Q3 2026",
              description: "Integration with more third-party platforms"
            },
            {
              title: "Q4 2026",
              description: "Enhanced performance analytics dashboard"
            }
          ].map((item, index) => (
            <div key={index} className="relative flex">
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-slate-300 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );

  const ResourcesSection = () => (
    <Section id="resources" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Resources</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Downloadable guides, documentation, and templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Implementation Guide",
            description: "Step-by-step guide for deploying Quanton OS",
            icon: <BookOpen className="w-5 h-5" />
          },
          {
            title: "API Documentation",
            description: "Complete reference for our integration endpoints",
            icon: <FileText className="w-5 h-5" />
          },
          {
            title: "Workflow Templates",
            description: "Ready-to-use templates for common business processes",
            icon: <Settings className="w-5 h-5" />
          }
        ].map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {resource.icon}
              </div>
              <h3 className="text-xl font-semibold">{resource.title}</h3>
            </div>
            <p className="text-slate-300 mb-3">{resource.description}</p>
            <Button variant="outline" size="sm" className="w-full">
              Download
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  return (
    <div className="min-h-screen bg-[#041227] text-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-[#041227]/80 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/images/icon.png" className="w-full" />
            </div>
            <span className="font-bold text-lg">Quanton Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#quanton-os" className="text-sm font-medium hover:text-blue-400 transition-colors">
              Quanton OS
            </Link>
            <Link href="#solutions" className="text-sm font-medium hover:text-blue-400 transition-colors">
              Solutions
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-400 transition-colors">
              How It Works
            </Link>
            <Link href="#who-we-serve" className="text-sm font-medium hover:text-blue-400 transition-colors">
              Who We Serve
            </Link>
            <Link href="#case-studies" className="text-sm font-medium hover:text-blue-400 transition-colors">
              Case Studies
            </Link>
            <Link href="#company" className="text-sm font-medium hover:text-blue-400 transition-colors">
              Company
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#041227]/50 hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* CTA Button */}
          <Link
            href="https://calendly.com/quantonlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#041227]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Link
                href="#quanton-os"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Quanton OS
              </Link>
              <Link
                href="#solutions"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Solutions
              </Link>
              <Link
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                How It Works
              </Link>
              <Link
                href="#who-we-serve"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Who We Serve
              </Link>
              <Link
                href="#case-studies"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Case Studies
              </Link>
              <Link
                href="#company"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Company
              </Link>
              <Link
                href="https://calendly.com/quantonlabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 mt-2"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-linear-to-b from-blue-900/30 to-purple-900/30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-sm font-medium tracking-wider uppercase text-blue-400 mb-4">
              The Architecture of Intelligent Business
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Scale Faster with AI-Powered Operating System
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Quanton OS integrates strategy, platforms, operations, and growth into one governed architecture.
              AI is woven through the execution layer, not bolted on as another app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="https://calendly.com/quantonlabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Book Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>

              <Button variant="outline" className="px-6 py-3 text-zinc-800">
                Explore Quanton OS
              </Button>
            </div>

            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Built for <span className="font-semibold text-white">growth-stage operators</span> who need an operating system that scales
              faster than headcount and makes AI part of the way the business runs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <Section id="who-we-serve" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
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
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
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
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
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
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
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
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
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
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="default" className="bg-linear-to-r from-blue-600 to-purple-600">
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
          {[
            {
              title: "Operational Reset",
              description: "Rebuilt the operating system for a multi location services company so leadership could see capacity, margin, and execution risk in a single view."
            },
            {
              title: "From Tools To Operating System",
              description: "Consolidated scattered tools into Quanton OS, turning dashboards, workflows, and agents into one governed architecture instead of a collection of apps."
            },
            {
              title: "Intelligence Layer On Top Of ERP",
              description: "Layered Quanton OS on top of an existing ERP so the executive team could run strategy, performance, and growth from a single intelligent control layer."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* New Sections */}
      {FeaturesSection()}
      {TeamSection()}
      {FAQSection()}
      {TestimonialsSection()}
      {PartnersSection()}
      {BlogSection()}
      {NewsletterSection()}
      {ContactSection()}
      {RoadmapSection()}
      {ResourcesSection()}
      {DemoSection()}

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
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-linear-to-br from-blue-500/90 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Demo Modal */}
      <DemoModal showDemoModal={showDemoModal} setShowDemoModal={setShowDemoModal}/>
    </div>
  );
}
