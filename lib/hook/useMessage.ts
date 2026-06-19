"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "@/lib/api/message";

import { IMessage } from "@/model/message";

export function useMessage() {
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    error,
  } = useQuery<IMessage[]>({
    queryKey: ["messages"],
    queryFn: getMessages,

    // 🔥 IMPORTANT CHAT FIXES
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 30_000,
  });

  // =========================
  // CREATE MESSAGE (FIXED)
  // =========================
  const createMutation = useMutation({
    mutationFn: createMessage,

    onSuccess: () => {
      // ❌ DO NOT refetch immediately (THIS BREAKS STREAMING)
      // queryClient.invalidateQueries({ queryKey: ["messages"] });

      // ✔ optional: silent update later
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IMessage> }) =>
      updateMessage(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return {
    messages,
    isLoading,
    error,

    // IMPORTANT: keep async for streaming
    createMessage: createMutation.mutateAsync,

    updateMessage: updateMutation.mutateAsync,
    deleteMessage: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}