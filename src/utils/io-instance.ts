import { BehaviorSubject } from "rxjs";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const _io = new BehaviorSubject<Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined>(undefined)

export const getIo = () => _io.value!
export const setIo = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => _io.next(io)
