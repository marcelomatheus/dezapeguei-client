"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { io, Socket } from "socket.io-client";
import { env } from "@/src/shared/config/env";
import { useAuthStore } from "@/src/shared/auth/auth-store";

type SocketContextValue = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

type SocketProviderProps = {
  children: ReactNode;
};

type SocketState = {
  socket: Socket | null;
  isConnected: boolean;
};

type SocketAction =
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "ready"; socket: Socket }
  | { type: "reset" };

const initialSocketState: SocketState = {
  socket: null,
  isConnected: false,
};

function socketReducer(state: SocketState, action: SocketAction): SocketState {
  switch (action.type) {
    case "connected":
      return { ...state, isConnected: true };
    case "disconnected":
      return { ...state, isConnected: false };
    case "ready":
      return { socket: action.socket, isConnected: action.socket.connected };
    case "reset":
      return initialSocketState;
    default:
      return state;
  }
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [{ socket, isConnected }, dispatch] = useReducer(socketReducer, initialSocketState);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const socketInstance = io(env.NEXT_PUBLIC_API_URL, {
      auth: { token: accessToken },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => dispatch({ type: "connected" }));
    socketInstance.on("disconnect", () => dispatch({ type: "disconnected" }));

    dispatch({ type: "ready", socket: socketInstance });

    return () => {
      socketInstance.disconnect();
      dispatch({ type: "reset" });
    };
  }, [accessToken]);

  const value = useMemo(
    () => ({
      socket,
      isConnected,
    }),
    [isConnected, socket],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocketClientContext() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketClientContext must be used inside SocketProvider");
  }

  return context;
}
