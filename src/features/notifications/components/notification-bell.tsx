"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useNotificationsQuery } from "@/src/features/notifications/hooks/use-notifications-query";

export function NotificationBell() {
  const notificationsQuery = useNotificationsQuery();
  const notifications = notificationsQuery.data ?? [];
  const unreadCount = notifications.find((item) => item.unreadCount !== undefined)?.unreadCount ?? notifications.filter((item) => !item.isRead).length;

  return (
    <Link href="/notifications" className="relative inline-flex items-center rounded-full border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-100">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 ? (
        <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[10px] font-semibold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      ) : null}
      <span className="sr-only">Abrir notificações</span>
    </Link>
  );
}
