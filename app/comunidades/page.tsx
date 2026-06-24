"use client";

import Link from "next/link";
import { MessagesSquare, UsersRound } from "lucide-react";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { useCommunitiesQuery } from "@/src/features/communities/hooks/use-communities";

export default function CommunitiesPage() {
  const communitiesQuery = useCommunitiesQuery();

  if (communitiesQuery.isLoading) {
    return <PageSkeleton variant="list" />;
  }

  return (
    <main className="page-motion mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      <section className="surface-motion rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">Comunidades</p>
            <h1 className="mt-1 text-3xl font-black text-zinc-950">Acompanhe salas públicas</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Usuários comuns podem entrar e visualizar mensagens. Empreendedores verificados podem publicar novidades e ofertas próprias.
            </p>
          </div>
          <Link href="/empreendedor/validar" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
            Quero publicar
          </Link>
        </div>
      </section>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(communitiesQuery.data ?? []).map((community) => (
          <Link key={community.id} href={`/comunidades/${community.slug}`} className="surface-motion rounded-xl border border-zinc-200 bg-white p-5 hover:border-orange-300 hover:shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
              <MessagesSquare className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-zinc-900">{community.name}</h2>
            <p className="mt-2 text-sm text-zinc-600">{community.description ?? "Comunidade DeZapeguei"}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-zinc-500">
              <UsersRound className="h-3.5 w-3.5" />
              Entrar na comunidade
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
