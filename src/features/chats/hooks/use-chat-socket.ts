"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/src/shared/socket/use-socket";
import { MessageModel, MessageSchema } from "@/src/shared/schemas/chat.schema";

type UseChatSocketParams = {
  chatId?: string;
};

export function useChatSocket({ chatId }: UseChatSocketParams) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket || !isConnected || !chatId) {
      return;
    }

    const appendMessage = (incoming: MessageModel) => {
      queryClient.setQueryData(["messages", chatId], (old: MessageModel[] | undefined) => {
        const current = old ?? [];
        if (current.some((message) => message.id === incoming.id)) {
          return current;
        }
        return [...current, incoming];
      });

      void queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    const handleMessage = (payload: unknown) => {
      const parsed = MessageSchema.safeParse(payload);
      if (!parsed.success || parsed.data.chatId !== chatId) {
        return;
      }
      appendMessage(parsed.data);
    };

    const handleMessageSent = (payload: { message?: unknown; chatId?: string }) => {
      if (!payload?.message || payload.chatId !== chatId) {
        return;
      }

      const parsed = MessageSchema.safeParse(payload.message);
      if (!parsed.success || parsed.data.chatId !== chatId) {
        return;
      }
      appendMessage(parsed.data);
    };

    const handleMissedMessages = (payload: unknown) => {
      const arrayPayload = Array.isArray(payload) ? payload : [payload];
      for (const item of arrayPayload) {
        const parsed = MessageSchema.safeParse(item);
        if (parsed.success && parsed.data.chatId === chatId) {
          appendMessage(parsed.data);
        }
      }
    };

    socket.emit("syncMessages", {
      chatId,
    });

    socket.on("message", handleMessage);
    socket.on("messageSent", handleMessageSent);
    socket.on("missedMessages", handleMissedMessages);

    return () => {
      socket.off("message", handleMessage);
      socket.off("messageSent", handleMessageSent);
      socket.off("missedMessages", handleMissedMessages);
    };
  }, [chatId, isConnected, queryClient, socket]);

  return {
    isConnected,
  };
}
