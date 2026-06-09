"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BrainCircuit,
  FileBarChart,
  Settings,
  Users,
  CreditCard,
} from "lucide-react";
import { useDashboard } from "@/lib/hook/use-dashboard-context";
import { CompanySwitcher } from "./company-switcher";

interface SidebarProps {
  activePage: string;
  setPage: (page: "overview"| "agents"| "reports" | "company" | "billing" | "settings") => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "agents", label: "Agents", icon: BrainCircuit },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "company", label: "Company Settings", icon: Users },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
];

export function Sidebar({ activePage, setPage }: SidebarProps) {
  const { activeCompanyId, setActiveCompanyId, activeCompany, companies } = useDashboard();

  return (
    <aside className="hidden md:flex flex-col w-[280px] h-screen border-r border-neutral-200 bg-white p-4 gap-6">
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <span className="font-semibold text-neutral-900 tracking-tight">QuantumLab</span>
      </div>

      <CompanySwitcher
        companies={companies}
        activeId={activeCompanyId}
        onSelect={setActiveCompanyId}
      />

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id as "overview"| "agents"| "reports" | "company" | "billing")}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                isActive
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
              )}
            >
              <item.icon size={18} className={cn(isActive && "text-neutral-900")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => setPage("settings")}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
            activePage === "settings"
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
          )}
        >
          <Settings size={18} />
          User Settings
        </button>
      </div>
    </aside>
  );
}
