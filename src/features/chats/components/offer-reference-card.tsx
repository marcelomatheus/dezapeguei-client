"use client";

import Link from "next/link";
import Image from "next/image";
import { OfferModel } from "@/src/shared/schemas/offer.schema";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

type OfferReferenceCardProps = {
  offer: Pick<OfferModel, "id" | "title" | "price" | "imageUrl">;
};

export function OfferReferenceCard({ offer }: OfferReferenceCardProps) {
  const firstImage = offer.imageUrl[0];

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={offer.title}
            width={56}
            height={56}
            className="h-14 w-14 rounded-md object-cover"
          />
        ) : (
          <div className="h-14 w-14 rounded-md bg-zinc-200" />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Oferta em negociação</p>
          <p className="truncate text-sm font-semibold text-slate-900">{offer.title}</p>
          <p className="text-xs text-slate-500">{formatMoneyBRL(offer.price)}</p>
        </div>
        <Link href={`/offers/${offer.id}`} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
          Ver
        </Link>
    </div>
  );
}
