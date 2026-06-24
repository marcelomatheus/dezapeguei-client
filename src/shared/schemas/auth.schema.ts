import { z } from "zod";
import { UserProfileSchema } from "@/src/shared/schemas/profile.schema";

export const LoginPayloadSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(1, "Digite sua senha."),
});

export const RegisterPayloadSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(1, "Digite uma senha."),
});

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const AuthSessionResponseSchema = AuthTokensSchema.extend({
  user: UserProfileSchema,
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;
export type AuthTokens = z.infer<typeof AuthTokensSchema>;
export type AuthSessionResponse = z.infer<typeof AuthSessionResponseSchema>;
