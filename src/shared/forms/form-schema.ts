import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type InferFormValues<TSchema extends z.ZodTypeAny> = z.infer<TSchema> & FieldValues;
type ResolverSchema = Parameters<typeof zodResolver>[0];

export function createResolver<TSchema extends z.ZodTypeAny>(
  schema: TSchema
): Resolver<InferFormValues<TSchema>> {
  const resolverSchema = schema as unknown as ResolverSchema;
  return zodResolver(resolverSchema) as unknown as Resolver<InferFormValues<TSchema>>;
}

export function useZodForm<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  options?: Omit<UseFormProps<InferFormValues<TSchema>>, "resolver">
): UseFormReturn<InferFormValues<TSchema>> {
  return useForm<InferFormValues<TSchema>>({
    ...options,
    resolver: createResolver(schema),
  });
}
