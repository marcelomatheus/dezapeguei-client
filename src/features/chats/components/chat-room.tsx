"use client";

import { useEffect, useRef } from "react";
import { MessageModel } from "@/src/shared/schemas/chat.schema";
import { MessageBubble } from "@/src/features/chats/components/message-bubble";
import { MessageInput } from "@/src/features/chats/components/message-input";
import { Card } from "@/src/components/ui/card";

type ChatRoomProps = {
  messages: MessageModel[];
  currentUserId?: string;
  isSending?: boolean;
  onSendMessage: (content: string) => Promise<void> | void;
};

export function ChatRoom({ messages, currentUserId, isSending = false, onSendMessage }: ChatRoomProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <div className="flex h-full flex-col gap-3">
      <Card className="flex-1 overflow-hidden p-0">
        <div ref={scrollRef} className="flex h-full flex-col gap-2 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">Nenhuma mensagem ainda.</p>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} currentUserId={currentUserId} />
            ))
          )}
        </div>
      </Card>
      <MessageInput onSendMessage={onSendMessage} isSending={isSending} />
    </div>
  );
}
