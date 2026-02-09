// Types based on schema
export type Profile = {
  industry_vertical: string;
  company_size: string;
  revenue_range: string;
  ai_usage_level: string;
  primary_pain_point: string;
};

export type TaskResponse = {
  response: 'not_doing' | 'manual' | 'loose_ai' | 'structured';
  governance_flag?: 'system_governed' | 'person_dependent' | null;
};

export type Lead = {
  full_name: string;
  email: string;
  company_name: string;
  role_title: string;
  open_text?: string | null;
};

export type Instrumentation = {
  time_profile_seconds?: number;
  time_assessment_seconds?: number;
  time_total_seconds?: number;
  domains_shown: string[];
  tasks_shown: string[];
  abandoned_at?: string | null;
};

export type ComputedResults = {
  total_score: number;
  max_possible_score: number;
  coverage_percentage: number;
  domain_scores: Record<string, { score: number; max: number; percentage: number }>;
  lowest_domain: string;
  highest_domain: string;
  count_not_doing: number;
  count_manual: number;
  count_loose_ai: number;
  count_structured: number;
  count_structured_governed: number;
  count_structured_person_dependent: number;
  estimated_manual_hours_low: number;
  estimated_manual_hours_high: number;
};

export type AssessmentPayload = {
  version: '3.0';
  schema_version: '1.0';
  timestamp: string;
  profile: Profile;
  lead?: Lead;
  task_responses: Record<string, TaskResponse>;
  computed: ComputedResults;
  instrumentation: Instrumentation;
};

