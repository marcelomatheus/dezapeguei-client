"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { WishlistButton } from "@/src/features/wishlists/components/wishlist-button";
import { EntrepreneurBadge } from "@/src/features/entrepreneur/components/entrepreneur-badge";
import { getOfferConditionLabel, getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { OfferModel } from "@/src/shared/schemas/offer.schema";
import { formatDateBR, formatMoneyBRL } from "@/src/shared/utils/formatters";

type OfferCardProps = {
  offer: OfferModel;
};

export function OfferCard({ offer }: OfferCardProps) {
  const hasImage = offer.imageUrl.length > 0;
  const hasPromotion = typeof offer.promotion === "number" && offer.promotion > 0 && offer.promotion < offer.price;
  const sellerName = offer.seller?.entrepreneur?.businessName ?? offer.seller?.name;
  const isEntrepreneur = offer.badges?.includes("ENTREPRENEUR_VERIFIED") ?? false;

  return (
    <article className="group relative h-full overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:border-orange-300 hover:shadow-md">
      <Link href={`/offers/${offer.id}`} className="block h-full" aria-label={`Ver detalhes de ${offer.title}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          {hasImage ? (
            <Image
              src={offer.imageUrl[0]}
              alt={offer.title}
              fill
              unoptimized
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-200 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
              Sem imagem
            </div>
          )}

          {offer.status === "SOLD" || offer.status === "SOLD_OUT" ? (
            <div className="absolute left-2 top-2">
              <Badge variant="warning">{getOfferStatusLabel(offer.status)}</Badge>
            </div>
          ) : null}
        </div>

        <div className="space-y-2 p-3">
          <p className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-zinc-900">
            {offer.title}
          </p>

          <div>
            {hasPromotion ? (
              <p className="text-xs text-zinc-400 line-through">{formatMoneyBRL(offer.price)}</p>
            ) : null}
            <p className="text-xl font-bold text-orange-600">
              {formatMoneyBRL(hasPromotion ? (offer.promotion as number) : offer.price)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
            <span>{getOfferConditionLabel(offer.condition)}</span>
            <span aria-hidden="true">•</span>
            <span>{formatDateBR(offer.createdAt)}</span>
          </div>

          <div className="flex min-h-6 items-center gap-1.5 text-xs text-zinc-600">
            <EntrepreneurBadge active={isEntrepreneur} compact />
            {sellerName ? <span className="truncate">{sellerName}</span> : <span>Vendedor verificado</span>}
          </div>
        </div>
      </Link>

      <div className="absolute right-2 top-2 z-10">
        <WishlistButton offerId={offer.id} className="bg-white/95 shadow-sm" />
      </div>
    </article>
  );
}
