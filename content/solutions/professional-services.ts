import type { SolutionData } from "./types";

const data: SolutionData = {
  "slug": "professional-services",
  "name": "Professional Services",
  "meta": {
    "title": "Professional Services | Solutions | Quanton Labs",
    "description": "Quanton OS carries the operating and managing work of professional services firms on one system of record the firm owns: margin on every engagement, forward capacity, and work outside the signed scope priced before it is worked."
  },
  "hero": {
    "h1": "Every engagement, from proposal to collected invoice, on one system of record.",
    "lead": "The scope, the team, the hours, and the invoice have to agree for an engagement to earn what it should. Quanton OS carries that work as a system, so leadership can lead.",
    "builtFor": "Consulting, accounting, legal, agency, and design firms",
    "photo": {
      "src": "/images/site/photo/professional.jpg",
      "alt": "An open office with desks and computers",
      "credit": "Unsplash License, https://unsplash.com/photos/modern-office-space-with-desks-and-computers-DAjAgQBs9AY"
    }
  },
  "gets": [
    [
      "Margin",
      "On every engagement: hours and rates against what was sold"
    ],
    [
      "Capacity",
      "Who is free, who is booked, and for how long"
    ],
    [
      "Scope",
      "Work outside the signed scope priced before it is worked"
    ],
    [
      "Company value",
      "Ready for a lender or buyer at any moment"
    ]
  ],
  "breaks": {
    "h2": "Four places a firm loses the hour, the margin, or the next client.",
    "lead": "Each one starts at a handoff between the people who sell the work and the people who deliver it.",
    "cards": [
      [
        "Sales",
        "Delivery",
        "66.4%",
        "average billable utilization in 2025, the lowest in nearly two decades of benchmark data.",
        "Capacity sold before anyone checks who will deliver it.",
        "SPI Research, PS Maturity Benchmark, 2026"
      ],
      [
        "Delivery",
        "Administration",
        "38%",
        "of a lawyer's eight-hour day is captured as billable work.",
        "The billable day spent on administration.",
        "Clio, Legal Trends Report, 2025 data"
      ],
      [
        "Delivery",
        "Finance",
        "~4.5%",
        "average revenue leakage across professional services firms.",
        "Work done, written off, or never billed.",
        "SPI Research, PS Maturity Benchmark, 2026"
      ],
      [
        "People",
        "Every department",
        "73%",
        "of accounting firms surveyed are turning away potential clients for lack of staff.",
        "Growth capped by the people already at capacity.",
        "Advancetrack, Accounting Talent Index, 2026"
      ]
    ]
  },
  "trace": {
    "h2": "A signed scope and a collected invoice, held true from proposal to payment.",
    "lead": "One illustrative engagement. Each step runs inside the approval level leadership set, and the figures leadership watches are current at every step.",
    "noun": "engagement",
    "unit": "Engagement EN-2207",
    "what": "Operations advisory, phase 2",
    "fields": [
      "Value",
      "Margin",
      "Hours",
      "Cash"
    ],
    "start": {
      "Value": "Not priced",
      "Margin": "Not priced",
      "Hours": "Not staffed",
      "Cash": "Not invoiced"
    },
    "idle": "Inquiry received.",
    "steps": [
      {
        "dept": "Customer Experience",
        "act": "Inquiry captured; conflict check run before engagement",
        "gate": "ga",
        "gateLabel": "Routed for review"
      },
      {
        "dept": "Sales",
        "act": "Proposal and engagement letter priced from scope",
        "gate": "hb",
        "set": {
          "Value": "$96,000",
          "Margin": "36.0% planned"
        }
      },
      {
        "dept": "Operations",
        "act": "Team staffed against forward capacity",
        "gate": "fa",
        "set": {
          "Hours": "0 of 320 staffed"
        }
      },
      {
        "dept": "Governing Agent",
        "act": "Hours and budget tracked against the signed scope",
        "gate": "ga",
        "gateLabel": "Routed to President",
        "note": "A client request falls 40 hours outside the signed scope. The President gets the hours, the margin impact, and a change order drafted for approval, and approves it.",
        "set": {
          "Value": "$108,000 with change order",
          "Margin": "34.1% on hours to date",
          "Hours": "250 of 360"
        }
      },
      {
        "dept": "Customer Experience",
        "act": "Status updates to the client from approved templates",
        "gate": "sa"
      },
      {
        "dept": "Finance",
        "act": "Invoice from approved time and milestones",
        "gate": "hb",
        "set": {
          "Hours": "352 of 360",
          "Cash": "Invoiced $108,000"
        }
      },
      {
        "dept": "Finance",
        "act": "Collection reminders at set aging points",
        "gate": "sa",
        "set": {
          "Margin": "34.6% on final hours",
          "Cash": "Collected $108,000"
        }
      }
    ],
    "end": "Scope held. Every hour outside it was priced before it was worked."
  },
  "adds": {
    "h2": "Where a professional services deployment carries the most weight.",
    "cards": [
      [
        "Margin on every engagement",
        "Hours, rates, and scope measured against what was sold."
      ],
      [
        "Forward capacity",
        "Who is free, who is booked, and for how long, before the next proposal goes out."
      ],
      [
        "Credentials and training",
        "Licenses and continuing education tracked to the date."
      ],
      [
        "Knowledge that stays",
        "Every engagement, document, and decision on the record when people leave."
      ]
    ]
  },
  "sources": [
    {
      "text": "SPI Research, 2026 Professional Services Maturity Benchmark, survey of 509 firms, as reported by Deltek.",
      "href": "https://www.deltek.com/resources/articles/professional-services-billable-utilization-historic-low/",
      "host": "deltek.com"
    },
    {
      "text": "Clio, Legal Trends Report benchmarks, 2025 law firm utilization.",
      "href": "https://clio.com/resources/legal-trends/benchmarks/",
      "host": "clio.com"
    },
    {
      "text": "SPI Research, 2026 Professional Services Maturity Benchmark, revenue leakage KPI, as reported by Deltek.",
      "href": "https://www.deltek.com/en/resources/articles/5-kpis-from-the-spi-professional-services-maturity-benchmark-report-every-pso-must-track-for-sustainable-growth",
      "host": "deltek.com"
    },
    {
      "text": "Advancetrack, 2026 Accounting Talent Index, survey of 500 accounting leaders, as reported by Consultancy.uk.",
      "href": "https://www.consultancy.uk/news/44502/three-in-four-accounting-firms-struggle-to-take-on-new-work-amid-hiring-challenges",
      "host": "consultancy.uk"
    }
  ]
};

export default data;
