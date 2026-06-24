"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type MessageInputProps = {
  onSendMessage: (content: string) => Promise<void> | void;
  isSending?: boolean;
  placeholder?: string;
};

export function MessageInput({
  onSendMessage,
  isSending = false,
  placeholder = "Digite sua mensagem",
}: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextValue = value.trim();

    if (!nextValue || isSending) {
      return;
    }

    await onSendMessage(nextValue);
    setValue("");
  };

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={isSending}
        className="h-10 min-w-0 flex-1 rounded-full bg-slate-50 px-4 text-sm text-slate-900 outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:bg-white focus:ring-blue-200"
      />
      <button
        type="submit"
        disabled={isSending || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Enviar mensagem"
      >
        {isSending ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </form>
  );
}
