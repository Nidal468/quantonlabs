import type { Metadata } from "next";
import InsightsIndex from "@/components/insights/InsightsIndex";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { blogPosts } from "@/db/blogs";

export const metadata: Metadata = {
  title: "Insights | Quanton Labs",
  description:
    "Writing on business architecture, operational intelligence, and why AI initiatives fail without infrastructure. Written for owner-led businesses generating $1M to $20M annually.",
  alternates: {
    canonical: "https://quantonlabs.com/insights",
  },
  openGraph: {
    title: "Insights | Quanton Labs",
    description:
      "Business architecture, operational intelligence, and the structural reasons most AI initiatives fail.",
    url: "https://quantonlabs.com/insights",
    siteName: "Quanton Labs",
    type: "website",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Quanton Labs Insights",
  description:
    "Writing on business architecture, operational intelligence, and AI infrastructure for owner-led businesses.",
  url: "https://quantonlabs.com/insights",
  publisher: {
    "@type": "Organization",
    name: "Quanton Labs",
    url: "https://quantonlabs.com",
  },
  blogPost: blogPosts.map(post => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    url: `https://quantonlabs.com/insights/${post.id}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quantonlabs.com" },
    { "@type": "ListItem", position: 2, name: "Insights" },
  ],
};

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar isScrolled={true} />
      <InsightsIndex />
      <Footer />
    </>
  );
}