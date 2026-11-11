"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Close, Page, PHero, stagger } from "@/components/site/kit";
import type { SolutionData } from "@/content/solutions/types";
import "./solutions-index.css";

export default function SolutionsIndex({ items }: { items: SolutionData[] }) {
  return (
    <Page>
      <PHero lab="Solutions" h1="One system, built around how each industry makes and loses money." lead="Every deployment runs the whole system on one record the company owns. What changes by industry is where the margin leaks, which specialist agents carry the most weight, and what leadership needs to see first." />
      <section className="sec qx-paper">
        <div className="wrap si-list">
          {items.map((d, i) => (
            <motion.div key={d.slug} {...stagger(i % 2)}>
              <Link href={`/solutions/${d.slug}`} className="si">
                <div className="ph" data-credit={d.hero.photo.credit}><Image src={d.hero.photo.src} alt={d.hero.photo.alt} fill sizes="(max-width: 900px) 100vw, 30vw" /></div>
                <div className="tx">
                  <span className="k">{String(i + 1).padStart(2, "0")} · {d.hero.builtFor}</span>
                  <h2 className="qx-d3">{d.name}</h2>
                  <p>{d.hero.h1}</p>
                  <ul>{d.gets.slice(0, 3).map(([k, v]) => <li key={k}><b>{k}</b> {v}</li>)}</ul>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <Close />
    </Page>
  );
}
