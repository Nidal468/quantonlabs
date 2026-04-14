import { Profile, TaskResponse, Lead } from "@/db/assessments";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

const gradientStyle = {
  background: 'linear-gradient(to right, #2B60EB, #8B37EA)',
};

export default function RenderResults({
  profile,
  taskResponses,
  leadInfo
}: {
  profile: Partial<Profile>,
  taskResponses: Record<string, TaskResponse>,
  leadInfo: Partial<Lead>
}) {
  const [data, setData] = useState({
    coveragePercentage: 0,
    totalTasks: 0,
    notDoing: 0,
    manual: 0,
    looseAI: 0,
    estimatedHoursLow: 0,
    estimatedHoursHigh: 0,
    structured: 0,
  });

  useEffect(() => {
    const get = async () => {
      const formdata = { taskResponses, leadInfo, profile };
      const res = await fetch('/api/assessment', {
        method: "POST",
        body: JSON.stringify(formdata),
        cache: 'no-store'
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    };
    get();
  }, []);

  // Derive AI maturity from actual task responses
  const totalResponses = Object.keys(taskResponses).length;
  const structuredCount = Object.values(taskResponses).filter(r => r.response === 'structured').length;
  const looseAICount = Object.values(taskResponses).filter(r => r.response === 'loose_ai').length;
  const structuredRatio = totalResponses > 0 ? structuredCount / totalResponses : 0;
  const looseRatio = totalResponses > 0 ? looseAICount / totalResponses : 0;

  const derivedMaturityCopy = structuredRatio >= 0.4
    ? "Your operation is more mature than most. The question is whether your current architecture provides unified visibility, cross-functional coordination, and governance enforcement across every domain."
    : looseRatio >= 0.3
    ? "You have invested in AI tools and automations, but your results suggest they are not working as a coordinated system. Disconnected automations create fragility and limit the compounding value that a governed architecture produces."
    : data.coveragePercentage > 30
    ? "You have started using AI in parts of your business. There is a significant difference between isolated tools and a coordinated operating system where agents work together across every function."
    : "Your business is operating largely on manual effort. Every domain in this assessment can be supported by a coordinated AI agent with defined governance and human oversight at every decision point.";

  const coverageLabel =
    data.coveragePercentage <= 20 ? 'Your business is running almost entirely on manual processes.' :
    data.coveragePercentage <= 40 ? 'You have started using AI, but most operations remain manual.' :
    data.coveragePercentage <= 60 ? 'You have moderate AI coverage with significant gaps in core functions.' :
    data.coveragePercentage <= 80 ? 'Your AI usage is above average, but disconnected tools limit your returns.' :
    'Your operations are well-covered. The question is whether your systems work together.';

  const recommendationLabel =
    data.coveragePercentage > 80
      ? "Your AI implementation is strong. The next priority is coordination and governance across functions."
      : data.coveragePercentage > 60
      ? "You have meaningful AI activity. The gaps are in structure and cross-functional visibility."
      : "Most of your operations are running on manual effort. A coordinated infrastructure will have immediate impact.";

  const ctaSubtext =
    profile.revenue_range === 'under_1m'
      ? "Quanton OS is designed for businesses generating $1M or more annually. If you are approaching that threshold, we would be glad to hear from you."
      : profile.revenue_range === 'over_20m'
      ? "Your organisation may benefit from Quanton OS at an enterprise configuration level. Contact us to discuss your requirements."
      : "";

  const isTargetSegment = profile.revenue_range !== 'under_1m' && profile.revenue_range !== 'over_20m';

  return (
    <div className="w-full max-w-6xl mx-auto pt-24 pb-16 px-4">

      {/* Results header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div
          className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4 text-white"
          style={gradientStyle}
        >
          Operational Readiness Report
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {leadInfo.full_name
            ? `${leadInfo.full_name.split(' ')[0]}'s AI Coverage Analysis`
            : 'Your AI Coverage Analysis'}
        </h1>
        <p className="text-base text-slate-500 max-w-2xl mx-auto">
          A domain-by-domain breakdown of how your business currently operates and where a coordinated AI operating system will have the greatest impact.
        </p>
      </motion.div>

      {/* Main dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Coverage summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            padding: 24,
            height: '100%',
          }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
                  Coverage Overview
                </h2>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, maxWidth: 340 }}>
                  {coverageLabel}
                </p>
              </div>
              <div
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 24,
                  flexShrink: 0,
                  ...gradientStyle,
                }}
              >
                {data.coveragePercentage}%
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Tasks Reviewed', value: data.totalTasks },
                { label: 'Manual Tasks', value: data.notDoing + data.manual },
                { label: 'Disconnected AI', value: data.looseAI },
              ].map(item => (
                <div key={item.label} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: 16,
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{item.label}</p>
                </div>
              ))}
            </div>

            {data.estimatedHoursLow > 0 && data.estimatedHoursHigh > 0 && (
              <div style={{
                marginTop: 16,
                padding: 16,
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 10,
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>
                  Estimated Manual Hours at Risk
                </p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#2B60EB', marginBottom: 4 }}>
                  {Math.round(data.estimatedHoursLow)}–{Math.round(data.estimatedHoursHigh)} hours per week
                </p>
                <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                  Based on your responses, this is the estimated time your team spends on tasks that a coordinated agent system would handle consistently without manual effort.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right rail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Response distribution */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            padding: 20,
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 16 }}>
              Response Distribution
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Not Doing', value: data.notDoing, color: '#e2e8f0' },
                { label: 'Manual Only', value: data.manual, color: '#cbd5e1' },
                { label: 'Loose AI', value: data.looseAI, color: '#93c5fd' },
                { label: 'Structured', value: data.structured, color: '#2B60EB' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: 13, color: '#475569' }}>{item.label}</span>
                  </div>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#374151',
                    background: '#f1f5f9',
                    padding: '2px 8px',
                    borderRadius: 20,
                  }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What this means + CTA */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            padding: 20,
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>
              What This Means
            </p>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
              {recommendationLabel}
            </p>

            {isTargetSegment && (
              <button
                onClick={() => window.open('https://calendly.com/quantonlabs/30min', '_blank')}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#ffffff',
                  ...gradientStyle,
                }}
              >
                Book Your Qualification Call
              </button>
            )}

            {profile.revenue_range === 'under_1m' && (
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                Quanton OS is designed for businesses generating $1M or more annually. If you are approaching that threshold,{' '}
                <a href="mailto:growth@quantonlabs.com" style={{ color: '#2B60EB', textDecoration: 'underline' }}>
                  we would be glad to hear from you.
                </a>
              </p>
            )}

            {profile.revenue_range === 'over_20m' && (
              <button
                onClick={() => window.location.href = 'mailto:growth@quantonlabs.com'}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#ffffff',
                  ...gradientStyle,
                }}
              >
                Contact Us to Discuss Your Requirements
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Agent map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          padding: 24,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
            The Agent Map
          </h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
            How Quanton OS maps to your business functions across all eight domains.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Marketing and Content Agent',
                system: 'Growth System',
                description: 'Plans, creates, distributes, and optimises content across all channels.',
                tags: ['Social Media', 'Long-form Content', 'Email Campaigns', 'Content Repurposing']
              },
              {
                name: 'Sales Agent',
                system: 'Growth System',
                description: 'Manages the revenue pipeline from inbound lead to closed deal.',
                tags: ['Lead Response', 'Proposal Generation', 'Follow-up Sequences', 'Pipeline Tracking']
              },
              {
                name: 'Customer Experience Agent',
                system: 'Operations and Growth Systems',
                description: 'Manages post-acquisition service, scheduling, and retention.',
                tags: ['FAQ Handling', 'Booking and Scheduling', 'Complaint Routing', 'Client Onboarding']
              },
              {
                name: 'People and Team Agent',
                system: 'Operations System',
                description: 'Manages the employee lifecycle and team performance infrastructure.',
                tags: ['Job Posting', 'Candidate Screening', 'Interview Scheduling', 'Onboarding Workflows']
              },
              {
                name: 'Operations Agent',
                system: 'Operations and Platform Systems',
                description: 'Controls internal execution infrastructure and process compliance.',
                tags: ['Task Assignment', 'SOP Creation', 'Vendor Coordination', 'Process Compliance']
              },
              {
                name: 'Inventory and Supply Chain Agent',
                system: 'Operations System',
                description: 'Manages stock levels, reorder triggers, and supplier systems.',
                tags: ['Stock Monitoring', 'Low Stock Alerts', 'Automated Reorders', 'Supplier Communication']
              },
              {
                name: 'Finance Agent',
                system: 'Operations System',
                description: 'Handles financial execution, reporting, and compliance infrastructure.',
                tags: ['Invoice Generation', 'Payment Reminders', 'Expense Categorisation', 'Financial Reporting']
              },
            ].map(agent => (
              <div
                key={agent.name}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: 16,
                  background: '#f8fafc',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#ffffff';
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#f8fafc';
                  el.style.boxShadow = 'none';
                }}
              >
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>
                  {agent.name}
                </h4>
                <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>{agent.system}</p>
                <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 10 }}>
                  {agent.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {agent.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 20,
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Governing Agent — full width */}
            <div
              className="md:col-span-2 lg:col-span-3"
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: 20,
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>
                    Governing Agent
                  </h4>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>All Four Operating Systems</p>
                </div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#ffffff',
                  padding: '3px 12px',
                  borderRadius: 20,
                  whiteSpace: 'nowrap' as const,
                  ...gradientStyle,
                }}>
                  Central Intelligence Layer
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>
                The coordination, decision, and intelligence layer that unifies the system. Receives structured data and exception flags from all seven functional agents, decides within its configured operating boundary, directs agents to act, escalates what requires human judgment, and feeds the leadership dashboard in real time. Without it, the seven agents are disconnected automations. With it, every function in your business is visible, coordinated, and governed from one view.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {['Cross-agent Coordination', 'Exception Management', 'KPI Monitoring', 'Leadership Dashboard', 'Governance Enforcement'].map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#ffffff',
                      padding: '2px 10px',
                      borderRadius: 20,
                      ...gradientStyle,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gap quantification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          padding: 24,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
            Gap Quantification
          </h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
            Measurable insights into your current operational coverage gaps.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              padding: 20,
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: 10,
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>
                Manual Hours at Risk
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#2B60EB', marginBottom: 6 }}>
                {Math.round(data.estimatedHoursLow)}–{Math.round(data.estimatedHoursHigh)} hours per week
              </p>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Based on your responses, your team is spending an estimated {Math.round(data.estimatedHoursLow)}–{Math.round(data.estimatedHoursHigh)} hours per week on tasks that a coordinated agent system would handle consistently without manual effort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div style={{
                padding: 20,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>
                  Uncovered Functions
                </p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                  {data.notDoing} functions
                </p>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  These are core business functions that are not currently being performed. Each represents a structural gap in your operational coverage.
                </p>
              </div>

              <div style={{
                padding: 20,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>
                  Fragmented AI Usage
                </p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                  {data.looseAI} tasks
                </p>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  Tasks using AI without a defined process or governance. Disconnected AI usage produces inconsistent outputs and creates dependencies on individual judgment rather than system-level structure.
                </p>
              </div>
            </div>

            {data.structured > 0 && (
              <div style={{
                padding: 20,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>
                  Governance Insight
                </p>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  You have {data.structured} structured workflows in place. The Governing Agent evaluates whether these run at the system level or remain dependent on individual judgment, and enforces governance across all agent domains to eliminate single points of failure.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: 40,
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
            Next Steps
          </h3>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 24px' }}>
            {derivedMaturityCopy}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {isTargetSegment && (
              <button
                onClick={() => window.open('https://calendly.com/quantonlabs/30min', '_blank')}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  ...gradientStyle,
                }}
              >
                Book Your Qualification Call
              </button>
            )}

            {profile.revenue_range === 'under_1m' && (
              <p style={{ fontSize: 13, color: '#64748b', maxWidth: 420, lineHeight: 1.6 }}>
                Quanton OS is designed for businesses generating $1M or more annually. If you are approaching that threshold,{' '}
                <a href="mailto:growth@quantonlabs.com" style={{ color: '#2B60EB', textDecoration: 'underline' }}>
                  we would be glad to hear from you.
                </a>
              </p>
            )}

            {profile.revenue_range === 'over_20m' && (
              <button
                onClick={() => window.location.href = 'mailto:growth@quantonlabs.com'}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  ...gradientStyle,
                }}
              >
                Contact Us to Discuss Your Requirements
              </button>
            )}
          </div>

          {ctaSubtext && (
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
              {ctaSubtext}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}