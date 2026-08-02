// components/dashboard/mongodb/page.tsx
"use client";

import { useWorkspace } from "@/lib/hook/useWorkspace";
import { getMongoDBCollections } from "@/lib/api/workspace";
import { WorkspaceDocument } from "@/model/workspace";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Trash2, Plus, Save, Database, Edit2, X, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
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

interface MongoDBPageProps {
  activeCompany: WorkspaceDocument;
}

interface Variant {
  key: string;
  name: string[];
  examples: string[];
}

interface MongoDBCollection {
  collectionName: string;
  schema: string;
  variant: Variant[];
}

export default function MongoDBPage({ activeCompany }: MongoDBPageProps) {
  const { isLoading, updateWorkspace } = useWorkspace();
  const [collections, setCollections] = useState<MongoDBCollection[]>(
    activeCompany.mongodb || []
  );
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Database collections state
  const [dbCollections, setDbCollections] = useState<string[]>([]);
  const [isFetchingCollections, setIsFetchingCollections] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Form state
  const [collectionName, setCollectionName] = useState("");
  const [schema, setSchema] = useState("");
  const [variants, setVariants] = useState<Variant[]>([]);

  // Fetch collections from user's MongoDB
  const fetchCollections = useCallback(async () => {
    if (!activeCompany.config?.mongodb?.key) {
      setFetchError("MongoDB connection not configured");
      setIsConnected(false);
      return;
    }

    setIsFetchingCollections(true);
    setFetchError(null);
    try {
      const result = await getMongoDBCollections(activeCompany._id.toString());
      if (result.error) {
        setFetchError(result.error);
        setIsConnected(false);
      } else {
        setDbCollections(result.collections || []);
        setIsConnected(true);
        setFetchError(null);
      }
    } catch {
      setFetchError("Failed to fetch collections");
      setIsConnected(false);
    } finally {
      setIsFetchingCollections(false);
    }
  }, [activeCompany._id, activeCompany.config?.mongodb?.key]);

  useEffect(() => {
    if (activeCompany.config?.mongodb?.status === "active" && activeCompany.config?.mongodb?.key) {
      fetchCollections();
    }
  }, [activeCompany.config?.mongodb?.status, activeCompany.config?.mongodb?.key, fetchCollections]);

  const resetForm = () => {
    setCollectionName("");
    setSchema("");
    setVariants([]);
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { key: "", name: [], examples: [] }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantKeyChange = (index: number, key: string) => {
    const updated = [...variants];
    updated[index].key = key;
    setVariants(updated);
  };

  const handleVariantNamesChange = (index: number, names: string[]) => {
    const updated = [...variants];
    updated[index].name = names;
    setVariants(updated);
  };

  const handleVariantExamplesChange = (index: number, examples: string[]) => {
    const updated = [...variants];
    updated[index].examples = examples;
    setVariants(updated);
  };

  const handleEdit = (index: number) => {
    const collection = collections[index];
    setCollectionName(collection.collectionName);
    setSchema(collection.schema);
    setVariants([...collection.variant]);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleConfigureCollection = (collectionNameFromDb: string) => {
    // Check if this collection already has a schema configured
    const existingIndex = collections.findIndex(
      (c) => c.collectionName === collectionNameFromDb
    );
    if (existingIndex !== -1) {
      handleEdit(existingIndex);
    } else {
      setCollectionName(collectionNameFromDb);
      setSchema("");
      setVariants([]);
      setEditingIndex(null);
      setIsAdding(true);
    }
  };

  const handleSave = async () => {
    if (!collectionName.trim()) {
      toast.error("Collection name is required");
      return;
    }
    if (!schema.trim()) {
      toast.error("Schema is required");
      return;
    }

    setSaving(true);
    try {
      let updatedCollections: MongoDBCollection[];

      if (editingIndex !== null) {
        // Update existing
        updatedCollections = [...collections];
        updatedCollections[editingIndex] = {
          collectionName: collectionName.trim(),
          schema: schema.trim(),
          variant: variants.filter((v) => v.key.trim() !== ""),
        };
      } else {
        // Add new - check if collection with same name exists
        const existingIndex = collections.findIndex(
          (c) => c.collectionName === collectionName.trim()
        );
        const newCollection: MongoDBCollection = {
          collectionName: collectionName.trim(),
          schema: schema.trim(),
          variant: variants.filter((v) => v.key.trim() !== ""),
        };
        if (existingIndex !== -1) {
          updatedCollections = [...collections];
          updatedCollections[existingIndex] = newCollection;
        } else {
          updatedCollections = [...collections, newCollection];
        }
      }

      await updateWorkspace({
        id: activeCompany._id.toString(),
        data: { mongodb: updatedCollections },
      });

      setCollections(updatedCollections);
      toast.success(editingIndex !== null ? "Collection updated" : "Collection added");
      resetForm();
    } catch {
      toast.error("Failed to save collection");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const updatedCollections = collections.filter((_, i) => i !== index);
      await updateWorkspace({
        id: activeCompany._id.toString(),
        data: { mongodb: updatedCollections },
      });
      setCollections(updatedCollections);
      toast.success("Collection deleted");
    } catch {
      toast.error("Failed to delete collection");
    }
  };

  // Check if a collection from DB has a schema configured
  const hasSchemaConfigured = (collectionName: string) => {
    return collections.some((c) => c.collectionName === collectionName);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full space-y-8 py-8 px-4 sm:px-6"
      >
        <div className="space-y-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full space-y-8 py-8 px-4 sm:px-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">MongoDB Schema</h1>
        <p className="text-sm text-gray-500">
          Manage your MongoDB collection schemas and variants for this workspace.
        </p>
      </div>

      {/* Connection Status & Database Collections */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight">Database Collections</CardTitle>
              <CardDescription>
                Collections from your connected MongoDB database.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCollections}
              disabled={isFetchingCollections || !activeCompany.config?.mongodb?.key}
              className="gap-1.5"
            >
              {isFetchingCollections ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
            {isConnected ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Connected to MongoDB</p>
                  <p className="text-xs text-gray-500">
                    Found {dbCollections.length} collection{dbCollections.length !== 1 ? "s" : ""} in your database.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {fetchError || "MongoDB not connected"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {!activeCompany.config?.mongodb?.key
                      ? "Please configure your MongoDB connection string in Settings."
                      : "Check your connection string and try again."}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Database Collections Grid */}
          {isConnected && dbCollections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dbCollections.map((collectionName) => {
                const hasSchema = hasSchemaConfigured(collectionName);
                return (
                  <div
                    key={collectionName}
                    className={cn(
                      "border rounded-lg p-3 space-y-2 transition-colors",
                      hasSchema
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-sm truncate">{collectionName}</span>
                      </div>
                      {hasSchema && (
                        <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                          Configured
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant={hasSchema ? "outline" : "default"}
                      size="sm"
                      className="w-full h-7 text-xs gap-1"
                      onClick={() => handleConfigureCollection(collectionName)}
                    >
                      <Edit2 className="h-3 w-3" />
                      {hasSchema ? "Edit Schema" : "Add Schema"}
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : isConnected ? (
            <div className="text-center py-6 text-gray-500">
              <Database className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No collections found in your database.</p>
              <p className="text-xs text-gray-400 mt-1">
                Create a collection in your MongoDB database and refresh.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Configured Schemas */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight">Schema Definitions</CardTitle>
              <CardDescription>
                Define schemas and variants for your MongoDB collections.
              </CardDescription>
            </div>
            {!isAdding && (
              <Button size="sm" onClick={() => setIsAdding(true)} className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Manual Collection
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {collections.length === 0 && !isAdding ? (
            <div className="text-center py-8 text-gray-500">
              <Database className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No schema definitions yet.</p>
              <p className="text-xs text-gray-400 mt-1">
                Select a collection from above or click "Add Manual Collection" to get started.
              </p>
            </div>
          ) : (
            <>
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-sm">{collection.collectionName}</span>
                        <Badge variant="outline" className="text-xs">
                          {collection.variant.length} variant{collection.variant.length !== 1 ? "s" : ""}
                        </Badge>
                        {dbCollections.includes(collection.collectionName) && (
                          <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                            In Database
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-mono line-clamp-2">
                        {collection.schema}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Collection Schema</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the schema for "{collection.collectionName}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(index)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {collection.variant.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Variants:</p>
                      <div className="flex flex-wrap gap-2">
                        {collection.variant.map((v, vIndex) => (
                          <div key={vIndex} className="flex flex-col gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {v.key}: {v.name.join(", ")}
                            </Badge>
                            {v.examples?.length > 0 && (
                              <span className="text-xs text-gray-400 pl-2">
                                Examples: {v.examples.join(", ")}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAdding && <Separator />}
            </>
          )}

          {/* Add/Edit Form */}
          {isAdding && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">
                  {editingIndex !== null ? "Edit Collection" : "New Collection"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={resetForm}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Collection Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Collection Name</label>
                {dbCollections.length > 0 && editingIndex === null ? (
                  <div className="space-y-2">
                    <select
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      className="w-full h-9 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      <option value="">Select a collection...</option>
                      {dbCollections.map((name) => (
                        <option key={name} value={name}>
                          {name} {!hasSchemaConfigured(name) ? "" : "(configured)"}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500">
                      Select from your database collections or type a custom name below.
                    </p>
                  </div>
                ) : null}
                <Input
                  placeholder="e.g., users, products, orders"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              {/* Schema */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Schema</label>
                <textarea
                  placeholder='{"name": "string", "email": "string", "age": "number"}'
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-200 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <p className="text-xs text-gray-500">
                  Define your collection schema in JSON format.
                </p>
              </div>

              {/* Variants */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Variants</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddVariant}
                    className="h-7 gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Variant
                  </Button>
                </div>

                {variants.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">
                    No variants added. Variants allow you to define keys with multiple name options.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-md p-3 space-y-2 bg-white"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">
                            Variant {index + 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-red-600"
                            onClick={() => handleRemoveVariant(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Key (e.g., status, type, category)"
                            value={variant.key}
                            onChange={(e) => handleVariantKeyChange(index, e.target.value)}
                            className="h-8 text-sm"
                          />
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">Names (comma-separated)</p>
                            <Input
                              placeholder="e.g., active, enabled, live"
                              value={variant?.name?.join(", ")}
                              onChange={(e) =>
                                handleVariantNamesChange(
                                  index,
                                  e.target.value.split(",").map((n) => n.trim())
                                )
                              }
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">Examples (comma-separated)</p>
                            <Input
                              placeholder="e.g., active, pending, completed"
                              value={variant?.examples?.join(", ")}
                              onChange={(e) =>
                                handleVariantExamplesChange(
                                  index,
                                  e.target.value.split(",").map((n) => n.trim())
                                )
                              }
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving || !collectionName.trim() || !schema.trim()}
                  className="gap-1.5"
                >
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <Save className="h-3.5 w-3.5" />
                  {editingIndex !== null ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          MongoDB schema configurations are saved automatically.
        </p>
      </div>
    </motion.div>
  );
}