import ManufacturingDistribution from "@/components/solutions/ManufacturingDistribution";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System for Manufacturing and Distribution | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents for manufacturing and distribution businesses. Govern production scheduling, materials inventory, order fulfillment, and customer communication from one coordinated system.",
  alternates: {
    canonical: "https://quantonlabs.com/solutions/manufacturing-distribution",
  },
  openGraph: {
    title: "AI Operating System for Manufacturing and Distribution | Quanton Labs",
    description:
      "Eight coordinated AI agents built for manufacturing and distribution. Production scheduling, inventory reorder, order fulfillment, and real-time financial visibility — governed and automated.",
    url: "https://quantonlabs.com/solutions/manufacturing-distribution",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function ManufacturingDistributionPage() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px" }}>
        <ManufacturingDistribution />
      </main>
      <Footer />
    </>
  );
}