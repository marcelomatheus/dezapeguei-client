"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { getOffers } from "@/src/features/offers/api/get-offers";
import { GetOffersParams, OfferModel } from "@/src/shared/schemas/offer.schema";

const PAGE_SIZE = 12;

type InfiniteOffersPage = {
  items: OfferModel[];
  nextPage?: number;
};

export function useInfiniteOffers(params: GetOffersParams = {}) {
  const allOffersRef = useRef<OfferModel[] | null>(null);

  const query = useInfiniteQuery({
    queryKey: ["offers-infinite", params],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      if (pageParam === 0 || !allOffersRef.current) {
        allOffersRef.current = await getOffers(params);
      }

      const allOffers = allOffersRef.current ?? [];
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return {
        items: allOffers.slice(start, end),
        nextPage: end < allOffers.length ? pageParam + 1 : undefined,
      } satisfies InfiniteOffersPage;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    ...query,
    offers: query.data?.pages.flatMap((page) => page.items) ?? [],
  };
}
