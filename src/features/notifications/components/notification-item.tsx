"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";
import { NotificationModel } from "@/src/shared/schemas/notification.schema";

type NotificationItemProps = {
  notification: NotificationModel;
  onRead?: (id: string) => void;
};

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const router = useRouter();

  return (
    <Card className={notification.isRead ? "border-zinc-200 bg-white" : "border-orange-200 bg-orange-50/40"}>
      <CardContent className="space-y-2 p-4">
        <p className="text-sm text-zinc-900">{notification.message}</p>
        <div className="flex items-center gap-4 text-xs">
          <span className={notification.isRead ? "text-zinc-600" : "font-semibold text-orange-800"}>
            {notification.isRead ? "Lida" : "Nao lida"}
          </span>
          <button
            type="button"
            className="font-semibold text-orange-800 hover:underline"
            onClick={() => {
              if (!notification.isRead) {
                onRead?.(notification.id);
              }

              if (notification.redirect) {
                router.push(notification.redirect);
              }
            }}
          >
            Ver detalhe
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
