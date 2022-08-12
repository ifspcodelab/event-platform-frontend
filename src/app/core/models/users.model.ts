
import { Timestamp } from "rxjs";
import {UsersRole} from "./users-role.model";

export interface UsersDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  agreed: boolean;
  role: UsersRole;
  verified: boolean;
  registrationTimestamp: Timestamp<any>;
}
