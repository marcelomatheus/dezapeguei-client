"use client";

import { useWishlist } from "@/src/features/wishlists/hooks/use-wishlist";

type WishlistToggleButtonProps = {
  offerId: string;
};

export function WishlistToggleButton({ offerId }: WishlistToggleButtonProps) {
  const { favoriteOfferIds, toggle, isToggling } = useWishlist();
  const isFavorite = favoriteOfferIds.has(offerId);

  return (
    <button
      type="button"
      disabled={isToggling}
      onClick={() => {
        void toggle({ offerId, isFavorite });
      }}
      className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium"
    >
      {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    </button>
  );
}
