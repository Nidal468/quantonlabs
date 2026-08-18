import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import { faqs } from "./faqData";

export const metadata: Metadata = {
  title: "FAQ | Quanton Labs",
  description:
    "Answers to common questions about Quanton OS, the AI-native business system: what it is, how the operational core works, approval gates and governance, what you own, pricing, and the three-phase engagement.",
  alternates: {
    canonical: "https://quantonlabs.com/faq",
  },
  openGraph: {
    title: "FAQ | Quanton Labs",
    description:
      "Clear answers about what Quanton OS is, how it works, what you own, and what the engagement looks like.",
    url: "https://quantonlabs.com/faq",
    siteName: "Quanton Labs",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
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