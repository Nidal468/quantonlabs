import type { SolutionData } from "./types";

const data: SolutionData = {
  "slug": "automotive",
  "name": "Automotive",
  "meta": {
    "title": "Automotive | Solutions | Quanton Labs",
    "description": "Quanton OS carries the operating and managing work of automotive shops on one system of record the company owns: margin on every repair order, bookings set against bays and parts, and added work approved before it is done."
  },
  "hero": {
    "h1": "Every repair order, from first call to paid invoice, on one system of record.",
    "lead": "The booking, the bay, the technician, the parts, and the approval have to agree for a car to leave when promised. Quanton OS carries that work as a system, so leadership can lead.",
    "builtFor": "Independent repair, collision, and specialty automotive shops",
    "photo": {
      "src": "/images/site/photo/shop-hands.jpg",
      "alt": "Hands working on a car engine with a metal wrench",
      "credit": "Photo: Unsplash"
    }
  },
  "gets": [
    [
      "Margin",
      "On every repair order: labor, parts, and comebacks against price"
    ],
    [
      "Bays",
      "Bookings set against bays, technicians, and parts"
    ],
    [
      "Approvals",
      "Added work approved before it is done"
    ],
    [
      "Company value",
      "Ready for a lender or buyer at any moment"
    ]
  ],
  "breaks": {
    "h2": "Four places a shop loses the car, the bay, or the margin.",
    "lead": "Each one starts at a handoff between the counter, the bay, and the parts shelf.",
    "cards": [
      [
        "Customer",
        "Counter",
        "20%+",
        "missed or failed call rates across large multi-location auto service operators.",
        "Calls missed while the advisor is at the counter.",
        "Marchex call analysis, 2026"
      ],
      [
        "Bay",
        "Customer",
        "26%",
        "of mass-market service customers get photo or video with their inspection results. 64% want it.",
        "Approved work waiting on a phone call while the bay sits.",
        "J.D. Power, Customer Service Index, 2026"
      ],
      [
        "People",
        "Bays",
        "59%",
        "of annual automotive technician demand covered by new supply.",
        "Bays scheduled without the technicians to fill them.",
        "TechForce Foundation, 2026"
      ],
      [
        "Operations",
        "Finance",
        "19%",
        "of shops surveyed report a net profit margin of 20% or more.",
        "Margin by repair order nobody sees until month-end.",
        "Ratchet+Wrench Industry Survey, 2026"
      ]
    ]
  },
  "trace": {
    "h2": "A promised pickup time, held true from the first call.",
    "lead": "One illustrative repair order. Each step runs inside the approval level leadership set, and the figures leadership watches are current at every step.",
    "noun": "repair order",
    "unit": "Repair order RO-31842",
    "what": "2022 SUV · 60,000-mile service and brake inspection",
    "fields": [
      "Value",
      "Margin",
      "Promised",
      "Cash"
    ],
    "start": {
      "Value": "$620 booked",
      "Margin": "Not priced",
      "Promised": "4:30 pm today",
      "Cash": "Not invoiced"
    },
    "idle": "Booking request received.",
    "steps": [
      {
        "dept": "Customer Experience",
        "act": "Appointment booked and confirmed",
        "gate": "sa"
      },
      {
        "dept": "Operations",
        "act": "Check-in; bay and technician assigned",
        "gate": "fa",
        "set": {
          "Margin": "52.0% on the service"
        }
      },
      {
        "dept": "Field team",
        "act": "Inspection with photos on the mobile app",
        "gate": "ga",
        "gateLabel": "Logged by the technician"
      },
      {
        "dept": "Sales",
        "act": "Estimate for added work, priced from current rates",
        "gate": "hb",
        "set": {
          "Value": "$1,840 with brakes approved"
        }
      },
      {
        "dept": "Governing Agent",
        "act": "Promised time checked against parts and bays",
        "gate": "ga",
        "gateLabel": "Routed for decision",
        "note": "The pads and rotors arrive tomorrow at 9 am. Two options laid out: finish the service today and rebook the brakes, or keep the car overnight and move the pickup. The customer agrees to the overnight.",
        "set": {
          "Promised": "Tomorrow 11 am, agreed"
        }
      },
      {
        "dept": "Inventory",
        "act": "Parts ordered against agreed terms, under threshold",
        "gate": "sa",
        "set": {
          "Margin": "47.6% on parts and labor"
        }
      },
      {
        "dept": "Finance",
        "act": "Invoice at pickup",
        "gate": "hb",
        "set": {
          "Cash": "Collected $1,840"
        }
      },
      {
        "dept": "Customer Experience",
        "act": "Review request after pickup",
        "gate": "sa"
      }
    ],
    "end": "Pickup moved once, with the customer's agreement. Margin known when the car leaves."
  },
  "adds": {
    "h2": "Where an automotive deployment carries the most weight.",
    "cards": [
      [
        "Bay scheduling",
        "Bookings set against bays and technicians, so promised times hold."
      ],
      [
        "Parts on the record",
        "Ordered, received, and matched to the repair order."
      ],
      [
        "Approvals",
        "Estimates and added work approved before the work is done."
      ],
      [
        "Margin per repair order",
        "Labor, parts, and comebacks measured against price."
      ]
    ]
  },
  "sources": [
    {
      "text": "Marchex, analysis of calls to large multi-location automotive service operators, May 2026.",
      "href": "https://www.marchex.com/up-to-21-percent-of-automotive-service-customer-calls-go-unanswered-creating-significant-revenue-leakage/",
      "host": "marchex.com"
    },
    {
      "text": "J.D. Power, 2026 U.S. Customer Service Index (CSI) Study, fielded January through December 2025.",
      "href": "https://www.jdpower.com/business/press-releases/2026-us-customer-service-index-csi-study",
      "host": "jdpower.com"
    },
    {
      "text": "TechForce Foundation, Technician Supply, Demand and Opportunity Report, 2026, as reported by Tire Review.",
      "href": "https://www.tirereview.com/automotive-technician-shortage-tire-dealers/",
      "host": "tirereview.com"
    },
    {
      "text": "Ratchet+Wrench, 2026 Industry Survey Report, survey of more than 430 shop owners and managers.",
      "href": "https://img.ratchetandwrench.com/files/base/ebm/ratchetandwrench/document/2026/06/6a4277e469691969c387beca-2026_rwindustry_survey_fnl.pdf",
      "host": "ratchetandwrench.com"
    }
  ],
  "proof": {
    "eyebrow": "Built by an operator",
    "h2": "Quanton OS answers problems first solved by hand in an automotive facility.",
    "lead": "An automotive facility built from zero, with pricing, scheduling, quality, and hiring running through the owner until a system carried them.",
    "figures": [
      [
        "$1.9M",
        "Revenue, built from zero"
      ],
      [
        "8",
        "Staff at the high point"
      ]
    ],
    "note": "The founder's own business, before Quanton OS. Figures are its operating history, not a deployment result."
  }
};

export default data;
