import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

// Copy: ASSESSMENT FRAMES AND TRANSITIONS, Stage 1 landing page.
const description =
  "Running a company takes operating, managing, and leading. This 6 to 9 minute diagnostic shows where managing is consuming the time leadership should spend leading, across Strategy, Platform, Operations, and Growth.";

export const metadata: Metadata = {
  title: "Structural Diagnostic | Quanton Labs",
  description,
  alternates: { canonical: "https://quantonlabs.com/assessment" },
  openGraph: {
    title: "Where Is Your Company Under-Architected? | Quanton Labs",
    description,
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
    { "@type": "ListItem", position: 2, name: "Structural Diagnostic" },
  ],
};

export default function AssessmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AssessmentClient />
    </>
  );
}
