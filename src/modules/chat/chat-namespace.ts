import { Server } from "socket.io"

export const getChatNamespace = (io: Server) => {
  return io.of('/chat')
}
