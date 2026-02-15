"use client";

import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function HeaderL() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
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
            <img src="/images/icon.png" alt="Quanton Labs Logo" className="w-full" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="#what-is-quanton-os"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('what-is-quanton-os');
            }}
            className="text-sm font-medium hover:text-blue-400 transition-colors"
          >
            Quanton OS
          </Link>

          <div ref={solutionsRef} className="relative">
            <button
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              className="flex items-center text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Solutions
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSolutionsOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#041227]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg z-50">
                <Link 
                  href="/solutions/home-services" 
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Home Services
                </Link>
                <Link 
                  href="/solutions/professional-services" 
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Professional Services
                </Link>
                <Link 
                  href="/solutions/automotive" 
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Automotive
                </Link>
                <Link 
                  href="/solutions/healthcare-wellness" 
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Healthcare & Wellness
                </Link>
                <Link 
                  href="/solutions/manufacturing-distribution" 
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Manufacturing & Distribution
                </Link>
                <Link 
                  href="/solutions/retail" 
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Retail
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="/assessment" 
            className="text-sm font-medium hover:text-blue-400 transition-colors"
          >
            Assessment
          </Link>

          <div ref={resourcesRef} className="relative">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Resources
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isResourcesOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#041227]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg z-50">
                <Link 
                  href="/resources/articles" 
                  onClick={() => setIsResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Articles
                </Link>
                <Link 
                  href="/resources/case-studies" 
                  onClick={() => setIsResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Case Studies
                </Link>
                <Link 
                  href="/resources/guides" 
                  onClick={() => setIsResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Guides
                </Link>
              </div>
            )}
          </div>

          <Link
            href="https://calendly.com/quantonlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#0080FF] text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Book Consultation
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
              href="#what-is-quanton-os"
              onClick={() => {
                scrollToSection('what-is-quanton-os');
                setIsMenuOpen(false);
              }}
              className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
            >
              Quanton OS
            </Link>
            
            <div className="pl-4">
              <button 
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className="flex items-center justify-between w-full text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSolutionsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    href="/solutions/home-services" 
                    onClick={() => {
                      setIsSolutionsOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Home Services
                  </Link>
                  <Link 
                    href="/solutions/professional-services" 
                    onClick={() => {
                      setIsSolutionsOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Professional Services
                  </Link>
                  <Link 
                    href="/solutions/automotive" 
                    onClick={() => {
                      setIsSolutionsOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Automotive
                  </Link>
                  <Link 
                    href="/solutions/healthcare-wellness" 
                    onClick={() => {
                      setIsSolutionsOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Healthcare & Wellness
                  </Link>
                  <Link 
                    href="/solutions/manufacturing-distribution" 
                    onClick={() => {
                      setIsSolutionsOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Manufacturing & Distribution
                  </Link>
                  <Link 
                    href="/solutions/retail" 
                    onClick={() => {
                      setIsSolutionsOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Retail
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/assessment"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
            >
              Assessment
            </Link>

            <div className="pl-4">
              <button 
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="flex items-center justify-between w-full text-sm font-medium hover:text-blue-400 transition-colors py-2"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    href="/resources/articles" 
                    onClick={() => {
                      setIsResourcesOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Articles
                  </Link>
                  <Link 
                    href="/resources/case-studies" 
                    onClick={() => {
                      setIsResourcesOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Case Studies
                  </Link>
                  <Link 
                    href="/resources/guides" 
                    onClick={() => {
                      setIsResourcesOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    Guides
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="https://calendly.com/quantonlabs/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#0080FF] text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 mt-2"
            >
              Book Consultation
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
