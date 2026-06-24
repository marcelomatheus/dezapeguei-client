"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { CategoryFilter } from "@/src/features/offers/components/category-filter";
import { OfferGrid } from "@/src/features/offers/components/offer-grid";
import { SearchBar } from "@/src/features/offers/components/search-bar";
import { useCategoriesQuery } from "@/src/features/offers/hooks/use-categories-query";
import { useInfiniteOffers } from "@/src/features/offers/hooks/use-infinite-offers";
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
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
      <section className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-700">Marketplace Dezapeguei</p>
            <h1 className="mt-1 text-2xl font-black text-zinc-950 sm:text-3xl">Ofertas para comprar agora</h1>
            <p className="mt-1 text-sm text-zinc-700">Compare preços, salve favoritos e negocie direto com vendedores próximos.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/offers/create" className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
              Anunciar grátis
            </Link>
            <Link href="/comunidades" className="rounded-md border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-800 hover:bg-orange-100">
              Comunidades
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-zinc-900">Categorias em destaque</h2>
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
        <div className="flex gap-2 overflow-x-auto pb-1">
          {highlightedCategories.map((category) => {
            const active = category.id === categoryId;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
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

      <header className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] items-end">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por título" />
          <CategoryFilter
            categories={categoriesQuery.data ?? []}
            value={categoryId}
            onChange={setCategoryId}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-zinc-100 pt-3 md:grid-cols-2 lg:grid-cols-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800 lg:col-span-1">
            <SlidersHorizontal className="h-4 w-4 text-orange-600" />
            Filtros
          </div>
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
          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </header>

      {offersQuery.isLoading ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index} className="rounded-lg border border-zinc-200 p-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="mt-3 h-4 w-3/4" />
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
            {offersQuery.isFetchingNextPage ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                <span className="sr-only">Carregando</span>
              </>
            ) : (
              "Carregar mais"
            )}
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
