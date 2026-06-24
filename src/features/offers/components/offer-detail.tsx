"use client";

import { Badge } from "@/src/components/ui/badge";
import { OfferModel } from "@/src/shared/schemas/offer.schema";
import { ImageGallery } from "@/src/features/offers/components/image-gallery";
import { UserProfileModel } from "@/src/shared/schemas/profile.schema";
import { getOfferConditionLabel, getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { formatDateBR, formatMoneyBRL } from "@/src/shared/utils/formatters";
import { EntrepreneurBadge } from "@/src/features/entrepreneur/components/entrepreneur-badge";

type OfferDetailProps = {
  offer: OfferModel;
  seller?: UserProfileModel | null;
  categoryName?: string;
  whatsappUrl?: string | null;
};

export function OfferDetail({ offer, seller = null, categoryName, whatsappUrl }: OfferDetailProps) {
  const hasPromotion = typeof offer.promotion === "number" && offer.promotion > 0 && offer.promotion < offer.price;
  const isEntrepreneurOffer = offer.badges?.includes("ENTREPRENEUR_VERIFIED") ?? false;
  const sellerName = offer.seller?.entrepreneur?.businessName ?? seller?.name ?? offer.seller?.name ?? "Não informado";

  return (
    <article className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.25fr)_380px]">
      <ImageGallery images={offer.imageUrl} title={offer.title} />

      <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold leading-tight text-zinc-950">{offer.title}</h1>
          {offer.status === "SOLD" || offer.status === "SOLD_OUT" ? <Badge variant="warning">{getOfferStatusLabel(offer.status)}</Badge> : null}
        </div>

        <div className="mt-4 border-b border-zinc-100 pb-4">
          {hasPromotion ? <p className="text-sm text-zinc-500 line-through">{formatMoneyBRL(offer.price)}</p> : null}
          <p className="text-4xl font-black text-orange-600">{formatMoneyBRL(hasPromotion ? (offer.promotion as number) : offer.price)}</p>
          <p className="mt-1 text-xs text-zinc-500">Publicado em {formatDateBR(offer.createdAt)}</p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-600">
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="font-medium text-zinc-800">Categoria</dt>
            <dd>{categoryName ?? "Não informado"}</dd>
          </div>
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="font-medium text-zinc-800">Condição</dt>
            <dd>{getOfferConditionLabel(offer.condition)}</dd>
          </div>
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="font-medium text-zinc-800">Status</dt>
            <dd>{getOfferStatusLabel(offer.status)}</dd>
          </div>
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="font-medium text-zinc-800">Entrega</dt>
            <dd>Combine com o vendedor</dd>
          </div>
        </dl>

        <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-zinc-900">Vendido por</h2>
            <EntrepreneurBadge active={isEntrepreneurOffer} compact />
          </div>
          <p className="mt-2 font-semibold text-zinc-900">{sellerName}</p>
          <p className="text-sm text-zinc-600">{seller?.phone ? `Telefone: ${seller.phone}` : "Telefone não informado"}</p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Chamar no WhatsApp
            </a>
          ) : null}
        </div>
      </aside>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 lg:col-start-1">
        <h2 className="text-lg font-bold text-zinc-900">Descrição do produto</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-700">{offer.description}</p>

        {offer.specifications && offer.specifications.length > 0 ? (
          <div className="mt-6 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-900">Especificações</h2>
            <ul className="space-y-1 text-sm text-zinc-700">
              {offer.specifications.map((specification) => (
                <li key={specification.id} className="flex items-center justify-between gap-2 rounded-md bg-zinc-50 px-3 py-2">
                  <span className="font-medium text-zinc-800">{specification.key}</span>
                  <span>{specification.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {offer.keywords && offer.keywords.length > 0 ? (
          <div className="mt-6 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-900">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {offer.keywords.map((keyword) => (
                <span key={keyword.id} className="rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-700">
                  {keyword.word}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </article>
  );
}
