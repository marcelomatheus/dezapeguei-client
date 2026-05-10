"use client";

import { SalesList } from "@/src/features/sales/components/sales-list";
import { useSalesQuery } from "@/src/features/sales/hooks/use-sales-query";

export default function SalesPage() {
  const salesQuery = useSalesQuery();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Vendas</h1>
      <SalesList sales={salesQuery.data ?? []} isLoading={salesQuery.isLoading} />
    </main>
  );
}
