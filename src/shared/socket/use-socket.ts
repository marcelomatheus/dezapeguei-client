"use client";

import { useSocketClientContext } from "@/src/shared/socket/socket-client";

export function useSocket() {
  return useSocketClientContext();
}
