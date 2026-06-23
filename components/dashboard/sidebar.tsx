"use client";

import { cn } from "@/lib/utils";
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
import { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { GrPowerForceShutdown } from "react-icons/gr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import { Menu } from 'lucide-react';
import { User } from 'lucide-react';
import { LogOut } from "lucide-react";

interface SidebarProps {
  activePage: "overview" | "agents" | "reports" | "company" | "billing" | "settings" | "profile";
  setPage: (page: "overview" | "agents" | "reports" | "company" | "billing" | "settings" | "profile") => void;
  activeCompanyId: string;
  setActiveCompanyId: Dispatch<SetStateAction<string>>;
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
<div className="mt-auto">
  <DropdownMenu>
    <DropdownMenuTrigger asChild className="w-full">
      <Button
        variant="ghost"
        className="w-full justify-between px-3 py-3 h-14 "> 
        <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left">
          <span className="text-sm font-medium">User Name</span>
          <span className="text-xs text-gray-500">email@example.com</span>
        </div>
        </div>
         <EllipsisVertical className="w-4 h-4 "/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="center"
      side="top"
      sideOffset={8}
      style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
    >
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
<DropdownMenuGroup>
  <DropdownMenuItem className="flex items-center gap-2" onClick={() => setPage("profile")}>
    <User className="h-4 w-4" />
    Profile
    <DropdownMenuShortcut />
  </DropdownMenuItem>
  <DropdownMenuItem
    className="flex items-center gap-2"
    onClick={() => setPage("billing")}>
    <CreditCard className="h-4 w-4" />
    Billing
    <DropdownMenuShortcut />
  </DropdownMenuItem>
  <DropdownMenuItem
    className="flex items-center gap-2"
    onClick={() => setPage("settings")}>
    <Settings className="h-4 w-4" />
    Settings
    <DropdownMenuShortcut />
  </DropdownMenuItem>
</DropdownMenuGroup>
<DropdownMenuSeparator />
<DropdownMenuItem variant="destructive" className="flex items-center gap-2"
  onClick={() => signOut()}>
  <LogOut className="h-4 w-4"/>
  Log out
        <DropdownMenuShortcut></DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
    </aside>
  );
}
