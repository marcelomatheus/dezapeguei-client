"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { OfferDetail } from "@/src/features/offers/components/offer-detail";
import { WishlistButton } from "@/src/features/wishlists/components/wishlist-button";
import { useOfferActionsGuards } from "@/src/features/offers/hooks/use-offer-actions-guards";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useOfferQuery } from "@/src/features/offers/hooks/use-offer-query";
import { useStartConversation } from "@/src/features/chats/hooks/use-start-conversation";
import { useUserQuery } from "@/src/features/users/hooks/use-user-query";
import { useCreateSaleGuard } from "@/src/features/sales/hooks/use-create-sale-guard";
import { useCreateSale } from "@/src/features/sales/hooks/use-create-sale";
import { normalizePhoneForWhatsapp } from "@/src/shared/utils/formatters";
import { useAuthSession } from "@/src/shared/auth/use-auth-session";

export default function OfferDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const offerId = params.id;
  const offerQuery = useOfferQuery(offerId);
  const { isAuthenticated, user } = useAuthSession();

  const startConversation = useStartConversation();
  const createSale = useCreateSale();
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
    return <PageSkeleton variant="detail" />;
  }

  if (!offer) {
    return <main className="px-4 py-6 sm:px-6">Oferta não encontrada.</main>;
  }

  const loginRedirectUrl = `/login?redirect=${encodeURIComponent(`/offers/${offer.id}`)}`;
  const goToLogin = () => router.push(loginRedirectUrl);

  return (
    <main className="page-motion mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      <OfferDetail offer={offer} seller={sellerQuery.data} categoryName={categoryName} whatsappUrl={whatsappUrl} />

      <div className="mt-6 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:flex-wrap">
        <WishlistButton offerId={offer.id} />
        <button
          type="button"
          disabled={startConversation.isPending}
          onClick={() => {
            if (guards.canStartConversation) {
              void startConversation.startConversation(offer.sellerId);
              return;
            }

            if (!isAuthenticated) {
              goToLogin();
              return;
            }

            if (guards.reason) {
              toast.info(guards.reason);
            }
          }}
          className="rounded-md border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-800 disabled:opacity-60 hover:bg-orange-50"
        >
          {startConversation.isPending ? "Abrindo conversa..." : "Conversar com vendedor"}
        </button>
        <button
          type="button"
          disabled={createSale.isPending || (isAuthenticated && !saleGuard.canCreateSale)}
          onClick={() => {
            if (!isAuthenticated || !user) {
              goToLogin();
              return;
            }

            if (!saleGuard.canCreateSale) {
              if (saleGuard.reason) {
                toast.info(saleGuard.reason);
              }
              return;
            }

            void createSale.createSale({
              offerId: offer.id,
              buyerId: user.id,
              amount: offer.promotion && offer.promotion > 0 ? offer.promotion : offer.price,
            });
          }}
          className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:bg-orange-700"
        >
          {createSale.isPending ? "Confirmando..." : "Comprar agora"}
        </button>
      </div>

      {!guards.canStartConversation && guards.reason ? <p className="mt-3 text-sm text-zinc-600">{guards.reason}</p> : null}
      {!saleGuard.canCreateSale && saleGuard.reason ? <p className="mt-1 text-sm text-zinc-600">{saleGuard.reason}</p> : null}
    </main>
  );
}
