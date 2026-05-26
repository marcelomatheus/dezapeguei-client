import { httpClient } from "@/src/shared/api/http-client";
import {
  CreateSalePayload,
  CreateSalePayloadSchema,
  SaleModel,
  SaleSchema,
} from "@/src/shared/schemas/sale.schema";

export async function createSale(payload: CreateSalePayload): Promise<SaleModel> {
  const parsedPayload = CreateSalePayloadSchema.parse(payload);
  const response = await httpClient.post("/sales", parsedPayload);
  return SaleSchema.parse(response.data);
}
