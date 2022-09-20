import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { Token } from "typedi";

export type NextFn = (err?: ExtendedError | undefined) => void

export interface SocketData {
  token: string | undefined
}

export const ModuleToken = new Token<IOModule>('modules')

export interface IOModule {
  register(): void
}

export type IOEvent = (...args: any) => void

export interface IOService {
  eventName: string
  registerService(socket: Socket): IOEvent
}
