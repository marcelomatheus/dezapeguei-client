import { BadgeCheck } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

type EntrepreneurBadgeProps = {
  active?: boolean;
  compact?: boolean;
};

export function EntrepreneurBadge({ active, compact }: EntrepreneurBadgeProps) {
  if (!active) return null;

  return (
    <Badge className="inline-flex items-center gap-1 border-emerald-200 bg-emerald-50 text-emerald-800">
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {compact ? "Verificado" : "Empreendedor verificado"}
    </Badge>
  );
}
