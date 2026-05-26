import { httpClient } from "@/src/shared/api/http-client";
import {
  GetNotificationsParams,
  GetNotificationsParamsSchema,
  NotificationListSchema,
  NotificationModel,
} from "@/src/shared/schemas/notification.schema";

export async function getNotifications(
  params: GetNotificationsParams = {},
): Promise<NotificationModel[]> {
  const parsedParams = GetNotificationsParamsSchema.parse(params);
  const response = await httpClient.get("/notifications", {
    params: parsedParams,
  });

  return NotificationListSchema.parse(response.data);
}
