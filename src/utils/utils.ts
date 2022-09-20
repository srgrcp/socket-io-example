import { Socket } from "socket.io";
import { SocketData } from "./types";

export const getSocketData = (socket: Socket): SocketData => {
  if ((socket as any).data === undefined) (socket as any).data = {}
  return (socket as any).data
}
