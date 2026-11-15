"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Close, Page, Words, rise } from "@/components/site/kit";
import type { PostSummary } from "@/db/blogs";
import "./insights.css";

const fmt = (v: string) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
};

type Live = { id: number; title: string };

export default function InsightScheduled({ post, latest }: { post: PostSummary; latest: Live[] }) {
  return (
    <Page>
      <section className="qx-ink in-hero">
        <div className="wrap">
          <Link href="/insights" className="qx-lab bk">Insights · Scheduled</Link>
          <h1 className="qx-d2"><Words text={post.title} delay={0.1} /></h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          <div className="m"><span>{post.category ?? "Insight"}</span><span>Publishes {fmt(post.date)}</span></div>
        </div>
      </section>
      <section className="sec qx-paper">
        <div className="wrap in-body">
          <motion.div className="in-sched" {...rise}>
            <div className="qx-lab">Not yet published</div>
            <p className="in-sched-date">This Insight publishes on {fmt(post.date)}.</p>
            <p>
              Quanton Labs plans its Insights as a series and schedules each piece ahead of its release date.
              The page opens automatically on that date, with no one needing to publish it by hand.
            </p>
            <p>
              Quanton OS carries the same discipline for client companies. The Marketing and Content department lead
              and its specialist agents carry campaign planning, local presence and listings, email and messaging lists,
              social, and website content. Draft content waits in a review window leadership controls before it goes out,
              and every output is checked against the company&apos;s business rules, brand included.
            </p>
            <div className="in-sched-links">
              <Link href="/insights">Read the latest Insights</Link>
              <Link href="/architecture">See how Quanton OS is organized</Link>
            </div>
          </motion.div>
          <aside>
            {latest.length > 0 && (
              <motion.div className="rel" {...rise}>
                <div className="qx-lab">Published now</div>
                {latest.map((r) => <Link key={r.id} href={`/insights/${r.id}`}>{r.title}</Link>)}
              </motion.div>
            )}
          </aside>
        </div>
      </section>
      <Close second={{ label: "All insights", href: "/insights" }} />
    </Page>
  );
}
