import { httpClient } from "@/src/shared/api/http-client";
import {
  OfferModel,
  OfferSchema,
  UpdateOfferStatusPayload,
  UpdateOfferStatusPayloadSchema,
} from "@/src/shared/schemas/offer.schema";

export async function updateOfferStatus(
  offerId: string,
  payload: UpdateOfferStatusPayload,
): Promise<OfferModel> {
  const parsedPayload = UpdateOfferStatusPayloadSchema.parse(payload);
  const response = await httpClient.patch(
    `/offers/${offerId}/status`,
    parsedPayload,
  );
  return OfferSchema.parse(response.data);
}
