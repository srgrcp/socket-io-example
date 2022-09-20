import { Service } from "typedi";
import { UserJoinInput } from "./user-models";
import { UserObservers } from "./user-observers";

@Service()
export class UserRepository extends UserObservers {
  public join(userJoinInput: UserJoinInput) {
    this._users.next([ ...this.users, { ...userJoinInput }])
    return userJoinInput
  }

  public remove(socketId: string) {
    const currentUsers = [ ...this.users ]
    this._users.next([ ...currentUsers.filter(u => u.socketId !== socketId) ])
  }

  public getById(socketId: string) {
    return this.users.find(u => u.socketId === socketId)
  }

  public getByUsername(username: string) {
    return this.users.find(u => u.username === username)
  }
}
