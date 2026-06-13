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
  Cog,
} from "lucide-react";
import { CompanySwitcher } from "./company-switcher";
import { useWorkspace } from "@/lib/hook/useWorkspace";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  activePage: string;
  setPage: (page: "overview" | "agents" | "reports" | "company" | "billing" | "settings") => void;
  activeCompanyId: string;
  setActiveCompanyId: Dispatch<SetStateAction<string>>
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "agents", label: "Agents", icon: BrainCircuit },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "company", label: "Workspace", icon: Users },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Cog },
];

export function Sidebar({ activePage, setPage, activeCompanyId, setActiveCompanyId }: SidebarProps) {
  
  return (
    <aside className="hidden md:flex flex-col w-[280px] h-screen border-r border-neutral-200 bg-white p-4 gap-6">
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <span className="font-semibold text-neutral-900 tracking-tight">QuantumLab</span>
      </div>

      <CompanySwitcher
        activeCompanyId={activeCompanyId}
        setActiveCompanyId={setActiveCompanyId}
      />

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id as "overview" | "agents" | "reports" | "company" | "billing")}
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
