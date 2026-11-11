import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/site/pages/CaseStudyPage";
import { CASES, byId } from "@/content/case-studies";

const SITE = "https://quantonlabs.com";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = byId(Number(id));
  if (!c) return { title: "Case Study | Quanton Labs" };
  const title = `${c.sector}, ${c.status} | Case Study | Quanton Labs`;
  const url = `${SITE}/case-studies/${c.id}`;
  return { title, description: c.meta, alternates: { canonical: url }, openGraph: { title, description: c.meta, url, siteName: "Quanton Labs", type: "article" } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = byId(Number(id));
  if (!c) notFound();
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", headline: c.title, description: c.meta, author: { "@type": "Organization", name: "Quanton Labs" }, publisher: { "@type": "Organization", name: "Quanton Labs", url: SITE }, mainEntityOfPage: `${SITE}/case-studies/${c.id}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/case-studies` },
      { "@type": "ListItem", position: 3, name: `${c.sector}, ${c.status}` },
    ] },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <CaseStudyPage c={c} />
    </>
  );
}
