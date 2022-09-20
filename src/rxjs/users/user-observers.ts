import { BehaviorSubject } from "rxjs";
import { Service } from "typedi";
import { User } from "./user-models";

@Service()
export abstract class UserObservers {
  protected _users = new BehaviorSubject<User[]>([])

  get users() { return this._users.value }
  get users$() { return this._users.asObservable() }
}
