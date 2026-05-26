"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ReactNode, useState } from "react";
import { createQueryClient } from "@/src/shared/api/query-client";
import { AuthSessionProvider } from "@/src/shared/auth/use-auth-session";
import { SocketProvider } from "@/src/shared/socket/socket-client";
import { ErrorBoundary } from "@/src/components/error-boundary";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider>
        <ErrorBoundary>
          <SocketProvider>
            {children}
            <ToastContainer position="bottom-right" autoClose={4000} />
          </SocketProvider>
        </ErrorBoundary>
      </AuthSessionProvider>
    </QueryClientProvider>
  );
}
