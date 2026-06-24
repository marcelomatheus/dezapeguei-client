import { httpClient } from "@/src/shared/api/http-client";
import {
  EntrepreneurDashboard,
  EntrepreneurDashboardSchema,
  EntrepreneurMe,
  EntrepreneurMeSchema,
  EntrepreneurValidationPayload,
} from "@/src/shared/schemas/entrepreneur.schema";

export async function submitEntrepreneurValidation(payload: EntrepreneurValidationPayload) {
  const response = await httpClient.post("/entrepreneur/validation", payload);
  return response.data as { canStartCheckout: boolean; alreadyEntrepreneur: boolean };
}

export async function getEntrepreneurMe(): Promise<EntrepreneurMe> {
  const response = await httpClient.get("/entrepreneur/me");
  return EntrepreneurMeSchema.parse(response.data);
}

export async function getEntrepreneurDashboard(): Promise<EntrepreneurDashboard> {
  const response = await httpClient.get("/entrepreneur/dashboard");
  return EntrepreneurDashboardSchema.parse(response.data);
}

export async function getPublicEntrepreneur(id: string) {
  const response = await httpClient.get(`/entrepreneurs/${id}`);
  return response.data;
}
