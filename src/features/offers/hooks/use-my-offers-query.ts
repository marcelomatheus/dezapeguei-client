"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyOffers } from "@/src/features/offers/api/get-my-offers";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useMyOffersQuery() {
  const sellerId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["my-offers", sellerId],
    queryFn: () => getMyOffers(),
    enabled: Boolean(sellerId),
  });
}
