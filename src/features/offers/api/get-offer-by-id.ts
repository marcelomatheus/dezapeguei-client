import { httpClient } from "@/src/shared/api/http-client";
import { Offer } from "@/src/shared/types/domain";
import { OfferSchema } from "@/src/shared/schemas/offer.schema";

export async function getOfferById(offerId: string): Promise<Offer> {
  const response = await httpClient.get(`/offers/${offerId}`);
  return OfferSchema.parse(response.data) as Offer;
}
