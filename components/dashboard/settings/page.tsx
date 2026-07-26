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
import { Key, Loader2, Eye, EyeOff, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
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
            },
            elevenlabs: {
              status: elevenlabsKey ? "active" : "inactive",
              key: elevenlabsKey,
            },
            mongodb: {
              status: mongodbKey ? "active" : "inactive",
              key: mongodbKey,
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