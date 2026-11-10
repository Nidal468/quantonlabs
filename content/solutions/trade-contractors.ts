import type { SolutionData } from "./types";

const data: SolutionData = {
  "slug": "trade-contractors",
  "name": "Trade Contractors",
  "meta": {
    "title": "Trade Contractors | Solutions | Quanton Labs",
    "description": "Quanton OS carries the operating and managing work of trade contractors on one system of record the company owns: margin on every job by phase, crews assigned only when compliant, and pay applications from accepted work."
  },
  "hero": {
    "h1": "Every job, from estimate to final payment, on one system of record.",
    "lead": "The bid, the crews, the punch list, and the pay application have to agree for a job to get paid. Quanton OS carries that work as a system, so leadership can lead.",
    "builtFor": "Specialty and trade contractors working for general contractors",
    "photo": {
      "src": "/images/site/photo/crew.jpg",
      "alt": "Construction workers in hard hats and reflective vests working with shovels on a site",
      "credit": "Unsplash License, https://unsplash.com/photos/construction-workers-with-shovels-on-site-Un-6cY9lYpA"
    }
  },
  "gets": [
    [
      "Margin",
      "On every job by phase, from field check-in and photos"
    ],
    [
      "Crews",
      "Assigned only when insurance and licenses are current"
    ],
    [
      "Billing",
      "Pay applications from accepted work, retainage tracked"
    ],
    [
      "Company value",
      "Ready for a lender or buyer at any moment"
    ]
  ],
  "breaks": {
    "h2": "Four places a trade contractor loses the schedule, the crew's day, or the cash.",
    "lead": "Each one starts at a handoff between the office and the work.",
    "cards": [
      [
        "Sales",
        "Operations",
        "349,000",
        "net new construction workers needed in 2026, over half to replace retirees.",
        "Bids committed against crews no one has counted.",
        "ABC workforce analysis, 2026"
      ],
      [
        "Office",
        "Field",
        "Nearly half",
        "of technicians cite office miscommunication and last-minute schedule changes as their biggest obstacles.",
        "Schedules that change after the crew has left the yard.",
        "ServiceTrade, Technician Insights, 2026"
      ],
      [
        "Operations",
        "Finance",
        "92%",
        "of subcontractors floated payroll while waiting to be paid.",
        "Work finished in the field, still unbilled in the office.",
        "Siteline, Subcontractor Billing, 2026"
      ],
      [
        "Contracts",
        "Every department",
        "56%",
        "of construction finance and operations professionals surveyed missed a critical lien deadline in the past two years.",
        "Deadlines that live in one person's head.",
        "Siteline, Subcontractor Billing, 2026"
      ]
    ]
  },
  "trace": {
    "h2": "A start date and a final payment, held true across the office and the field.",
    "lead": "One illustrative job. Each step runs inside the approval level leadership set, and the figures leadership watches are current at every step.",
    "noun": "job",
    "unit": "Job JB-1187",
    "what": "Multifamily, Building B, floors 2 to 4",
    "fields": [
      "Contract",
      "Margin",
      "Start",
      "Cash"
    ],
    "start": {
      "Contract": "Not priced",
      "Margin": "Not priced",
      "Start": "Monday requested",
      "Cash": "Nothing billed"
    },
    "idle": "Invitation to bid received.",
    "steps": [
      {
        "dept": "Sales",
        "act": "Estimate from takeoff quantities by phase",
        "gate": "hb",
        "set": {
          "Contract": "$182,000",
          "Margin": "24.8% estimated"
        }
      },
      {
        "dept": "Governing Agent",
        "act": "Start date checked against crews and compliance",
        "gate": "ga",
        "gateLabel": "Assignment held",
        "note": "One crew's certificate of insurance lapses before the start date. The assignment is held and an eligible crew is proposed to the President, who approves it.",
        "set": {
          "Start": "Monday held, crew replaced"
        }
      },
      {
        "dept": "Operations",
        "act": "Eligible crew assigned by text",
        "gate": "sa"
      },
      {
        "dept": "Subcontractor crew",
        "act": "Start and completion through the job link",
        "gate": "ga",
        "gateLabel": "Held for review"
      },
      {
        "dept": "Field team",
        "act": "Touch-ups and walkthrough on the mobile app",
        "gate": "ga",
        "gateLabel": "Logged by the crew",
        "set": {
          "Margin": "23.9% on posted labor and material"
        }
      },
      {
        "dept": "Customer Experience",
        "act": "Phase status to the general contractor",
        "gate": "sa"
      },
      {
        "dept": "Finance",
        "act": "Pay application from accepted areas, retainage tracked",
        "gate": "hb",
        "set": {
          "Cash": "Billed $182,000, $18,200 retainage"
        }
      },
      {
        "dept": "Finance",
        "act": "Subcontractor paid after accepted completion",
        "gate": "hb",
        "set": {
          "Cash": "Collected $163,800, retainage tracked"
        }
      }
    ],
    "end": "Start date held. Retainage tracked to the dollar until it is paid."
  },
  "adds": {
    "h2": "What a contractor deployment adds.",
    "cards": [
      [
        "Bid management",
        "Every bid tracked from invitation to submission, priced from takeoff."
      ],
      [
        "Material planning",
        "Deliveries staged to the phase that needs them."
      ],
      [
        "Pay applications",
        "Billed from accepted work, retainage tracked to the dollar."
      ],
      [
        "Commitments on the record",
        "Insurance, licenses, liens, and warranty dates, never missed."
      ]
    ]
  },
  "sources": [
    {
      "text": "Associated Builders and Contractors, construction workforce shortage analysis, January 2026, as reported by ENR.",
      "href": "https://www.enr.com/articles/62348-constructions-labor-relief-masks-structural-risk-as-demand-cools",
      "host": "enr.com"
    },
    {
      "text": "ServiceTrade, Technician Insights Report, 2026, survey of 823 service technicians, as reported by SMACNA.",
      "href": "https://www.smacna.org/news/products-and-services-updates/article/2026/03/18/800--technicians-on-what-slows-them-down",
      "host": "smacna.org"
    },
    {
      "text": "Siteline, The State of Subcontractor Billing in 2026, survey of 492 construction finance and operations professionals, as reported by Contractor.",
      "href": "https://www.contractormag.com/management/news/55403190/subcontractors-are-still-financing-their-own-jobs-2026-survey-finds",
      "host": "contractormag.com"
    },
    {
      "text": "Siteline, The State of Subcontractor Billing in 2026, lien deadline finding, as posted to the CFMA community.",
      "href": "https://cafe.cfma.org/discussion/new-report-quantifying-how-subcontractors-get-paid-1",
      "host": "cfma.org"
    }
  ],
  "proof": {
    "eyebrow": "From a current deployment",
    "h2": "A contractor running more crews than it has accounts.",
    "lead": "Residential and multifamily work for general contractors, with a larger force of subcontractor crews than staff.",
    "figures": [
      [
        "18 to 20",
        "Employees in the field and the office"
      ],
      [
        "13 to 16",
        "Subcontractor crews, coordinated by text"
      ],
      [
        "0",
        "Accounts or apps required of any crew"
      ]
    ],
    "itemsHead": "What the deployment puts in place",
    "items": [
      [
        "Assignment, start-day, and completion texts",
        "scoped to the punch list"
      ],
      [
        "Insurance and license checks",
        "that hold an assignment"
      ],
      [
        "Pay applications",
        "from areas accepted at walkthrough"
      ],
      [
        "Job cost by phase",
        "from field check-in and photos"
      ]
    ],
    "note": "Client identity withheld. Deployment in progress. Items describe the system being deployed, not measured results."
  }
};

export default data;
