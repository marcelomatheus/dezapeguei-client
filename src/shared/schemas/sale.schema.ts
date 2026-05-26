import { z } from "zod";

export const SaleStatusSchema = z.enum(["PENDING", "COMPLETED", "CANCELLED"]);

export const SaleOfferSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    imageUrl: z.array(z.string()).optional().default([]),
    sellerId: z.string(),
  })
  .passthrough();

export const SaleBuyerSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable().optional(),
  })
  .passthrough();

export const SaleSchema = z
  .object({
    id: z.string(),
    offerId: z.string(),
    buyerId: z.string(),
    amount: z.number(),
    status: SaleStatusSchema,
    saleDate: z.string().or(z.date()),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    offer: SaleOfferSchema.optional(),
    buyer: SaleBuyerSchema.optional(),
  })
  .passthrough();

export const SaleListSchema = z.array(SaleSchema);

export const CreateSalePayloadSchema = z.object({
  offerId: z.string().min(1),
  buyerId: z.string().min(1),
  amount: z.number().min(0),
  status: SaleStatusSchema.optional(),
});

export const GetSalesParamsSchema = z.object({
  userId: z.string().optional(),
  role: z.enum(["buyer", "seller"]).optional(),
  status: SaleStatusSchema.optional(),
});

export const UpdateSaleStatusPayloadSchema = z.object({
  status: SaleStatusSchema,
});

export type SaleModel = z.infer<typeof SaleSchema>;
export type CreateSalePayload = z.infer<typeof CreateSalePayloadSchema>;
export type GetSalesParams = z.infer<typeof GetSalesParamsSchema>;
export type UpdateSaleStatusPayload = z.infer<typeof UpdateSaleStatusPayloadSchema>;
