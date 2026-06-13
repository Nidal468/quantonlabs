"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getAgents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
} from "@/lib/api/agent";

import { AgentDocument } from "@/model/agent";

export function useAgent() {
    const queryClient = useQueryClient();

    // ======================
    // GET ALL AGENTS
    // ======================
    const {
        data: agents = [],
        isLoading,
        error,
    } = useQuery<AgentDocument[]>({
        queryKey: ["agents"],
        queryFn: getAgents,
    });

    // ======================
    // GET SINGLE AGENT (optional helper)
    // ======================
    const useSingleAgent = (id: string) =>
        useQuery<AgentDocument>({
            queryKey: ["agent", id],
            queryFn: () => getAgent(id),
            enabled: !!id,
        });

    // ======================
    // CREATE
    // ======================
    const create = useMutation({
        mutationFn: createAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agents"] });
        },
    });

    // ======================
    // UPDATE
    // ======================
    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            updateAgent(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["agents"] });

            // also refresh single agent cache if used
            queryClient.invalidateQueries({
                queryKey: ["agent", variables.id],
            });
        },
    });

    // ======================
    // DELETE
    // ======================
    const remove = useMutation({
        mutationFn: deleteAgent,
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["agents"] });

            queryClient.removeQueries({
                queryKey: ["agent", id],
            });
        },
    });

    return {
        // data
        agents,
        isLoading,
        error,

        // single agent hook helper
        useSingleAgent,

        // actions
        createAgent: create.mutateAsync,
        updateAgent: update.mutateAsync,
        deleteAgent: remove.mutateAsync,

        // states
        isCreating: create.isPending,
        isUpdating: update.isPending,
        isDeleting: remove.isPending,
    };
}