"use client";

import { useMarkAsRead } from "@/src/features/notifications/hooks/use-mark-as-read";
import { useNotificationsQuery } from "@/src/features/notifications/hooks/use-notifications-query";

export function useNotifications() {
  const notificationsQuery = useNotificationsQuery();
  const markAsReadMutation = useMarkAsRead();

  return {
    notificationsQuery,
    markAsRead: markAsReadMutation.markAsRead,
    isMarking: markAsReadMutation.isPending,
  };
}
