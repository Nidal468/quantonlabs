"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "@/lib/context/user";

const breadcrumbs: Record<string, string> = {
  overview: "Overview",
  agents: "Agents",
  reports: "Reports",
  company: "Company Settings",
  billing: "Billing & Plans",
  settings: "User Settings",
};

interface HeaderProps {
  selectedPage: "overview" | "agents" | "reports" | "company" | "billing" | "settings";
  setSelectedPage: Dispatch<SetStateAction<"overview" | "agents" | "reports" | "company" | "billing" | "settings">>;
  activeCompanyId: string;
  setActiveCompanyId: Dispatch<SetStateAction<string>>;
}

export function Header({ selectedPage, setSelectedPage, activeCompanyId, setActiveCompanyId }: HeaderProps) {
  const { user } = useUser()
  const title = breadcrumbs[selectedPage];

  return (
    <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <Sidebar setPage={setSelectedPage} activePage={selectedPage} setActiveCompanyId={setActiveCompanyId} activeCompanyId={activeCompanyId} />
          </SheetContent>
        </Sheet>
        <h1 className="font-semibold text-neutral-900">{title}</h1>
      </div>

      <div className="hidden md:flex flex-col">
        <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
        <p className="text-xs text-neutral-500">
          {selectedPage === "overview" ? "Welcome back, here's what's happening." : "Manage your workspace and settings."}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-900">
          <Search size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-900 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </Button>
        <div className="h-6 w-px bg-neutral-200" />
        <Avatar className="w-8 h-8 border border-neutral-200">
          <AvatarImage src={user?.avatarUrl} alt={user?.username} />
          <AvatarFallback className="bg-neutral-100 text-neutral-700 text-xs font-medium">
            {user?.username?.charAt(0) || user?.email?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
