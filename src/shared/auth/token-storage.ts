const ACCESS_TOKEN_KEY = "dzp_access_token";
const REFRESH_TOKEN_KEY = "dzp_refresh_token";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!hasWindow()) {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!hasWindow()) {
    return null;
  }

  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveTokens(tokens: AuthTokens): void {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function clearTokens(): void {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
