"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { setAuthCookies } from "@/app/actions/auth";
import { loginAfterRegister, register } from "@/src/features/auth/api/auth-api";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { saveTokens } from "@/src/shared/auth/token-storage";
import { useZodForm } from "@/src/shared/forms/form-schema";
import { RegisterPayloadSchema } from "@/src/shared/schemas/auth.schema";
import { UserProfile } from "@/src/shared/types/domain";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export function useRegisterForm() {
  const form = useZodForm(RegisterPayloadSchema, {
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const setSession = useAuthStore((state) => state.setSession);

  const normalizeProfile = (profile: {
    id: string;
    email: string;
    rating: number;
    salesCount: number;
    purchasesCount: number;
    plan: "FREE" | "PREMIUM" | "ENTERPRISE";
    name?: string | null;
    phone?: string | null;
    avatar?: string | null;
    bio?: string | null;
    city?: string | null;
    state?: string | null;
  }): UserProfile => ({
    ...profile,
    name: profile.name ?? undefined,
    phone: profile.phone ?? undefined,
    avatar: profile.avatar ?? undefined,
    bio: profile.bio ?? undefined,
    city: profile.city ?? undefined,
    state: profile.state ?? undefined,
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async (_, variables) => {
      const session = await loginAfterRegister({
        email: variables.email,
        password: variables.password,
      });

      saveTokens({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      });
      await setAuthCookies({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      });
      setSession(normalizeProfile(session.user), session.accessToken);
      toast.success("Conta criada com sucesso.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  const onSubmit = form.handleSubmit(async (values: RegisterValues) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
}
