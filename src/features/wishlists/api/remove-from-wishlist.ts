import { z } from "zod";
import { httpClient } from "@/src/shared/api/http-client";

const RemoveFromWishlistPayloadSchema = z.object({
  userId: z.string().min(1),
  offerId: z.string().min(1),
});

export type RemoveFromWishlistPayload = z.infer<typeof RemoveFromWishlistPayloadSchema>;

export async function removeFromWishlist(payload: RemoveFromWishlistPayload): Promise<void> {
  const parsedPayload = RemoveFromWishlistPayloadSchema.parse(payload);
  await httpClient.delete("/wishlists/items", {
    data: parsedPayload,
  });
}
