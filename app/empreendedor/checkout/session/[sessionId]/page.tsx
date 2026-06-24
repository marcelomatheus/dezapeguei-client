"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EntrepreneurCheckoutCard } from "@/src/features/payments/components/entrepreneur-checkout-card";
import { getPaymentSession, simulatePaymentFailure, simulatePaymentSuccess } from "@/src/features/payments/api/payments-api";
import { PageSkeleton } from "@/src/components/page-skeleton";

export default function EntrepreneurCheckoutSessionPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const sessionId = params.sessionId;
  const sessionQuery = useQuery({
    queryKey: ["payment-session", sessionId],
    queryFn: () => getPaymentSession(sessionId),
  });
  const success = useMutation({
    mutationFn: () => simulatePaymentSuccess(sessionId),
    onSuccess: () => router.push("/empreendedor/success"),
  });
  const failure = useMutation({
    mutationFn: () => simulatePaymentFailure(sessionId),
    onSuccess: () => router.push("/empreendedor/cancel"),
  });

  if (sessionQuery.isLoading) {
    return <PageSkeleton variant="form" />;
  }

  if (!sessionQuery.data) {
    return <main className="px-4 py-6">Sessão de checkout não encontrada.</main>;
  }

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8">
      <EntrepreneurCheckoutCard
        amount={sessionQuery.data.amount}
        isPending={success.isPending || failure.isPending}
        onSuccess={() => success.mutate()}
        onFailure={() => failure.mutate()}
      />
    </main>
  );
}
