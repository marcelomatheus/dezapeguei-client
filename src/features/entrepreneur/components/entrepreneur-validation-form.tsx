"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { InputDocument } from "@/src/components/ui/input-document";
import { InputPhone } from "@/src/components/ui/input-phone";
import { EntrepreneurValidationPayload, EntrepreneurValidationPayloadSchema } from "@/src/shared/schemas/entrepreneur.schema";
import { useIbgeCities, useIbgeStates } from "@/src/shared/hooks/use-ibge-locations";

type EntrepreneurValidationFormProps = {
  onSubmit: (payload: EntrepreneurValidationPayload) => Promise<unknown>;
  isPending: boolean;
};

export function EntrepreneurValidationForm({ onSubmit, isPending }: EntrepreneurValidationFormProps) {
  const form = useForm<EntrepreneurValidationPayload>({
    resolver: zodResolver(EntrepreneurValidationPayloadSchema),
    defaultValues: {
      businessName: "",
      document: "",
      businessType: "",
      description: "",
      phone: "",
      instagram: "",
      website: "",
      city: "",
      state: "",
      acceptedTerms: false,
    },
  });
  const selectedState = useWatch({ control: form.control, name: "state" });
  const statesQuery = useIbgeStates();
  const citiesQuery = useIbgeCities(selectedState);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Validar empreendedor</h1>
        <p className="mt-1 text-sm text-zinc-600">Informe os dados comerciais para liberar o checkout simulado.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Nome do negócio" {...form.register("businessName")} />
        <Input placeholder="Tipo de negócio" {...form.register("businessType")} />
        <Controller
          control={form.control}
          name="document"
          render={({ field }) => (
            <InputDocument placeholder="CPF ou CNPJ" value={field.value} onValueChange={field.onChange} />
          )}
        />
        <Controller
          control={form.control}
          name="phone"
          render={({ field }) => (
            <InputPhone placeholder="Telefone comercial" value={field.value ?? ""} onValueChange={field.onChange} />
          )}
        />
        <Input placeholder="Instagram" {...form.register("instagram")} />
        <Input placeholder="Site ou link externo" {...form.register("website")} />
        <select
          {...form.register("state", {
            onChange: () => form.setValue("city", ""),
          })}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="">Estado</option>
          {(statesQuery.data ?? []).map((state) => (
            <option key={state.id} value={state.sigla}>
              {state.nome}
            </option>
          ))}
        </select>
        <select
          {...form.register("city")}
          disabled={!selectedState || citiesQuery.isLoading}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 disabled:bg-zinc-100 disabled:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="">Cidade</option>
          {(citiesQuery.data ?? []).map((city) => (
            <option key={city.id} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Descrição do negócio"
        {...form.register("description")}
        className="min-h-28 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
      />

      <label className="flex items-start gap-2 text-sm text-zinc-700">
        <input type="checkbox" {...form.register("acceptedTerms")} className="mt-1" />
        Aceito os termos do Plano Empreendedor de R$ 99,00/mês.
      </label>

      {Object.values(form.formState.errors).length ? (
        <p className="text-sm text-red-600">Revise os campos obrigatórios antes de continuar.</p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Continuar para checkout"}
      </Button>
    </form>
  );
}
