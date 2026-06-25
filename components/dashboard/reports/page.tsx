// app/dashboard/reports/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-neutral-900">Analytics & Reports</h2>
        <p className="text-neutral-500 max-w-2xl">Track agent performance, token consumption, and system health across your workspace.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-neutral-100/50 border border-neutral-200 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Agent Logs</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <ReportStat title="Total Requests" value="14,205" change="+8.2%" icon={<FileText />} />
            <ReportStat title="Avg Response Time" value="1.2s" change="-12%" icon={<TrendingUp />} />
            <ReportStat title="Error Rate" value="0.4%" change="+0.1%" icon={<BarChart3 />} />
          </div>
          <Card className="border-neutral-200 shadow-sm h-64 flex items-center justify-center bg-neutral-50/50">
            <p className="text-neutral-400 text-sm">Chart visualization placeholder</p>
          </Card>
        </TabsContent>
        <TabsContent value="agents" className="mt-6">
          <Card className="border-neutral-200 shadow-sm h-64 flex items-center justify-center bg-neutral-50/50">
            <p className="text-neutral-400 text-sm">Agent activity logs placeholder</p>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <Card className="border-neutral-200 shadow-sm h-64 flex items-center justify-center bg-neutral-50/50">
            <p className="text-neutral-400 text-sm">Token usage breakdown placeholder</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReportStat({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-neutral-500">{title}</CardTitle>
        <div className="p-2 bg-neutral-50 rounded-lg border border-neutral-100">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-neutral-900">{value}</div>
        <p className="text-xs text-neutral-500 mt-1">Last 30 days</p>
      </CardContent>
    </Card>
  );
}
