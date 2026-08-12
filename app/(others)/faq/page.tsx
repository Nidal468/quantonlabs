import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ | Quanton Labs",
  description:
    "Answers to common questions about Quanton OS, the engagement process, pricing structure, deployment timeline, managed services, and data ownership.",
  alternates: {
    canonical: "https://quantonlabs.com/faq",
  },
  openGraph: {
    title: "FAQ | Quanton Labs",
    description:
      "Clear answers about what Quanton OS is, how it works, and what the engagement looks like.",
    url: "https://quantonlabs.com/faq",
    siteName: "Quanton Labs",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Quanton OS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quanton OS is a governed AI operating system built for owner-led businesses generating $1M to $20M annually. It deploys eight coordinated AI agents across your business, covering sales, marketing, operations, finance, customer experience, people management, inventory, and strategy, all connected through a single Governing Agent that coordinates decisions, enforces boundaries, and surfaces what requires your attention. It is not software you install or a tool you configure yourself. It is infrastructure built, deployed, and operated by Quanton Labs on your existing platforms.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from hiring a consultant or buying another SaaS tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A consultant gives you a recommendation and leaves. A SaaS tool handles one function and sits in a silo. Quanton OS is neither. It is a permanent operating layer that connects every function in your business through a single governed system. The agents do not just automate tasks. They coordinate across domains, flag exceptions, and escalate what exceeds their configured boundary. You get a system that runs continuously, not a project that ends or a subscription you have to manage yourself.",
      },
    },
    {
      "@type": "Question",
      name: "What types of businesses is Quanton OS built for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Owner-led businesses generating between $1M and $20M in annual revenue across six verticals: professional services, home services, automotive, healthcare and wellness, manufacturing and distribution, and retail. The common thread is businesses that have outgrown their current operating structure, where the owner is still the glue holding everything together and growth is limited by how much that person can personally oversee.",
      },
    },
    {
      "@type": "Question",
      name: "How does Quanton OS connect to the tools I already use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through direct API integration. Quanton OS connects to your existing platforms, your CRM, accounting software, scheduling tools, communication channels, and inventory systems, without requiring you to migrate off any of them. The agents operate on top of what you already have, not instead of it.",
      },
    },
    {
      "@type": "Question",
      name: "What happens during Phase 1 Discovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Phase 1 is a two-to-three-week diagnostic engagement. We audit your business across all eight functional domains, validate your cost of inaction with figures from your actual financial data, and produce a prioritized implementation roadmap. The output is a Diagnostic Report that you own regardless of what you decide next. Phase 1 is a fixed-fee engagement with no ongoing commitment attached.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Phase 1 Discovery is priced to your specific business based on integration complexity, team structure, and operational environment. That investment is confirmed on your Discovery call and fixed before work begins. Phase 2 Deployment and Phase 3 Managed Services are scoped based on what Phase 1 reveals. We do not publish a general price range because every engagement is configured to a specific business, not sold off a menu.",
      },
    },
    {
      "@type": "Question",
      name: "How long does deployment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Phase 2 Infrastructure Deployment typically takes 8 to 16 weeks. During that period, all eight agents are configured against your specific environment, the Governing Agent goes live, your leadership dashboard is built, and your team is trained. The timeline depends on how many integration categories are involved and the complexity of your existing systems.",
      },
    },
    {
      "@type": "Question",
      name: "What does Managed Services include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once deployed, Quanton Labs operates the system on your behalf. System hosting, monitoring, workflow optimization, governance enforcement, SOP maintenance, and quarterly strategic reviews are all included in a fixed monthly retainer. Strategic advisory hours are included per management profile, with overage billed separately. AI model token usage is funded through your own account, giving you full visibility and control over consumption costs. Third-party platform subscription and API access fees remain your responsibility, as they would with or without Quanton OS. The minimum commitment is six months, then month-to-month.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the data and the infrastructure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do. The Diagnostic Report produced in Phase 1 is yours on delivery. The infrastructure deployed in Phase 2 is yours on completion. Your business data stays in your existing platforms. Quanton OS reads from and writes to them via API but does not store your data in a separate proprietary database.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Take the assessment on our site. It takes about five minutes and produces an immediate structural diagnostic of where your business stands today. If the results indicate a fit, the next step is a 30-minute Discovery call where we determine together whether Quanton OS is the right infrastructure for your business. If it is not, we will tell you that on the call.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
    { "@type": "ListItem", position: 2, name: "FAQ" },
  ],
};

export default function FAQPageWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQClient />
    </>
  );
}