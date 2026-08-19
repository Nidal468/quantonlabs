import type { Metadata } from "next";
import ArchitectureClient from "@/components/architecture/ArchitectureClient";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

const SITE = "https://quantonlabs.com";

export const metadata: Metadata = {
  title: "How Quanton OS Is Built | Architecture | Quanton Labs",
  description:
    "The architecture behind Quanton OS: eight coordinated AI agents running on a governed operational core, a Governing Agent that coordinates across every function, approval gates on anything touching customers or revenue, and a system that compounds as the model layer advances.",
  keywords:
    "AI-native business system architecture, AI agent coordination, governing agent, approval gates, AI governance, operational core, system of record",
  alternates: {
    canonical: `${SITE}/architecture`,
  },
  openGraph: {
    title: "How Quanton OS Is Built",
    description:
      "Eight coordinated agents on one governed operational core. How the architecture works, how decisions are made, and how you stay in control.",
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
    "The architecture behind Quanton OS: eight coordinated AI agents running on a governed operational core, with a Governing Agent coordinating across every function and approval gates on every consequential action.",
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

export default function ArchitecturePage() {
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
      <Navbar isScrolled={true} />
      <ArchitectureClient />
      <Footer />
    </>
  );
}