import { z } from "zod";

export const CheckoutSessionSchema = z.object({
  sessionId: z.string(),
  checkoutUrl: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
});

export const PaymentSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  providerSessionId: z.string(),
  status: z.string(),
  checkoutUrl: z.string(),
  successUrl: z.string(),
  cancelUrl: z.string(),
  amount: z.number(),
  currency: z.string(),
});

export type CheckoutSession = z.infer<typeof CheckoutSessionSchema>;
export type PaymentSession = z.infer<typeof PaymentSessionSchema>;
