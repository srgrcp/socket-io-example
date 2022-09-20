import { Socket } from "socket.io"
import { Service } from "typedi"
import { UserRepository } from "../../../rxjs/users/user-repository"
import { getIo } from "../../../utils/io-instance"
import { IOService } from "../../../utils/types"
import { getChatNamespace } from "../chat-namespace"

type ConfirmSend = {
  success: boolean
  userDoesNotExist: boolean
}

type MessageInput = {
  to: string
  message: string
}

type Message = {
  from: string
  message: string
  isPrivate: boolean
}

@Service()
export class SendMessageService implements IOService {
  io = getIo()
  eventName = 'chat:send-message'
  chatNamespace = getChatNamespace(this.io)

  constructor(private userRepository: UserRepository) {}

  registerService(socket: Socket) {
    return (messageInput: MessageInput, callback: (confirm: ConfirmSend) => void) => {
      const from = this.userRepository.getById(socket.id)
      const message: Message = {
        from: from?.username || '-',
        message: messageInput.message,
        isPrivate: false,
      }
      console.log('users', this.userRepository.users[0], socket.id)
      console.log('sending message', message)
      if (messageInput.to === 'all') {
        this.chatNamespace.emit('chat:receive-message', message)
      } else {
        const to = this.userRepository.getByUsername(messageInput.to)
        message.isPrivate = true
        if (!to) {
          callback({ success: false, userDoesNotExist: true })
          return
        } else {
          const target = this.chatNamespace.sockets.get(to.socketId)
          target?.emit('chat:receive-message', message)
        }
      }
      callback({ success: true, userDoesNotExist: false })
    }
  }
}
