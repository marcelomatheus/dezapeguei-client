"use client";

import { useParams, useRouter } from "next/navigation";
import { BackButton } from "@/src/components/back-button";
import { OfferDetail } from "@/src/features/offers/components/offer-detail";
import { WishlistButton } from "@/src/features/wishlists/components/wishlist-button";
import { useOfferActionsGuards } from "@/src/features/offers/hooks/use-offer-actions-guards";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useOfferQuery } from "@/src/features/offers/hooks/use-offer-query";
import { useStartConversation } from "@/src/features/chats/hooks/use-start-conversation";
import { useUserQuery } from "@/src/features/users/hooks/use-user-query";
import { useCreateSaleGuard } from "@/src/features/sales/hooks/use-create-sale-guard";
import { normalizePhoneForWhatsapp } from "@/src/shared/utils/formatters";
import { useAuthSession } from "@/src/shared/auth/use-auth-session";

export default function OfferDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const offerId = params.id;
  const offerQuery = useOfferQuery(offerId);
  const { isAuthenticated } = useAuthSession();

  const startConversation = useStartConversation();
  const offer = offerQuery.data ?? null;
  const sellerQuery = useUserQuery(offer?.sellerId);
  const categoriesQuery = useCategoriesQuery();
  const guards = useOfferActionsGuards(offer);
  const saleGuard = useCreateSaleGuard(offer);

  const categoryName = categoriesQuery.data?.find((category) => category.id === offer?.categoryId)?.name;
  const sellerPhone = sellerQuery.data?.phone;
  const whatsappPhone = normalizePhoneForWhatsapp(sellerPhone);
  const whatsappUrl =
    isAuthenticated && whatsappPhone
      ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Oi! Tenho interesse na oferta "${offer?.title ?? ""}"`)}`
      : null;

  if (offerQuery.isLoading) {
    return <main className="px-4 py-6 sm:px-6">Carregando...</main>;
  }

  if (!offer) {
    return <main className="px-4 py-6 sm:px-6">Oferta não encontrada.</main>;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      <OfferDetail offer={offer} seller={sellerQuery.data} categoryName={categoryName} whatsappUrl={whatsappUrl} />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <WishlistButton offerId={offer.id} />
        <button
          type="button"
          disabled={startConversation.isPending}
          onClick={() => {
            if (guards.canStartConversation) {
              void startConversation.startConversation(offer.sellerId);
              return;
            }
            router.push("/login");
          }}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:opacity-60"
        >
          {startConversation.isPending ? "Abrindo conversa..." : "Conversar com vendedor"}
        </button>
        <button
          type="button"
          disabled={!saleGuard.canCreateSale}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white disabled:opacity-60"
        >
          Comprar agora
        </button>
      </div>

      {!guards.canStartConversation && guards.reason ? <p className="mt-3 text-sm text-zinc-600">{guards.reason}</p> : null}
      {!saleGuard.canCreateSale && saleGuard.reason ? <p className="mt-1 text-sm text-zinc-600">{saleGuard.reason}</p> : null}
    </main>
  );
}
