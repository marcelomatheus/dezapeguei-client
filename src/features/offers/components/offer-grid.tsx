"use client";

import { OfferCard } from "@/src/features/offers/components/offer-card";
import { OfferModel } from "@/src/shared/schemas/offer.schema";

type OfferGridProps = {
  offers: OfferModel[];
};

export function OfferGrid({ offers }: OfferGridProps) {
  if (offers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
        <h2 className="text-base font-semibold text-zinc-900">Nenhuma oferta encontrada</h2>
        <p className="mt-1 text-sm text-zinc-600">Tente mudar a busca, remover filtros ou explorar outra categoria.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {offers.map((offer) => (
        <li key={offer.id}>
          <OfferCard offer={offer} />
        </li>
      ))}
    </ul>
  );
}
