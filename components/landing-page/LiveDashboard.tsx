"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  BarChart3, 
  Layers, 
  GitBranch,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  MessageSquare,
  Cpu
} from "lucide-react";

// Dashboard data interface
interface DashboardData {
  agentStatus: Array<{ id: string; name: string; status: "online" | "processing" | "idle" | "error"; tasksCompleted: number; uptime: string }>;
  activityFeed: Array<{ id: string; agent: string; action: string; timestamp: string; type: "success" | "info" | "warning" | "exception" }>;
  workflowQueue: Array<{ id: string; name: string; progress: number; status: "active" | "pending" | "completed"; agents: string[] }>;
  pendingDecisions: Array<{ id: string; agent: string; decision: string; priority: "low" | "medium" | "high"; requestedAt: string }>;
  exceptionQueue: Array<{ id: string; agent: string; message: string; severity: "low" | "medium" | "high"; detectedAt: string }>;
  recentExecutions: Array<{ id: string; workflow: string; duration: string; status: "success" | "failed" | "partial"; executedAt: string }>;
  agentHealth: Record<string, { cpu: number; memory: number; responseTime: number }>;
  activeProcesses: number;
  systemLoad: number;
}

// AgentDemonstration data interface
interface AgentTask {
  id: string;
  name: string;
  task: string;
  findings: string;
  status: string;
}

interface DemonstrationData {
  workflowId: string;
  governingAnalysis: string;
  agents: AgentTask[];
  exceptions: Array<{ agentId: string; message: string; severity: "low" | "medium" | "high" }>;
  pending: Array<{ agentId: string; message: string; severity: "low" | "medium" | "high" }>;
  metrics: {
    workflows: number;
    confidence: number;
    activeAgents: number;
  };
  executiveSummary: string;
}

const typeColors: Record<string, string> = {
  success: "text-emerald-500 border-emerald-300 bg-emerald-50",
  info: "text-blue-500 border-blue-300 bg-blue-50",
  warning: "text-amber-500 border-amber-300 bg-amber-50",
  exception: "text-red-500 border-red-300 bg-red-50",
};

const statusColors: Record<string, string> = {
  online: "bg-emerald-500",
  processing: "bg-blue-500 animate-pulse",
  idle: "bg-gray-400",
  error: "bg-red-500 animate-pulse",
};

const priorityColors: Record<string, string> = {
  high: "text-red-600 bg-red-50 border-red-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low: "text-blue-600 bg-blue-50 border-blue-200",
};

const severityColors: Record<string, string> = {
  high: "bg-red-100 text-red-600 border-red-200",
  medium: "bg-amber-100 text-amber-600 border-amber-200",
  low: "bg-blue-100 text-blue-600 border-blue-200",
};

