"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Navbar({ setIsAssessmentOpen }: { setIsAssessmentOpen: Dispatch<SetStateAction<boolean>> }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [logoSrc, setLogoSrc] = useState('/images/assets/seo/ql_text.png');

  // Track page scroll
  const { scrollYProgress } = useScroll();

  // Map scroll progress to text brightness
  const linkColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#555555", "#ffffff"]
  );

  const buttonBorderColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.9)"]
  );

  // Swap logo image when scroll passes ~20% of page
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.2) {
      setLogoSrc('/images/assets/seo/ql_text_dark.png');
    } else {
      setLogoSrc('/images/assets/seo/ql_text.png');
    }
  });

  return (
    <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/20 backdrop-blur-2xl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-6"
        >
          <div className='flex items-center justify-center gap-1'>
            <img src={'/images/assets/seo/ql_logo.png'} className='w-6' />
            <motion.img src={logoSrc} className='w-30' />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Solutions', 'Resources'].map((item) => (
              <motion.div
                key={item}
                style={{ color: linkColor }}
                className="text-sm font-medium cursor-pointer transition-colors"
              >
                <Link href={`/#${item.toLowerCase()}`}>
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAssessmentOpen(true)}
            className="px-6 py-3 rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Begin Assessment
          </button>
          <motion.button
            onClick={() => {/* Book consultation logic */ }}
            style={{ borderColor: buttonBorderColor, color: linkColor }}
            className="px-6 py-3 border rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Link
              href="https://calendly.com/quantonlabs/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Consultation
            </Link>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}