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
  getWorkspaceTasks,
  getWorkspaceDatapages,
  generateKeyWorkspace,
  removekey,
} from "@/lib/api/workspace";

import { WorkspaceDocument } from "@/model/workspace";
import { ITask } from "@/model/task";
import { DataPageDocument } from "@/model/datapage";

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

  const useWorkspaceTasks = (id: string) => useQuery<ITask[]>({
    queryKey: ["tasks", id],
    queryFn: () => getWorkspaceTasks(id),
    enabled: !!id,
  });

  const useWorkspaceDatapages = (id: string) => useQuery<DataPageDocument[]>({
    queryKey: ["datapages", id],
    queryFn: () => getWorkspaceDatapages(id),
    enabled: !!id,
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

  const generateApiKey = useMutation({
    mutationFn: ({ id, name }: { id: string, name: string }) => generateKeyWorkspace(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  })

  const removeApiKey = useMutation({
    mutationFn: ({ id, keyId }: { id: string, keyId: string }) => removekey(id, keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  })

  return {
    workspaces,
    isLoading,
    error,

    createWorkspace: create.mutateAsync,
    updateWorkspace: update.mutateAsync,
    deleteWorkspace: remove.mutateAsync,
    generateKey: generateApiKey.mutateAsync,
    removeApiKey: removeApiKey.mutateAsync,
    useWorkspaceTasks,
    useWorkspaceDatapages,
    isCreating: create.isPending,
    isUpdating: update.isPending,
    isDeleting: remove.isPending,
  };
}