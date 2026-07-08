"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Brain, Cpu, MessageSquare, CheckCircle2, AlertTriangle, Clock, Zap, Loader2, ChevronDown, ChevronUp } from "lucide-react";

// Types matching the OpenRouter response structure
interface AgentTask {
  id: string;
  name: string;
  task: string;
  findings: string;
  status: "pending" | "receiving" | "thinking" | "processing" | "reporting" | "completed";
  latency?: number;
  duration?: number;
}

// Dashboard-specific data structure
interface DashboardActivity {
  id: string;
  agent: string;
  action: string;
  timestamp: string;
  type: "success" | "info" | "warning" | "exception";
}

interface DashboardPendingDecision {
  id: string;
  agent: string;
  decision: string;
  priority: "low" | "medium" | "high";
  requestedAt: string;
}

interface DashboardException {
  id: string;
  agent: string;
  message: string;
  severity: "low" | "medium" | "high";
  detectedAt: string;
}

interface DashboardWorkflow {
  id: string;
  name: string;
  progress: number;
  status: "active" | "pending" | "completed";
  agents: string[];
}

interface DashboardAgentStatus {
  id: string;
  name: string;
  status: "online" | "processing" | "idle" | "error";
  tasksCompleted: number;
  uptime: string;
}

interface DashboardData {
  activityFeed: DashboardActivity[];
  pendingDecisions: DashboardPendingDecision[];
  exceptionQueue: DashboardException[];
  workflowQueue: DashboardWorkflow[];
  agentStatus: DashboardAgentStatus[];
}

interface Exception {
  agentId: string;
  message: string;
  severity: "low" | "medium" | "high";
}

interface DemonstrationData {
  workflowId: string;
  governingAnalysis: string;
  agents: AgentTask[];
  exceptions: Exception[];
  pending: Exception[];
  metrics: {
    workflows: number;
    confidence: number;
    activeAgents: number;
  };
  executiveSummary: string;
}

const presetRequests = [
  "Automate customer support for our e-commerce store with inventory tracking and sales reporting",
  "Streamline sales, inventory, and finance operations across three regional locations",
  "Build an AI-powered lead generation system that integrates with our CRM and marketing tools",
  "Create a complete operational dashboard for my growing team of 25 employees",
];

const agentIcons: Record<string, typeof Cpu> = {
  governing: Brain,
  sales: Zap,
  marketing: MessageSquare,
  cx: CheckCircle2,
  finance: CheckCircle2,
  operations: Cpu,
  inventory: Cpu,
  people: Cpu,
};

const statusColors: Record<string, string> = {
  pending: "text-gray-500 bg-gray-100 border-gray-200",
  receiving: "text-blue-600 bg-blue-50 border-blue-200 animate-pulse",
  thinking: "text-purple-600 bg-purple-50 border-purple-200",
  processing: "text-indigo-600 bg-indigo-50 border-indigo-200 animate-pulse",
  reporting: "text-amber-600 bg-amber-50 border-amber-200",
  completed: "text-emerald-600 bg-emerald-50 border-emerald-200",
};

const statusLabels: Record<string, string> = {
  pending: "Waiting",
  receiving: "Receiving Task",
  thinking: "Analyzing",
  processing: "Processing",
  reporting: "Reporting Back",
  completed: "Complete",
};

interface AgentDemonstrationProps {
  onDemoComplete?: (data: DemonstrationData) => void;
}

