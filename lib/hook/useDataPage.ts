// /lib/hook/useDataPage.ts

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getDataPages, createDataPage, updateDataPage, deleteDataPage } from "@/lib/api/datapage";
import { DataPageDocument } from "@/model/datapage";

export function useDataPage() {
  const queryClient = useQueryClient();

  const {
    data: datapages = [],
    isLoading,
    error,
  } = useQuery<DataPageDocument[]>({
    queryKey: ["datapages"],
    queryFn: getDataPages,
  });

  const createMutation = useMutation({
    mutationFn: createDataPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datapages"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DataPageDocument> }) => updateDataPage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datapages"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDataPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datapages"] });
    },
  });

  return {
    datapages,
    isLoading,
    error,
    createDataPage: createMutation.mutateAsync,
    updateDataPage: updateMutation.mutateAsync,
    deleteDataPage: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
