import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/db/blogs";
import InsightArticle from "@/components/insights/InsightArticle";

const SITE = "https://quantonlabs.com";

export function generateStaticParams() {
  return blogPosts.map(post => ({ id: String(post.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find(p => String(p.id) === id);

  if (!post) {
    return { title: "Insight Not Found | Quanton Labs" };
  }

  const description = post.excerpt ?? post.introduction?.slice(0, 155) ?? "";

  return {
    title: `${post.title} | Quanton Labs`,
    description,
    keywords: post.tags?.join(", "),
    alternates: {
      canonical: `${SITE}/insights/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `${SITE}/insights/${post.id}`,
      siteName: "Quanton Labs",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find(p => String(p.id) === id);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleBody: [post.introduction, post.content, post.conclusion]
      .filter(Boolean)
      .join("\n\n"),
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Quanton Labs",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/insights/${post.id}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const related = (post.relatedPosts ?? [])
    .map(rid => blogPosts.find(p => p.id === rid))
    .filter((p): p is (typeof blogPosts)[0] => Boolean(p))
    .slice(0, 3)
    .map(p => ({ id: p.id, title: p.title }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InsightArticle post={post} related={related} />
    </>
  );
}