"use client";

import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "@/src/features/wishlists/api/get-wishlist";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useWishlistQuery() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlist(userId as string),
    enabled: Boolean(userId),
  });
}
