"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/features/users/api/get-user-by-id";

export function useUserQuery(userId?: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId as string),
    enabled: Boolean(userId),
  });
}
