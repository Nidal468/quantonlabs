"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export type Section = 
  | "home" 
  | "governing" 
  | "demonstration" 
  | "dashboard" 
  | "agents" 
  | "benefits" 
  | "services" 
  | "stacks"
  | "reviews"
  | "agents-skills"
  | "contact";

interface NavigationBarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems: Array<{ key?: Section; label: string; external?: boolean; href?: string }> = [
  { key: "home", label: "Home" },
  { key: "governing", label: "Governing Agent" },
  { key: "demonstration", label: "Demonstration" },
  { key: "dashboard", label: "Dashboard" },
  { key: "agents", label: "Agents" },
  { href: "/assessment", label: "Assessment", external: true },
  { href: "/solutions", label: "Solutions", external: true },
  { href: "/case-studies", label: "Case Studies", external: true },
  { href: "/insights", label: "Insights", external: true },
];

export default function NavigationBar({ activeSection, onSectionChange }: NavigationBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="/images/assets/seo/ql_logo.png" 
              className="h-8 w-auto" 
              alt="Quanton Labs logo" 
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-sm tracking-wider">QUANTON OS</span>
              <span className="text-[9px] text-gray-400 tracking-[0.3em] uppercase">Intelligent System</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.external && item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.key!}
                  onClick={() => item.key && onSectionChange(item.key)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === item.key
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {activeSection === item.key && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  )}
                </button>
              )
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-sm hover:shadow-md"
            >
              Sign in
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4 overflow-hidden"
          >
            {navItems.map((item) => (
              item.external && item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-3 text-sm rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.key!}
                  onClick={() => {
                    if (item.key) onSectionChange(item.key);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === item.key
                      ? "bg-gray-50 text-gray-900 font-medium"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}