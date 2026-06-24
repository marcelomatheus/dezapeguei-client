"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/src/components/ui/button";

type CommunityMessageInputProps = {
  canSend: boolean;
  isPending: boolean;
  onSend: (content: string) => void;
};

export function CommunityMessageInput({ canSend, isPending, onSend }: CommunityMessageInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setContent("");
  };

  if (!canSend) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
        Apenas empreendedores com assinatura ativa podem publicar mensagens e ofertas nesta comunidade.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Escreva uma mensagem para a comunidade"
        className="min-h-24 rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <Button type="submit" disabled={isPending || !content.trim()}>
        {isPending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
