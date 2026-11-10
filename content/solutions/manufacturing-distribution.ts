import type { SolutionData } from "./types";

const data: SolutionData = {
  slug: "manufacturing-distribution",
  name: "Manufacturing and Distribution",
  meta: {
    title: "Manufacturing and Distribution | Solutions | Quanton Labs",
    description:
      "Quanton OS carries the operating and managing work of manufacturers and distributors on one system of record the company owns: margin on every order, ship dates promised against real capacity, and shortages surfaced when the order is accepted.",
  },
  hero: {
    h1: "Every order, from quote to remittance, on one system of record.",
    lead: "The quote, the material, the schedule, the dock, and the invoice have to agree for a ship date to hold. Quanton OS carries that work as a system, so leadership can lead.",
    builtFor: "Light manufacturing, contract production, wholesale distribution",
    photo: { src: "/images/site/photo/machining.jpg", alt: "A metal rod held in a lathe chuck being machined by a cutting tool", credit: "Photo: Unsplash" },
  },
  gets: [
    ["Margin", "On every order, kept current as cost posts"],
    ["Ship dates", "Promised against real capacity and stock"],
    ["Shortages", "Surfaced when the order is accepted"],
    ["Company value", "Ready for a lender or buyer at any moment"],
  ],
  breaks: {
    h2: "Four places a plant loses the date, the margin, or the knowledge.",
    lead: "Each one starts at a handoff between departments, not on the floor.",
    cards: [
      ["Sales", "Operations", "65%", "of frontline supervisors spend up to four hours a shift on manual data and reporting.", "Ship dates promised against capacity no one can see.", "L2L survey, 2026"],
      ["Inventory", "Operations", "50.2%", "of manufacturers cite supply chain challenges as a growing concern.", "Material shortages found after production is committed.", "NAM Manufacturers' Outlook, Q2 2026"],
      ["Inventory", "Finance", "6 in 10", "distributors believe they lose sales when stock is inadequate.", "Inventory carried as insurance, paid for in cash.", "Phocas, Inventory Trends, 2026"],
      ["People", "Every department", "88%", "of manufacturing leaders say key knowledge leaves when experienced workers do.", "Know-how that leaves with the people who hold it.", "L2L survey, 2026"],
    ],
  },
  proof: {
    eyebrow: "From a recent deployment",
    h2: "A 13-person precision manufacturer, sized before anything was built and measured after.",
    lead: "Desktop accounting, no operations system, and a leadership transition underway. The largest loss sat on the shelf.",
    figures: [
      ["$1.54M", "Annual controllable losses identified in the diagnostic"],
      ["23+ weeks", "Of excess inventory, the largest single source of loss"],
      ["+4.2 pts", "Gross margin, 43.8% to 48.0%, trailing twelve months"],
      ["$316K", "Operating profit, up from $115K, trailing twelve months"],
    ],
    note: "Client identity withheld. Loss figures are diagnostic findings. Margin and operating profit are reported financials for the twelve months to April 2026 against the prior twelve months.",
  },
  trace: {
    h2: "A ship date and a margin, held true from quote to remittance.",
    lead: "One illustrative order. Each step runs inside the approval level leadership set, and the order's margin and cash are current at every step.",
    unit: "Order SO-2841",
    what: "400 bracket assemblies",
    fields: ["Value", "Margin", "Ship date", "Cash"],
    start: { Value: "$86,400", Margin: "31.2% quoted", "Ship date": "Dec 4 requested", Cash: "Not invoiced" },
    steps: [
      { dept: "Sales", act: "Quote priced from current material and labor rates", gate: "hb" },
      {
        dept: "Governing Agent", act: "Order checked against capacity and stock", gate: "ga", gateLabel: "Routed to President",
        note: "Steel rod covers 260 of 400 units. Two ship dates the plant can hold, each with its margin. The President holds Dec 4 and expedites the rod.",
        set: { Margin: "29.9% with expedited rod", "Ship date": "Dec 4 held" },
      },
      { dept: "Inventory", act: "Purchase order for the shortfall, under threshold", gate: "sa" },
      { dept: "Supplier exchange", act: "Acknowledgment received, held for confirmation", gate: "held", gateLabel: "Held" },
      { dept: "Operations", act: "Run scheduled; task lists reach the floor", gate: "fa", set: { "Ship date": "Dec 4 scheduled" } },
      { dept: "Customer Experience", act: "Confirmation and milestone updates sent", gate: "sa" },
      { dept: "Inventory", act: "Receipt matched to PO and invoice; load booked", gate: "sa", set: { Margin: "30.4% on actual cost", "Ship date": "Shipped Dec 4" } },
      { dept: "Finance", act: "Invoice on shipment; remittance posted", gate: "hb", set: { Cash: "Collected $86,400" } },
    ],
    end: "Ship date held. Margin known at every step, not after the close.",
  },
  adds: {
    h2: "What a manufacturing deployment adds.",
    cards: [
      ["Bid management", "Bids tracked from notice to submission."],
      ["Material planning", "Shortages surface when the order is accepted."],
      ["Receiving and matching", "Receipt, PO, and invoice matched before payment."],
      ["Quality and equipment", "Inspection, upkeep, and safety on the job record."],
    ],
    partner: "Trading partners who also run Quanton OS exchange purchase orders, acknowledgments, delivery notices, invoices, remittances, and change orders directly. By invitation only, confirmed by both sides, held for confirmation on arrival.",
  },
  sources: [
    { text: "L2L, survey of more than 600 U.S. manufacturing leaders, reported by Supply Chain 24/7, 2026.", href: "https://www.supplychain247.com/article/manufacturers-waste-hours-per-shift-on-manual-data-work/leadership", host: "supplychain247.com" },
    { text: "National Association of Manufacturers, Manufacturers' Outlook Survey, Second Quarter 2026.", href: "https://nam.org/wp-content/uploads/securepdfs/2026/06/NAM_2026_Q2_Outlook_Survey_Writeup.pdf", host: "nam.org" },
    { text: "Phocas Software, Inventory Trends in Wholesale Distribution, 2026, as reported by ACHR News.", href: "https://www.achrnews.com/articles/165935-study-rising-pressures-shaping-inventory-management", host: "achrnews.com" },
  ],
};

export default data;
