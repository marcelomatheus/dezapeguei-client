"use client";

import { MessageModel } from "@/src/shared/schemas/chat.schema";
import { getChatMessageStatusLabel } from "@/src/shared/i18n/enum-labels";
import { formatDateTimeBR } from "@/src/shared/utils/formatters";

type MessageBubbleProps = {
  message: MessageModel;
  currentUserId?: string;
};

export function MessageBubble({ message, currentUserId }: MessageBubbleProps) {
  const isMine = Boolean(currentUserId && message.senderId === currentUserId);
  const senderName = message.sender?.name ?? "Usuário";
  const initials = senderName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`flex w-full items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
      {!isMine ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
          {initials}
        </div>
      ) : null}
      <div
        className={`max-w-[82%] px-4 py-2.5 text-sm shadow-sm sm:max-w-[68%] ${
          isMine
            ? "rounded-[20px] rounded-br-md bg-blue-600 text-white"
            : "rounded-[20px] rounded-bl-md bg-slate-100 text-slate-900"
        }`}
      >
        <p className="whitespace-pre-wrap break-words leading-5">{message.content}</p>
        <p className={`mt-1.5 text-[10px] ${isMine ? "text-blue-100" : "text-slate-500"}`}>
          {formatDateTimeBR(message.createdAt)} · {getChatMessageStatusLabel(message.status)}
        </p>
      </div>
    </div>
  );
}
