"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/src/features/chats/api/get-messages";

export function useMessagesQuery(chatId?: string) {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId as string),
    enabled: Boolean(chatId),
  });
}
