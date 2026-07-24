import type { Metadata } from "next";
import CaseStudiesIndex from "@/components/case-studies/CaseStudiesIndex";

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
  return <CaseStudiesIndex />;
}