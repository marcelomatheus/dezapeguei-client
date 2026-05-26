"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ReactNode } from "react";

export function Avatar({ children }: { children: ReactNode }) {
  return <AvatarPrimitive.Root className="inline-flex h-10 w-10 overflow-hidden rounded-full">{children}</AvatarPrimitive.Root>;
}

export const AvatarImage = AvatarPrimitive.Image;

export function AvatarFallback({ children }: { children: ReactNode }) {
  return (
    <AvatarPrimitive.Fallback className="inline-flex h-full w-full items-center justify-center bg-orange-100 text-sm font-medium text-orange-900">
      {children}
    </AvatarPrimitive.Fallback>
  );
}
