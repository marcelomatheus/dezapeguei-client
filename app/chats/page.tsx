"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { ChatList } from "@/src/features/chats/components/chat-list";
import { useChatsQuery } from "@/src/features/chats/hooks/use-chats-query";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export default function ChatsPage() {
  const chatsQuery = useChatsQuery();
  const currentUserId = useAuthStore((state) => state.user?.id);

  if (chatsQuery.isLoading) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-zinc-200 p-4">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="mt-2 h-3 w-1/4" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Conversas</h1>
      <ChatList chats={chatsQuery.data ?? []} currentUserId={currentUserId} />
    </main>
  );
}
