import { httpClient } from "@/src/shared/api/http-client";
import { Offer } from "@/src/shared/types/domain";
import { GetOffersParams, GetOffersParamsSchema, OfferListSchema } from "@/src/shared/schemas/offer.schema";

export async function getOffers(params: GetOffersParams = {}): Promise<Offer[]> {
  const parsedParams = GetOffersParamsSchema.parse(params);
  const response = await httpClient.get("/offers", {
    params: parsedParams,
  });
  return OfferListSchema.parse(response.data) as Offer[];
}
