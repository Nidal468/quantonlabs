import type { SolutionData } from "./types";

const data: SolutionData = {
  "slug": "healthcare-wellness",
  "name": "Healthcare and Wellness",
  "meta": {
    "title": "Healthcare and Wellness | Solutions | Quanton Labs",
    "description": "Quanton OS carries the operating and managing work of clinics and practices on one system of record the practice owns: cancellations filled from the waitlist, the next visit booked before the client leaves, and margin by service."
  },
  "hero": {
    "h1": "Every appointment, from booking to rebooking, on one system of record.",
    "lead": "The schedule, the provider, the reminder, the checkout, and the next visit have to agree for a practice to stay full. Quanton OS carries that work as a system, so leadership can lead.",
    "builtFor": "Clinics, med spas, chiropractic, therapy, and wellness studios",
    "photo": {
      "src": "/images/site/photo/healthcare.jpg",
      "alt": "An empty treatment room with a desk and chairs",
      "credit": "Photo: Unsplash"
    }
  },
  "gets": [
    [
      "Schedule",
      "Late cancellations filled from the waitlist"
    ],
    [
      "Rebooking",
      "The next visit set before the client leaves"
    ],
    [
      "Margin",
      "By service: provider time, supplies, and room against price"
    ],
    [
      "Company value",
      "Ready for a lender or buyer at any moment"
    ]
  ],
  "breaks": {
    "h2": "Four places a practice loses the slot, the client, or the provider's time.",
    "lead": "Each one starts at a handoff between the front desk, the treatment room, and the books.",
    "cards": [
      [
        "Schedule",
        "Revenue",
        "32%",
        "of medical groups report higher patient no-show rates in 2026 than in 2025.",
        "Empty slots nobody filled.",
        "MGMA Stat poll, August 2026"
      ],
      [
        "Visit",
        "Rebook",
        "37%",
        "of injectable patients' first rebooked medspa appointments cancel before they happen.",
        "Clients who rebook, then never come back.",
        "Zenoti Benchmark Report, 2026"
      ],
      [
        "Front desk",
        "Every department",
        "28%",
        "of medical groups report higher staff turnover this year, with the front desk among the most common churn points.",
        "Front desks that turn over faster than they are trained.",
        "MGMA Stat poll, May 2026"
      ],
      [
        "Administration",
        "Providers",
        "Over half",
        "of independent practice leaders rate administrative workload as very or extremely challenging.",
        "Providers pulled into administration.",
        "Veradigm, State of the Independent Practice, 2026"
      ]
    ]
  },
  "trace": {
    "h2": "A full schedule and a booked next visit, held true from the first call.",
    "lead": "One illustrative appointment block. Each step runs inside the approval level leadership set, and the figures leadership watches are current at every step.",
    "noun": "appointment block",
    "unit": "Thursday, 2 pm block",
    "what": "Main location · six providers, three rooms",
    "fields": [
      "Booked",
      "Open slots",
      "Block revenue",
      "Rebooked"
    ],
    "start": {
      "Booked": "94%",
      "Open slots": "0",
      "Block revenue": "$1,560 scheduled",
      "Rebooked": "Not set"
    },
    "idle": "Schedule published.",
    "steps": [
      {
        "dept": "Customer Experience",
        "act": "Bookings confirmed from an approved template",
        "gate": "sa"
      },
      {
        "dept": "Customer Experience",
        "act": "Reminders at set intervals",
        "gate": "sa"
      },
      {
        "dept": "Governing Agent",
        "act": "Late cancellations checked against the waitlist",
        "gate": "sa",
        "note": "Two late cancellations open the 2 pm block. Waitlist clients are matched to the slot, and offers go out from an approved template after the review window.",
        "set": {
          "Booked": "81%",
          "Open slots": "2",
          "Block revenue": "$1,040 scheduled, $520 at risk"
        }
      },
      {
        "dept": "Operations",
        "act": "Provider and room assigned to the waitlist clients",
        "gate": "fa",
        "set": {
          "Booked": "100%",
          "Open slots": "0, filled from waitlist",
          "Block revenue": "$1,560 scheduled"
        }
      },
      {
        "dept": "Finance",
        "act": "Checkout invoices prepared",
        "gate": "hb",
        "set": {
          "Block revenue": "$1,560 collected"
        }
      },
      {
        "dept": "Customer Experience",
        "act": "Rebooking prompt and follow-up",
        "gate": "sa",
        "set": {
          "Rebooked": "5 of 6 clients"
        }
      },
      {
        "dept": "People and Team",
        "act": "Provider license renewal tracked",
        "gate": "ga",
        "gateLabel": "Explicit approval"
      },
      {
        "dept": "Customer Experience",
        "act": "Review request after the visit",
        "gate": "sa"
      }
    ],
    "end": "Block filled after two late cancellations. Next visits booked before clients left."
  },
  "adds": {
    "h2": "Where a practice deployment carries the most weight.",
    "cards": [
      [
        "Scheduling and reminders",
        "Confirmations, reminders, and waitlist fills that keep the schedule full."
      ],
      [
        "Rebooking and memberships",
        "The next visit set before the client leaves."
      ],
      [
        "Licenses and credentials",
        "Every provider's renewals tracked to the date."
      ],
      [
        "Margin by service",
        "Provider time, supplies, and room measured against price."
      ]
    ]
  },
  "sources": [
    {
      "text": "MGMA Stat poll, August 11, 2026, 190 applicable responses.",
      "href": "https://www.mgma.com/stat-081126",
      "host": "mgma.com"
    },
    {
      "text": "Zenoti, 2026 Beauty and Wellness Benchmark Report, medspa edition, as published by Zenoti.",
      "href": "https://www.zenoti.com/thecheckin/injectable-patient-retention",
      "host": "zenoti.com"
    },
    {
      "text": "MGMA Stat poll, May 26, 2026, staff turnover, 303 applicable responses.",
      "href": "https://www.mgma.com/mgma-stat/stabilized-but-not-solved-staff-turnover-in-2026",
      "host": "mgma.com"
    },
    {
      "text": "Veradigm, The State of the Independent Practice in 2026, survey of 360 independent practice leaders, as reported by Becker's ASC Review.",
      "href": "https://www.beckersasc.com/asc-transactions-and-valuation-issues/the-hidden-cost-of-administrative-burden-for-independent-physicians/",
      "host": "beckersasc.com"
    }
  ]
};

export default data;
