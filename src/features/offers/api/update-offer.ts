import { httpClient } from "@/src/shared/api/http-client";
import {
  OfferModel,
  OfferSchema,
  UpdateOfferPayload,
  UpdateOfferPayloadSchema,
} from "@/src/shared/schemas/offer.schema";

export async function updateOffer(offerId: string, payload: UpdateOfferPayload): Promise<OfferModel> {
  const parsedPayload = UpdateOfferPayloadSchema.parse(payload);
  const response = await httpClient.patch(`/offers/${offerId}`, parsedPayload);
  return OfferSchema.parse(response.data);
}
