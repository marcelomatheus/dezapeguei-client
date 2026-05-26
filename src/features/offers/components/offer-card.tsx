"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { WishlistButton } from "@/src/features/wishlists/components/wishlist-button";
import { getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { OfferModel } from "@/src/shared/schemas/offer.schema";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

type OfferCardProps = {
  offer: OfferModel;
};

export function OfferCard({ offer }: OfferCardProps) {
  const hasImage = offer.imageUrl.length > 0;

  return (
    <Card className="h-full">
      {hasImage ? (
        <div className="relative h-44 w-full overflow-hidden rounded-lg">
          <div className="absolute right-2 top-2 z-10">
            <WishlistButton offerId={offer.id} className="bg-white/95" />
          </div>
          <Image
            src={offer.imageUrl[0]}
            alt={offer.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-44 w-full items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-500">
          Sem imagem
        </div>
      )}

      <CardHeader className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-2">{offer.title}</CardTitle>
          {offer.status === "SOLD" || offer.status === "SOLD_OUT" ? <Badge variant="warning">{getOfferStatusLabel(offer.status)}</Badge> : null}
        </div>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-sm text-zinc-600">{offer.description}</p>
        <p className="mt-3 text-lg font-semibold text-zinc-900">{formatMoneyBRL(offer.price)}</p>

        <Link href={`/offers/${offer.id}`} className="mt-4 inline-flex text-sm font-medium text-orange-700 hover:text-orange-800">
          Ver detalhes
        </Link>
      </CardContent>
    </Card>
  );
}
