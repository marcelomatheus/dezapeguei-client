"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "@/src/features/profile/api/update-profile";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { useZodForm } from "@/src/shared/forms/form-schema";
import { UpdateProfilePayload, UpdateProfilePayloadSchema } from "@/src/shared/schemas/profile.schema";
import { useProfileQuery } from "@/src/features/profile/hooks/use-profile-query";
import { UserProfile } from "@/src/shared/types/domain";

export function useUpdateProfileForm() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  const setUser = useAuthStore((state) => state.setUser);
  const profileQuery = useProfileQuery();

  const normalizeProfile = (profile: {
    id: string;
    email: string;
    rating: number;
    salesCount: number;
    purchasesCount: number;
    plan: "FREE" | "PREMIUM" | "ENTERPRISE";
    name?: string | null;
    phone?: string | null;
    instagram?: string | null;
    avatar?: string | null;
    bio?: string | null;
    city?: string | null;
    state?: string | null;
  }): UserProfile => ({
    ...profile,
    name: profile.name ?? undefined,
    phone: profile.phone ?? undefined,
    instagram: profile.instagram ?? undefined,
    avatar: profile.avatar ?? undefined,
    bio: profile.bio ?? undefined,
    city: profile.city ?? undefined,
    state: profile.state ?? undefined,
  });

  const form = useZodForm(UpdateProfilePayloadSchema, {
    defaultValues: {
      name: "",
      phone: "",
      bio: "",
      city: "",
      state: "",
      avatar: "",
      instagram: "",
    },
  });

  useEffect(() => {
    const profile = profileQuery.data;
    if (!profile) {
      return;
    }

    form.reset({
      name: profile.name ?? "",
      phone: profile.phone ?? "",
      bio: profile.bio ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      avatar: profile.avatar ?? "",
      instagram: profile.instagram ?? "",
    });
  }, [form, profileQuery.data]);

  const mutation = useMutation({
    mutationFn: async (values: UpdateProfilePayload) => {
      if (!userId) {
        throw new Error("Usuário não autenticado.");
      }

      return updateProfile(userId, values);
    },
    onSuccess: async (updatedProfile) => {
      setUser(normalizeProfile(updatedProfile));
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    profileQuery,
  };
}
