import { ChatMessageStatus, OfferCondition, OfferStatus, SaleStatus } from "@/src/shared/types/domain";

export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
  ACTIVE: "Ativa",
  INACTIVE: "Inativa",
  SOLD: "Vendida",
  PENDING: "Pendente",
  CANCELED: "Cancelada",
  SOLD_OUT: "Sem estoque",
};

export const OFFER_CONDITION_LABELS: Record<OfferCondition, string> = {
  NEW: "Novo",
  USED_LIKE_NEW: "Usado - como novo",
  USED_GOOD: "Usado - bom",
  USED_FAIR: "Usado - regular",
};

export const SALE_STATUS_LABELS: Record<SaleStatus, string> = {
  PENDING: "Pendente",
  COMPLETED: "Concluida",
  CANCELLED: "Cancelada",
};

export const CHAT_MESSAGE_STATUS_LABELS: Record<ChatMessageStatus, string> = {
  SENDING: "Enviando",
  SENT: "Enviada",
  DELIVERED: "Recebida",
  READ: "Lida",
  FAILED: "Falhou",
};

export function getOfferStatusLabel(status: OfferStatus): string {
  return OFFER_STATUS_LABELS[status];
}

export function getOfferConditionLabel(condition?: OfferCondition): string {
  if (!condition) {
    return "Nao informado";
  }

  return OFFER_CONDITION_LABELS[condition];
}

export function getSaleStatusLabel(status: SaleStatus): string {
  return SALE_STATUS_LABELS[status];
}

export function getChatMessageStatusLabel(status: ChatMessageStatus): string {
  return CHAT_MESSAGE_STATUS_LABELS[status];
}
