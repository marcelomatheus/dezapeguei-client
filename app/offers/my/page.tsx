"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BackButton } from "@/src/components/back-button";
import { OfferActions } from "@/src/features/offers/components/offer-actions";
import { QuickEditOfferDialog } from "@/src/features/offers/components/quick-edit-offer-dialog";
import { OfferStatusBadge } from "@/src/features/offers/components/offer-status-badge";
import { useDeleteOffer } from "@/src/features/offers/hooks/use-delete-offer";
import { useMyOffersQuery } from "@/src/features/offers/hooks/use-my-offers-query";
import { useUpdateOfferStatus } from "@/src/features/offers/hooks/use-update-offer-status";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

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
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4 flex justify-between gap-3">
        <BackButton fallbackHref="/offers" />
        <Link href="/offers/create" className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
          Nova oferta
        </Link>
      </div>
      <header className="mb-5 rounded-lg border border-zinc-200 bg-white p-5">
        <h1 className="text-2xl font-black text-zinc-950">Meus anúncios</h1>
        <p className="mt-1 text-sm text-zinc-600">Acompanhe preço, status e ações rápidas dos produtos publicados.</p>
      </header>
      <div className="grid gap-3">
        {(offersQuery.data ?? []).map((offer) => (
          <article key={offer.id} className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-[96px_1fr_auto] sm:items-center">
              <div className="relative h-24 w-full overflow-hidden rounded-md bg-zinc-100 sm:w-24">
                {offer.imageUrl[0] ? (
                  <Image src={offer.imageUrl[0]} alt={offer.title} fill unoptimized className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-500">Sem imagem</div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-zinc-900">{offer.title}</h2>
                  <OfferStatusBadge status={offer.status} />
                </div>
                <p className="mt-1 text-lg font-bold text-orange-600">{formatMoneyBRL(offer.price)}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <Link href={`/offers/${offer.id}`} className="font-medium text-zinc-700 hover:text-orange-700">
                    Ver anúncio
                  </Link>
                  <Link href={`/offers/${offer.id}/edit`} className="font-medium text-orange-700 hover:text-orange-800">
                    Edição completa
                  </Link>
                </div>
              </div>

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
          </article>
        ))}
        {(offersQuery.data ?? []).length === 0 && !offersQuery.isLoading ? (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
            <h2 className="font-semibold text-zinc-900">Você ainda não publicou anúncios</h2>
            <p className="mt-1 text-sm text-zinc-600">Crie sua primeira oferta para começar a vender.</p>
          </div>
        ) : null}
      </div>

      <QuickEditOfferDialog offerId={quickEditOfferId} open={Boolean(quickEditOfferId)} onOpenChange={closeQuickEdit} />
    </main>
  );
}
