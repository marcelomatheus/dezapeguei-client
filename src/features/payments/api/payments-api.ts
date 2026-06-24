import { httpClient } from "@/src/shared/api/http-client";
import { CheckoutSession, CheckoutSessionSchema, PaymentSession, PaymentSessionSchema } from "@/src/shared/schemas/payment.schema";

export async function createEntrepreneurCheckoutSession(): Promise<CheckoutSession> {
  const response = await httpClient.post("/payments/checkout-session", {
    plan: "ENTREPRENEUR_MONTHLY",
  });
  return CheckoutSessionSchema.parse(response.data);
}

export async function getPaymentSession(sessionId: string): Promise<PaymentSession> {
  const response = await httpClient.get(`/payments/session/${sessionId}`);
  return PaymentSessionSchema.parse(response.data);
}

export async function simulatePaymentSuccess(sessionId: string) {
  const response = await httpClient.post(`/payments/session/${sessionId}/simulate-success`);
  return response.data;
}

export async function simulatePaymentFailure(sessionId: string) {
  const response = await httpClient.post(`/payments/session/${sessionId}/simulate-failure`);
  return response.data;
}
