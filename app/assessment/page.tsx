import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {
  title: "Operational Assessment | Quanton Labs",
  description:
    "A five-minute structural assessment across all eight functional domains of your business. Identifies where work falls between functions and quantifies what it costs. No commitment required.",
  alternates: {
    canonical: "https://quantonlabs.com/assessment",
  },
  openGraph: {
    title: "See where your operations stand | Quanton Labs",
    description:
      "Five minutes, eight domains, one structural diagnostic of how your business actually runs.",
    url: "https://quantonlabs.com/assessment",
    siteName: "Quanton Labs",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
    { "@type": "ListItem", position: 2, name: "Assessment" },
  ],
};

export default function AssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AssessmentClient />
    </>
  );
}  