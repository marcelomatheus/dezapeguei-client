import { test, expect } from '@playwright/test';
import { createApiContext, randomEmail, randomPassword } from './helpers/api-test-utils';

test.describe('E2E Auth Flow', () => {
  test('register -> login -> refresh -> logout', async () => {
    const api = await createApiContext();

    const email = randomEmail('auth-flow');
    const password = randomPassword();

    const registerResponse = await api.post('/auth/register', {
      data: {
        name: 'Auth Flow User',
        email,
        password,
      },
    });
    expect(registerResponse.ok()).toBeTruthy();

    const loginResponse = await api.post('/auth/login', {
      data: {
        email,
        password,
      },
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginBody = await loginResponse.json();
    expect(loginBody.accessToken).toBeTruthy();
    expect(loginBody.refreshToken).toBeTruthy();

    const refreshResponse = await api.post('/auth/refresh-token', {
      data: {
        refreshToken: loginBody.refreshToken,
      },
    });
    expect(refreshResponse.ok()).toBeTruthy();
    const refreshBody = await refreshResponse.json();
    expect(refreshBody.accessToken).toBeTruthy();

    const logoutResponse = await api.post('/auth/logout');
    expect(logoutResponse.ok()).toBeTruthy();

    await api.dispose();
  });
});
