"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { httpClient } from "@/src/shared/api/http-client";
import { env } from "@/src/shared/config/env";
import { getAccessToken } from "@/src/shared/auth/token-storage";
import { Message } from "@/src/shared/types/domain";

type UseChatRoomParams = {
  chatId: string;
};

async function getMessages(chatId: string) {
  const response = await httpClient.get<Message[]>("/messages", { params: { chatId } });
  return response.data;
}

export function useChatRoom({ chatId }: UseChatRoomParams) {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  const messagesQuery = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
    enabled: Boolean(chatId),
  });

  useEffect(() => {
    const token = getAccessToken();

    if (!token || !chatId) {
      return;
    }

    const nextSocket = io(env.NEXT_PUBLIC_WS_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    const onMessage = () => {
      void queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
      void queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    nextSocket.emit("syncMessages", { chatId });
    nextSocket.on("message", onMessage);

    socketRef.current = nextSocket;

    return () => {
      nextSocket.off("message", onMessage);
      nextSocket.disconnect();
      socketRef.current = null;
    };
  }, [chatId, queryClient]);

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", { chatId, content });
        return;
      }

      await httpClient.post("/messages", { chatId, content, type: "TEXT" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });

  const messages = useMemo(() => messagesQuery.data ?? [], [messagesQuery.data]);

  return {
    messages,
    isLoading: messagesQuery.isLoading,
    isSending: sendMutation.isPending,
    sendMessage: sendMutation.mutateAsync,
  };
}
