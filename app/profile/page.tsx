"use client";

import Link from "next/link";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { ProfileCard } from "@/src/features/profile/components/profile-card";
import { useProfileQuery } from "@/src/features/profile/hooks/use-profile-query";

export default function ProfilePage() {
  const profileQuery = useProfileQuery();

  if (profileQuery.isLoading) {
    return <PageSkeleton variant="detail" />;
  }

  if (!profileQuery.data) {
    return <main className="px-4 py-6 sm:px-6">Não foi possível carregar o perfil.</main>;
  }

  const profile = profileQuery.data;

  return (
    <main className="page-motion mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4 flex items-center justify-between">
        <BackButton fallbackHref="/offers" />
        <div className="flex items-center gap-2">
          <Link href="/profile/account" className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700">
            Minha conta
          </Link>
          <Link href="/profile/edit" className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white">
            Editar perfil
          </Link>
        </div>
      </div>
      <ProfileCard profile={profile} />
    </main>
  );
}
