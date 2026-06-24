"use client";

import { useQuery } from "@tanstack/react-query";
import { BackButton } from "@/src/components/back-button";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { getEntrepreneurDashboard } from "@/src/features/entrepreneur/api/entrepreneur-api";
import { EntrepreneurDashboard } from "@/src/features/entrepreneur/components/entrepreneur-dashboard";

export default function EntrepreneurDashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: ["entrepreneur-dashboard"],
    queryFn: getEntrepreneurDashboard,
    retry: false,
  });

  if (dashboardQuery.isLoading) {
    return <PageSkeleton variant="dashboard" />;
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      {dashboardQuery.data ? <EntrepreneurDashboard data={dashboardQuery.data} /> : null}
      {dashboardQuery.isError ? <p className="text-sm text-red-600">Não foi possível carregar a central do empreendedor.</p> : null}
    </main>
  );
}
