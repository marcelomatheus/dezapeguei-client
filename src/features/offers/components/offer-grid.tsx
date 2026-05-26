"use client";

import { OfferCard } from "@/src/features/offers/components/offer-card";
import { OfferModel } from "@/src/shared/schemas/offer.schema";

type OfferGridProps = {
  offers: OfferModel[];
};

export function OfferGrid({ offers }: OfferGridProps) {
  if (offers.length === 0) {
    return <p className="text-sm text-zinc-600">Nenhuma oferta encontrada.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <li key={offer.id}>
          <OfferCard offer={offer} />
        </li>
      ))}
    </ul>
  );
}
