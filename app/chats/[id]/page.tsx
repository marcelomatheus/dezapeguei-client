"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { ChatList } from "@/src/features/chats/components/chat-list";
import { ChatRoom } from "@/src/features/chats/components/chat-room";
import { ConfirmSaleButton } from "@/src/features/chats/components/confirm-sale-button";
import { useChatsQuery } from "@/src/features/chats/hooks/use-chats-query";
import { useMessagesQuery } from "@/src/features/chats/hooks/use-messages-query";
import { useSendMessage } from "@/src/features/chats/hooks/use-send-message";
import { useChatSocket } from "@/src/features/chats/hooks/use-chat-socket";
import { useMarkAsRead } from "@/src/features/chats/hooks/use-mark-as-read";
import { useChatQuery } from "@/src/features/chats/hooks/use-chat-query";
import { useOfferQuery } from "@/src/features/offers/hooks/use-offer-query";
import { useAuthStore } from "@/src/shared/auth/auth-store";

export default function ChatRoomPage() {
  const params = useParams<{ id: string }>();
  const chatId = params.id;
  const currentUserId = useAuthStore((state) => state.user?.id);
  const messagesQuery = useMessagesQuery(chatId);
  const chatsQuery = useChatsQuery();
  const sendMessage = useSendMessage(chatId);
  const markAsRead = useMarkAsRead(chatId);
  const chatQuery = useChatQuery(chatId);
  const offerQuery = useOfferQuery(chatQuery.data?.offerId ?? undefined);

  const chatTitle = (() => {
    const chat = chatQuery.data;

    if (!chat) {
      return "Conversa";
    }

    if (chat.isGroup) {
      return chat.name ?? "Grupo";
    }

    const counterpart = (chat.participants ?? []).find((participant) => participant.userId !== currentUserId);
    return counterpart?.user?.name ?? chat.name ?? "Conversa";
  })();

  useChatSocket({ chatId });

  useEffect(() => {
    const messages = messagesQuery.data ?? [];
    if (!currentUserId || messages.length === 0) {
      return;
    }

    for (const message of messages) {
      if (message.senderId !== currentUserId && message.status !== "READ") {
        void markAsRead.markAsRead({ messageId: message.id });
      }
    }
  }, [currentUserId, markAsRead, messagesQuery.data]);

  if (messagesQuery.isLoading) {
    return <PageSkeleton variant="detail" />;
  }

  return (
    <main className="min-h-[calc(100vh-96px)] bg-[#eef3fb] px-4 py-4 sm:px-6">
      <div className="mx-auto grid h-[calc(100vh-140px)] max-w-7xl gap-4 lg:grid-cols-[360px_1fr]">
        <ChatList
          chats={chatsQuery.data ?? []}
          currentUserId={currentUserId}
          activeChatId={chatId}
          className="hidden lg:flex"
        />
        <div className="flex min-h-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <BackButton fallbackHref="/chats" />
            {chatQuery.data ? (
              <ConfirmSaleButton
                chat={chatQuery.data}
                offer={offerQuery.data ?? null}
                currentUserId={currentUserId}
              />
            ) : null}
          </div>
          <div className="hidden justify-end lg:flex">
            {chatQuery.data ? (
              <ConfirmSaleButton
                chat={chatQuery.data}
                offer={offerQuery.data ?? null}
                currentUserId={currentUserId}
              />
            ) : null}
          </div>
          <ChatRoom
            messages={messagesQuery.data ?? []}
            currentUserId={currentUserId}
            isSending={sendMessage.isPending}
            title={chatTitle}
            subtitle={offerQuery.data ? `Negociando: ${offerQuery.data.title}` : "Negociação direta"}
            offer={offerQuery.data ?? null}
            onSendMessage={(content) => sendMessage.sendMessage({ content })}
          />
        </div>
      </div>
    </main>
  );
}
