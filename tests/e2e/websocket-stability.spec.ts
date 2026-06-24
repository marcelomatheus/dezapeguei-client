import { test, expect } from '@playwright/test';

const APP_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

// SC-011: WebSocket should remain stable for 30 minutes of idle time.
// This test runs in two phases:
// 1) 30m idle validation on chat room screen.
// 2) Forced disconnect and reconnection validation.
test.describe('WebSocket stability (SC-011)', () => {
  test('maintains idle connection for 30 minutes and reconnects after network interruption', async ({
    page,
    context,
  }) => {
    test.setTimeout(35 * 60 * 1000);

    await page.goto(`${APP_URL}/login`);

    // Credentials should be configured in CI secrets/environment.
    await page.getByLabel('E-mail').fill(process.env.E2E_USER_EMAIL || 'user@example.com');
    await page.getByLabel('Senha').fill(process.env.E2E_USER_PASSWORD || 'password123');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await page.goto(`${APP_URL}/chats`);

    const firstChat = page.locator('a[href^="/chats/"]').first();
    await expect(firstChat).toBeVisible();
    await firstChat.click();

    await expect(page.getByText('Conversa')).toBeVisible();

    // Keep the page idle for SC-011 validation window.
    await page.waitForTimeout(30 * 60 * 1000);

    // Validate UI is still interactive after long idle period.
    const messageInput = page.locator('textarea, input[placeholder*="mensagem" i]').first();
    await expect(messageInput).toBeVisible();

    // Force network drop and recovery to validate reconnection behavior.
    await context.setOffline(true);
    await page.waitForTimeout(5000);
    await context.setOffline(false);

    // Wait for app socket recovery.
    await page.waitForTimeout(8000);

    await messageInput.fill('ping reconnection test');
    const sendButton = page.getByRole('button', { name: /enviar/i }).first();
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // Message send should succeed after reconnection.
    await expect(page.getByText('ping reconnection test')).toBeVisible();
  });
});
