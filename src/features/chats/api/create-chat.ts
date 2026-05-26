import { httpClient } from "@/src/shared/api/http-client";
import {
  ChatModel,
  ChatSchema,
  CreateChatPayload,
  CreateChatPayloadSchema,
  FindOrCreateDirectChatPayloadSchema,
} from "@/src/shared/schemas/chat.schema";

export async function createChat(payload: CreateChatPayload): Promise<ChatModel> {
  const parsedPayload = CreateChatPayloadSchema.parse(payload);
  const response = await httpClient.post("/chats", parsedPayload);
  return ChatSchema.parse(response.data);
}

export async function findOrCreateDirectChat(
  participantIds: [string, string],
): Promise<ChatModel> {
  const parsedPayload = FindOrCreateDirectChatPayloadSchema.parse({
    participantIds,
  });

  const response = await httpClient.post("/chats/find-or-create", parsedPayload);
  return ChatSchema.parse(response.data);
}
