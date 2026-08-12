import type { Metadata } from "next";
import { caseStudies } from "@/db/caseStudy";
import CaseStudyDetail from "@/components/case-studies/CaseStudyDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = caseStudies.find(cs => cs.id === Number(id));

  if (!caseStudy) {
    return { title: "Case Study | Quanton Labs" };
  }

  return {
    title: `${caseStudy.title} | Quanton Labs Case Study`,
    description: `${caseStudy.before.heading}. ${caseStudy.after.result}`,
    alternates: {
      canonical: `https://quantonlabs.com/case-studies/${caseStudy.id}`,
    },
    openGraph: {
      title: `${caseStudy.title} | Quanton Labs Case Study`,
      description: caseStudy.after.result,
      url: `https://quantonlabs.com/case-studies/${caseStudy.id}`,
      siteName: "Quanton Labs",
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CaseStudyDetail id={Number(id)} />;
}