export default function AgentDemonstration({ onDemoComplete }: AgentDemonstrationProps) {
  const [userRequest, setUserRequest] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<DemonstrationData | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [agentStates, setAgentStates] = useState<Record<string, AgentTask["status"]>>({});
  const [progress, setProgress] = useState(0);
  const [showLog, setShowLog] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string) => {
    setActivityLog((prev) => [...prev, message]);
  }, []);

  // Auto-scroll log
  useState(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const requestText = selectedPreset || userRequest;
    if (!requestText) return;

    setIsRunning(true);
    setResult(null);
    setActivityLog([]);
    setCurrentPhase("Initializing...");
    setProgress(0);

    // Build the structured prompt for OpenRouter
    const systemPrompt = `You are Quanton OS, an AI operating system with eight coordinated agents. Given a business request, simulate how your governing agent distributes work across all functional agents and returns structured results.

CRITICAL: Your findings MUST be directly relevant to the user's request. Analyze the request carefully and assign context-specific tasks to each agent.

Return ONLY valid JSON matching this exact schema — no markdown, no explanation:

{
  "workflowId": "WF-XXXX",
  "governingAnalysis": "2-3 sentence analysis of the request from a governance perspective",
  "agents": [
    {
      "id": "governing",
      "name": "Governing Agent",
      "task": "Coordinate cross-agent workflow",
      "findings": "Summary of how the request was distributed across agents",
      "status": "completed"
    },
    {
      "id": "sales",
      "name": "Sales Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    },
    {
      "id": "marketing",
      "name": "Marketing Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    },
    {
      "id": "cx",
      "name": "CX Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    },
    {
      "id": "finance",
      "name": "Finance Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    },
    {
      "id": "operations",
      "name": "Operations Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    },
    {
      "id": "inventory",
      "name": "Inventory Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    },
    {
      "id": "people",
      "name": "People Agent",
      "task": "Specific task assigned to this agent based on the request",
      "findings": "Realistic, specific findings with numbers and business context directly related to the request",
      "status": "completed"
    }
  ],
  "exceptions": [
    {
      "agentId": "agent-id",
      "message": "Specific exception or escalation if any",
      "severity": "low|medium|high"
    }
  ],
  "pending": [
    {
      "agentId": "agent-id",
      "message": "Show alert or notifications or if any pending task",
      "severity": "low|medium|high"
    }
  ],
  "metrics": {
    "workflows": 12,
    "confidence": 94,
    "activeAgents": 8
  },
  "executiveSummary": "Concise executive summary with specific business insights and numbers"
}

IMPORTANT: 
- Return ONLY valid JSON. No markdown formatting. No code blocks. Just raw JSON.
- Make findings realistic and specific — use actual numbers, dollar amounts, percentages.
- Each agent's task and findings MUST be directly relevant to the user's request.
- For example, if user asks about social media DMs:
  - Marketing Agent: Plan automated DM campaigns for Facebook/Instagram
  - CX Agent: Set up conversation flows and automated responses
  - Operations Agent: Configure workflow triggers for DM handling
  - People Agent: Notify team about new automation
- For example, if user asks about low inventory:
  - Inventory Agent: Monitor stock levels and recommend vendors
  - People Agent: Alert team about low stock
  - Finance Agent: Prepare purchase order budget
- Include at least 1 exception if the request is complex.
- All 8 agents must have meaningful, context-specific tasks and findings.`;

    try {
      // Call OpenRouter API via our existing proxy endpoint
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: requestText },
          ],
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      console.log(data)
      // Start animation sequence with the returned data
      animateDemonstration(JSON.parse(data));
    } catch (error) {
      console.error("Demo error:", error);
      // Fallback to generated data on API failure
      const fallbackData = generateFallbackData(
        selectedPreset || userRequest
      );
      animateDemonstration(fallbackData);
    }
  };

  const animateDemonstration = (data: DemonstrationData) => {
    setCurrentPhase("Governing Agent analyzing request...");
    setProgress(10);
    addLog(`[${new Date().toLocaleTimeString()}] Workflow ${data.workflowId} initiated`);
    addLog(`GOV: Analyzing business request...`);

    setTimeout(() => {
      setCurrentPhase("Distributing tasks to functional agents...");
      setProgress(25);
      addLog(`GOV: Task distribution started — ${data.agents.length} agents notified`);

      // Start all agents in parallel with staggered timing
      data.agents.forEach((agent, index) => {
        const baseDelay = 300 + index * 100;

        setTimeout(() => {
          addLog(`${agent.id.toUpperCase()}: Task received — "${agent.task}"`);
          setAgentStates((prev) => ({ ...prev, [agent.id]: "receiving" }));
        }, baseDelay);

        setTimeout(() => {
          setAgentStates((prev) => ({ ...prev, [agent.id]: "thinking" }));
          addLog(`${agent.id.toUpperCase()}: Analyzing requirements...`);
        }, baseDelay + 400);

        setTimeout(() => {
          setAgentStates((prev) => ({ ...prev, [agent.id]: "processing" }));
          addLog(`${agent.id.toUpperCase()}: Processing — generating findings...`);
        }, baseDelay + 800);

        setTimeout(() => {
          setAgentStates((prev) => ({ ...prev, [agent.id]: "reporting" }));
          addLog(`${agent.id.toUpperCase()}: Compiling report...`);
        }, baseDelay + 1400);

        setTimeout(() => {
          setAgentStates((prev) => ({ ...prev, [agent.id]: "completed" }));
          const duration = Math.floor(Math.random() * 800) + 1200;
          addLog(`${agent.id.toUpperCase()}: Complete — ${duration}ms · ${agent.findings.substring(0, 50)}...`);
        }, baseDelay + 2000);
      });

      // Governing Agent collects reports
      setTimeout(() => {
        setCurrentPhase("Collecting agent reports...");
        setProgress(60);
        addLog(`GOV: All agents reporting — aggregating findings...`);
      }, 3500);

      // Executive summary
      setTimeout(() => {
        setCurrentPhase("Generating executive summary...");
        setProgress(80);
        addLog(`GOV: Generating unified response...`);
      }, 4200);

      // Complete
      setTimeout(() => {
        setCurrentPhase("Complete — Dashboard updated");
        setProgress(100);
        setResult(data);
        setIsRunning(false);
        addLog(`[${new Date().toLocaleTimeString()}] Workflow ${data.workflowId} complete`);
        addLog(`GOV: Executive summary generated · Confidence: ${data.metrics.confidence}%`);
        // Notify parent component of demo completion
        if (onDemoComplete) {
          onDemoComplete(data);
        }
      }, 4800);
    }, 600);
  };

  const handlePresetClick = (preset: string) => {
    setSelectedPreset(preset);
    setUserRequest("");
  };

  return (
    <section id="demonstration" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 mb-6">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">Interactive Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Watch It{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Orchestrate
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Type a business request below and watch eight AI agents coordinate in real time.
            This is what an AI operating system looks like in action.
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Preset buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {presetRequests.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${selectedPreset === preset
                      ? "bg-blue-50 border-blue-300 text-blue-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                >
                  {preset.length > 60 ? preset.substring(0, 60) + "..." : preset}
                </button>
              ))}
            </div>

            {/* Text input */}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={selectedPreset || userRequest}
                onChange={(e) => { setSelectedPreset(null); setUserRequest(e.target.value); }}
                placeholder="Describe what you want Quanton OS to do..."
                className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={isRunning || !userRequest && !selectedPreset}
                className={`px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${isRunning || !userRequest && !selectedPreset
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md shadow-blue-500/20"
                  }`}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Run Demo
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-gray-400 font-mono mt-2 text-center">{currentPhase}</p>
          </motion.div>
        )}

        {/* Agent Grid Visualization */}
        {isRunning && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto mb-8"
          >
            {/* Governing Agent — Always Center Top */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative px-8 py-4 rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-purple-50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">Governing Agent</h3>
                    <p className="text-xs text-gray-500">Coordinating · {result.agents.filter((a) => agentStates[a.id] === "completed").length}/{result.agents.length} complete</p>
                  </div>
                </div>
                {/* Connection lines to agents */}
                <div className="absolute -bottom-8 left-1/2 w-[2px] h-8 bg-gradient-to-b from-blue-300 to-transparent" />
              </motion.div>
            </div>

            {/* Agent Cards — Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {result.agents.filter((a) => a.id !== "governing").map((agent, i) => {
                const Icon = agentIcons[agent.id] || Cpu;
                const statusClass = statusColors[agentStates[agent.id] || "pending"];
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-xl border p-4 transition-all ${statusClass}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 opacity-80" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 font-semibold text-sm">{agent.name}</h4>
                        <span className={`text-[10px] uppercase tracking-wider ${statusClass.split(" ")[0]}`}>
                          {statusLabels[agentStates[agent.id] || "pending"]}
                        </span>
                      </div>
                    </div>

                    {/* Task */}
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{agent.task}</p>

                    {/* Findings — shown when completed */}
                    {agentStates[agent.id] === "completed" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 pt-3 border-t border-gray-200/50"
                      >
                        <p className="text-xs text-emerald-600 leading-relaxed">{agent.findings}</p>
                        {agent.latency && (
                          <div className="flex items-center gap-1 mt-2 text-[9px] text-gray-400 font-mono">
                            <Clock className="w-3 h-3" />
                            {agent.duration}ms
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Status indicator */}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium ${statusClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${agentStates[agent.id] === "completed" ? "bg-emerald-500" : agentStates[agent.id] === "processing" || agentStates[agent.id] === "thinking" ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`} />
                        {statusLabels[agentStates[agent.id] || "pending"]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Exceptions */}
            {result.exceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-600">Exceptions Detected</span>
                </div>
                {result.exceptions.map((ex, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${ex.severity === "high" ? "bg-red-100 text-red-600" :
                        ex.severity === "medium" ? "bg-amber-100 text-amber-600" :
                          "bg-blue-100 text-blue-600"
                      }`}>
                      {ex.agentId.toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-600">{ex.message}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Executive Summary */}
        {result && !isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <h3 className="text-gray-900 font-bold text-xl">Executive Summary</h3>
                <span className="ml-auto text-xs font-mono text-gray-400">{result.workflowId}</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{result.governingAnalysis}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-500">{result.metrics.activeAgents}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Active Agents</div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
                  <div className="text-2xl font-bold text-purple-500">{result.metrics.confidence}%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Confidence Score</div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-500">{result.metrics.workflows}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">APIS Called</div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm">
                <p className="text-gray-600 leading-relaxed">{result.executiveSummary}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Activity Log */}
        {activityLog.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setShowLog((p) => !p)}
              className="flex items-center gap-2 mx-auto text-xs text-gray-400 hover:text-gray-600 transition-colors mb-2"
            >
              {showLog ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              Activity Log ({activityLog.length} entries)
            </button>

            <AnimatePresence>
              {showLog && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-w-4xl mx-auto rounded-xl border border-gray-200 bg-white font-mono text-[10px] text-gray-500 p-4 max-h-64 overflow-y-auto shadow-sm">
                    {activityLog.map((log, i) => (
                      <div key={i} className="mb-1 last:mb-0">{log}</div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isRunning && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 mb-4">
              <Brain className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">
              Enter a business request above to see how Quanton OS orchestrates its agents.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Fallback data generator when API is unavailable
function generateFallbackData(request: string): DemonstrationData {
  const workflowId = `WF-${Math.floor(Math.random() * 9000) + 1000}`;
  const requestLower = request.toLowerCase();

  // Generate context-specific fallback data based on request keywords
  let marketingTask = "Design targeted campaign strategy";
  let marketingFindings = `Drafted campaign variant with ${Math.floor(Math.random() * 3) + 2} channel distribution. Estimated reach of ${Math.floor(Math.random() * 5000) + 1000} contacts. A/B testing configured for creative assets.`;

  let inventoryTask = "Monitor stock levels and reorder points";
  let inventoryFindings = `Current stock coverage at ${(Math.random() * 15 + 80).toFixed(0)}%. Triggered ${Math.floor(Math.random() * 3) + 1} purchase orders. Forecasted demand spike for next quarter with ${(Math.random() * 10 + 85).toFixed(0)}% confidence.`;

  let cxTask = "Optimize customer experience workflows";
  let cxFindings = `Processed ${Math.floor(Math.random() * 30) + 15} support interactions. CSAT maintained at ${(Math.random() * 0.6 + 4.4).toFixed(1)}/5.0. Auto-resolved ${Math.floor(Math.random() * 20) + 10} routine tickets.`;

  let peopleTask = "Assess team capacity and performance metrics";
  let peopleFindings = `Team utilization at ${(Math.random() * 10 + 75).toFixed(0)}%. Identified ${Math.floor(Math.random() * 3) + 1} resource gaps. Scheduled ${Math.floor(Math.random() * 4) + 2} performance reviews for upcoming cycle.`;

  // Context-aware fallbacks based on request
  if (requestLower.includes("social") || requestLower.includes("dm") || requestLower.includes("facebook") || requestLower.includes("instagram") || requestLower.includes("messaging")) {
    marketingTask = "Plan automated DM campaigns for Facebook/Instagram";
    marketingFindings = `Drafted campaign with 3 message variants. Auto-response configured for FAQ. Estimated 40% response rate improvement. Campaign launched to 2 channels.`;
    cxTask = "Set up conversation flows for social media";
    cxFindings = `Created 5 conversation branches. Auto-escalation for complex queries. CSAT target: 4.5/5.`;
    peopleTask = "Notify team about new automation";
    peopleFindings = `Team notified via Slack. Training scheduled for new DM workflow. 15 team members trained on new system.`;
  }

  if (requestLower.includes("inventory") || requestLower.includes("stock") || requestLower.includes("low") || requestLower.includes("reorder") || requestLower.includes("vendor")) {
    inventoryTask = "Monitor stock levels and recommend vendors";
    inventoryFindings = `Current stock coverage at ${(Math.random() * 10 + 15).toFixed(0)}% - LOW STOCK ALERT. Triggered 2 purchase orders. Recommended vendors: TechSupply Ltd (23% cost savings), GlobalParts Inc (fastest delivery).`;
    peopleTask = "Alert team about low stock";
    peopleFindings = `Team notified via email. 3 team members assigned to restock process. Priority order placed with recommended vendor.`;
  }

  return {
    workflowId,
    governingAnalysis: `Analyzed request: "${request.substring(0, 80)}...". Identified cross-functional requirements spanning multiple operational domains. Orchestrated coordinated response across the agent network.`,
    agents: [
      { id: "governing", name: "Governing Agent", task: "Coordinate cross-agent workflow", findings: `Distributed ${Math.floor(Math.random() * 5) + 4} tasks to functional agents. Detected 1 exception requiring attention. Generated unified executive summary.`, status: "completed" as const, latency: 2400, duration: 2400 },
      { id: "sales", name: "Sales Agent", task: "Analyze sales pipeline and identify revenue opportunities", findings: `Identified ${Math.floor(Math.random() * 15) + 8} high-intent leads worth approximately $${Math.floor(Math.random() * 60) + 30}K in pipeline. Prioritized follow-up sequences for top 5 prospects.`, status: "completed" as const, latency: 1800, duration: 1800 },
      { id: "marketing", name: "Marketing Agent", task: marketingTask, findings: marketingFindings, status: "completed" as const, latency: 2100, duration: 2100 },
      { id: "cx", name: "CX Agent", task: cxTask, findings: cxFindings, status: "completed" as const, latency: 1900, duration: 1900 },
      { id: "finance", name: "Finance Agent", task: "Review financial operations and compliance", findings: `Reconciled ${Math.floor(Math.random() * 50) + 20} invoices. Flagged $${Math.floor(Math.random() * 5) + 1}K in payment discrepancies. Generated monthly P&L projection with ${(Math.random() * 10 + 5).toFixed(1)}% growth estimate.`, status: "completed" as const, latency: 2200, duration: 2200 },
      { id: "operations", name: "Operations Agent", task: "Streamline operational workflows", findings: `Optimized ${Math.floor(Math.random() * 8) + 3} active workflows. Reduced average processing time by ${(Math.random() * 15 + 10).toFixed(0)}%. Updated SOP documentation for ${Math.floor(Math.random() * 5) + 2} processes.`, status: "completed" as const, latency: 2000, duration: 2000 },
      { id: "inventory", name: "Inventory Agent", task: inventoryTask, findings: inventoryFindings, status: "completed" as const, latency: 1700, duration: 1700 },
      { id: "people", name: "People Agent", task: peopleTask, findings: peopleFindings, status: "completed" as const, latency: 1600, duration: 1600 },
    ],
    exceptions: [
      { agentId: "inventory", message: `Stock level at ${(Math.random() * 10 + 15).toFixed(0)}% - below threshold. Purchase order required.`, severity: "high" as const },
    ],
    pending: [
      { agentId: "inventory", message: `Stock level at ${(Math.random() * 10 + 15).toFixed(0)}% - below threshold. Purchase order required.`, severity: "high" as const },
    ],
    metrics: {
      workflows: Math.floor(Math.random() * 10) + 8,
      confidence: Math.floor(Math.random() * 8) + 92,
      activeAgents: 8,
    },
    executiveSummary: `Quanton OS has processed your request across all eight operational domains. The system identified ${Math.floor(Math.random() * 20) + 15} actionable items with ${(Math.random() * 8) + 92}.toFixed(0)}% confidence. Key findings include revenue opportunities totaling approximately $${Math.floor(Math.random() * 80) + 40}K, ${Math.floor(Math.random() * 30) + 15} customer interactions resolved automatically, and operational efficiencies delivering an estimated ${(Math.random() * 10 + 10).toFixed(0)}% improvement in processing times. One exception has been flagged for your review. The system is ready to execute the coordinated action plan.`,
  };
}

// Generate dashboard data from demonstration data
function generateDashboardData(demoData: DemonstrationData): DashboardData {
  const timestamp = new Date().toLocaleTimeString();

  // Generate activity feed from agent findings
  const activityFeed: DashboardActivity[] = demoData.agents.map((agent, index) => ({
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

  // Generate pending decisions from exceptions and findings
  const pendingDecisions: DashboardPendingDecision[] = demoData.exceptions.map((ex, index) => ({
    id: `DEC-${100 + index}`,
    agent: ex.agentId,
    decision: ex.message,
    priority: ex.severity,
    requestedAt: timestamp
  }));

  // Generate exception queue
  const exceptionQueue: DashboardException[] = demoData.exceptions.map((ex, index) => ({
    id: `EXC-${100 + index}`,
    agent: ex.agentId,
    message: ex.message,
    severity: ex.severity,
    detectedAt: timestamp
  }));

  // Generate workflow queue
  const workflowQueue: DashboardWorkflow[] = [{
    id: demoData.workflowId,
    name: "Cross-functional workflow",
    progress: 100,
    status: "completed",
    agents: demoData.agents.map(a => a.id)
  }];

  // Generate agent status
  const agentStatus: DashboardAgentStatus[] = demoData.agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    status: "online",
    tasksCompleted: Math.floor(Math.random() * 100) + 20,
    uptime: "99.95%"
  }));

  return {
    activityFeed,
    pendingDecisions,
    exceptionQueue,
    workflowQueue,
    agentStatus
  };
}
