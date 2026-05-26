"use client";

import { useQuery } from "@tanstack/react-query";
import { getChatById } from "@/src/features/chats/api/get-chat-by-id";

export function useChatQuery(chatId?: string) {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChatById(chatId as string),
    enabled: Boolean(chatId),
  });
}
