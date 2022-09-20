import { Socket } from "socket.io"
import { Service } from "typedi"
import { UserRepository } from "../../../rxjs/users/user-repository"
import { IOService } from "../../../utils/types"

@Service()
export class OnSocketDisconnect implements IOService {
  eventName = 'disconnect'

  constructor(private userRepository: UserRepository) {}

  registerService(socket: Socket) {
    return () => {
      const user = this.userRepository.getById(socket.id)
      console.log('[AUTH] user disconnected', user?.username)
      this.userRepository.remove(socket.id)
    }
  }
}
