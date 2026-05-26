"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { getOfferById } from "@/src/features/offers/api/get-offer-by-id";
import { uploadImages } from "@/src/features/offers/api/upload-images";
import { updateOffer } from "@/src/features/offers/api/update-offer";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useZodForm } from "@/src/shared/forms/form-schema";

const updateOfferSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(0),
  promotion: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : Number(value)),
    z.number().min(0).optional(),
  ),
  categoryId: z.string().min(1),
  condition: z.enum(["NEW", "USED_LIKE_NEW", "USED_GOOD", "USED_FAIR"]),
  imageFiles: z.array(z.instanceof(File)).max(5),
  keywordsInput: z.string().optional(),
  specificationsInput: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SOLD", "PENDING", "CANCELED", "SOLD_OUT"]),
});

type UpdateOfferValues = z.infer<typeof updateOfferSchema>;

export function useUpdateOfferForm(offerId: string) {
  const queryClient = useQueryClient();
  const offerQuery = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferById(offerId),
    enabled: Boolean(offerId),
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

  const form = useZodForm(updateOfferSchema, {
    values: {
      title: offerQuery.data?.title ?? "",
      description: offerQuery.data?.description ?? "",
      price: offerQuery.data?.price ?? 0,
      promotion: offerQuery.data?.promotion ?? undefined,
      categoryId: offerQuery.data?.categoryId ?? "",
      condition: offerQuery.data?.condition ?? "USED_GOOD",
      imageFiles: [],
      keywordsInput: offerQuery.data?.keywords?.map((keyword) => keyword.word).join(", ") ?? "",
      specificationsInput:
        offerQuery.data?.specifications?.map((specification) => `${specification.key}: ${specification.value}`).join("\n") ?? "",
      status: offerQuery.data?.status ?? "ACTIVE",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: UpdateOfferValues) => {
      const imageUrl = values.imageFiles.length > 0 ? await uploadImages(values.imageFiles) : undefined;

      return updateOffer(offerId, {
        title: values.title,
        description: values.description,
        price: values.price,
        promotion: values.promotion,
        categoryId: values.categoryId,
        condition: values.condition,
        imageUrl,
        keywords: parseKeywords(values.keywordsInput),
        specifications: parseSpecifications(values.specificationsInput),
        status: values.status,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["offers"] });
      await queryClient.invalidateQueries({ queryKey: ["offers-infinite"] });
      await queryClient.invalidateQueries({ queryKey: ["my-offers"] });
      await queryClient.invalidateQueries({ queryKey: ["offer", offerId] });
      toast.success("Oferta atualizada com sucesso.");
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
    currentImageUrls: offerQuery.data?.imageUrl ?? [],
    isLoading: offerQuery.isLoading,
    isPending: mutation.isPending,
  };
}
