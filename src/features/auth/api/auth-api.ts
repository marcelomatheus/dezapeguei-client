import { httpClient } from "@/src/shared/api/http-client";
import {
  AuthSessionResponse,
  AuthSessionResponseSchema,
  AuthTokensSchema,
  LoginPayload,
  RegisterPayload,
} from "@/src/shared/schemas/auth.schema";
import type { AuthTokens } from "@/src/shared/schemas/auth.schema";
import { UserProfileModel, UserProfileSchema } from "@/src/shared/schemas/profile.schema";

export type { AuthTokens };

export async function login(payload: LoginPayload): Promise<AuthSessionResponse> {
  const response = await httpClient.post("/auth/login", payload);
  return AuthSessionResponseSchema.parse(response.data);
}

export async function register(payload: RegisterPayload): Promise<{ user: UserProfileModel }> {
  const response = await httpClient.post("/auth/register", payload);

  return {
    user: UserProfileSchema.parse(response.data.user),
  };
}

export async function loginAfterRegister(payload: LoginPayload): Promise<AuthSessionResponse> {
  const response = await httpClient.post("/auth/login", payload);
  return AuthSessionResponseSchema.parse(response.data);
}

export async function refreshToken(refreshTokenValue: string): Promise<AuthSessionResponse> {
  const response = await httpClient.post("/auth/refresh-token", {
    refreshToken: refreshTokenValue,
  });

  return AuthSessionResponseSchema.parse(response.data);
}

export async function refreshTokensOnly(refreshTokenValue: string): Promise<AuthTokens> {
  const response = await httpClient.post("/auth/refresh-token", {
    refreshToken: refreshTokenValue,
  });

  return AuthTokensSchema.parse(response.data);
}

export async function logout(): Promise<void> {
  await httpClient.post("/auth/logout");
}

export async function getProfile(): Promise<UserProfileModel> {
  const authResponse = await httpClient.get<{ id: string }>("/auth/profile");
  const userId = authResponse.data?.id;

  if (!userId) {
    throw new Error("Nao foi possivel recuperar o perfil autenticado.");
  }

  const response = await httpClient.get(`/users/${userId}`);
  return UserProfileSchema.parse(response.data);
}

export async function getAuthProfile(): Promise<{ id: string }> {
  const response = await httpClient.get<{ id: string }>("/auth/profile");
  return response.data;
}
