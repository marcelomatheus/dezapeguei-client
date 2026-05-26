"use client";

import Link from "next/link";
import { Offer } from "@/src/shared/types/domain";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

type OffersGridProps = {
  offers: Offer[];
};

export function OffersGrid({ offers }: OffersGridProps) {
  if (offers.length === 0) {
    return <p className="text-sm text-zinc-600">Nenhuma oferta encontrada.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <li key={offer.id} className="rounded-xl border border-zinc-200 p-4 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-900">{offer.title}</h2>
          <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{offer.description}</p>
          <p className="mt-3 text-lg font-bold text-zinc-900">{formatMoneyBRL(offer.price)}</p>
          <Link className="mt-4 inline-flex text-sm font-medium text-blue-600" href={`/offers/${offer.id}`}>
            Ver detalhes
          </Link>
        </li>
      ))}
    </ul>
  );
}
