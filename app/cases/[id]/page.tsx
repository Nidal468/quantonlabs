'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ArrowRight, Share2, Bookmark, Star, Mail, Link2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { caseStudies } from '@/db/caseStudy'

export default function CaseStudyPage() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [caseStudyId, setCaseStudyId] = useState(0)

  useEffect(() => {
    if (window) {
      const id = window.location.pathname.split("/")[2]
      setCaseStudyId(Number(id))
    }
  }, [])

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      document.body.style.opacity = '1'
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const caseStudy = caseStudies.find(cs => cs.id === caseStudyId)

  if (!caseStudy) {
    return (
      <div>
        <h1>Go back</h1>
      </div>
    )
  }

  const getFailurePatternColor = (pattern: string): string => {
    if (pattern.includes('2.1')) return 'bg-pink-900 text-white'
    if (pattern.includes('2.2')) return 'bg-indigo-400/30 text-indigo-600'
    if (pattern.includes('2.3')) return 'bg-emerald-400/30 text-emerald-600'
    if (pattern.includes('2.4')) return 'bg-orange-400/30 text-orange-600'
    if (pattern.includes('2.5')) return 'bg-purple-400/30 text-purple-600'
    return 'bg-slate-400/30 text-slate-600'
  }

  const renderContentSection = (
    title: string,
    items: string[],
    className?: string
  ) => (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const CaseStudyHeader = () => (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="bg-slate-800 text-slate-200 mb-4">
          {caseStudy.subtitle}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {caseStudy.title}
        </h1>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2 text-zinc-600 hover:text-zinc-900 border-slate-700"
          >
            <Link href="/cases" >
              <ChevronLeft className="h-4 w-4 text-zinc-700" />
              Back to All Cases
            </Link>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700"
            onClick={() => setShowShareModal(true)}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">Rating:</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-600'
                  }`}
              />
            ))}
          </div>
          <span className="text-slate-400">(128 reviews)</span>
        </div>
      </div>
    </div>
  )

  const FailurePattern = () => (
    <Card className="bg-white/5 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className='text-white'>Failure Pattern Triggered</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`p-6 rounded-lg text-white bg-red-300/20`}>
          <h3 className="font-semibold text-xl mb-2">
            {caseStudy.before.heading}
          </h3>
          <ul className="space-y-4">
            {renderContentSection('Growth Driver', [
              caseStudy.before.growthDriver
            ])}
            {renderContentSection('AI Implementation', [
              caseStudy.before.aiUse
            ])}
            {renderContentSection('Operating Reality', [
              caseStudy.before.operatingReality
            ])}
            <li className="mt-6">
              <span className="font-medium">Pattern Triggered: </span>
              {caseStudy.before.failurePattern}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )

  const OutcomesList = () => (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold">Key Outcomes</h3>
      <ul className="space-y-3">
        {caseStudy.before.outcomes.map((outcome, index) => (
          <li
            key={index}
            className="flex items-start gap-2 p-4 bg-white/5 rounded-lg border border-slate-700"
          >
            <ChevronRight/>
            <span className='text-red-100'>{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const SolutionSection = () => (
    <Card className="bg-white/5 backdrop-blur-sm border-slate-700 text-white">
      <CardHeader>
        <CardTitle>Our Solution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderContentSection('Operating Architecture', [
          caseStudy.after.operatingArchitecture
        ])}

        {renderContentSection('Standardization', caseStudy.after.standardization, 'mt-8')}

        {renderContentSection('Governance & Review', caseStudy.after.governance, 'mt-8')}

        <div className="pt-6 border-t border-slate-700">
          <h4 className="font-semibold text-lg mb-2">Result</h4>
          <p className="text-blue-300 leading-relaxed">
            {caseStudy.after.result}
          </p>
        </div>
      </CardContent>
    </Card>
  )

  const KPIsSection = () => (
    <Card className="bg-white/5 backdrop-blur-sm border-slate-700 mt-6 text-white">
      <CardHeader>
        <CardTitle>KPIs Tracked</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudy.after.kpis.map((kpi, index) => (
            <div
              key={index}
              className="p-4 bg-white/10 rounded-lg border border-slate-700"
            >
              <span className="text-sm text-slate-300">{kpi}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const ShareModal = () => {
    if (!showShareModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#041227] border border-slate-700 rounded-xl w-full max-w-md"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Share Case Study</h3>

            <div className="space-y-4">
              <Button
                variant="secondary"
                className="w-full justify-start gap-2 bg-white text-black hover:bg-slate-100"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://example.com/cases/${caseStudy.id}`
                  )
                  toast('Link copied to clipboard', {
                    duration: 2000,
                  })
                  setShowShareModal(false)
                }}
              >
                <Link2/>
                <span>Copy Link</span>
              </Button>

              <Button
                variant="secondary"
                className="w-full justify-start gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700"
                onClick={() => {
                  // Handle social share
                  alert('Social sharing would go here')
                  setShowShareModal(false)
                }}
              >
                <span className="text-lg">𝕏</span>
                <span>Share on X</span>
              </Button>

              <Button
                variant="secondary"
                className="w-full justify-start gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700"
                onClick={() => {
                  // Handle email share
                  window.location.href = `mailto:?subject=Check out this case study&body=I thought you might find this interesting: ${encodeURI(`https://example.com/cases/${caseStudy.id}`)}`
                  setShowShareModal(false)
                }}
              >
                <Mail/>
                <span>Send via Email</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full text-slate-400 hover:text-zinc-800"
                onClick={() => setShowShareModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#041227] text-white px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <CaseStudyHeader />

        <div className="mt-12 space-y-6">
          {/* Left column - Failure Pattern */}
          <div className="space-y-6">
            <FailurePattern />
            <OutcomesList />
          </div>

          {/* Center column - Solution Details */}
          <div className="lg:col-span-2 space-y-6">
            <SolutionSection />
            <KPIsSection />

            <Card className="bg-white/5 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className='text-white'>Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">The Core Problem</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {caseStudy.before.failurePattern.split(' (')[0]}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-white">Successful Implementation</h4>
                  <p className="text-slate-300 leading-relaxed">
                    By implementing {caseStudy.title} with Quanton OS, we
                    transformed their operations by establishing clear workflows,
                    standardized processes, and defined ownership. The result was a
                    scalable system where AI augmentation worked within
                    established boundaries rather than creating new complexities.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-white">Measurable Impact</h4>
                  <ul className="space-y-2 text-slate-300">
                    {caseStudy.after.kpis.slice(0, 3).map((kpi, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="mt-8">
              <Button
                size="lg"
                className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  Get Started With Quanton OS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && <ShareModal />}
      </div>
    </div>
  )
}
