"use client";

import { BackButton } from "@/src/components/back-button";
import { WishlistGrid } from "@/src/features/wishlists/components/wishlist-grid";
import { useWishlistQuery } from "@/src/features/wishlists/hooks/use-wishlist-query";

export default function WishlistsPage() {
  const wishlistQuery = useWishlistQuery();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">Favoritos</h1>
        <p className="text-sm text-zinc-700">Salve ofertas para comparar e decidir depois.</p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
        <WishlistGrid items={wishlistQuery.data ?? []} isLoading={wishlistQuery.isLoading} />
      </section>
    </main>
  );
}
