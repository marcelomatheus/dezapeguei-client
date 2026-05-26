"use client";

import { Offer } from "@/src/shared/types/domain";
import { useAuthSession } from "@/src/features/auth/hooks/use-auth-session";

export function useCreateSaleGuard(offer: Offer | null) {
  const { user, isAuthenticated } = useAuthSession();

  if (!offer) {
    return {
      canCreateSale: false,
      reason: "Oferta indisponível.",
    };
  }

  if (!isAuthenticated || !user) {
    return {
      canCreateSale: false,
      reason: "Faça login para finalizar a compra.",
    };
  }

  if (offer.sellerId === user.id) {
    return {
      canCreateSale: false,
      reason: "Você não pode comprar a própria oferta.",
    };
  }

  if (offer.status !== "ACTIVE") {
    return {
      canCreateSale: false,
      reason: "Esta oferta não está disponível para compra.",
    };
  }

  return {
    canCreateSale: true,
    reason: null,
  };
}
