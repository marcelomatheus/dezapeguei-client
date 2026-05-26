import { getNotifications } from "@/src/features/notifications/api/get-notifications";
import { markAsRead } from "@/src/features/notifications/api/mark-as-read";

export async function markAllAsRead(userId: string): Promise<void> {
  const notifications = await getNotifications({ userId, isRead: false });

  await Promise.all(
    notifications.map((notification) =>
      markAsRead({
        id: notification.id,
      }),
    ),
  );
}
