import { z } from "zod";
import { httpClient } from "@/src/shared/api/http-client";

const AddToWishlistPayloadSchema = z.object({
  userId: z.string().min(1),
  offerId: z.string().min(1),
});

export type AddToWishlistPayload = z.infer<typeof AddToWishlistPayloadSchema>;

export async function addToWishlist(payload: AddToWishlistPayload): Promise<void> {
  const parsedPayload = AddToWishlistPayloadSchema.parse(payload);
  await httpClient.post("/wishlists/items", parsedPayload);
}
