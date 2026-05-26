import { httpClient } from "@/src/shared/api/http-client";
import { OfferCategoryListSchema, OfferCategoryModel } from "@/src/shared/schemas/offer.schema";

export async function getCategories(search?: string): Promise<OfferCategoryModel[]> {
  const response = await httpClient.get("/categories", {
    params: search ? { search } : undefined,
  });
  return OfferCategoryListSchema.parse(response.data);
}
