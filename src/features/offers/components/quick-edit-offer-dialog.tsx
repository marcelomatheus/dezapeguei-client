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
        <DialogTitle>Edicao rapida do anuncio</DialogTitle>
        <DialogDescription>Atualize os principais campos sem sair de Minhas ofertas.</DialogDescription>

        {isLoading || categoriesQuery.isLoading ? (
          <div className="mt-4 text-sm text-zinc-600">Carregando dados da oferta...</div>
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
