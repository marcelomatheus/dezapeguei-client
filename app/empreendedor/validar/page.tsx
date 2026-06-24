"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { BackButton } from "@/src/components/back-button";
import { submitEntrepreneurValidation } from "@/src/features/entrepreneur/api/entrepreneur-api";
import { EntrepreneurValidationForm } from "@/src/features/entrepreneur/components/entrepreneur-validation-form";
import { createEntrepreneurCheckoutSession } from "@/src/features/payments/api/payments-api";
import { EntrepreneurValidationPayload } from "@/src/shared/schemas/entrepreneur.schema";

export default function EntrepreneurValidationPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (payload: EntrepreneurValidationPayload) => {
      const sanitized = {
        ...payload,
        website: payload.website || undefined,
      };
      await submitEntrepreneurValidation(sanitized);
      return createEntrepreneurCheckoutSession();
    },
    onSuccess: (session) => {
      router.push(`/empreendedor/checkout/session/${session.sessionId}`);
    },
  });

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/empreendedor/dashboard" />
      </div>
      <EntrepreneurValidationForm onSubmit={(payload) => mutation.mutateAsync(payload)} isPending={mutation.isPending} />
      {mutation.isError ? <p className="mt-3 text-sm text-red-600">Não foi possível iniciar a validação.</p> : null}
    </main>
  );
}
