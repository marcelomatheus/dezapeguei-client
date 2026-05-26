import { AxiosError } from "axios";

const defaultMessage = "Não foi possível concluir a ação. Tente novamente.";

const statusMessageMap: Record<number, string> = {
  400: "Dados inválidos. Revise as informações e tente novamente.",
  401: "Sua sessão expirou. Faça login novamente.",
  403: "Você não tem permissão para executar esta ação.",
  404: "Conteúdo não encontrado.",
  409: "Conflito de dados. Atualize e tente novamente.",
  422: "Não foi possível validar os dados enviados.",
  500: "Ocorreu um erro interno. Tente novamente mais tarde.",
};

const mutationContextMap: Record<string, string> = {
  "POST /auth/login": "Falha ao entrar na conta.",
  "POST /auth/register": "Falha ao criar conta.",
  "POST /offers": "Falha ao publicar a oferta.",
  "PATCH /offers": "Falha ao atualizar a oferta.",
  "DELETE /offers": "Falha ao remover a oferta.",
  "POST /chats": "Falha ao iniciar conversa.",
  "POST /messages": "Falha ao enviar mensagem.",
  "PATCH /messages": "Falha ao atualizar mensagem.",
  "POST /sales": "Falha ao confirmar venda.",
  "PATCH /sales": "Falha ao atualizar venda.",
  "POST /wishlists": "Falha ao adicionar aos favoritos.",
  "DELETE /wishlists": "Falha ao remover dos favoritos.",
  "PATCH /notifications": "Falha ao atualizar notificações.",
  "PATCH /users": "Falha ao atualizar perfil.",
};

function getMutationContext(error: AxiosError): string | undefined {
  const method = error.config?.method?.toUpperCase();
  const url = error.config?.url;

  if (!method || !url || method === "GET") {
    return undefined;
  }

  const normalizedUrl = url.replace(/\/[a-zA-Z0-9_-]{8,}(?=\/|$)/g, "");
  const scopedPath = normalizedUrl.startsWith("/") ? normalizedUrl : `/${normalizedUrl}`;

  const directKey = `${method} ${scopedPath}`;
  if (mutationContextMap[directKey]) {
    return mutationContextMap[directKey];
  }

  const fallbackKey = Object.keys(mutationContextMap).find((key) => {
    const [configuredMethod, configuredPath] = key.split(" ");
    return configuredMethod === method && scopedPath.startsWith(configuredPath);
  });

  return fallbackKey ? mutationContextMap[fallbackKey] : undefined;
}

export function normalizeApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const contextMessage = getMutationContext(error);
    const status = error.response?.status;

    if (status && statusMessageMap[status]) {
      return contextMessage
        ? `${contextMessage} ${statusMessageMap[status]}`
        : statusMessageMap[status];
    }

    const backendMessage = error.response?.data as { message?: string } | undefined;

    if (backendMessage?.message) {
      return contextMessage
        ? `${contextMessage} ${backendMessage.message}`
        : backendMessage.message;
    }

    if (contextMessage) {
      return `${contextMessage} ${defaultMessage}`;
    }
  }

  return defaultMessage;
}
