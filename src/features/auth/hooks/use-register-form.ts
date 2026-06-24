"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { register } from "@/src/features/auth/api/auth-api";
import { normalizeApiError } from "@/src/shared/api/error-normalizer";
import { useZodForm } from "@/src/shared/forms/form-schema";
import { RegisterPayloadSchema } from "@/src/shared/schemas/auth.schema";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export function useRegisterForm() {
  const form = useZodForm(RegisterPayloadSchema, {
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      toast.success(response.message);
      form.reset({
        name: "",
        email: "",
        password: "",
      });
    },
    onError: (error) => {
      toast.error(normalizeApiError(error));
    },
  });

  const onSubmit = form.handleSubmit(async (values: RegisterValues) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    confirmationEmail: mutation.data?.user.email,
    confirmationMessage: mutation.data?.message,
  };
}
