import { httpClient } from "@/src/shared/api/http-client";
import { ChatModel, ChatSchema } from "@/src/shared/schemas/chat.schema";

export async function getChatById(chatId: string): Promise<ChatModel> {
  const response = await httpClient.get(`/chats/${chatId}`);
  return ChatSchema.parse(response.data);
}
