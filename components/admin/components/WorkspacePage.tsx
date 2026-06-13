// app/admin/components/WorkspacePage.tsx
"use client";

import { useState } from "react";
import { useWorkspace } from "@/lib/hook/useWorkspace";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog";

export function WorkspacePage() {
  const { workspaces, isLoading, error, deleteWorkspace, isDeleting } = useWorkspace();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteWorkspace(id);
    } catch (err) {
      console.error("Failed to delete workspace:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-12 text-center">
        <AlertCircle className="mb-3 text-red-500" size={24} />
        <h3 className="text-sm font-medium text-red-900">Failed to load workspaces</h3>
        <p className="mt-1 text-sm text-red-700">{error instanceof Error ? error.message : "Unknown error occurred"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {workspaces.length} {workspaces.length === 1 ? "workspace" : "workspaces"} configured
        </p>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-neutral-900 hover:bg-neutral-800">
              <Plus size={16} className="mr-2" />
              New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Workspace</DialogTitle>
            </DialogHeader>
            <CreateWorkspaceDialog onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-100 hover:bg-transparent">
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {workspaces.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-sm text-neutral-400">
                    No workspaces found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                workspaces.map((workspace) => (
                  <motion.tr
                    key={workspace._id.toString()}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="group border-t border-neutral-100 hover:bg-neutral-50/50"
                  >
                    <TableCell className="font-medium text-neutral-900">
                      {workspace.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                        {workspace.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${workspace.subscriptionStatus === "active" ? "border-green-200 text-green-700 bg-green-50" : ""}
                          ${workspace.subscriptionStatus === "trialing" ? "border-blue-200 text-blue-700 bg-blue-50" : ""}
                          ${workspace.subscriptionStatus === "past_due" ? "border-orange-200 text-orange-700 bg-orange-50" : ""}
                          ${workspace.subscriptionStatus === "canceled" ? "border-red-200 text-red-700 bg-red-50" : ""}
                          ${!workspace.subscriptionStatus ? "border-neutral-200 text-neutral-500 bg-neutral-50" : ""}
                        `}
                      >
                        {workspace.subscriptionStatus || "No subscription"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-neutral-500">
                      {formatDistanceToNow(new Date(workspace.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => handleDelete(workspace._id.toString())}
                        className="text-neutral-400 hover:text-red-600 hover:bg-red-50"
                      >
                        {isDeleting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
