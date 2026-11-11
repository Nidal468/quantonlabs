import type { Metadata } from "next";
import ArchitecturePage from "@/components/site/pages/ArchitecturePage";

const SITE = "https://quantonlabs.com";

export const metadata: Metadata = {
  title: "How Quanton OS Is Built | Architecture | Quanton Labs",
  description:
    "How Quanton OS is built: one system of record the company owns, shared engines that compute every number, and a Governing Agent coordinating seven department leads under approval levels leadership sets.",
  keywords:
    "AI-native business system architecture, governing agent, approval levels, AI governance, operational core, system of record",
  alternates: {
    canonical: `${SITE}/architecture`,
  },
  openGraph: {
    title: "How Quanton OS Is Built",
    description:
      "Three planes on one system of record, a Governing Agent above seven department leads, and approval levels enforced in the system.",
    url: `${SITE}/architecture`,
    siteName: "Quanton Labs",
    type: "article",
  },
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "How Quanton OS Is Built",
  description:
    "How Quanton OS is built: three planes on one system of record, shared engines that compute every number, and a Governing Agent above seven department leads, with approval levels on every consequential action.",
  author: {
    "@type": "Organization",
    name: "Quanton Labs",
    url: SITE,
  },
  publisher: {
    "@type": "Organization",
    name: "Quanton Labs",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/architecture`,
  },
  about: [
    { "@type": "Thing", name: "AI-native business system" },
    { "@type": "Thing", name: "Multi-agent coordination" },
    { "@type": "Thing", name: "AI governance" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Architecture" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArchitecturePage />
    </>
  );
}