"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getSaleStatusLabel } from "@/src/shared/i18n/enum-labels";
import { SaleModel } from "@/src/shared/schemas/sale.schema";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

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
        <p>ID: {sale.id}</p>
        <p>Oferta: {sale.offerId}</p>
        <p>Comprador: {sale.buyerId}</p>
        <p>Valor: {formatMoneyBRL(sale.amount)}</p>
        <p>Data da venda: {new Date(sale.saleDate).toLocaleString()}</p>

        {onUpdateStatus ? (
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              isLoading={isUpdating}
              onClick={() => onUpdateStatus("COMPLETED")}
              disabled={sale.status === "COMPLETED"}
            >
              Marcar como concluida
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
