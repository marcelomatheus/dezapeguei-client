"use client";

import { useMemo } from "react";
import { Offer } from "@/src/shared/types/domain";
import { useAuthSession } from "@/src/features/auth/hooks/use-auth-session";

type OfferActionGuards = {
  canEdit: boolean;
  canFavorite: boolean;
  canStartConversation: boolean;
  canBuy: boolean;
  reason: string | null;
};

export function useOfferActionsGuards(offer: Offer | null): OfferActionGuards {
  const { user, isAuthenticated } = useAuthSession();

  return useMemo(() => {
    if (!offer) {
      return {
        canEdit: false,
        canFavorite: false,
        canStartConversation: false,
        canBuy: false,
        reason: "Oferta indisponível.",
      };
    }

    if (!isAuthenticated || !user) {
      return {
        canEdit: false,
        canFavorite: false,
        canStartConversation: false,
        canBuy: false,
        reason: "Faça login para executar esta ação.",
      };
    }

    const isOwner = user.id === offer.sellerId;

    if (isOwner) {
      return {
        canEdit: true,
        canFavorite: false,
        canStartConversation: false,
        canBuy: false,
        reason: "Você não pode comprar ou negociar a própria oferta.",
      };
    }

    const isActive = offer.status === "ACTIVE";

    return {
      canEdit: false,
      canFavorite: isActive,
      canStartConversation: isActive,
      canBuy: isActive,
      reason: isActive ? null : "Esta oferta não está disponível para negociação.",
    };
  }, [isAuthenticated, offer, user]);
}
