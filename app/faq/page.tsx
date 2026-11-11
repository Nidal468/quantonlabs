import type { Metadata } from "next";
import FaqPage from "@/components/site/pages/FaqPage";
import faq from "@/content/faq.json";

const strip = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export const metadata: Metadata = {
  title: "FAQ | Quanton Labs",
  description:
    "Answers to common questions about Quanton OS, the AI-native business system: what it is, how the operational core works, approval levels and governance, what the company owns, and the three-phase engagement.",
  alternates: {
    canonical: "https://quantonlabs.com/faq",
  },
  openGraph: {
    title: "FAQ | Quanton Labs",
    description:
      "What Quanton OS is, how it is governed, what the company owns, and what an engagement involves.",
    url: "https://quantonlabs.com/faq",
    siteName: "Quanton Labs",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.flatMap((c) => c.qs).map((q) => ({
    "@type": "Question",
    name: q.q,
    acceptedAnswer: { "@type": "Answer", text: strip(q.a) },
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
      <FaqPage />
    </>
  );
}