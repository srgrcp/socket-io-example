import { Socket } from "socket.io";
import { Service } from "typedi";
import { User } from "../../../rxjs/users/user-models";
import { UserRepository } from "../../../rxjs/users/user-repository";
import { IOService } from "../../../utils/types";

@Service()
export class JoinService implements IOService {
  eventName = 'auth:join'

  constructor(private userRepository: UserRepository) {}

  registerService(socket: Socket) {
    return (username: string, callback: (user: User) => void) => {
      const user = this.userRepository.join({ socketId: socket.id, username })
      console.log('[AUTH] new user', username)
      callback(user)
    }
  }
}
