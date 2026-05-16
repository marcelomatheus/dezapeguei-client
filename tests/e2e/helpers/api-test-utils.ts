import { expect, request } from '@playwright/test';

const apiBaseUrl = process.env.E2E_API_BASE_URL ?? 'http://localhost:8080/v1';

export type E2EUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export function randomEmail(prefix: string): string {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`;
}

export function randomPassword(): string {
  return 'StrongPass1!';
}

export async function createApiContext() {
  return request.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export async function registerUser(
  api: Awaited<ReturnType<typeof createApiContext>>,
  name: string,
): Promise<E2EUser> {
  const user: E2EUser = {
    id: '',
    name,
    email: randomEmail(name.toLowerCase().replace(/\s+/g, '-')),
    password: randomPassword(),
  };

  const registerResponse = await api.post('/auth/register', {
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  expect(registerResponse.ok()).toBeTruthy();
  const registerBody = await registerResponse.json();
  user.id = registerBody.user.id;

  return user;
}

export async function loginUser(
  api: Awaited<ReturnType<typeof createApiContext>>,
  credentials: Pick<E2EUser, 'email' | 'password'>,
) {
  const loginResponse = await api.post('/auth/login', {
    data: credentials,
  });

  expect(loginResponse.ok()).toBeTruthy();
  const loginBody = await loginResponse.json();

  return {
    accessToken: loginBody.accessToken,
    refreshToken: loginBody.refreshToken,
    user: loginBody.user,
  };
}

export async function getDefaultCategoryId(
  api: Awaited<ReturnType<typeof createApiContext>>,
): Promise<string> {
  const categoriesResponse = await api.get('/categories');
  expect(categoriesResponse.ok()).toBeTruthy();
  const categories = await categoriesResponse.json();

  if (!Array.isArray(categories) || categories.length === 0) {
    const createCategoryResponse = await api.post('/categories', {
      data: {
        name: `General-${Date.now()}`,
        slug: `general-${Date.now()}`,
      },
    });
    expect(createCategoryResponse.ok()).toBeTruthy();
    const createdCategory = await createCategoryResponse.json();
    return createdCategory.id;
  }

  return categories[0].id;
}
