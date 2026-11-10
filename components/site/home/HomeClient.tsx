"use client";

/* Homepage: the approved comp (C1) scene and sections, mounted under .hm, on the shared nav and footer. */
import { useEffect, useRef } from "react";
import { createIcons, ArrowDown, ArrowLeftRight, ArrowRight, BookOpen, Briefcase, CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, FileCheck2, Gavel, Handshake, IdCard, KeyRound, Landmark, LayoutDashboard, LineChart, Lock, Maximize2, Megaphone, MessageSquareHeart, Minimize2, Network, Package, RefreshCw, ScrollText, Server, ShieldCheck, TrendingUp, TriangleAlert, Users, Wrench, X } from "lucide";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import BODY from "./body";
import { runHome } from "./script";
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
    return runHome(el, icons);
  }, []);
  return (
    <>
      <SiteNav theme="paper" />
      <div ref={ref} className="hm" dangerouslySetInnerHTML={{ __html: BODY }} />
      <SiteFooter />
    </>
  );
}
