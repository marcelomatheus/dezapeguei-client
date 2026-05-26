import { z } from "zod";

const optionalText = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().max(max).optional(),
  );

const optionalPhone = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const digits = value.replace(/\D/g, "");
    return digits.length === 0 ? undefined : digits;
  },
  z
    .string()
    .refine((digits) => digits.length >= 10 && digits.length <= 13, "Informe um telefone válido.")
    .optional(),
);

export const UserPlanSchema = z.enum(["FREE", "PREMIUM", "ENTERPRISE"]);

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  rating: z.number().default(0),
  salesCount: z.number().default(0),
  purchasesCount: z.number().default(0),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  plan: UserPlanSchema.default("FREE"),
});

export const UpdateProfilePayloadSchema = z.object({
  name: z
    .preprocess(
      (value) => {
        if (typeof value !== "string") {
          return value;
        }

        const trimmed = value.trim();
        return trimmed.length === 0 ? undefined : trimmed;
      },
      z.string().min(2, "Informe seu nome.").max(120).optional(),
    )
    .optional(),
  phone: optionalPhone,
  bio: optionalText(500),
  city: optionalText(80),
  state: optionalText(80),
  avatar: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().url("Informe uma URL válida para avatar.").optional(),
  ),
  instagram: optionalText(30),
});

export type UserProfileModel = z.infer<typeof UserProfileSchema>;
export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;
