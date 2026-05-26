"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { findOrCreateDirectChat } from "@/src/features/chats/api/create-chat";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useStartConversation() {
  const router = useRouter();
  const currentUserId = useAuthStore((state) => state.user?.id);

  const mutation = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!currentUserId) {
        throw new Error("Usuário não autenticado.");
      }

      return findOrCreateDirectChat([currentUserId, targetUserId]);
    },
    onSuccess: (chat) => {
      router.push(`/chats/${chat.id}`);
      toast.success("Conversa iniciada com sucesso.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    startConversation: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
