import HealthWellness from "@/components/solutions/HealthWellness";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating System for Health and Wellness | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents for clinics, med spas, fitness studios, and wellness practices. Reduce no-shows, recover lapsed clients, and scale your front desk without adding headcount.",
  alternates: {
    canonical: "https://quantonlabs.com/solutions/healthcare-wellness",
  },
  openGraph: {
    title: "AI Operating System for Health and Wellness | Quanton Labs",
    description:
      "Eight coordinated AI agents built for wellness practices. Appointment reminders, rebooking workflows, client retention, and practice visibility — governed and automated.",
    url: "https://quantonlabs.com/solutions/healthcare-wellness",
    siteName: "Quanton Labs",
    type: "website",
  },
};

export default function HealthWellnessPage() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px" }}>
        <HealthWellness />
      </main>
      <Footer />
    </>
  );
}