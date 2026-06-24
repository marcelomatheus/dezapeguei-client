"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Share2, Store } from "lucide-react";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { getPublicEntrepreneur } from "@/src/features/entrepreneur/api/entrepreneur-api";
import { EntrepreneurBadge } from "@/src/features/entrepreneur/components/entrepreneur-badge";
import { OfferGrid } from "@/src/features/offers/components/offer-grid";

export default function PublicEntrepreneurPage() {
  const params = useParams<{ id: string }>();
  const query = useQuery({
    queryKey: ["public-entrepreneur", params.id],
    queryFn: () => getPublicEntrepreneur(params.id),
  });

  if (query.isLoading) {
    return <PageSkeleton variant="detail" />;
  }

  if (!query.data) {
    return <main className="px-4 py-6">Empreendedor não encontrado.</main>;
  }

  const profile = query.data.entrepreneurProfile;
  const offers = query.data.offers ?? [];
  const shareStore = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: profile?.businessName ?? query.data.name, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  return (
    <main className="page-motion mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      <section className="surface-motion overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="bg-zinc-950 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Store className="h-6 w-6 text-orange-300" />
            <h1 className="text-3xl font-black">{profile?.businessName ?? query.data.name}</h1>
            <EntrepreneurBadge active={query.data.entrepreneur?.isActive} />
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">{profile?.description ?? "Perfil público do vendedor."}</p>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {profile?.city ?? "Cidade não informada"} / {profile?.state ?? "UF"}
            </span>
            <span>Na plataforma desde {new Date(query.data.createdAt).toLocaleDateString("pt-BR")}</span>
            {profile?.instagram ? <Link href={`https://instagram.com/${profile.instagram}`} target="_blank" className="font-medium text-orange-700">Instagram</Link> : null}
          </div>
          <button type="button" onClick={shareStore} className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">
            <Share2 className="h-4 w-4" />
            Compartilhar loja
          </button>
        </div>
      </section>
      <section className="mt-6">
        <h2 className="mb-3 text-xl font-bold text-zinc-900">Ofertas ativas</h2>
        <OfferGrid offers={offers} />
      </section>
    </main>
  );
}
