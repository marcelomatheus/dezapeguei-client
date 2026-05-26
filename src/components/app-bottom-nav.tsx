"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/offers", label: "Ofertas" },
  { href: "/chats", label: "Conversas" },
  { href: "/sales", label: "Vendas" },
  { href: "/wishlists", label: "Favoritos" },
  { href: "/notifications", label: "Alertas" },
  { href: "/profile/account", label: "Conta" },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white md:hidden"
      aria-label="Navegacao principal mobile"
    >
      <ul className="mx-auto flex w-full max-w-5xl justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={[
                  "rounded-md px-2 py-1 text-xs",
                  isActive ? "font-semibold text-zinc-900" : "text-zinc-600",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
