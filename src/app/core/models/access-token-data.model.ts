import {AccountRole} from "./account-role.model";

export interface AccessTokenData {
  sub: string,
  role: AccountRole,
  coordinatorEvent: string[],
  coordinatorSubevent: string[],
  collaboratorEvent: string[],
  collaboratorSubevent: string[],
  iss: string,
  exp: number,
  iat: number,
  email: string
}
