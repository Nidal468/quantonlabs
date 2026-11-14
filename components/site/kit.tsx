"use client";

/* Shared page kit for interior pages: paper and ink, regular-weight display type. */
import { Fragment, useLayoutEffect, useRef } from "react";
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
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Headline that rises in word by word, as on About. */
export function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  // Real spaces between words so the browser can balance the lines. The final
  // pair shares one box and stays on one line whenever it fits the column, so a
  // headline does not end on a single word; on a column too narrow for the pair
  // it wraps normally instead of overflowing.
  const parts = text.split(" ");
  const words = parts.length > 2 ? [...parts.slice(0, -2), `${parts[parts.length - 2]} ${parts[parts.length - 1]}`] : parts;
  const tail = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = tail.current;
    const box = el?.parentElement?.closest("h1, h2, h3, p, div") as HTMLElement | null;
    if (!el || !box || parts.length < 3) return;
    const fit = () => {
      el.style.display = "inline-block";
      el.style.whiteSpace = "nowrap";
      const fits = el.scrollWidth <= box.clientWidth * 0.95;
      // Too wide: dissolve the box so the two words wrap as ordinary text.
      el.style.whiteSpace = fits ? "nowrap" : "normal";
      el.style.display = fits ? "inline-block" : "inline";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => ro.disconnect();
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <motion.span ref={parts.length > 2 && i === words.length - 1 ? tail : undefined} style={{ display: "inline-block" }} initial={{ opacity: 0.01, y: "0.4em" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: delay + 0.05 * i, ease }}>{w}</motion.span>
        </Fragment>
      ))}
    </>
  );
}

export function PHero({ lab, h1, lead, children, side }: { lab: string; h1: string; lead?: string; children?: React.ReactNode; side?: React.ReactNode }) {
  return (
    <section className="qx-ink pg-hero">
      <div className="wrap">
        <div className={side ? "gr" : ""}>
          <div>
            <motion.div className="qx-lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>{lab}</motion.div>
            <h1 className="qx-d2"><Words text={h1} delay={0.1} /></h1>
            {lead && <motion.p className="lead" initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>{lead}</motion.p>}
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
export function Table({ head, rows, cols, dark, hl }: { head: string[]; rows: React.ReactNode[][]; cols: string; dark?: boolean; hl?: number }) {
  const c = (j: number) => (j === hl ? "hl" : undefined);
  return (
    <div className={`pg-tb${dark ? " dk" : ""}${hl !== undefined ? " has-hl" : ""}`} role="table">
      {head.some(Boolean) && <div className="tr th" role="row" style={{ gridTemplateColumns: cols }}>{head.map((h, i) => <span key={i} className={c(i)} role="columnheader">{h}</span>)}</div>}
      {rows.map((r, i) => (
        <motion.div key={i} className="tr" role="row" style={{ gridTemplateColumns: cols }} {...stagger(i)}>
          {r.map((v, j) => <span key={j} className={c(j)} role="cell" data-label={j > 0 && head[j] ? head[j] : undefined}>{v}</span>)}
        </motion.div>
      ))}
    </div>
  );
}
