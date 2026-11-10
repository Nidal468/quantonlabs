import type { Metadata } from "next";
import SolutionPage from "@/components/site/solutions/SolutionPage";
import data from "@/content/solutions/healthcare-wellness";

const url = `https://quantonlabs.com/solutions/${data.slug}`;

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: url },
  openGraph: { title: data.meta.title, description: data.meta.description, url, siteName: "Quanton Labs", type: "website" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://quantonlabs.com/solutions" },
    { "@type": "ListItem", position: 3, name: data.name },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SolutionPage d={data} />
    </>
  );
}
