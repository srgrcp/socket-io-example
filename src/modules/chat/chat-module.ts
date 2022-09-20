import { Service } from 'typedi'
import { ModuleBase } from "../module-base"
import { ModuleToken } from "../../utils/types"
import { getChatNamespace } from "./chat-namespace"
import { GetChatUsersService } from './services/get-chat-users-service'
import { SendMessageService } from './services/send-message-service'

@Service({ id: ModuleToken, multiple: true })
export class ChatModule extends ModuleBase {
  constructor(
    private getChatUsersService: GetChatUsersService,
    private sendMessageService: SendMessageService,
  ) {
    super()
    this.namespace = getChatNamespace(this.io)
    this.services = [
      this.getChatUsersService,
      this.sendMessageService,
    ]
  }
}
