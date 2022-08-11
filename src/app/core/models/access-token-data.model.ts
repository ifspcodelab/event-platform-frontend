import {AccountRole} from "./account-role.model";

export interface AccessTokenData {
  sub: string,
  role: AccountRole,
  iss: string,
  exp: number,
  iat: number,
  email: string
}
