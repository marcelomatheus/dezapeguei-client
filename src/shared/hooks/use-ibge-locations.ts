"use client";

import { useQuery } from "@tanstack/react-query";

type IbgeState = {
  id: number;
  sigla: string;
  nome: string;
};

type IbgeCity = {
  id: number;
  nome: string;
};

const IBGE_BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

export function useIbgeStates() {
  return useQuery({
    queryKey: ["ibge-states"],
    queryFn: async () => {
      const response = await fetch(`${IBGE_BASE_URL}/estados?orderBy=nome`);
      if (!response.ok) throw new Error("Não foi possível carregar estados.");
      return (await response.json()) as IbgeState[];
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useIbgeCities(uf?: string) {
  return useQuery({
    queryKey: ["ibge-cities", uf],
    queryFn: async () => {
      const response = await fetch(`${IBGE_BASE_URL}/estados/${uf}/municipios?orderBy=nome`);
      if (!response.ok) throw new Error("Não foi possível carregar municípios.");
      return (await response.json()) as IbgeCity[];
    },
    enabled: Boolean(uf),
    staleTime: 24 * 60 * 60 * 1000,
  });
}
