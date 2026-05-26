import { httpClient } from "@/src/shared/api/http-client";
import { OfferListSchema, OfferModel } from "@/src/shared/schemas/offer.schema";

export async function getMyOffers(): Promise<OfferModel[]> {
  const response = await httpClient.get("/offers/my");

  return OfferListSchema.parse(response.data);
}
