"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToWishlist } from "@/src/features/wishlists/api/add-to-wishlist";
import { removeFromWishlist } from "@/src/features/wishlists/api/remove-from-wishlist";
import { WishlistEntryModel } from "@/src/features/wishlists/api/get-wishlist";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  const mutation = useMutation({
    mutationFn: async ({ offerId, isFavorite }: { offerId: string; isFavorite: boolean }) => {
      if (!userId) {
        throw new Error("Faça login para gerenciar favoritos.");
      }

      if (isFavorite) {
        await removeFromWishlist({ userId, offerId });
        return false;
      }

      await addToWishlist({ userId, offerId });
      return true;
    },
    onMutate: async ({ offerId, isFavorite }) => {
      if (!userId) {
        return { previousWishlist: undefined as WishlistEntryModel[] | undefined };
      }

      await queryClient.cancelQueries({ queryKey: ["wishlist", userId] });
      const previousWishlist = queryClient.getQueryData<WishlistEntryModel[]>(["wishlist", userId]);

      queryClient.setQueryData<WishlistEntryModel[]>(["wishlist", userId], (old) => {
        const current = old ?? [];

        if (isFavorite) {
          return current.filter((entry) => entry.offerId !== offerId);
        }

        return [
          ...current,
          {
            id: `optimistic-${offerId}`,
            userId,
            offerId,
          },
        ];
      });

      return { previousWishlist };
    },
    onError: (error, _variables, context) => {
      if (userId && context?.previousWishlist) {
        queryClient.setQueryData(["wishlist", userId], context.previousWishlist);
      }
      toast.error(normalizeApiError(error));
    },
    onSuccess: async (isFavoriteNow) => {
      if (userId) {
        await queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
      }
      toast.success(isFavoriteNow ? "Oferta adicionada aos favoritos." : "Oferta removida dos favoritos.");
    },
  });

  return {
    toggleWishlist: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
