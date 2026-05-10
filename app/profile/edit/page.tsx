"use client";

import { BackButton } from "@/src/components/back-button";
import { ProfileForm } from "@/src/features/profile/components/profile-form";
import { useUpdateProfileForm } from "@/src/features/profile/hooks/use-update-profile-form";

export default function ProfileEditPage() {
  const { form, onSubmit, isPending, profileQuery } = useUpdateProfileForm();

  if (profileQuery.isLoading) {
    return <main className="px-4 py-6 sm:px-6">Carregando...</main>;
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/profile" />
      </div>
      <ProfileForm form={form} onSubmit={onSubmit} isPending={isPending} />
    </main>
  );
}
