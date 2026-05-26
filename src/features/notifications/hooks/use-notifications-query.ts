"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/src/features/notifications/api/get-notifications";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export function useNotificationsQuery() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications({ userId }),
    enabled: Boolean(userId),
    refetchInterval: 20000,
  });
}
