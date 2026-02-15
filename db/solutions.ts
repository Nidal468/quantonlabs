export type IndustryPage = {
    title: string;
    subtitle: string;
    description: string;
    cta1Text: string;
    cta2Text: string;
    sections: {
        title: string;
        content: string;
    }[];
};

export type IndustrySlug =
    | "home-services"
    | "professional-services"
    | "automotive"
    | "healthcare-wellness"
    | "manufacturing-distribution"
    | "retail";

export const industryContentMap: Industries = {
    'home-services': {
        title: 'Home Services',
        subtitle: 'Your crews show up on time. Your systems should too.',
        description:
            "Quanton OS gives home service operators the infrastructure to scale beyond founder dependency, scattered tools, and operational guesswork.",
        cta1Text: 'Take Assessment',
        cta2Text: 'Book Consultation',
        sections: [
            {
                title: 'The Reality of Running a Home Services Company',
                content:
                    "You built this business on skill, reputation, and relentless work ethic. You answer calls at 6 AM, dispatch crews by 7, manage customer complaints between jobs, chase invoices at night, and try to remember which tech said what about which property three days ago.\n\nYour phone is your CRM. Your memory is your scheduling system. Your gut is your pricing model.\n\nThat worked at two trucks and $500K. It does not work at six trucks and $2M. And it will break completely at ten trucks and $5M.\n\nThe uncomfortable truth is that most home service companies do not have an operations problem. They have a systems problem disguised as a people problem. You keep hiring dispatchers, office managers, and coordinators hoping someone will finally \"get it.\" But the issue is not your people. The issue is that there is nothing for your people to operate inside. No single system of record. No governed workflow. No intelligence layer connecting what happens in the field to what happens in the office."
            },
            {
                title: 'What This Actually Costs You',
                content:
                    "Scheduling chaos. Jobs get double-booked, techs drive past each other on the highway, and emergency calls blow up the entire day because there is no system absorbing the disruption. Every scheduling conflict costs you billable hours, fuel, and customer confidence.\n\nRevenue leakage. Estimates that never get followed up. Recurring service contracts that lapse because nobody tracked the renewal. Upsell opportunities your techs saw in the field but never communicated back to the office. The money you are losing is invisible because you have no system measuring it.\n\nTribal knowledge dependency. Your best dispatcher knows every customer's preferences, every tech's strengths, and every route shortcut. When that person calls in sick or quits, half your operational intelligence walks out the door. You are running a business on institutional memory instead of institutional systems.\n\nOwner bottleneck. Every decision routes through you because there is no decision framework for anyone else to follow. Your team is not incompetent. They are unsupported. Without clear escalation paths, approval logic, and performance visibility, every question becomes your question.\n\nTool sprawl without integration. You have a scheduling app, a CRM you barely use, an invoicing platform, a Google Drive full of SOPs nobody reads, and a WhatsApp group where real decisions happen. Each tool solves one problem while creating three new disconnections."
            },
            {
                title: 'The Problem Is Not Effort. It Is Architecture.',
                content:
                    "You do not need another app. You do not need a consultant who observes your business for three months and hands you a report. You do not need a fractional COO who gives you advice but leaves you to implement it with the same broken infrastructure.\n\nYou need an operating system. A single governed environment where your scheduling, dispatch, customer communication, invoicing, performance tracking, and growth initiatives are connected, visible, and accountable.\n\nThat is what Quanton OS is built for."
            },
            {
                title: 'How Quanton OS Works for Home Services',
                content:
                    "Operations System\nStandardized workflows for dispatching, job completion, quality checks, and customer follow-up. Your techs know exactly what to do at every stage, and the office has real-time visibility into field activity without chasing phone calls. SOPs are embedded in the workflow, not buried in a shared drive.\n\nPlatform System\nYour CRM, scheduling tool, invoicing, and communication channels connected through a single control layer. Data entered in the field flows to the office. Customer history is accessible to every tech before they arrive on site. No more re-keying information across platforms or losing context between handoffs.\n\nStrategy System\nKPIs that actually matter for home services: revenue per truck, average job value, callback rate, estimate-to-close ratio, technician utilization. Not vanity metrics. Operational intelligence that tells you where to invest, where to cut, and where your growth is actually coming from.\n\nGrowth System\nStructured follow-up sequences for estimates, seasonal campaign execution, review generation workflows, and referral tracking. Growth becomes a system, not something you remember to do when things slow down.\n\nAI Agent Layer\nIntelligent automation handling routine decisions: appointment confirmations, estimate follow-ups, technician assignment optimization, and exception flagging. Your team focuses on high-value work while the system handles the operational noise."
            },
            {
                title: 'How Home Service Companies Deploy Quanton OS',
                content:
                    "Dispatch and Scheduling Automation\nAn HVAC company running multiple crews across a metro area was losing an estimated 15+ billable hours per week to scheduling conflicts, manual dispatching, and poor route coordination. Quanton OS replaced the patchwork of spreadsheets and phone calls with governed dispatch workflows, automated confirmations, and real-time crew visibility.\n[Read the full case study]\n\nMarketing Execution for Local Operators\nA local moving company with strong word-of-mouth reputation had no system for converting that reputation into predictable lead flow. Campaigns launched sporadically, follow-ups happened when someone remembered, and there was no way to measure what was working. Quanton OS structured their marketing execution into repeatable campaigns with tracked conversions and automated follow-up sequences.\n[Read the full case study]"
            },
            {
                title: 'Is This the Right Fit?',
                content:
                    "Quanton OS for Home Services is built for operators who:\nRun 3 to 30 crews and are scaling beyond what manual coordination can handle\nGenerate $500K to $20M in annual revenue and need systems that match their growth rate\nHave tried multiple tools but still run critical operations on memory, phone calls, and workarounds\nKnow they need structure but do not want to spend six months with a consultant before anything changes\nAre tired of being the bottleneck for every operational decision in their company\n\nIf your business still runs because you personally hold it together, Quanton OS is designed to change that.\n\nStop Managing Chaos. Start Operating.\nTake the assessment to see where your operational gaps are, or book a consultation to discuss how Quanton OS deploys in home service environments."
            }
        ]
    },
    'professional-services': {
        title: 'Professional Services',
        subtitle: "Your expertise is the product. Your operations should not be the bottleneck.",
        description:
            "Quanton OS gives professional service firms the infrastructure to scale delivery, protect margins, and stop running the business out of the founder's inbox.",
        cta1Text: 'Take Assessment',
        cta2Text: 'Book Consultation',
        sections: [
            {
                title: 'The Reality of Running a Professional Services Firm',
                content:
                    "You sell expertise. Consulting engagements, agency retainers, accounting cycles, legal matters, advisory relationships. Your value is in what you know and how you apply it. But the business that delivers that value is held together with email threads, spreadsheets, and sheer willpower.\n\nClient onboarding is different every time. Project scoping lives in someone's head. Deliverable tracking is a shared document that three people update inconsistently. Time tracking happens retroactively, if at all. And the pipeline exists as a mental model in the founder's mind, occasionally translated into a CRM that nobody trusts.\n\nYou are selling structure to your clients while operating without any yourself.\n\nThis works when you are the one doing the work. It stops working the moment you need other people to deliver at your standard without your direct involvement in every engagement. The firm that ran beautifully at $800K with three senior consultants becomes unmanageable at $2M with eight people because the operating infrastructure never scaled with the revenue."
            },
            {
                title: 'What This Actually Costs You',
                content:
                    "Margin erosion through scope creep. Without standardized scoping frameworks and change management workflows, projects expand silently. Your team absorbs extra work to maintain the relationship, and by the time you realize the engagement is underwater, three months of unbilled hours have evaporated. You are subsidizing your clients' growth with your margins.\n\nUtilization blindness. You do not actually know how your team spends their time. Billable versus non-billable hours are an estimate, not a measurement. Senior people are doing junior work because there is no system routing tasks by complexity. Your most expensive resource is answering emails that a coordinator should handle.\n\nClient experience inconsistency. Every engagement feels slightly different because every project manager runs their process differently. Client A gets weekly status reports. Client B gets them when someone remembers. Client C escalates directly to you because they learned that is the fastest path to resolution. Your brand promises consistency, but your operations deliver variation.\n\nKnowledge that walks out the door. When a senior consultant leaves, they take client relationships, institutional knowledge, and process understanding with them. There is no system capturing how engagements were structured, what worked, what failed, or what the client's real priorities were beneath the stated objectives. Every departure is a partial reset.\n\nGrowth limited by founder capacity. You cannot sell more than you can personally oversee. Every new engagement adds to your management load because there is no operating layer between your strategic direction and the team's daily execution. You have become the bottleneck you tell your clients to eliminate."
            },
            {
                title: 'The Problem Is Not Talent. It Is Infrastructure.',
                content:
                    "You did not build a professional services firm because you lack intelligence or discipline. You built it because you are exceptionally good at what you do. But the business around that expertise was never architected. It grew organically, one client at a time, and the systems (or lack of systems) grew the same way.\n\nYou do not need project management training. You do not need another SaaS platform bolted onto the stack. You need an operating system that connects client delivery, resource allocation, financial visibility, and business development into a single governed environment.\n\nThat is what Quanton OS is built for."
            },
            {
                title: 'How Quanton OS Works for Professional Services',
                content:
                    "Operations System\nStandardized engagement workflows from scoping through delivery and close-out. Every project follows a governed process with defined stages, deliverable checkpoints, and quality gates. Your team operates inside a consistent framework regardless of client, engagement type, or project manager.\n\nPlatform System\nCRM, project management, time tracking, document management, and client communication unified through a single control layer. Pipeline data flows into resource planning. Time entries feed margin analysis. Client feedback connects to engagement scoring. No more reconciling five platforms to understand one engagement.\n\nStrategy System\nMetrics built for professional services: effective rate per engagement, utilization by role, pipeline velocity, client lifetime value, scope variance tracking. Not generic dashboards. Intelligence that tells you which clients are profitable, which engagements are eroding margin, and where your next hire should be.\n\nGrowth System\nStructured business development workflows: proposal templates, follow-up sequences, referral tracking, and cross-sell identification within existing accounts. Revenue generation becomes a repeatable process, not an activity that only happens when the founder has a slow week.\n\nAI Agent Layer\nIntelligent automation handling time entry reminders, status report generation, scope variance alerts, and engagement health scoring. The system flags at-risk projects before they become client escalations and surfaces upsell opportunities based on engagement patterns."
            },
            {
                title: 'Is This the Right Fit?',
                content:
                    "Quanton OS for Professional Services is built for firms that:\nEmploy 5 to 50 people delivering client-facing expertise (consulting, agencies, accounting, legal, advisory)\nGenerate $500K to $20M in annual revenue and are losing margin to operational inefficiency\nStruggle with consistent delivery quality as the team grows beyond founder oversight\nHave pipeline visibility that depends on one or two people's memory rather than a governed system\nKnow their utilization rate should be higher but cannot identify where the time goes\n\nIf your firm's quality depends on who manages the project rather than the system they operate inside, Quanton OS is designed to change that.\n\nYour Clients Hire You for Structure. Build Your Own.\nTake the assessment to see where your operational gaps are, or book a consultation to discuss how Quanton OS deploys in professional service environments."
            }
        ]
    },
    'automotive': {
        title: 'Automotive',
        subtitle: "You built the shop. Now build the system that runs it.",
        description:
            "Quanton OS gives automotive operators the infrastructure to scale throughput, tighten margins, and stop running the business from the service counter.",
        cta1Text: 'Take Assessment',
        cta2Text: 'Book Consultation',
        sections: [
            {
                title: 'The Reality of Running an Automotive Business',
                content:
                    "You know cars. You know what a customer needs before they finish describing the noise. You can estimate a job by looking at the vehicle, and your best techs can turn a bay faster than anyone in the market. That expertise built the business.\n\nBut the business itself runs on chaos dressed up as hustle. Estimates are handwritten or typed into three different systems. Service recommendations from last visit are buried in a folder no one checks. Parts ordering happens when someone remembers, and warranty claims are a stack of paper on a desk that grows faster than it shrinks.\n\nYour service advisors are making pricing decisions from memory. Your techs are waiting on parts that should have been ordered yesterday. Your front desk is fielding calls about jobs they have no visibility into because the information lives in the shop, not in a system.\n\nYou compensate for all of this with personal effort. You walk the shop floor ten times a day, answer the same question from three different people, and close the gap between what your systems should do and what they actually do. You are the operating system. And that does not scale."
            },
            {
                title: 'What This Actually Costs You',
                content:
                    "Estimate leakage. A customer comes in for an oil change and the tech spots a worn belt, aging brake pads, and a transmission fluid that has not been changed in 40,000 miles. That is $800 in recommended services. But the recommendation never makes it from the tech's observation to the service advisor's conversation to the customer's decision. There is no workflow capturing, routing, and following up on service recommendations. That revenue evaporates daily.\n\nBay utilization waste. Techs standing idle waiting for parts. Vehicles sitting on the lot waiting for approval. Jobs stacking up on one lift while another sits empty because the scheduler did not account for job complexity. Every hour a bay sits unproductive is revenue your facility will never recover.\n\ncustomer follow-up failure. The customer who declined the brake job three months ago never got a follow-up. The fleet account that was due for a rotation last month fell off the radar. Your repeat business depends on relationships, but you have no system nurturing those relationships between visits.\n\nPricing inconsistency. Two service advisors quote the same job differently because there is no standardized pricing matrix. Discounts get applied based on who is at the counter and how busy the shop feels that day. Your margins fluctuate not because of market conditions but because of operational inconsistency.\n\nAdministrative drag. Invoicing, warranty claims, parts reconciliation, vendor management, payroll tracking for flag hours or commission. The back office runs on manual processes that consume hours every week. Hours that could be spent on growth, training, or simply running a tighter operation."
            },
            {
                title: 'The Problem Is Not Your Team. It Is the Gap They Work Inside.',
                content:
                    "Your techs are skilled. Your service advisors know how to sell. Your front desk handles more complexity in a morning than most office workers handle in a week. The problem is that these capable people are operating inside a vacuum of disconnected tools, inconsistent processes, and invisible information.\n\nYou do not need another shop management platform with features you will never configure. You need an operating system that connects estimates to recommendations to follow-ups to invoicing to performance metrics in a single governed environment.\n\nThat is what Quanton OS is built for."
            },
            {
                title: 'How Quanton OS Works for Automotive',
                content:
                    "Operations System\nStandardized workflows from vehicle intake through service completion and customer delivery. Estimate creation follows governed templates with built-in service recommendation capture. Techs log findings in the workflow. Service advisors see recommendations before the customer conversation. Nothing falls between the cracks because the cracks are eliminated by process design.\n\nPlatform System\nShop management, CRM, parts ordering, invoicing, and customer communication connected through a single control layer. Customer vehicle history is visible at every touchpoint. Parts status is tracked in real time. Warranty claims are processed within the workflow, not as an afterthought on a separate desk.\n\nStrategy System\nMetrics built for automotive: revenue per bay hour, average repair order value, estimate-to-close ratio, service recommendation capture rate, customer return rate, technician efficiency. Intelligence that tells you which services drive margin, which advisors convert, and where your throughput bottlenecks actually are.\n\nGrowth System\nAutomated service reminders, declined service follow-ups, fleet account management, and review generation workflows. Customer retention and upsell become systematic rather than dependent on someone remembering to make a call.\n\nAI Agent Layer\nIntelligent automation handling appointment scheduling, service recommendation routing, estimate follow-up sequences, and exception flagging when jobs exceed estimated time or cost. The system handles operational coordination so your people can focus on the work and the customer."
            },
            {
                title: 'How Automotive Businesses Deploy Quanton OS',
                content:
                    "Estimates and Service Recommendations\nAn automotive shop was losing significant revenue to service recommendations that never reached the customer. Techs identified additional work during inspections, but findings were noted on paper, lost between shifts, or never communicated to the service advisor. Quanton OS built a governed workflow from technician observation to advisor conversation to customer follow-up, closing the gap where revenue was quietly disappearing.\n[Read the full case study]"
            },
            {
                title: 'Is This the Right Fit?',
                content:
                    "Quanton OS for Automotive is built for operators who:\nRun 3 to 20+ bays and need systems that scale with throughput, not just headcount\nGenerate $500K to $20M in annual revenue across repair, maintenance, detailing, or fleet services\nLose revenue to missed recommendations, inconsistent follow-up, and pricing variation\nRely on the owner or one key manager to bridge every gap between shop floor and front office\nWant to grow the business without being physically present to manage every decision\n\nIf your shop's performance depends on who is working today rather than the system everyone works inside, Quanton OS is designed to change that.\n\nStop Running the Shop From the Counter. Start Operating.\nTake the assessment to see where your operational gaps are, or book a consultation to discuss how Quanton OS deploys in automotive environments."
            }
        ]
    },
    'healthcare-wellness': {
        title: 'Healthcare & Wellness',
        subtitle: "You heal your clients. Your operations need the same attention.",
        description:
            "Quanton OS gives healthcare and wellness operators the infrastructure to scale patient experience, protect margins, and stop running the practice out of the owner's personal bandwidth.",
        cta1Text: 'Take Assessment',
        cta2Text: 'Book Consultation',
        sections: [
            {
                title: 'The Reality of Running a Healthcare or Wellness Practice',
                content:
                    "You went into this field to help people. You trained for years, built clinical expertise, and opened a practice because you believed you could deliver better outcomes than the places you worked before. And you were right.\n\nBut somewhere between the third hire and the second location, the business started running you instead of the other way around. The front desk is overwhelmed. Appointment no-shows cost you thousands monthly. Treatment plans get started but never completed because there is no system tracking patient follow-through. And you spend more time managing staff, inventory, and billing disputes than you spend with patients.\n\nYour EMR handles clinical documentation. But the business of running the practice? That lives in spreadsheets, sticky notes, memory, and the owner's constant attention. Patient acquisition, retention, staff scheduling, inventory management, financial performance, and growth planning all operate independently with no connecting tissue.\n\nYou are a clinician first and a business operator by necessity. And the business side has no operating system."
            },
            {
                title: 'What This Actually Costs You',
                content:
                    "No-show and cancellation losses. Every empty appointment slot is lost revenue that cannot be recovered. You know this. But without automated confirmation sequences, waitlist management, and strategic overbooking logic, you absorb the loss reactively instead of preventing it systematically.\n\nTreatment plan abandonment. A patient begins a treatment protocol, completes three of six sessions, and disappears. Nobody follows up because nobody is tracking treatment plan completion rates. The clinical outcome suffers and the revenue from those remaining sessions is gone. Multiply this across your patient base and the number is significant.\n\nFront desk as bottleneck. Your front desk handles scheduling, check-in, insurance verification, payment collection, phone inquiries, and patient communication simultaneously. They are overtasked and undertooled. Errors happen not because of incompetence but because one person cannot manage six workflows manually without something breaking.\n\nInventory and supply mismanagement. Products ordered too late, too early, or in wrong quantities because there is no consumption tracking tied to appointment volume. For practices selling retail products (skincare, supplements, wellness goods), inventory that sits on shelves is cash that is not working.\n\nGrowth by intuition. You know certain services are more profitable than others, but you cannot quantify it. You think word-of-mouth drives most new patients, but you have no data confirming it. Marketing spend goes to whatever the last sales rep suggested. Growth decisions are based on feeling, not intelligence."
            },
            {
                title: 'The Problem Is Not Clinical. It Is Operational.',
                content:
                    "Your clinical outcomes are strong. Your patient satisfaction is high when they are in the room with you. The breakdown happens in everything around the clinical encounter: how patients find you, how they book, how they are reminded, how treatment plans are tracked, how follow-ups happen, how performance is measured, and how growth is planned.\n\nYou do not need a bigger EMR. You need an operating system that governs the business side of your practice with the same discipline you apply to the clinical side.\n\nThat is what Quanton OS is built for."
            },
            {
                title: 'How Quanton OS Works for Healthcare and Wellness',
                content:
                    "Operations System\nStandardized workflows for patient intake, appointment management, treatment plan tracking, and follow-up sequences. Every patient interaction follows a governed process. Treatment plan completion is tracked and flagged when patients fall off protocol. Follow-ups are automated, not optional.\n\nPlatform System\nScheduling, CRM, billing, patient communication, and inventory management connected through a single control layer. Patient data flows from booking through treatment through follow-up without manual re-entry. Staff see what they need at each touchpoint without switching between disconnected systems.\n\nStrategy System\nMetrics built for healthcare and wellness: revenue per provider hour, treatment plan completion rate, patient acquisition cost, lifetime patient value, no-show rate, service mix profitability. Intelligence that tells you which services to promote, which referral sources to invest in, and where patient attrition is actually happening.\n\nGrowth System\nPatient reactivation campaigns, review generation workflows, referral incentive tracking, and seasonal promotion execution. Growth becomes a governed system with measurable outcomes, not a burst of effort when the schedule looks light.\n\nAI Agent Layer\nIntelligent automation handling appointment confirmations, waitlist management, treatment plan reminders, review requests, and reactivation outreach. The system manages the operational rhythm of patient engagement so your team can focus on delivering care."
            },
            {
                title: 'How Healthcare and Wellness Practices Deploy Quanton OS',
                content:
                    "Lead Tracking and Follow-Up\nAn aesthetics spa was generating strong inquiry volume but converting a fraction into booked consultations. Leads arrived through multiple channels with no unified tracking, follow-up timing was inconsistent, and high-value prospects fell through gaps between the front desk and the providers. Quanton OS implemented governed lead capture, automated follow-up sequences, and conversion tracking that turned scattered inquiries into a predictable booking pipeline.\n[Read the full case study]"
            },
            {
                title: 'Is This the Right Fit?',
                content:
                    "Quanton OS for Healthcare and Wellness is built for practice owners who:\nOperate 1 to 5 locations with growing complexity across scheduling, staffing, and patient management\nGenerate $500K to $20M in annual revenue and are losing margin to operational inefficiency\nSpend more time managing the business than practicing their craft\nHave strong clinical outcomes but inconsistent patient experience outside the treatment room\nWant to grow strategically rather than reactively chasing the next marketing tactic\n\nIf your practice delivers exceptional care but the business around it operates on memory and manual effort, Quanton OS is designed to change that.\n\nTreat Your Business With the Same Discipline You Treat Your Patients.\nTake the assessment to see where your operational gaps are, or book a consultation to discuss how Quanton OS deploys in healthcare and wellness environments."
            }
        ]
    },
    'manufacturing-distribution': {
        title: 'Manufacturing & Distribution',
        subtitle: "You build things that work. Your operations should work the same way.",
        description:
            "Quanton OS gives manufacturers and distributors the infrastructure to scale production, tighten supply chain coordination, and stop managing complexity through spreadsheets and tribal knowledge.",
        cta1Text: 'Take Assessment',
        cta2Text: 'Book Consultation',
        sections: [
            {
                title: 'The Reality of Running a Manufacturing or Distribution Operation',
                content:
                    "You produce a physical product. That means every operational failure has a physical consequence: late shipments, incorrect assemblies, wasted materials, missed production windows, and customer relationships damaged by problems that started three steps upstream.\n\nYour shop floor knows what it is doing. Your operators are skilled, your processes produce quality output, and when things run smoothly, margins are healthy. The problem is that things rarely run smoothly for long, because the systems connecting sales to production to inventory to fulfillment are held together with manual processes, institutional knowledge, and constant human intervention.\n\nBills of materials live in spreadsheets that are always slightly out of date. Inventory counts are approximations. Production scheduling is a negotiation between the shop floor and the sales team, mediated by whoever shouts loudest. Customer orders trigger a chain of phone calls and emails instead of automated workflows. And when something goes wrong, the investigation begins with \"who forgot to update the spreadsheet?\"\n\nYou are not running a manufacturing operation. You are running a manual coordination exercise that happens to produce products."
            },
            {
                title: 'What This Actually Costs You',
                content:
                    "BOM and specification drift. Your bill of materials says one thing. The shop floor does something slightly different because the change was communicated verbally, or the spreadsheet was updated on one computer but not another. Every specification mismatch is a rework cost, a material waste, or a customer return waiting to happen.\n\nInventory blindness. You carry too much of what you do not need and run out of what you do. Reorder points are based on gut feel rather than consumption data. Rush orders for materials cost premiums that eat into margins. And the carrying cost of excess inventory silently accumulates on your balance sheet while cash flow tightens.\n\nProduction scheduling friction. Sales commits to delivery dates without visibility into current production load. The shop floor adjusts priorities based on whoever applied the most pressure that morning. Rush jobs interrupt planned runs, creating cascading delays across the entire schedule. Nobody has a single source of truth for what is being built, when, and for whom.\n\nQuality control gaps. Inspection happens at the end of the line, not embedded in the process. By the time a defect is caught, it has been replicated across an entire batch. There is no system feeding quality data back into production planning to prevent recurrence. You fix the symptom repeatedly instead of addressing the root cause systematically.\n\nCustomer communication delays. Order status inquiries require someone to walk the shop floor, check a spreadsheet, and call the customer back. Lead times are estimates based on experience, not system-generated calculations from current capacity. Customer confidence erodes not because of poor quality but because of poor visibility."
            },
            {
                title: 'The Problem Is Not Production. It Is the System Around It.',
                content:
                    "Your manufacturing capability is proven. Your team knows how to build the product. What they do not have is an operating environment that connects customer demand to production planning to material procurement to quality assurance to fulfillment in a single governed workflow.\n\nYou do not need a $500K ERP implementation with eighteen months of consulting. You need an operating system scaled for your actual complexity that connects the information flows your business depends on.\n\nThat is what Quanton OS is built for."
            },
            {
                title: 'How Quanton OS Works for Manufacturing and Distribution',
                content:
                    "Operations System\nStandardized workflows from order receipt through production scheduling, material procurement, assembly, quality inspection, and fulfillment. Every order follows a governed process with defined stages, checkpoints, and exception handling. The shop floor operates inside a consistent framework, not a daily improvisation.\n\nPlatform System\nOrder management, BOM management, inventory tracking, production scheduling, and customer communication connected through a single control layer. Sales enters an order and production sees the requirements. Material consumption updates inventory in real time. Customer status is queryable without walking the floor.\n\nStrategy System\nMetrics built for manufacturing: throughput rate, on-time delivery percentage, material waste ratio, production cost per unit, capacity utilization, rework rate. Intelligence that tells you where bottlenecks form, which products drive margin, and where your process is leaking money.\n\nGrowth System\nCustomer reorder management, quote follow-up workflows, new product introduction frameworks, and distributor relationship tracking. Revenue expansion becomes systematic rather than reactive.\n\nAI Agent Layer\nIntelligent automation handling reorder point alerts, production variance flagging, delivery estimate calculations, and quality trend analysis. The system surfaces problems before they compound and opportunities before they expire."
            },
            {
                title: 'How Manufacturing and Distribution Companies Deploy Quanton OS',
                content:
                    "Complex Assembly Operations\nA manufacturing and distribution company managing complex multi-component assemblies was operating with fragmented BOM management, manual production tracking, and disconnected inventory systems. Specification changes propagated slowly, rework rates were climbing, and customer delivery accuracy was suffering. Quanton OS implemented a unified production environment connecting BOMs to scheduling to quality tracking to fulfillment, giving the operation a single source of truth from order to delivery.\n[Read the full case study]"
            },
            {
                title: 'Is This the Right Fit?',
                content:
                    "Quanton OS for Manufacturing and Distribution is built for operators who:\nRun production facilities or distribution operations with 5 to 50+ employees\nGenerate $1M to $20M in annual revenue and are managing complexity that has outgrown their current systems\nStruggle with BOM accuracy, inventory visibility, or production scheduling coordination\nKnow their data exists but cannot access it in real time when decisions need to be made\nWant ERP-level coordination without ERP-level cost, complexity, and implementation timelines\n\nIf your production capability is strong but your operational coordination depends on manual effort and institutional memory, Quanton OS is designed to change that.\n\nBuild Your Operations the Way You Build Your Products. With Precision.\nTake the assessment to see where your operational gaps are, or book a consultation to discuss how Quanton OS deploys in manufacturing and distribution environments."
            }
        ]
    },
    'retail': {
        title: 'Retail',
        subtitle: "Every sale tells a story. Your systems should be reading it.",
        description:
            "Quanton OS gives retail operators the infrastructure to unify in-store, online, and multi-location operations into a single governed environment that drives margin, retention, and growth.",
        cta1Text: 'Take Assessment',
        cta2Text: 'Book Consultation',
        sections: [
            {
                title: 'The Reality of Running a Retail Business',
                content:
                    "Retail is deceptively complex. From the outside, it looks straightforward: buy product, display product, sell product. From the inside, you are managing inventory across channels, forecasting demand based on intuition, staffing based on last year's patterns, pricing based on competitive pressure, and trying to build customer loyalty in a market that rewards whoever shows up in the next search result.\n\nYour POS system tracks transactions. Your e-commerce platform tracks online orders. Your inventory management tool tracks stock levels. Your email marketing platform tracks opens and clicks. But nothing tracks the customer journey across all of these. And nothing connects the operational decisions you make in one system to the consequences that show up in another.\n\nYou mark down a product online to clear inventory, and your in-store team does not know about it until a customer complains about the price difference. You run a promotion that drives traffic, but your staffing was planned a week ago for normal volume. You reorder based on what sold last month, not based on what your data is telling you about next month.\n\nThe problem is not a lack of data. You are drowning in data. The problem is that your data lives in silos that do not speak to each other, and the decisions that should be informed by that data are still being made by gut feel and historical habit."
            },
            {
                title: 'What This Actually Costs You',
                content:
                    "Inventory misalignment. Overstocked on slow movers, understocked on bestsellers. Dead inventory ties up cash while stockouts send customers to competitors. Your buying decisions are based on what sold last season, not what demand signals are telling you right now. Every misalignment is either a markdown that erodes margin or a missed sale that erodes revenue.\n\nChannel disconnection. Your online store, physical location(s), and marketplace presence operate as separate businesses sharing a brand name. Pricing, promotions, inventory availability, and customer experience are inconsistent across channels. A customer who buys online and returns in-store creates a data gap. A customer who browses in-store and buys online is invisible to your retail staff.\n\nCustomer retention by accident. You have loyal customers, but you could not tell me who your top 50 are, what they buy, when they buy it, or what would bring them back sooner. Retention is happening because of product quality and convenience, not because you have a system cultivating it. When a competitor matches your product and price, loyalty evaporates because there was no relationship infrastructure beneath it.\n\nStaff productivity without direction. Your team shows up, opens the store, and responds to what walks in. There is no system telling them which products to push, which customers to prioritize, or what the day's targets are. Staffing levels are based on schedule availability, not traffic patterns or revenue goals. Your labor cost is fixed, but its productivity is variable.\n\nMarketing spend without attribution. You spent money on social media, email campaigns, local advertising, and influencer partnerships. Something worked because sales went up. But you cannot attribute which sales came from which effort, which means you cannot double down on what works or cut what does not. Your marketing budget is a blunt instrument."
            },
            {
                title: 'The Problem Is Not Sales. It Is Visibility.',
                content:
                    "Your product is strong. Your customers keep coming back. Your team works hard. What is missing is the operating layer that connects every transaction, every customer interaction, every inventory movement, and every marketing touchpoint into a single picture that drives intelligent decisions.\n\nYou do not need another retail analytics dashboard. You need an operating system that governs how your business runs across every channel, every location, and every customer relationship.\n\nThat is what Quanton OS is built for."
            },
            {
                title: 'How Quanton OS Works for Retail',
                content:
                    "Operations System\nStandardized workflows for inventory management, order fulfillment, store operations, and customer service. Every process follows a governed framework: receiving, merchandising, replenishment, returns, and end-of-day reconciliation. Staff operate inside a consistent system regardless of location, shift, or channel.\n\nPlatform System\nPOS, e-commerce, inventory management, CRM, and marketing platforms connected through a single control layer. Online and in-store inventory is unified. Customer profiles span channels. Pricing and promotions are governed centrally and executed consistently everywhere.\n\nStrategy System\nMetrics built for retail: revenue per square foot, inventory turn rate, gross margin return on investment, customer acquisition cost, average transaction value, customer lifetime value, sell-through rate by category. Intelligence that tells you what to buy, what to markdown, where to invest, and which customers to cultivate.\n\nGrowth System\nCustomer segmentation and targeted campaigns, loyalty program management, reactivation workflows, seasonal promotion calendars, and new product launch frameworks. Growth is governed by data and executed through repeatable systems, not seasonal guesswork.\n\nAI Agent Layer\nIntelligent automation handling demand forecasting, reorder recommendations, customer segmentation, personalized outreach triggers, and pricing optimization signals. The system reads your sales data and surfaces the decisions that drive margin before you have to ask the questions."
            },
            {
                title: 'Is This the Right Fit?',
                content:
                    "Quanton OS for Retail is built for operators who:\nRun 1 to 10+ locations or operate across physical and digital channels\nGenerate $500K to $20M in annual revenue and are losing margin to operational disconnection\nHave customer data scattered across platforms with no unified view of who buys what and why\nMake inventory and marketing decisions based on intuition rather than connected intelligence\nWant to compete on experience and operations, not just on product and price\n\nIf your retail business generates data everywhere but intelligence nowhere, Quanton OS is designed to change that.\n\nEvery Transaction Is Data. Start Using It.\nTake the assessment to see where your operational gaps are, or book a consultation to discuss how Quanton OS deploys in retail environments."
            }
        ]
    }
};

export type Industries = Record<IndustrySlug, IndustryPage>;