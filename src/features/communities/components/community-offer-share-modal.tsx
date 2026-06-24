"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { useMyOffersQuery } from "@/src/features/offers/hooks/use-my-offers-query";
import { useSendCommunityOffer } from "@/src/features/communities/hooks/use-communities";

type CommunityOfferShareModalProps = {
  communityId: string;
  canSend: boolean;
};

export function CommunityOfferShareModal({ communityId, canSend }: CommunityOfferShareModalProps) {
  const [offerId, setOfferId] = useState("");
  const [content, setContent] = useState("");
  const offersQuery = useMyOffersQuery();
  const sendOffer = useSendCommunityOffer(communityId);

  if (!canSend) return null;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <h2 className="text-lg font-bold text-zinc-900">Compartilhar oferta</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <select value={offerId} onChange={(event) => setOfferId(event.target.value)} className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="">Selecione uma oferta ativa</option>
          {(offersQuery.data ?? []).filter((offer) => offer.status === "ACTIVE").map((offer) => (
            <option key={offer.id} value={offer.id}>{offer.title}</option>
          ))}
        </select>
        <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Mensagem opcional" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
        <Button
          type="button"
          disabled={!offerId || sendOffer.isPending}
          onClick={() => {
            void sendOffer.mutateAsync({ offerId, content: content || undefined });
            setOfferId("");
            setContent("");
          }}
        >
          Compartilhar
        </Button>
      </div>
    </div>
  );
}
