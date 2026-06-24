import { z } from "zod";
import { OfferSchema } from "@/src/shared/schemas/offer.schema";

export const EntrepreneurProfileStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED", "SUSPENDED"]);
export const EntrepreneurSubscriptionStatusSchema = z.enum(["ACTIVE", "PENDING_PAYMENT", "PAST_DUE", "CANCELLED", "EXPIRED"]);

export const EntrepreneurSummarySchema = z.object({
  isActive: z.boolean(),
  verifiedAt: z.string().or(z.date()).nullable().optional(),
  businessName: z.string().nullable().optional(),
  storefrontSlug: z.string().nullable().optional(),
});

export const EntrepreneurProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  businessName: z.string(),
  document: z.string(),
  businessType: z.string(),
  description: z.string(),
  phone: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  status: EntrepreneurProfileStatusSchema,
  verifiedAt: z.string().or(z.date()).nullable().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
}).nullable();

export const EntrepreneurSubscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: EntrepreneurSubscriptionStatusSchema,
  amount: z.number(),
  currency: z.string(),
  startedAt: z.string().or(z.date()).nullable().optional(),
  expiresAt: z.string().or(z.date()).nullable().optional(),
  cancelledAt: z.string().or(z.date()).nullable().optional(),
  lastPaymentAt: z.string().or(z.date()).nullable().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
}).nullable();

export const EntrepreneurStorefrontSchema = z.object({
  id: z.string(),
  userId: z.string(),
  slug: z.string(),
  bannerUrl: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
}).nullable();

export const EntrepreneurValidationPayloadSchema = z.object({
  businessName: z.string().min(2),
  document: z.string().min(5),
  businessType: z.string().min(1),
  description: z.string().min(10),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  city: z.string().optional(),
  state: z.string().optional(),
  acceptedTerms: z.boolean().refine(Boolean, "Aceite os termos para continuar."),
});

export const EntrepreneurMeSchema = z.object({
  profile: EntrepreneurProfileSchema,
  subscription: EntrepreneurSubscriptionSchema,
  paymentSessions: z.array(z.unknown()).default([]),
  storefront: EntrepreneurStorefrontSchema,
  quickReplies: z.array(z.unknown()).default([]),
  entrepreneur: EntrepreneurSummarySchema,
});

export const EntrepreneurDashboardSchema = EntrepreneurMeSchema.extend({
  metrics: z.object({
    offerViews: z.number(),
    contactClicks: z.number(),
    favoritesCount: z.number(),
    messagesReceived: z.number(),
    offerCount: z.number(),
  }),
  featuredOffers: z.array(z.object({
    id: z.string(),
    offerId: z.string(),
    offer: OfferSchema,
  })).default([]),
  communities: z.array(z.unknown()).default([]),
});

export type EntrepreneurValidationPayload = z.infer<typeof EntrepreneurValidationPayloadSchema>;
export type EntrepreneurMe = z.infer<typeof EntrepreneurMeSchema>;
export type EntrepreneurDashboard = z.infer<typeof EntrepreneurDashboardSchema>;
export type EntrepreneurSummary = z.infer<typeof EntrepreneurSummarySchema>;
