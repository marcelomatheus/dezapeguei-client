"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteOffer } from "@/src/features/offers/api/delete-offer";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";

export function useDeleteOffer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (offerId: string) => deleteOffer(offerId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["offers"] });
      await queryClient.invalidateQueries({ queryKey: ["offers-infinite"] });
      await queryClient.invalidateQueries({ queryKey: ["my-offers"] });
      toast.success("Oferta removida com sucesso.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    removeOffer: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
