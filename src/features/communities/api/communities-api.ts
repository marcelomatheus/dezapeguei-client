import { httpClient } from "@/src/shared/api/http-client";
import {
  Community,
  CommunityListSchema,
  CommunityMessage,
  CommunityMessageListSchema,
  CommunityMessageSchema,
  CommunitySchema,
} from "@/src/shared/schemas/community.schema";

export async function getCommunities(): Promise<Community[]> {
  const response = await httpClient.get("/communities");
  return CommunityListSchema.parse(response.data);
}

export async function getCommunity(slug: string): Promise<Community> {
  const response = await httpClient.get(`/communities/${slug}`);
  return CommunitySchema.parse(response.data);
}

export async function joinCommunity(id: string) {
  const response = await httpClient.post(`/communities/${id}/join`);
  return response.data;
}

export async function getCommunityMessages(id: string): Promise<CommunityMessage[]> {
  const response = await httpClient.get(`/communities/${id}/messages`);
  return CommunityMessageListSchema.parse(response.data);
}

export async function sendCommunityMessage(id: string, content: string): Promise<CommunityMessage> {
  const response = await httpClient.post(`/communities/${id}/messages`, { content });
  return CommunityMessageSchema.parse(response.data);
}

export async function sendCommunityOffer(id: string, offerId: string, content?: string): Promise<CommunityMessage> {
  const response = await httpClient.post(`/communities/${id}/offers`, { offerId, content });
  return CommunityMessageSchema.parse(response.data);
}
