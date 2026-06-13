"use client"

import AgentsPage from "@/components/dashboard/agents/page"
import CompanyPage from "@/components/dashboard/company/page"
import { Header } from "@/components/dashboard/header"
import OverviewPage from "@/components/dashboard/overview/page"
import ReportsPage from "@/components/dashboard/reports/page"
import SettingsPage from "@/components/dashboard/settings/page"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useWorkspace } from "@/lib/hook/useWorkspace"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [selectedPage, setSelectedPage] = useState<"overview" | "agents" | "reports" | "company" | "billing" | "settings">("overview");
    const [activeCompanyId, setActiveCompanyId] = useState<string>('');

    const {
        workspaces,
        isLoading,
        createWorkspace,
        deleteWorkspace,
    } = useWorkspace();

    useEffect(() => {
        if (!activeCompanyId && workspaces.length > 0) {
            setActiveCompanyId(workspaces[0]._id.toString());
        }
    }, [workspaces, activeCompanyId]);

    const activeCompany = workspaces.find((e) => e._id.toString() === activeCompanyId);

    return (
        <div className="flex h-screen bg-neutral-50/50 font-sans text-neutral-900">
            <Sidebar setPage={setSelectedPage} activePage={selectedPage} setActiveCompanyId={setActiveCompanyId} activeCompanyId={activeCompanyId} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header activeCompanyId={activeCompanyId} selectedPage={selectedPage} setActiveCompanyId={setActiveCompanyId} setSelectedPage={setSelectedPage} />
                {activeCompany && <main className="flex-1 overflow-auto p-6 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        {selectedPage === "overview" && <OverviewPage activeCompany={activeCompany} />}
                        {selectedPage === "agents" && <AgentsPage activeCompany={activeCompany}/>}
                        {selectedPage === "company" && <CompanyPage activeCompany={activeCompany} />}
                        {selectedPage === "reports" && <ReportsPage />}
                        {selectedPage === "settings" && <SettingsPage activeCompany={activeCompany} />}
                    </motion.div>
                </main>}
            </div>
        </div>
    )
}