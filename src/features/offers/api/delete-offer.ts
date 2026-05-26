import { httpClient } from "@/src/shared/api/http-client";

export async function deleteOffer(offerId: string): Promise<void> {
  await httpClient.delete(`/offers/${offerId}`);
}
