"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

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
    <form onSubmit={(event) => void handleSubmit(event)} className="flex gap-2">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={isSending}
      />
      <Button type="submit" disabled={isSending || !value.trim()}>
        {isSending ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
