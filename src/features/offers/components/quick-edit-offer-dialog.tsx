"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/src/components/ui/dialog";
import { OfferForm } from "@/src/features/offers/components/offer-form";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useUpdateOfferForm } from "@/src/features/offers/hooks/use-update-offer-form";

type QuickEditOfferDialogProps = {
  offerId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuickEditOfferDialog({ offerId, open, onOpenChange }: QuickEditOfferDialogProps) {
  const { form, onSubmit, currentImageUrls, isLoading, isPending } = useUpdateOfferForm(offerId ?? "");
  const categoriesQuery = useCategoriesQuery();

  if (!offerId) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Edição rápida do anúncio</DialogTitle>
        <DialogDescription>Atualize os principais campos sem sair de Minhas ofertas.</DialogDescription>

        {isLoading || categoriesQuery.isLoading ? (
          <div className="mt-4 space-y-3" aria-label="Dados da oferta carregando">
            <div className="h-10 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-10 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-24 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-200" />
          </div>
        ) : (
          <div className="mt-4 max-h-[75vh] overflow-y-auto pr-1">
            <OfferForm
              mode="edit"
              categories={categoriesQuery.data ?? []}
              currentImageUrls={currentImageUrls}
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
