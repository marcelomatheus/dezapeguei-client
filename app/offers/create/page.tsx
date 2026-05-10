"use client";

import { BackButton } from "@/src/components/back-button";
import { OfferForm } from "../../../src/features/offers/components/offer-form";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useCreateOfferForm } from "@/src/features/offers/hooks/use-create-offer-form";

export default function CreateOfferPage() {
  const { form, onSubmit, isPending } = useCreateOfferForm();
  const categoriesQuery = useCategoriesQuery();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers/my" />
      </div>
      <OfferForm
        mode="create"
        categories={categoriesQuery.data ?? []}
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </main>
  );
}
