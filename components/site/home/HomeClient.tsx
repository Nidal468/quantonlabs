"use client";

/* Homepage: the approved comp (C1) scene and sections, mounted under .hm, on the shared nav and footer. */
import { useEffect, useRef } from "react";
import { createIcons, ArrowDown, ArrowLeftRight, ArrowRight, BookOpen, Briefcase, CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, FileCheck2, Gavel, Handshake, IdCard, KeyRound, Landmark, LayoutDashboard, LineChart, Lock, Maximize2, Megaphone, MessageSquareHeart, Minimize2, Network, Package, RefreshCw, ScrollText, Server, ShieldCheck, TrendingUp, TriangleAlert, Users, Wrench, X } from "lucide";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import BODY from "./body";
import { runHome } from "./script";
import HomeSections from "./HomeSections";
import "@/components/site/site.css";
import "./home.css";

const ICONS = { ArrowDown, ArrowLeftRight, ArrowRight, BookOpen, Briefcase, CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, FileCheck2, Gavel, Handshake, IdCard, KeyRound, Landmark, LayoutDashboard, LineChart, Lock, Maximize2, Megaphone, MessageSquareHeart, Minimize2, Network, Package, RefreshCw, ScrollText, Server, ShieldCheck, TrendingUp, TriangleAlert, Users, Wrench, X };

export default function HomeClient() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const icons = () => createIcons({ icons: ICONS, attrs: { "stroke-width": 1.75 } });
    icons();
    const stop = runHome(el, icons);
    /* phones: the dashboard previews at fit-to-width; the buttons open and close the full view */
    const fit = () => el.style.setProperty("--mz", String(Math.max(0.2, (window.innerWidth - 40) / 1120)));
    fit();
    window.addEventListener("resize", fit);
    const toggle = () => (el.querySelector("#expand") as HTMLButtonElement | null)?.click();
    const btns = Array.from(el.querySelectorAll<HTMLButtonElement>(".m-open, .m-close"));
    btns.forEach((b) => b.addEventListener("click", toggle));
    return () => {
      stop();
      window.removeEventListener("resize", fit);
      btns.forEach((b) => b.removeEventListener("click", toggle));
    };
  }, []);
  return (
    <>
      <SiteNav theme="dark" />
      <main id="main">
        <div ref={ref} className="hm" dangerouslySetInnerHTML={{ __html: BODY }} />
        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
