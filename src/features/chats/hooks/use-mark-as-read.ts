"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/src/shared/api/http-client";
import { useSocket } from "@/src/shared/socket/use-socket";
import { MarkAsReadPayload, MarkAsReadPayloadSchema, MessageModel } from "@/src/shared/schemas/chat.schema";

export function useMarkAsRead(chatId?: string) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();

  const mutation = useMutation({
    mutationFn: async (payload: Omit<MarkAsReadPayload, "chatId"> & { chatId?: string }) => {
      const targetChatId = payload.chatId ?? chatId;
      const parsedPayload = MarkAsReadPayloadSchema.parse({
        ...payload,
        chatId: targetChatId,
      });

      if (socket && isConnected) {
        socket.emit("markAsRead", {
          messageId: parsedPayload.messageId,
          chatId: parsedPayload.chatId,
          clientRequestId: parsedPayload.clientRequestId,
        });
        return;
      }

      await httpClient.patch(`/messages/${parsedPayload.messageId}`, {
        status: "READ",
        readAt: new Date().toISOString(),
      });
    },
    onMutate: async (payload) => {
      const targetChatId = payload.chatId ?? chatId;
      if (!targetChatId) {
        return;
      }

      const nowIso = new Date().toISOString();
      queryClient.setQueryData(["messages", targetChatId], (old: MessageModel[] | undefined) =>
        (old ?? []).map((message) =>
          message.id === payload.messageId
            ? {
                ...message,
                status: "READ",
                readAt: nowIso,
              }
            : message,
        ),
      );
    },
    onSettled: async (_data, _error, variables) => {
      const targetChatId = variables.chatId ?? chatId;
      if (!targetChatId) {
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["messages", targetChatId] });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  return {
    markAsRead: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
