"use client";

import { InputHTMLAttributes, useMemo } from "react";
import { Input } from "@/src/components/ui/input";
import { maskCpfCnpj, normalizeDocumentDigits } from "@/src/shared/utils/formatters";

type InputDocumentProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

export function InputDocument({ value = "", onValueChange, ...props }: InputDocumentProps) {
  const maskedValue = useMemo(() => maskCpfCnpj(value), [value]);

  return (
    <Input
      {...props}
      value={maskedValue}
      inputMode="numeric"
      onChange={(event) => {
        onValueChange?.(normalizeDocumentDigits(event.target.value));
      }}
    />
  );
}
