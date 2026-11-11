"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Close, Page, PHero, stagger } from "@/components/site/kit";
import { blogPosts } from "@/db/blogs";
import "./insights.css";

const fmt = (v: string) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
};

export default function InsightsIndex() {
  const posts = blogPosts.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = posts;
  return (
    <Page>
      <PHero lab="Insights" h1="Business architecture, operational intelligence, and why AI needs infrastructure." lead="Writing for leaders of established companies on how operating and managing work, where they break, and what it takes for intelligence to run safely on a business." />
      <section className="sec qx-paper">
        <div className="wrap">
          {lead && (
            <motion.div {...stagger(0)}>
              <Link href={`/insights/${lead.id}`} className="in-lead">
                <div className="m"><span>{lead.category}</span><span>{fmt(lead.date)}</span><span>{lead.readTime} min read</span></div>
                <h2 className="qx-d2">{lead.title}</h2>
                {lead.excerpt && <p>{lead.excerpt}</p>}
                <span className="go">Read</span>
              </Link>
            </motion.div>
          )}
          <div className="in-grid">
            {rest.map((p, i) => (
              <motion.div key={p.id} {...stagger(i % 3)}>
                <Link href={`/insights/${p.id}`} className="in-card">
                  <div className="m"><span>{p.category}</span><span>{p.readTime} min</span></div>
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <span className="d">{fmt(p.date)}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Close />
    </Page>
  );
}