const statusBadgeColors: Record<string, string> = {
  active: "bg-blue-50 text-blue-600 border-blue-200",
  pending: "bg-gray-50 text-gray-600 border-gray-200",
  completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const executionStatusColors: Record<string, string> = {
  success: "text-emerald-500",
  failed: "text-red-500",
  partial: "text-amber-500",
};

// Default static data for when no demo is running
const defaultDashboardData: DashboardData = {
  agentStatus: [
    { id: "governing", name: "Governing Agent", status: "processing", tasksCompleted: 142, uptime: "99.97%" },
    { id: "sales", name: "Sales Agent", status: "online", tasksCompleted: 89, uptime: "99.95%" },
    { id: "marketing", name: "Marketing Agent", status: "online", tasksCompleted: 67, uptime: "99.92%" },
    { id: "cx", name: "CX Agent", status: "processing", tasksCompleted: 234, uptime: "99.98%" },
    { id: "finance", name: "Finance Agent", status: "online", tasksCompleted: 156, uptime: "99.96%" },
    { id: "operations", name: "Operations Agent", status: "idle", tasksCompleted: 78, uptime: "99.94%" },
    { id: "inventory", name: "Inventory Agent", status: "online", tasksCompleted: 45, uptime: "99.91%" },
    { id: "people", name: "People Agent", status: "online", tasksCompleted: 23, uptime: "99.90%" },
  ],
  activityFeed: [
    { id: "1", agent: "GOV", action: "Orchestrated workflow #4891 across 6 agents", timestamp: "14:32:07", type: "info" },
    { id: "2", agent: "CX", action: "Auto-resolved ticket #8847 — payment inquiry", timestamp: "14:31:54", type: "success" },
    { id: "3", agent: "FIN", action: "Flagged invoice INV-2026-0892 for review", timestamp: "14:31:42", type: "warning" },
    { id: "4", agent: "SALES", action: "Qualified lead from Acme Corp — $48K pipeline", timestamp: "14:31:28", type: "success" },
    { id: "5", agent: "OPS", action: "SLA breach risk detected for priority-2 ticket", timestamp: "14:31:15", type: "exception" },
    { id: "6", agent: "MKT", action: "Campaign variant-B launched to 4 channels", timestamp: "14:30:58", type: "success" },
  ],
  workflowQueue: [
    { id: "WF-4891", name: "Cross-functional lead qualification", progress: 75, status: "active", agents: ["sales", "marketing", "cx"] },
    { id: "WF-4890", name: "Monthly invoice reconciliation batch", progress: 45, status: "active", agents: ["finance", "operations"] },
    { id: "WF-4889", name: "Inventory reorder automation", progress: 100, status: "completed", agents: ["inventory", "finance"] },
    { id: "WF-4888", name: "Customer onboarding sequence", progress: 30, status: "active", agents: ["cx", "people", "operations"] },
  ],
  pendingDecisions: [
    { id: "DEC-142", agent: "Finance Agent", decision: "Approve $12.4K payment to vendor TechSupply Ltd — contract verified", priority: "medium", requestedAt: "14:30:22" },
    { id: "DEC-141", agent: "Operations Agent", decision: "Escalate SLA breach risk for enterprise client support tier", priority: "high", requestedAt: "14:28:15" },
  ],
  exceptionQueue: [
    { id: "EXC-023", agent: "Operations Agent", message: "Workflow timeout — task queue depth exceeded threshold (47/50)", severity: "medium", detectedAt: "14:31:42" },
    { id: "EXC-022", agent: "Inventory Agent", message: "Stock level anomaly — SKU-8842 usage rate deviates 23% from forecast", severity: "low", detectedAt: "14:29:08" },
  ],
  recentExecutions: [
    { id: "EXE-567", workflow: "WF-4889", duration: "2.3s", status: "success", executedAt: "14:30:45" },
    { id: "EXE-566", workflow: "WF-4887", duration: "1.8s", status: "success", executedAt: "14:29:12" },
    { id: "EXE-565", workflow: "WF-4886", duration: "0.4s", status: "partial", executedAt: "14:27:38" },
    { id: "EXE-564", workflow: "WF-4885", duration: "—", status: "failed", executedAt: "14:25:01" },
  ],
  agentHealth: {
    governing: { cpu: 34, memory: 52, responseTime: 120 },
    sales: { cpu: 45, memory: 38, responseTime: 95 },
    marketing: { cpu: 28, memory: 42, responseTime: 110 },
    cx: { cpu: 67, memory: 58, responseTime: 85 },
    finance: { cpu: 31, memory: 44, responseTime: 105 },
    operations: { cpu: 22, memory: 35, responseTime: 130 },
    inventory: { cpu: 18, memory: 28, responseTime: 145 },
    people: { cpu: 12, memory: 22, responseTime: 160 },
  },
  activeProcesses: 14,
  systemLoad: 47,
};

export default function LiveDashboard({ demoData }: { demoData?: DemonstrationData | null }) {
  // Use demo data if provided, otherwise use default data
  const [data, setData] = useState<DashboardData>(defaultDashboardData);

  useEffect(() => {
    if (demoData) {
      // Generate dashboard data from demonstration data
      const timestamp = new Date().toLocaleTimeString();
      
      // Generate activity feed from agent findings
      const activityFeed: DashboardData["activityFeed"] = demoData.agents.map((agent, index) => ({
        id: `ACT-${index + 1}`,
        agent: agent.id.toUpperCase(),
        action: agent.findings.substring(0, 80) + (agent.findings.length > 80 ? "..." : ""),
        timestamp: timestamp,
        type: agent.id === "inventory" && agent.findings.toLowerCase().includes("low") ? "warning" : "success"
      }));
      
      // Add governing agent activity
      activityFeed.unshift({
        id: "ACT-0",
        agent: "GOV",
        action: `Orchestrated workflow ${demoData.workflowId} across ${demoData.agents.length} agents`,
        timestamp: timestamp,
        type: "info"
      });
      
      // Generate pending decisions from exceptions
      const pendingDecisions = demoData.pending.map((ex, index) => ({
        id: `DEC-${100 + index}`,
        agent: ex.agentId,
        decision: ex.message,
        priority: ex.severity,
        requestedAt: timestamp
      }));
      
      // Generate exception queue
      const exceptionQueue = demoData.exceptions.map((ex, index) => ({
        id: `EXC-${100 + index}`,
        agent: ex.agentId,
        message: ex.message,
        severity: ex.severity,
        detectedAt: timestamp
      }));
      
      // Generate workflow queue
      const workflowQueue = [{
        id: demoData.workflowId,
        name: "Cross-functional workflow",
        progress: 100,
        status: "completed" as const,
        agents: demoData.agents.map(a => a.id)
      }];
      
      // Generate agent status
      const agentStatus = demoData.agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        status: "online" as const,
        tasksCompleted: Math.floor(Math.random() * 100) + 20,
        uptime: "99.95%"
      }));
      
      setData({
        agentStatus,
        activityFeed,
        workflowQueue,
        pendingDecisions,
        exceptionQueue,
        recentExecutions: data.recentExecutions,
        agentHealth: data.agentHealth,
        activeProcesses: demoData.agents.length,
        systemLoad: Math.floor(Math.random() * 30) + 20,
      });
    } else {
      setData(defaultDashboardData);
    }
  }, [demoData]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const agentIconMap: Record<string, React.FC<{ className?: string }>> = {
    governing: () => <Cpu className="w-4 h-4" />,
    sales: () => <Zap className="w-4 h-4" />,
    marketing: () => <MessageSquare className="w-4 h-4" />,
    cx: () => <CheckCircle2 className="w-4 h-4" />,
    finance: () => <DollarSign className="w-4 h-4" />,
    operations: () => <Layers className="w-4 h-4" />,
    inventory: () => <Package className="w-4 h-4" />,
    people: () => <Users className="w-4 h-4" />,
  };

  return (
    <section id="dashboard" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50/50 mb-6">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">Live Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Every Function.{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              One View.
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Real-time operational feed governed by the system you own. Not a report. Not a summary. A live dashboard.
          </p>
        </motion.div>

        {/* System Overview Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* System Status */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping opacity-50" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">System</div>
                  <div className="text-sm font-semibold text-emerald-600">Nominal</div>
                </div>
              </div>

              {/* Active Processes */}
              <div className="flex items-center gap-3">
                <GitBranch className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Workflows</div>
                  <div className="text-sm font-semibold text-blue-600">{data.activeProcesses} active</div>
                </div>
              </div>

              {/* System Load */}
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">System Load</div>
                  <div className="text-sm font-semibold text-purple-600">{data.systemLoad}%</div>
                </div>
              </div>

              {/* Clock */}
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">UTC Time</div>
                  <div className="text-sm font-semibold text-gray-700 font-mono">
                    {currentTime.toISOString().split("T")[1]?.substring(0, 8) || "00:00:00"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column — Agent Status + Activity Feed */}
          <div className="space-y-4 lg:col-span-2">
            
            {/* Agent Status Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Agent Status</span>
                </div>
                <RefreshCw className="w-3 h-3 text-gray-400 animate-spin" />
              </div>

              <div className="divide-y divide-gray-100">
                {data.agentStatus.map((agent) => {
                  const Icon = agentIconMap[agent.id] || Cpu;
                  return (
                    <div key={agent.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/50 transition-colors">
                      <span className={`h-2 w-2 rounded-full ${statusColors[agent.status]}`} />
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-700">{agent.name}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        agent.status === "online" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                        agent.status === "processing" ? "bg-blue-50 text-blue-600 border-blue-200" :
                        agent.status === "error" ? "bg-red-50 text-red-600 border-red-200" :
                        "bg-gray-50 text-gray-600 border-gray-200"
                      }`}>
                        {agent.status}
                      </span>
                      <span className="text-xs font-mono text-gray-500">{agent.tasksCompleted} tasks</span>
                      <span className="text-[10px] font-mono text-gray-400">{agent.uptime}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Live Activity Feed</span>
                </div>
                <span className="text-[10px] text-gray-400">{data.activityFeed.length} entries</span>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {data.activityFeed.map((entry) => (
                  <div key={entry.id} className={`flex items-start gap-14 px-4 py-2.5 border-l-2 ${typeColors[entry.type].split(" ")[0]}`}>
                    <span className="text-[10px] font-mono font-bold text-gray-500 shrink-0 w-8">{entry.agent}</span>
                    <p className="text-xs text-gray-600 flex-1 leading-relaxed">{entry.action}</p>
                    <span className="text-[9px] font-mono text-gray-400 shrink-0">{entry.timestamp}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Workflow Queue */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Workflow Queue</span>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {data.workflowQueue.map((wf) => (
                  <div key={wf.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-700">{wf.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${statusBadgeColors[wf.status]}`}>
                          {wf.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{wf.progress}%</span>
                    </div>
                    <p className="text-[11px] text-gray-600 mb-2">{wf.name}</p>
                    <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${wf.status === "completed" ? "bg-emerald-500" : wf.status === "active" ? "bg-blue-500" : "bg-gray-400"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${wf.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column — Decisions, Exceptions, Executions */}
          <div className="space-y-4">
            
            {/* Pending Decisions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-amber-200 bg-amber-50/30 overflow-hidden shadow-sm"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-100">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Pending Decisions</span>
                <span className="ml-auto text-xs font-mono text-amber-600">{data.pendingDecisions.length}</span>
              </div>

              <div className="divide-y divide-amber-100/50">
                {data.pendingDecisions.map((dec) => (
                  <div key={dec.id} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-gray-500">{dec.id}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${priorityColors[dec.priority]}`}>
                        {dec.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-1.5">{dec.decision}</p>
                    <span className="text-[9px] text-gray-400 font-mono">Requested at {dec.requestedAt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Exception Queue */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-red-200 bg-red-50/30 overflow-hidden shadow-sm"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-red-100">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Exception Queue</span>
                <span className="ml-auto text-xs font-mono text-red-600">{data.exceptionQueue.length}</span>
              </div>

              <div className="divide-y divide-red-100/50">
                {data.exceptionQueue.map((ex) => (
                  <div key={ex.id} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-gray-500">{ex.agent}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${severityColors[ex.severity]}`}>
                        {ex.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{ex.message}</p>
                    <span className="text-[9px] text-gray-400 font-mono mt-1 block">Detected at {ex.detectedAt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Executions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Recent Executions</span>
              </div>

              <div className="divide-y divide-gray-100">
                {data.recentExecutions.map((exe) => (
                  <div key={exe.id} className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50/50 transition-colors">
                    <span className={`text-xs font-mono ${executionStatusColors[exe.status]}`}>
                      {exe.status === "success" ? "✓" : exe.status === "failed" ? "✕" : "⚠"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-gray-500">{exe.workflow}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400">{exe.duration}</span>
                    <span className="text-[9px] font-mono text-gray-400">{exe.executedAt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Agent Health Quick View */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Agent Health</span>
              </div>

              <div className="space-y-2">
                {Object.entries(data.agentHealth).slice(0, 5).map(([id, health]) => (
                  <div key={id} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-gray-500 w-16 uppercase truncate">{id}</span>
                    <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden flex gap-0.5">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${health.cpu}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      <motion.div
                        className="h-full bg-purple-500/60"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${health.memory}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 w-10 text-right">{health.responseTime}ms</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-400 font-mono tracking-wider uppercase">
            // Not a report · Not a summary · A live operational feed
          </p>
        </motion.div>
      </div>
    </section>
  );
}