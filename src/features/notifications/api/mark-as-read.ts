import { httpClient } from "@/src/shared/api/http-client";
import {
  MarkAsReadPayload,
  MarkAsReadPayloadSchema,
  NotificationModel,
  NotificationSchema,
} from "@/src/shared/schemas/notification.schema";

export async function markAsRead(payload: MarkAsReadPayload): Promise<NotificationModel> {
  const parsedPayload = MarkAsReadPayloadSchema.parse(payload);
  const response = await httpClient.patch(`/notifications/${parsedPayload.id}/read`);
  return NotificationSchema.parse(response.data);
}
