"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, LogOut, Search, UserRound } from "lucide-react";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { useAuthSession } from "@/src/shared/auth/use-auth-session";
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownTrigger } from "@/src/components/ui/dropdown";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";

const menuItems = [
  { href: "/offers", label: "Ofertas" },
  { href: "/offers/my", label: "Meus anúncios" },
  { href: "/sales", label: "Vendas" },
  { href: "/chats", label: "Chat" },
  { href: "/wishlists", label: "Favoritos" },
  { href: "/notifications", label: "Notificações" },
];

const categoryHighlights = [
  "Calçados",
  "Moda",
  "Games",
  "Eletrônicos",
  "Casa",
  "Móveis",
  "Autopeças",
  "Celulares",
  "Decoração",
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthSession();
  const categoriesQuery = useCategoriesQuery();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") ?? "");

  const categoryOptions = useMemo(() => categoriesQuery.data ?? [], [categoriesQuery.data]);

  const showHeader = pathname !== "/login" && pathname !== "/register";

  if (!showHeader) {
    return null;
  }

  const submitHeaderFilters = (event: FormEvent) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim().length > 0) {
      params.set("search", search.trim());
    }

    if (categoryId.trim().length > 0) {
      params.set("categoryId", categoryId);
    }

    router.push(`/offers${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/offers" className="text-xl font-black tracking-tight text-orange-600">
          dezapeguei
        </Link>

        <form onSubmit={submitHeaderFilters} className="hidden flex-1 items-center gap-2 md:flex">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              aria-label="Buscar ofertas"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Buscar "apartamento", "nike", "iphone"'
              className="h-10 w-full rounded-full border border-zinc-300 bg-zinc-50 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>

          <select
            aria-label="Filtrar por categoria"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="h-10 rounded-full border border-zinc-300 bg-white px-3 text-sm text-zinc-700"
          >
            <option value="">Todas categorias</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="h-10 rounded-full bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Buscar
          </button>
        </form>

        <nav aria-label="Menu principal" className="hidden items-center gap-2 lg:flex">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3 py-2 text-sm",
                  isActive ? "bg-orange-100 font-semibold text-orange-800" : "text-zinc-700 hover:bg-zinc-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <Dropdown>
                <DropdownTrigger asChild>
                  <button
                    type="button"
                    className="hidden items-center gap-2 rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 sm:inline-flex"
                  >
                    <UserRound className="h-4 w-4 text-zinc-500" />
                    <span className="max-w-44 truncate">{user.name ?? user.email}</span>
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  </button>
                </DropdownTrigger>

                <DropdownContent>
                  <DropdownItem
                    onSelect={() => {
                      router.push("/profile/account");
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-zinc-500" />
                      Minha Conta
                    </span>
                  </DropdownItem>
                  <DropdownSeparator className="my-1 h-px bg-zinc-200" />
                  <DropdownItem
                    onSelect={() => {
                      void logout();
                    }}
                  >
                    <span className="flex items-center gap-2 text-red-600">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </span>
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400"
            >
              Entrar
            </Link>
          )}

          <Link
            href="/offers/create"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Anunciar grátis
          </Link>
        </div>
      </div>

      <div className="hidden border-t border-zinc-100 bg-zinc-50 md:block">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6">
          {categoryHighlights.map((category) => (
            <Link
              key={category}
              href={`/offers?search=${encodeURIComponent(category)}`}
              className="whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 hover:border-orange-300 hover:text-orange-700"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
