"use client";

import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getSaleStatusLabel } from "@/src/shared/i18n/enum-labels";
import { SaleModel } from "@/src/shared/schemas/sale.schema";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

type SalesListProps = {
  sales: SaleModel[];
  isLoading?: boolean;
};

function getStatusVariant(status: SaleModel["status"]) {
  if (status === "COMPLETED") {
    return "success" as const;
  }

  if (status === "CANCELLED") {
    return "danger" as const;
  }

  return "warning" as const;
}

export function SalesList({ sales, isLoading = false }: SalesListProps) {
  if (isLoading) {
    return <p className="text-sm text-zinc-500">Carregando vendas...</p>;
  }

  if (sales.length === 0) {
    return <p className="text-sm text-zinc-500">Nenhuma venda encontrada.</p>;
  }

  return (
    <div className="grid gap-3">
      {sales.map((sale) => (
        <Card key={sale.id}>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle>Venda {sale.id}</CardTitle>
            <Badge variant={getStatusVariant(sale.status)}>{getSaleStatusLabel(sale.status)}</Badge>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-700">
            <p>Valor: {formatMoneyBRL(sale.amount)}</p>
            <p>Data: {new Date(sale.saleDate).toLocaleString()}</p>
            <Link href={`/sales/${sale.id}`} className="inline-block text-orange-700 hover:underline">
              Ver detalhes
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
