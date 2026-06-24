"use client";

import Image from "next/image";
import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { InputMoney } from "@/src/components/ui/input-money";
import { ImageUpload } from "@/src/features/offers/components/image-upload";
import { getOfferConditionLabel, getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { OfferCategoryModel } from "@/src/shared/schemas/offer.schema";

type CreateValues = {
  title: string;
  description: string;
  price: number;
  promotion?: number;
  categoryId: string;
  condition: "NEW" | "USED_LIKE_NEW" | "USED_GOOD" | "USED_FAIR";
  imageFiles: File[];
  keywordsInput?: string;
  specificationsInput?: string;
};

type EditValues = {
  title: string;
  description: string;
  price: number;
  promotion?: number;
  categoryId: string;
  condition: "NEW" | "USED_LIKE_NEW" | "USED_GOOD" | "USED_FAIR";
  imageFiles: File[];
  keywordsInput?: string;
  specificationsInput?: string;
  status: "ACTIVE" | "INACTIVE" | "SOLD" | "PENDING" | "CANCELED" | "SOLD_OUT";
};

type CreateOfferFormProps = {
  mode: "create";
  categories: OfferCategoryModel[];
  form: UseFormReturn<CreateValues>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
};

type EditOfferFormProps = {
  mode: "edit";
  categories: OfferCategoryModel[];
  form: UseFormReturn<EditValues>;
  currentImageUrls: string[];
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
};

type OfferFormProps = CreateOfferFormProps | EditOfferFormProps;

export function OfferForm(props: OfferFormProps) {
  const fieldClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100";
  const labelClass = "flex flex-col gap-1 text-sm font-medium text-zinc-800";

  if (props.mode === "create") {
    const createForm = props.form;

    return (
      <form onSubmit={props.onSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Criar anúncio</h1>
          <p className="mt-1 text-sm text-zinc-600">Capriche nas fotos, preço e descrição para aumentar a confiança do comprador.</p>
        </div>

        <label className={labelClass}>
          Título
          <input {...createForm.register("title")} placeholder="Ex.: iPhone 13 128GB" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Descrição
          <textarea {...createForm.register("description")} placeholder="Estado do produto, acessórios, motivo da venda..." className={`${fieldClass} min-h-28`} />
        </label>
        <label className={labelClass}>
          Preço
        <Controller
          control={createForm.control}
          name="price"
          render={({ field }) => (
            <InputMoney
              placeholder="Preço"
              value={field.value}
              onValueChange={field.onChange}
              className={fieldClass}
            />
          )}
        />
        </label>

        <label className={labelClass}>
          Preço promocional opcional
          <input
            type="number"
            min={0}
            step="0.01"
            {...createForm.register("promotion")}
            placeholder="Valor final com desconto"
            className={fieldClass}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Categoria
            <select {...createForm.register("categoryId")} className={fieldClass}>
              <option value="">Selecione uma categoria</option>
              {props.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Condição
            <select {...createForm.register("condition")} className={fieldClass}>
              <option value="NEW">{getOfferConditionLabel("NEW")}</option>
              <option value="USED_LIKE_NEW">{getOfferConditionLabel("USED_LIKE_NEW")}</option>
              <option value="USED_GOOD">{getOfferConditionLabel("USED_GOOD")}</option>
              <option value="USED_FAIR">{getOfferConditionLabel("USED_FAIR")}</option>
            </select>
          </label>
        </div>

        <ImageUpload
          value={createForm.watch("imageFiles") ?? []}
          onChange={(files) => {
            createForm.setValue("imageFiles", files, { shouldValidate: true });
          }}
        />

        <label className={labelClass}>
          Palavras-chave
          <textarea
            {...createForm.register("keywordsInput")}
            placeholder="Separadas por vírgula: celular, apple, 128gb"
            className={`${fieldClass} min-h-20`}
          />
        </label>

        <label className={labelClass}>
          Especificações
          <textarea
            {...createForm.register("specificationsInput")}
            placeholder="Uma por linha, formato: Chave: Valor"
            className={`${fieldClass} min-h-28`}
          />
        </label>

        <Button type="submit" isLoading={props.isPending}>
          Salvar oferta
        </Button>
      </form>
    );
  }

  const editForm = props.form;

  return (
    <form onSubmit={props.onSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-zinc-900">Editar oferta</h1>

      <input {...editForm.register("title")} placeholder="Título" className={fieldClass} />
      <textarea {...editForm.register("description")} placeholder="Descrição" className={`${fieldClass} min-h-28`} />
      <Controller
        control={editForm.control}
        name="price"
        render={({ field }) => (
          <InputMoney
            placeholder="Preço"
            value={field.value}
            onValueChange={field.onChange}
            className={fieldClass}
          />
        )}
      />

      <input
        type="number"
        min={0}
        step="0.01"
        {...editForm.register("promotion")}
        placeholder="Desconto em % (opcional)"
        className={fieldClass}
      />

      <select {...editForm.register("categoryId")} className={fieldClass}>
        <option value="">Selecione uma categoria</option>
        {props.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select {...editForm.register("condition")} className={fieldClass}>
        <option value="NEW">{getOfferConditionLabel("NEW")}</option>
        <option value="USED_LIKE_NEW">{getOfferConditionLabel("USED_LIKE_NEW")}</option>
        <option value="USED_GOOD">{getOfferConditionLabel("USED_GOOD")}</option>
        <option value="USED_FAIR">{getOfferConditionLabel("USED_FAIR")}</option>
      </select>

      <select {...editForm.register("status")} className={fieldClass}>
        <option value="ACTIVE">{getOfferStatusLabel("ACTIVE")}</option>
        <option value="INACTIVE">{getOfferStatusLabel("INACTIVE")}</option>
        <option value="PENDING">{getOfferStatusLabel("PENDING")}</option>
        <option value="SOLD">{getOfferStatusLabel("SOLD")}</option>
        <option value="SOLD_OUT">{getOfferStatusLabel("SOLD_OUT")}</option>
        <option value="CANCELED">{getOfferStatusLabel("CANCELED")}</option>
      </select>

      <ImageUpload
        value={editForm.watch("imageFiles") ?? []}
        onChange={(files) => {
          editForm.setValue("imageFiles", files, { shouldValidate: true });
        }}
      />

      <p className="text-xs text-zinc-600">Ao selecionar novas imagens, a galeria atual será substituída.</p>

      {props.currentImageUrls.length > 0 ? (
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-5">
          {props.currentImageUrls.map((imageUrl) => (
            <li key={imageUrl} className="relative h-20 overflow-hidden rounded-md border border-zinc-200">
              <Image src={imageUrl} alt="Imagem atual da oferta" fill unoptimized className="object-cover" />
            </li>
          ))}
        </ul>
      ) : null}

      <textarea
        {...editForm.register("keywordsInput")}
        placeholder="Palavras-chave separadas por vírgula"
        className={`${fieldClass} min-h-20`}
      />

      <textarea
        {...editForm.register("specificationsInput")}
        placeholder="Especificações (uma por linha, formato: Chave: Valor)"
        className={`${fieldClass} min-h-28`}
      />

      <Button type="submit" isLoading={props.isPending}>
        Salvar alterações
      </Button>
    </form>
  );
}
