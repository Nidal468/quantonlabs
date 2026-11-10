import type { Metadata } from "next";
import SolutionPage from "@/components/site/solutions/SolutionPage";
import { EXTRAS } from "@/content/solutions/extras";
import data from "@/content/solutions/automotive";

const url = `https://quantonlabs.com/solutions/${data.slug}`;

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: url },
  openGraph: { title: data.meta.title, description: data.meta.description, url, siteName: "Quanton Labs", type: "website" },
};

const x = EXTRAS[data.slug];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: x.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `Quanton OS for ${data.name}`,
  serviceType: "AI-native business system",
  description: data.meta.description,
  audience: { "@type": "BusinessAudience", audienceType: data.hero.builtFor },
  provider: { "@type": "Organization", name: "Quanton Labs", url: "https://quantonlabs.com" },
  url,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, serviceSchema, faqSchema]) }} />
      <SolutionPage d={data} x={x} />
    </>
  );
}
