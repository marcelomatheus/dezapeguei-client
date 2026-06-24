"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

export const Dropdown = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownContent({
  children,
  className,
  align = "start",
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={8}
        align={align}
        className={[
          "z-50 min-w-[12rem] rounded-md border border-gray-200 bg-white p-1 shadow-lg",
          className,
        ].filter(Boolean).join(" ")}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownItem({
  children,
  onSelect,
}: {
  children: ReactNode;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenuPrimitive.Item
      onSelect={onSelect}
      className="cursor-pointer rounded px-2 py-1.5 text-sm text-gray-700 outline-none hover:bg-orange-50 focus:bg-orange-50"
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export const DropdownSeparator = DropdownMenuPrimitive.Separator;
