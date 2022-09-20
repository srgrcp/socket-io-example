import { Service } from 'typedi'
import { IOModule, IOService } from '../utils/types'
import { getIo } from '../utils/io-instance'
import { Namespace, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

@Service()
export abstract class ModuleBase implements IOModule {
  io = getIo()
  namespace: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined
  services: IOService[] = []

  register() {
    this.namespace?.on('connection', (socket: Socket) => {
      for (const service of this.services) {
        this.registerService(service, socket)
      }
    })
  }

  private registerService(service: IOService, socket: Socket) {
    socket.on(service.eventName, service.registerService(socket))
  }
}
