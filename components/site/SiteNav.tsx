"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { installSiteMotion } from "./motion";
import { ChevronDown, Menu, X } from "lucide-react";
import "./site.css";

export const SOLUTIONS = [
  { label: "Automotive", href: "/solutions/automotive", note: "Shops and service centers" },
  { label: "Healthcare and Wellness", href: "/solutions/healthcare-wellness", note: "Clinics and practices" },
  { label: "Home Services", href: "/solutions/home-services", note: "Residential service trades" },
  { label: "Manufacturing and Distribution", href: "/solutions/manufacturing-distribution", note: "Plants and distributors" },
  { label: "Professional Services", href: "/solutions/professional-services", note: "Firms and practices" },
  { label: "Retail", href: "/solutions/retail", note: "Independent and multi-location" },
  { label: "Trade Contractors", href: "/solutions/trade-contractors", note: "Work for general contractors" },
];

const LINKS = [
  { label: "Architecture", href: "/architecture" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
];

export default function SiteNav({ theme = "light" }: { theme?: "light" | "dark" | "overlay" | "paper" }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dd = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (dd.current && !dd.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setMobile(false); } };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, []);

  /* site-wide motion layer: card glow, count-up figures, drawn lines, photo drift */
  useEffect(() => {
    const id = requestAnimationFrame(() => { off = installSiteMotion(); });
    let off = () => {};
    return () => { cancelAnimationFrame(id); off(); };
  }, [path]);

  const [solid, setSolid] = useState(false);
  useEffect(() => {
    if (theme !== "overlay") return;
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    const id = requestAnimationFrame(on); window.addEventListener("scroll", on, { passive: true });
    return () => { cancelAnimationFrame(id); window.removeEventListener("scroll", on); };
  }, [theme]);
  const dark = theme === "dark" || (theme === "overlay" && !solid);
  const cls = theme === "overlay" ? ` overlay${solid ? " solid" : ""}` : theme === "dark" ? " dark" : theme === "paper" ? " paper" : "";
  return (
    <>
      <nav className={`qx qx-nav${cls}`} aria-label="Main">
        <div className="in">
          <Link href="/" className="logo" aria-label="Quanton Labs home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dark ? "/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_1_Aug2026.png" : "/images/site/ql-wordmark.png"} alt="Quanton Labs" />
          </Link>
          <ul>
            <li className={`dd${open ? " open" : ""}`} ref={dd} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
                Solutions <ChevronDown size={15} />
              </button>
              <div className="ddm" role="menu">
                {SOLUTIONS.map((s) => (
                  <Link key={s.href} href={s.href} role="menuitem" onClick={() => setOpen(false)}>
                    <b>{s.label}</b><small>{s.note}</small>
                  </Link>
                ))}
              </div>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className={path?.startsWith(l.href) ? "on" : ""}>{l.label}</Link></li>
            ))}
          </ul>
          <a className="login" href="/auth/signin">Log in</a>
          <button className="burger" aria-label={mobile ? "Close menu" : "Open menu"} onClick={() => setMobile((m) => !m)}>
            {mobile ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobile && (
        <div className="qx qx-mnav">
          <div className="sub">
            <span className="qx-ey">Solutions</span>
            {SOLUTIONS.map((s) => <Link key={s.href} href={s.href} onClick={() => setMobile(false)}>{s.label}</Link>)}
          </div>
          {LINKS.map((l) => <Link key={l.href} href={l.href} onClick={() => setMobile(false)}>{l.label}</Link>)}
          <Link href="/about" onClick={() => setMobile(false)}>About</Link>
          <Link href="/faq" onClick={() => setMobile(false)}>FAQ</Link>
          <a href="/auth/signin">Log in</a>
        </div>
      )}
    </>
  );
}
