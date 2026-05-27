"use client";

import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/src/components/ui/skeleton";
import { BackButton } from "@/src/components/back-button";
import { CategoryFilter } from "@/src/features/offers/components/category-filter";
import { OfferGrid } from "@/src/features/offers/components/offer-grid";
import { SearchBar } from "@/src/features/offers/components/search-bar";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useInfiniteOffers } from "@/src/features/offers/hooks/use-infinite-offers";
import { WishlistGrid } from "@/src/features/wishlists/components/wishlist-grid";
import { useWishlistQuery } from "@/src/features/wishlists/hooks/use-wishlist-query";
import { getOfferConditionLabel, getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { OfferCondition, OfferStatus } from "@/src/shared/types/domain";
import { useAuthStore } from "@/src/shared/auth/auth-store";

function OffersPageContent() {
  const searchParams = useSearchParams();
  const userId = useAuthStore((state) => state.user?.id);
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [status, setStatus] = useState<OfferStatus | "ALL">(() => {
    const value = searchParams.get("status");
    if (
      value === "ACTIVE" ||
      value === "INACTIVE" ||
      value === "PENDING" ||
      value === "SOLD" ||
      value === "SOLD_OUT" ||
      value === "CANCELED" ||
      value === "ALL"
    ) {
      return value;
    }

    return "ACTIVE";
  });
  const [condition, setCondition] = useState<OfferCondition | "ALL">(() => {
    const value = searchParams.get("condition");
    if (
      value === "NEW" ||
      value === "USED_LIKE_NEW" ||
      value === "USED_GOOD" ||
      value === "USED_FAIR" ||
      value === "ALL"
    ) {
      return value;
    }

    return "ALL";
  });
  const [sortBy, setSortBy] = useState<"recent" | "price-asc" | "price-desc">("recent");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [onlyMyOffers, setOnlyMyOffers] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(() => searchParams.get("categoryId") ?? undefined);

  const offersQuery = useInfiniteOffers({
    search: search.length >= 2 ? search : undefined,
    sellerId: onlyMyOffers && userId ? userId : undefined,
    categoryId,
    status: status === "ALL" ? undefined : status,
  });
  const categoriesQuery = useCategoriesQuery();
  const wishlistQuery = useWishlistQuery();
  const highlightedCategories = (categoriesQuery.data ?? []).slice(0, 8);

  const offers = useMemo(() => {
    const min = Number(priceMin);
    const max = Number(priceMax);

    const filtered = (offersQuery.offers ?? []).filter((offer) => {
      if (condition !== "ALL" && offer.condition !== condition) {
        return false;
      }

      if (priceMin.length > 0 && !Number.isNaN(min) && offer.price < min) {
        return false;
      }

      if (priceMax.length > 0 && !Number.isNaN(max) && offer.price > max) {
        return false;
      }

      return true;
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return [...filtered].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [condition, offersQuery.offers, priceMax, priceMin, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setStatus("ACTIVE");
    setCondition("ALL");
    setSortBy("recent");
    setPriceMin("");
    setPriceMax("");
    setOnlyMyOffers(false);
    setCategoryId(undefined);
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between gap-3">
        <BackButton fallbackHref="/" />
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700"
        >
          Limpar filtros
        </button>
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-orange-200 bg-linear-to-r from-amber-100 via-orange-100 to-rose-100">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-orange-200/50 blur-2xl" />
        <div className="grid items-center gap-4 p-5 sm:p-7 lg:grid-cols-[1.1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-900">Marketplace dezapeguei</p>
            <h2 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl">Venda rapido. Compre melhor.</h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-700 sm:text-base">
              Descubra ofertas locais com filtros inteligentes, salve favoritos e negocie direto com o vendedor.
            </p>
          </div>
          <Image
            src="/offers-hero.svg"
            alt="Destaque de ofertas"
            width={280}
            height={180}
            priority
            className="mx-auto w-full max-w-64 drop-shadow-sm sm:max-w-72"
          />
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-zinc-900">Categorias em destaque</h2>
          {categoryId ? (
            <button
              type="button"
              onClick={() => setCategoryId(undefined)}
              className="text-sm font-medium text-orange-700 hover:text-orange-800"
            >
              Limpar categoria
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {highlightedCategories.map((category) => {
            const active = category.id === categoryId;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                {category.name}
              </button>
            );
          })}
          {highlightedCategories.length === 0 && categoriesQuery.isLoading ? (
            <Skeleton className="h-9 w-44 rounded-full" />
          ) : null}
        </div>
      </section>

      {userId ? (
        <section className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-zinc-900">Seus favoritos</h2>
          <WishlistGrid items={wishlistQuery.data ?? []} isLoading={wishlistQuery.isLoading} />
        </section>
      ) : null}

      <header className="flex flex-col gap-3">
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">Ofertas</h1>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por título" />
          <CategoryFilter
            categories={categoriesQuery.data ?? []}
            value={categoryId}
            onChange={setCategoryId}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as OfferStatus | "ALL")}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            >
              <option value="ALL">Todos</option>
              <option value="ACTIVE">{getOfferStatusLabel("ACTIVE")}</option>
              <option value="INACTIVE">{getOfferStatusLabel("INACTIVE")}</option>
              <option value="PENDING">{getOfferStatusLabel("PENDING")}</option>
              <option value="SOLD">{getOfferStatusLabel("SOLD")}</option>
              <option value="SOLD_OUT">{getOfferStatusLabel("SOLD_OUT")}</option>
              <option value="CANCELED">{getOfferStatusLabel("CANCELED")}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Condição
            <select
              value={condition}
              onChange={(event) => setCondition(event.target.value as OfferCondition | "ALL")}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            >
              <option value="ALL">Todas</option>
              <option value="NEW">{getOfferConditionLabel("NEW")}</option>
              <option value="USED_LIKE_NEW">{getOfferConditionLabel("USED_LIKE_NEW")}</option>
              <option value="USED_GOOD">{getOfferConditionLabel("USED_GOOD")}</option>
              <option value="USED_FAIR">{getOfferConditionLabel("USED_FAIR")}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Ordenação
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as "recent" | "price-asc" | "price-desc")}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            >
              <option value="recent">Mais recentes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={onlyMyOffers}
              onChange={(event) => setOnlyMyOffers(event.target.checked)}
              disabled={!userId}
            />
            Somente minhas ofertas
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Preço mínimo
            <input
              value={priceMin}
              onChange={(event) => setPriceMin(event.target.value)}
              type="number"
              min={0}
              placeholder="0"
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Preço máximo
            <input
              value={priceMax}
              onChange={(event) => setPriceMax(event.target.value)}
              type="number"
              min={0}
              placeholder="1000"
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>
        </div>
      </header>

      {offersQuery.isLoading ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="rounded-xl border border-zinc-200 p-4">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="mt-3 h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </li>
          ))}
        </ul>
      ) : null}
      {offersQuery.isError ? <p>Não foi possível carregar as ofertas.</p> : null}
      {offersQuery.data ? <OfferGrid offers={offers} /> : null}
      {offersQuery.hasNextPage ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              void offersQuery.fetchNextPage();
            }}
            disabled={offersQuery.isFetchingNextPage}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm sm:w-auto"
          >
            {offersQuery.isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      ) : null}
    </main>
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={null}>
      <OffersPageContent />
    </Suspense>
  );
}
