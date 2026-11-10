"use client";

/* Legal pages render the governed documents (ql-governed-docs extracts) without edits. */
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Page, PHero } from "@/components/site/kit";
import "./legal.css";

export interface LegalDoc { title: string; version: string; date: string; body: string }

const OTHERS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/terms-of-use", label: "Website Terms of Use" },
];

export default function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <Page>
      <PHero lab={`Legal · Version ${doc.version} · ${doc.date}`} h1={doc.title} />
      <section className="sec qx-paper lg-sec">
        <div className="wrap lg">
          <article className="lg-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
          </article>
          <aside className="lg-side">
            <div className="qx-lab">Legal</div>
            {OTHERS.map((o) => (
              <Link key={o.href} href={o.href} aria-current={o.href === path ? "page" : undefined} className={o.href === path ? "on" : ""}>{o.label}</Link>
            ))}
            <a href="mailto:growth@quantonlabs.com">growth@quantonlabs.com</a>
          </aside>
        </div>
      </section>
    </Page>
  );
}
