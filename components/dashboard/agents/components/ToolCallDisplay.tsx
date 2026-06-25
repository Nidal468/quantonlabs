"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Wrench, CheckCircle2, Loader2 } from "lucide-react";

interface ToolCallDisplayProps {
  toolCalls: NonNullable<import("@/model/message").IMessage["toolCalls"]>;
}

export function ToolCallDisplay({ toolCalls }: ToolCallDisplayProps) {
  const [expanded, setExpanded] = useState(false);

  if (!toolCalls?.length) return null;

  return (
    <div className="mt-3 space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
        aria-expanded={expanded}
      >
        {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        {toolCalls.length} tool{toolCalls.length > 1 ? "s" : ""} used
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pl-2 border-l-2 border-zinc-200">
              {toolCalls.map((tc) => (
                <ToolCallItem key={tc.id} toolCall={tc} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolCallItem({ toolCall }: { toolCall: NonNullable<import("@/model/message").IMessage["toolCalls"]>[number] }) {
  const isPending = toolCall.status === "pending";
  const isCompleted = toolCall.status === "completed";

  return (
    <div className="flex items-start gap-2 p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-xs">
      <div className="mt-0.5">
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
        ) : isCompleted ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <Wrench className="w-3.5 h-3.5 text-zinc-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-zinc-700">{toolCall.function.name}</div>
        <pre className="mt-1 p-2 bg-white rounded border border-zinc-200 font-mono text-zinc-600 overflow-x-auto">
          {JSON.stringify(JSON.parse(toolCall.function.arguments), null, 2)}
        </pre>
      </div>
    </div>
  );
}
