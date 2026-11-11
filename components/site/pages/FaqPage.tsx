"use client";

import { motion } from "framer-motion";
import { Close, Page, PHero, rise } from "@/components/site/kit";
import faq from "@/content/faq.json";

export default function FaqPage() {
  return (
    <Page>
      <PHero lab="Frequently asked questions" h1="What Quanton OS is, how it is governed, and what an engagement involves." lead="Answers on the system, control, ownership, and investment. Phase 1 Discovery and Diagnostic is the entry point: a fixed investment and a Diagnostic Report the client owns regardless of what it decides next.">
        <nav className="jump" aria-label="Categories">{faq.map((c) => <a key={c.id} href={`#${c.id}`}>{c.title}</a>)}</nav>
      </PHero>
      {faq.map((c, i) => (
        <section key={c.id} id={c.id} className={`sec ${i % 2 ? "p2" : "qx-paper"}`} style={{ scrollMarginTop: 64 }}>
          <div className="wrap split">
            <motion.div className="stick" {...rise}>
              <div className="qx-lab"><b>{String(i + 1).padStart(2, "0")}</b> {c.qs.length} questions</div>
              <h2 className="qx-d3" style={{ marginTop: 22 }}>{c.title}</h2>
            </motion.div>
            <div className="qs">
              {c.qs.map((q, j) => (
                <details key={q.q} open={i === 0 && j === 0}>
                  <summary>{q.q}<i /></summary>
                  <div className="a" dangerouslySetInnerHTML={{ __html: q.a }} />
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}
      <Close />
    </Page>
  );
}
