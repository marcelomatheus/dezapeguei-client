import { z } from "zod";

export const NotificationSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    message: z.string(),
    isRead: z.boolean(),
    redirect: z.string().nullable().optional(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    unreadCount: z.number().optional(),
  })
  .passthrough();

export const NotificationListSchema = z.array(NotificationSchema);

export const GetNotificationsParamsSchema = z.object({
  userId: z.string().optional(),
  isRead: z.boolean().optional(),
});

export const MarkAsReadPayloadSchema = z.object({
  id: z.string().min(1),
});

export type NotificationModel = z.infer<typeof NotificationSchema>;
export type GetNotificationsParams = z.infer<typeof GetNotificationsParamsSchema>;
export type MarkAsReadPayload = z.infer<typeof MarkAsReadPayloadSchema>;
