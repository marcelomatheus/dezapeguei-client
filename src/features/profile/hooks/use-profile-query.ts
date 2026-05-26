"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/src/features/profile/api/get-profile";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useProfileQuery() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: getProfile,
    enabled: Boolean(userId),
  });
}
