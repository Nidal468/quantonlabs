import Automotive from "@/components/solutions/Automotive";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System for Automotive Businesses | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents for independent repair shops, body shops, detailing, tint, PPF, and audio install businesses. Keep bays productive, convert more estimates, and eliminate parts delays.",
  alternates: {
    canonical: "https://quantonlabs.com/solutions/automotive",
  },
  openGraph: {
    title: "AI Operating System for Automotive Businesses | Quanton Labs",
    description:
      "Eight coordinated AI agents built for automotive shops. Bay scheduling, estimate follow-up, parts inventory, customer communication, and invoicing — governed and automated.",
    url: "https://quantonlabs.com/solutions/automotive",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function AutomotivePage() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px" }}>
        <Automotive />
      </main>
      <Footer />
    </>
  );
}