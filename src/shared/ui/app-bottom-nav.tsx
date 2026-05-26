"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/offers", label: "Ofertas" },
  { href: "/chats", label: "Conversas" },
  { href: "/wishlists", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-200 bg-white">
      <ul className="mx-auto flex w-full max-w-5xl justify-around px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link href={item.href} className={isActive ? "font-semibold text-zinc-900" : "text-zinc-600"}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
