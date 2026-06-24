"use client";

import { useParams } from "next/navigation";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { SaleDetail } from "@/src/features/sales/components/sale-detail";
import { useSales } from "@/src/features/sales/hooks/use-sales";

export default function SaleDetailPage() {
  const params = useParams<{ id: string }>();
  const saleId = params.id;
  const { saleQuery, updateSaleStatus, isUpdatingStatus } = useSales(saleId);

  if (saleQuery.isLoading) {
    return <PageSkeleton variant="detail" />;
  }

  if (!saleQuery.data) {
    return <main className="px-4 py-6 sm:px-6">Venda não encontrada.</main>;
  }

  const sale = saleQuery.data;

  return (
    <main className="page-motion mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <SaleDetail
        sale={sale}
        isUpdating={isUpdatingStatus}
        onUpdateStatus={(status) => {
          void updateSaleStatus({ id: sale.id, status });
        }}
      />
    </main>
  );
}
