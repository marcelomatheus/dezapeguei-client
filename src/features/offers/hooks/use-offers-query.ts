"use client";

import { useQuery } from "@tanstack/react-query";
import { getOffers } from "@/src/features/offers/api/get-offers";
import { GetOffersParams } from "@/src/shared/schemas/offer.schema";

type UseOffersQueryParams = GetOffersParams;

export function useOffersQuery(params: UseOffersQueryParams = {}) {
  return useQuery({
    queryKey: ["offers", params],
    queryFn: () => getOffers(params),
  });
}
