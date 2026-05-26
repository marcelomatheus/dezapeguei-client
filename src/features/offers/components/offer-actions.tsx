"use client";

import { MoreVertical } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/src/components/ui/dropdown";
import { getOfferStatusLabel } from "@/src/shared/i18n/enum-labels";
import { OfferStatus } from "@/src/shared/types/domain";

type OfferActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: OfferStatus) => void;
  isLoading?: boolean;
};

export function OfferActions({ onEdit, onDelete, onStatusChange, isLoading = false }: OfferActionsProps) {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 p-0" disabled={isLoading}>
          <MoreVertical className="size-4" />
        </Button>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem onSelect={onEdit}>Editar oferta</DropdownItem>
        <DropdownItem onSelect={() => onStatusChange("ACTIVE")}>Marcar como {getOfferStatusLabel("ACTIVE").toLowerCase()}</DropdownItem>
        <DropdownItem onSelect={() => onStatusChange("INACTIVE")}>Marcar como {getOfferStatusLabel("INACTIVE").toLowerCase()}</DropdownItem>
        <DropdownItem onSelect={() => onStatusChange("PENDING")}>Marcar como {getOfferStatusLabel("PENDING").toLowerCase()}</DropdownItem>
        <DropdownItem onSelect={() => onStatusChange("SOLD")}>Marcar como {getOfferStatusLabel("SOLD").toLowerCase()}</DropdownItem>
        <DropdownItem onSelect={() => onStatusChange("SOLD_OUT")}>Marcar como {getOfferStatusLabel("SOLD_OUT").toLowerCase()}</DropdownItem>
        <DropdownItem onSelect={() => onStatusChange("CANCELED")}>Marcar como {getOfferStatusLabel("CANCELED").toLowerCase()}</DropdownItem>
        <DropdownItem onSelect={onDelete}>Excluir oferta</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
