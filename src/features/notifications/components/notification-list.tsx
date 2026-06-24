"use client";

import { Bell } from "lucide-react";
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
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
        <Bell className="mx-auto h-8 w-8 text-zinc-300" />
        <h2 className="mt-2 font-semibold text-zinc-900">Nenhuma notificação no momento</h2>
        <p className="mt-1 text-sm text-zinc-600">Alertas de mensagens, vendas e ofertas aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onRead={onRead} />
      ))}
    </div>
  );
}
