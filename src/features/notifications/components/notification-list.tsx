"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { NotificationItem } from "@/src/features/notifications/components/notification-item";
import { NotificationModel } from "@/src/shared/schemas/notification.schema";

type NotificationListProps = {
  notifications: NotificationModel[];
  isLoading?: boolean;
  onRead?: (id: string) => void;
};

export function NotificationList({ notifications, isLoading = false, onRead }: NotificationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-zinc-200 p-4">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="mt-2 h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return <p className="text-sm text-zinc-700">Nenhuma notificacao no momento.</p>;
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onRead={onRead} />
      ))}
    </div>
  );
}
