"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { httpClient } from "@/src/shared/api/http-client";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";

type WishlistEntry = {
  id: string;
  userId: string;
  offerId: string;
};

async function getWishlist() {
  const response = await httpClient.get<WishlistEntry[]>("/wishlists");
  return response.data;
}

async function addWishlistItem(offerId: string) {
  await httpClient.post("/wishlists/items", { offerId });
}

async function removeWishlistItem(offerId: string) {
  await httpClient.delete("/wishlists/items", { data: { offerId } });
}

export function useWishlist() {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ offerId, isFavorite }: { offerId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        await removeWishlistItem(offerId);
        return false;
      }

      await addWishlistItem(offerId);
      return true;
    },
    onSuccess: async (isFavoriteNow) => {
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(isFavoriteNow ? "Oferta adicionada aos favoritos." : "Oferta removida dos favoritos.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  const favoriteOfferIds = new Set((listQuery.data ?? []).map((item) => item.offerId));

  return {
    listQuery,
    favoriteOfferIds,
    toggle: toggleMutation.mutateAsync,
    isToggling: toggleMutation.isPending,
  };
}
