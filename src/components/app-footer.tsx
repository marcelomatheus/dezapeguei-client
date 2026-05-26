import Link from "next/link";

const groups = [
  {
    title: "Dezapeguei",
    links: [
      { href: "/offers", label: "Explorar ofertas" },
      { href: "/offers/create", label: "Anunciar produto" },
      { href: "/profile/account", label: "Minha conta" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { href: "/notifications", label: "Notificações" },
      { href: "/chats", label: "Central de mensagens" },
      { href: "/wishlists", label: "Lista de favoritos" },
    ],
  },
  {
    title: "Segurança",
    links: [
      { href: "/profile", label: "Perfil verificado" },
      { href: "/sales", label: "Histórico de vendas" },
      { href: "/profile/account", label: "Privacidade da conta" },
    ],
  },
];

export function AppFooter() {
  return (
    <footer className="mt-12 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="text-lg font-black tracking-tight text-zinc-900">dezapeguei</p>
          <p className="mt-3 max-w-xs text-sm text-zinc-600">
            Marketplace local para comprar e vender com agilidade, confiança e conversa direta com o vendedor.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-zinc-900">{group.title}</p>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-600 hover:text-zinc-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-200 px-4 py-4 text-center text-xs text-zinc-500 sm:px-6">
        © 2026 Dezapeguei. Compra e venda com transparência.
      </div>
    </footer>
  );
}
