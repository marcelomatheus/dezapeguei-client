"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ChatModel } from "@/src/shared/schemas/chat.schema";
import { formatDateTimeBR } from "@/src/shared/utils/formatters";

type ChatListProps = {
  chats: ChatModel[];
  currentUserId?: string;
  emptyMessage?: string;
  activeChatId?: string;
  className?: string;
};

function getCounterpartName(chat: ChatModel, currentUserId?: string): string {
  if (chat.isGroup) {
    return chat.name ?? "Grupo";
  }

  const counterpart = (chat.participants ?? []).find((participant) => participant.userId !== currentUserId);
  return counterpart?.user?.name ?? chat.name ?? "Conversa direta";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ChatList({
  chats,
  currentUserId,
  emptyMessage = "Nenhuma conversa encontrada.",
  activeChatId,
  className,
}: ChatListProps) {
  if (chats.length === 0) {
    return (
      <section className={["rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70", className].filter(Boolean).join(" ")}>
        <div className="py-10 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-zinc-300" />
          <p className="mt-2 text-sm font-medium text-zinc-700">{emptyMessage}</p>
          <p className="mt-1 text-xs text-zinc-500">Quando você negociar uma oferta, a conversa aparecerá aqui.</p>
        </div>
      </section>
    );
  }

  return (
    <aside className={["flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70", className].filter(Boolean).join(" ")}>
      <header className="border-b border-slate-100 px-4 py-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">Mensagens</h2>
          <p className="text-xs text-slate-500">{chats.length} conversa(s)</p>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {chats.map((chat) => {
          const name = getCounterpartName(chat, currentUserId);
          const isActive = chat.id === activeChatId;

          return (
            <Link
              key={chat.id}
              href={`/chats/${chat.id}`}
              className={[
                "group flex gap-3 rounded-2xl p-3 transition",
                isActive ? "bg-blue-50" : "hover:bg-slate-50",
              ].join(" ")}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                {getInitials(name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-bold text-slate-900">{name}</p>
                  {isActive ? <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" /> : null}
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {chat.isGroup ? "Conversa em grupo" : "Negociação direta"}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">{formatDateTimeBR(chat.updatedAt)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
