import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { clearAuthCookies, setAuthCookies } from "@/app/actions/auth";
import { env } from "@/src/shared/config/env";
import { clearTokens, getRefreshToken, saveTokens } from "@/src/shared/auth/token-storage";
import { useAuthStore } from "@/src/shared/auth/auth-store";

type RetryableRequest = AxiosRequestConfig & { _retry?: boolean };

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

let inflightRefresh: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (inflightRefresh) {
    return inflightRefresh;
  }

  inflightRefresh = (async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();
      await clearAuthCookies();
      return null;
    }

    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${env.NEXT_PUBLIC_API_URL}/v1/auth/refresh-token`,
        { refreshToken }
      );

      saveTokens(response.data);
      await setAuthCookies(response.data);
      useAuthStore.getState().setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      const isAuthError = status === 401 || status === 403;

      if (isAuthError) {
        clearTokens();
        await clearAuthCookies();
        useAuthStore.getState().clearSession();
      }

      return null;
    } finally {
      inflightRefresh = null;
    }
  })();

  return inflightRefresh;
}

export function installRefreshTokenInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequest | undefined;

      if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const nextAccessToken = await refreshAccessToken();

      if (!nextAccessToken) {
        return Promise.reject(error);
      }

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${nextAccessToken}`,
      };

      return client(originalRequest);
    }
  );
}
