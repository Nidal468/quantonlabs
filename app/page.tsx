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
  Star,
  Calendar,
  Mail,
  FileText,
  Settings,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoModal from "@/components/demoModal";
import ContactSection from "@/components/landingpage/ContactSection";
import HeaderL from "@/components/landingpage/header";
import { blogPosts } from "@/db/blogs";
import { caseStudies } from "@/db/caseStudy";

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
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
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
            "name": "Abu Saleh",
            "role": "Lead Software Engineer",
            "bio": "AI systems architect with experience in enterprise automation platforms and software development."
          },
          {
            "name": "Abu Saeed",
            "role": "Graphics Designer",
            "bio": "Creative designer specializing in digital graphics, branding, and visual storytelling."
          }
        ]
          .map((member, index) => (
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
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
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
            "quote": "Quanton OS transformed how we operate. We've seen 40% faster execution times and clearer performance metrics.",
            "author": "Sarah Johnson",
            "role": "CTO, NovaAITech Solutions"
          },
          {
            "quote": "The AI orchestration has saved us countless hours each week. It's not just automation - it's intelligent intelligence.",
            "author": "Michael Chen",
            "role": "Operations Director, AIHyperGrowth Labs"
          },
          {
            "quote": "Our team could never have achieved this level of operational clarity without Quanton OS. It's truly the difference between chaos and control.",
            "author": "Elena Rodriguez",
            "role": "CEO, ApexAIScale Dynamics"
          }
        ]
          .map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
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
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
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

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


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
            description: "A step-by-step guide for installing, configuring, and deploying Quanton OS in production.",
            icon: <BookOpen className="w-5 h-5" />,
            link: "/pdf/Quanton OS Implementation Guide.docx.pdf"
          },
          {
            title: "Agent Architecture",
            description: "A detailed breakdown of Quanton OS agent design, components, and communication flow.",
            icon: <FileText className="w-5 h-5" />,
            link: "/pdf/Agent Architecture Reference.pdf"
          },
          {
            title: "Architecture",
            description: "An overview of the Quanton OS system architecture, including core services and data flow.",
            icon: <Settings className="w-5 h-5" />,
            link: "/pdf/quanton_os_architecture_brief.docx.pdf"
          }
        ].map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {resource.icon}
              </div>
              <h3 className="text-xl font-semibold">{resource.title}</h3>
            </div>
            <p className="text-slate-300 mb-3">{resource.description}</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => handleDownload(resource.link)}
            >
              Download
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const ProductUpdates = () => (
    <Section id="product-updates" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Updates</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Stay informed about the latest features and improvements.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {[
          {
            title: "AI Agent Enhancements",
            date: "June 15, 2025",
            summary: "New capabilities for intelligent decision making and automated workflows."
          },
          {
            title: "Enhanced Analytics Dashboard",
            date: "May 30, 2025",
            summary: "Real-time metrics with predictive insights for better business decisions."
          }
        ].map((update, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg mb-1">{update.title}</h3>
              <span className="text-sm text-slate-400 whitespace-nowrap">{update.date}</span>
            </div>
            <p className="text-slate-300">{update.summary}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const integrations = [
    {
      name: "Google Workspace",
      icon: <img src="/images/assets/landingpage/google.png" className="w-10 h-10 rounded-md" />
    },
    {
      name: "Slack",
      icon: <img src="/images/assets/landingpage/slack.png" className="w-10 h-10 rounded-md" />
    },
    {
      name: "Zapier",
      icon: <img src="/images/assets/landingpage/zapier.png" className="w-10 h-10 rounded-md" />
    },
    {
      name: "N8N",
      icon: <img src="/images/assets/landingpage/n8n.png" className="w-10 h-10 rounded-md" />
    }
  ];


  const Integrations = () => (
    <Section id="integrations" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrations</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Seamlessly connect with your existing tools and platforms.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {integrations.map((integration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              {integration.icon}
            </div>
            <p className="text-slate-300 text-sm font-medium">
              {integration.name}
            </p>
          </motion.div>
        ))}
      </div>

    </Section>
  );

  const EnterpriseSolutions = () => (
    <Section id="enterprise-solutions" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Solutions</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Custom enterprise-grade options for large organizations.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "SLA Guarantee",
            description: "Enterprise-level service level agreements with guaranteed uptime and response times."
          },
          {
            title: "On-Premise Deployment",
            description: "Fully customizable on-premise installations for compliance requirements."
          },
          {
            title: "Custom Development",
            description: "Tailored features built specifically to match your business workflows."
          },
          {
            title: "Dedicated Support",
            description: "24/7 dedicated account managers and technical support specialists."
          }
        ].map((solution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
            <p className="text-slate-300">{solution.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-md mx-auto mt-10">
        <Button variant="outline" className="w-full">
          Contact for Enterprise Pricing
        </Button>
      </div>
    </Section>
  );

  const CustomerSupport = () => (
    <Section id="customer-support" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Support</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Get help when you need it with our comprehensive support channels.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Live Chat",
            description: "Instant support during business hours",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.251-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )
          },
          {
            title: "Email Support",
            description: "Response within 2 hours during business days",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )
          },
          {
            title: "Phone Support",
            description: "Direct line for urgent issues",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            )
          },
          {
            title: "Knowledge Base",
            description: "Comprehensive documentation and tutorials",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s1.332.477 2.5 1.253" />
              </svg>
            )
          }
        ].map((support, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300 flex items-center"
          >
            <div className="p-3 bg-blue-500/10 rounded-lg mr-4 text-blue-400">
              {support.icon}
            </div>
            <div>
              <h3 className="font-semibold mb-1">{support.title}</h3>
              <p className="text-slate-300 text-sm">{support.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const EventsWebinars = () => (
    <Section id="events-webinars" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Events & Webinars</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Join our upcoming events to learn more about Quanton OS.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "AI in Business Operations",
            date: "June 20, 2025",
            time: "10:00 AM PST",
            description: "Learn how AI is transforming day-to-day business operations."
          },
          {
            title: "Implementing Quanton OS",
            date: "July 5, 2025",
            time: "2:00 PM EST",
            description: "A hands-on workshop for implementing Quanton OS in your organization."
          }
        ].map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <Calendar className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="font-semibold">{event.title}</h3>
            </div>
            <p className="text-slate-300 mb-2 flex items-center">
              <span className="mr-2">📅</span> {event.date}
            </p>
            <p className="text-slate-300 mb-4 flex items-center">
              <span className="mr-2">⏰</span> {event.time}
            </p>
            <p className="text-slate-300">{event.description}</p>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Register
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const WhitepapersEbooks = () => (
    <Section id="whitepapers-ebooks" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Whitepapers & Resources</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Download our comprehensive resources to deepen your understanding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "AI Adoption Pathways",
            description: "An in-depth analysis of why enterprise AI initiatives fail—and the strategic pathways that lead to real adoption and impact.",
            icon: <FileText className="w-5 h-5" />,
            link: "/pdf/whitepaper/AI Adoption Pathways_ Why Enterprise AI Initiatives Fail and What Separates Success from Stagnation.pdf"
          },
          {
            title: "Scaling Business Systems",
            description: "A practical guide to designing business systems and architectures that scale reliably as organizations grow.",
            icon: <BookOpen className="w-5 h-5" />,
            link: "/pdf/whitepaper/Scaling Business Systems.pdf"
          },
          {
            title: "The Operating System Imperative",
            description: "Why modern enterprises need an operating system layer—and how it reshapes coordination, automation, and execution.",
            icon: <BookOpen className="w-5 h-5" />,
            link: "/pdf/whitepaper/The Operating System Imperative.pdf"
          }
        ].map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300 flex items-start"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
              {resource.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-slate-300 mb-3">{resource.description}</p>
              <Button variant="outline" size="sm" onClick={() => handleDownload(resource.link)}>
                Download PDF
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );

  const Careers = () => (
    <Section id="careers" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Careers</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Join our team building the future of business operations.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Senior Software Engineer",
            location: "Remote",
            description: "Help us build the next generation of AI-powered business tools."
          },
          {
            title: "Product Manager",
            location: "San Francisco, CA",
            description: "Lead product development for our enterprise solutions."
          }
        ].map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
            <p className="text-blue-400 text-sm mb-2">{job.location}</p>
            <p className="text-slate-300 mb-4">{job.description}</p>
            <Button variant="outline" size="sm">
              Apply Now
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="text-slate-300 mb-4">Want to hear from us about opportunities?</p>
        <Button variant="outline" className="w-full">
          Join Our Talent Network
        </Button>
      </div>
    </Section>
  );

  // Add this section before the Company section in your return JSX
  const FounderSection = () => (
    <Section id="founder" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Founder & Managing Director</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Ryan Remington
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Container */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-slate-700" />
            <img
              src={'/images/founder.png'}
              alt="Ryan Remington - Founder & Managing Director of Quanton Labs"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-semibold mb-6 text-white">Ryan Remington</h3>
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Ryan Remington is the founder and Managing Director of Quanton Labs, where he drives the strategic vision and oversees the development of Quanton OS. He identified a recurring challenge in growing small and mid-sized businesses: as organizations expand, leaders struggle with fragmented systems, context switching, time pressures, and information overload. More technology and automation often add complexity rather than clarity.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Through hands-on operational experience and strategic consulting with service-based and luxury businesses, Ryan realized the core issue was the absence of a structured operating system to align strategy, execution, and intelligence. Quanton Labs addresses this gap by delivering cohesive operating environments that prioritize disciplined execution, decision clarity, and scalable growth.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Ryan holds an MBA from The Citadel and a BSc in Organizational Leadership and Communication with Honors from Marist College. A dual UK-US citizen and fluent in Spanish, he brings a global perspective to domestic operational challenges.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );

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
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-black/20">
        <div className="absolute inset-0 z-0 bg-linear-to-b from-blue-900/30 to-purple-900/30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-sm font-medium tracking-wider uppercase text-blue-300 mb-4">
              The Architecture of Intelligent Business
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Scale Faster with AI-Powered Operating System
            </h1>
            <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto mb-8 leading-relaxed">
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
              <Button variant={'secondary'} className="py-5 px-8">
                <Link
                  href="/assessment"
                >
                  Take an Assessment
                </Link>
              </Button>
            </div>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
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
      {TestimonialsSection()}
      {BlogSection()}
      {NewsletterSection()}
      {ContactSection()}
      {RoadmapSection()}
      {ResourcesSection()}

      {/* Brand new sections */}
      <ProductUpdates />
      <Integrations />
      <EnterpriseSolutions />
      <CustomerSupport />
      <EventsWebinars />
      <WhitepapersEbooks />
      <Careers />



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