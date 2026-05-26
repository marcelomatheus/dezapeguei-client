import { httpClient } from "@/src/shared/api/http-client";
import {
  CreateOfferPayload,
  CreateOfferPayloadSchema,
  OfferModel,
  OfferSchema,
} from "@/src/shared/schemas/offer.schema";

export async function createOffer(payload: CreateOfferPayload): Promise<OfferModel> {
  const parsedPayload = CreateOfferPayloadSchema.parse(payload);
  const response = await httpClient.post("/offers", parsedPayload);
  return OfferSchema.parse(response.data);
}
