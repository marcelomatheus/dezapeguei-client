"use client";

export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-500">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400 [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400 [animation-delay:240ms]" />
    </div>
  );
}
