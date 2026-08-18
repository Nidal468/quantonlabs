"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/db/blogs";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function PostCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: "easeOut" }}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        padding: "32px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
      }}
    >
      {post.category && (
        <div
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            ...GRADIENT_TEXT,
          }}
        >
          {post.category}
        </div>
      )}

      <h2
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          color: "#1F2937",
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        <Link href={`/insights/${post.id}`} style={{ color: "inherit", textDecoration: "none" }}>
          {post.title}
        </Link>
      </h2>

      {post.excerpt && (
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "15px",
            color: "#6B7280",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          paddingTop: "8px",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            color: "#9CA3AF",
          }}
        >
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} />
              {post.readTime} min
            </span>
          )}
        </div>

        <Link
          href={`/insights/${post.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "#2B60EB",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Read <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function InsightsIndex() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main
      style={{
        paddingTop: "120px",
        paddingBottom: "100px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
              ...GRADIENT_TEXT,
            }}
          >
            Insights
          </div>
          <h1
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#1F2937",
              lineHeight: 1.25,
              margin: "0 0 16px",
            }}
          >
            Writing on business architecture
          </h1>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.7,
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            Operational intelligence, structural design, and why most AI initiatives fail before the
            technology ever gets a chance.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "72px" }}>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              marginBottom: "24px",
            }}
          >
            See where your own operations stand.
          </p>
          <Link
            href="/assessment"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "12px",
              background: GRADIENT,
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Assess Your Business <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}