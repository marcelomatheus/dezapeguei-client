import { httpClient } from "@/src/shared/api/http-client";
import {
  SaleModel,
  SaleSchema,
  UpdateSaleStatusPayload,
  UpdateSaleStatusPayloadSchema,
} from "@/src/shared/schemas/sale.schema";

export async function updateSaleStatus(
  saleId: string,
  payload: UpdateSaleStatusPayload,
): Promise<SaleModel> {
  const parsedPayload = UpdateSaleStatusPayloadSchema.parse(payload);
  const response = await httpClient.patch(`/sales/${saleId}`, parsedPayload);
  return SaleSchema.parse(response.data);
}
