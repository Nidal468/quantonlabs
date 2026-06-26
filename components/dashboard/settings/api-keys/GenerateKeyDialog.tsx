// components/api-keys/GenerateKeyDialog.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Plus, AlertCircle, Copy, Check, Key as KeyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ApiKeyResult {
  id: string;
  name: string;
  value: string;
  prefix: string;
  createdAt: Date | string;
}

interface GenerateKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (name: string) => Promise<{
    success: boolean;
    key: ApiKeyResult;
    message: string;
  }>;
}

export function GenerateKeyDialog({ isOpen, onClose, onGenerate }: GenerateKeyDialogProps) {
  const [keyName, setKeyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for the generated key result
  const [generatedKey, setGeneratedKey] = useState<ApiKeyResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyName.trim()) {
      setError("Please provide a name for your API key");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onGenerate(keyName);
      
      // Store the generated key and show success view
      if (result.success && result.key) {
        setGeneratedKey(result.key);
      } else {
        throw new Error(result.message || "Failed to generate API key");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate API key. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!generatedKey?.value) return;
    
    navigator.clipboard.writeText(generatedKey.value);
    setCopied(true);
  };

  // Reset state when modal is closed
  const handleClose = () => {
    setGeneratedKey(null);
    setKeyName("");
    setError(null);
    setCopied(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 h-screen w-full"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              <CardHeader className="border-b border-gray-100 py-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold tracking-tight text-gray-900">
                      {generatedKey ? "API Key Generated" : "Generate API Key"}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 mt-2 leading-relaxed">
                      {generatedKey 
                        ? "Copy your key now — it won't be shown again."
                        : "Create a new secret key for external integrations and services."}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClose}
                    className="h-9 w-9 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors shrink-0 mt-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Success View - Key Displayed */}
              {generatedKey ? (
                <CardContent className="pt-8 pb-8 px-8">
                  {/* Key Name Badge */}
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 mb-6 shadow-sm">
                    <KeyIcon className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span className="text-base font-medium text-emerald-900">{generatedKey.name}</span>
                  </div>

                  {/* Key Value Input with Copy Button */}
                  <div className="space-y-3 mb-8">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Your API Key
                      {!copied && (
                        <Badge variant="outline" className="h-5 px-2 text-[10px] uppercase tracking-wide bg-orange-50 text-orange-700 border-orange-200 rounded-full">
                          One-time display
                        </Badge>
                      )}
                    </Label>
                    
                    <div className="relative group">
                      <Input
                        type="text"
                        value={generatedKey.value}
                        readOnly
                        className="font-mono text-sm pr-28 h-12 bg-gray-50 border-emerald-200 focus:bg-white transition-all shadow-inner rounded-xl px-4"
                      />
                      
                      {/* Copy Button Overlay */}
                      <div className="absolute right-1 top-1 bottom-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopy}
                          className={`h-full px-4 text-sm font-medium transition-all rounded-r-xl border-l ${
                            copied 
                              ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 shadow-sm" 
                              : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-50 border-gray-200"
                          }`}
                        >
                          {copied ? (
                            <span className="flex items-center gap-1.5">
                              <Check className="h-4 w-4" /> Copied
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <Copy className="h-4 w-4" /> Copy Key
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Helper Text */}
                    {!copied && (
                      <p className="text-sm text-orange-600 flex items-center gap-2 mt-1">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Save this key securely now. It cannot be retrieved later.
                      </p>
                    )}
                  </div>

                  {/* Key Metadata */}
                  <div className="grid grid-cols-2 gap-6 p-5 bg-gray-50 rounded-xl border border-gray-100 mb-8">
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Created</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {new Date(generatedKey.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prefix</span>
                      <span className="text-sm font-mono text-gray-700">{generatedKey.prefix}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-2 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      onClick={handleCopy}
                      disabled={copied}
                      className="flex-1 h-11 px-6 text-sm font-medium transition-all hover:bg-gray-50 rounded-xl"
                    >
                      {copied ? "Copied!" : "Copy Key Again"}
                    </Button>
                    <Button 
                      onClick={handleClose}
                      className="flex-1 h-11 px-6 bg-gray-900 hover:bg-black text-white shadow-md transition-all rounded-xl"
                    >
                      Done
                    </Button>
                  </div>
                </CardContent>
              ) : (
                /* Form View - Before Generation */
                <form onSubmit={handleSubmit}>
                  <CardContent className="pt-8 pb-8 px-8">
                    <div className="space-y-4 mb-6">
                      <Label htmlFor="key-name" className="text-sm font-semibold text-gray-700">
                        Key Name
                      </Label>
                      <Input
                        id="key-name"
                        placeholder="e.g., Production Stripe Integration"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="h-12 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all rounded-xl border-gray-200"
                        disabled={isSubmitting}
                      />
                    </div>

                    {error && (
                      <div className="flex items-start gap-3 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="bg-orange-50 p-5 rounded-xl text-sm text-gray-700 border border-orange-100 mb-6">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-600 shrink-0" />
                        Security Warning
                      </p>
                      <p className="text-xs leading-relaxed opacity-90">
                        This key will be shown only once. Please copy it immediately after generation and store it securely in a password manager or secure location. You cannot retrieve the full value later.
                      </p>
                    </div>

                    <div className="flex gap-4 pt-2 border-t border-gray-100">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleClose} 
                        disabled={isSubmitting}
                        className="flex-1 h-11 px-6 text-sm font-medium transition-all hover:bg-gray-50 rounded-xl"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !keyName.trim()}
                        className="flex-1 h-11 px-6 bg-gray-900 hover:bg-black text-white shadow-md transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Generate Key
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Badge component for the success view (inline definition)
function Badge({ children, variant = "default", className }: { 
  children: React.ReactNode; 
  variant?: "default" | "outline";
  className?: string;
}) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/80",
    outline: "text-gray-950 border border-gray-200"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className || ""}`}>
      {children}
    </div>
  );
}
