"use client";

import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/src/features/sales/api/get-sales";
import { SaleModel } from "@/src/shared/schemas/sale.schema";
import { useAuthStore } from "@/src/shared/auth/auth-store";

type UseSalesQueryParams = {
  role?: "buyer" | "seller";
  status?: SaleModel["status"];
};

export function useSalesQuery(params: UseSalesQueryParams = {}) {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["sales", userId, params.role, params.status],
    queryFn: () =>
      getSales({
        userId,
        role: params.role,
        status: params.status,
      }),
    enabled: Boolean(userId),
  });
}
