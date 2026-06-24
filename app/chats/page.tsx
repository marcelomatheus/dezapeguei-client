"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { ChatList } from "@/src/features/chats/components/chat-list";
import { useChatsQuery } from "@/src/features/chats/hooks/use-chats-query";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { MessageCircle } from "lucide-react";

export default function ChatsPage() {
  const chatsQuery = useChatsQuery();
  const currentUserId = useAuthStore((state) => state.user?.id);

  if (chatsQuery.isLoading) {
    return (
      <main className="min-h-[calc(100vh-96px)] bg-[#eef3fb] px-4 py-4 sm:px-6">
        <div className="mx-auto grid h-[calc(100vh-140px)] max-w-7xl gap-4 lg:grid-cols-[360px_1fr]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="mt-2 h-3 w-1/4" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-96px)] bg-[#eef3fb] px-4 py-4 sm:px-6">
      <div className="mx-auto grid h-[calc(100vh-140px)] max-w-7xl gap-4 lg:grid-cols-[360px_1fr]">
        <ChatList chats={chatsQuery.data ?? []} currentUserId={currentUserId} />
        <section className="hidden items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:flex">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-slate-950">Selecione uma conversa</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Escolha uma negociação para continuar o atendimento, combinar retirada ou confirmar detalhes da oferta.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
