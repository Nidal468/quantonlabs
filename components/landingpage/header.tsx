"use client"

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HeaderL() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                        <img src="/images/icon.png" className="w-full" />
                    </div>
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
    )
}