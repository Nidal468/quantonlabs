import type { Metadata } from "next";
import CaseStudiesIndex from "@/components/case-studies/CaseStudiesIndex";
import Navbar from "@/components/landing/navbar";
export const metadata: Metadata = {
  title: "Case Studies | Quanton Labs",
  description:
    "Live Quanton OS deployments across manufacturing, professional services, hospitality, property management, and real estate. Real operational failures, real infrastructure built to fix them.",
  alternates: {
    canonical: "https://quantonlabs.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Quanton Labs",
    description:
      "Live Quanton OS deployments across five industries, each starting from the same discipline: quantify the loss, then deploy the system that removes it.",
    url: "https://quantonlabs.com/case-studies",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function CaseStudiesPage() {
return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
              { "@type": "ListItem", position: 2, name: "Case Studies" },
            ],
          }),
        }}
      />
      <Navbar isScrolled={false} />
      <CaseStudiesIndex />
    </>
  );}