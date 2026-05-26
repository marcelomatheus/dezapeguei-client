"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { markAsRead } from "@/src/features/notifications/api/mark-as-read";
import { markAllAsRead } from "@/src/features/notifications/api/mark-all-as-read";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  const markOneMutation = useMutation({
    mutationFn: (id: string) => markAsRead({ id }),
    onSuccess: async () => {
      if (userId) {
        await queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      }
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  const markAllMutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        return;
      }

      await markAllAsRead(userId);
    },
    onSuccess: async () => {
      if (userId) {
        await queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      }
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    markAsRead: markOneMutation.mutateAsync,
    markAllAsRead: markAllMutation.mutateAsync,
    isPending: markOneMutation.isPending || markAllMutation.isPending,
  };
}
