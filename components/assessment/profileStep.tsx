import { Profile } from "@/db/assessments";
import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const gradientStyle = {
  background: 'linear-gradient(to right, #2B60EB, #8B37EA)',
};

export default function RenderProfileStep({
  profile,
  setProfile,
  handleSubmit,
}: {
  profile: Partial<Profile>,
  setProfile: Dispatch<SetStateAction<Partial<Profile>>>,
  handleSubmit: () => void,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const profileQuestions = [
    {
      id: 'industry_vertical',
      title: "What best describes your business?",
      options: [
        { key: 'professional_services', label: 'Professional Services (consulting, legal, accounting, agencies)' },
        { key: 'automotive', label: 'Automotive (dealerships, repair shops, detailing, fleet services)' },
        { key: 'retail', label: 'Retail and E-commerce' },
        { key: 'financial_services', label: 'Financial Services (insurance, wealth management, lending, bookkeeping)' },
        { key: 'healthcare', label: 'Healthcare (medical practices, dental, chiropractic, allied health)' },
        { key: 'beauty_aesthetics', label: 'Beauty, Aesthetics, and Wellness (salons, med spas, barbershops, spas, studios)' },
        { key: 'home_services', label: 'Home Services and Trades (HVAC, plumbing, electrical, cleaning, moving)' },
        { key: 'saas', label: 'SaaS and Technology' },
        { key: 'other', label: 'Other' }
      ]
    },
    {
      id: 'company_size',
      title: "How many people are on your team?",
      options: [
        { key: 'micro', label: '1–5 employees' },
        { key: 'small', label: '6–15 employees' },
        { key: 'medium', label: '16–30 employees' },
        { key: 'large', label: '31–50 employees' }
      ]
    },
    {
      id: 'revenue_range',
      title: "What is your approximate annual revenue?",
      options: [
        { key: 'under_1m', label: 'Under $1M' },
        { key: '1m_5m', label: '$1M – $5M' },
        { key: '5m_10m', label: '$5M – $10M' },
        { key: '10m_20m', label: '$10M – $20M' },
        { key: 'over_20m', label: 'Over $20M' }
      ]
    },
    {
      id: 'primary_pain_point',
      title: "What takes up more of your time than it should?",
      options: [
        { key: 'marketing', label: 'Keeping up with marketing and content' },
        { key: 'sales', label: 'Managing leads and closing deals' },
        { key: 'customers', label: 'Delivering a consistent client experience' },
        { key: 'finance', label: 'Staying on top of finances and admin' },
        { key: 'team', label: 'Coordinating my team and workflows' },
        { key: 'everything', label: 'All of the above' }
      ]
    }
  ];

  const totalPages = profileQuestions.length;
  const currentQuestion = profileQuestions[currentPage];
  const progressPercent = Math.round((currentPage / totalPages) * 100);
  const currentValue = profile[currentQuestion.id as keyof Profile];

  const handleProfileChange = (key: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
<div className="w-full flex flex-col items-center px-4 pt-8 pb-12">      <div className="w-full max-w-2xl">

        {/* Entry framing */}
        {currentPage === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-center"
          >
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1e293b', marginBottom: 10 }}>
              See where your operations stand.
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
              Answer four short questions, then complete a domain-by-domain review of how your key functions currently run. You will receive an Operational Readiness Report identifying your coverage gaps and the functions most likely to benefit from a coordinated AI operating system. Takes five to seven minutes.
            </p>
          </motion.div>
        )}

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}>

            {/* Progress bar */}
            <div style={{ height: 3, background: '#f1f5f9', width: '100%' }}>
              <div style={{
                height: 3,
                width: `${progressPercent}%`,
                ...gradientStyle,
                transition: 'width 0.3s ease',
              }} />
            </div>

            {/* Header */}
            <div style={{ padding: '16px 28px 0' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#94a3b8',
                }}>
                  Business Profile
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>
                  {currentPage + 1} of {totalPages}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${currentPage}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: 20,
                    marginTop: 4,
                  }}
                >
                  {currentQuestion.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Options */}
            <div style={{ padding: '0 28px 12px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`options-${currentPage}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.18 }}
                >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: currentQuestion.options.length <= 4 ? '1fr' : '1fr 1fr',
                    gap: 6,
                  }}>
                    {currentQuestion.options.map(option => {
                      const isSelected = currentValue === option.key;
                      return (
                        <div
                          key={option.key}
                          onClick={() => handleProfileChange(currentQuestion.id as keyof Profile, option.key)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '8px 12px',
                            borderRadius: 10,
                            cursor: 'pointer',
                            border: isSelected ? '2px solid #2B60EB' : '1px solid #e2e8f0',
                            background: isSelected ? '#eff6ff' : '#f8fafc',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            if (!isSelected) {
                              const el = e.currentTarget as HTMLElement;
                              el.style.border = '2px solid transparent';
                              el.style.backgroundImage = 'linear-gradient(#f8fafc, #f8fafc), linear-gradient(to right, #2B60EB, #8B37EA)';
                              el.style.backgroundOrigin = 'border-box';
                              el.style.backgroundClip = 'padding-box, border-box';
                              el.style.boxShadow = '0 2px 10px rgba(43,96,235,0.10)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isSelected) {
                              const el = e.currentTarget as HTMLElement;
                              el.style.border = '1px solid #e2e8f0';
                              el.style.backgroundImage = 'none';
                              el.style.backgroundOrigin = '';
                              el.style.backgroundClip = '';
                              el.style.boxShadow = 'none';
                              el.style.background = '#f8fafc';
                            }
                          }}
                        >
                          {/* Radio dot */}
                          <div style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: isSelected ? '2px solid #2B60EB' : '2px solid #cbd5e1',
                            background: isSelected ? '#2B60EB' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.15s ease',
                          }}>
                            {isSelected && (
                              <div style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#ffffff',
                              }} />
                            )}
                          </div>
                          <span style={{
                            fontSize: 13,
                            color: isSelected ? '#1d4ed8' : '#374151',
                            fontWeight: isSelected ? 500 : 400,
                            lineHeight: 1.4,
                          }}>
                            {option.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 28px',
              borderTop: '1px solid #f1f5f9',
            }}>
              <button
                onClick={prevStep}
                disabled={currentPage === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: currentPage === 0 ? '#cbd5e1' : '#475569',
                  background: '#ffffff',
                  border: '1px solid',
                  borderColor: currentPage === 0 ? '#e2e8f0' : '#cbd5e1',
                  borderRadius: 8,
                  padding: '8px 16px',
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <ChevronLeft size={14} />
                Back
              </button>

              {currentPage === totalPages - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!currentValue}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 20px',
                    cursor: !currentValue ? 'not-allowed' : 'pointer',
                    opacity: !currentValue ? 0.4 : 1,
                    transition: 'opacity 0.15s ease',
                    ...gradientStyle,
                  }}
                >
                  Begin Assessment
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!currentValue}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 20px',
                    cursor: !currentValue ? 'not-allowed' : 'pointer',
                    opacity: !currentValue ? 0.4 : 1,
                    transition: 'opacity 0.15s ease',
                    ...gradientStyle,
                  }}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Trust signal */}
          <p style={{
            textAlign: 'center',
            fontSize: 11,
            color: '#94a3b8',
            marginTop: 16,
          }}>
            Your data is processed securely and never shared with third parties.
          </p>
        </motion.div>
      </div>
    </div>
  );
}