"use client";

import { useEffect } from "react";
import { Community } from "@/src/shared/schemas/community.schema";
import { useCommunityMessagesQuery, useJoinCommunity, useSendCommunityMessage } from "@/src/features/communities/hooks/use-communities";
import { useCommunitySocket } from "@/src/features/communities/hooks/use-community-socket";
import { CommunityMessageInput } from "@/src/features/communities/components/community-message-input";
import { CommunityMessageList } from "@/src/features/communities/components/community-message-list";
import { CommunityOfferShareModal } from "@/src/features/communities/components/community-offer-share-modal";
import { useQuery } from "@tanstack/react-query";
import { getEntrepreneurMe } from "@/src/features/entrepreneur/api/entrepreneur-api";

type CommunityRoomProps = {
  community: Community;
};

export function CommunityRoom({ community }: CommunityRoomProps) {
  const join = useJoinCommunity();
  const messagesQuery = useCommunityMessagesQuery(community.id);
  const sendMessage = useSendCommunityMessage(community.id);
  const entrepreneurQuery = useQuery({
    queryKey: ["entrepreneur-me"],
    queryFn: getEntrepreneurMe,
    retry: false,
  });
  useCommunitySocket(community.id);
  const { mutateAsync: joinCommunityMutation } = join;
  const { refetch: refetchMessages } = messagesQuery;

  useEffect(() => {
    void joinCommunityMutation(community.id).then(() => {
      void refetchMessages();
    });
  }, [community.id, joinCommunityMutation, refetchMessages]);

  const canSend = entrepreneurQuery.data?.entrepreneur.isActive ?? false;

  return (
    <div className="page-motion space-y-5">
      <section className="surface-motion rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">Comunidade</p>
            <h1 className="mt-1 text-3xl font-black text-zinc-950">{community.name}</h1>
            <p className="mt-2 text-sm text-zinc-600">{community.description ?? "Comunidade DeZapeguei"}</p>
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
            {canSend ? "Publicação liberada" : "Somente leitura"}
          </span>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-4">
          <CommunityMessageInput canSend={canSend} isPending={sendMessage.isPending} onSend={(content) => sendMessage.mutate(content)} />
          <CommunityOfferShareModal communityId={community.id} canSend={canSend} />
        </aside>
        <CommunityMessageList messages={messagesQuery.data ?? []} />
      </div>
    </div>
  );
}
