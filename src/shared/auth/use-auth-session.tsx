"use client";

import { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { clearAuthCookies, setAuthCookies } from "@/app/actions/auth";
import { getProfile, logout as logoutRequest } from "@/src/features/auth/api/auth-api";
import { AuthTokens } from "@/src/features/auth/api/auth-api";
import { clearTokens, getAccessToken, saveTokens } from "@/src/shared/auth/token-storage";
import { useAuthStore } from "@/src/shared/auth/auth-store";
import { UserProfile } from "@/src/shared/types/domain";

type AuthSessionContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isHydrating: boolean;
  setSessionTokens: (tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthSessionContext = createContext<AuthSessionContextValue | undefined>(undefined);

type AuthSessionProviderProps = {
  children: ReactNode;
};

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [isHydrating, setIsHydrating] = useState(true);
  const isMountedRef = useRef(true);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setSession = useAuthStore((state) => state.setSession);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearSession = useAuthStore((state) => state.clearSession);

  const normalizeProfile = (profile: {
    id: string;
    email: string;
    rating: number;
    salesCount: number;
    purchasesCount: number;
    plan: "FREE" | "PREMIUM" | "ENTERPRISE";
    name?: string | null;
    phone?: string | null;
    avatar?: string | null;
    bio?: string | null;
    city?: string | null;
    state?: string | null;
    entrepreneurVerifiedAt?: string | Date | null;
  }): UserProfile => ({
    ...profile,
    name: profile.name ?? undefined,
    phone: profile.phone ?? undefined,
    avatar: profile.avatar ?? undefined,
    bio: profile.bio ?? undefined,
    city: profile.city ?? undefined,
    state: profile.state ?? undefined,
    entrepreneurVerifiedAt: profile.entrepreneurVerifiedAt
      ? String(profile.entrepreneurVerifiedAt)
      : null,
  });

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const hydrate = async () => {
      const token = getAccessToken();

      if (!token) {
        if (!isCancelled && isMountedRef.current) {
          setIsHydrating(false);
        }
        return;
      }

      setAccessToken(token);

      try {
        const profile = await getProfile();
        if (!isCancelled && isMountedRef.current) {
          setSession(normalizeProfile(profile), token);
        }
      } catch (error) {
        const status = isAxiosError(error) ? error.response?.status : undefined;
        const isAuthError = status === 401 || status === 403;

        if (isAuthError) {
          clearTokens();
          await clearAuthCookies();
          clearSession();
        }
      } finally {
        if (!isCancelled && isMountedRef.current) {
          setIsHydrating(false);
        }
      }
    };

    void hydrate();

    return () => {
      isCancelled = true;
    };
  }, [clearSession, setAccessToken, setSession]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      user,
      isAuthenticated,
      isHydrating,
      setSessionTokens: async (tokens: AuthTokens) => {
        saveTokens(tokens);
        await setAuthCookies(tokens);
        const profile = await getProfile();

        if (isMountedRef.current) {
          setSession(normalizeProfile(profile), tokens.accessToken);
        }
      },
      logout: async () => {
        try {
          await logoutRequest();
        } finally {
          clearTokens();
          await clearAuthCookies();
          clearSession();
        }
      },
    }),
    [clearSession, isAuthenticated, isHydrating, setSession, user],
  );

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuthSession must be used inside AuthSessionProvider");
  }

  return context;
}
