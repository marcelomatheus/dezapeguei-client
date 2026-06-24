"use client";

import Link from "next/link";
import { BackButton } from "@/src/components/back-button";

const quickActions = [
  { href: "/profile/edit", label: "Editar perfil", description: "Atualize nome, bio, telefone e localização." },
  { href: "/offers/my", label: "Gerenciar minhas ofertas", description: "Edite status, valores e dados dos seus anúncios." },
  { href: "/wishlists", label: "Meus favoritos", description: "Acompanhe produtos que você salvou para comprar depois." },
  { href: "/chats", label: "Minhas conversas", description: "Negocie com vendedores e compradores em tempo real." },
  { href: "/comunidades", label: "Comunidades", description: "Entre em salas públicas para acompanhar conversas e ofertas de empreendedores." },
  { href: "/empreendedor/dashboard", label: "Central empreendedor", description: "Valide seu negócio, acompanhe assinatura, vitrine e recursos comerciais." },
  { href: "/notifications", label: "Notificações", description: "Visualize alertas de preço, mensagens e atualizações." },
  { href: "/sales", label: "Vendas e compras", description: "Consulte transações e andamento das vendas." },
];

export default function AccountManagementPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4">
        <BackButton fallbackHref="/profile" />
      </div>

      <header className="mb-6 rounded-2xl border border-zinc-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">Minha conta</p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">Gerenciamento da conta</h1>
        <p className="mt-2 text-sm text-zinc-700">
          Centralize aqui suas configurações pessoais, anúncios, conversas e acompanhamento de vendas.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href} className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-orange-300 hover:shadow-sm">
            <p className="font-semibold text-zinc-900">{action.label}</p>
            <p className="mt-1 text-sm text-zinc-600">{action.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
