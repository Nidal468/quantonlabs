import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Quanton Labs",
  description:
    "Quanton Labs is a business infrastructure company that builds and operates Quanton OS, an AI-native business system for established operators generating $1M to $20M annually. Founded on 18 years of multi-site operating experience.",
  alternates: {
    canonical: "https://quantonlabs.com/about",
  },
  openGraph: {
    title: "About | Quanton Labs",
    description:
      "Built by an operator, for operators. Quanton Labs builds and operates the AI-native business system behind established operators generating $1M to $20M.",
    url: "https://quantonlabs.com/about",
    siteName: "Quanton Labs",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
    { "@type": "ListItem", position: 2, name: "About" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}