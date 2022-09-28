import { AccountRole } from "./account-role.model";
import { AccountStatus } from "./account-status.model";
import { AccountType } from "./account-type.model";

export interface AccountDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  agreed: boolean;
  allowEmail: boolean;
  role: AccountRole;
  type: AccountType;
  status: AccountStatus;
  registrationTimestamp: string;
}

export class MyDataDto {
  name: string;
  cpf: string;
  allowEmail: boolean;
  userRecaptcha: string | undefined;

  constructor(
    name: string,
    cpf: string,
    allowEmail: boolean,
    userRecaptcha: string | undefined,
  ) {
    this.name = name;
    this.cpf = cpf;
    this.allowEmail = allowEmail;
    this.userRecaptcha = userRecaptcha;
  }
}

export class AccountCreateDto {
  name: string;
  email: string;
  cpf: string;
  password: string;
  agreed: boolean;
  userRecaptcha: string | undefined;

  constructor(
    name: string,
    email: string,
    cpf: string,
    password: string,
    agreed: boolean,
    userRecaptcha: string | undefined
  ) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.password = password;
    this.agreed = agreed;
    this.userRecaptcha = userRecaptcha;
  }
}
export interface AccountUpdateDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: AccountRole;
  status: AccountStatus;
}
