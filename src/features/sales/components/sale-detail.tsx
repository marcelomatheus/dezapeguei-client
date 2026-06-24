"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getSaleStatusLabel } from "@/src/shared/i18n/enum-labels";
import { SaleModel } from "@/src/shared/schemas/sale.schema";
import { formatDateTimeBR, formatMoneyBRL } from "@/src/shared/utils/formatters";

type SaleDetailProps = {
  sale: SaleModel;
  isUpdating?: boolean;
  onUpdateStatus?: (status: SaleModel["status"]) => void;
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

export function SaleDetail({ sale, isUpdating = false, onUpdateStatus }: SaleDetailProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Detalhes da venda</CardTitle>
        <Badge variant={getStatusVariant(sale.status)}>{getSaleStatusLabel(sale.status)}</Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-zinc-700">
        <p><strong>Produto:</strong> {sale.offer?.title ?? "Produto não informado"}</p>
        <p><strong>Comprador:</strong> {sale.buyer?.name ?? "Comprador não informado"}</p>
        <p><strong>Valor:</strong> {formatMoneyBRL(sale.amount)}</p>
        <p><strong>Data:</strong> {formatDateTimeBR(sale.saleDate)}</p>

        {onUpdateStatus ? (
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              isLoading={isUpdating}
              onClick={() => onUpdateStatus("COMPLETED")}
              disabled={sale.status === "COMPLETED"}
            >
              Marcar como concluída
            </Button>
            <Button
              type="button"
              variant="secondary"
              isLoading={isUpdating}
              onClick={() => onUpdateStatus("CANCELLED")}
              disabled={sale.status === "CANCELLED"}
            >
              Cancelar
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
