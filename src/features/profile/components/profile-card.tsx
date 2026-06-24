"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UserProfileModel } from "@/src/shared/schemas/profile.schema";
import { EntrepreneurBadge } from "@/src/features/entrepreneur/components/entrepreneur-badge";
import { getUserPlanLabel } from "@/src/shared/i18n/enum-labels";

type ProfileCardProps = {
  profile: UserProfileModel;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  const isVerified = Boolean(profile.entrepreneurVerifiedAt);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>Perfil</CardTitle>
          <EntrepreneurBadge active={isVerified} compact />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-zinc-700">
        <p><strong>Nome:</strong> {profile.name ?? "Não informado"}</p>
        <p><strong>E-mail:</strong> {profile.email}</p>
        <p><strong>Telefone:</strong> {profile.phone ?? "Não informado"}</p>
        <p><strong>Cidade:</strong> {profile.city ?? "Não informada"}</p>
        <p><strong>Estado:</strong> {profile.state ?? "Não informado"}</p>
        <p><strong>Plano:</strong> {getUserPlanLabel(profile.plan)}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/profile/edit" className="inline-flex text-sm font-medium text-orange-700 hover:text-orange-800">
            Editar perfil
          </Link>
          <Link href={isVerified ? "/empreendedor/dashboard" : "/empreendedor/validar"} className="inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800">
            {isVerified ? "Abrir central empreendedor" : "Tornar-se empreendedor"}
          </Link>
          <Link href="/comunidades" className="inline-flex text-sm font-medium text-zinc-700 hover:text-zinc-900">
            Entrar em comunidades
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
