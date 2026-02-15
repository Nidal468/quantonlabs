import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-black/20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px:8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-blue-300 mb-4">
            The Architecture of Intelligent Business
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Scale Faster with AI-Powered Operating System
          </h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Quanton OS integrates strategy, platforms, operations, and growth into one governed architecture.
            AI is woven through the execution layer, not bolted on as another app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 w-full max-w-md mx-auto">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full w-full md:w-auto text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Take Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            
            <a
              href="https://calendly.com/quantonlabs/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full w-full md:w-auto text-white border-2 border-[#0080FF] font-medium hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Book Consultation
            </a>
          </div>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Built for <span className="font-semibold text-white">growth-stage operators</span> who need an operating system that scales
            faster than headcount and makes AI part of the way the business runs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
