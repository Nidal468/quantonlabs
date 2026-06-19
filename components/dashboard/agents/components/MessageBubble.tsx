"use client";

import { memo, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ToolCallDisplay } from "./ToolCallDisplay";
import { cn } from "@/lib/utils";
import { AiMessages } from "../agentChat";

interface MessageBubbleProps {
    message: AiMessages;
}

export const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";
    const hasReasoning = !!message.reasoning;
    const [isReasoningExpanded, setIsReasoningExpanded] = useState(false);

    return (
        <div className={cn("flex items-start gap-3 w-full", isUser ? "flex-row-reverse" : "flex-row")}>
            <Avatar className="h-8 w-8 shrink-0 border border-zinc-200">
                <AvatarFallback className={cn("text-xs", isUser ? "bg-zinc-100 text-zinc-700" : "bg-zinc-900 text-white")}>
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
            </Avatar>

            <div className={cn("flex flex-col items-start w-120", isUser ? "items-end" : "items-start")}>
                {hasReasoning && (
                    <div className="mb-3 w-full">
                        <button
                            type="button"
                            onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                            className={cn(
                                "flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-700 transition-colors px-2 py-1.5 rounded-md hover:bg-zinc-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2",
                                isUser ? "ml-auto" : "mr-auto"
                            )}
                            aria-expanded={isReasoningExpanded}
                            aria-controls={`reasoning-${message._id}`}
                            aria-label={isReasoningExpanded ? "Collapse reasoning" : "Expand reasoning"}
                        >
                            {isReasoningExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            <Brain className="h-3.5 w-3.5" />
                            Reasoning
                        </button>
                        {isReasoningExpanded && (
                            <div
                                id={`reasoning-${message._id}`}
                                className={cn(
                                    "mt-2 p-3 rounded-lg border text-xs leading-relaxed bg-zinc-100/60 text-zinc-600",
                                    isUser ? "border-zinc-200" : "border-zinc-200"
                                )}
                            >
                                <MarkdownRenderer content={message.reasoning!} />
                            </div>
                        )}
                    </div>
                )}

                <div
                    className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                        isUser
                            ? "bg-zinc-900/80 text-white rounded-tr-sm"
                            : "bg-zinc-50/80 text-zinc-800 border border-zinc-100 rounded-tl-sm"
                    )}
                >
                    <MarkdownRenderer content={message.content} />
                </div>

                {message.toolCalls && message.toolCalls.length > 0 && (
                    <div className={cn("mt-2 w-full", isUser ? "items-end" : "items-start")}>
                        <ToolCallDisplay toolCalls={message.toolCalls} />
                    </div>
                )}
            </div>
        </div>
    );
});