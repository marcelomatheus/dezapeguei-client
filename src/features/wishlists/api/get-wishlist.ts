import { z } from "zod";
import { httpClient } from "@/src/shared/api/http-client";
import { OfferSchema } from "@/src/shared/schemas/offer.schema";

const WishlistEntrySchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    offerId: z.string(),
    createdAt: z.string().or(z.date()).optional(),
    offer: OfferSchema.optional(),
  })
  .passthrough();

const WishlistEntryListSchema = z.array(WishlistEntrySchema);

export type WishlistEntryModel = z.infer<typeof WishlistEntrySchema>;

export async function getWishlist(userId: string): Promise<WishlistEntryModel[]> {
  const response = await httpClient.get("/wishlists", {
    params: {
      userId,
    },
  });

  return WishlistEntryListSchema.parse(response.data);
}
