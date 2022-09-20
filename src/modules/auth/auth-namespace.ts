import { Server } from "socket.io"

export const getAuthNamespace = (io: Server) => {
  return io.of('/auth')
}
