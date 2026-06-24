"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getSaleStatusLabel } from "@/src/shared/i18n/enum-labels";
import { SaleModel } from "@/src/shared/schemas/sale.schema";
import { formatDateTimeBR, formatMoneyBRL } from "@/src/shared/utils/formatters";

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
    return (
      <div className="grid gap-3" aria-label="Vendas carregando">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div className="h-5 w-32 rounded bg-zinc-200" />
              <div className="h-6 w-20 rounded-full bg-zinc-200" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-4 w-40 rounded bg-zinc-200" />
              <div className="h-4 w-56 rounded bg-zinc-200" />
              <div className="h-4 w-24 rounded bg-zinc-200" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
        <h2 className="font-semibold text-zinc-900">Nenhuma transação encontrada</h2>
        <p className="mt-1 text-sm text-zinc-600">Compras e vendas confirmadas aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {sales.map((sale) => (
        <Card key={sale.id} className="p-3">
          <CardContent className="grid gap-3 p-0 sm:grid-cols-[88px_1fr_auto] sm:items-center">
            <div className="relative h-24 overflow-hidden rounded-md bg-zinc-100 sm:h-20">
              {sale.offer?.imageUrl?.[0] ? (
                <Image src={sale.offer.imageUrl[0]} alt={sale.offer.title} fill unoptimized className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-zinc-500">Sem imagem</div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="line-clamp-1 text-base">{sale.offer?.title ?? "Produto vendido"}</CardTitle>
                <Badge variant={getStatusVariant(sale.status)}>{getSaleStatusLabel(sale.status)}</Badge>
              </div>
              <p className="mt-1 text-lg font-bold text-orange-600">{formatMoneyBRL(sale.amount)}</p>
              <p className="text-xs text-zinc-500">{formatDateTimeBR(sale.saleDate)}</p>
            </div>

            <Link href={`/sales/${sale.id}`} className="inline-flex justify-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">
              Ver detalhes
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