// Mock data for task variants
export const TASK_VARIANTS = {
  '1.1': {
    domain: 'marketing_content',
    label: 'Social Media Content Creation',
    frequency: 'high',
    variants: {
      professional_services: 'Creating LinkedIn posts, case study highlights, and thought leadership content for social channels',
      automotive: 'Creating social media posts showcasing vehicle inventory, service specials, and customer transformations',
      retail: 'Creating product feature posts, seasonal promotions, and lifestyle content across social platforms',
      financial_services: 'Creating educational social content about financial planning, market updates, and service offerings',
      healthcare: 'Creating social posts highlighting treatments, patient education, and practice updates',
      beauty_aesthetics: 'Creating social posts featuring transformations, treatment results, behind-the-scenes content, and seasonal promotions',
      home_services: 'Creating social posts featuring completed projects, seasonal maintenance tips, and service promotions',
      saas: 'Creating product update posts, feature highlights, and user success stories for social channels',
      other: 'Creating and scheduling social media content across your business channels'
    }
  },
  '1.2': {
    domain: 'marketing_content',
    label: 'Long-Form Content and Thought Leadership',
    frequency: 'medium',
    variants: {
      professional_services: 'Writing blog posts, white papers, and articles that demonstrate expertise and attract qualified prospects',
      automotive: 'Writing blog content about vehicle maintenance tips, buying guides, and service explanations for customers',
      retail: 'Writing product guides, seasonal buying content, and brand story pieces for your website and email',
      financial_services: 'Writing compliance-reviewed articles, market commentary, and educational guides for clients and prospects',
      healthcare: 'Writing patient education articles, treatment explanations, and wellness content for your website',
      beauty_aesthetics: 'Writing treatment guides, skincare education posts, trend commentary, and FAQ content for your website and blog',
      home_services: 'Writing how-to guides, seasonal preparation content, and service explanation articles for your website',
      saas: 'Writing product documentation, technical blog posts, and use case studies that drive organic traffic',
      other: 'Writing blog posts, articles, or educational content that positions your business and attracts prospects'
    }
  },
  '1.3': {
    domain: 'marketing_content',
    label: 'Email Marketing Campaigns',
    frequency: 'medium',
    variants: {
      professional_services: 'Running email sequences for nurture campaigns, newsletters, event invitations, and client updates',
      automotive: 'Sending service reminders, seasonal maintenance campaigns, and promotional offers via email',
      retail: 'Running promotional email campaigns, abandoned cart sequences, and loyalty program communications',
      financial_services: 'Sending client portfolio updates, market newsletters, and compliance-reviewed educational email series',
      healthcare: 'Running appointment reminder sequences, wellness newsletters, and seasonal health campaign emails',
      beauty_aesthetics: 'Sending treatment reminders, membership renewal prompts, product launch announcements, and seasonal promotion campaigns',
      home_services: 'Sending seasonal maintenance reminders, service follow-ups, and promotional offer emails',
      saas: 'Running onboarding email sequences, feature announcement campaigns, and re-engagement series',
      other: 'Creating and sending email campaigns including newsletters, promotions, and automated sequences'
    }
  },
  '1.4': {
    domain: 'marketing_content',
    label: 'Content Repurposing Across Channels',
    frequency: 'medium',
    variants: {
      professional_services: 'Turning a single deliverable (webinar, report, case study) into social posts, email content, and website updates',
      automotive: 'Repurposing a customer review or project photo into a social post, Google Business update, and email feature',
      retail: 'Turning product photography and descriptions into social posts, email banners, and ad creative',
      financial_services: 'Repurposing a market analysis or client presentation into newsletter content, social posts, and blog articles',
      healthcare: 'Turning a treatment explanation or patient testimonial into social content, website copy, and email features',
      beauty_aesthetics: 'Turning a before-and-after photo, client testimonial, or treatment video into social posts, email content, website updates, and ad creative',
      home_services: 'Repurposing a completed project photo and description into a social post, review response, and website portfolio update',
      saas: 'Turning a feature release or case study into a blog post, social thread, email announcement, and sales one-pager',
      other: 'Turning one piece of content into multiple formats for use across different channels and platforms'
    }
  },
  '1.5': {
    domain: 'marketing_content',
    label: 'Competitive and Market Monitoring',
    frequency: 'medium',
    variants: {
      professional_services: 'Tracking competitor positioning, pricing changes, and industry trends relevant to your practice areas',
      automotive: 'Monitoring local competitor pricing, inventory, promotions, and online reputation',
      retail: 'Tracking competitor pricing, product launches, promotional strategies, and market positioning',
      financial_services: 'Monitoring regulatory changes, competitor product offerings, and market trends affecting your clients',
      healthcare: 'Tracking competitor services, pricing, patient reviews, and emerging treatment trends in your area',
      beauty_aesthetics: 'Monitoring local competitor pricing, new treatment offerings, trending services, and social media presence',
      home_services: 'Monitoring local competitor pricing, service offerings, reviews, and marketing activity',
      saas: 'Tracking competitor feature releases, pricing changes, positioning shifts, and market entry of new players',
      other: 'Monitoring competitor activity, pricing changes, and market trends relevant to your business'
    }
  },
  '2.1': {
    domain: 'sales',
    label: 'Inbound Lead Response',
    frequency: 'high',
    variants: {
      professional_services: 'Responding to prospective clients who submit inquiries through your website, email, or referral channels',
      automotive: 'Responding to customers who inquire about vehicles, service appointments, or pricing through your website or phone',
      retail: 'Responding to customer inquiries about product availability, pricing, and order status',
      financial_services: 'Responding to prospects who inquire about financial products, advisory services, or insurance quotes',
      healthcare: 'Responding to patients who request appointments, ask about treatments, or inquire about pricing and insurance',
      beauty_aesthetics: 'Responding to inquiries about treatments, pricing, availability, and consultations through DMs, website, phone, and booking platforms',
      home_services: 'Responding to homeowners who request quotes, schedule service calls, or ask about availability',
      saas: 'Responding to demo requests, trial signups, and inbound inquiries from prospective users or buyers',
      other: 'Responding to inbound inquiries from potential customers across your channels'
    }
  },
  '2.2': {
    domain: 'sales',
    label: 'Proposal and Quote Generation',
    frequency: 'high',
    variants: {
      professional_services: 'Creating proposals, statements of work, and engagement letters for prospective clients',
      automotive: 'Generating repair estimates, service quotes, and vehicle purchase proposals for customers',
      retail: 'Creating bulk order quotes, wholesale pricing proposals, and custom order estimates',
      financial_services: 'Generating policy quotes, advisory fee proposals, and financial plan summaries for prospects',
      healthcare: 'Creating treatment plans with cost estimates, payment plan options, and insurance pre-authorization documents',
      beauty_aesthetics: 'Creating treatment plan recommendations with package pricing, membership options, and product bundles for consultations',
      home_services: 'Generating job estimates, detailed service proposals, and project scope documents for homeowners',
      saas: 'Creating pricing proposals, enterprise license quotes, and custom implementation scoping documents',
      other: 'Generating quotes, proposals, or estimates for prospective customers'
    }
  },
  '2.3': {
    domain: 'sales',
    label: 'Prospect Follow-Up',
    frequency: 'high',
    variants: {
      professional_services: 'Following up with prospects who received a proposal but have not signed or scheduled a next step',
      automotive: 'Following up with customers who visited, received a quote, or expressed interest but did not purchase or book',
      retail: 'Following up on abandoned carts, wishlist items, and customers who browsed but did not purchase',
      financial_services: 'Following up with prospects who received quotes or attended consultations but have not committed',
      healthcare: 'Following up with patients who inquired about treatments or consultations but did not book',
      beauty_aesthetics: 'Following up with clients who attended consultations, received treatment recommendations, or inquired but did not book',
      home_services: 'Following up with homeowners who received estimates but have not confirmed or scheduled the work',
      saas: 'Following up with trial users who have not converted, demo attendees who have not signed, and stalled deals',
      other: 'Following up with prospects who showed interest but have not taken the next step'
    }
  },
  '2.4': {
    domain: 'sales',
    label: 'Outbound Prospecting',
    frequency: 'medium',
    variants: {
      professional_services: 'Identifying and reaching out to potential clients who match your ideal profile but have not inquired',
      automotive: 'Reaching out to fleet managers, local businesses, or past customers with targeted service or sales offers',
      retail: 'Identifying and contacting potential wholesale buyers, corporate gifting prospects, or partnership opportunities',
      financial_services: 'Prospecting business owners, high-net-worth individuals, or organizations that match your advisory profile',
      healthcare: 'Reaching out to local businesses for corporate wellness programs, employer partnerships, or referral relationships',
      beauty_aesthetics: 'Reaching out to local influencers, bridal planners, corporate wellness coordinators, and hotel or resort partners for collaboration',
      home_services: 'Prospecting property managers, real estate agents, commercial properties, or neighborhoods for service agreements',
      saas: 'Running outbound campaigns targeting companies that match your ideal customer profile with personalized outreach',
      other: 'Proactively reaching out to potential customers who match your ideal profile'
    }
  },
  '2.5': {
    domain: 'sales',
    label: 'Pipeline Tracking and Revenue Forecasting',
    frequency: 'high',
    variants: {
      professional_services: 'Tracking active opportunities from inquiry to signed engagement and forecasting monthly revenue',
      automotive: 'Tracking vehicle sales pipeline, service bookings, and forecasting weekly and monthly revenue',
      retail: 'Tracking sales performance across channels, seasonal trends, and forecasting inventory needs against demand',
      financial_services: 'Tracking prospect pipeline from inquiry through underwriting or onboarding and forecasting new business revenue',
      healthcare: 'Tracking patient pipeline from inquiry through consultation and treatment, forecasting monthly revenue by service line',
      beauty_aesthetics: 'Tracking consultation-to-booking conversion, package and membership renewal rates, and forecasting monthly revenue by service type',
      home_services: 'Tracking job pipeline from estimate through completion and forecasting weekly crew utilization and revenue',
      saas: 'Tracking deal pipeline by stage, monitoring conversion rates, and forecasting MRR and ARR',
      other: 'Tracking your sales pipeline from first contact through close and forecasting revenue'
    }
  },
  '3.1': {
    domain: 'customer_experience',
    label: 'Answering Common Customer Questions',
    frequency: 'high',
    variants: {
      professional_services: 'Answering prospect and client questions about your services, process, pricing structure, and timelines',
      automotive: 'Answering customer questions about service pricing, repair timelines, warranty coverage, and hours of operation',
      retail: 'Answering customer questions about product details, shipping times, return policies, and order status',
      financial_services: 'Answering client questions about account status, policy details, coverage, and basic financial concepts',
      healthcare: 'Answering patient questions about treatment options, preparation instructions, insurance acceptance, and office hours',
      beauty_aesthetics: 'Answering client questions about treatment options, contraindications, aftercare, pricing, and availability',
      home_services: 'Answering homeowner questions about service areas, pricing ranges, scheduling availability, and job timelines',
      saas: 'Answering user questions about features, pricing tiers, integrations, billing, and technical requirements',
      other: 'Answering common questions from customers about your products, services, pricing, and processes'
    }
  },
  '3.2': {
    domain: 'customer_experience',
    label: 'Appointment and Booking Management',
    frequency: 'high',
    variants: {
      professional_services: 'Scheduling client meetings, discovery calls, and project kickoffs across your team\'s calendars',
      automotive: 'Managing service appointment bookings, test drive scheduling, and pickup and delivery coordination',
      retail: 'Managing personal shopping appointments, consultation bookings, and in-store event registrations',
      financial_services: 'Scheduling client review meetings, prospect consultations, and annual planning sessions',
      healthcare: 'Managing patient appointment scheduling, provider calendar coordination, and waitlist management',
      beauty_aesthetics: 'Managing treatment bookings, provider calendar coordination, waitlist fills, walk-in management, and rebooking prompts',
      home_services: 'Scheduling service calls, managing technician dispatch windows, and coordinating multi-day project timelines',
      saas: 'Scheduling product demos, onboarding calls, and customer success check-ins',
      other: 'Scheduling and managing appointments, meetings, or bookings with your customers'
    }
  },
  '3.3': {
    domain: 'customer_experience',
    label: 'Complaint and Escalation Handling',
    frequency: 'medium',
    variants: {
      professional_services: 'Receiving and routing client concerns about deliverable quality, timelines, or communication to the appropriate team member',
      automotive: 'Handling customer complaints about repair quality, pricing disputes, or service delays and routing to management',
      retail: 'Processing customer complaints about product quality, delivery issues, or service experience and managing resolution',
      financial_services: 'Receiving and documenting client complaints about service quality, billing discrepancies, or coverage disputes',
      healthcare: 'Handling patient concerns about wait times, billing, treatment outcomes, or staff interactions and routing appropriately',
      beauty_aesthetics: 'Handling client concerns about treatment results, adverse reactions, pricing discrepancies, or service experience and routing to the appropriate provider or manager',
      home_services: 'Managing homeowner complaints about workmanship, scheduling misses, or pricing discrepancies and coordinating resolution',
      saas: 'Receiving and triaging user-reported bugs, service complaints, and escalations to engineering or account management',
      other: 'Handling customer complaints, routing them to the right person, and tracking resolution'
    }
  },
  '3.4': {
    domain: 'customer_experience',
    label: 'Post-Service Follow-Up and Review Generation',
    frequency: 'high',
    variants: {
      professional_services: 'Following up after project milestones or engagement completion to request feedback and referrals',
      automotive: 'Following up after service completion or vehicle purchase to request reviews and check satisfaction',
      retail: 'Following up after purchase with satisfaction checks, review requests, and personalized product recommendations',
      financial_services: 'Following up after policy activation, plan implementation, or annual review to confirm satisfaction and request testimonials',
      healthcare: 'Following up after treatment or procedure with recovery check-ins, satisfaction surveys, and review requests',
      beauty_aesthetics: 'Following up after treatments with aftercare reminders, satisfaction checks, review requests, and rebooking prompts at the recommended treatment interval',
      home_services: 'Following up after job completion to confirm satisfaction, request reviews, and offer maintenance plan enrollment',
      saas: 'Following up after onboarding or feature adoption milestones to gather feedback, request reviews, and identify expansion opportunities',
      other: 'Following up with customers after service delivery to request reviews and check satisfaction'
    }
  },
  '3.5': {
    domain: 'customer_experience',
    label: 'Client Onboarding and Welcome Communication',
    frequency: 'medium',
    variants: {
      professional_services: 'Onboarding new clients with welcome packets, access provisioning, kickoff scheduling, and expectation-setting communication',
      automotive: 'Welcoming new vehicle owners or first-time service customers with maintenance schedules, loyalty program details, and service guides',
      retail: 'Onboarding new loyalty program members, wholesale accounts, or subscription customers with welcome sequences',
      financial_services: 'Onboarding new clients with account setup documentation, required disclosures, portal access, and introductory meeting scheduling',
      healthcare: 'Onboarding new patients with intake forms, insurance verification, provider introductions, and first-visit preparation instructions',
      beauty_aesthetics: 'Welcoming new clients with treatment history intake, skin or hair assessment forms, aftercare guides, membership details, and provider introductions',
      home_services: 'Welcoming new customers with service agreement details, scheduling expectations, emergency contact procedures, and maintenance tips',
      saas: 'Onboarding new users with account setup guides, feature walkthroughs, integration instructions, and success milestone tracking',
      other: 'Onboarding new customers with welcome communications, setup documentation, and expectation-setting'
    }
  },
  '3.6': {
    domain: 'customer_experience',
    label: 'Customer Retention and Churn Prevention',
    frequency: 'medium',
    variants: {
      professional_services: 'Identifying clients showing signs of disengagement (fewer interactions, delayed payments, reduced scope) and triggering re-engagement',
      automotive: 'Identifying customers who have not returned for scheduled maintenance or who have lapsed beyond their service interval',
      retail: 'Identifying customers whose purchase frequency has declined or who have not engaged with recent campaigns',
      financial_services: 'Identifying clients showing disengagement signals (missed reviews, reduced contributions, competitor inquiries) and triggering outreach',
      healthcare: 'Identifying patients who have missed follow-up appointments, lapsed on treatment plans, or not rebooked recurring services',
      beauty_aesthetics: 'Identifying clients who have not rebooked within their recommended treatment interval, lapsed memberships, or declining visit frequency and triggering personalized re-engagement',
      home_services: 'Identifying customers who have not renewed service agreements, declined recommended work, or gone silent after an estimate',
      saas: 'Identifying users with declining login frequency, reduced feature usage, or approaching renewal with low engagement scores',
      other: 'Identifying customers at risk of leaving based on declining engagement and triggering re-engagement outreach'
    }
  },
  '4.1': {
    domain: 'people_team',
    label: 'Job Posting and Candidate Screening',
    frequency: 'low',
    variants: {
      professional_services: 'Writing job descriptions, posting across platforms, and screening applicants against role requirements',
      automotive: 'Writing job postings for technicians, service advisors, and sales staff, and screening applicants for certifications and experience',
      retail: 'Creating job listings for store associates, warehouse staff, and management roles, and filtering applicants',
      financial_services: 'Writing job descriptions for advisors, analysts, and support staff, screening for required licenses and credentials',
      healthcare: 'Creating job postings for clinical and administrative staff, screening for required certifications, licenses, and experience',
      beauty_aesthetics: 'Writing job postings for stylists, estheticians, therapists, and front-desk staff, screening for licenses, portfolio quality, and experience',
      home_services: 'Writing job postings for technicians and field staff, screening for trade certifications, licenses, and experience levels',
      saas: 'Writing job descriptions for engineering, product, sales, and support roles, and screening technical applicants',
      other: 'Creating job postings, distributing across platforms, and screening applicants against your requirements'
    }
  },
  '4.2': {
    domain: 'people_team',
    label: 'Employee Onboarding',
    frequency: 'low',
    variants: {
      professional_services: 'Onboarding new hires with offer letters, policy documents, system access, training schedules, and team introductions',
      automotive: 'Onboarding new technicians or staff with certifications verification, tool requirements, safety training, and system access',
      retail: 'Onboarding new associates with POS training schedules, product knowledge materials, policies, and shift assignments',
      financial_services: 'Onboarding new team members with compliance training, licensing verification, system access, and client assignment protocols',
      healthcare: 'Onboarding new staff with credentialing verification, HIPAA training, system access, and clinical protocol orientation',
      beauty_aesthetics: 'Onboarding new providers with license verification, brand and service training, product knowledge, booking system setup, and client interaction standards',
      home_services: 'Onboarding new field staff with safety certifications, equipment training, route assignments, and customer interaction protocols',
      saas: 'Onboarding new hires with codebase orientation, tool access, product training, and team integration schedules',
      other: 'Onboarding new employees with documentation, system access, training materials, and team introductions'
    }
  },
  '4.3': {
    domain: 'people_team',
    label: 'Performance Review Preparation',
    frequency: 'low',
    variants: {
      professional_services: 'Preparing performance reviews using project outcomes, client feedback, utilization data, and goal tracking',
      automotive: 'Preparing technician and staff reviews using job completion rates, customer satisfaction scores, and upsell performance',
      retail: 'Preparing associate reviews using sales performance, attendance, customer feedback, and product knowledge assessments',
      financial_services: 'Preparing advisor and staff reviews using AUM growth, client retention, compliance record, and activity metrics',
      healthcare: 'Preparing staff reviews using patient satisfaction scores, appointment volume, compliance adherence, and clinical outcomes',
      beauty_aesthetics: 'Preparing provider reviews using rebooking rates, client satisfaction scores, retail attachment rates, and treatment volume',
      home_services: 'Preparing technician reviews using job completion rates, callback frequency, customer ratings, and safety compliance',
      saas: 'Preparing team reviews using sprint velocity, feature delivery, bug rates, customer impact metrics, and peer feedback',
      other: 'Preparing employee performance reviews using relevant metrics, feedback, and goal tracking'
    }
  },
  '4.4': {
    domain: 'people_team',
    label: 'Training and Certification Management',
    frequency: 'low',
    variants: {
      professional_services: 'Managing continuing education requirements, skill development plans, and professional certification tracking',
      automotive: 'Tracking ASE certifications, manufacturer training requirements, and safety compliance renewals for your team',
      retail: 'Managing product knowledge training, seasonal onboarding for temporary staff, and customer service skill development',
      financial_services: 'Tracking CE credits, license renewals, compliance training completion, and regulatory exam preparation',
      healthcare: 'Managing CME credits, license renewals, clinical protocol training, and compliance certification tracking',
      beauty_aesthetics: 'Tracking cosmetology and esthetician license renewals, advanced treatment certifications, product training completion, and continuing education hours',
      home_services: 'Tracking trade license renewals, safety certification requirements, equipment training, and code compliance updates',
      saas: 'Managing technical skill development, certification tracking, and cross-functional training programs',
      other: 'Tracking employee training requirements, certifications, and professional development activities'
    }
  },
  '4.5': {
    domain: 'people_team',
    label: 'Team Scheduling and Time Tracking',
    frequency: 'high',
    variants: {
      professional_services: 'Managing team utilization, tracking billable hours against targets, and coordinating project staffing',
      automotive: 'Scheduling technician shifts, tracking labor hours against estimates, and managing bay utilization',
      retail: 'Creating staff schedules, managing shift coverage, and tracking labor hours against sales volume',
      financial_services: 'Coordinating advisor schedules, tracking client meeting hours, and managing support staff coverage',
      healthcare: 'Managing provider schedules, coordinating coverage across locations, and tracking patient volume per staff member',
      beauty_aesthetics: 'Managing provider appointment books, coordinating shift coverage, tracking chair or room utilization, and balancing walk-in capacity',
      home_services: 'Scheduling field crews, optimizing routes, tracking job hours against estimates, and managing overtime',
      saas: 'Tracking engineering capacity, managing sprint commitments, and coordinating cross-team resource allocation',
      other: 'Scheduling your team, tracking work hours, and managing coverage and utilization'
    }
  },
  '5.1': {
    domain: 'operations',
    label: 'Internal Task Assignment and Tracking',
    frequency: 'high',
    variants: {
      professional_services: 'Assigning project tasks to team members, tracking progress against deadlines, and managing workload distribution',
      automotive: 'Assigning repair orders and service tasks to technicians, tracking job progress, and managing bay workflow',
      retail: 'Assigning store tasks (restocking, merchandising, inventory counts) and tracking completion across shifts',
      financial_services: 'Assigning client work (applications, reviews, renewals) to team members and tracking completion against SLAs',
      healthcare: 'Assigning administrative and clinical tasks, tracking completion, and managing handoffs between departments',
      beauty_aesthetics: 'Assigning daily setup, cleanup, restock, and administrative tasks across front-desk and provider staff and tracking completion',
      home_services: 'Assigning jobs to field crews, tracking progress from dispatch through completion, and managing change orders',
      saas: 'Managing sprint task assignment, tracking engineering velocity, and coordinating cross-functional deliverables',
      other: 'Assigning tasks to team members, tracking progress, and managing workload across your operation'
    }
  },
  '5.2': {
    domain: 'operations',
    label: 'Standard Operating Procedures and Documentation',
    frequency: 'low',
    variants: {
      professional_services: 'Documenting and maintaining standard processes for client delivery, quality review, and internal operations',
      automotive: 'Maintaining documented procedures for service workflows, quality inspections, customer handoff, and warranty processing',
      retail: 'Documenting procedures for opening and closing, inventory management, returns processing, and customer service standards',
      financial_services: 'Maintaining compliance-required procedure documentation for client onboarding, transaction processing, and audit preparation',
      healthcare: 'Maintaining clinical and administrative procedure documentation for patient care, billing, and regulatory compliance',
      beauty_aesthetics: 'Documenting treatment protocols, sanitation procedures, client intake processes, product usage guidelines, and service standards',
      home_services: 'Documenting service procedures, safety protocols, quality checklists, and customer communication standards',
      saas: 'Maintaining documentation for deployment processes, incident response, customer escalation, and feature release workflows',
      other: 'Documenting and maintaining standard procedures for how your business operates'
    }
  },
  '5.3': {
    domain: 'operations',
    label: 'Vendor and Supplier Coordination',
    frequency: 'medium',
    variants: {
      professional_services: 'Managing subcontractor relationships, software vendor contracts, and outsourced service provider coordination',
      automotive: 'Managing parts supplier orders, tracking delivery timelines, and coordinating with specialty vendors',
      retail: 'Coordinating with product suppliers, managing purchase orders, and tracking shipment status and lead times',
      financial_services: 'Managing relationships with custodians, carriers, technology vendors, and outsourced service providers',
      healthcare: 'Coordinating with medical suppliers, lab services, pharmaceutical vendors, and equipment maintenance providers',
      beauty_aesthetics: 'Managing product supplier orders, coordinating equipment maintenance, and tracking delivery timelines for retail and treatment supplies',
      home_services: 'Managing material supplier relationships, coordinating equipment rentals, and tracking supply orders against job schedules',
      saas: 'Managing infrastructure vendor relationships, coordinating with integration partners, and tracking SLAs',
      other: 'Coordinating with your suppliers and vendors, managing orders, and tracking delivery and performance'
    }
  },
  '5.4': {
    domain: 'operations',
    label: 'Meeting Management and Action Item Tracking',
    frequency: 'high',
    variants: {
      professional_services: 'Preparing agendas, capturing meeting notes, extracting action items, and tracking follow-through on decisions',
      automotive: 'Running morning huddles or service meetings, tracking action items from manager reviews, and documenting decisions',
      retail: 'Running team meetings, tracking action items from store walks and performance reviews, and documenting decisions',
      financial_services: 'Preparing client meeting agendas, documenting discussions and decisions, and tracking action items and follow-ups',
      healthcare: 'Running staff meetings, documenting clinical decisions, tracking action items from quality reviews and compliance meetings',
      beauty_aesthetics: 'Running team huddles, tracking action items from staff meetings and product training sessions, and documenting service standard updates',
      home_services: 'Running crew briefings, tracking action items from job reviews and safety meetings, and documenting process changes',
      saas: 'Running standups, sprint planning, and retrospectives, capturing decisions, and tracking action items across teams',
      other: 'Preparing for meetings, capturing notes and decisions, and tracking follow-through on action items'
    }
  },
  '5.5': {
    domain: 'operations',
    label: 'Quality Assurance and Process Compliance',
    frequency: 'medium',
    variants: {
      professional_services: 'Reviewing deliverables against quality standards before client delivery and auditing process adherence',
      automotive: 'Performing quality inspections on completed work, verifying repair accuracy, and auditing service process adherence',
      retail: 'Auditing merchandising standards, verifying inventory accuracy, and checking customer experience consistency',
      financial_services: 'Reviewing transactions and advice for regulatory compliance, auditing documentation completeness, and monitoring risk',
      healthcare: 'Auditing clinical documentation, verifying treatment protocol adherence, and monitoring patient safety compliance',
      beauty_aesthetics: 'Verifying treatment protocol adherence, auditing sanitation compliance, reviewing client consultation documentation, and monitoring service quality consistency',
      home_services: 'Inspecting completed work against standards, verifying code compliance, and auditing safety protocol adherence',
      saas: 'Running QA reviews, monitoring deployment quality, auditing security compliance, and tracking bug resolution',
      other: 'Checking that work meets your quality standards and verifying that your team follows established processes'
    }
  },
  '5.6': {
    domain: 'operations',
    label: 'Internal Knowledge Access',
    frequency: 'high',
    variants: {
      professional_services: 'Enabling your team to find answers to process, policy, and client-handling questions without asking you or a manager',
      automotive: 'Enabling technicians and service staff to access repair procedures, warranty policies, and pricing rules without asking a manager',
      retail: 'Enabling associates to find answers about return policies, product specifications, and store procedures without escalating',
      financial_services: 'Enabling your team to access compliance guidelines, product details, and client-handling procedures without asking a supervisor',
      healthcare: 'Enabling staff to find clinical protocols, billing procedures, and administrative policies without asking a provider or manager',
      beauty_aesthetics: 'Enabling providers and front-desk staff to access treatment protocols, product ingredients, pricing, and aftercare instructions without asking a manager',
      home_services: 'Enabling field crews to access job procedures, safety requirements, equipment guides, and customer communication standards on-site',
      saas: 'Enabling your team to find answers about product capabilities, internal processes, and customer-handling procedures in a searchable knowledge base',
      other: 'Enabling your team to find answers to common operational and process questions without asking you or a manager'
    }
  },
  '5.7': {
    domain: 'operations',
    label: 'Institutional Knowledge Capture',
    frequency: 'low',
    variants: {
      professional_services: 'Capturing expertise, decisions, and process knowledge from experienced team members into structured, searchable documentation',
      automotive: 'Documenting diagnostic expertise, repair tips, and institutional knowledge from senior technicians into a usable reference system',
      retail: 'Capturing product knowledge, merchandising best practices, and customer handling expertise from experienced staff',
      financial_services: 'Documenting client relationship history, advisory approaches, and compliance interpretations from experienced advisors',
      healthcare: 'Capturing clinical decision patterns, patient management approaches, and administrative expertise from senior staff',
      beauty_aesthetics: 'Documenting advanced treatment techniques, product knowledge, client consultation approaches, and formulation expertise from senior providers',
      home_services: 'Capturing diagnostic approaches, repair techniques, and customer management expertise from senior technicians into structured documentation',
      saas: 'Documenting architectural decisions, debugging approaches, customer migration patterns, and tribal knowledge from senior engineers',
      other: 'Capturing expertise and process knowledge from experienced team members into structured, searchable documentation'
    }
  },
  '6.1': {
    domain: 'delivery_projects',
    label: 'Project Delivery Planning and Resourcing',
    frequency: 'high',
    variants: {
      professional_services: 'Planning project delivery timelines, assigning team resources to workstreams, and tracking capacity against commitments',
      home_services: 'Planning job sequencing across crews, coordinating materials delivery with project start dates, and tracking crew capacity against booked work',
      saas: 'Planning feature delivery and customer onboarding timelines, allocating engineering and success resources, and tracking capacity against commitments'
    }
  },
  '6.2': {
    domain: 'delivery_projects',
    label: 'Client Deliverable Tracking and Approvals',
    frequency: 'high',
    variants: {
      professional_services: 'Tracking deliverable status against client expectations, managing review and approval cycles, and documenting sign-off',
      home_services: 'Tracking job milestones, managing inspection and approval checkpoints, and documenting completion sign-off with the homeowner',
      saas: 'Tracking customer onboarding milestones, managing configuration approvals, and documenting go-live acceptance'
    }
  },
  '6.3': {
    domain: 'delivery_projects',
    label: 'Scope Change and Variance Management',
    frequency: 'medium',
    variants: {
      professional_services: 'Managing scope change requests, documenting impact on timeline and budget, and obtaining client approval before adjusting delivery',
      home_services: 'Handling change orders, documenting additional work requests with cost and timeline impact, and obtaining homeowner approval before proceeding',
      saas: 'Managing feature change requests during implementation, documenting scope impact, and obtaining stakeholder approval'
    }
  },
  '7.1': {
    domain: 'inventory_supply',
    label: 'Stock and Inventory Tracking',
    frequency: 'high',
    variants: {
      automotive: 'Tracking parts inventory levels across categories, monitoring stock for high-demand items, and flagging shortages',
      retail: 'Tracking product inventory across locations and channels, monitoring stock levels, and flagging low-stock items',
      healthcare: 'Tracking medical supply and consumable inventory, monitoring expiration dates, and flagging items approaching reorder thresholds',
      beauty_aesthetics: 'Tracking retail product inventory, treatment consumables, and backbar supplies, monitoring levels across locations, and flagging low stock',
      home_services: 'Tracking materials and equipment inventory across trucks and warehouse, monitoring consumption against job schedules',
      other: 'Tracking your inventory levels, monitoring stock, and flagging items that need attention'
    }
  },
  '7.2': {
    domain: 'inventory_supply',
    label: 'Reorder and Replenishment',
    frequency: 'medium',
    variants: {
      automotive: 'Triggering parts reorders when stock drops below threshold, generating purchase orders, and managing backorder tracking',
      retail: 'Automating reorder triggers based on sales velocity, managing seasonal stock planning, and coordinating with suppliers',
      healthcare: 'Automating supply reorders based on usage rates, managing formulary updates, and coordinating with distributors',
      beauty_aesthetics: 'Triggering product and supply reorders based on usage rates and retail sales velocity, generating purchase orders, and coordinating with brand distributors',
      home_services: 'Triggering material reorders based on upcoming job requirements, managing bulk purchasing, and tracking delivery against schedules',
      other: 'Managing reorder triggers, generating purchase orders, and coordinating replenishment with suppliers'
    }
  },
  '7.3': {
    domain: 'inventory_supply',
    label: 'Supplier Communication and Order Tracking',
    frequency: 'medium',
    variants: {
      automotive: 'Communicating with parts suppliers about order status, delivery delays, returns, and warranty claims',
      retail: 'Coordinating with suppliers on shipment tracking, delivery scheduling, quality issues, and return authorizations',
      home_services: 'Coordinating with material suppliers on delivery timing, job-site drops, backorders, and quality issues',
      other: 'Communicating with suppliers about orders, delivery status, and resolving supply issues'
    }
  },
  '7.4': {
    domain: 'inventory_supply',
    label: 'Inventory Cost Analysis and Optimization',
    frequency: 'low',
    variants: {
      automotive: 'Analyzing parts costs, identifying margin compression, comparing supplier pricing, and flagging cost trends',
      retail: 'Analyzing product margins, identifying slow-moving inventory, optimizing pricing, and tracking cost changes from suppliers',
      home_services: 'Analyzing material costs per job type, identifying waste patterns, and comparing supplier pricing for key materials',
      other: 'Analyzing inventory costs, identifying optimization opportunities, and tracking pricing trends'
    }
  },
  '8.1': {
    domain: 'finance',
    label: 'Invoice Generation and Payment Collection',
    frequency: 'high',
    variants: {
      professional_services: 'Generating invoices from time tracking and project milestones, sending payment reminders, and tracking receivables',
      automotive: 'Generating invoices from completed repair orders, processing payments, and following up on outstanding balances',
      retail: 'Processing wholesale invoices, managing payment terms for B2B accounts, and tracking outstanding receivables',
      financial_services: 'Generating fee invoices, processing advisory billing, and managing premium collection and commission tracking',
      healthcare: 'Generating patient invoices, submitting insurance claims, processing co-pays, and following up on outstanding balances',
      beauty_aesthetics: 'Generating invoices for treatments and retail, processing membership payments, managing tip distribution, and following up on outstanding balances',
      home_services: 'Generating invoices from completed job tickets, collecting payment at close, and following up on outstanding balances',
      saas: 'Managing subscription billing, processing usage-based invoices, handling failed payment recovery, and tracking MRR',
      other: 'Generating invoices, sending payment reminders, and tracking accounts receivable'
    }
  },
  '8.2': {
    domain: 'finance',
    label: 'Expense Tracking and Categorization',
    frequency: 'high',
    variants: {
      professional_services: 'Capturing and categorizing business expenses, matching receipts to transactions, and flagging anomalies',
      automotive: 'Tracking shop expenses, categorizing parts costs versus overhead, and matching supplier invoices to purchase orders',
      retail: 'Tracking COGS, categorizing operating expenses, and reconciling supplier payments against received inventory',
      financial_services: 'Categorizing operating expenses, tracking client-related costs, and maintaining compliance-required expense documentation',
      healthcare: 'Tracking practice expenses, categorizing supply costs by department, and reconciling vendor payments',
      beauty_aesthetics: 'Tracking product costs, categorizing operating expenses (rent, supplies, commissions), reconciling vendor payments, and monitoring retail margins',
      home_services: 'Tracking job costs (materials, labor, equipment), categorizing overhead expenses, and calculating per-job profitability',
      saas: 'Tracking infrastructure costs, categorizing R&D versus operating expenses, and monitoring burn rate against budget',
      other: 'Tracking business expenses, categorizing spending, and matching receipts to transactions'
    }
  },
  '8.3': {
    domain: 'finance',
    label: 'Financial Reporting and Variance Analysis',
    frequency: 'medium',
    variants: {
      professional_services: 'Generating monthly P&L, tracking utilization and realization rates, and identifying revenue and cost variances',
      automotive: 'Generating monthly financial reports, tracking gross margin by service type, and identifying cost overruns',
      retail: 'Generating sales reports by channel and category, tracking margin trends, and analyzing promotional impact on profitability',
      financial_services: 'Generating AUM reports, tracking revenue per advisor, and analyzing profitability by client segment and product line',
      healthcare: 'Generating monthly revenue reports by provider and service line, tracking collection rates, and analyzing payer mix trends',
      beauty_aesthetics: 'Generating monthly revenue reports by provider and service type, tracking retail versus treatment revenue split, and analyzing membership and package profitability',
      home_services: 'Generating monthly financial reports, tracking job profitability, and analyzing labor cost trends against revenue',
      saas: 'Generating MRR and ARR reports, tracking unit economics (CAC, LTV, churn), and analyzing cohort performance',
      other: 'Generating monthly financial reports, tracking performance against budget, and identifying variances'
    }
  },
  '8.4': {
    domain: 'finance',
    label: 'Contract and Agreement Management',
    frequency: 'low',
    variants: {
      professional_services: 'Generating engagement letters, tracking contract renewals, and managing scope change documentation',
      automotive: 'Managing service agreements, fleet contracts, warranty documentation, and vendor terms',
      retail: 'Managing supplier contracts, lease agreements, wholesale terms, and vendor compliance documentation',
      financial_services: 'Managing client agreements, advisory contracts, compliance disclosures, and regulatory filing documentation',
      healthcare: 'Managing provider agreements, insurance contracts, vendor terms, and patient consent documentation',
      beauty_aesthetics: 'Managing provider contracts, product brand agreements, equipment leases, membership terms, and liability waivers',
      home_services: 'Generating service contracts, managing maintenance agreements, and tracking warranty and guarantee terms',
      saas: 'Managing SaaS subscription agreements, enterprise contracts, SLAs, and partner and reseller terms',
      other: 'Generating contracts, tracking renewals and expirations, and managing agreement documentation'
    }
  },
  '8.5': {
    domain: 'finance',
    label: 'Regulatory and Compliance Documentation',
    frequency: 'low',
    variants: {
      professional_services: 'Maintaining professional licensing records, tracking insurance renewals, and managing industry-specific compliance requirements',
      automotive: 'Maintaining EPA and OSHA compliance documentation, tracking shop certifications, and managing environmental and safety filings',
      retail: 'Managing product safety compliance, tracking import and customs documentation, and maintaining tax filing records',
      financial_services: 'Managing SEC, FINRA, or state regulatory filings, tracking compliance training completion, and maintaining audit-ready documentation',
      healthcare: 'Managing HIPAA compliance documentation, tracking accreditation requirements, and maintaining licensure and credentialing records',
      beauty_aesthetics: 'Maintaining cosmetology and health department licensing, tracking sanitation compliance, managing liability insurance, and documenting treatment consent protocols',
      home_services: 'Tracking trade licenses, managing permit documentation, maintaining insurance certificates, and monitoring safety compliance',
      saas: 'Managing SOC 2 compliance documentation, tracking GDPR and privacy requirements, and maintaining security audit records',
      other: 'Tracking licenses, permits, insurance, and regulatory requirements for your business'
    }
  }
};

// Domain data
export const DOMAINS = {
  marketing_content: { name: 'Marketing and Content', agents: ['marketing_content'] },
  sales: { name: 'Sales', agents: ['sales'] },
  customer_experience: { name: 'Customer Experience', agents: ['customer_service', 'customer_intelligence', 'chatbot'] },
  people_team: { name: 'People and Team', agents: ['people_operations'] },
  operations: { name: 'Operations', agents: ['operations', 'knowledge'] },
  delivery_projects: { name: 'Delivery and Projects', agents: [] },
  inventory_supply: { name: 'Inventory and Supply', agents: ['inventory'] },
  finance: { name: 'Finance', agents: ['accounting', 'compliance'] }
};

// Frequency weights
export const FREQUENCY_WEIGHTS: any = {
  high: 1.0,
  medium: 0.6,
  low: 0.3
};