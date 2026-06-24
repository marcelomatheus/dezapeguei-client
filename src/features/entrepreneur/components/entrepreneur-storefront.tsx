"use client";

import Link from "next/link";
import { Share2, Store } from "lucide-react";
import { EntrepreneurMe } from "@/src/shared/schemas/entrepreneur.schema";
import { EntrepreneurBadge } from "@/src/features/entrepreneur/components/entrepreneur-badge";

type EntrepreneurStorefrontProps = {
  data: EntrepreneurMe;
};

export function EntrepreneurStorefront({ data }: EntrepreneurStorefrontProps) {
  const profile = data.profile;
  const storefront = data.storefront;
  const publicUrl = profile?.userId ? `/empreendedores/${profile.userId}` : "/empreendedor/validar";

  const shareStore = async () => {
    const url = `${window.location.origin}${publicUrl}`;
    if (navigator.share) {
      await navigator.share({
        title: profile?.businessName ?? "Minha loja no DeZapeguei",
        url,
      });
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  return (
    <section className="surface-motion rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-zinc-900">{profile?.businessName ?? "Vitrine do empreendedor"}</h2>
            <EntrepreneurBadge active={data.entrepreneur.isActive} />
          </div>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">{storefront?.description ?? profile?.description ?? "Configure sua vitrine para apresentar seu negócio."}</p>
        </div>
        {storefront?.slug ? (
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">/empreendedores/{profile?.userId}</span>
        ) : null}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Link href={publicUrl} className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
          <Store className="h-4 w-4" />
          Ver loja
        </Link>
        <button type="button" onClick={shareStore} className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">
          <Share2 className="h-4 w-4" />
          Compartilhar loja
        </button>
        <Link href="/comunidades" className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100">
          Publicar em comunidades
        </Link>
      </div>
    </section>
  );
}
