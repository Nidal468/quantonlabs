// app/dashboard/components/APIKeys.tsx

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
    Key as KeyIcon,
    Trash2,
    Copy,
    Check,
    ShieldAlert,
    Plus
} from "lucide-react";

// UI Components (Assuming standard shadcn setup)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// Custom Components
import { GenerateKeyDialog } from "./GenerateKeyDialog"; // Import the modal we just created
import { WorkspaceDocument } from "@/model/workspace";

// Types (Imported or defined locally)
interface ApiKey {
    id: string;
    name: string;
    value: string;
    prefix: string;
    createdAt: Date | string;
}

// Props Interface
interface APIKeysProps {
    workspace: WorkspaceDocument;
    isLoading: boolean;
    generateKey: (data: { id: string; name: string }) => Promise<{
        success: boolean;
        key: {
            id: any;
            name: any;
            value: string;
            prefix: string;
            createdAt: Date;
        };
        message: string;
    }>;
    removeApiKey: (data: { id: string; keyId: string }) => Promise<void>;
}

// Helper Component for Individual Key Row
const ApiKeyRow = ({
    keyData,
    onDelete,
    isNew = false
}: {
    keyData: {
        _id: string,
        name: string,
        prefix: string,
        hash: string,
        createdAt: Date,
        lastUsedAt: Date,
        revokedAt: Date,
    };
    onDelete: (id: string) => void;
    isNew?: boolean;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn(
            "group relative flex flex-col gap-3 p-4 rounded-lg border transition-all duration-200",
            isNew
                ? "bg-emerald-50/50 border-emerald-200 shadow-sm animate-in fade-in slide-in-from-bottom-2"
                : "bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200"
        )}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        isNew ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-gray-700 transition-colors"
                    )}>
                        <KeyIcon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{keyData.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className={cn(
                                "h-4 px-1.5 text-[10px] uppercase tracking-wider font-medium",
                                isNew ? "bg-emerald-100 text-emerald-700 border-transparent" : "bg-gray-100 text-gray-600 border-transparent"
                            )}>
                                {isNew ? "New Key" : "Active"}
                            </Badge>
                            <span className="text-xs text-gray-400">
                                Created {formatDistanceToNow(new Date(keyData.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>

                {!isNew && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(keyData._id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                        aria-label="Delete API Key"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};

// Main Component
export function APIKeys({
    workspace,
    isLoading,
    generateKey: handleGenerateBackend,
    removeApiKey: handleRemoveBackend
}: APIKeysProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Delete Confirmation State
    const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);

    // Handle Generate Logic
    const handleGenerateApikey = async (name: string) => {
        try {
            const response = await handleGenerateBackend({
                id: workspace._id.toString(),
                name
            });
            return response
        } catch (error) {
            console.error("Failed to generate key:", error);
            throw error;
        }
    };

    // Handle Delete Logic with Confirmation
    const handleDeleteConfirm = async () => {
        if (!deletingKeyId) return;

        try {
            await handleRemoveBackend({
                id: workspace._id.toString(),
                keyId: deletingKeyId
            });

            setDeletingKeyId(null);

        } catch (error) {
            console.error("Failed to delete key:", error);
            alert("Failed to delete API key. Please try again.");
            setDeletingKeyId(null);
        }
    };

    if (isLoading) {
        return (
            <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3 space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full max-w-xs" />
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg border border-gray-100 bg-white">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-9 w-full opacity-50" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            {/* Modal */}
            <GenerateKeyDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGenerate={(name) => handleGenerateApikey(name)}
            />

            {/* Delete Confirmation Dialog (Simple Alert for now, could be a custom modal) */}
            {deletingKeyId && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 h-screen">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setDeletingKeyId(null)} />
                    <div className="relative w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 text-center space-y-4">
                            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                                <ShieldAlert className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Delete API Key?</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                This action cannot be undone. The key will immediately stop working for all connected services.
                            </p>
                            <div className="flex gap-3 justify-center pt-2">
                                <Button variant="outline" onClick={() => setDeletingKeyId(null)}>Cancel</Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteConfirm}
                                    disabled={!deletingKeyId} // Safety check
                                >
                                    Delete Key
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Card */}
            <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-semibold tracking-tight text-gray-900">Integrations</CardTitle>
                            <CardDescription className="mt-1 text-sm text-gray-500">
                                Manage API keys for external services and applications.
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="sm"
                            className="bg-gray-900 hover:bg-black text-white shadow-sm transition-all h-9 px-4 gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Generate Key
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                    {/* Empty State */}
                    {workspace.keys && workspace.keys.length === 0 && (
                        <div className="text-center py-12 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
                            <div className="mx-auto h-12 w-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-gray-100">
                                <KeyIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900">No API Keys</h3>
                            <p className="text-xs text-gray-500 mt-1 max-w-[250px] mx-auto">
                                Generate a new key to start connecting external services to your workspace.
                            </p>
                        </div>
                    )}

                    {!workspace.keys && (
                        <div className="text-center py-12 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
                            <div className="mx-auto h-12 w-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-gray-100">
                                <KeyIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900">No API Keys</h3>
                            <p className="text-xs text-gray-500 mt-1 max-w-[250px] mx-auto">
                                Generate a new key to start connecting external services to your workspace.
                            </p>
                        </div>
                    )}

                    {/* List of Keys */}
                    <div className="space-y-3">
                        {/* Existing Keys */}
                        {workspace.keys && workspace.keys.map((key) => (
                            <ApiKeyRow
                                key={key._id.toString()}
                                keyData={key}
                                onDelete={(id) => setDeletingKeyId(id)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
