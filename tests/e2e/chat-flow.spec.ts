import { test, expect } from '@playwright/test';
import {
  createApiContext,
  registerUser,
} from './helpers/api-test-utils';

test.describe('E2E Chat Flow', () => {
  test('start -> send message -> receive -> mark read', async () => {
    const api = await createApiContext();

    const userA = await registerUser(api, 'Chat User A');
    const userB = await registerUser(api, 'Chat User B');

    const createChatResponse = await api.post('/chats', {
      data: {
        participantIds: [userA.id, userB.id],
      },
    });
    expect(createChatResponse.ok()).toBeTruthy();
    const chat = await createChatResponse.json();

    const sendMessageResponse = await api.post('/messages', {
      data: {
        chatId: chat.id,
        senderId: userA.id,
        content: 'Hello from E2E test',
      },
    });
    expect(sendMessageResponse.ok()).toBeTruthy();
    const message = await sendMessageResponse.json();

    const receiveResponse = await api.get('/messages', {
      params: {
        chatId: chat.id,
      },
    });
    expect(receiveResponse.ok()).toBeTruthy();
    const messages = await receiveResponse.json();
    expect(Array.isArray(messages)).toBeTruthy();
    const received = messages.find((item: { id: string }) => item.id === message.id);
    expect(received).toBeTruthy();

    const markReadResponse = await api.patch(`/messages/${message.id}`, {
      data: {
        status: 'READ',
        readAt: new Date().toISOString(),
      },
    });
    expect(markReadResponse.ok()).toBeTruthy();
    const readMessage = await markReadResponse.json();
    expect(readMessage.status).toBe('READ');

    await api.dispose();
  });
});
