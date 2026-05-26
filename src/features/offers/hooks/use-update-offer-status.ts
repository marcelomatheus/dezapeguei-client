"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateOfferStatus } from "@/src/features/offers/api/update-offer-status";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { OfferStatus } from "@/src/shared/types/domain";

export function useUpdateOfferStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ offerId, status }: { offerId: string; status: OfferStatus }) =>
      updateOfferStatus(offerId, { status }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["offers"] });
      await queryClient.invalidateQueries({ queryKey: ["offers-infinite"] });
      await queryClient.invalidateQueries({ queryKey: ["my-offers"] });
      await queryClient.invalidateQueries({ queryKey: ["offer", variables.offerId] });
      toast.success("Status da oferta atualizado.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
