"use client";

import {
  BadgeCheck,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  User,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { formatMoneyBRL } from "@/src/shared/utils/formatters";

type EntrepreneurCheckoutCardProps = {
  amount: number;
  isPending: boolean;
  onSuccess: () => void;
  onFailure: () => void;
};

const cardBrands = [
  { name: "Visa", className: "bg-blue-700 text-white" },
  { name: "Mastercard", className: "bg-red-600 text-white" },
  { name: "Elo", className: "bg-zinc-900 text-white" },
  { name: "Amex", className: "bg-sky-600 text-white" },
];

export function EntrepreneurCheckoutCard({
  amount,
  isPending,
  onSuccess,
  onFailure,
}: EntrepreneurCheckoutCardProps) {
  return (
    <section className="page-motion mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/80 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative overflow-hidden bg-orange-500 p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-orange-200">
            <Sparkles className="h-3.5 w-3.5" />
            DeZapeguei
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight">
            Plano Empreendedor
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6">
            Checkout simulado inspirado em fluxos de pagamento reais para ativar
            recursos de venda, vitrine e comunidade.
          </p>
        </div>

        <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm">Total mensal</p>

          <div className="mt-1 flex items-end gap-2">
            <p className="text-4xl font-black">
              {formatMoneyBRL(amount / 100)}
            </p>
            <span className="mb-1 text-sm font-medium">/mês</span>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-orange-800 px-3 py-2 text-xs font-medium text-orange-200">
            <ShieldCheck className="h-4 w-4" />
            Ambiente seguro e sem cobrança real
          </div>
        </div>

        <ul className="relative mt-8 space-y-3 text-sm text-zinc-200">
          {[
            "Selo empreendedor verificado em ofertas e mensagens.",
            "Acesso para publicar em comunidades.",
            "Vitrine, ofertas destacadas e métricas básicas.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
              <CreditCard className="h-4 w-4" />
              Pagamento com cartão
            </div>

            <p className="mt-1 text-xs text-zinc-500">
              Use os dados fictícios abaixo para simular o checkout.
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-2">
          {cardBrands.map((brand) => (
            <span
              key={brand.name}
              className={[
                "rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-sm",
                brand.className,
              ].join(" ")}
            >
              {brand.name}
            </span>
          ))}
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-900 to-zinc-700 p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
              Demo Card
            </span>

            <div className="flex gap-1">
              <span className="h-5 w-5 rounded-full bg-red-500/90" />
              <span className="-ml-2 h-5 w-5 rounded-full bg-orange-400/90" />
            </div>
          </div>

          <p className="mt-8 font-mono text-xl tracking-[0.18em]">
            4242 4242 4242 4242
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-zinc-400">Titular</p>
              <p className="mt-1 font-semibold uppercase">Cliente Demo</p>
            </div>

            <div>
              <p className="text-zinc-400">Validade</p>
              <p className="mt-1 font-semibold">12/30</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-700">
            Número do cartão
            <div className="mt-1 flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-3 font-mono text-sm text-zinc-700 shadow-sm">
              <CreditCard className="h-4 w-4 text-zinc-400" />
              4242 4242 4242 4242
            </div>
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Nome impresso no cartão
            <div className="mt-1 flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-3 text-sm font-semibold uppercase text-zinc-700 shadow-sm">
              <User className="h-4 w-4 text-zinc-400" />
              Cliente Demo
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-zinc-700">
              Validade
              <div className="mt-1 flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-3 font-mono text-sm text-zinc-700 shadow-sm">
                <CalendarDays className="h-4 w-4 text-zinc-400" />
                12/30
              </div>
            </label>

            <label className="block text-sm font-medium text-zinc-700">
              CVC
              <div className="mt-1 flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-3 font-mono text-sm text-zinc-700 shadow-sm">
                <LockKeyhole className="h-4 w-4 text-zinc-400" />
                123
              </div>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-zinc-600">Plano Empreendedor</span>
            <span className="font-bold text-zinc-900">
              {formatMoneyBRL(amount / 100)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-zinc-200 pt-3 text-sm">
            <span className="font-semibold text-zinc-900">Total de hoje</span>
            <span className="flex items-center gap-1 font-black text-zinc-900">
              <CircleDollarSign className="h-4 w-4 text-orange-600" />
              {formatMoneyBRL(amount / 100)}
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={onSuccess}
          disabled={isPending}
          className="h-11 w-full rounded-xl font-bold shadow-lg shadow-zinc-300/50"
        >
          {isPending ? "Processando..." : "Assinar Plano Empreendedor"}
        </Button>

        <button
          type="button"
          onClick={onFailure}
          disabled={isPending}
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60"
        >
          Simular falha
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-orange-800">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Nenhuma cobrança real será feita neste ambiente.
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <LockKeyhole className="h-3.5 w-3.5" />
          Sessão protegida pela autenticação do DeZapeguei.
        </p>
      </div>
    </section>
  );
}
