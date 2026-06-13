// app/admin/page.tsx
"use client";

import { AgentPage } from "@/components/admin/components/AgentPage";
import { Sidebar } from "@/components/admin/components/Sidebar";
import { WorkspacePage } from "@/components/admin/components/WorkspacePage";
import { useState } from "react";

type Page = "workspaces" | "agents" | "overview" | "reports" | "finance" | "settings";

export default function AdminLayout() {
  const [activePage, setActivePage] = useState<Page>("workspaces");

  const renderContent = () => {
    switch (activePage) {
      case "workspaces":
        return <WorkspacePage />;
      case "agents":
        return <AgentPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400">
            <p className="text-sm">Under construction</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-neutral-50/50 font-sans text-neutral-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage your {activePage} and system configurations.
              </p>
            </div>
          </header>
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
