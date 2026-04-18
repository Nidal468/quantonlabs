import ProfessionalServices from "@/components/solutions/ProfessionalServices";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System for Professional Services | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents for consulting, legal, accounting, and agency firms. Recover billable hours, standardise client delivery, and get real-time visibility across every engagement.",
  alternates: {
    canonical: "https://quantonlabs.com/solutions/professional-services",
  },
  openGraph: {
    title: "AI Operating System for Professional Services | Quanton Labs",
    description:
      "Eight coordinated AI agents built for professional services firms. Client onboarding, proposal generation, invoice tracking, and practice visibility — governed and automated.",
    url: "https://quantonlabs.com/solutions/professional-services",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px" }}>
        <ProfessionalServices />
      </main>
      <Footer />
    </>
  );
}