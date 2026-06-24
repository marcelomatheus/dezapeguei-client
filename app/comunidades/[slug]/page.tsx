"use client";

import { useParams } from "next/navigation";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { CommunityRoom } from "@/src/features/communities/components/community-room";
import { useCommunityQuery } from "@/src/features/communities/hooks/use-communities";

export default function CommunityPage() {
  const params = useParams<{ slug: string }>();
  const communityQuery = useCommunityQuery(params.slug);

  if (communityQuery.isLoading) {
    return <PageSkeleton variant="detail" />;
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/comunidades" />
      </div>
      {communityQuery.data ? <CommunityRoom community={communityQuery.data} /> : null}
      {communityQuery.isError ? <p className="text-sm text-red-600">Não foi possível carregar a comunidade.</p> : null}
    </main>
  );
}
