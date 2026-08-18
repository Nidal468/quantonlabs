export type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  // ── THE SYSTEM ───────────────────────────────────────────────
  {
    category: "The System",
    question: "What is Quanton OS?",
    answer:
      "Quanton OS is an AI-native business system. Eight coordinated AI agents run on Quanton Labs infrastructure against an operational core built as your system of record: one governed layer holding your customer, financial, inventory, and workflow data. Quanton Labs builds it, operates it, and improves it continuously. You own it.",
  },
  {
    category: "The System",
    question: "How is that different from AI software?",
    answer:
      "Software is something you operate. This is operated for you. You are not buying a tool and figuring out how to use it. Quanton Labs builds the system around how your business actually works, runs it on our infrastructure, and stays responsible for it. The deeper difference is coordination. Most AI products do one thing well in one part of the business, and nothing connects them, so nobody sees the whole picture. Quanton OS puts every function on one layer with a Governing Agent coordinating across all of them.",
  },
  {
    category: "The System",
    question: "Why does everything need to be on one system?",
    answer:
      "Because agents reasoning over scattered data produce scattered answers. When your customer records live in one place, your financials in another, and your job history in a third, no agent can see how they relate. Put them on one governed layer and the same agent can tell you which customers are unprofitable, which jobs are slipping, and where cash is actually going. Most operators at this size do not have a technology problem. They have four systems that each hold part of the truth and none that hold all of it.",
  },
  {
    category: "The System",
    question: "What if we already have systems in place?",
    answer:
      "Then we consolidate them. Existing platforms stay connected during the build and are retired as each function goes live on your operational core. Where a service is genuinely better handled by a specialist, such as payment processing, tax computation, shipping, or phone and email, it stays connected at the endpoint permanently. Consolidation is the value being delivered, not a cost of it. The fragmentation is the problem being solved.",
  },
  {
    category: "The System",
    question: "What if we have almost no systems?",
    answer:
      "That is the fastest and cleanest deployment we do. Nothing to migrate, nothing to untangle, no legacy structure to work around. The system is built directly around how you operate. Businesses running on spreadsheets, paper, and a single accounting package are excellent candidates, not poor ones.",
  },
  {
    category: "The System",
    question: "Do we have to replace our accounting software?",
    answer:
      "In most deployments, yes. Financial data is the backbone of operational reasoning, and it needs to live where the agents can work with it directly. Financial migration is handled carefully. Reconciliation criteria are agreed in writing before any migration begins, your accountant or bookkeeper confirms the result, and historical periods outside the reconciliation window are carried over as reference records. Nothing moves until you and your accountant agree what a correct migration looks like.",
  },
  {
    category: "The System",
    question: "What are the eight agents?",
    answer:
      "Marketing and Content handles content planning, creation, distribution, and performance. Sales handles lead response, qualification, proposals, follow-up, and pipeline. Customer Experience handles scheduling, inbound inquiries, complaints, onboarding, and follow-up. People and Team handles recruiting, onboarding, performance reviews, and certification tracking. Operations handles task assignment, SOPs, vendor coordination, and process compliance. Inventory and Supply Chain handles stock levels, reorders, supplier communication, and cost analysis. Finance handles invoicing, receivables, transaction categorization, reporting, and compliance. The Governing Agent coordinates all seven, manages exceptions, enforces governance, and feeds your dashboard.",
  },
  {
    category: "The System",
    question: "Can we start with just two or three agents?",
    answer:
      "Not within Quanton OS. The Governing Agent needs the full set to coordinate across, and coordination is the entire point. A partial deployment would be a collection of automations wearing the name of a system. If a smaller starting point is the right fit for where your business is today, we run a separate program that deploys individual agents into single functions. We will tell you on the call which of the two actually fits.",
  },

  // ── CONTROL AND GOVERNANCE ───────────────────────────────────
  {
    category: "Control and Governance",
    question: "Will AI be making decisions in my business?",
    answer:
      "Not on anything that matters to your customers, your revenue, or your compliance obligations. Every agent operates under a hybrid model: the agent handles volume, consistency, and analysis, and you retain approval authority over consequential decisions. Approval levels are set function by function during your engagement and written into your agreement. Agents cannot change their own governance settings.",
  },
  {
    category: "Control and Governance",
    question: "What are the approval levels?",
    answer:
      "Three. Full Autonomy means the agent acts without review, and applies only to deterministic, low-risk tasks such as scheduled reports, internal notifications, and data categorization. Silent Approval means the agent prepares and queues, then proceeds after a review window unless you step in, and applies to draft content, scheduled follow-ups, and routine supplier communication. Hard Block means the agent prepares and presents, and nothing happens without your explicit approval. Hard Block applies to client communications, proposals, invoices, pricing changes, hiring decisions, and compliance filings.",
  },
  {
    category: "Control and Governance",
    question: "What happens when an agent encounters something unexpected?",
    answer:
      "It stops and escalates. The Governing Agent classifies the exception, identifies who should decide, assembles the full context including any similar past decisions, and routes it to that person. No exception resolves itself automatically. Every resolution is logged.",
  },
  {
    category: "Control and Governance",
    question: "How do I know what the agents are doing?",
    answer:
      "A leadership dashboard gives you a live view across every domain: agent activity, exceptions waiting on a decision, approvals in your queue, and performance against the baseline captured before deployment. Every action and approval is recorded in an audit trail you can review at any time, and audit records cannot be altered after the fact.",
  },
  {
    category: "Control and Governance",
    question: "What about accuracy? AI makes things up.",
    answer:
      "It does, which is why output controls scale with consequence. Low-risk output is validated against expected structure and rejected if confidence falls below threshold. Medium-risk output is held for a review window. Anything client-facing or financial requires explicit human approval, with the agent's confidence and reasoning presented alongside it.",
  },

  // ── OWNERSHIP AND COMMITMENT ─────────────────────────────────
  {
    category: "Ownership and Commitment",
    question: "What do we actually own?",
    answer:
      "On completion of deployment, you own the delivered operational core and every configuration in it, outright. You can operate it, extend it, or bring in anyone you choose to work on it, during or after our engagement, without asking us. Quanton Labs retains the underlying framework and methodology, the architecture and orchestration logic that we bring to every deployment. You hold a permanent license to use it within your system.",
  },
  {
    category: "Ownership and Commitment",
    question: "What happens if we stop the monthly service?",
    answer:
      "The system you own keeps running as delivered. What ends is our operation of it: monitoring, optimization, governance enforcement, and continuous improvement. That last item is the one worth understanding. AI models improve constantly, and our ongoing work applies those improvements to your system. Stop the service and your system stops getting better. It does not stop working, and we do not hold anything back.",
  },
  {
    category: "Ownership and Commitment",
    question: "Do we have to pay for upgrades?",
    answer:
      "No. There are no version upgrades to purchase and no upgrade decisions to make. Continuous improvement is what the monthly service buys. If we build something structurally new, a new capability class or a new service category, that is scoped and priced as its own project, and it is never required to keep what you have running.",
  },
  {
    category: "Ownership and Commitment",
    question: "How long do we have to commit?",
    answer:
      "Managed Services carries an initial six-month period, then continues month to month with 30 days notice. You can also elect a committed term of 12, 24, or 36 months, which locks your monthly investment for the duration and accrues credits toward future capability expansion. Longer terms accrue faster. The specific terms are set out in your engagement agreement.",
  },
  {
    category: "Ownership and Commitment",
    question: "Who owns our data?",
    answer:
      "You do, always and without qualification. We do not claim ownership of any of it, we do not sell it, and we do not share it except with subcontractors under equivalent confidentiality obligations, AI providers processing your own agents' requests, services you have specifically elected to use, and where law requires. You can request a complete export at any time, provided in a documented format within 15 business days.",
  },
  {
    category: "Ownership and Commitment",
    question: "Where does our data live?",
    answer:
      "Either on infrastructure you control, or on ours, elected at signing and recorded in your agreement. Where we host, you can export everything at any time and on termination. Where you host, we hold coordination state, the audit log, and synthesized reporting only.",
  },
  {
    category: "Ownership and Commitment",
    question: "How is our data secured?",
    answer:
      "Encrypted transmission on all connections. Credential-controlled access limited exclusively to the orchestration layer, with platform credentials never exposed in your environment. Audit log records are append-only and cannot be altered or deleted by any process or person after being written. You are notified within 72 hours of any confirmed security incident affecting your data.",
  },

  // ── ENGAGEMENT AND INVESTMENT ────────────────────────────────
  {
    category: "Engagement and Investment",
    question: "How does an engagement work?",
    answer:
      "Three phases. Discovery and Diagnostic takes two to three weeks: we map your operations across all eight domains, quantify where value is leaking, and define exactly what a deployment involves. You own the resulting report regardless of what you decide next. Infrastructure Deployment takes 8 to 16 weeks: your operational core is built, all eight agents configured, the Governing Agent activated, dashboard live, SOPs documented, and your team trained. Managed Services is ongoing: we run and improve the system on your behalf, with quarterly strategic reviews. Phase 1 does not commit you to Phase 2.",
  },
  {
    category: "Engagement and Investment",
    question: "How is this priced?",
    answer:
      "By scope, not by revenue or per seat. Phase 1 Discovery and Diagnostic starts at $7,500 as a fixed investment, calibrated to the operational complexity of your business and confirmed before any work begins. Phase 2 is quoted individually from what the diagnostic finds, because the scope of what needs building is exactly what Phase 1 determines. Managed Services is a fixed monthly investment based on what is being operated.",
  },
  {
    category: "Engagement and Investment",
    question: "Why is this more expensive than the AI tools we have seen?",
    answer:
      "Because they are products and this is a service. A subscription in the hundreds buys software you operate yourself. This covers building your system, hosting it, monitoring it, governing it, improving it continuously, and being accountable when something goes wrong. The honest comparison is not software. It is what you already pay for outsourced bookkeeping, managed IT, agency retainers, and administrative capacity. Quanton OS displaces spend across several of those at once. Enterprise AI systems with comparable coordination start in the six figures annually and are built for companies with internal AI teams.",
  },
  {
    category: "Engagement and Investment",
    question: "Are there costs beyond the investment quoted?",
    answer:
      "Two categories, both identified before you sign. Some platforms charge for the API access required to connect to them, which we audit during Phase 1 and document with the annual cost. That is paid directly to those vendors. Optional add-on services, such as generative media, contact data, telephony, or tax automation, run on accounts you own and are billed to you directly. We configure and govern them and never mark up what you consume. AI model costs during ongoing operation are covered within your monthly investment.",
  },
  {
    category: "Engagement and Investment",
    question: "How do we measure whether this worked?",
    answer:
      "Baseline measurements are captured during Phase 1, before anything is built. Quarterly reviews compare current performance against that baseline. ROI is a documented comparison rather than a projection, which is why the baseline gets captured first.",
  },
  {
    category: "Engagement and Investment",
    question: "Who is Quanton OS built for?",
    answer:
      "Owner-led and operator-led businesses generating $1M to $20M annually with 5 to 50 employees, across professional services, home services, automotive, healthcare and wellness, manufacturing and distribution, and retail. The common thread is operational complexity that has outgrown how the business currently runs, where work falls between functions and the owner is the coordination layer. Your existing tooling does not qualify or disqualify you. Established platforms, a single accounting package, or nothing formal at all are all workable starting points.",
  },
  {
    category: "Engagement and Investment",
    question: "Is this a fit for a regulated industry?",
    answer:
      "Sometimes, and it requires a compliance review before scoping. Regulated data handling brings platform-level obligations that have to be resolved or explicitly excluded before an engagement begins. We will tell you directly if part of your operation cannot be covered responsibly. Emergency dispatch and any decision pathway requiring sub-second life-safety judgment are outside our scope entirely. Human approval architecture is incompatible with that kind of timeline, and we will not pretend otherwise.",
  },

  // ── GETTING STARTED ──────────────────────────────────────────
  {
    category: "Getting Started",
    question: "How do I get started?",
    answer:
      "Take the assessment on our site. It takes about five minutes and produces an immediate structural diagnostic of where your business stands today. If the results indicate a fit, the next step is a 30-minute Discovery call where we determine together whether Quanton OS is the right infrastructure for your business. If it is not, we will tell you that on the call.",
  },
];

export const faqCategories = [
  "The System",
  "Control and Governance",
  "Ownership and Commitment",
  "Engagement and Investment",
  "Getting Started",
];