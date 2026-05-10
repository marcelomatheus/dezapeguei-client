"use client";

import { useParams } from "next/navigation";
import { BackButton } from "@/src/components/back-button";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useUpdateOfferForm } from "@/src/features/offers/hooks/use-update-offer-form";
import { OfferForm } from "../../../../src/features/offers/components/offer-form";

export default function EditOfferPage() {
  const params = useParams<{ id: string }>();
  const offerId = params.id;
  const { form, onSubmit, currentImageUrls, isLoading, isPending } = useUpdateOfferForm(offerId);
  const categoriesQuery = useCategoriesQuery();

  if (isLoading || categoriesQuery.isLoading) {
    return <main className="px-4 py-6 text-zinc-800 sm:px-6">Carregando dados da oferta...</main>;
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers/my" />
      </div>
      <OfferForm
        mode="edit"
        categories={categoriesQuery.data ?? []}
        form={form}
        currentImageUrls={currentImageUrls}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </main>
  );
}
