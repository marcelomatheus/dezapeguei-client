import { httpClient } from "@/src/shared/api/http-client";
import { MessageListSchema, MessageModel } from "@/src/shared/schemas/chat.schema";

export async function getMessages(chatId: string): Promise<MessageModel[]> {
  const response = await httpClient.get("/messages", {
    params: {
      chatId,
    },
  });

  return MessageListSchema.parse(response.data);
}
