import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Quanton Labs",
  description:
    "Quanton Labs builds and operates Quanton OS, an AI-native business system that carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead.",
  alternates: {
    canonical: "https://quantonlabs.com/about",
  },
  openGraph: {
    title: "About | Quanton Labs",
    description:
      "Quanton OS runs the company so its leadership can lead it. The consulting firm that stays.",
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