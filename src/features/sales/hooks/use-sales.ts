"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getSales } from "@/src/features/sales/api/get-sales";
import { updateSaleStatus } from "@/src/features/sales/api/update-sale-status";
import { httpClient } from "@/src/shared/api/http-client";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { SaleModel, SaleSchema } from "@/src/shared/schemas/sale.schema";

async function getSaleById(id: string): Promise<SaleModel> {
  const response = await httpClient.get(`/sales/${id}`);
  return SaleSchema.parse(response.data);
}

export function useSales(saleId?: string) {
  const queryClient = useQueryClient();

  const salesQuery = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
    enabled: !saleId,
  });

  const saleQuery = useQuery({
    queryKey: ["sale", saleId],
    queryFn: () => getSaleById(saleId as string),
    enabled: Boolean(saleId),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: SaleModel["status"] }) =>
      updateSaleStatus(id, { status }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sales"] });
      if (saleId) {
        await queryClient.invalidateQueries({ queryKey: ["sale", saleId] });
      }
      toast.success("Status da venda atualizado.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    salesQuery,
    saleQuery,
    updateSaleStatus: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
}
