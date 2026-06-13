// app/admin/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Building2, 
  Bot, 
  BarChart3, 
  CreditCard, 
  Settings,
  ChevronRight
} from "lucide-react";

type Page = "workspaces" | "agents" | "overview" | "reports" | "finance" | "settings";

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType; disabled?: boolean }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "workspaces", label: "Workspaces", icon: Building2 },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "reports", label: "Reports", icon: BarChart3, disabled: true },
  { id: "finance", label: "Finance", icon: CreditCard, disabled: true },
  { id: "settings", label: "Settings", icon: Settings, disabled: true },
];

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-16 items-center border-b border-neutral-100 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
          <Bot size={18} />
        </div>
        <span className="ml-3 font-semibold tracking-tight text-neutral-900">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => !item.disabled && setActivePage(item.id)}
              className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 
                ${isActive 
                  ? "bg-neutral-100 text-neutral-900" 
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                }
                ${item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-900"} />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="h-1.5 w-1.5 rounded-full bg-neutral-900"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-neutral-100 p-4">
        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-600">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-neutral-900">Admin User</p>
            <p className="truncate text-xs text-neutral-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
