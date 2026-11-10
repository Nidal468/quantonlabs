/* Site-wide motion layer, installed once per page by SiteNav.
   - Cursor glow and lift on cards
   - Figures count up when they enter view
   - Ruled lines draw in from the left
   - Photography drifts with scroll
   All of it is skipped under prefers-reduced-motion. */

const GLOW = [
  ".pg .cd", ".sx-brk.grid .cd", ".sx-adds .cd", ".ab2 .tile", ".in-card", ".in-lead", ".si", ".cs-lead", ".hs-ga",
  ".sx-trace .card", ".dc", ".lag", ".ab2 .rl-r",
].join(",");
const COUNT = [
  ".pg .figs strong", ".sx-proof .f strong", ".sx-brk .fig", ".cs-figs strong", ".pg .cd .fig", ".ch2 .f strong", ".pg-tb .tr span",
].join(",");
const LINES = [
  ".pg-tb", ".hs .hs-work", ".ar-layers", ".pg .qs", ".sx-faq .qs", ".ab2 .rl", ".cs-built", ".sx-brk.rows .cards",
  ".pg .figs", ".sx-proof .figs", ".sx-hero .gets", ".pg-hero .ar-non", ".lag-ax div", ".sx-trace .steps",
].join(",");
const DRIFT = ".sx-hero .ph img, .si .ph img";

const NUM = /(\d[\d,]*\.?\d*)/;

function countUp(el: HTMLElement) {
  const node = Array.from(el.childNodes).find((n) => n.nodeType === 3 && NUM.test(n.nodeValue || "")) as Text | undefined;
  if (!node) return;
  const full = node.nodeValue || "";
  const m = full.match(NUM);
  if (!m || m.index === undefined) return;
  const raw = m[1];
  const target = parseFloat(raw.replace(/,/g, ""));
  if (!isFinite(target) || target === 0) return;
  const dec = raw.includes(".") ? raw.split(".")[1].length : 0;
  const comma = raw.includes(",");
  const pre = full.slice(0, m.index), post = full.slice(m.index + raw.length);
  const fmt = (v: number) => {
    const s = v.toFixed(dec);
    if (!comma) return s;
    const [a, b] = s.split(".");
    return a.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (b ? "." + b : "");
  };
  const dur = 1100, t0 = performance.now();
  node.nodeValue = pre + fmt(0) + post;
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    node.nodeValue = pre + fmt(target * e) + post;
    if (k < 1) requestAnimationFrame(step); else node.nodeValue = full;
  };
  requestAnimationFrame(step);
}

export function installSiteMotion(): () => void {
  if (typeof window === "undefined") return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const off: (() => void)[] = [];

  /* glow: tag cards, track the cursor on whichever card it is over */
  document.querySelectorAll<HTMLElement>(GLOW).forEach((el) => el.classList.add("mx-glow"));
  const move = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.(".mx-glow") as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  document.addEventListener("pointermove", move, { passive: true });
  off.push(() => document.removeEventListener("pointermove", move));

  if (reduce) return () => off.forEach((f) => f());

  /* lines and figures on first view */
  const lines = Array.from(document.querySelectorAll<HTMLElement>(LINES));
  lines.forEach((el) => {
    const c = getComputedStyle(el).borderTopColor;
    if (!c || c === "rgba(0, 0, 0, 0)" || getComputedStyle(el).borderTopWidth === "0px") return;
    el.style.setProperty("--lc", c);
    el.classList.add("mx-line");
  });
  const counts = Array.from(document.querySelectorAll<HTMLElement>(COUNT)).filter((el) => { const t = el.textContent || ""; return NUM.test(t) && t.length <= 16; });
  const io = new IntersectionObserver((es) => {
    es.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      io.unobserve(el);
      if (el.classList.contains("mx-line")) el.classList.add("in");
      if (el.dataset.mxCount === "1") { el.dataset.mxCount = "2"; countUp(el); }
    });
  }, { rootMargin: "0px 0px -12% 0px" });
  lines.forEach((el) => el.classList.contains("mx-line") && io.observe(el));
  counts.forEach((el) => { el.dataset.mxCount = "1"; io.observe(el); });
  off.push(() => io.disconnect());

  /* photography drifts a few pixels against the scroll */
  const drift = Array.from(document.querySelectorAll<HTMLElement>(DRIFT));
  if (drift.length) {
    drift.forEach((el) => el.classList.add("mx-drift"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = innerHeight;
      drift.forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--py", `${(p * -28).toFixed(1)}px`);
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener("scroll", on, { passive: true });
    off.push(() => { removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); });
  }

  return () => off.forEach((f) => f());
}
