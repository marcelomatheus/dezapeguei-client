import { ChatMessageStatus, OfferCondition, OfferStatus, SaleStatus } from "@/src/shared/types/domain";

export const USER_PLAN_LABELS = {
  FREE: "Gratuito",
  PREMIUM: "Premium",
  ENTERPRISE: "Empresarial",
} as const;

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
  COMPLETED: "Concluída",
  CANCELLED: "Cancelada",
};

export const ENTREPRENEUR_PROFILE_STATUS_LABELS = {
  PENDING: "Em análise",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
  SUSPENDED: "Suspenso",
  SEM_VALIDACAO: "Sem validação",
} as const;

export const ENTREPRENEUR_SUBSCRIPTION_STATUS_LABELS = {
  ACTIVE: "Ativa",
  PENDING_PAYMENT: "Pagamento pendente",
  PAST_DUE: "Pagamento atrasado",
  CANCELLED: "Cancelada",
  EXPIRED: "Expirada",
  SEM_ASSINATURA: "Sem assinatura",
} as const;

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
    return "Não informado";
  }

  return OFFER_CONDITION_LABELS[condition];
}

export function getSaleStatusLabel(status: SaleStatus): string {
  return SALE_STATUS_LABELS[status];
}

export function getChatMessageStatusLabel(status: ChatMessageStatus): string {
  return CHAT_MESSAGE_STATUS_LABELS[status];
}

export function getUserPlanLabel(plan?: keyof typeof USER_PLAN_LABELS): string {
  return plan ? USER_PLAN_LABELS[plan] : "Não informado";
}

export function getEntrepreneurProfileStatusLabel(
  status?: keyof typeof ENTREPRENEUR_PROFILE_STATUS_LABELS,
): string {
  return status ? ENTREPRENEUR_PROFILE_STATUS_LABELS[status] : "Sem validação";
}

export function getEntrepreneurSubscriptionStatusLabel(
  status?: keyof typeof ENTREPRENEUR_SUBSCRIPTION_STATUS_LABELS,
): string {
  return status ? ENTREPRENEUR_SUBSCRIPTION_STATUS_LABELS[status] : "Sem assinatura";
}
