"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/src/shared/socket/use-socket";
import { CommunityMessage, CommunityMessageSchema } from "@/src/shared/schemas/community.schema";

export function useCommunitySocket(communityId?: string) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket || !isConnected || !communityId) return;

    const appendMessage = (payload: unknown) => {
      const parsed = CommunityMessageSchema.safeParse(payload);
      if (!parsed.success || parsed.data.communityId !== communityId) return;

      queryClient.setQueryData(["community-messages", communityId], (old: CommunityMessage[] | undefined) => {
        const current = old ?? [];
        if (current.some((message) => message.id === parsed.data.id)) return current;
        return [...current, parsed.data];
      });
    };

    socket.emit("community:join", { communityId });
    socket.on("community:message:new", appendMessage);
    socket.on("community:offer:new", appendMessage);

    return () => {
      socket.emit("community:leave", { communityId });
      socket.off("community:message:new", appendMessage);
      socket.off("community:offer:new", appendMessage);
    };
  }, [communityId, isConnected, queryClient, socket]);

  return { isConnected };
}
