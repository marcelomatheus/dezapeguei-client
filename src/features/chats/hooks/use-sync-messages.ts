"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/src/shared/socket/use-socket";
import { SyncMessagesPayloadSchema } from "@/src/shared/schemas/chat.schema";

type UseSyncMessagesParams = {
  chatId?: string;
};

export function useSyncMessages({ chatId }: UseSyncMessagesParams) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();

  const mutation = useMutation({
    mutationFn: async (since?: string) => {
      if (!socket || !isConnected || !chatId) {
        return;
      }

      const parsed = SyncMessagesPayloadSchema.parse({ since });
      socket.emit("syncMessages", {
        chatId,
        since: parsed.since,
      });
    },
    onSettled: async () => {
      if (!chatId) {
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  return {
    syncMessages: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
