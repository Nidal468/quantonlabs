import type { SolutionData } from "./types";

const data: SolutionData = {
  "slug": "home-services",
  "name": "Home Services",
  "meta": {
    "title": "Home Services | Solutions | Quanton Labs",
    "description": "Quanton OS carries the operating and managing work of home service companies on one system of record the company owns: margin on every call, windows promised against technician skills and truck stock, and every inquiry captured."
  },
  "hero": {
    "h1": "Every service call, from first ring to paid invoice, on one system of record.",
    "lead": "The call, the schedule, the technician, the part, and the invoice have to agree for a promise to hold. Quanton OS carries that work as a system, so leadership can lead.",
    "builtFor": "HVAC, plumbing, electrical, roofing, and residential service trades",
    "photo": {
      "src": "/images/site/photo/home-services.jpg",
      "alt": "Mechanic's hand tools laid out on a bench",
      "credit": "Photo: Unsplash"
    }
  },
  "gets": [
    [
      "Margin",
      "On every call: labor, drive time, and parts against price"
    ],
    [
      "Windows",
      "Promised against technician skills and truck stock"
    ],
    [
      "Leads",
      "Every inquiry captured, booked, and confirmed"
    ],
    [
      "Company value",
      "Ready for a lender or buyer at any moment"
    ]
  ],
  "breaks": {
    "h2": "Four places a home service company loses the customer, the day, or the margin.",
    "lead": "Each one starts at a handoff between the phone, the office, and the truck.",
    "cards": [
      [
        "Customer",
        "Office",
        "50%",
        "of contractors respond to new leads within the first hour.",
        "Calls and leads answered after the customer has moved on.",
        "ServiceTitan, Residential Survey, 2026"
      ],
      [
        "Sales",
        "Customer",
        "42%",
        "of locations at large home services brands handled new leads ineffectively across phone, chat, web form, and follow-up.",
        "Estimates that go quiet after they are sent.",
        "Pied Piper, Lead Handling Study, 2026"
      ],
      [
        "Office",
        "Truck",
        "Nearly half",
        "of technicians cite office miscommunication and last-minute schedule changes as their biggest obstacles.",
        "Schedules that change after the technician has left.",
        "ServiceTrade, Technician Insights, 2026"
      ],
      [
        "Operations",
        "Finance",
        "60%",
        "of residential contractors cite labor and overhead as their biggest business risk.",
        "Jobs priced without the true cost of the truck and the technician.",
        "ServiceTitan, State of the Trades, 2026"
      ]
    ]
  },
  "trace": {
    "h2": "A promised window and a paid invoice, held true from the first call.",
    "lead": "One illustrative service call. Each step runs inside the approval level leadership set, and the figures leadership watches are current at every step.",
    "noun": "service call",
    "unit": "Service call SC-4402",
    "what": "No cooling, upstairs system",
    "fields": [
      "Value",
      "Margin",
      "Window",
      "Cash"
    ],
    "start": {
      "Value": "Not priced",
      "Margin": "Not priced",
      "Window": "2 to 4 pm promised",
      "Cash": "Not invoiced"
    },
    "idle": "After-hours call received.",
    "steps": [
      {
        "dept": "Customer Experience",
        "act": "Inquiry captured, booked, and confirmed",
        "gate": "sa"
      },
      {
        "dept": "Governing Agent",
        "act": "Window checked against technician skills and stock",
        "gate": "ga",
        "gateLabel": "Routed to dispatch",
        "note": "The assigned truck does not carry the likely part. Two options laid out: reassign to a stocked technician or reserve the part for pickup on the way. Dispatch reserves the part.",
        "set": {
          "Window": "2 to 4 pm held"
        }
      },
      {
        "dept": "Operations",
        "act": "Call lands on the technician's daily task list",
        "gate": "fa"
      },
      {
        "dept": "Sales",
        "act": "Repair and replacement options priced",
        "gate": "hb",
        "set": {
          "Value": "$640 repair approved",
          "Margin": "41.5% quoted"
        }
      },
      {
        "dept": "Inventory",
        "act": "Truck stock replenished, under threshold",
        "gate": "sa"
      },
      {
        "dept": "Finance",
        "act": "Invoice on completion; reminders at set aging points",
        "gate": "hb",
        "set": {
          "Margin": "39.8% on actual labor and drive time",
          "Cash": "Collected $640"
        }
      },
      {
        "dept": "Customer Experience",
        "act": "Review request after the job closes",
        "gate": "sa"
      }
    ],
    "end": "Window held. Margin known the day the call closes, not at month end."
  },
  "adds": {
    "h2": "Where a home service deployment carries the most weight.",
    "cards": [
      [
        "Intake and scheduling",
        "Every inquiry captured, booked, and confirmed, after hours included."
      ],
      [
        "Dispatch",
        "Daily task lists built from the schedule, with the parts on the truck."
      ],
      [
        "Local presence",
        "Listings, reviews, and reputation kept current."
      ],
      [
        "Margin on every job",
        "Labor, drive time, and parts measured against price on every call."
      ]
    ]
  },
  "sources": [
    {
      "text": "ServiceTitan, 2026 Residential Survey, lead response finding, as cited by ServiceTitan.",
      "href": "https://www.servicetitan.com/blog/speed-to-lead-ai-virtual-agent",
      "host": "servicetitan.com"
    },
    {
      "text": "Pied Piper Management Co., 2026 Lead Handling Effectiveness Home Services Study, 3,211 mystery-shop evaluations of 31 large brands, as reported by Green Industry Pros.",
      "href": "https://www.greenindustrypros.com/business-management/marketing/press-release/22965698/pied-piper-management-co-llc-home-services-lead-failure-rate-hits-42-in-2026",
      "host": "greenindustrypros.com"
    },
    {
      "text": "ServiceTrade, Technician Insights Report, 2026, survey of 823 service technicians, as reported by SMACNA.",
      "href": "https://www.smacna.org/news/products-and-services-updates/article/2026/03/18/800--technicians-on-what-slows-them-down",
      "host": "smacna.org"
    },
    {
      "text": "ServiceTitan, 2026 Residential State of the Trades Report, survey of 1,000 residential contractors, as reported by Contracting Business.",
      "href": "https://www.contractingbusiness.com/industry-news/news/55370715/servicetitan-report-rising-labor-costs-push-contractors-toward-efficiency-and-automation",
      "host": "contractingbusiness.com"
    }
  ]
};

export default data;
