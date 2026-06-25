"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import { IMessage } from "@/model/message";
import { AgentDocument } from "@/model/agent";
import { WorkspaceDocument } from "@/model/workspace";
import { AiMessages } from "@/components/dashboard/agents/agentChat";

const MAX_VISIBLE_MESSAGES = 50;

export function useAgentChat(agent: AgentDocument, workspace: WorkspaceDocument, userId: string) {
    const [messages, setMessages] = useState<AiMessages[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE_MESSAGES);
    const abortControllerRef = useRef<AbortController | null>(null);
    const visibleMessages = messages.slice(-visibleCount);

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + MAX_VISIBLE_MESSAGES, messages.length));
    }, [messages.length]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/message?workspaceId=${workspace._id}&agentId=${agent._id}`);
            const data = await res.json();
            setMessages(data.slice().reverse())
        })();
    }, []);

    const clearChat = useCallback(() => {
        setMessages([]);
        setVisibleCount(MAX_VISIBLE_MESSAGES);
        setError(null);
        toast.success("Chat cleared");
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isStreaming) return;

        const userMsg: AiMessages = {
            _id: crypto.randomUUID(),
            agentId: agent._id.toString(),
            workspaceId: workspace._id.toString(),
            role: "user",
            content,
            timestamp: new Date(),
            userId: userId,
            toolCalls: []
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsStreaming(true);
        setError(null);

        const assistantMsgId = crypto.randomUUID();
        const assistantMsg: AiMessages = {
            _id: assistantMsgId,
            agentId: agent._id.toString(),
            workspaceId: workspace._id.toString(),
            role: "assistant",
            content: "",
            toolCalls: [],
            timestamp: new Date(),
            userId: userId,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        abortControllerRef.current = new AbortController();

        const latestThree = messages.slice(-3);

        const context = latestThree.map(({ role, content }) => ({
            role,
            content,
        }));


        try {
            const res = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...userMsg, context }),
                signal: abortControllerRef.current.signal,
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            const reader = res.body?.getReader();
            if (!reader) throw new Error("No response body");

            const decoder = new TextDecoder();
            let buffer = "";
            let toolCallsBuffer: NonNullable<IMessage["toolCalls"]> = [];
            let reasoningBuffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n").filter(Boolean);

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const payload = line.slice(6);
                    if (payload === "[DONE]") break;

                    try {
                        const json = JSON.parse(payload);
                        const delta: { content?: string, reasoning?: string, tool_calls: any[] } = json.choices?.[0]?.delta;

                        if (delta?.content) {
                            buffer += delta.content;
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m._id === assistantMsgId as any ? { ...m, content: buffer } : m
                                )
                            );
                        }

                        if (delta?.reasoning) {
                            reasoningBuffer += delta.reasoning;
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m._id === assistantMsgId as any ? { ...m, reasoning: reasoningBuffer } : m
                                )
                            );
                        }

                        if (delta?.tool_calls) {
                            delta.tool_calls.forEach((tc: any) => {
                                if (tc.function?.name) {
                                    toolCallsBuffer.push({
                                        id: tc.id || crypto.randomUUID(),
                                        type: "function",
                                        function: {
                                            name: tc.function.name,
                                            arguments: tc.function.arguments || "{}",
                                        },
                                        status: "pending",
                                    });
                                }
                            });
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m._id === assistantMsgId as any ? { ...m, toolCalls: toolCallsBuffer } : m
                                )
                            );
                        }
                    } catch {
                        // Ignore malformed chunks
                    }
                }
            }

            // Mark tool calls as completed if no errors occurred
            setMessages((prev) =>
                prev.map((m) =>
                    m._id === assistantMsgId as any
                        ? { ...m, toolCalls: m.toolCalls?.map((tc) => ({ ...tc, status: "completed" as const })) }
                        : m
                )
            );
        } catch (err: any) {
            if (err.name === "AbortError") return;
            setError(err.message || "Failed to send message");
            toast.error("Message failed");
        } finally {
            setIsStreaming(false);
            abortControllerRef.current = null;
        }
    }, [agent._id, workspace._id, isStreaming]);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    return {
        messages: visibleMessages,
        allMessagesCount: messages.length,
        isStreaming,
        error,
        sendMessage,
        clearChat,
        loadMore,
    };
}
