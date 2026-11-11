"use client";

import { useEffect, useState, type RefObject } from "react";
import { useScroll, useMotionValueEvent, type MotionValue } from "framer-motion";

/** Pinned-stage progress (0 to 1) across a tall section, plus whether pinning is active. */
export function useStage(ref: RefObject<HTMLElement | null>): { p: MotionValue<number>; pinned: boolean } {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pinned = usePinned();
  return { p: scrollYProgress, pinned };
}

/** Discrete step (0..n) derived from a progress value, for text swaps that must never overlap. */
export function useStep(p: MotionValue<number>, cuts: number[], pinned: boolean): number {
  const calc = (v: number) => cuts.filter((c) => v >= c).length;
  const [raw, setRaw] = useState(() => calc(p.get()));
  useMotionValueEvent(p, "change", (v) => { const s = calc(v); setRaw((o) => (o === s ? o : s)); });
  return pinned ? raw : cuts.length;
}

/** Pin only on desktop-sized screens without reduced motion. */
export function usePinned(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)");
    const up = () => setOk(mq.matches);
    up(); mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);
  return ok;
}
