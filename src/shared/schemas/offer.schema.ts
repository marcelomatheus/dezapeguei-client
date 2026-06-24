import { z } from "zod";

export const OfferStatusSchema = z.enum([
  "ACTIVE",
  "INACTIVE",
  "SOLD",
  "PENDING",
  "CANCELED",
  "SOLD_OUT",
]);

export const OfferConditionSchema = z.enum([
  "NEW",
  "USED_LIKE_NEW",
  "USED_GOOD",
  "USED_FAIR",
]);

export const OfferKeywordSchema = z.object({
  id: z.string(),
  word: z.string(),
});

export const OfferSpecificationSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
});

export const OfferSellerSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  rating: z.number().default(0),
  entrepreneur: z.object({
    isActive: z.boolean(),
    verifiedAt: z.string().or(z.date()).nullable().optional(),
    businessName: z.string().nullable().optional(),
    storefrontSlug: z.string().nullable().optional(),
  }).optional(),
}).optional();

export const OfferSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  promotion: z.number().nullable().optional(),
  imageUrl: z.array(z.string()),
  status: OfferStatusSchema,
  condition: OfferConditionSchema.optional(),
  categoryId: z.string(),
  sellerId: z.string(),
  keywords: z.array(OfferKeywordSchema).optional(),
  specifications: z.array(OfferSpecificationSchema).optional(),
  seller: OfferSellerSchema,
  badges: z.array(z.string()).default([]),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const OfferListSchema = z.array(OfferSchema);

export const CreateOfferPayloadSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  sellerId: z.string().min(1),
  categoryId: z.string().min(1),
  condition: OfferConditionSchema,
  imageUrl: z.array(z.string()).min(1).max(5),
  promotion: z.number().nullable().optional(),
  keywords: z.array(z.string()).optional(),
  specifications: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string().min(1),
    }),
  ).optional(),
});

export const UpdateOfferPayloadSchema = CreateOfferPayloadSchema.partial().extend({
  status: OfferStatusSchema.optional(),
});

export const UpdateOfferStatusPayloadSchema = z.object({
  status: OfferStatusSchema,
});

export const OfferCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  keywords: z.array(z.string()).nullable().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

export const OfferCategoryListSchema = z.array(OfferCategorySchema);

export const GetOffersParamsSchema = z.object({
  search: z.string().min(1).optional(),
  status: OfferStatusSchema.optional(),
  categoryId: z.string().optional(),
  sellerId: z.string().optional(),
});

export type OfferModel = z.infer<typeof OfferSchema>;
export type OfferCategoryModel = z.infer<typeof OfferCategorySchema>;
export type GetOffersParams = z.infer<typeof GetOffersParamsSchema>;
export type CreateOfferPayload = z.infer<typeof CreateOfferPayloadSchema>;
export type UpdateOfferPayload = z.infer<typeof UpdateOfferPayloadSchema>;
export type UpdateOfferStatusPayload = z.infer<typeof UpdateOfferStatusPayloadSchema>;
