"use client";

import { SalesList } from "@/src/features/sales/components/sales-list";
import { useSalesQuery } from "@/src/features/sales/hooks/use-sales-query";

export default function SalesPage() {
  const salesQuery = useSalesQuery();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-5 rounded-lg border border-zinc-200 bg-white p-5">
        <h1 className="text-2xl font-black text-zinc-950">Compras e vendas</h1>
        <p className="mt-1 text-sm text-zinc-600">Acompanhe negociações confirmadas, valores e status de cada transação.</p>
      </header>
      <SalesList sales={salesQuery.data ?? []} isLoading={salesQuery.isLoading} />
    </main>
  );
}
