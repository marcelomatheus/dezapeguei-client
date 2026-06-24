"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommunities, getCommunity, getCommunityMessages, joinCommunity, sendCommunityMessage, sendCommunityOffer } from "@/src/features/communities/api/communities-api";

export function useCommunitiesQuery() {
  return useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });
}

export function useCommunityQuery(slug: string) {
  return useQuery({
    queryKey: ["community", slug],
    queryFn: () => getCommunity(slug),
    enabled: !!slug,
  });
}

export function useCommunityMessagesQuery(communityId?: string) {
  return useQuery({
    queryKey: ["community-messages", communityId],
    queryFn: () => getCommunityMessages(communityId ?? ""),
    enabled: !!communityId,
  });
}

export function useJoinCommunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinCommunity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
}

export function useSendCommunityMessage(communityId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendCommunityMessage(communityId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["community-messages", communityId] });
    },
  });
}

export function useSendCommunityOffer(communityId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, content }: { offerId: string; content?: string }) => sendCommunityOffer(communityId, offerId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["community-messages", communityId] });
    },
  });
}
