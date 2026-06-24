import Link from "next/link";
import { BarChart3, MessageSquareText, PackageSearch, Sparkles } from "lucide-react";
import { EntrepreneurDashboard as EntrepreneurDashboardData } from "@/src/shared/schemas/entrepreneur.schema";
import { EntrepreneurMetricsCards } from "@/src/features/entrepreneur/components/entrepreneur-metrics-cards";
import { EntrepreneurStorefront } from "@/src/features/entrepreneur/components/entrepreneur-storefront";
import {
  getEntrepreneurProfileStatusLabel,
  getEntrepreneurSubscriptionStatusLabel,
} from "@/src/shared/i18n/enum-labels";

type EntrepreneurDashboardProps = {
  data: EntrepreneurDashboardData;
};

export function EntrepreneurDashboard({ data }: EntrepreneurDashboardProps) {
  const profileStatus = getEntrepreneurProfileStatusLabel(data.profile?.status ?? "SEM_VALIDACAO");
  const subscriptionStatus = getEntrepreneurSubscriptionStatusLabel(data.subscription?.status ?? "SEM_ASSINATURA");

  const suggestions = [
    { title: "Compartilhe sua loja", text: "Divulgue a vitrine pública em redes sociais e conversas.", icon: Sparkles },
    { title: "Destaque até 3 ofertas", text: "Priorize produtos com melhor margem ou maior procura.", icon: PackageSearch },
    { title: "Use respostas rápidas", text: "Padronize atendimento para disponibilidade, retirada e negociação.", icon: MessageSquareText },
    { title: "Acompanhe interesse", text: "Favoritos e mensagens ajudam a decidir quais anúncios ajustar.", icon: BarChart3 },
  ];

  return (
    <div className="page-motion space-y-5">
      <section className="surface-motion rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Central do empreendedor</h1>
            <p className="mt-1 text-sm text-zinc-600">Validação: {profileStatus} · Assinatura: {subscriptionStatus}</p>
          </div>
          {!data.entrepreneur.isActive ? (
            <Link href="/empreendedor/validar" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
              Ativar plano
            </Link>
          ) : null}
        </div>
      </section>

      <EntrepreneurMetricsCards metrics={data.metrics} />
      <EntrepreneurStorefront data={data} />

      <section className="surface-motion rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-bold text-zinc-900">Ofertas destacadas</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {data.featuredOffers.map((entry) => (
            <Link key={entry.id} href={`/offers/${entry.offerId}`} className="rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700 hover:border-orange-300">
              <span className="line-clamp-2 font-semibold text-zinc-900">{entry.offer.title}</span>
              <span className="mt-1 block text-xs text-zinc-500">Abrir anúncio</span>
            </Link>
          ))}
          {data.featuredOffers.length === 0 ? <p className="text-sm text-zinc-600">Nenhuma oferta destacada.</p> : null}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {suggestions.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="surface-motion rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600">{item.text}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
