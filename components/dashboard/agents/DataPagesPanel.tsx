"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronRight, FileText, Database, Brain, MessageSquare, ClipboardCheck, Settings2, FolderOpen } from "lucide-react";
import { DataPageDocument } from "@/model/datapage";

interface DataPagesPanelProps {
  datapages: DataPageDocument[];
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  note: MessageSquare,
  memory: Brain,
  document: FileText,
  summary: FolderOpen,
  task: ClipboardCheck,
  system: Settings2,
};

const typeColors: Record<string, string> = {
  note: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  memory: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  document: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  summary: "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800",
  task: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  system: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
};

export default function DataPagesPanel({ datapages }: DataPagesPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openPageId, setOpenPageId] = useState<string | null>(null);

  if (!datapages || datapages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FolderOpen className="h-8 w-8 text-neutral-400 mb-3" />
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">No data pages found</p>
        <p className="text-xs text-neutral-500 mt-1">Upload files to create data pages for this agent.</p>
      </div>
    );
  }

  const filteredPages = datapages.filter((page) => {
    return (
      page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          placeholder="Search data pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white border-neutral-200"
        />
      </div>

      {/* Results count */}
      <p className="text-xs text-neutral-500">{filteredPages.length} of {datapages.length} pages</p>

      {/* Data Pages List */}
      <div className="space-y-2">
        {filteredPages.map((page) => {
          const IconComponent = typeIcons[page.type] || FileText;
          const colorClass = typeColors[page.type] || typeColors.document;
          const pageIdStr = page._id?.toString() || "";

          return (
            <div
              key={pageIdStr}
              className={`rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden transition-all ${
                openPageId === pageIdStr ? "ring-1 ring-neutral-300 dark:ring-neutral-600" : ""
              }`}
            >
              <button
                onClick={() => setOpenPageId(openPageId === pageIdStr ? null : pageIdStr)}
                className="w-full p-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-md shrink-0 ${colorClass.split(" ").slice(0, 2).join(" ")}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{page.title || page.slug}</p>
                      <p className="text-xs text-neutral-500 truncate">
                        {page.slug} · {new Date(page.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={colorClass}>
                      {page.type}
                    </Badge>
                    {openPageId === pageIdStr ? (
                      <ChevronDown className="h-4 w-4 text-neutral-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-neutral-500" />
                    )}
                  </div>
                </div>
              </button>

              {openPageId === pageIdStr && (
                <div className="border-t border-neutral-200 dark:border-neutral-700">
                  {/* Page metadata */}
                  <div className="p-3 space-y-2 bg-neutral-50 dark:bg-neutral-900/50 text-xs">
                    {page.tags && page.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {(page.tags as string[]).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {page.metadata && typeof page.metadata === "object" && (
                      <div className="text-neutral-600 dark:text-neutral-400">
                        <span className="font-medium">Importance:</span>{" "}
                        {(page.metadata as any)?.importance || "N/A"}
                      </div>
                    )}
                  </div>

                  {/* Chunks accordion */}
                  <ChunksAccordion pageId={pageIdStr} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Inner component to fetch and display chunks for a data page
function ChunksAccordion({ pageId }: { pageId: string }) {
  const [chunks, setChunks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openChunkIndex, setOpenChunkIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/datapage/${pageId}/chunks`)
      .then((res) => res.json())
      .then((data) => {
        setChunks(data.chunks || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [pageId]);

  if (loading) {
    return <div className="p-3 text-xs text-neutral-500">Loading chunks...</div>;
  }

  if (!chunks || chunks.length === 0) {
    return <div className="p-3 text-xs text-neutral-500">No chunks found for this page.</div>;
  }

  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
      {chunks.map((chunk: any, index: number) => (
        <div key={chunk._id || index} className="border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={() => setOpenChunkIndex(openChunkIndex === chunk.chunkIndex ? null : chunk.chunkIndex)}
            className="w-full p-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Chunk {chunk.chunkIndex}</span>
              <Badge variant="outline" className="text-[10px]">{(chunk.content?.length || 0).toLocaleString()} chars</Badge>
            </div>
          </button>
          {openChunkIndex === chunk.chunkIndex && (
            <div className="px-3 pb-3 pt-0 bg-neutral-50 dark:bg-neutral-900/50">
              <pre className="text-[10px] text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap font-mono max-h-48 overflow-auto p-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950">
                {chunk.content || chunk.text || "No content"}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}