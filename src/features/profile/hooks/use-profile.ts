"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { httpClient } from "@/src/shared/api/http-client";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { UserProfile } from "@/src/shared/types/domain";

async function getProfile() {
  const response = await httpClient.get<UserProfile>("/users/me");
  return response.data;
}

async function updateProfile(payload: Partial<UserProfile>) {
  const response = await httpClient.patch<UserProfile>("/users/me", payload);
  return response.data;
}

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso.");
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  return {
    profileQuery,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
