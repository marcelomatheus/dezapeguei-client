"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { createOffer } from "@/src/features/offers/api/create-offer";
import { uploadImages } from "@/src/features/offers/api/upload-images";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { useZodForm } from "@/src/shared/forms/form-schema";

const createOfferSchema = z.object({
  title: z.string().min(3, "Informe um título com pelo menos 3 caracteres."),
  description: z.string().min(10, "Informe uma descrição com pelo menos 10 caracteres."),
  price: z.coerce.number().min(0, "Informe um preço válido."),
  promotion: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : Number(value)),
    z.number().min(0, "Informe um desconto válido.").optional(),
  ),
  categoryId: z.string().min(1, "Selecione uma categoria."),
  condition: z.enum(["NEW", "USED_LIKE_NEW", "USED_GOOD", "USED_FAIR"]),
  imageFiles: z.array(z.instanceof(File)).min(1, "Adicione ao menos uma imagem."),
  keywordsInput: z.string().optional(),
  specificationsInput: z.string().optional(),
});

type CreateOfferValues = z.infer<typeof createOfferSchema>;

export function useCreateOfferForm() {
  const queryClient = useQueryClient();
  const sellerId = useAuthStore((state) => state.user?.id);
  const form = useZodForm(createOfferSchema, {
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      promotion: undefined,
      categoryId: "",
      condition: "USED_GOOD",
      imageFiles: [],
      keywordsInput: "",
      specificationsInput: "",
    },
  });

  const parseKeywords = (value?: string) => {
    if (!value) {
      return undefined;
    }

    const keywords = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return keywords.length > 0 ? keywords : undefined;
  };

  const parseSpecifications = (value?: string) => {
    if (!value) {
      return undefined;
    }

    const specifications = value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        if (separatorIndex < 1) {
          return null;
        }

        const key = line.slice(0, separatorIndex).trim();
        const specValue = line.slice(separatorIndex + 1).trim();

        if (!key || !specValue) {
          return null;
        }

        return {
          key,
          value: specValue,
        };
      })
      .filter((item): item is { key: string; value: string } => item !== null);

    return specifications.length > 0 ? specifications : undefined;
  };

  const mutation = useMutation({
    mutationFn: async (values: CreateOfferValues) => {
      if (!sellerId) {
        throw new Error("Usuário não autenticado.");
      }

      const imageUrl = await uploadImages(values.imageFiles);
      return createOffer({
        title: values.title,
        description: values.description,
        price: values.price,
        promotion: values.promotion,
        sellerId,
        categoryId: values.categoryId,
        condition: values.condition,
        imageUrl,
        keywords: parseKeywords(values.keywordsInput),
        specifications: parseSpecifications(values.specificationsInput),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["offers"] });
      await queryClient.invalidateQueries({ queryKey: ["offers-infinite"] });
      await queryClient.invalidateQueries({ queryKey: ["my-offers"] });
      toast.success("Oferta criada com sucesso.");
      form.reset();
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
}
