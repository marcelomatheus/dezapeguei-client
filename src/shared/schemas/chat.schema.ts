import { z } from "zod";

export const ChatMessageTypeSchema = z.enum(["TEXT", "IMAGE", "OFFER", "SYSTEM"]);
export const ChatMessageStatusSchema = z.enum([
  "SENDING",
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
]);

export const ChatParticipantUserSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
  })
  .passthrough();

export const ChatParticipantSchema = z
  .object({
    id: z.string(),
    chatId: z.string(),
    userId: z.string(),
    user: ChatParticipantUserSchema.optional(),
  })
  .passthrough();

export const ChatSchema = z
  .object({
    id: z.string(),
    participantIds: z.array(z.string()).optional(),
    isGroup: z.boolean(),
    name: z.string().nullable().optional(),
    offerId: z.string().nullable().optional(),
    participants: z.array(ChatParticipantSchema).optional().default([]),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
  })
  .passthrough();

export const ChatListSchema = z.array(ChatSchema);

export const MessageSchema = z
  .object({
    id: z.string(),
    chatId: z.string(),
    senderId: z.string(),
    content: z.string(),
    type: ChatMessageTypeSchema.optional().default("TEXT"),
    status: ChatMessageStatusSchema.optional().default("SENT"),
    readAt: z.string().or(z.date()).nullable().optional(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()).optional(),
    sender: ChatParticipantUserSchema.optional(),
  })
  .passthrough();

export const MessageListSchema = z.array(MessageSchema);

export const CreateChatPayloadSchema = z.object({
  participantIds: z.array(z.string()).min(2),
  offerId: z.string().optional(),
  isGroup: z.boolean().optional(),
  name: z.string().optional(),
});

export const FindOrCreateDirectChatPayloadSchema = z.object({
  participantIds: z.array(z.string()).length(2),
});

export const SendMessagePayloadSchema = z.object({
  chatId: z.string().optional(),
  recipientId: z.string().optional(),
  content: z.string().min(1),
  clientRequestId: z.string().optional(),
});

export const MarkAsReadPayloadSchema = z.object({
  messageId: z.string(),
  chatId: z.string().optional(),
  clientRequestId: z.string().optional(),
});

export const SyncMessagesPayloadSchema = z.object({
  since: z.string().optional(),
});

export type ChatModel = z.infer<typeof ChatSchema>;
export type MessageModel = z.infer<typeof MessageSchema>;
export type CreateChatPayload = z.infer<typeof CreateChatPayloadSchema>;
export type SendMessagePayload = z.infer<typeof SendMessagePayloadSchema>;
export type MarkAsReadPayload = z.infer<typeof MarkAsReadPayloadSchema>;
