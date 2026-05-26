"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-xl focus:outline-none">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <DialogPrimitive.Title className="text-lg font-semibold text-gray-900">{children}</DialogPrimitive.Title>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <DialogPrimitive.Description className="mt-1 text-sm text-gray-600">{children}</DialogPrimitive.Description>;
}
