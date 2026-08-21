"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { BlogPost } from "@/db/blogs";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

type Related = { id: number; title: string };

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function InsightArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: Related[];
}) {
  return (
    <>
      <Navbar isScrolled={true} />
      <main
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "120px",
          paddingBottom: "100px",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
          <Link
            href="/insights"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Manrope, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#6B7280",
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            <ArrowLeft size={16} />
            All insights
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {post.category && (
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#4655EB",
                  marginBottom: "16px",
                }}
              >
                {post.category}
              </div>
            )}

            <h1
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(30px, 4.5vw, 44px)",
                color: "#1F2937",
                lineHeight: 1.2,
                margin: "0 0 24px",
              }}
            >
              {post.title}
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "20px",
                paddingBottom: "32px",
                marginBottom: "40px",
                borderBottom: "1px solid #E5E7EB",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              <span style={{ fontWeight: 600, color: "#374151" }}>{post.author}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {post.readTime && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={14} />
                  {post.readTime} min read
                </span>
              )}
            </div>

            {post.excerpt && (
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "20px",
                  lineHeight: 1.6,
                  color: "#374151",
                  fontWeight: 500,
                  margin: "0 0 32px",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Content is the single source of truth. introduction and
                conclusion duplicate its opening and closing lines and exist
                only to feed metadata and schema, so they are not rendered. */}
            <div className="ql-article">
              {post.content
                .split("\n")
                .map(line => line.trim())
                .filter(Boolean)
                .map((line, i) => {
                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={i} className="ql-h2">
                        {line.slice(3)}
                      </h2>
                    );
                  }
                  return (
                    <p key={i} className="ql-p">
                      {line}
                    </p>
                  );
                })}
            </div>

            <style>{`
              .ql-article {
                font-family: Manrope, sans-serif;
                max-width: 68ch;
              }
              .ql-article .ql-p {
                font-size: 18px;
                line-height: 1.75;
                color: #374151;
                margin: 0 0 24px;
              }
              .ql-article .ql-h2 {
                font-size: 26px;
                font-weight: 700;
                line-height: 1.3;
                color: #1F2937;
                margin: 48px 0 18px;
                padding-top: 8px;
                border-top: 2px solid #E5E7EB;
              }
              .ql-article .ql-h2:first-child {
                margin-top: 0;
                border-top: none;
                padding-top: 0;
              }
              @media (max-width: 700px) {
                .ql-article .ql-p { font-size: 17px; }
                .ql-article .ql-h2 { font-size: 22px; margin: 36px 0 14px; }
              }
            `}</style>

            {post.tags && post.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "40px",
                  paddingTop: "32px",
                  borderTop: "1px solid #E5E7EB",
                }}
              >
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "#F3F4F6",
                      color: "#4B5563",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {related.length > 0 && (
              <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E5E7EB" }}>
                <h2
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#1F2937",
                    margin: "0 0 16px",
                  }}
                >
                  Related reading
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {related.map(r => (
                    <Link
                      key={r.id}
                      href={`/insights/${r.id}`}
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#2B60EB",
                        textDecoration: "none",
                      }}
                    >
                      {r.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          <div
            style={{
              marginTop: "64px",
              padding: "40px",
              borderRadius: "16px",
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "17px",
                fontWeight: 600,
                color: "#1F2937",
                margin: "0 0 8px",
              }}
            >
              See where your own operations stand.
            </p>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "15px",
                color: "#6B7280",
                margin: "0 0 24px",
              }}
            >
              A five-minute assessment across all eight functional domains.
            </p>
            <Link
              href="/assessment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "12px",
                background:
                  "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                color: "#ffffff",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Assess Your Business
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}