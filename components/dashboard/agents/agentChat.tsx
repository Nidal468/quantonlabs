"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AgentDocument } from "@/model/agent";
import { useAgentChat } from "@/lib/hook/useAgentChat";
import { MessageList } from "./components/MessageList";
import { WorkspaceDocument } from "@/model/workspace";
import { useUser } from "@/lib/context/user";
import { getAgentIcon } from "./selectedAgent";

interface AgentChatPanelProps {
    agent: AgentDocument;
    activeCompany: WorkspaceDocument;
    onClose: () => void;
}

export type AiMessages = {
    _id: string;
    agentId: string;
    userId: string;
    workspaceId: string;

    role: "user" | "assistant" | "system";

    content: string;

    // Optional reasoning trace (for agent transparency / debugging / evals)
    reasoning?: string;

    // Tool calls made by the agent (function calling / tool use)
    toolCalls: {
        id: string;
        type: string;
        function: {
            name: string;
            arguments: string;
        };
        status: "pending" | "completed" | "error" | "running";
    }[];

    // Optional structured metadata for observability / analytics
    metadata?: {
        model?: string;
        latencyMs?: number;
        tokensUsed?: number;
        error?: string;
    };

    timestamp: Date;
}

export default function AgentChatPanel({ agent, activeCompany , onClose}: AgentChatPanelProps) {
    const user = useUser()
    const { messages, allMessagesCount, isStreaming, error, sendMessage, clearChat, loadMore } = useAgentChat(agent, activeCompany, user.user?._id.toString() || "");
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const AgentIcon = getAgentIcon(agent.icon);

    const handleSendMessage = useCallback(() => {
        if (!inputValue.trim() || isStreaming) return;
        sendMessage(inputValue);
        setInputValue("");
        textareaRef.current?.focus();
    }, [inputValue, isStreaming, sendMessage]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }, [inputValue]);

    return (
        <div className="flex flex-col h-full bg-linear-to-r from-purple-700 via-purple-500 to-sky-600 w-full border border-zinc-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50 h-20">
                <div className="flex items-center gap-3">
                    <Button className="h-10 w-10">
                        <AgentIcon size={16} />
                    </Button>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900">{agent.name}</h3>
                        <p className="text-xs text-zinc-500">AI Agent</p>
                    </div>
                </div>
                <Button onClick={onClose}>
                    <h1>Back</h1>
                    <ChevronRight size={14}/>
                </Button>
            </div>

            {/* Messages */}
            <MessageList
                messages={messages}
                isStreaming={isStreaming}
                allMessagesCount={allMessagesCount}
                loadMore={loadMore}
            />

            {/* Input */}
            <div className="p-4 border-t border-zinc-100 bg-white">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs"
                    >
                        {error}
                    </motion.div>
                )}
                <div className="relative flex items-end gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200/50 transition-all">
                    <Textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message ${agent.name}...`}
                        className="min-h-11 max-h-40 flex-1 resize-none border-0 bg-transparent p-0 text-sm placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                        disabled={isStreaming}
                        aria-label="Chat message input"
                    />
                    <Button
                        size="icon"
                        className="h-9 w-9 shrink-0 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isStreaming}
                        aria-label="Send message"
                    >
                        {isStreaming ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                <Send className="h-4 w-4" />
                            </motion.div>
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
