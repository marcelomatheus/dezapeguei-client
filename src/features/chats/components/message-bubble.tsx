"use client";

import { MessageModel } from "@/src/shared/schemas/chat.schema";
import { getChatMessageStatusLabel } from "@/src/shared/i18n/enum-labels";

type MessageBubbleProps = {
  message: MessageModel;
  currentUserId?: string;
};

export function MessageBubble({ message, currentUserId }: MessageBubbleProps) {
  const isMine = Boolean(currentUserId && message.senderId === currentUserId);

  return (
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
          isMine ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-900"
        }`}
      >
        <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>
        <p className={`mt-1 text-[10px] ${isMine ? "text-orange-100" : "text-zinc-500"}`}>
          {getChatMessageStatusLabel(message.status)}
        </p>
      </div>
    </div>
  );
}
