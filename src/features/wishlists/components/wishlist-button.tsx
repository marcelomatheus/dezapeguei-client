"use client";

import { Heart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthSession } from "@/src/shared/auth/use-auth-session";
import { useWishlistQuery } from "@/src/features/wishlists/hooks/use-wishlist-query";
import { useToggleWishlist } from "@/src/features/wishlists/hooks/use-toggle-wishlist";
import { useAuthStore } from "@/src/shared/auth/auth-store";

type WishlistButtonProps = {
  offerId: string;
  className?: string;
};

export function WishlistButton({ offerId, className }: WishlistButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isHydrating } = useAuthSession();
  const userId = useAuthStore((state) => state.user?.id);
  const wishlistQuery = useWishlistQuery();
  const { toggleWishlist, isPending } = useToggleWishlist();

  const favoriteOfferIds = new Set((wishlistQuery.data ?? []).map((entry) => entry.offerId));
  const isFavorite = favoriteOfferIds.has(offerId);

  return (
    <button
      type="button"
      disabled={isPending || isHydrating}
      onClick={() => {
        if (!userId) {
          const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
          router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
          return;
        }

        void toggleWishlist({ offerId, isFavorite });
      }}
      className={[
        "inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium",
        isFavorite ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-zinc-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart className={["h-4 w-4", isFavorite ? "fill-current" : ""].join(" ")} />
      {isFavorite ? "Nos favoritos" : "Favoritar"}
    </button>
  );
}
