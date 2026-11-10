import type { Metadata } from "next";
import ModularPage from "@/components/site/pages/ModularPage";

const url = "https://quantonlabs.com/modular-agent-program";
const title = "Modular Agent Program | Quanton Labs";
const description = "One to three agents, each deployed for a specific function: sales, customer experience, marketing, CRM, vendor management, or a live dashboard. Audited, installed, and operated by Quanton Labs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Quanton Labs", type: "website" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
    { "@type": "ListItem", position: 2, name: "Modular Agent Program" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ModularPage />
    </>
  );
}
