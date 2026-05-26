"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { OfferCard } from "@/src/features/offers/components/offer-card";
import { WishlistEntryModel } from "@/src/features/wishlists/api/get-wishlist";

type WishlistGridProps = {
  items: WishlistEntryModel[];
  isLoading?: boolean;
};

export function WishlistGrid({ items, isLoading = false }: WishlistGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-zinc-200 p-4">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const offerItems = items.filter((entry) => Boolean(entry.offer));

  if (offerItems.length === 0) {
    return <p className="text-sm text-zinc-500">Sua lista de favoritos está vazia.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {offerItems.map((entry) => (
        <OfferCard key={entry.id} offer={entry.offer!} />
      ))}
    </div>
  );
}
