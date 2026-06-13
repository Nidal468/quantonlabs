// app/dashboard/overview/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Bot, Zap } from "lucide-react";
import { format } from "date-fns";
import { WorkspaceDocument } from "@/model/workspace";

export default function OverviewPage({ activeCompany }: { activeCompany: WorkspaceDocument }) {

  if (!activeCompany) return <div className="text-center py-20 text-neutral-500">No workspace selected</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Active Agents"
          value={activeCompany.agents.length.toString()}
          change="+12%"
          trend="up"
          icon={<Bot className="text-neutral-600" />}
        />
        <StatCard
          title="Team Members"
          value={activeCompany.members.length.toString()}
          change="+2"
          trend="up"
          icon={<Users className="text-neutral-600" />}
        />
        <StatCard
          title="Current Plan"
          value={activeCompany.plan.charAt(0).toUpperCase() + activeCompany.plan.slice(1)}
          change={activeCompany.subscriptionStatus === "active" ? "Renewed" : "Trial"}
          trend={activeCompany.subscriptionStatus === "active" ? "up" : "down"}
          icon={<Zap className="text-neutral-600" />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon }: { title: string; value: string; change: string; trend: "up" | "down"; icon: React.ReactNode }) {
  return (
    <Card className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-neutral-500">{title}</CardTitle>
        <div className="p-2 bg-neutral-50 rounded-lg border border-neutral-100">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-neutral-900">{value}</span>
          <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
