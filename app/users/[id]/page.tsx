"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BackButton } from "@/src/components/back-button";
import { httpClient } from "@/src/shared/api/http-client";
import { UserProfile } from "@/src/shared/types/domain";

async function getUserProfile(userId: string) {
  const response = await httpClient.get<UserProfile>(`/users/${userId}`);
  return response.data;
}

export default function SellerProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserProfile(userId),
    enabled: Boolean(userId),
  });

  if (userQuery.isLoading) {
    return <main className="px-4 py-6 sm:px-6">Carregando...</main>;
  }

  if (!userQuery.data) {
    return <main className="px-4 py-6 sm:px-6">Usuário não encontrado.</main>;
  }

  const user = userQuery.data;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/offers" />
      </div>
      <h1 className="text-xl font-bold sm:text-2xl">Perfil do vendedor</h1>
      <p className="mt-3">Nome: {user.name ?? "Não informado"}</p>
      <p>Avaliação: {user.rating}</p>
      <p>Vendas: {user.salesCount}</p>
      <p>Cidade: {user.city ?? "Não informada"}</p>
    </main>
  );
}
