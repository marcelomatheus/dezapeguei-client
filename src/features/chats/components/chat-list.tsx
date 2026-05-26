"use client";

import Link from "next/link";
import { ChatModel } from "@/src/shared/schemas/chat.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

type ChatListProps = {
  chats: ChatModel[];
  currentUserId?: string;
  emptyMessage?: string;
};

function getCounterpartName(chat: ChatModel, currentUserId?: string): string {
  if (chat.isGroup) {
    return chat.name ?? "Grupo";
  }

  const counterpart = (chat.participants ?? []).find((participant) => participant.userId !== currentUserId);
  return counterpart?.user?.name ?? chat.name ?? "Conversa direta";
}

export function ChatList({ chats, currentUserId, emptyMessage = "Nenhuma conversa encontrada." }: ChatListProps) {
  if (chats.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-zinc-500">{emptyMessage}</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {chats.map((chat) => (
        <Card key={chat.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              <Link href={`/chats/${chat.id}`} className="hover:text-orange-600">
                {getCounterpartName(chat, currentUserId)}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-zinc-500">
            {chat.participants?.length ?? 0} participante(s)
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
