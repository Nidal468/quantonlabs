"use client"

import AgentsPage from "@/components/dashboard/agents/page"
import CompanyPage from "@/components/dashboard/company/page"
import { Header } from "@/components/dashboard/header"
import OverviewPage from "@/components/dashboard/overview/page"
import ReportsPage from "@/components/dashboard/reports/page"
import SettingsPage from "@/components/dashboard/settings/page"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardProvider } from "@/lib/hook/use-dashboard-context"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Dashboard() {
    const [selectedPage, setSelectedPage] = useState<"overview" | "agents" | "reports" | "company" | "billing" | "settings">("overview");
    return (
        <DashboardProvider>
            <div className="flex h-screen bg-neutral-50/50 font-sans text-neutral-900">
                <Sidebar setPage={setSelectedPage} activePage={selectedPage} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header currentPage={selectedPage}/>
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="max-w-6xl mx-auto w-full"
                        >
                            {selectedPage === "overview" && <OverviewPage />}
                            {selectedPage === "agents" && <AgentsPage />}
                            {selectedPage === "company" && <CompanyPage />}
                            {selectedPage === "reports" && <ReportsPage />}
                            {selectedPage === "settings" && <SettingsPage />}
                        </motion.div>
                    </main>
                </div>
            </div>
        </DashboardProvider>
    )
}