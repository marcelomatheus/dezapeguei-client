import { getOfferStatusLabel as getOfferStatusLabelShared } from "@/src/shared/i18n/enum-labels";
import { OfferStatus, SaleStatus } from "@/src/shared/types/domain";

export function getOfferStatusLabel(status: OfferStatus): string {
  return getOfferStatusLabelShared(status);
}

export function mapSaleStatusToOfferStatus(saleStatus: SaleStatus): OfferStatus {
  if (saleStatus === "COMPLETED") {
    return "SOLD";
  }

  if (saleStatus === "CANCELLED") {
    return "ACTIVE";
  }

  return "PENDING";
}
