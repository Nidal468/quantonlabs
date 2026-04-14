import { DOMAINS, TASK_VARIANTS, TaskResponse, Profile } from "@/db/assessments";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const AI_USAGE_FRAMING: Record<string, string> = {
  none: "How are these tasks currently handled in your business?",
  casual: "How are these tasks currently handled in your business?",
  fragmented: "How are these tasks currently structured and executed?",
  structured: "How are these tasks currently governed and coordinated?",
};

const gradientStyle = {
  background: 'linear-gradient(to right, #2B60EB, #8B37EA)',
};

const applyGradientBorder = (el: HTMLElement) => {
  el.style.border = '2px solid transparent';
  el.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(to right, #2B60EB, #8B37EA)';
  el.style.backgroundOrigin = 'border-box';
  el.style.backgroundClip = 'padding-box, border-box';
  el.style.boxShadow = '0 2px 12px rgba(43,96,235,0.12)';
};

const removeGradientBorder = (el: HTMLElement) => {
  el.style.border = '1px solid #e2e8f0';
  el.style.backgroundImage = 'none';
  el.style.backgroundOrigin = '';
  el.style.backgroundClip = '';
  el.style.boxShadow = 'none';
  el.style.background = '#f8fafc';
};

export default function RenderAssessmentStep({
  visibleDomains,
  allTasks,
  currentDomain,
  displayedTasks,
  handleResponseSelect,
  handleGovernanceToggle,
  handlePrevPage,
  handleNextPage,
  currentPage,
  taskResponses,
  setCurrentPage,
  setCurrentDomain,
  setCurrentStep,
  profile,
}: {
  visibleDomains: string[],
  allTasks: string[],
  currentDomain: number,
  displayedTasks: string[],
  handleResponseSelect: (taskId: string, responseValue: "not_doing" | "manual" | "loose_ai" | "structured") => void,
  handleGovernanceToggle: (taskId: string, flag: "system_governed" | "person_dependent") => void,
  handlePrevPage: () => void,
  handleNextPage: () => void,
  currentPage: number,
  taskResponses: Record<string, TaskResponse>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  setCurrentDomain: Dispatch<SetStateAction<number>>,
  setCurrentStep: Dispatch<SetStateAction<"results" | "lead" | "profile" | "assessment">>,
  profile: Partial<Profile>,
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [currentPage, currentDomain]);

  if (visibleDomains.length === 0 || currentDomain >= visibleDomains.length) return null;

  const domainKey = visibleDomains[currentDomain];
  const domainName = DOMAINS[domainKey as keyof typeof DOMAINS].name;

  if (allTasks.length === 0) return null;

  const totalTasks = allTasks.length;
  const progressPercent = Math.round((currentPage / totalTasks) * 100);
  const isLastTaskInDomain = currentPage >= totalTasks - 1;
  const isLastDomain = currentDomain >= visibleDomains.length - 1;
  const framingText = AI_USAGE_FRAMING[profile.ai_usage_level as string] || AI_USAGE_FRAMING.none;

  const currentTaskId = displayedTasks[0];
  const currentTaskAnswered = currentTaskId ? !!taskResponses[currentTaskId]?.response : false;

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div ref={cardRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
              <div style={{ padding: '20px 28px 0' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const,
                      color: '#1e293b',
                    }}>
                      {domainName}
                    </span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '2px 8px',
                      borderRadius: 20,
                    }}>
                      Domain {currentDomain + 1} of {visibleDomains.length}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>
                    Task {currentPage + 1} of {totalTasks}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
                  {framingText}
                </p>
              </div>

              {/* Tasks */}
              <div style={{ padding: '0 28px 20px' }}>
                {displayedTasks.map(taskId => {
                  const task = TASK_VARIANTS[taskId as keyof typeof TASK_VARIANTS];
                  if (!task) return null;

                  const industryKey = profile.industry_vertical as keyof typeof task.variants;
                  const taskLabel = task.variants && task.variants[industryKey]
                    ? task.variants[industryKey]
                    : task.label;

                  return (
                    <div key={taskId}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
                        {task.label}
                      </h3>
                      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>
                        {taskLabel}
                      </p>

                      {/* Response options */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                          {
                            key: 'not_doing',
                            label: 'Not doing this',
                            subtext: 'This task is not performed or is entirely reactive'
                          },
                          {
                            key: 'manual',
                            label: 'Manual only',
                            subtext: 'A person handles this entirely with no AI involvement'
                          },
                          {
                            key: 'loose_ai',
                            label: 'Using AI loosely',
                            subtext: 'AI tools applied without a defined process or consistent output'
                          },
                          {
                            key: 'structured',
                            label: 'Structured and governed',
                            subtext: 'Defined workflow, AI-assisted execution, approvals at decision points, consistent outputs'
                          }
                        ].map(option => {
                          const isSelected = taskResponses[taskId]?.response === option.key;
                          return (
                            <div
                              key={option.key}
                              onClick={() => handleResponseSelect(taskId, option.key as any)}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 12,
                                padding: '12px 14px',
                                borderRadius: 10,
                                cursor: 'pointer',
                                border: isSelected ? '2px solid #2B60EB' : '1px solid #e2e8f0',
                                background: isSelected ? '#eff6ff' : '#f8fafc',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={e => {
                                if (!isSelected) applyGradientBorder(e.currentTarget as HTMLElement);
                              }}
                              onMouseLeave={e => {
                                if (!isSelected) removeGradientBorder(e.currentTarget as HTMLElement);
                              }}
                            >
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
                                marginTop: 2,
                                transition: 'all 0.15s ease',
                              }}>
                                {isSelected && (
                                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff' }} />
                                )}
                              </div>
                              <div style={{ flex: 1 }}>
                                <p style={{
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: isSelected ? '#1d4ed8' : '#374151',
                                  marginBottom: 2,
                                }}>
                                  {option.label}
                                </p>
                                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                                  {option.subtext}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Governance toggle */}
                      {taskResponses[taskId]?.response === 'structured' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          style={{ marginTop: 16 }}
                        >
                          <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: 10,
                            padding: '12px 14px',
                          }}>
                            <p style={{ fontSize: 12, color: '#475569', fontWeight: 500, marginBottom: 10 }}>
                              Does this run consistently without relying on one person's judgment?
                            </p>
                            <div style={{ display: 'flex', gap: 8 }}>
                              {(['system_governed', 'person_dependent'] as const).map((flag, i) => {
                                const isActive = taskResponses[taskId]?.governance_flag === flag;
                                return (
                                  <button
                                    key={flag}
                                    onClick={() => handleGovernanceToggle(taskId, flag)}
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 500,
                                      padding: '6px 16px',
                                      borderRadius: 6,
                                      cursor: 'pointer',
                                      border: 'none',
                                      transition: 'all 0.15s ease',
                                      ...(isActive
                                        ? { ...gradientStyle, color: '#ffffff' }
                                        : { background: '#ffffff', border: '1px solid #e2e8f0', color: '#475569' }),
                                    }}
                                  >
                                    {i === 0 ? 'Yes' : 'No'}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 28px',
                borderTop: '1px solid #f1f5f9',
              }}>
                <button
                  onClick={() => {
                    if (currentPage === 0 && currentDomain > 0) {
                      setCurrentDomain(prev => prev - 1);
                      setCurrentPage(0);
                    } else {
                      handlePrevPage();
                    }
                  }}
                  disabled={currentPage === 0 && currentDomain === 0}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: (currentPage === 0 && currentDomain === 0) ? '#cbd5e1' : '#475569',
                    background: '#ffffff',
                    border: '1px solid',
                    borderColor: (currentPage === 0 && currentDomain === 0) ? '#e2e8f0' : '#cbd5e1',
                    borderRadius: 8,
                    padding: '8px 16px',
                    cursor: (currentPage === 0 && currentDomain === 0) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Back
                </button>

                {isLastTaskInDomain ? (
                  <button
                    onClick={() => {
                      if (isLastDomain) {
                        setCurrentStep('lead');
                      } else {
                        setCurrentDomain(prev => prev + 1);
                        setCurrentPage(0);
                      }
                    }}
                    disabled={!currentTaskAnswered}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 20px',
                      cursor: !currentTaskAnswered ? 'not-allowed' : 'pointer',
                      opacity: !currentTaskAnswered ? 0.4 : 1,
                      transition: 'opacity 0.15s ease',
                      ...gradientStyle,
                    }}
                  >
                    {isLastDomain ? 'View My Results' : 'Next Domain'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextPage}
                    disabled={!currentTaskAnswered}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 20px',
                      cursor: !currentTaskAnswered ? 'not-allowed' : 'pointer',
                      opacity: !currentTaskAnswered ? 0.4 : 1,
                      transition: 'opacity 0.15s ease',
                      ...gradientStyle,
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 16 }}>
              Your data is processed securely and never shared with third parties.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}