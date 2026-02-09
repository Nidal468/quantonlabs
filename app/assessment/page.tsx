'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DOMAINS, FREQUENCY_WEIGHTS, Lead, Profile, TASK_VARIANTS, TaskResponse } from '@/db/assessments';

export default function AIAgentAssessment() {
  const [currentStep, setCurrentStep] = useState<'profile' | 'assessment' | 'lead' | 'results'>('profile');
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [taskResponses, setTaskResponses] = useState<Record<string, TaskResponse>>({});
  const [leadInfo, setLeadInfo] = useState<Partial<Lead>>({});
  const [currentDomain, setCurrentDomain] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Initialize from localStorage if available
  useEffect(() => {
    const savedProfile = localStorage.getItem('aiAssessment_profile');
    const savedResponses = localStorage.getItem('aiAssessment_responses');

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedResponses) setTaskResponses(JSON.parse(savedResponses));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('aiAssessment_profile', JSON.stringify(profile));
    localStorage.setItem('aiAssessment_responses', JSON.stringify(taskResponses));
  }, [profile, taskResponses]);

  const handleProfileChange = (key: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleResponseSelect = (taskId: string, responseValue: 'not_doing' | 'manual' | 'loose_ai' | 'structured') => {
    setTaskResponses(prev => ({
      ...prev,
      [taskId]: { response: responseValue }
    }));
  };

  const handleGovernanceToggle = (taskId: string, flag: 'system_governed' | 'person_dependent') => {
    setTaskResponses(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        governance_flag: flag
      }
    }));
  };

  // Get the visible domains based on industry and company size
  const getVisibleDomains = () => {
    const isMicro = profile.company_size === 'micro';
    const isVisible = (domainKey: string) => {
      if (isMicro && domainKey === 'people_team') return false;

      const domainVisibility: any = {
        marketing_content: true,
        sales: true,
        customer_experience: true,
        operations: true,
        inventory_supply: true,
        finance: true
      };

      // Apply conditional visibility rules based on industry vertical and company size
      if (profile.industry_vertical === 'professional_services') domainVisibility.marketing_content = true;
      if (profile.industry_vertical === 'automotive' && !isMicro) domainVisibility.inventory_supply = true;
      if (profile.industry_vertical === 'retail' && !isMicro) domainVisibility.inventory_supply = true;
      if (profile.industry_vertical === 'financial_services') domainVisibility.marketing_content = true;
      if (profile.industry_vertical === 'healthcare') domainVisibility.marketing_content = true;
      if (profile.industry_vertical === 'beauty_aesthetics' && !isMicro) {
        domainVisibility.inventory_supply = false; // Reduced task set
      }
      if (profile.industry_vertical === 'home_services') domainVisibility.marketing_content = true;
      if (profile.industry_vertical === 'saas') domainVisibility.marketing_content = true;

      return domainVisibility[domainKey] !== undefined ? domainVisibility[domainKey] : false;
    };

    return Object.keys(DOMAINS).filter((domain) => isVisible(domain));
  };

  // Get tasks for current domain
  const getCurrentDomainTasks = () => {
    const visibleDomains = getVisibleDomains();
    if (currentDomain >= visibleDomains.length) return [];

    const selectedDomainKey = visibleDomains[currentDomain];
    switch (selectedDomainKey) {
      case 'marketing_content':
        return ['1.1', '1.2', '1.3', '1.4', '1.5'];
      case 'sales':
        return ['2.1', '2.2', '2.3', '2.4', '2.5'];
      case 'customer_experience':
        return ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];
      case 'people_team': {
        const isSmall = profile.company_size === 'small';
        if (isSmall) return ['4.1', '4.2', '4.5'];
        else return ['4.1', '4.2', '4.3', '4.4', '4.5'];
      }
      case 'operations':
        const isMediumOrLarge = profile.company_size === 'medium' || profile.company_size === 'large';
        if (isMediumOrLarge) {
          return ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'];
        } else {
          return ['5.1', '5.2', '5.3', '5.4', '5.5'];
        }
      case 'delivery_projects':
        if (profile.industry_vertical === 'professional_services' || profile.industry_vertical === 'home_services' || profile.industry_vertical === 'saas') {
          return ['6.1', '6.2', '6.3'];
        } else {
          return [];
        }
      case 'inventory_supply':
        if (profile.industry_vertical === 'healthcare' || profile.industry_vertical === 'beauty_aesthetics') {
          return ['7.1', '7.2'];
        } else {
          return ['7.1', '7.2', '7.3', '7.4'];
        }
      case 'finance':
        return ['8.1', '8.2', '8.3', '8.4', '8.5'];
      default:
        return [];
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  // Get current tasks for display
  const displayedTasks = getCurrentDomainTasks().slice(currentPage * 4, (currentPage + 1) * 4);

  // Handle form submission
  const handleSubmit = () => {
    console.log(profile)
    if (!profile.industry_vertical || !profile.company_size || !profile.revenue_range || !profile.ai_usage_level || !profile.primary_pain_point) return;

    setCurrentStep('assessment');
    setCurrentDomain(0);
    setCurrentPage(0);
  };

  // Get response count for stats
  const getResponseCounts = () => {
    let notDoing = 0, manual = 0, looseAI = 0, structured = 0;
    Object.values(taskResponses).forEach(response => {
      if (response.response === 'not_doing') notDoing++;
      else if (response.response === 'manual') manual++;
      else if (response.response === 'loose_ai') looseAI++;
      else if (response.response === 'structured') structured++;
    });

    return { notDoing, manual, looseAI, structured };
  };

  const renderProfileStep = () => {
    // Profile questions
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
        id: 'ai_usage_level',
        title: "How is your business currently using AI?",
        options: [
          { key: 'none', label: 'We are not currently using any AI tools' },
          { key: 'casual', label: 'We use ChatGPT or similar for occasional tasks' },
          { key: 'fragmented', label: 'We use AI tools plus some automations (Zapier, Make, etc.)' },
          { key: 'structured', label: 'We have structured AI workflows integrated into our operations' }
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

    return (
      <div className="min-h-screen bg-[#041227] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-4xl">AI Agent Coverage Assessment</h1>
            <p className="mt-3 text-[#e2e8f0] max-w-2xl mx-auto">
              Complete this assessment to understand your current AI coverage and identify gaps
            </p>
          </div>

          <Card className="bg-[#111827] border-[#374151] rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Business Profile</CardTitle>
              <CardDescription className="text-[#94a3b8]">
                Please answer these questions about your business to personalize the assessment.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {profileQuestions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <Label className="text-[#f8fafc]">{question.title}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {question.options.map(option => (
                      <Card
                        key={option.key}
                        onClick={() => handleProfileChange(question.id as keyof Profile, option.key)}
                        className={`p-5 cursor-pointer transition-all border ${profile[question.id as keyof Profile] === option.key
                            ? 'border-[#6366f1] bg-[#1f2937]/30 text-white'
                            : 'border-[#374151] hover:border-[#6366f1]/50'
                          }`}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start gap-3 justify-between">
                            <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${profile[question.id as keyof Profile] === option.key
                                ? 'bg-[#6366f1] text-white'
                                : 'border-gray-400'
                              }`}>
                              {profile[question.id as keyof Profile] === option.key && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
                              )}
                            </div>
                            <p className="text-sm flex-1">{option.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              <Button
                onClick={handleSubmit}
                disabled={!profile.industry_vertical || !profile.company_size || !profile.revenue_range || !profile.ai_usage_level || !profile.primary_pain_point}
                className="w-full bg-[#6366f1] hover:bg-[#5457e0] py-6 text-base font-semibold"
              >
                Begin Assessment
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#94a3b8]">
              Your data will be securely processed and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderAssessmentStep = () => {
    // Get visible domains and tasks
    const visibleDomains = getVisibleDomains();

    if (visibleDomains.length === 0 || currentDomain >= visibleDomains.length) return null;

    const domainKey = visibleDomains[currentDomain];
    const domainName = DOMAINS[domainKey as keyof typeof DOMAINS].name;

    // Get tasks for this domain
    const allTasks = getCurrentDomainTasks();
    if (allTasks.length === 0) return null;

    return (
      <div className="min-h-screen bg-[#041227] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <Card className="bg-[#111827] border-[#374151] rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{domainName}</span>
                <Badge variant="secondary" className="bg-[#6366f1]/20 text-[#6366f1]">
                  {currentDomain + 1} of {visibleDomains.length}
                </Badge>
              </CardTitle>
              <CardDescription className="text-[#94a3b8]">
                How are these tasks currently handled?
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-[#94a3b8]">Page {currentPage + 1} of {(allTasks.length / 4) + 1}</span>
                <Progress
                  value={(currentPage / ((allTasks.length / 4) + 1)) * 100}
                  className="w-32 h-2 bg-[#374151] rounded-full"
                />
              </div>

              {/* Tasks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedTasks.map(taskId => {
                  const task = TASK_VARIANTS[taskId as keyof typeof TASK_VARIANTS];

                  return (
                    <Card
                      key={taskId}
                      className="overflow-hidden bg-[#1f2937]/50 border-[#374151] hover:border-[#6366f1]/50 transition-all rounded-xl"
                    >
                      <div className="p-5">
                        <h3 className="font-semibold text-white">{task.label}</h3>

                        {/* Response options */}
                        <div className="mt-4 space-y-3">
                          {[
                            { key: 'not_doing', label: 'Not doing this', subtext: 'This task is not performed or is entirely reactive', score: 0 },
                            { key: 'manual', label: 'Manual / human only', subtext: 'A person handles this entirely with no AI involvement', score: 1 },
                            { key: 'loose_ai', label: 'Using AI loosely', subtext: 'AI tools applied without a defined process or consistent output', score: 2 },
                            { key: 'structured', label: 'Structured and governed', subtext: 'Defined workflow, AI-assisted execution, approvals at decision points, consistent outputs', score: 3 }
                          ].map(option => (
                            <div
                              key={option.key}
                              onClick={() => handleResponseSelect(taskId, option.key as any)}
                              className={`p-4 rounded-lg cursor-pointer transition-all ${taskResponses[taskId]?.response === option.key
                                  ? 'ring-2 ring-[#6366f1] bg-[#1f2937]/50'
                                  : 'bg-[#1f2937]/30 hover:bg-[#1f2937]/50'
                                }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${taskResponses[taskId]?.response === option.key
                                    ? 'bg-[#6366f1]'
                                    : 'border-gray-400'
                                  }`}>
                                  {taskResponses[taskId]?.response === option.key && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <div className='flex-1'>
                                  <p className="font-medium text-white">{option.label}</p>
                                  <p className="text-sm text-[#94a3b8]">{option.subtext}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Governance toggle */}
                        {taskResponses[taskId]?.response === 'structured' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4"
                          >
                            <div className="flex items-start justify-start bg-[#1f2937]/50 p-4 rounded-lg text-white flex-col gap-4">
                              <span className="text-sm">Does this run consistently without relying on one person's judgment?</span>
                              <div className="space-x-2 ">
                                <Button
                                  variant={taskResponses[taskId]?.governance_flag === 'system_governed' ? 'default' : 'outline'}
                                  onClick={() => handleGovernanceToggle(taskId, 'system_governed')}
                                  className="text-xs"
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant={taskResponses[taskId]?.governance_flag === 'person_dependent' ? 'default' : 'outline'}
                                  onClick={() => handleGovernanceToggle(taskId, 'person_dependent')}
                                  className="text-xs"
                                >
                                  No
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-[#374151]">
                {currentPage > 0 && (
                  <Button
                    onClick={handlePrevPage}
                    variant="outline"
                    className="text-sm px-4 py-2 border-[#374151] hover:bg-[#374151]/30 text-white"
                  >
                    Previous
                  </Button>
                )}

                <div className="flex-grow"></div>

                {currentPage < Math.ceil(allTasks.length / 4) - 1 ? (
                  <Button
                    onClick={handleNextPage}
                    className="text-sm px-4 py-2 bg-[#6366f1] hover:bg-[#5457e0]"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (currentDomain >= visibleDomains.length - 1) {
                        // Final domain completed
                        setCurrentStep('lead');
                      } else {
                        setCurrentDomain(prev => prev + 1);
                        setCurrentPage(0);
                      }
                    }}
                    className="text-sm px-4 py-2 bg-[#6366f1] hover:bg-[#5457e0]"
                  >
                    Next Domain
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#94a3b8]">
              Your data will be securely processed and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLeadCapture = () => {
    return (
      <div className="min-h-screen bg-[#041227] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <Card className="bg-[#111827] border-[#374151] rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Complete Your Profile</CardTitle>
              <CardDescription className="text-[#94a3b8]">
                Please provide your contact information so we can share your AI Coverage Report.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={leadInfo.full_name || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, full_name: e.target.value })}
                    className="bg-[#1f2937]/50 border-[#374151] text-white placeholder:text-[#94a3b8]"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={leadInfo.email || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="bg-[#1f2937]/50 border-[#374151] text-white placeholder:text-[#94a3b8]"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="company" className="text-white">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={leadInfo.company_name || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, company_name: e.target.value })}
                    className="bg-[#1f2937]/50 border-[#374151] text-white placeholder:text-[#94a3b8]"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-white">Role / Title</Label>
                  <Input
                    id="role"
                    placeholder="Your role or title"
                    value={leadInfo.role_title || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, role_title: e.target.value })}
                    className="bg-[#1f2937]/50 border-[#374151] text-white placeholder:text-[#94a3b8]"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="openText" className="text-white">Anything specific you want us to address?</Label>
                  <Textarea
                    id="openText"
                    placeholder="Optional additional details..."
                    value={leadInfo.open_text || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, open_text: e.target.value })}
                    className="bg-[#1f2937]/50 border-[#374151] text-white placeholder:text-[#94a3b8]"
                    rows={4}
                  />
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep('results')}
                className="w-full bg-[#6366f1] hover:bg-[#5457e0] py-6 text-base font-semibold"
              >
                View Your Results
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#94a3b8]">
              Your data will be securely processed and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    // Calculate coverage percentage
    const totalTasks = Object.keys(taskResponses).length;
    const maxScore = totalTasks * 3; // Each task can score up to 3 points

    let totalScore = 0;
    let estimatedHoursLow = 0;
    let estimatedHoursHigh = 0;

    for (const [taskId, response] of Object.entries(taskResponses)) {
      if (response.response === 'not_doing' || response.response === 'manual') {
        // Calculate weighted hours
        const taskVariant = TASK_VARIANTS[taskId as keyof typeof TASK_VARIANTS];
        const multiplier = FREQUENCY_WEIGHTS[taskVariant.frequency];

        estimatedHoursLow += multiplier * 1.5;
        estimatedHoursHigh += multiplier * 3;
      }

      if (response.response === 'not_doing') totalScore += 0;
      else if (response.response === 'manual') totalScore += 1;
      else if (response.response === 'loose_ai') totalScore += 2;
      else if (response.response === 'structured') totalScore += 3;
    }

    const coveragePercentage = Math.round((totalScore / maxScore) * 100);

    // Get response counts
    const { notDoing, manual, looseAI, structured } = getResponseCounts();

    return (
      <div className="min-h-screen bg-[#041227] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          {/* Results Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold md:text-4xl">Your AI Agent Coverage Report</h1>
            <p className="mt-3 text-[#e2e8f0] max-w-3xl mx-auto">
              Personalized insights on your current AI coverage and gaps
            </p>
          </div>

          {/* Coverage Summary */}
          <Card className="bg-[#111827] border-[#374151] rounded-xl shadow-lg mb-10 text-white">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold">{coveragePercentage}% Coverage</h3>
                <p className="mt-2 text-[#e2e8f0] max-w-2xl mx-auto">
                  {coveragePercentage <= 20 ? 'Your business is running almost entirely on manual effort.' :
                    coveragePercentage <= 40 ? 'You have started using AI, but most of your operation is still manual.' :
                      coveragePercentage <= 60 ? 'You have moderate AI coverage, but significant gaps remain across core functions.' :
                        coveragePercentage <= 80 ? 'Your AI usage is above average, but disconnected tools are limiting your returns.' :
                          'Your operations are well-covered. The question is whether your systems work together.'}
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-2xl">
                  {coveragePercentage}%
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-[#1f2937]/50 p-4 rounded-lg text-center border border-[#374151]">
                  <p className="text-2xl font-bold">{totalTasks}</p>
                  <p className="text-sm text-[#94a3b8]">Total Tasks</p>
                </div>
                <div className="bg-[#1f2937]/50 p-4 rounded-lg text-center border border-[#374151]">
                  <p className="text-2xl font-bold">{notDoing + manual}</p>
                  <p className="text-sm text-[#94a3b8]">Manual Tasks</p>
                </div>
                <div className="bg-[#1f2937]/50 p-4 rounded-lg text-center border border-[#374151]">
                  <p className="text-2xl font-bold">{looseAI}</p>
                  <p className="text-sm text-[#94a3b8]">Disconnected AI</p>
                </div>
              </div>

              {/* Manual Hours */}
              {estimatedHoursLow > 0 && estimatedHoursHigh > 0 ? (
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="font-semibold text-white">Manual Hours at Risk</p>
                  <p className="text-[#e2e8f0]">{Math.round(estimatedHoursLow)}–{Math.round(estimatedHoursHigh)} hours per week</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Agent Map */}
          <Card className="bg-[#111827] border-[#374151] rounded-xl shadow-lg mb-10 text-white">
            <CardHeader>
              <CardTitle className="text-white">The Agent Map</CardTitle>
              <CardDescription className="text-[#94a3b8]">
                How each agent is mapping to your business functions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Marketing and Content Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center bg-[#1f2937]/50 hover:bg-[#1f2937]/70 transition-colors">
                  <h4 className="font-semibold mb-2">Marketing and Content Agent</h4>
                  <p className="text-sm text-[#94a3b8] mb-3">Plans, drafts, and distributes content across channels with brand voice governance and editorial calendar management.</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                      Content Creation
                    </Badge>
                    <Badge variant="secondary" className="ml-1 bg-green-500/20 text-green-300 text-xs">
                      Email Marketing
                    </Badge>
                  </div>
                </div>

                {/* Sales Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center bg-[#1f2937]/50 hover:bg-[#1f2937]/70 transition-colors">
                  <h4 className="font-semibold mb-2">Sales Agent</h4>
                  <p className="text-sm text-[#94a3b8] mb-3">Responds to leads, generates proposals from your data, runs follow-up sequences, and tracks pipeline with human approval at decision points.</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                      Lead Response
                    </Badge>
                    <Badge variant="secondary" className="ml-1 bg-green-500/20 text-green-300 text-xs">
                      Proposal Generation
                    </Badge>
                  </div>
                </div>

                {/* Customer Experience Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center bg-[#1f2937]/50 hover:bg-[#1f2937]/70 transition-colors">
                  <h4 className="font-semibold mb-2">Customer Experience Agent</h4>
                  <p className="text-sm text-[#94a3b8] mb-3">Handles inbound questions, manages scheduling, triggers review requests, monitors satisfaction signals, and engages website visitors.</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                      Support Questions
                    </Badge>
                    <Badge variant="secondary" className="ml-1 bg-green-500/20 text-green-300 text-xs">
                      Appointment Management
                    </Badge>
                  </div>
                </div>

                {/* People Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center md:col-span-3 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 hover:from-[#6366f1]/30 hover:to-[#8b5cf6]/30 transition-colors">
                  <h4 className="font-semibold mb-2">People and Team Agent</h4>
                  <p className="text-sm text-[#e2e8f0] mb-3">Screens candidates, generates onboarding documents, tracks certifications, and prepares performance reviews from operational data.</p>
                </div>

                {/* Operations Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center bg-[#1f2937]/50 hover:bg-[#1f2937]/70 transition-colors">
                  <h4 className="font-semibold mb-2">Operations Agent</h4>
                  <p className="text-sm text-[#94a3b8] mb-3">Assigns tasks, maintains documentation, coordinates vendors, captures meeting action items, manages institutional knowledge, and monitors process compliance.</p>
                </div>

                {/* Inventory Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center bg-[#1f2937]/50 hover:bg-[#1f2937]/70 transition-colors">
                  <h4 className="font-semibold mb-2">Inventory and Supply Chain Agent</h4>
                  <p className="text-sm text-[#94a3b8] mb-3">Tracks stock levels, triggers reorders, communicates with suppliers, and analyzes inventory costs against requirements.</p>
                </div>

                {/* Finance Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center bg-[#1f2937]/50 hover:bg-[#1f2937]/70 transition-colors">
                  <h4 className="font-semibold mb-2">Finance Agent</h4>
                  <p className="text-sm text-[#94a3b8] mb-3">Generates invoices, categorizes expenses, produces financial reports, manages contracts, and tracks compliance documentation.</p>
                </div>

                {/* Governing Agent */}
                <div className="border border-[#374151] rounded-lg p-4 text-center md:col-span-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#60a5fa]/90 hover:to-[#8b5cf6]/90 transition-all">
                  <h4 className="font-semibold mb-2">Governing Agent</h4>
                  <p className="text-sm text-white">
                    Coordinates all agents, manages exceptions, synthesizes cross-functional performance data, and delivers a real-time operational dashboard to leadership.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gap Quantification */}
          <Card className="bg-[#111827] border-[#374151] rounded-xl shadow-lg mb-10">
            <CardHeader>
              <CardTitle className="text-white">Gap Quantification</CardTitle>
              <CardDescription className="text-[#94a3b8]">
                Measurable insights into your current AI coverage gaps
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="p-5 bg-red-500/10 rounded-lg border border-red-500/20">
                  <h4 className="font-semibold text-white">Manual Hours at Risk</h4>
                  <p className="text-[#e2e8f0]">{Math.round(estimatedHoursLow)}–{Math.round(estimatedHoursHigh)} hours per week</p>
                  <p className="text-sm text-[#94a3b8] mt-1">
                    Based on your responses, your team is spending an estimated {Math.round(estimatedHoursLow)}–{Math.round(estimatedHoursHigh)} hours per week on tasks that AI agents can execute with human oversight.
                  </p>
                </div>

                <div className="p-5 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <h4 className="font-semibold text-white">Uncovered Functions</h4>
                  <p className="text-[#e2e8f0]">{notDoing} core business functions are not being performed at all.</p>
                  <p className="text-sm text-[#94a3b8] mt-1">
                    These represent blind spots in your operation.
                  </p>
                </div>

                <div className="p-5 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h4 className="font-semibold text-white">Fragmented AI</h4>
                  <p className="text-[#e2e8f0]">{looseAI} tasks are using AI without a defined process.</p>
                  <p className="text-sm text-[#94a3b8] mt-1">
                    Disconnected AI usage increases inconsistency and creates dependencies on individual judgment rather than system-level reliability.
                  </p>
                </div>

                {/* Governance Insight */}
                {structured > 0 && (
                  <div className="p-5 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-white">Governance Insight</h4>
                    <p className="text-[#e2e8f0]">{structured} structured workflows depend on one person's judgment rather than system-level governance.</p>
                    <p className="text-sm text-[#94a3b8] mt-1">
                      The Governing Agent eliminates single points of failure by enforcing system-level oversight across all agents.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl p-8 mb-10">
            <h3 className="text-xl font-bold mb-4 text-white">Next Steps for Your AI Transformation</h3>

            <p className="mb-4 text-white">
              {profile.ai_usage_level === 'none' ?
                "Your business is operating entirely on manual effort. Every function in this assessment can be supported by a coordinated AI agent with human oversight." :
                profile.ai_usage_level === 'casual' ?
                  "You have started experimenting with AI, but there is a significant difference between asking ChatGPT occasional questions and deploying a coordinated operating system." :
                  profile.ai_usage_level === 'fragmented' ?
                    "You have invested in AI tools and automations, but your results suggest they are not working as a system. Disconnected automations create fragility." :
                    "Your operation is more mature than most. The question is whether your current architecture provides unified visibility."
              }
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {profile.revenue_range === 'under_1m' && (
                <Button variant="secondary" className="bg-white text-[#6366f1] hover:bg-gray-100 px-4 py-2 rounded-lg">
                  Request a Scaling Architecture Call
                </Button>
              )}

              {(profile.revenue_range === '1m_5m' || profile.revenue_range === '5m_10m' ||
                profile.revenue_range === '10m_20m') && (
                  <Button variant="secondary" className="bg-white text-[#6366f1] hover:bg-gray-100 px-4 py-2 rounded-lg">
                    Book a Readiness Consultation
                  </Button>
                )}

              {profile.revenue_range === 'over_20m' && (
                <Button variant="secondary" className="bg-white text-[#6366f1] hover:bg-gray-100 px-4 py-2 rounded-lg">
                  Discuss Enterprise Configuration
                </Button>
              )}

              <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 px-4 py-2 rounded-lg">
                Read the Full White Paper
              </Button>
            </div>

            <p className="mt-4 text-sm opacity-80 text-white">
              {profile.revenue_range === 'under_1m' ?
                "Quanton OS is designed for businesses generating $1M–$20M annually. If you are approaching that threshold, a conversation about operational infrastructure can help you scale without the chaos that typically accompanies growth." :
                profile.revenue_range === 'over_20m' ?
                  "Your organization may benefit from Quanton OS at the enterprise deployment level. Our standard implementation is designed for $1M–$20M businesses, but the operating principles and agent architecture scale. Contact us to discuss enterprise configuration." :
                  ""
              }
            </p>
          </div>

          <footer className="text-center text-[#94a3b8] text-sm py-6">
            © 2026 Quanton Labs. All rights reserved.
          </footer>
        </div>
      </div>
    );
  };


  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {currentStep === 'profile' && renderProfileStep()}
        {currentStep === 'assessment' && renderAssessmentStep()}
        {currentStep === 'lead' && renderLeadCapture()}
        {currentStep === 'results' && renderResults()}
      </motion.div>
    </AnimatePresence>
  );
}
