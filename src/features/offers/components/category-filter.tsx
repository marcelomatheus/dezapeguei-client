"use client";

import { OfferCategoryModel } from "@/src/shared/schemas/offer.schema";

type CategoryFilterProps = {
  categories: OfferCategoryModel[];
  value?: string;
  onChange: (categoryId?: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <label className="inline-flex min-w-48 flex-col gap-1 text-sm text-zinc-700">
      Categoria
      <select
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
        value={value ?? ""}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue.length > 0 ? nextValue : undefined);
        }}
      >
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}
