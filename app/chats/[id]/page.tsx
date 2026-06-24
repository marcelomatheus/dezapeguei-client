"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { ChatRoom } from "@/src/features/chats/components/chat-room";
import { ConfirmSaleButton } from "@/src/features/chats/components/confirm-sale-button";
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
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col px-4 py-6 sm:h-[80vh] sm:px-6 sm:py-8">
      <div className="mb-3">
        <BackButton fallbackHref="/chats" />
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">{chatTitle}</h1>
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
        onSendMessage={(content) => sendMessage.sendMessage({ content })}
      />
    </main>
  );
}
