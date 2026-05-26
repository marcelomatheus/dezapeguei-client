"use client";

import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/src/features/chats/api/get-chats";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useChatsQuery() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["chats", userId],
    queryFn: () => getChats(userId),
    enabled: Boolean(userId),
  });
}
