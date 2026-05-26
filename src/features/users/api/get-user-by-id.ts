import { httpClient } from "@/src/shared/api/http-client";
import { UserProfileModel, UserProfileSchema } from "@/src/shared/schemas/profile.schema";

export async function getUserById(userId: string): Promise<UserProfileModel> {
  const response = await httpClient.get(`/users/${userId}`);
  return UserProfileSchema.parse(response.data);
}
