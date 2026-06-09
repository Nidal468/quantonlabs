// app/dashboard/overview/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, Users, Bot, Zap } from "lucide-react";
import { format } from "date-fns";
import { useDashboard } from "@/lib/hook/use-dashboard-context";

export default function OverviewPage() {
  const { activeCompany } = useDashboard();
  if (!activeCompany) return <div className="text-center py-20 text-neutral-500">No workspace selected</div>;

  const tokenUsage = Math.round((activeCompany.monthlyTokenUsed / activeCompany.monthlyTokenLimit) * 100);

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Monthly Token Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold text-neutral-900">
                {activeCompany.monthlyTokenUsed.toLocaleString()}
              </span>
              <span className="text-sm text-neutral-500">/ {activeCompany.monthlyTokenLimit.toLocaleString()}</span>
            </div>
            <Progress value={tokenUsage} className="h-2 bg-neutral-100" />
            <p className="mt-2 text-xs text-neutral-500">
              {tokenUsage}% used • {activeCompany.subscriptionEndsAt ? `Resets ${format(new Date(activeCompany.subscriptionEndsAt || new Date()), "MMM d, yyyy")}` : "End of trial"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Active Agents</CardTitle>
          </CardHeader>
          {/* <CardContent>
            <div className="space-y-3">
              {activeCompany.agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-neutral-200 rounded flex items-center justify-center">
                      <Bot size={16} className="text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{agent.name}</p>
                      <p className="text-xs text-neutral-500">Last active: {agent.lastActive}</p>
                    </div>
                  </div>
                  <Badge variant={agent.status === "active" ? "default" : "secondary"} className="capitalize">
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent> */}
        </Card>
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
