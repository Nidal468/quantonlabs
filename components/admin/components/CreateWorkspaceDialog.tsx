// components/admin/components/CreateWorkspaceDialog.tsx
"use client";

import { useState } from "react";
import { useWorkspace } from "@/lib/hook/useWorkspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CreateWorkspaceDialogProps {
  onClose: () => void;
}

export function CreateWorkspaceDialog({ onClose }: CreateWorkspaceDialogProps) {
  const { createWorkspace, isCreating } = useWorkspace();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return;

    try {
      await createWorkspace(name);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create workspace");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="name"
          placeholder="e.g. Acme Corp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          className="h-10"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={isCreating}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || !name.trim()} className="bg-neutral-900 hover:bg-neutral-800">
          {isCreating ? <Loader2 size={16} className="animate-spin" /> : "Create Workspace"}
        </Button>
      </div>
    </form>
  );
}
