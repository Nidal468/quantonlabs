"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getPackages, createPackage, updatePackage, deletePackage } from "@/lib/api/package";
import { PackageDocument } from "@/model/package";

export function usePackage() {
  const queryClient = useQueryClient();

  const {
    data: packages = [],
    isLoading,
    error,
  } = useQuery<PackageDocument[]>({
    queryKey: ["packages"],
    queryFn: getPackages,
  });

  const createMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PackageDocument> }) =>
      updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  return {
    packages,
    isLoading,
    error,

    createPackage: createMutation.mutateAsync,
    updatePackage: updateMutation.mutateAsync,
    deletePackage: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
