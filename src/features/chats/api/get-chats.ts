import { httpClient } from "@/src/shared/api/http-client";
import { ChatListSchema, ChatModel } from "@/src/shared/schemas/chat.schema";

export async function getChats(userId?: string): Promise<ChatModel[]> {
  const response = await httpClient.get("/chats", {
    params: {
      userId,
    },
  });

  return ChatListSchema.parse(response.data);
}
