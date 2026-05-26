"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/src/features/offers/api/get-categories";

export function useCategoriesQuery(search?: string) {
  return useQuery({
    queryKey: ["offer-categories", search ?? ""],
    queryFn: () => getCategories(search),
  });
}
