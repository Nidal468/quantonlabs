import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = React.memo(function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-3 rounded-lg border border-zinc-200">
            <table className="w-full border-collapse text-sm" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-zinc-50" {...props} />,
        th: ({ node, ...props }) => (
          <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-700 border-b border-zinc-200" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-3 py-2 text-zinc-800 border-b border-zinc-200 whitespace-normal break-words" {...props} />
        ),
        tr: ({ node, ...props }) => <tr className="hover:bg-zinc-50/50 transition-colors" {...props} />,
        pre: ({ node, ...props }) => (
          <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-xs overflow-x-auto my-3" {...props} />
        ),
        code: ({ node, className, children, ...props }) => {
          const isInline = !className?.includes("language-");
          return (
            <code className={cn(isInline ? "bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded text-xs" : "", className)} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
});
