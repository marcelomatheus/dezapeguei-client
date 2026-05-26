"use client";

import { useQuery } from "@tanstack/react-query";
import { getOfferById } from "@/src/features/offers/api/get-offer-by-id";

export function useOfferQuery(offerId?: string) {
  return useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferById(offerId as string),
    enabled: Boolean(offerId),
  });
}
