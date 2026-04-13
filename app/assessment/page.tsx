'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOMAINS, Lead, Profile, TaskResponse } from '@/db/assessments';
import Navbar from '@/components/landing/navbar';
import RenderProfileStep from '@/components/assessment/profileStep';
import RenderAssessmentStep from '@/components/assessment/renderAssessment';
import RenderLeadCapture from '@/components/assessment/leadCapture';
import RenderResults from '@/components/assessment/results';

const PAIN_POINT_DOMAIN_ORDER: Record<string, string[]> = {
  marketing: ['marketing_content', 'sales', 'customer_experience', 'people_team', 'operations', 'delivery_projects', 'inventory_supply', 'finance'],
  sales: ['sales', 'marketing_content', 'customer_experience', 'people_team', 'operations', 'delivery_projects', 'inventory_supply', 'finance'],
  customers: ['customer_experience', 'sales', 'marketing_content', 'people_team', 'operations', 'delivery_projects', 'inventory_supply', 'finance'],
  finance: ['finance', 'operations', 'sales', 'customer_experience', 'marketing_content', 'people_team', 'delivery_projects', 'inventory_supply'],
  team: ['operations', 'people_team', 'sales', 'customer_experience', 'marketing_content', 'delivery_projects', 'inventory_supply', 'finance'],
  everything: ['marketing_content', 'sales', 'customer_experience', 'people_team', 'operations', 'delivery_projects', 'inventory_supply', 'finance'],
};

export default function AIAgentAssessment() {
  const [currentStep, setCurrentStep] = useState<'profile' | 'assessment' | 'lead' | 'results'>('profile');
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [taskResponses, setTaskResponses] = useState<Record<string, TaskResponse>>({});
  const [currentDomain, setCurrentDomain] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [leadInfo, setLeadInfo] = useState<Partial<Lead>>({});

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.3;
      setIsScrolled(window.scrollY > triggerPoint);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedProfile = localStorage.getItem('aiAssessment_profile');
    const savedResponses = localStorage.getItem('aiAssessment_responses');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedResponses) setTaskResponses(JSON.parse(savedResponses));
  }, []);

  useEffect(() => {
    localStorage.setItem('aiAssessment_profile', JSON.stringify(profile));
    localStorage.setItem('aiAssessment_responses', JSON.stringify(taskResponses));
  }, [profile, taskResponses]);

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

  const getVisibleDomains = () => {
    const isMicro = profile.company_size === 'micro';

    const domainVisibility: Record<string, boolean> = {
      marketing_content: true,
      sales: true,
      customer_experience: true,
      people_team: !isMicro,
      operations: true,
      delivery_projects:
        profile.industry_vertical === 'professional_services' ||
        profile.industry_vertical === 'home_services' ||
        profile.industry_vertical === 'saas',
      inventory_supply: true,
      finance: true,
    };

    if (
      profile.industry_vertical === 'professional_services' ||
      profile.industry_vertical === 'financial_services'
    ) {
      domainVisibility.inventory_supply = false;
    }

    // Get preferred order based on pain point
    const painPoint = profile.primary_pain_point as string;
    const preferredOrder = PAIN_POINT_DOMAIN_ORDER[painPoint] || Object.keys(DOMAINS);

    // Filter to only visible domains, preserving preferred order
    return preferredOrder.filter(domain => domainVisibility[domain] === true);
  };

  const getCurrentDomainTasks = () => {
    const visibleDomains = getVisibleDomains();
    if (currentDomain >= visibleDomains.length) return [];

    const selectedDomainKey = visibleDomains[currentDomain];
    const isSmall = profile.company_size === 'small';
    const isMediumOrLarge =
      profile.company_size === 'medium' || profile.company_size === 'large';

    switch (selectedDomainKey) {
      case 'marketing_content':
        return ['1.1', '1.2', '1.3', '1.4', '1.5'];
      case 'sales':
        return ['2.1', '2.2', '2.3', '2.4', '2.5'];
      case 'customer_experience':
        return ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];
      case 'people_team':
        return isSmall
          ? ['4.1', '4.2', '4.5']
          : ['4.1', '4.2', '4.3', '4.4', '4.5'];
      case 'operations':
        return isMediumOrLarge
          ? ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
          : ['5.1', '5.2', '5.3', '5.4', '5.5'];
      case 'delivery_projects':
        return ['6.1', '6.2', '6.3'];
      case 'inventory_supply':
        return profile.industry_vertical === 'healthcare' ||
          profile.industry_vertical === 'beauty_aesthetics'
          ? ['7.1', '7.2']
          : ['7.1', '7.2', '7.3', '7.4'];
      case 'finance':
        return ['8.1', '8.2', '8.3', '8.4', '8.5'];
      default:
        return [];
    }
  };

  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePrevPage = () => setCurrentPage(prev => Math.max(0, prev - 1));

  const visibleDomains = getVisibleDomains();
  const allTasks = getCurrentDomainTasks();
  const displayedTasks = allTasks.slice(currentPage, currentPage + 1);

const handleSubmit = () => {
    if (
      !profile.industry_vertical ||
      !profile.company_size ||
      !profile.revenue_range ||
      !profile.primary_pain_point
    ) return;
    setCurrentStep('assessment');
    setCurrentDomain(0);
    setCurrentPage(0);
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-white relative"
      >
        {/* Shared background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <Navbar isScrolled={isScrolled} />

        {/* Content pushed below fixed navbar */}
        <div className="pt-[70px] flex items-center justify-center min-h-screen">
          {currentStep === 'profile' && (
            <RenderProfileStep
              setProfile={setProfile}
              profile={profile}
              handleSubmit={handleSubmit}
            />
          )}
          {currentStep === 'assessment' && (
            <RenderAssessmentStep
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handleResponseSelect={handleResponseSelect}
              handleGovernanceToggle={handleGovernanceToggle}
              visibleDomains={visibleDomains}
              allTasks={allTasks}
              displayedTasks={displayedTasks}
              currentDomain={currentDomain}
              currentPage={currentPage}
              setCurrentDomain={setCurrentDomain}
              setCurrentPage={setCurrentPage}
              setCurrentStep={setCurrentStep}
              taskResponses={taskResponses}
              profile={profile}
            />
          )}
          {currentStep === 'lead' && (
            <RenderLeadCapture
              setCurrentStep={setCurrentStep}
              leadInfo={leadInfo}
              setLeadInfo={setLeadInfo}
            />
          )}
          {currentStep === 'results' && (
            <RenderResults
              taskResponses={taskResponses}
              profile={profile}
              leadInfo={leadInfo}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}