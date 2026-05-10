"use client";

import Link from "next/link";
import { useState } from "react";
import { BackButton } from "@/src/components/back-button";
import { OfferActions } from "@/src/features/offers/components/offer-actions";
import { QuickEditOfferDialog } from "@/src/features/offers/components/quick-edit-offer-dialog";
import { OfferStatusBadge } from "@/src/features/offers/components/offer-status-badge";
import { useDeleteOffer } from "@/src/features/offers/hooks/use-delete-offer";
import { useMyOffersQuery } from "@/src/features/offers/hooks/use-my-offers-query";
import { useUpdateOfferStatus } from "@/src/features/offers/hooks/use-update-offer-status";

export default function MyOffersPage() {
  const offersQuery = useMyOffersQuery();
  const deleteOffer = useDeleteOffer();
  const updateStatus = useUpdateOfferStatus();
  const [quickEditOfferId, setQuickEditOfferId] = useState<string | null>(null);

  const closeQuickEdit = (open: boolean) => {
    if (!open) {
      setQuickEditOfferId(null);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4 flex justify-between gap-3">
        <BackButton fallbackHref="/offers" />
        <Link href="/offers/create" className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white">
          Nova oferta
        </Link>
      </div>
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Minhas ofertas</h1>
      <div className="grid gap-4">
        {(offersQuery.data ?? []).map((offer) => (
          <article key={offer.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">{offer.title}</h2>
              <OfferActions
                onEdit={() => {
                  setQuickEditOfferId(offer.id);
                }}
                onDelete={() => {
                  void deleteOffer.removeOffer(offer.id);
                }}
                onStatusChange={(status) => {
                  void updateStatus.updateStatus({ offerId: offer.id, status });
                }}
                isLoading={deleteOffer.isPending || updateStatus.isPending}
              />
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-700">Status:</span>
              <OfferStatusBadge status={offer.status} />
            </div>

            <Link href={`/offers/${offer.id}/edit`} className="mt-3 inline-block text-sm font-medium text-orange-800 hover:underline">
              Edicao completa
            </Link>
          </article>
        ))}
      </div>

      <QuickEditOfferDialog offerId={quickEditOfferId} open={Boolean(quickEditOfferId)} onOpenChange={closeQuickEdit} />
    </main>
  );
}
