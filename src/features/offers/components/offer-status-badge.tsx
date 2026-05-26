"use client";

import { Badge } from "@/src/components/ui/badge";
import { getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { OfferStatus } from "@/src/shared/types/domain";

type OfferStatusBadgeProps = {
  status: OfferStatus;
};

const statusVariants: Record<OfferStatus, "default" | "success" | "warning" | "danger"> = {
  ACTIVE: "success",
  INACTIVE: "default",
  SOLD: "warning",
  SOLD_OUT: "warning",
  PENDING: "default",
  CANCELED: "danger",
};

export function OfferStatusBadge({ status }: OfferStatusBadgeProps) {
  return <Badge variant={statusVariants[status]}>{getOfferStatusLabel(status)}</Badge>;
}
