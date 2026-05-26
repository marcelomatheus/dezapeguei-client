import { httpClient } from "@/src/shared/api/http-client";
import {
  UpdateProfilePayload,
  UpdateProfilePayloadSchema,
  UserProfileModel,
  UserProfileSchema,
} from "@/src/shared/schemas/profile.schema";

export async function updateProfile(userId: string, payload: UpdateProfilePayload): Promise<UserProfileModel> {
  const parsedPayload = UpdateProfilePayloadSchema.parse(payload);
  const sanitizedPayload = Object.fromEntries(
    Object.entries(parsedPayload)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => [key, value]),
  );

  const response = await httpClient.patch(`/users/${userId}`, sanitizedPayload);
  return UserProfileSchema.parse(response.data);
}
