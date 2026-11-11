import type { Metadata } from "next";
import CaseStudiesPage from "@/components/site/pages/CaseStudiesPage";

const url = "https://quantonlabs.com/case-studies";
const title = "Case Studies | Quanton Labs";
const description = "Quanton OS deployments and Modular Agent Program engagements: a precision manufacturer's margin and operating profit, a trade contractor's crews, and agent results measured after launch.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Quanton Labs", type: "website" },
};

export default function Page() {
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
      <CaseStudiesPage />
    </>
  );
}
