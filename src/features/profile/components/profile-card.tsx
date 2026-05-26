"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UserProfileModel } from "@/src/shared/schemas/profile.schema";

type ProfileCardProps = {
  profile: UserProfileModel;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-zinc-700">
        <p><strong>Nome:</strong> {profile.name ?? "Nao informado"}</p>
        <p><strong>E-mail:</strong> {profile.email}</p>
        <p><strong>Telefone:</strong> {profile.phone ?? "Nao informado"}</p>
        <p><strong>Cidade:</strong> {profile.city ?? "Nao informada"}</p>
        <p><strong>Estado:</strong> {profile.state ?? "Nao informado"}</p>
        <p><strong>Plano:</strong> {profile.plan}</p>

        <Link href="/profile/edit" className="inline-flex pt-2 text-sm font-medium text-orange-700 hover:text-orange-800">
          Editar perfil
        </Link>
      </CardContent>
    </Card>
  );
}
