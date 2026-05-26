import axios from "axios";
import { env } from "@/src/shared/config/env";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { installRefreshTokenInterceptor } from "@/src/shared/api/refresh-token";

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL + "/v1",
  timeout: 10_000,
  withCredentials: false,
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  const method = config.method?.toUpperCase();

  config.headers.Accept = "application/json";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (method !== "GET" && !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

installRefreshTokenInterceptor(httpClient);
