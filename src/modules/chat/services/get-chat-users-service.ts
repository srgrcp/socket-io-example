import { Socket } from "socket.io"
import { Service } from "typedi"
import { User } from "../../../rxjs/users/user-models"
import { UserRepository } from "../../../rxjs/users/user-repository"
import { IOService } from "../../../utils/types"

@Service()
export class GetChatUsersService implements IOService {
  eventName = 'chat:get-chat-users'

  constructor(private userRepository: UserRepository) {}

  registerService(_: Socket) {
    return (callback: (users: User[]) => void) => {
      const users = this.userRepository.users
      callback(users)
    }
  }
}
