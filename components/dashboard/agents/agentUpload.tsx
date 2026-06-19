// app/(dashboard)/agent/components/AgentUpload.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AgentDocument } from "@/model/agent";
import { AlertCircle, ArrowRight, ChevronLeft, File, FileCode, FileSpreadsheet, FileText, Loader2, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkspaceDocument } from "@/model/workspace";
import { FileContent, ParsedFile, parseDocx, parsePdf, parseSpreadsheet, parseText } from "@/lib/fileParser";

interface ImportDataModalProps {
  agent: AgentDocument;
  activeCompany: WorkspaceDocument;
}

type Phase = "upload" | "review";

const fileIcons: Record<string, React.FC<{ className?: string }>> = {
  spreadsheet: FileSpreadsheet,
  pdf: FileCode,
  docx: FileText,
  text: FileText,
  unknown: File,
};

export default function AgentUpload({ agent, activeCompany }: ImportDataModalProps) {
  const [files, setFiles] = useState<ParsedFile[]>([]);
  const [phase, setPhase] = useState<Phase>("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfjsLib, setPdfjsLib] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFiles([]);
      setPhase("upload");
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let mounted = true;
    const loadPdf = async () => {
      if (pdfjsLib) return;
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        if (mounted) setPdfjsLib(pdfjs);
      } catch (err) {
        console.error("Failed to load PDF.js", err);
      }
    };
    loadPdf();
    return () => { mounted = false; };
  }, [pdfjsLib]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = async (newFiles: File[]) => {
    const parsed: ParsedFile[] = [];
    for (const file of newFiles) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let type: ParsedFile["type"] = "unknown";
      let content: FileContent | null = null;

      try {
        if (["xlsx", "xls", "csv"].includes(ext || "")) {
          type = "spreadsheet";
          content = await parseSpreadsheet(file);
        } else if (ext === "pdf") {
          type = "pdf";
          if (!pdfjsLib) throw new Error("PDF.js not loaded yet");
          content = await parsePdf(file, pdfjsLib);
        } else if (ext === "docx") {
          type = "docx";
          content = await parseDocx(file);
        } else if (["txt", "md", "json", "xml", "html", "css", "js", "ts", "py", "java", "c", "cpp", "go", "rs", "rb", "php", "sql", "yaml", "yml", "toml", "ini", "cfg", "conf", "log", "sh", "bash", "zsh", "bat", "ps1"].includes(ext || "")) {
          type = "text";
          content = await parseText(file);
        }
      } catch (err: any) {
        content = null;
        console.error(`Failed to parse ${file.name}:`, err);
      }

      if (content) {
        parsed.push({
          file,
          type,
          content,
          selectedSheets: new Set(content.type === "spreadsheet" ? content.sheets.map((s) => s.name) : []),
          selectedPages: new Set(content.type === "pdf" ? content.pages.map((p) => p.index) : []),
          status: "ready",
        });
      }
    }

    if (parsed.length > 0) {
      setFiles((prev) => [...prev, ...parsed]);
      setPhase("review");
    }
  };

  const toggleSheet = (fileIndex: number, sheetName: string) => {
    setFiles((prev) =>
      prev.map((f, i) => {
        if (i !== fileIndex || f.content.type !== "spreadsheet") return f;
        const newSet = new Set(f.selectedSheets);
        if (newSet.has(sheetName)) newSet.delete(sheetName);
        else newSet.add(sheetName);
        return { ...f, selectedSheets: newSet };
      })
    );
  };

  const togglePage = (fileIndex: number, pageIndex: number) => {
    setFiles((prev) =>
      prev.map((f, i) => {
        if (i !== fileIndex || f.content.type !== "pdf") return f;
        const newSet = new Set(f.selectedPages);
        if (newSet.has(pageIndex)) newSet.delete(pageIndex);
        else newSet.add(pageIndex);
        return { ...f, selectedPages: newSet };
      })
    );
  };

  const selectAllSheets = (fileIndex: number, select: boolean) => {
    setFiles((prev) =>
      prev.map((f, i) => {
        if (i !== fileIndex || f.content.type !== "spreadsheet") return f;
        return { ...f, selectedSheets: select ? new Set(f.content.sheets.map((s) => s.name)) : new Set() };
      })
    );
  };

  const selectAllPages = (fileIndex: number, select: boolean) => {
    setFiles((prev) =>
      prev.map((f, i) => {
        if (i !== fileIndex || f.content.type !== "pdf") return f;
        return { ...f, selectedPages: select ? new Set(f.content.pages.map((p) => p.index)) : new Set() };
      })
    );
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.file.name !== name));
  };

  const buildPayload = (file: ParsedFile) => {
    let data = file.content;
    if (file.content.type === "spreadsheet") {
      data = {
        type: "spreadsheet",
        sheets: file.content.sheets.filter((s) => file.selectedSheets.has(s.name)),
      };
    } else if (file.content.type === "pdf") {
      data = {
        type: "pdf",
        pages: file.content.pages.filter((p) => file.selectedPages.has(p.index)),
      };
    }

    return {
      agentId: agent._id,
      workspaceId: activeCompany._id,
      title: file.file.name.replace(/\.[^/.]+$/, ""),
      slug: file.file.name.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").substring(0, 50),
      type: "document",
      content: {
        type: file.type,
        data,
      },
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      for (const file of files) {
        if (file.status === "success") continue;

        setFiles((prev) => prev.map((f) => (f.file.name === file.file.name ? { ...f, status: "uploading" } : f)));

        const payload = buildPayload(file);
        const res = await fetch("/api/datapage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Failed to import ${file.file.name}`);
        }

        setFiles((prev) => prev.map((f) => (f.file.name === file.file.name ? { ...f, status: "success" } : f)));
      }
      toast.success("Files imported successfully");
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "Import failed. Please try again.");
      setFiles((prev) => prev.map((f) => (f.status === "uploading" ? { ...f, status: "error", error: err.message } : f)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
          <Upload className="h-4 w-4" />
          Upload file
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95vw] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Import Data Pages
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Upload files to generate structured data pages. Select specific pages or sheets before importing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {phase === "upload" && (
            <div
              className={`relative flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${isDragging
                ? "border-zinc-400 dark:border-zinc-500 bg-zinc-50 dark:bg-zinc-900"
                : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload files"
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                disabled={!pdfjsLib}
                className="hidden"
                onChange={handleFileSelect}
                accept=".txt,.md,.csv,.xlsx,.xls,.pdf,.doc,.docx,.json,.xml,.html,.css,.js,.ts,.py,.java,.c,.cpp,.go,.rs,.rb,.php,.sql,.yaml,.yml,.toml,.ini,.cfg,.conf,.log,.sh,.bash,.zsh,.bat,.ps1"
              />
              <Upload className="h-10 w-10 text-zinc-400 dark:text-zinc-500 mb-3" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Drop files here or click to browse</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Supports TXT, CSV, XLSX, PDF, DOCX, JSON, and code files</p>
            </div>
          )}

          {phase === "review" && files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Review & Select Content</h3>
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" onClick={() => setPhase("upload")}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Upload
                </Button>
              </div>

              <ScrollArea className="h-64 w-full rounded-md border border-zinc-200 dark:border-zinc-800">
                <div className="p-4 space-y-4">
                  {files.map((file, idx) => {
                    const Icon = fileIcons[file.type] || fileIcons.unknown;
                    return (
                      <motion.div
                        key={file.file.name + idx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                              <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {file.file.name}
                              </p>

                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {file.content.type === "spreadsheet" &&
                                  `${file.content.sheets.length} sheets`}

                                {file.content.type === "pdf" &&
                                  `${file.content.pages.length} pages`}

                                {file.content.type === "text" &&
                                  `${file.content.content.length.toLocaleString()} chars`}

                                {file.content.type === "docx" && "DOCX Document"}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                            onClick={() => removeFile(file.file.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {file.type === "spreadsheet" && file.content.type === "spreadsheet" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Select Sheets</Label>
                              <div className="flex gap-2">
                                <Button variant="ghost" className="h-5 px-1.5 text-[10px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" onClick={() => selectAllSheets(idx, true)}>Select All</Button>
                                <Button variant="ghost" className="h-5 px-1.5 text-[10px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" onClick={() => selectAllSheets(idx, false)}>Clear All</Button>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {file.content.sheets.map((sheet) => (
                                <label key={sheet.name} className="flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-1.5 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700">
                                  <Checkbox
                                    checked={file.selectedSheets.has(sheet.name)}
                                    onCheckedChange={() => toggleSheet(idx, sheet.name)}
                                    className="h-3.5 w-3.5 border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-100 data-[state=checked]:text-white dark:data-[state=checked]:text-zinc-900"
                                  />
                                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{sheet.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {file.type === "pdf" && file.content.type === "pdf" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Select Pages</Label>
                              <div className="flex gap-2">
                                <Button variant="ghost" className="h-5 px-1.5 text-[10px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" onClick={() => selectAllPages(idx, true)}>Select All</Button>
                                <Button variant="ghost" className="h-5 px-1.5 text-[10px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" onClick={() => selectAllPages(idx, false)}>Clear All</Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {file.content.pages.map((page) => (
                                <label key={page.index} className="flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2 py-1.5 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700">
                                  <Checkbox
                                    checked={file.selectedPages.has(page.index)}
                                    onCheckedChange={() => togglePage(idx, page.index)}
                                    className="h-3.5 w-3.5 border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-100 data-[state=checked]:text-white dark:data-[state=checked]:text-zinc-900"
                                  />
                                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Page {page.index}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {(file.type === "text" || file.type === "docx") && (
                          <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-3">
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 font-mono">{file.content.type}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-sm font-medium text-red-800 dark:text-red-300">Import Error</AlertTitle>
              <AlertDescription className="text-sm text-red-700 dark:text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {files.filter((f) => f.status === "success").length} of {files.length} imported
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)} className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={files.length === 0 || isSubmitting || phase === "upload"}
                className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Import Selected
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
