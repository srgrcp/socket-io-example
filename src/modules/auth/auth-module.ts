import { getAuthNamespace } from "./auth-namespace"
import { Service } from 'typedi'
import { ModuleBase } from "../module-base"
import { ModuleToken } from "../../utils/types"
import { OnSocketDisconnect } from "./services/on-socket.disconnect"
import { JoinService } from "./services/join-service"

@Service({ id: ModuleToken, multiple: true })
export class AuthModule extends ModuleBase {
  constructor(
    private onSocketDisconect: OnSocketDisconnect,
    private joinService: JoinService
  ) {
    super()
    this.namespace = getAuthNamespace(this.io)
    this.services = [
      this.onSocketDisconect,
      this.joinService,
    ]
  }
}
