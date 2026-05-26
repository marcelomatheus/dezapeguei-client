"use client";

import { BaseSyntheticEvent } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { InputPhone } from "@/src/components/ui/input-phone";
import { UpdateProfilePayload } from "@/src/shared/schemas/profile.schema";

type ProfileFormProps = {
  form: UseFormReturn<UpdateProfilePayload>;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
};

export function ProfileForm({ form, onSubmit, isPending }: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-zinc-200 p-6">
      <h1 className="text-2xl font-bold text-zinc-900">Editar perfil</h1>

      <Input placeholder="Nome" {...form.register("name")} />
      <Controller
        control={form.control}
        name="phone"
        render={({ field }) => (
          <InputPhone
            placeholder="Telefone"
            value={field.value ?? ""}
            onValueChange={field.onChange}
          />
        )}
      />
      <Input placeholder="Cidade" {...form.register("city")} />
      <Input placeholder="Estado" {...form.register("state")} />
      <Input placeholder="Avatar URL" {...form.register("avatar")} />
      <Input placeholder="Instagram" {...form.register("instagram")} />
      <textarea
        placeholder="Biografia"
        {...form.register("bio")}
        className="min-h-24 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar perfil"}
      </Button>
    </form>
  );
}
