import { io, Socket } from "socket.io-client";
import { env } from "@/src/shared/config/env";

type CreateSocketClientParams = {
  token: string;
};

export function createSocketClient({ token }: CreateSocketClientParams): Socket {
  return io(env.NEXT_PUBLIC_WS_URL, {
    transports: ["websocket"],
    auth: {
      token,
    },
  });
}

export function requestMissedMessages(socket: Socket): void {
  socket.emit("missedMessages");
}

export function requestSyncMessages(socket: Socket): void {
  socket.emit("syncMessages");
}
