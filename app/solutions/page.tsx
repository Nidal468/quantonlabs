import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

const SITE = "https://quantonlabs.com";
const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

export const metadata: Metadata = {
  title: "Quanton OS by Industry | Solutions | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents as the system of record for established operators. See how the deployment is scoped for professional services, home services, automotive, health and wellness, manufacturing and distribution, and retail.",
  alternates: {
    canonical: `${SITE}/solutions`,
  },
  openGraph: {
    title: "Quanton OS by Industry | Quanton Labs",
    description:
      "One AI-native business system, scoped to the operational load of six industries. Eight coordinated agents, one governed operational core, client-owned.",
    url: `${SITE}/solutions`,
    siteName: "Quanton Labs",
    type: "website",
  },
};

const verticals = [
  {
    href: "/solutions/professional-services",
    name: "Professional Services",
    audience: "Consulting, legal, accounting, agencies, architecture",
    load: "Engagement delivery, pipeline, receivables, and compliance deadlines governed on one operational core.",
  },
  {
    href: "/solutions/home-services",
    name: "Home Services",
    audience: "HVAC, plumbing, electrical, roofing, landscaping",
    load: "Estimate follow-up, technician dispatch, project tracking, and collections handled without the owner in the loop.",
  },
  {
    href: "/solutions/automotive",
    name: "Automotive",
    audience: "Independent repair, body shops, detailing, tint, PPF, audio",
    load: "Bay scheduling, parts inventory, estimate approval, and invoicing run on a system the service advisor does not have to carry.",
  },
  {
    href: "/solutions/healthcare-wellness",
    name: "Health and Wellness",
    audience: "Clinics, med spas, fitness studios, chiropractic, functional medicine",
    load: "Appointment reminders, lapsed client re-engagement, membership billing, and certification tracking executed to a governed standard.",
  },
  {
    href: "/solutions/manufacturing-distribution",
    name: "Manufacturing and Distribution",
    audience: "Light manufacturing, contract production, wholesale distribution",
    load: "Production scheduling, materials reorder, order status communication, and margin reporting visible from floor to leadership.",
  },
  {
    href: "/solutions/retail",
    name: "Retail",
    audience: "Boutiques, specialty stores, multi-location independent retail",
    load: "Stock monitoring, abandoned cart recovery, retention campaigns, and margin analysis coordinated across store and online channels.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Solutions" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Quanton OS by Industry",
  url: `${SITE}/solutions`,
  hasPart: verticals.map(v => ({
    "@type": "WebPage",
    name: `Quanton OS for ${v.name}`,
    url: `${SITE}${v.href}`,
  })),
};

export default function SolutionsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navbar isScrolled={true} />
      <main style={{ paddingTop: "70px", fontFamily: "Manrope, sans-serif" }}>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "96px 24px 64px",
            position: "relative",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GRADIENT }} />
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(34px, 4.5vw, 52px)",
                lineHeight: 1.15,
                color: "#1F2937",
                letterSpacing: "-0.5px",
                marginBottom: "20px",
              }}
            >
              One system. Scoped to how your industry actually runs.
            </h1>
            <p style={{ fontSize: "18px", color: "#374151", lineHeight: 1.7, maxWidth: "640px" }}>
              Quanton OS deploys eight coordinated AI agents on one governed operational core built as your system of record. Every engagement gets all eight. What changes by industry is which agents carry the heaviest operational load and which workflows the Discovery phase scopes first.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: "#F9FAFB", padding: "64px 24px 96px" }}>
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {verticals.map(v => (
              <Link
                key={v.href}
                href={v.href}
                style={{
                  display: "block",
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "28px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "19px", color: "#1F2937", marginBottom: "6px" }}>
                  {v.name}
                </div>
                <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "14px" }}>
                  {v.audience}
                </div>
                <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.65, margin: 0 }}>
                  {v.load}
                </p>
                <div style={{ marginTop: "18px", fontSize: "14px", fontWeight: 600, color: "#4655EB" }}>
                  See the deployment
                </div>
              </Link>
            ))}
          </div>

          <div style={{ maxWidth: "760px", margin: "72px auto 0", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.7, marginBottom: "24px" }}>
              Not on the list? Any starting environment qualifies. The assessment reads your operation across eight domains and tells you where the leakage is before any commitment.
            </p>
            <Link
              href="/assessment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                borderRadius: "8px",
                background: GRADIENT,
                color: "white",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Assess Your Business
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}