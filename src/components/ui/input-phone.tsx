"use client";

import { InputHTMLAttributes, useMemo } from "react";
import { Input } from "@/src/components/ui/input";
import { maskPhoneBR, normalizePhoneDigits } from "@/src/shared/utils/formatters";

type InputPhoneProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

export function InputPhone({ value = "", onValueChange, ...props }: InputPhoneProps) {
  const maskedValue = useMemo(() => maskPhoneBR(value), [value]);

  return (
    <Input
      {...props}
      value={maskedValue}
      inputMode="tel"
      onChange={(event) => {
        const nextValue = normalizePhoneDigits(event.target.value);
        onValueChange?.(nextValue);
      }}
    />
  );
}
