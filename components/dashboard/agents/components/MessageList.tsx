"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";
import { AiMessages } from "../agentChat";

interface MessageListProps {
    messages: AiMessages[];
    isStreaming: boolean;
    allMessagesCount: number;
    loadMore: () => void;
}

export function MessageList({ messages, isStreaming, allMessagesCount, loadMore }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const prevLengthRef = useRef(messages.length);

    const scrollToBottom = useCallback(() => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        });
    }, []);

    useEffect(() => {
        if (messages.length !== prevLengthRef.current) {
            scrollToBottom();
            prevLengthRef.current = messages.length;
        }
    }, [messages, scrollToBottom]);

    return (
        <ScrollArea className="flex-1 px-4 py-4 w-140 h-80 relative ">
            {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
                    <Bot className="h-10 w-10 mb-3 text-zinc-300" />
                    <p className="text-sm font-medium text-zinc-500">Start a conversation</p>
                    <p className="text-xs mt-1">Ask the agent anything to get started.</p>
                </div>
            ) : (
                <div className="w-full space-y-4 pb-4 z-50 relative">
                    <AnimatePresence initial={false} mode="popLayout">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                <MessageBubble message={msg} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isStreaming && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 max-w-3xl mx-auto"
                        >
                            <div className="bg-zinc-100 rounded-2xl rounded-tl-sm px-3 py-2 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" />
                            </div>
                        </motion.div>
                    )}

                    {allMessagesCount > 50 && (
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={loadMore}
                                className="text-xs text-zinc-500 hover:text-zinc-700 underline underline-offset-2 transition-colors"
                            >
                                Load older messages
                            </button>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            )}
        </ScrollArea>
    );
}
