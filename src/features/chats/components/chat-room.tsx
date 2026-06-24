"use client";

import { useEffect, useRef } from "react";
import { MessageModel } from "@/src/shared/schemas/chat.schema";
import { MessageBubble } from "@/src/features/chats/components/message-bubble";
import { MessageInput } from "@/src/features/chats/components/message-input";
import { OfferReferenceCard } from "@/src/features/chats/components/offer-reference-card";
import { OfferModel } from "@/src/shared/schemas/offer.schema";

type ChatRoomProps = {
  messages: MessageModel[];
  currentUserId?: string;
  isSending?: boolean;
  title?: string;
  subtitle?: string;
  offer?: Pick<OfferModel, "id" | "title" | "price" | "imageUrl"> | null;
  onSendMessage: (content: string) => Promise<void> | void;
};

export function ChatRoom({
  messages,
  currentUserId,
  isSending = false,
  title = "Conversa",
  subtitle = "Negociação em andamento",
  offer = null,
  onSendMessage,
}: ChatRoomProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
            {title
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-slate-950 sm:text-lg">{title}</h1>
            <p className="truncate text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
      </header>

      {offer ? (
        <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3">
          <OfferReferenceCard offer={offer} />
        </div>
      ) : null}

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#f7f9fd] px-4 py-5 sm:px-6"
      >
        {messages.length === 0 ? (
          <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
            <h2 className="font-semibold text-slate-900">Comece a negociação</h2>
            <p className="mt-1 text-sm text-slate-500">Envie uma mensagem para combinar preço, retirada ou entrega.</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} currentUserId={currentUserId} />
          ))
        )}
      </div>

      <div className="border-t border-slate-100 bg-white p-3 sm:p-4">
        <MessageInput onSendMessage={onSendMessage} isSending={isSending} placeholder="Digite sua mensagem aqui..." />
      </div>
    </section>
  );
}
