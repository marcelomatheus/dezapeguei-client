"use client";

import { create } from "zustand";
import { UserProfile } from "@/src/shared/types/domain";

type AuthStoreState = {
  user: UserProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: UserProfile, accessToken: string) => void;
  setUser: (user: UserProfile | null) => void;
  setAccessToken: (token: string | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setSession: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true }),
  setUser: (user) => set((state) => ({ user, isAuthenticated: !!user && !!state.accessToken })),
  setAccessToken: (accessToken) =>
    set((state) => ({
      accessToken,
      isAuthenticated: !!state.user && !!accessToken,
    })),
  clearSession: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
