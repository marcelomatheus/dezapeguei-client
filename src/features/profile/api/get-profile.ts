import { httpClient } from "@/src/shared/api/http-client";
import { UserProfileModel, UserProfileSchema } from "@/src/shared/schemas/profile.schema";

export async function getProfile(): Promise<UserProfileModel> {
  const authResponse = await httpClient.get<{ id: string }>("/auth/profile");
  const userId = authResponse.data?.id;

  if (!userId) {
    throw new Error("Não foi possível identificar o usuário autenticado.");
  }

  const response = await httpClient.get(`/users/${userId}`);
  return UserProfileSchema.parse(response.data);
}
