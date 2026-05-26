"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/src/shared/api/http-client";
import { useSocket } from "@/src/shared/socket/use-socket";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import {
  MessageModel,
  MessageSchema,
  SendMessagePayload,
  SendMessagePayloadSchema,
} from "@/src/shared/schemas/chat.schema";

function appendOrReplaceMessage(
  list: MessageModel[] | undefined,
  incoming: MessageModel,
): MessageModel[] {
  const current = list ?? [];
  const index = current.findIndex((message) => message.id === incoming.id);

  if (index === -1) {
    return [...current, incoming];
  }

  const next = [...current];
  next[index] = incoming;
  return next;
}

export function useSendMessage(chatId?: string) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();
  const userId = useAuthStore((state) => state.user?.id);

  const mutation = useMutation({
    mutationFn: async (payload: Omit<SendMessagePayload, "chatId"> & { chatId?: string }) => {
      const targetChatId = payload.chatId ?? chatId;
      const parsedPayload = SendMessagePayloadSchema.parse({
        ...payload,
        chatId: targetChatId,
      });

      if (!targetChatId || !userId) {
        throw new Error("Não foi possível enviar a mensagem.");
      }

      const clientRequestId =
        parsedPayload.clientRequestId ??
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`);

      const tempId = `temp-${clientRequestId}`;
      const nowIso = new Date().toISOString();
      const optimisticMessage: MessageModel = MessageSchema.parse({
        id: tempId,
        chatId: targetChatId,
        senderId: userId,
        content: parsedPayload.content,
        type: "TEXT",
        status: "SENDING",
        createdAt: nowIso,
        updatedAt: nowIso,
      });

      queryClient.setQueryData(["messages", targetChatId], (old: MessageModel[] | undefined) =>
        appendOrReplaceMessage(old, optimisticMessage),
      );

      if (socket && isConnected) {
        await new Promise<void>((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            socket.off("messageSent", onMessageSent);
            reject(new Error("Timeout ao confirmar envio da mensagem."));
          }, 10000);

          const onMessageSent = (ackPayload: {
            chatId?: string;
            clientRequestId?: string;
            message?: unknown;
          }) => {
            if (
              ackPayload?.chatId !== targetChatId ||
              ackPayload?.clientRequestId !== clientRequestId ||
              !ackPayload.message
            ) {
              return;
            }

            const parsedMessage = MessageSchema.safeParse(ackPayload.message);
            if (!parsedMessage.success) {
              return;
            }

            clearTimeout(timeoutId);
            socket.off("messageSent", onMessageSent);

            queryClient.setQueryData(
              ["messages", targetChatId],
              (old: MessageModel[] | undefined) => {
                const withoutTemp = (old ?? []).filter((message) => message.id !== tempId);
                return appendOrReplaceMessage(withoutTemp, parsedMessage.data);
              },
            );

            resolve();
          };

          socket.on("messageSent", onMessageSent);
          socket.emit("sendMessage", {
            ...parsedPayload,
            chatId: targetChatId,
            clientRequestId,
          });
        });

        return;
      }

      const response = await httpClient.post("/messages", {
        chatId: targetChatId,
        senderId: userId,
        content: parsedPayload.content,
      });

      const parsedMessage = MessageSchema.parse(response.data);
      queryClient.setQueryData(["messages", targetChatId], (old: MessageModel[] | undefined) => {
        const withoutTemp = (old ?? []).filter((message) => message.id !== tempId);
        return appendOrReplaceMessage(withoutTemp, parsedMessage);
      });
    },
    onError: (_error, variables) => {
      const targetChatId = variables.chatId ?? chatId;
      if (!targetChatId) {
        return;
      }

      queryClient.setQueryData(["messages", targetChatId], (old: MessageModel[] | undefined) =>
        (old ?? []).filter((message) => !message.id.startsWith("temp-")),
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
    sendMessage: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
