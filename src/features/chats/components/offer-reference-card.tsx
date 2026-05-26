"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { OfferModel } from "@/src/shared/schemas/offer.schema";

type OfferReferenceCardProps = {
  offer: Pick<OfferModel, "id" | "title" | "price" | "imageUrl">;
};

export function OfferReferenceCard({ offer }: OfferReferenceCardProps) {
  const firstImage = offer.imageUrl[0];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Oferta em negociação</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
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
          <p className="truncate text-sm font-medium text-zinc-900">{offer.title}</p>
          <p className="text-xs text-zinc-500">R$ {offer.price.toFixed(2)}</p>
        </div>
        <Link href={`/offers/${offer.id}`} className="text-xs font-medium text-orange-600 hover:text-orange-700">
          Ver
        </Link>
      </CardContent>
    </Card>
  );
}
