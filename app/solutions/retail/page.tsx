import Retail from "@/components/solutions/Retail";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System for Retail | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents for independent retailers. Smarter inventory decisions, automated customer retention, consistent marketing execution, and real-time financial visibility.",
  alternates: {
    canonical: "https://quantonlabs.com/solutions/retail",
  },
  openGraph: {
    title: "AI Operating System for Retail | Quanton Labs",
    description:
      "Eight coordinated AI agents built for independent retailers. Inventory management, customer retention, marketing automation, and margin visibility — governed and automated.",
    url: "https://quantonlabs.com/solutions/retail",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function RetailPage() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px" }}>
        <Retail />
      </main>
      <Footer />
    </>
  );
}