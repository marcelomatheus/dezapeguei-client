"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Home,
  MessageCircle,
  Store,
  User,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/offers", icon: Home, ariaLabel: "Comprar" },
  { href: "/chats", icon: MessageCircle, ariaLabel: "Conversas" },
  { href: "/comunidades", icon: Users, ariaLabel: "Comunidades" },
  { href: "/offers/my", icon: Store, ariaLabel: "Vender" },
  { href: "/wishlists", icon: Heart, ariaLabel: "Favoritos" },
  { href: "/profile/account", icon: User, ariaLabel: "Conta" },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white md:hidden"
      aria-label="Navegação principal mobile"
    >
      <ul className="mx-auto grid w-full max-w-5xl grid-cols-6 px-2 py-3 text-center">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-label={item.ariaLabel}
                title={item.ariaLabel}
                className={[
                  "flex items-center justify-center rounded-md px-2 py-1",
                  isActive ? "text-zinc-900" : "text-zinc-600",
                ].join(" ")}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
