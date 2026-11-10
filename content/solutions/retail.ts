import type { SolutionData } from "./types";

const data: SolutionData = {
  "slug": "retail",
  "name": "Retail",
  "meta": {
    "title": "Retail | Solutions | Quanton Labs",
    "description": "Quanton OS carries the operating and managing work of independent retailers on one system of record the company owns: the record and the shelf reconciled by count, margin by item, and reorders proposed from sell-through."
  },
  "hero": {
    "h1": "Every item, from purchase order to sale, on one system of record.",
    "lead": "The order, the shelf, the listing, the register, and the reorder have to agree for a store to sell what it stocks. Quanton OS carries that work as a system, so leadership can lead.",
    "builtFor": "Boutiques, specialty stores, and multi-location independent retailers",
    "photo": {
      "src": "/images/site/photo/retail.jpg",
      "alt": "Clothing on a rack in a store",
      "credit": "Unsplash License, https://unsplash.com/photos/blue-denim-jeans-on-brown-textile-gPrJi5R4RAk"
    }
  },
  "gets": [
    [
      "Inventory",
      "The record and the shelf reconciled by count"
    ],
    [
      "Margin",
      "By item: cost, markdowns, and sell-through against price"
    ],
    [
      "Reorders",
      "Proposed from sell-through, not from memory"
    ],
    [
      "Company value",
      "Ready for a lender or buyer at any moment"
    ]
  ],
  "breaks": {
    "h2": "Four places a store loses the sale, the margin, or the customer.",
    "lead": "Each one starts at a handoff between the stockroom, the floor, and the register.",
    "cards": [
      [
        "Stockroom",
        "Floor",
        "60%+",
        "of inventory records contain inaccuracies.",
        "Stock the system says is on the shelf, and isn't.",
        "ECR Retail Loss, 2026"
      ],
      [
        "Inventory",
        "Finance",
        "6.2%",
        "of retail sales lost to out-of-stocks and overstocks combined.",
        "Overstock on one shelf, stockouts on the next.",
        "IHL Group, Inventory Distortion Study, 2026"
      ],
      [
        "Purchasing",
        "Planning",
        "Over half",
        "of small retailers surveyed still rely on manual inventory counts.",
        "Counts done by hand, plans done by instinct.",
        "Global Payments, Retail Inventory Report, 2025"
      ],
      [
        "People",
        "Every department",
        "44%",
        "of retailers named rising staffing costs as their biggest pressure in 2026.",
        "A floor team stretched across the register, the stockroom, and the phone.",
        "Fluent Commerce, Retail Resilience study, 2026"
      ]
    ]
  },
  "trace": {
    "h2": "A shelf that matches the record, held true from purchase order to reorder.",
    "lead": "One illustrative item. Each step runs inside the approval level leadership set, and the figures leadership watches are current at every step.",
    "noun": "item",
    "unit": "SKU 40-1182",
    "what": "Linen shirt, navy · size M",
    "fields": [
      "On record",
      "On shelf",
      "Margin",
      "Reorder"
    ],
    "start": {
      "On record": "14",
      "On shelf": "Not counted",
      "Margin": "58.0% at full price",
      "Reorder": "Due"
    },
    "idle": "Cycle count scheduled.",
    "steps": [
      {
        "dept": "Inventory",
        "act": "Receipt matched to the order and the invoice",
        "gate": "fa"
      },
      {
        "dept": "Governing Agent",
        "act": "Record checked against the cycle count",
        "gate": "ga",
        "gateLabel": "Routed to President",
        "note": "The record shows 14 on hand; the count finds 3. The reorder is held and a transfer of 8 from the second store is proposed with the sell-through behind it. The President approves the transfer.",
        "set": {
          "On record": "3 after the count",
          "On shelf": "3 counted",
          "Reorder": "Held, transfer approved"
        }
      },
      {
        "dept": "Inventory",
        "act": "Transfer received from the second store",
        "gate": "sa",
        "set": {
          "On record": "11",
          "On shelf": "11"
        }
      },
      {
        "dept": "Marketing",
        "act": "Listing updated from the record, online and in store",
        "gate": "sa"
      },
      {
        "dept": "Customer Experience",
        "act": "Order confirmation and pickup notice",
        "gate": "sa"
      },
      {
        "dept": "Finance",
        "act": "Sale posted to the ledger with margin by item",
        "gate": "fa",
        "set": {
          "On record": "10",
          "On shelf": "10",
          "Margin": "55.2% after one markdown"
        }
      },
      {
        "dept": "Marketing",
        "act": "Re-engagement email from an approved template",
        "gate": "sa"
      },
      {
        "dept": "Inventory",
        "act": "Replenishment proposed from sell-through",
        "gate": "sa",
        "set": {
          "Reorder": "18 units proposed"
        }
      }
    ],
    "end": "Shelf matches the record. Margin by item known the day it sells."
  },
  "adds": {
    "h2": "Where a retail deployment carries the most weight.",
    "cards": [
      [
        "Inventory accuracy",
        "The record and the shelf reconciled by count."
      ],
      [
        "Purchasing and receiving",
        "Nothing paid until the order, the receipt, and the invoice agree."
      ],
      [
        "Margin by item",
        "Cost, markdowns, and sell-through measured against price."
      ],
      [
        "Customer lists",
        "Re-engagement from approved templates, measured by what sells."
      ]
    ]
  },
  "sources": [
    {
      "text": "ECR Retail Loss, inventory record inaccuracy reports, February 2026, as reported by Western Grocer.",
      "href": "https://westerngrocer.com/?p=16534",
      "host": "westerngrocer.com"
    },
    {
      "text": "IHL Group, 2026 Inventory Distortion Study.",
      "href": "https://www.ihlservices.com/product/inventory-distortion/",
      "host": "ihlservices.com"
    },
    {
      "text": "Global Payments, 2025 Retail Inventory Report, survey of 200 small retail businesses.",
      "href": "https://www.globalpayments.com/insights/improve-inventory-visibility",
      "host": "globalpayments.com"
    },
    {
      "text": "Fluent Commerce, Retail Resilience study, survey of 100 retail professionals at the Retail Technology Show 2026.",
      "href": "https://fluentcommerce.com/blog/retailers-optimistic-about-year-ahead-survey2026/",
      "host": "fluentcommerce.com"
    }
  ]
};

export default data;
