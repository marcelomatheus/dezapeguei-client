"use client";

import { useMemo } from "react";
import { Button } from "@/src/components/ui/button";
import { useCreateSale } from "@/src/features/sales/hooks/use-create-sale";
import { ChatModel } from "@/src/shared/schemas/chat.schema";
import { Offer } from "@/src/shared/types/domain";

type ConfirmSaleButtonProps = {
  chat: ChatModel;
  offer: Offer | null;
  currentUserId?: string;
};

export function ConfirmSaleButton({ chat, offer, currentUserId }: ConfirmSaleButtonProps) {
  const { createSale, isPending } = useCreateSale();

  const buyerId = useMemo(() => {
    if (!currentUserId || !chat.participants) {
      return null;
    }

    return chat.participants.find((participant) => participant.userId !== currentUserId)?.userId ?? null;
  }, [chat.participants, currentUserId]);

  const canConfirmSale = Boolean(
    currentUserId &&
      buyerId &&
      offer &&
      offer.status === "ACTIVE" &&
      offer.sellerId === currentUserId,
  );

  if (!canConfirmSale || !offer || !buyerId) {
    return null;
  }

  return (
    <Button
      type="button"
      isLoading={isPending}
      onClick={() => {
        if (!window.confirm("Confirma a venda desta oferta para este comprador?")) {
          return;
        }

        void createSale({
          offerId: offer.id,
          buyerId,
          amount: offer.price,
          status: "COMPLETED",
        });
      }}
    >
      Confirmar venda
    </Button>
  );
}
