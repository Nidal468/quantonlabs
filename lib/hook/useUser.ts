// lib/hook/useUser.ts

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/user";

import { UserDocument } from "@/model/user";

export function useUser(userId?: string) {
  const queryClient = useQueryClient();

  // ======================
  // GET USERS (LIST)
  // ======================
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<UserDocument[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // ======================
  // GET SINGLE USER (optional)
  // ======================
  const singleUserQuery = useQuery<UserDocument>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId as string),
    enabled: !!userId,
  });

  // ======================
  // CREATE USER
  // ======================
  const create = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // ======================
  // UPDATE USER
  // ======================
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });
    },
  });

  // ======================
  // DELETE USER
  // ======================
  const remove = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["user", id] });
    },
  });

  return {
    // list
    users,
    isLoading,
    error,

    // single (optional)
    user: singleUserQuery.data,
    isUserLoading: singleUserQuery.isLoading,

    // mutations
    createUser: create.mutateAsync,
    updateUser: update.mutateAsync,
    deleteUser: remove.mutateAsync,

    // states
    isCreating: create.isPending,
    isUpdating: update.isPending,
    isDeleting: remove.isPending,
  };
}