import HomeServices from "@/components/solutions/HomeServices";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System for Home Services | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents for HVAC, plumbing, electrical, roofing, and other home services businesses. Convert more estimates, collect faster, and run field operations without the owner as the bottleneck.",
  alternates: {
    canonical: "https://quantonlabs.com/solutions/home-services",
  },
  openGraph: {
    title: "AI Operating System for Home Services | Quanton Labs",
    description:
      "Eight coordinated AI agents built for home services businesses. Estimate follow-up, technician scheduling, invoice collection, and customer communication — governed and automated.",
    url: "https://quantonlabs.com/solutions/home-services",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function HomeServicesPage() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px" }}>
        <HomeServices />
      </main>
      <Footer />
    </>
  );
}