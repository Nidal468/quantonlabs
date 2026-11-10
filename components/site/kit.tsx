"use client";

/* Shared page kit for interior pages: paper and ink, regular-weight display type. */
import Link from "next/link";
import { motion } from "framer-motion";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import "@/components/site/site.css";
import "./kit.css";

export const ease = [0.2, 0.7, 0.2, 1] as const;
export const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -10% 0px" }, transition: { duration: 0.8, ease } };
export const stagger = (i: number) => ({ ...rise, transition: { ...rise.transition, delay: i * 0.07 } });

export function Page({ children, nav = "dark" }: { children: React.ReactNode; nav?: "dark" | "paper" }) {
  return (
    <div className="qx pg">
      <SiteNav theme={nav} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PHero({ lab, h1, lead, children, side }: { lab: string; h1: string; lead?: string; children?: React.ReactNode; side?: React.ReactNode }) {
  return (
    <section className="qx-ink pg-hero">
      <div className="wrap">
        <div className={side ? "gr" : ""}>
          <div>
            <motion.div className="qx-lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>{lab}</motion.div>
            <motion.h1 className="qx-d2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>{h1}</motion.h1>
            {lead && <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>{lead}</motion.p>}
          </div>
          {side && <motion.div className="side" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}>{side}</motion.div>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Head({ n, lab, h2, lead, size = "d2" }: { n?: string; lab: string; h2: string; lead?: string; size?: "d2" | "d3" }) {
  return (
    <motion.div className="pg-head" {...rise}>
      <div>
        <div className="qx-lab">{n && <b>{n}</b>} {lab}</div>
        <h2 className={size === "d2" ? "qx-d2" : "qx-d3"}>{h2}</h2>
      </div>
      {lead && <p className="qx-body">{lead}</p>}
    </motion.div>
  );
}

export function Close({ second }: { second?: { label: string; href: string } }) {
  return (
    <section className="qx-ink pg-close">
      <div className="wrap gr">
        <motion.div {...rise}>
          <h2 className="qx-d2">See where the operation stands.</h2>
          <p className="qx-body">A short assessment of how the business runs today, with a structural read of where operating and managing are consuming the people who should be leading.</p>
        </motion.div>
        <div className="cta">
          <Link className="b1" href="/assessment">Start the assessment</Link>
          {second ? <Link className="b2" href={second.href}>{second.label}</Link> : <a className="b2" href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noreferrer">Book a discovery call</a>}
        </div>
      </div>
    </section>
  );
}

/** Ruled table with a fixed column template. */
export function Table({ head, rows, cols, dark }: { head: string[]; rows: React.ReactNode[][]; cols: string; dark?: boolean }) {
  return (
    <div className={`pg-tb${dark ? " dk" : ""}`} role="table">
      {head.some(Boolean) && <div className="tr th" role="row" style={{ gridTemplateColumns: cols }}>{head.map((h, i) => <span key={i} role="columnheader">{h}</span>)}</div>}
      {rows.map((r, i) => (
        <motion.div key={i} className="tr" role="row" style={{ gridTemplateColumns: cols }} {...stagger(i)}>
          {r.map((c, j) => <span key={j} role="cell">{c}</span>)}
        </motion.div>
      ))}
    </div>
  );
}
