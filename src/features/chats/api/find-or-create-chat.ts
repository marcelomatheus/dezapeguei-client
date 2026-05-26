import { httpClient } from "@/src/shared/api/http-client";
import { Chat } from "@/src/shared/types/domain";

export async function findOrCreateDirectChat(targetUserId: string): Promise<Chat> {
  const response = await httpClient.post<Chat>("/chats/find-or-create", { targetUserId });
  return response.data;
}
