export type CaseStudy = {
  id: number;
  title: string;
  subtitle: string;
  before: {
    heading: string;
    growthDriver: string;
    aiUse: string;
    operatingReality: string;
    failurePattern: string;
    outcomes: string[];
  };
  after: {
    operatingArchitecture: string;
    standardization: string[];
    governance: string[];
    result: string;
    kpis: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    id: 0,
    title: "Precision Manufacturer",
    subtitle: "Manufacturing",
    before: {
      heading: "No Prior ERP, Manual Coordination at Scale",
      growthDriver: "A precision manufacturer scaling order volume with no system connecting sales, inventory, and fulfillment.",
      aiUse: "None. Pricing, inventory allocation, and reporting ran entirely on manual spreadsheet tracking.",
      operatingReality: "Roughly $1.45M in annual controllable losses, driven primarily by 23-plus weeks of excess inventory sitting against uneven SKU-level demand.",
      failurePattern: "Growth outpacing infrastructure, with no system giving leadership real-time visibility into inventory position or true product-level cost.",
      outcomes: [
        "$1.45M in annual controllable losses identified and quantified before build began",
        "776-SKU data architecture built to give a single source of truth on inventory",
        "Shipping action plan closed the gap between what was ordered and what actually moved",
      ],
    },
    after: {
      operatingArchitecture: "Full Quanton OS deployment across all eight functional domains, built natively with no prior ERP to integrate against.",
      standardization: [
        "SKU-tiered pricing engine replacing manual, inconsistent quoting",
        "Inventory and allocation logic tied directly to real demand signals",
        "16-report finance stack replacing month-end manual reporting",
      ],
      governance: [
        "Leadership dashboard feeding real-time visibility across all eight domains",
        "Governing Agent synthesizing cross-domain exceptions instead of leadership discovering them after the fact",
      ],
      result: "The business moved from month-end discovery of inventory and margin problems to real-time visibility, with pricing and allocation now running on a governed system instead of manual judgment calls.",
      kpis: [
        "Inventory turns by SKU tier",
        "Controllable loss trend, month over month",
        "Order-to-ship cycle time",
        "Gross margin by product line",
        "Stockout frequency",
        "Finance report generation time",
      ],
    },
  },
  {
    id: 1,
    title: "Executive Coaching Platform",
    subtitle: "Professional Services",
    before: {
      heading: "Lead Volume Outpacing Manual Follow-Up",
      growthDriver: "A high-touch coaching business generating strong inbound interest with no system to convert volume into booked calls at speed.",
      aiUse: "Basic scheduling links and manual outreach, with no qualification or follow-up sequencing.",
      operatingReality: "Leads sitting unscheduled while the owner manually worked through inquiries between client sessions, with no visibility into pipeline until checked manually.",
      failurePattern: "Revenue-generating leads going cold during the gap between inquiry and follow-up, with no system-level accountability for response time.",
      outcomes: [
        "20 lead calls booked by the Sales Agent in a single 24-hour period",
        "Those calls converted to $60K in sales",
        "Real-time dashboard replaced end-of-month reporting entirely",
      ],
    },
    after: {
      operatingArchitecture: "Sales Agent and Customer Experience Agent deployed to handle lead response, booking, and pipeline visibility.",
      standardization: [
        "Automated lead response and qualification on inbound inquiry",
        "Booking sequences that close the gap between interest and scheduled call",
      ],
      governance: [
        "Live dashboard giving real-time visibility into pipeline and bookings",
        "No dependency on manual, end-of-month reporting to see business status",
      ],
      result: "The business now sees pipeline and bookings as they happen instead of reconstructing them after the fact, with lead response no longer bottlenecked by the owner's calendar.",
      kpis: [
        "Lead-to-booked-call conversion rate",
        "Time from inquiry to scheduled call",
        "Bookings per week",
        "Revenue per booked call",
      ],
    },
  },
  {
    id: 2,
    title: "Charter and Hospitality Business",
    subtitle: "Retail and Hospitality",
    before: {
      heading: "No Website, No System, No Digital Presence",
      growthDriver: "A charter business built on referral and reputation with no digital infrastructure supporting lead capture or ongoing marketing.",
      aiUse: "None. No website, no CRM, no structured social media presence prior to engagement.",
      operatingReality: "Every inquiry handled manually with no record of lead source, no follow-up system, and no consistent social or search presence to generate new demand.",
      failurePattern: "A business with real capacity systematically undersupplied with inbound demand it could have captured through a basic digital presence.",
      outcomes: [
        "Full website built and launched from nothing",
        "CRM-connected lead capture replacing manual inquiry handling",
        "Ongoing social media and Google Business management now running as a managed system",
      ],
    },
    after: {
      operatingArchitecture: "Agents build and maintain the website, handle lead capture and CRM follow-up, and run social media and Google Business profile management on an ongoing basis.",
      standardization: [
        "Lead capture tied directly into CRM on every inbound inquiry",
        "Consistent social media and Google Business posting cadence",
      ],
      governance: [
        "Live dashboard giving visibility into lead flow and engagement",
        "No manual tracking required to know what's working",
      ],
      result: "A business that had no digital presence now runs lead capture, follow-up, and ongoing marketing as a governed system instead of ad hoc manual effort.",
      kpis: [
        "Website leads per month",
        "Social engagement growth",
        "Google Business profile views and actions",
        "Lead-to-inquiry response time",
      ],
    },
  },
  {
    id: 3,
    title: "Property Management Operation",
    subtitle: "Real Estate and Property Management",
    before: {
      heading: "Portfolio Coordination Running on Manual Tracking",
      growthDriver: "A property management operation spanning both short and long-term rental units with vendor, CRM, and advertising coordination handled manually across the portfolio.",
      aiUse: "None. Vendor scheduling, lead tracking, and advertising were managed independently with no shared system.",
      operatingReality: "Occupancy, vendor activity, and lead flow only visible through manual end-of-month reconciliation, with no real-time status across the portfolio.",
      failurePattern: "Portfolio complexity outpacing the manual systems tracking it, with occupancy and vendor issues surfacing only after the fact.",
      outcomes: [
        "Vendor management, CRM, and advertising now coordinated across the full rental portfolio",
        "Manual end-of-month reporting replaced with a live dashboard",
        "Real-time status on occupancy, vendor activity, and lead flow",
      ],
    },
    after: {
      operatingArchitecture: "Agents coordinate vendor management, CRM, and advertising across the rental portfolio under one governed system.",
      standardization: [
        "Vendor scheduling and follow-up handled consistently across all units",
        "Advertising coordinated centrally instead of per-property",
      ],
      governance: [
        "Live dashboard replacing manual end-of-month reporting",
        "Real-time occupancy and vendor activity visibility",
      ],
      result: "Portfolio-wide coordination now runs through a single governed system, with occupancy, vendor, and lead status visible in real time instead of reconstructed monthly.",
      kpis: [
        "Occupancy rate by property",
        "Vendor response and completion time",
        "Lead flow by advertising channel",
        "Portfolio-wide revenue per unit",
      ],
    },
  },
  {
    id: 4,
    title: "Independent Real Estate Practice",
    subtitle: "Real Estate",
    before: {
      heading: "Outbound Lead Sourcing With No CRM Sync",
      growthDriver: "An individual real estate agent generating leads through multiple channels with no unified system connecting sourcing to follow-up to compliance tracking.",
      aiUse: "None currently in place. Outreach and lead sourcing handled manually prior to this build.",
      operatingReality: "Leads sourced across channels with no enrichment, no compliance scrubbing, and no CRM sync, requiring manual entry and follow-up tracking for every contact.",
      failurePattern: "Lead volume exceeding what manual follow-up and compliance checking could sustain without dropped contacts or missed requirements.",
      outcomes: [
        "Sales Agent scoped to handle outbound lead sourcing, enrichment, compliance scrubbing, and CRM sync",
        "Customer Experience Agent scoped to handle follow-up sequencing and appointment booking",
        "Leadership dashboard already live for real-time pipeline visibility ahead of full deployment",
      ],
    },
    after: {
      operatingArchitecture: "Sales Agent and Customer Experience Agent stack, with leadership dashboard live during the build process.",
      standardization: [
        "Outbound lead sourcing with automatic contact enrichment",
        "Compliance scrubbing built into the intake workflow, not a separate manual step",
      ],
      governance: [
        "CRM sync eliminating manual entry across channels",
        "Real-time pipeline visibility live before the full build is complete",
      ],
      result: "A build in active development, with the leadership dashboard already delivering pipeline visibility ahead of the full agent stack going live.",
      kpis: [
        "Leads sourced per week by channel",
        "Compliance flag rate",
        "CRM sync accuracy",
        "Appointment booking rate",
      ],
    },
  },
  {
    id: 5,
    title: "Bespoke Automotive Restoration Shop",
    subtitle: "Automotive",
    before: {
      heading: "Nine Disconnected Systems Running One Shop",
      growthDriver: "A premium automotive services business run entirely on the founder's direct involvement, with every operational function living in a different tool.",
      aiUse: "None. A scheduling app for bookings, payments, and client tracking. Google Drive for documents and photos. Five separate social platforms posted through Later, Canva, and Meta Business Suite. QuickBooks Online plus a bookkeeper and CPA for finance. Inventory tracked loosely inside the scheduling app.",
      operatingReality: "Nine or more disconnected systems, each requiring separate manual attention, with no shared state between any of them. Posting tools broke often enough that posts were missed outright. Inventory in the scheduling app went stale because staff rarely updated it, leading to last-minute part orders at higher shipping cost and higher per-unit price. Client texts and emails outside business hours went unnoticed until the next day. Training had no system behind it, staff either figured it out on their own or the shop closed for a day, or overtime got paid for a dedicated training session.",
      failurePattern: "Founder dependency compounding across every function at once: scheduling, inventory, social media, client communication, and staff training all required direct personal attention because no system connected them or ran independently.",
      outcomes: [
        "Missed social posts from tool failures with no fallback or alert",
        "Higher part costs from reactive, last-minute ordering instead of planned reorder points",
        "Client messages outside business hours sitting unanswered until the next day",
        "Staff training with no consistent system, costing either a closed shop day or paid overtime",
      ],
    },
    after: {
      operatingArchitecture: "This is the exact pattern that led to Quanton OS. Every one of these fragmented tools, scheduling, inventory, social, client communication, training, maps directly to a functional agent in the platform today.",
      standardization: [
        "Scheduling, payments, and client tracking unified with inventory instead of loosely connected",
        "Reorder points tied to real usage instead of staff remembering to check stock",
        "A single governed workflow for onboarding and complaint handling instead of ad hoc handling per incident",
      ],
      governance: [
        "After-hours client messages routed and triaged instead of sitting unread until the next business day",
        "Social posting running on a governed schedule instead of three separate manual tools that could silently fail",
        "Training tracked as a system with defined completion criteria, instead of informal on-the-job figuring-out",
      ],
      result: "The architecture built to solve this exact pattern is what now runs across Quanton Labs' current deployments.",
      kpis: [
        "Missed social posts per month",
        "Emergency part orders per month",
        "After-hours response time",
        "Staff training completion rate",
      ],
    },
  },
];