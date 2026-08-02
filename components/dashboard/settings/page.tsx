// app/dashboard/settings/page.tsx
"use client";

import { useWorkspace } from "@/lib/hook/useWorkspace";
import { WorkspaceDocument } from "@/model/workspace";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Key, Loader2, Eye, EyeOff, Trash2, Cpu, Zap, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUser } from "@/lib/context/user";
import { APIKeys } from "./api-keys/APIKeys";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";

// Model types
interface ModelInfo {
  id: string;
  name: string;
  description?: string;
  context_length?: number;
  pricing?: {
    prompt?: string;
    completion?: string;
    image?: string;
    request?: string;
  };
}

// Format price per million tokens
function formatPrice(price?: string): string {
  if (!price) return "N/A";
  const numPrice = parseFloat(price);
  if (numPrice === 0) return "Free";
  return `$${(numPrice * 1000000).toFixed(2)}/M`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function PlanSection({ workspace }: { workspace: WorkspaceDocument }) {
  const statusColors: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    trialing: "bg-blue-50 text-blue-700 border-blue-200",
    past_due: "bg-amber-50 text-amber-700 border-amber-200",
    canceled: "bg-red-50 text-red-700 border-red-200",
    unpaid: "bg-gray-50 text-gray-700 border-gray-200",
    incomplete: "bg-gray-50 text-gray-700 border-gray-200",
    incomplete_expired: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight">Subscription & Plan</CardTitle>
        <CardDescription>Manage your workspace tier and billing status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Current Plan</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight capitalize">{workspace.plan}</span>
              <Badge variant="outline" className={cn("px-2 py-0.5 text-xs font-medium", statusColors[workspace.subscriptionStatus || ""])}>
                {workspace.subscriptionStatus || "No Subscription"}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-9">
            Manage Subscription
          </Button>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-gray-500">Trial Ends</p>
            <p className="font-medium">{workspace.trialEndsAt ? format(new Date(workspace.trialEndsAt), "MMM d, yyyy") : "N/A"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Subscription Ends</p>
            <p className="font-medium">{workspace.subscriptionEndsAt ? format(new Date(workspace.subscriptionEndsAt), "MMM d, yyyy") : "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IntegrationsSection({
  workspace,
  isLoading,
  updateWorkspace,
}: {
  workspace: WorkspaceDocument;
  isLoading: boolean;
  updateWorkspace: (payload: { id: string; data: Partial<WorkspaceDocument> }) => Promise<void>;
}) {
  const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
  const [showElevenLabsKey, setShowElevenLabsKey] = useState(false);
  const [showMongodbKey, setShowMongodbKey] = useState(false);
  const [openrouterKey, setOpenrouterKey] = useState(workspace.config?.openrouter?.key || "");
  const [elevenlabsKey, setElevenlabsKey] = useState(workspace.config?.elevenlabs?.key || "");
  const [mongodbKey, setMongodbKey] = useState(workspace.config?.mongodb?.key || "");
  const [saving, setSaving] = useState<string | null>(null);

  const handleSave = async (provider: "openrouter" | "elevenlabs" | "mongodb") => {
    setSaving(provider);
    try {
      await updateWorkspace({
        id: workspace._id.toString(),
        data: {
          config: {
            openrouter: {
              status: openrouterKey ? "active" : "inactive",
              key: openrouterKey,
              reasoning: undefined,
              instruct: undefined
            },
            elevenlabs: {
              status: elevenlabsKey ? "active" : "inactive",
              key: elevenlabsKey,
            },
            mongodb: {
              status: mongodbKey ? "active" : "inactive",
              key: mongodbKey,
            },
            lmstudio: {
              status: "active",
              key: "",
              reasoning: undefined,
              instruct: undefined
            }
          },
        },
      });
      toast.success(`${provider} key saved`);
    } catch {
      toast.error("Failed to save integration key");
    } finally {
      setSaving(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight">Integrations</CardTitle>
        <CardDescription>Manage API keys for external services.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OpenRouter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">OpenRouter</span>
              <Badge variant="outline" className={cn("px-1.5 py-0 text-xs", workspace.config?.openrouter?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200")}>
                {workspace.config?.openrouter?.status === "active" ? "Connected" : "Not Connected"}
              </Badge>
            </div>
          </div>
          <div className="relative">
            <Input
              type={showOpenRouterKey ? "text" : "password"}
              placeholder="sk-or-v1-..."
              value={openrouterKey}
              onChange={(e) => setOpenrouterKey(e.target.value)}
              className="pr-10 font-mono text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600"
              onClick={() => setShowOpenRouterKey(!showOpenRouterKey)}
              aria-label={showOpenRouterKey ? "Hide key" : "Show key"}
            >
              {showOpenRouterKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => handleSave("openrouter")} disabled={saving === "openrouter" || !openrouterKey} className="h-8 gap-1.5">
              {saving === "openrouter" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Key
            </Button>
          </div>
        </div>

        <Separator />

        {/* ElevenLabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">ElevenLabs</span>
              <Badge variant="outline" className={cn("px-1.5 py-0 text-xs", workspace.config?.elevenlabs?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200")}>
                {workspace.config?.elevenlabs?.status === "active" ? "Connected" : "Not Connected"}
              </Badge>
            </div>
          </div>
          <div className="relative">
            <Input
              type={showElevenLabsKey ? "text" : "password"}
              placeholder="sk-..."
              value={elevenlabsKey}
              onChange={(e) => setElevenlabsKey(e.target.value)}
              className="pr-10 font-mono text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600"
              onClick={() => setShowElevenLabsKey(!showElevenLabsKey)}
              aria-label={showElevenLabsKey ? "Hide key" : "Show key"}
            >
              {showElevenLabsKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => handleSave("elevenlabs")} disabled={saving === "elevenlabs" || !elevenlabsKey} className="h-8 gap-1.5">
              {saving === "elevenlabs" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Key
            </Button>
          </div>
        </div>

        {/* Mongodb */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">MongodDB</span>
              <Badge variant="outline" className={cn("px-1.5 py-0 text-xs", workspace.config?.mongodb?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200")}>
                {workspace.config?.mongodb?.status === "active" ? "Connected" : "Not Connected"}
              </Badge>
            </div>
          </div>
          <div className="relative">
            <Input
              type={showMongodbKey ? "text" : "password"}
              placeholder="sk-..."
              value={mongodbKey}
              onChange={(e) => setMongodbKey(e.target.value)}
              className="pr-10 font-mono text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600"
              onClick={() => setShowMongodbKey(!showMongodbKey)}
              aria-label={showMongodbKey ? "Hide key" : "Show key"}
            >
              {showMongodbKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => handleSave("mongodb")} disabled={saving === "mongodb" || !mongodbKey} className="h-8 gap-1.5">
              {saving === "mongodb" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Key
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// Searchable Model Combobox Component
// ─────────────────────────────────────────────────────────────────────────────

function ModelCombobox({
  models,
  value,
  onChange,
  placeholder,
  loading,
  emptyMessage,
  showPricing = false,
}: {
  models: ModelInfo[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  loading: boolean;
  emptyMessage: string;
  showPricing?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedModel = models.find((m) => m.id === value);
  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(search.toLowerCase()) ||
    model.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal h-10 px-3"
        >
          {selectedModel ? (
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-medium text-sm truncate max-w-[200px]">{selectedModel.name}</span>
              {showPricing && (
                <span className="text-xs text-muted-foreground">
                  {formatPrice(selectedModel.pricing?.prompt)} / {formatPrice(selectedModel.pricing?.completion)}
                  {selectedModel.context_length && ` • ${Math.round(selectedModel.context_length / 1000)}K ctx`}
                </span>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="border-b p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search models..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <CommandList className="max-h-[280px]">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Loading models...</span>
              </div>
            ) : filteredModels.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredModels.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.id}
                    onSelect={() => {
                      onChange(model.id);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="flex flex-col items-start py-2.5 px-3"
                  >
                    <div className="flex items-center w-full">
                      <Check className={cn("mr-2 h-4 w-4", value === model.id ? "opacity-100" : "opacity-0")} />
                      <span className="font-medium text-sm">{model.name}</span>
                    </div>
                    {showPricing && (
                      <div className="ml-6 mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatPrice(model.pricing?.prompt)} prompt</span>
                        <span>•</span>
                        <span>{formatPrice(model.pricing?.completion)} completion</span>
                        {model.context_length && (
                          <>
                            <span>•</span>
                            <span>{Math.round(model.context_length / 1000)}K ctx</span>
                          </>
                        )}
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Model Selection Section Component
// ─────────────────────────────────────────────────────────────────────────────

function ModelSelectionSection({
  workspace,
  isLoading,
  updateWorkspace,
}: {
  workspace: WorkspaceDocument;
  isLoading: boolean;
  updateWorkspace: (payload: { id: string; data: Partial<WorkspaceDocument> }) => Promise<void>;
}) {
  // OpenRouter state
  const [openRouterModels, setOpenRouterModels] = useState<ModelInfo[]>([]);
  const [loadingOpenRouterModels, setLoadingOpenRouterModels] = useState(false);
  const [selectedOpenRouterInstruct, setSelectedOpenRouterInstruct] = useState(workspace.config?.openrouter?.instruct || "");
  const [selectedOpenRouterReasoning, setSelectedOpenRouterReasoning] = useState(workspace.config?.openrouter?.reasoning || "");

  // LMStudio state
  const [lmStudioModels, setLmStudioModels] = useState<ModelInfo[]>([]);
  const [loadingLmStudioModels, setLoadingLmStudioModels] = useState(false);
  const [selectedLmStudioInstruct, setSelectedLmStudioInstruct] = useState(workspace.config?.lmstudio?.instruct || "");
  const [selectedLmStudioReasoning, setSelectedLmStudioReasoning] = useState(workspace.config?.lmstudio?.reasoning || "");

  const [savingModel, setSavingModel] = useState<string | null>(null);

  const isOpenRouterActive = workspace.config?.openrouter?.status === "active" && !!workspace.config?.openrouter?.key;

  // Fetch OpenRouter models
  const fetchOpenRouterModels = useCallback(async () => {
    const apiKey = workspace.config?.openrouter?.key;
    if (!apiKey) return;
    setLoadingOpenRouterModels(true);
    try {
      const res = await fetch("/api/models/openrouter", {
        headers: {
          "x-api-key": apiKey,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to fetch models");
      }
      const data = await res.json();
      setOpenRouterModels(data.models || []);
    } catch (error) {
      console.error("Failed to fetch OpenRouter models:", error);
      toast.error("Failed to fetch OpenRouter models");
    } finally {
      setLoadingOpenRouterModels(false);
    }
  }, [workspace.config?.openrouter?.key]);

  // Fetch LMStudio models
  const fetchLmStudioModels = useCallback(async () => {
    setLoadingLmStudioModels(true);
    try {
      const res = await fetch("/api/models/lmstudio");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to fetch models");
      }
      const data = await res.json();
      setLmStudioModels(data.models || []);
    } catch (error) {
      console.error("Failed to fetch LMStudio models:", error);
      toast.error("Failed to connect to LMStudio. Make sure it's running.");
    } finally {
      setLoadingLmStudioModels(false);
    }
  }, []);

  // Fetch models on mount
  useEffect(() => {
    if (isOpenRouterActive) {
      fetchOpenRouterModels();
    }
    fetchLmStudioModels();
  }, [isOpenRouterActive, fetchOpenRouterModels, fetchLmStudioModels]);

  // Save OpenRouter model selection
  const handleSaveOpenRouterModels = async () => {
    setSavingModel("openrouter");
    try {
      await updateWorkspace({
        id: workspace._id.toString(),
        data: {
          config: {
            ...workspace.config,
            openrouter: {
              status: workspace.config?.openrouter?.key ? "active" : "inactive",
              key: workspace.config?.openrouter?.key || "",
              reasoning: selectedOpenRouterReasoning,
              instruct: selectedOpenRouterInstruct,
            },
          },
        },
      });
      toast.success("OpenRouter models saved");
    } catch {
      toast.error("Failed to save OpenRouter models");
    } finally {
      setSavingModel(null);
    }
  };

  // Save LMStudio model selection
  const handleSaveLmStudioModels = async () => {
    setSavingModel("lmstudio");
    try {
      await updateWorkspace({
        id: workspace._id.toString(),
        data: {
          config: {
            ...workspace.config,
            lmstudio: {
              ...workspace.config?.lmstudio,
              status: "active",
              reasoning: selectedLmStudioReasoning,
              instruct: selectedLmStudioInstruct,
            },
          },
        },
      });
      toast.success("LMStudio models saved");
    } catch {
      toast.error("Failed to save LMStudio models");
    } finally {
      setSavingModel(null);
    }
  };

  // Get selected model info
  const getOpenRouterInstructModel = () => openRouterModels.find(m => m.id === selectedOpenRouterInstruct);
  const getOpenRouterReasoningModel = () => openRouterModels.find(m => m.id === selectedOpenRouterReasoning);
  const getLmStudioInstructModel = () => lmStudioModels.find(m => m.id === selectedLmStudioInstruct);
  const getLmStudioReasoningModel = () => lmStudioModels.find(m => m.id === selectedLmStudioReasoning);

  if (isLoading) {
    return (
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Model Selection</CardTitle>
            <CardDescription className="mt-1">Configure instruct and reasoning models for AI providers.</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {openRouterModels.length + lmStudioModels.length} models available
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OpenRouter Models */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-1.5">
                <Cpu className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">OpenRouter</span>
              </div>
              <Badge variant="outline" className={cn("px-1.5 py-0 text-xs", isOpenRouterActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200")}>
                {isOpenRouterActive ? "Active" : "Requires API Key"}
              </Badge>
            </div>
            {isOpenRouterActive && (
              <Button
                size="sm"
                variant="ghost"
                onClick={fetchOpenRouterModels}
                disabled={loadingOpenRouterModels}
                className="h-7 gap-1.5 text-xs"
              >
                {loadingOpenRouterModels ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : null}
                Refresh
              </Button>
            )}
          </div>

          {isOpenRouterActive ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Instruct Model */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Instruct Model
                </label>
                <ModelCombobox
                  models={openRouterModels}
                  value={selectedOpenRouterInstruct}
                  onChange={setSelectedOpenRouterInstruct}
                  placeholder="Select instruct model..."
                  loading={loadingOpenRouterModels}
                  emptyMessage="No models found"
                  showPricing
                />
                {getOpenRouterInstructModel() && (
                  <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-3 text-xs">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="h-3 w-3 text-amber-500" />
                      <span className="font-semibold text-amber-900">Selected Model</span>
                    </div>
                    <p className="font-medium text-amber-900">{getOpenRouterInstructModel()!.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-amber-700">
                      <span>Prompt: {formatPrice(getOpenRouterInstructModel()!.pricing?.prompt)}</span>
                      <span>•</span>
                      <span>Completion: {formatPrice(getOpenRouterInstructModel()!.pricing?.completion)}</span>
                      {getOpenRouterInstructModel()!.context_length && (
                        <>
                          <span>•</span>
                          <span>Context: {Math.round(getOpenRouterInstructModel()!.context_length! / 1000)}K</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Reasoning Model */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Brain className="h-3.5 w-3.5 text-purple-500" />
                  Reasoning Model
                </label>
                <ModelCombobox
                  models={openRouterModels}
                  value={selectedOpenRouterReasoning}
                  onChange={setSelectedOpenRouterReasoning}
                  placeholder="Select reasoning model..."
                  loading={loadingOpenRouterModels}
                  emptyMessage="No models found"
                  showPricing
                />
                {getOpenRouterReasoningModel() && (
                  <div className="rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 p-3 text-xs">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Brain className="h-3 w-3 text-purple-500" />
                      <span className="font-semibold text-purple-900">Selected Model</span>
                    </div>
                    <p className="font-medium text-purple-900">{getOpenRouterReasoningModel()!.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-purple-700">
                      <span>Prompt: {formatPrice(getOpenRouterReasoningModel()!.pricing?.prompt)}</span>
                      <span>•</span>
                      <span>Completion: {formatPrice(getOpenRouterReasoningModel()!.pricing?.completion)}</span>
                      {getOpenRouterReasoningModel()!.context_length && (
                        <>
                          <span>•</span>
                          <span>Context: {Math.round(getOpenRouterReasoningModel()!.context_length! / 1000)}K</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
              <Key className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-500">Add your OpenRouter API key above to select models</p>
            </div>
          )}

          {isOpenRouterActive && (
            <div className="flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveOpenRouterModels}
                disabled={savingModel === "openrouter"}
                className="h-8 gap-1.5"
              >
                {savingModel === "openrouter" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save Models
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* LMStudio Models */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md bg-blue-50 px-2.5 py-1.5">
                <Cpu className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">LMStudio</span>
              </div>
              <Badge variant="outline" className="px-1.5 py-0 text-xs bg-blue-50 text-blue-700 border-blue-200">
                Local
              </Badge>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={fetchLmStudioModels}
              disabled={loadingLmStudioModels}
              className="h-7 gap-1.5 text-xs"
            >
              {loadingLmStudioModels ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : null}
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instruct Model */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Instruct Model
              </label>
              <ModelCombobox
                models={lmStudioModels}
                value={selectedLmStudioInstruct}
                onChange={setSelectedLmStudioInstruct}
                placeholder="Select instruct model..."
                loading={loadingLmStudioModels}
                emptyMessage="No models found. Make sure LMStudio is running."
              />
              {getLmStudioInstructModel() && (
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 p-3 text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="h-3 w-3 text-blue-500" />
                    <span className="font-semibold text-blue-900">Local Model</span>
                  </div>
                  <p className="font-medium text-blue-900">{getLmStudioInstructModel()!.name}</p>
                  <p className="text-blue-700 mt-1">No API costs • Runs locally</p>
                </div>
              )}
            </div>

            {/* Reasoning Model */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Brain className="h-3.5 w-3.5 text-purple-500" />
                Reasoning Model
              </label>
              <ModelCombobox
                models={lmStudioModels}
                value={selectedLmStudioReasoning}
                onChange={setSelectedLmStudioReasoning}
                placeholder="Select reasoning model..."
                loading={loadingLmStudioModels}
                emptyMessage="No models found. Make sure LMStudio is running."
              />
              {getLmStudioReasoningModel() && (
                <div className="rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 p-3 text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Brain className="h-3 w-3 text-purple-500" />
                    <span className="font-semibold text-purple-900">Local Model</span>
                  </div>
                  <p className="font-medium text-purple-900">{getLmStudioReasoningModel()!.name}</p>
                  <p className="text-purple-700 mt-1">No API costs • Runs locally</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSaveLmStudioModels}
              disabled={savingModel === "lmstudio"}
              className="h-8 gap-1.5"
            >
              {savingModel === "lmstudio" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save Models
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Danger Zone Section Component
// ─────────────────────────────────────────────────────────────────────────────

function DangerZoneSection({
  workspace,
  onDelete,
  isDeleting,
}: {
  workspace: WorkspaceDocument;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(workspace._id.toString());
      toast.success("Workspace deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete workspace");
    }
  };

  return (
    <Card className="border-red-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight text-red-700">Danger Zone</CardTitle>
        <CardDescription className="text-red-600">Permanently delete this workspace and all its data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">
            Once you delete your workspace, all data associated with it will be permanently removed. This action cannot be undone.
          </p>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-fit gap-2" disabled={isDeleting}>
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                {isDeleting ? "Deleting..." : "Delete Workspace"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  This action cannot be undone. This will permanently delete your workspace "<strong>{workspace.name}</strong>" and all associated data including tasks, datapages, and configurations.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Workspace
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsPage({ activeCompany }: { activeCompany: WorkspaceDocument }) {
  const { isLoading, updateWorkspace, generateKey, removeApiKey, deleteWorkspace, isDeleting } = useWorkspace();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full space-y-8 py-8 px-4 sm:px-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Workspace Settings</h1>
        <p className="text-sm text-gray-500">Manage your workspace configuration, team, and integrations.</p>
      </div>

      <div className="space-y-6">
        <PlanSection workspace={activeCompany} />
        <IntegrationsSection workspace={activeCompany} isLoading={isLoading} updateWorkspace={updateWorkspace} />
        <ModelSelectionSection workspace={activeCompany} isLoading={isLoading} updateWorkspace={updateWorkspace} />
        <APIKeys workspace={activeCompany} isLoading={isLoading} generateKey={generateKey} removeApiKey={removeApiKey} />
        <DangerZoneSection workspace={activeCompany} onDelete={deleteWorkspace} isDeleting={isDeleting} />
      </div>

      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Settings are saved automatically. Changes may take a few moments to propagate.
        </p>
      </div>
    </motion.div>
  );
}