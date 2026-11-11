/* Case studies. Client identities withheld. Figures confirmed by the Managing Director.
   Loss figures are diagnostic findings; results are reported financials. */

export type Program = "Quanton OS deployment" | "Modular Agent Program" | "Where Quanton OS came from";

export interface CaseStudy {
  id: number;
  program: Program;
  sector: string;
  status: string;
  title: string;
  summary: string;
  figures: [string, string][];
  situation: string[];
  builtHead: string;
  built: string[];
  results?: { head: string; cols: string[]; rows: string[][]; note: string };
  table?: { head: string; cols: string[]; rows: string[][] };
  agents?: string;
  note: string;
  solution?: { label: string; href: string };
  meta: string;
}

export const CASES: CaseStudy[] = [
  {
    id: 0, program: "Quanton OS deployment", sector: "Manufacturing", status: "Diagnostic, build, and results",
    title: "A precision manufacturer scaling order volume with nothing connecting sales, inventory, and fulfillment.",
    summary: "Pricing, allocation, and reporting ran on spreadsheets and desktop accounting while leadership changed hands. The largest loss sat on the shelf.",
    figures: [["$1.54M", "annual controllable losses identified"], ["23+ wks", "of excess inventory, the largest source"], ["+4.2 pts", "gross margin, trailing twelve months"], ["$316K", "operating profit, up from $115K"]],
    situation: [
      "A 13-person precision manufacturer with desktop accounting, no operations system, and a leadership transition underway. Quotes were priced by hand, inventory was carried as insurance, and the month closed before anyone could see what it had earned.",
      "The diagnostic sized the problem before anything was built: $1.54M in annual controllable losses, with more than 23 weeks of excess inventory as the single largest source.",
    ],
    builtHead: "What the build put in place",
    built: ["776 active SKUs on one system of record", "A SKU-tiered pricing engine in place of manual quoting", "Inventory and allocation tied to real demand", "A 16-report finance stack and a live leadership view, with no month-end wait"],
    results: {
      head: "Results, trailing twelve months to April",
      cols: ["", "2025", "2026"],
      rows: [["Sales", "$5.73M", "$5.47M"], ["Gross margin", "43.8%", "48.0%"], ["Direct material, % of sales", "39.1%", "36.5%"], ["Direct labor, % of sales", "12.2%", "10.5%"], ["Operating profit", "$115K (2.0%)", "$316K (5.8%)"]],
      note: "Gross margin averaged 41.9% before the engagement (May to September 2025) and 51.6% after the transition (January to April 2026), when monthly sales averaged $483K, 13% above the pre-engagement average.",
    },
    note: "Client identity withheld. Loss figures are diagnostic findings, sized before anything was built. Results are reported financials, trailing twelve months against the prior twelve months.",
    solution: { label: "Manufacturing and Distribution", href: "/solutions/manufacturing-distribution" },
    meta: "A 13-person precision manufacturer: $1.54M in controllable losses identified, then gross margin from 43.8% to 48.0% and operating profit from $115K to $316K on Quanton OS.",
  },
  {
    id: 6, program: "Quanton OS deployment", sector: "Trade contracting", status: "Deployment in progress",
    title: "A contractor serving general contractors, running more subcontractor crews than staff.",
    summary: "Residential and multifamily work, with crews coordinated by phone and text and compliance tracked by hand.",
    figures: [["18 to 20", "employees, field and office"], ["13 to 16", "subcontractor crews"], ["0", "accounts or apps required of any crew"]],
    situation: [
      "Work for general contractors across residential and multifamily projects, with a larger force of subcontractor crews than staff. Assignments, start days, and completions moved by phone and text, and insurance and license dates lived in a spreadsheet.",
      "The deployment puts every job, crew, and commitment on one record the company owns, with crews working by text and no app.",
    ],
    builtHead: "What the deployment puts in place",
    built: ["Assignment, start-day, and completion texts scoped to the punch list", "Insurance and license checks that hold an assignment", "Pay applications from areas accepted at walkthrough", "Job cost by phase from field check-in and photos"],
    note: "Client identity withheld. Deployment in progress. Items describe the system being deployed, not measured results.",
    solution: { label: "Trade Contractors", href: "/solutions/trade-contractors" },
    meta: "A trade contractor running 13 to 16 subcontractor crews by text, with insurance and license checks that hold an assignment and pay applications from accepted work.",
  },
  {
    id: 1, program: "Modular Agent Program", sector: "Professional services", status: "Executive coaching",
    title: "An executive coaching practice with inbound demand waiting on the owner.",
    summary: "Strong inbound interest, with leads waiting on the owner to work through them between client sessions.",
    figures: [["$60K", "in sales within 24 hours of the sales agent's launch"], ["20", "calls booked in the first 24 hours"]],
    situation: ["Inbound interest was strong, but every lead waited on the owner, who could only work through them between client sessions. Response time set the ceiling on sales."],
    builtHead: "What the agents carry",
    built: ["Lead response and qualification", "Follow-up and booked calls", "Customer experience between sessions"],
    agents: "Sales, customer experience",
    note: "Client identity withheld. Results measured after launch.",
    meta: "Modular Agent Program: an executive coaching practice booked 20 calls and $60K in sales within 24 hours of the sales agent's launch.",
  },
  {
    id: 2, program: "Modular Agent Program", sector: "Hospitality", status: "Charter",
    title: "A charter business built on referral, with no website and no consistent presence.",
    summary: "No website, no CRM, and no consistent search or social presence.",
    figures: [["400%", "increase in website traffic"]],
    situation: ["The business ran on referral. There was no website, no CRM, and no consistent search or social presence, so demand depended on who already knew the owner."],
    builtHead: "What the agents carry",
    built: ["The website, built by the agents", "Lead capture and follow-up", "Social posting", "The Google Business profile"],
    agents: "Marketing, lead capture",
    note: "Client identity withheld. Results measured after launch.",
    meta: "Modular Agent Program: a referral-based charter business went from no website to a 400% increase in website traffic, with lead capture and follow-up run by agents.",
  },
  {
    id: 4, program: "Modular Agent Program", sector: "Real estate", status: "Independent agent",
    title: "An independent agent entering and following up every contact by hand.",
    summary: "Leads sourced across channels with no enrichment, no compliance scrubbing, and no CRM sync.",
    figures: [["$48K", "annual labor cost saved, $4K a month"], ["150%", "increase in revenue-generating productivity"]],
    situation: ["Leads came in across several channels with no enrichment, no compliance scrubbing, and no CRM sync. Every contact was entered and followed up by hand."],
    builtHead: "What the agents carry",
    built: ["Contact enrichment and compliance scrubbing", "Chat and follow-up", "CRM sync across channels"],
    agents: "Sales, chat, CRM",
    note: "Client identity withheld. Results measured after launch.",
    meta: "Modular Agent Program: an independent real estate agent saved $48K a year in labor and raised revenue-generating productivity 150%.",
  },
  {
    id: 3, program: "Modular Agent Program", sector: "Real estate", status: "Property management",
    title: "Vendors, CRM, and advertising coordinated across a full rental portfolio.",
    summary: "Short- and long-term rental units, with vendor scheduling, lead tracking, and advertising run separately for each property.",
    figures: [["Every unit", "vendors, CRM, and advertising coordinated portfolio-wide"]],
    situation: ["Vendor scheduling, lead tracking, and advertising ran separately for each property. Occupancy and vendor issues surfaced at month-end reconciliation, after they had already cost money."],
    builtHead: "What the agents carry",
    built: ["Vendor scheduling and follow-up", "CRM across the portfolio", "Advertising", "A live dashboard of occupancy, vendor activity, and lead flow"],
    agents: "Vendor management, CRM, advertising",
    note: "Client identity withheld.",
    meta: "Modular Agent Program: a property management operation coordinates vendors, CRM, and advertising across every unit, with occupancy visible as it happens.",
  },
  {
    id: 5, program: "Where Quanton OS came from", sector: "Automotive", status: "The pattern",
    title: "Nine disconnected systems running one shop.",
    summary: "A founder-run automotive facility ran scheduling, payments, documents, five social platforms, accounting, and inventory in separate tools.",
    figures: [["9", "disconnected systems"], ["1", "person connecting all of them"]],
    situation: [
      "Posts went out late or not at all, parts were ordered at the last minute, and after-hours messages waited until morning. Every function needed the founder's attention because nothing connected them.",
      "Each of those tools now maps to a department in Quanton OS.",
    ],
    builtHead: "Where Quanton OS came from",
    built: [],
    table: { head: "Then, and now in Quanton OS", cols: ["Then", "Now, in Quanton OS"], rows: [["Scheduling app", "Operations"], ["Payments and client tracking", "Customer Experience"], ["Five social platforms, three posting tools", "Marketing and Content"], ["Stock tracked loosely, last-minute orders", "Inventory and Supply Chain"], ["Accounting file, bookkeeper, CPA", "Finance"], ["Training on the job, ad hoc", "People and Team"], ["The founder, connecting all of it", "Governing Agent"]] },
    note: "The founder's own business, before Quanton OS.",
    solution: { label: "Automotive", href: "/solutions/automotive" },
    meta: "Where Quanton OS came from: a founder-run automotive facility running nine disconnected systems, each now mapped to a department in Quanton OS.",
  },
];

export const byId = (id: number) => CASES.find((c) => c.id === id);
