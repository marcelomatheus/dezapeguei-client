"use client";

import { NotificationList } from "@/src/features/notifications/components/notification-list";
import { useMarkAsRead } from "@/src/features/notifications/hooks/use-mark-as-read";
import { useNotificationsQuery } from "@/src/features/notifications/hooks/use-notifications-query";

export default function NotificationsPage() {
  const notificationsQuery = useNotificationsQuery();
  const { markAsRead, markAllAsRead, isPending } = useMarkAsRead();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">Notificacoes</h1>
          <p className="text-sm text-zinc-700">Acompanhe novidades de ofertas, chats e vendas.</p>
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            void markAllAsRead();
          }}
          className="w-full rounded-lg border border-zinc-400 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          Marcar todas como lidas
        </button>
      </div>

      <NotificationList
        notifications={notificationsQuery.data ?? []}
        isLoading={notificationsQuery.isLoading}
        onRead={(id) => {
          void markAsRead(id);
        }}
      />
    </main>
  );
}
