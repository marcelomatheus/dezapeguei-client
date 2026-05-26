"use client";

import { InputHTMLAttributes, useMemo } from "react";
import { Input } from "@/src/components/ui/input";
import { formatMoneyInput, parseMoneyToNumber } from "@/src/shared/utils/formatters";

type InputMoneyProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value?: number;
  onValueChange?: (value: number) => void;
};

export function InputMoney({ value = 0, onValueChange, ...props }: InputMoneyProps) {
  const displayValue = useMemo(() => formatMoneyInput(value), [value]);

  return (
    <Input
      {...props}
      value={displayValue}
      inputMode="numeric"
      onChange={(event) => {
        const nextValue = parseMoneyToNumber(event.target.value);
        onValueChange?.(nextValue);
      }}
    />
  );
}
