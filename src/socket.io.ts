import Container, { Service } from 'typedi'
import { AuthModule } from './modules/auth/auth-module'
import { ChatModule } from './modules/chat/chat-module'
import { IOModule, ModuleToken } from './utils/types'

@Service()
export class SocketIOServer {
  modules: IOModule[]

  constructor() {
    Container.import([
      AuthModule,
      ChatModule,
    ])

    this.modules = Container.getMany(ModuleToken)
  }
  
  public registerModules() {
    this.modules.forEach(module => module.register())
  }
}
