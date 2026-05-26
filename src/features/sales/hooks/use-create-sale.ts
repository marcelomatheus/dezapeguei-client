"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createSale } from "@/src/features/sales/api/create-sale";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { CreateSalePayload } from "@/src/shared/schemas/sale.schema";

export function useCreateSale() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateSalePayload) => createSale(payload),
    onSuccess: async (sale) => {
      await queryClient.invalidateQueries({ queryKey: ["sales"] });
      await queryClient.invalidateQueries({ queryKey: ["offer", sale.offerId] });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Venda confirmada com sucesso.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    createSale: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
