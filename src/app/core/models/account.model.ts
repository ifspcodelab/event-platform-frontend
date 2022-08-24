import {AccountRole} from "./account-role.model";

export interface AccountDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  agreed: boolean;
  role: AccountRole;
  verified: boolean;
  registrationTimestamp: string;
}

export class MyDataDto {
  name: string;
  cpf: string;
  userRecaptcha: string | undefined;

  constructor(
    name: string,
    cpf: string,
    userRecaptcha: string | undefined,
  ) {
    this.name = name;
    this.cpf = cpf;
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
  verified: boolean;
}
