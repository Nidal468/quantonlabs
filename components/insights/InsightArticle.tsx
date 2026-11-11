"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Close, Page, Words, rise } from "@/components/site/kit";
import type { BlogPost } from "@/db/blogs";
import "./insights.css";

type Related = { id: number; title: string };

const fmt = (v: string) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
};

export default function InsightArticle({ post, related }: { post: BlogPost; related: Related[] }) {
  const lines = post.content.split("\n").map((l) => l.trim()).filter(Boolean);
  return (
    <Page>
      <section className="qx-ink in-hero">
        <div className="wrap">
          <Link href="/insights" className="qx-lab bk">Insights{post.category ? ` · ${post.category}` : ""}</Link>
          <h1 className="qx-d2"><Words text={post.title} delay={0.1} /></h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          <div className="m"><span>{post.author}</span><span>{fmt(post.date)}</span>{post.readTime && <span>{post.readTime} min read</span>}</div>
        </div>
      </section>
      <section className="sec qx-paper">
        <div className="wrap in-body">
          <article className="prose">
            {lines.map((l, i) => (l.startsWith("## ") ? <h2 key={i}>{l.slice(3)}</h2> : <p key={i}>{l}</p>))}
          </article>
          <aside>
            {post.tags && post.tags.length > 0 && (
              <div className="tags"><div className="qx-lab">Topics</div><ul>{post.tags.map((t) => <li key={t}>{t}</li>)}</ul></div>
            )}
            {related.length > 0 && (
              <motion.div className="rel" {...rise}>
                <div className="qx-lab">Related</div>
                {related.map((r) => <Link key={r.id} href={`/insights/${r.id}`}>{r.title}</Link>)}
              </motion.div>
            )}
          </aside>
        </div>
      </section>
      <Close second={{ label: "More insights", href: "/insights" }} />
    </Page>
  );
}
