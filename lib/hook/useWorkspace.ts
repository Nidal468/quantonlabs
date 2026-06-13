// lib/hook/useWorkspace.ts

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "@/lib/api/workspace";

import { WorkspaceDocument } from "@/model/workspace";

export function useWorkspace() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: workspaces = [],
    isLoading,
    error,
  } = useQuery<WorkspaceDocument[]>({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  // CREATE
  const create = useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  // UPDATE
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateWorkspace(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  // DELETE
  const remove = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  return {
    workspaces,
    isLoading,
    error,

    createWorkspace: create.mutateAsync,
    updateWorkspace: update.mutateAsync,
    deleteWorkspace: remove.mutateAsync,

    isCreating: create.isPending,
    isUpdating: update.isPending,
    isDeleting: remove.isPending,
  };
}