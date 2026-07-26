// app/dashboard/reports/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { WorkspaceDocument } from "@/model/workspace";
import { useTask } from "@/lib/hook/useTask";
import { TaskStatus, TaskPriority } from "@/model/task";
import { FileText, TrendingUp, AlertCircle, CheckCircle2, Loader2, Users } from "lucide-react";
import { useAgent } from "@/lib/hook/useAgent";
import { useMemo } from "react";

export default function ReportsPage({ activeCompany }: {
  activeCompany: WorkspaceDocument
}) {
  const { agents } = useAgent();

  const workspaceId = activeCompany._id;
  // Get active agents from the company/workspace
  const activeAgents = activeCompany.agents?.filter(a => a.status) || [];

  // Single hook call per workspace - fetch all tasks, then group by agent
  const { tasks: allTasks, isLoading: isTasksLoading, error: tasksError } = useTask(undefined, String(workspaceId));

  // Group tasks by agent (client-side filtering)
  const agentTaskMap = useMemo(() => {
    return activeAgents.map((agent) => ({
      agent,
      tasks: allTasks.filter((t) => String(t.agentId) === String(agent.id)),
    }));
  }, [activeAgents, allTasks]);

  // Calculate analytics from real data
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter((t) => t.status === "completed").length,
    failed: allTasks.filter((t) => t.status === "failed").length,
    running: allTasks.filter((t) => t.status === "running").length,
    queued: allTasks.filter((t) => t.status === "queued").length,
    cancelled: allTasks.filter((t) => t.status === "cancelled").length,
  };

  // Calculate completion rate
  const completionRate = stats.total > 0
    ? ((stats.completed / stats.total) * 100).toFixed(1)
    : "0.0";

  // Calculate error rate
  const errorRate = stats.total > 0
    ? ((stats.failed / stats.total) * 100).toFixed(1)
    : "0.0";

  // Priority distribution
  const priorityCounts = {
    urgent: allTasks.filter(t => t.priority === "urgent").length,
    high: allTasks.filter(t => t.priority === "high").length,
    medium: allTasks.filter(t => t.priority === "medium").length,
    low: allTasks.filter(t => t.priority === "low").length,
  };

  // Status color helper
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "running": return "bg-blue-500";
      case "failed": return "bg-red-500";
      case "queued": return "bg-yellow-500";
      case "cancelled": return "bg-gray-400";
      case "retrying": return "bg-orange-500";
      default: return "bg-gray-300";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-700 border-red-200";
      case "high": return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isTasksLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-neutral-500">Loading reports...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-neutral-900">Analytics & Reports</h2>
        <p className="text-neutral-500 text-sm">Track agent performance, task status, and system health for {activeCompany.name || "this workspace"}.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-neutral-100/50 border border-neutral-200 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Agent Logs</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Tasks</TabsTrigger>
        </TabsList>

        {/* ==================== OVERVIEW TAB ==================== */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReportStat
              title="Total Requests"
              value={stats.total.toString()}
              change={`+${activeAgents.length} agents`}
              icon={<FileText className="h-4 w-4 text-primary" />}
              color="bg-blue-50"
            />
            <ReportStat
              title="Completed Tasks"
              value={stats.completed.toString()}
              change={`${completionRate}% rate`}
              icon={<CheckCircle2 className="h-4 w-4 text-green-600" />}
              color="bg-green-50"
            />
            <ReportStat
              title="Avg Response Time"
              value={stats.total > 0 ? "N/A" : "--"}
              change="No data"
              icon={<TrendingUp className="h-4 w-4 text-purple-600" />}
              color="bg-purple-50"
            />
            <ReportStat
              title="Error Rate"
              value={`${errorRate}%`}
              change={`${stats.failed} failed`}
              icon={<AlertCircle className="h-4 w-4 text-red-600" />}
              color="bg-red-50"
            />
          </div>

          {/* Status Distribution Bar */}
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-700">Task Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.total === 0 ? (
                <p className="text-neutral-400 text-sm text-center py-8">No tasks found for this workspace.</p>
              ) : (
                <div className="space-y-4">
                  {/* Visual bar */}
                  <div className="flex h-6 rounded-full overflow-hidden gap-1">
                    {stats.completed > 0 && (
                      <div style={{ width: `${(stats.completed / stats.total) * 100}%` }} className="bg-green-500 transition-all" title={`Completed: ${stats.completed}`} />
                    )}
                    {stats.running > 0 && (
                      <div style={{ width: `${(stats.running / stats.total) * 100}%` }} className="bg-blue-500 transition-all" title={`Running: ${stats.running}`} />
                    )}
                    {stats.queued > 0 && (
                      <div style={{ width: `${(stats.queued / stats.total) * 100}%` }} className="bg-yellow-500 transition-all" title={`Queued: ${stats.queued}`} />
                    )}
                    {stats.failed > 0 && (
                      <div style={{ width: `${(stats.failed / stats.total) * 100}%` }} className="bg-red-500 transition-all" title={`Failed: ${stats.failed}`} />
                    )}
                    {stats.cancelled > 0 && (
                      <div style={{ width: `${(stats.cancelled / stats.total) * 100}%` }} className="bg-gray-400 transition-all" title={`Cancelled: ${stats.cancelled}`} />
                    )}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-600">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500" /> Completed ({stats.completed})</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-500" /> Running ({stats.running})</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-500" /> Queued ({stats.queued})</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500" /> Failed ({stats.failed})</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gray-400" /> Cancelled ({stats.cancelled})</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Priority Distribution */}
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-700">Priority Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.total === 0 ? (
                <p className="text-neutral-400 text-sm text-center py-8">No priority data available.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Urgent", count: priorityCounts.urgent, color: "bg-red-500" },
                    { label: "High", count: priorityCounts.high, color: "bg-orange-500" },
                    { label: "Medium", count: priorityCounts.medium, color: "bg-yellow-500" },
                    { label: "Low", count: priorityCounts.low, color: "bg-green-500" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                      <span className="text-sm text-neutral-600">{item.label}</span>
                      <Badge variant="outline" className={`${getPriorityColor(item.label.toLowerCase() as TaskPriority)} font-semibold`}>
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== AGENT LOGS TAB ==================== */}
        <TabsContent value="agents" className="mt-6">
          {activeAgents.length === 0 ? (
            <Card className="border-neutral-200 shadow-sm">
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500 text-sm">No active agents found for this workspace.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {agentTaskMap.map(({ agent, tasks }) => {
                const agentCompleted = tasks.filter(t => t.status === "completed").length;
                const agentFailed = tasks.filter(t => t.status === "failed").length;
                const agentRunning = tasks.filter(t => t.status === "running").length;
                const agentRate = tasks.length > 0
                  ? ((agentCompleted / tasks.length) * 100).toFixed(1)
                  : "0.0";
                const selectedAgent = agents.find((e) => e._id.toString() === agent.id.toString());

                return (
                  <Card key={agent.id.toString()} className="border-neutral-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-neutral-900">
                          {selectedAgent?.name}
                        </CardTitle>
                        <Badge variant={agent.status ? "default" : "secondary"} className={agent.status ? "bg-green-100 text-green-700 border-green-200" : ""}>
                          {agent.status ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {agent.activeSkillIds && agent.activeSkillIds.length > 0 && (
                        <p className="text-xs text-neutral-500">Skills: {agent.activeSkillIds.join(", ")}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-neutral-50 rounded-lg">
                          <p className="text-lg font-bold text-neutral-900">{tasks.length}</p>
                          <p className="text-xs text-neutral-500">Total</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <p className="text-lg font-bold text-green-700">{agentCompleted}</p>
                          <p className="text-xs text-neutral-500">Done</p>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded-lg">
                          <p className="text-lg font-bold text-red-700">{agentFailed}</p>
                          <p className="text-xs text-neutral-500">Failed</p>
                        </div>
                      </div>

                      {/* Mini status bar */}
                      {tasks.length > 0 && (
                        <>
                          <div className="flex h-2 rounded-full overflow-hidden bg-neutral-100 mb-2">
                            {agentCompleted > 0 && (
                              <div style={{ width: `${(agentCompleted / tasks.length) * 100}%` }} className="bg-green-500" />
                            )}
                            {agentRunning > 0 && (
                              <div style={{ width: `${(agentRunning / tasks.length) * 100}%` }} className="bg-blue-500" />
                            )}
                            {agentFailed > 0 && (
                              <div style={{ width: `${(agentFailed / tasks.length) * 100}%` }} className="bg-red-500" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">Completion rate: {agentRate}%</p>
                        </>
                      )}

                      {/* Recent tasks */}
                      {tasks.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-medium text-neutral-600">Recent Tasks</p>
                          {tasks.slice(0, 3).map(task => (
                            <div key={String(task._id)} className="flex items-center justify-between text-xs p-2 rounded bg-neutral-50 border border-neutral-100">
                              <span className="text-neutral-700 truncate max-w-[60%]">{task.title}</span>
                              <Badge variant="outline" className={`${getStatusColor(task.status as TaskStatus)} text-white border-none capitalize px-1.5 py-0.5`}>
                                {task.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ==================== TASKS TAB ==================== */}
        <TabsContent value="tasks" className="mt-6">
          {allTasks.length === 0 ? (
            <Card className="border-neutral-200 shadow-sm">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500 text-sm">No tasks found for this workspace.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-neutral-200 shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-neutral-900">All Tasks ({allTasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Task</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Agent</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Priority</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTasks.map(task => {
                        const taskAgent = agentTaskMap.find(at => at.tasks.some(t => String(t._id) === String(task._id)));
                        return (
                          <tr key={String(task._id)} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                            <td className="py-3 px-4 text-neutral-800 font-medium truncate max-w-[200px]">{task.title}</td>
                            <td className="py-3 px-4 text-neutral-600">
                              {taskAgent?.agent.id.toString().slice(-6) || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className={`${getStatusColor(task.status as TaskStatus)} text-white border-none capitalize`}>
                                {task.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className={`${getPriorityColor(task.priority as TaskPriority)} font-semibold capitalize`}>
                                {task.priority}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-neutral-500 text-xs">
                              {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "N/A"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ─── Sub-components ─── */

function ReportStat({
  title,
  value,
  change,
  icon,
  color = "bg-neutral-50",
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-neutral-500">{title}</CardTitle>
        <div className={`p-2 ${color} rounded-lg border`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-neutral-900">{value}</div>
        <p className="text-xs text-neutral-500 mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}