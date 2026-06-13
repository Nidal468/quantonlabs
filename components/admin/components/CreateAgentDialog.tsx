// app/admin/components/CreateAgentDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { useAgent } from "@/lib/hook/useAgent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, Plus, Sparkles } from "lucide-react";
import { AgentId } from "@/model/agent";
import agentsTemplates from "@/db/agent-templates.json";

interface CreateAgentDialogProps {
  onClose: () => void;
}

export function CreateAgentDialog({ onClose }: CreateAgentDialogProps) {
  const { createAgent, isCreating } = useAgent();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("custom");
  const [name, setName] = useState("");
  const [id, setId] = useState<AgentId>("marketing");
  const [domain, setDomain] = useState("Growth");
  const [description, setDescription] = useState("");
  const [capabilities, setCapabilities] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Auto-fill form when a template is selected
  useEffect(() => {
    if (selectedTemplate === "custom") return;
    const template = agentsTemplates.find((t) => t.id === selectedTemplate);
    if (template) {
      setId(template.id as AgentId);
      setName(template.name);
      setDomain(template.domain);
      setDescription(template.description);
      setCapabilities(template.capabilities.join(", "));
      setTags(template.tags);
    }
  }, [selectedTemplate]);

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !id) return;

    const selectedTemplateData = agentsTemplates.find((t) => t.id === selectedTemplate);
    const icon = selectedTemplateData?.icon || "Brain";

    try {
      await createAgent({
        id,
        name,
        domain,
        description,
        capabilities: capabilities.split(",").map((c) => c.trim()).filter(Boolean),
        tags,
        database: [],
        permissions: [],
        icon: icon as any,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create agent");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Template Selector */}
      <div className="space-y-2">
        <Label>Start from a template</Label>
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            {agentsTemplates.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">{t.icon}</span>
                  <span>{t.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedTemplate !== "custom" && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Sparkles size={12} />
            <span>Template applied. All fields are editable.</span>
          </div>
        )}
      </div>

      {/* Agent ID */}
      <div className="space-y-2">
        <Label htmlFor="agent-id">Agent ID</Label>
        <Input
          id="agent-id"
          value={id}
          onChange={(e) => setId(e.target.value as AgentId)}
          className="h-10 font-mono text-sm tracking-tight"
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="agent-name">Display Name</Label>
        <Input
          id="agent-name"
          placeholder="e.g. Marketing Bot"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          className="h-10"
        />
      </div>

      {/* Domain */}
      <div className="space-y-2">
        <Label htmlFor="agent-domain">Domain</Label>
        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            {["Growth", "Operations + Growth", "Operations", "Strategy"].map((val) => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="agent-desc">Description</Label>
        <Textarea
          id="agent-desc"
          placeholder="Brief description of the agent's purpose"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Capabilities */}
      <div className="space-y-2">
        <Label htmlFor="agent-capabilities">Capabilities (comma-separated)</Label>
        <Textarea
          id="agent-capabilities"
          placeholder="e.g. email, analytics, reporting"
          value={capabilities}
          onChange={(e) => setCapabilities(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 p-2 min-h-[44px] rounded-md border border-neutral-200 bg-neutral-50/50">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white border border-neutral-200 text-neutral-700 pr-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
          <div className="flex items-center gap-1">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              placeholder="Add tag..."
              className="h-7 w-24 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-neutral-500 hover:text-neutral-900"
              onClick={handleAddTag}
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={isCreating}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || !name.trim()} className="bg-neutral-900 hover:bg-neutral-800">
          {isCreating ? <Loader2 size={16} className="animate-spin" /> : "Create Agent"}
        </Button>
      </div>
    </form>
  );
}
