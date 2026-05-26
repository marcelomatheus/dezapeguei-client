import { httpClient } from "@/src/shared/api/http-client";
import {
  GetSalesParams,
  GetSalesParamsSchema,
  SaleListSchema,
  SaleModel,
} from "@/src/shared/schemas/sale.schema";

export async function getSales(params: GetSalesParams = {}): Promise<SaleModel[]> {
  const parsedParams = GetSalesParamsSchema.parse(params);
  const response = await httpClient.get("/sales", {
    params: parsedParams,
  });

  return SaleListSchema.parse(response.data);
}
