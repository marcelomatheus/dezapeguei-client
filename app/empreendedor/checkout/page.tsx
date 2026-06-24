"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { PageSkeleton } from "@/src/components/page-skeleton";
import { createEntrepreneurCheckoutSession } from "@/src/features/payments/api/payments-api";

export default function EntrepreneurCheckoutPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createEntrepreneurCheckoutSession,
    onSuccess: (session) => router.replace(`/empreendedor/checkout/session/${session.sessionId}`),
  });
  const { mutate } = mutation;

  useEffect(() => {
    mutate();
  }, [mutate]);

  return <PageSkeleton variant="form" />;
}
