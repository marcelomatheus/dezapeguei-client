"use client";

import { Badge } from "@/src/components/ui/badge";
import { OfferModel } from "@/src/shared/schemas/offer.schema";
import { ImageGallery } from "@/src/features/offers/components/image-gallery";
import { UserProfileModel } from "@/src/shared/schemas/profile.schema";
import { getOfferConditionLabel, getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

type OfferDetailProps = {
  offer: OfferModel;
  seller?: UserProfileModel | null;
  categoryName?: string;
  whatsappUrl?: string | null;
};

export function OfferDetail({ offer, seller = null, categoryName, whatsappUrl }: OfferDetailProps) {
  const hasPromotion = typeof offer.promotion === "number" && offer.promotion > 0 && offer.promotion < offer.price;

  return (
    <article className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
      <ImageGallery images={offer.imageUrl} title={offer.title} />

      <section className="rounded-xl border border-zinc-200 p-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-zinc-900">{offer.title}</h1>
          {offer.status === "SOLD" || offer.status === "SOLD_OUT" ? <Badge variant="warning">{getOfferStatusLabel(offer.status)}</Badge> : null}
        </div>

        <p className="mt-3 text-zinc-700">{offer.description}</p>
        <div className="mt-4">
          {hasPromotion ? <p className="text-sm text-zinc-500 line-through">{formatMoneyBRL(offer.price)}</p> : null}
          <p className="text-3xl font-semibold text-zinc-900">{formatMoneyBRL(hasPromotion ? (offer.promotion as number) : offer.price)}</p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-600">
          <div>
            <dt className="font-medium text-zinc-800">Categoria</dt>
            <dd>{categoryName ?? "Nao informado"}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-800">Condição</dt>
            <dd>{getOfferConditionLabel(offer.condition)}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-800">Status</dt>
            <dd>{getOfferStatusLabel(offer.status)}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-800">Publicado em</dt>
            <dd>{new Date(offer.createdAt).toLocaleDateString("pt-BR")}</dd>
          </div>
        </dl>

        {offer.specifications && offer.specifications.length > 0 ? (
          <div className="mt-6 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-900">Especificacoes</h2>
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

        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h2 className="text-sm font-semibold text-zinc-900">Vendedor</h2>
          <p className="mt-2 text-sm text-zinc-700">{seller?.name ?? "Nao informado"}</p>
          <p className="text-sm text-zinc-600">{seller?.phone ? `Telefone: ${seller.phone}` : "Telefone nao informado"}</p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Chamar no WhatsApp
            </a>
          ) : null}
        </div>
      </section>
    </article>
  );
}
