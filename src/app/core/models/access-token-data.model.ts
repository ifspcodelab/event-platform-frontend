import {AccountRole} from "./account-role.model";

export interface AccessTokenData {
  sub: string,
  role: AccountRole,
  organizer: string[],
  organizer_subevent: string[],
  coordinator: string[],
  collaborator: string[],
  iss: string,
  exp: number,
  iat: number,
  email: string
}
