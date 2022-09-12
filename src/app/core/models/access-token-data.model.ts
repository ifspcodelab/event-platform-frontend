import {AccountRole} from "./account-role.model";

export interface AccessTokenData {
  sub: string,
  role: AccountRole,
  coordinator: string[],
  collaborator: string[],
  iss: string,
  exp: number,
  iat: number,
  email: string
}
