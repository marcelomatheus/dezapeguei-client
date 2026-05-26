"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallbackHref?: string;
  label?: string;
  className?: string;
};

export function BackButton({
  fallbackHref = "/offers",
  label = "Voltar",
  className,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(fallbackHref);
      }}
      className={[
        "inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden>←</span>
      {label}
    </button>
  );
}
