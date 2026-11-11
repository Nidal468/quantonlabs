import type { Metadata } from "next";
import SolutionsIndex from "@/components/site/pages/SolutionsIndex";
import au from "@/content/solutions/automotive";
import hw from "@/content/solutions/healthcare-wellness";
import hs from "@/content/solutions/home-services";
import md from "@/content/solutions/manufacturing-distribution";
import ps from "@/content/solutions/professional-services";
import rt from "@/content/solutions/retail";
import tc from "@/content/solutions/trade-contractors";

const SITE = "https://quantonlabs.com";
const title = "Quanton OS by Industry | Solutions | Quanton Labs";
const description = "Quanton OS for automotive, healthcare and wellness, home services, manufacturing and distribution, professional services, retail, and trade contractors: one system of record the company owns, built around how each industry makes and loses money.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE}/solutions` },
  openGraph: { title, description, url: `${SITE}/solutions`, siteName: "Quanton Labs", type: "website" },
};

const items = [au, hw, hs, md, ps, rt, tc];

const schema = [
  { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.name, url: `${SITE}/solutions/${d.slug}` })) },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Solutions" }] },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SolutionsIndex items={items} />
    </>
  );
}
