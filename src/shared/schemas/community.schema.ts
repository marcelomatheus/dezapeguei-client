import { z } from "zod";
import { OfferSchema } from "@/src/shared/schemas/offer.schema";

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
});

export const CommunityMessageSchema = z.object({
  id: z.string(),
  communityId: z.string(),
  userId: z.string(),
  content: z.string(),
  offerId: z.string().nullable().optional(),
  type: z.enum(["TEXT", "OFFER"]),
  createdAt: z.string().or(z.date()),
  user: z.object({
    id: z.string(),
    name: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    entrepreneurVerifiedAt: z.string().or(z.date()).nullable().optional(),
    entrepreneurProfile: z.object({
      businessName: z.string().nullable().optional(),
      status: z.string().optional(),
      verifiedAt: z.string().or(z.date()).nullable().optional(),
    }).nullable().optional(),
    entrepreneurSubscriptions: z.array(z.object({ id: z.string() })).optional(),
  }).optional(),
  offer: OfferSchema.nullable().optional(),
});

export const CommunityListSchema = z.array(CommunitySchema);
export const CommunityMessageListSchema = z.array(CommunityMessageSchema);

export type Community = z.infer<typeof CommunitySchema>;
export type CommunityMessage = z.infer<typeof CommunityMessageSchema>;
