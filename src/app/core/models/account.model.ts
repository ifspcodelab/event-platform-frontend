export interface AccountDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  agreed: boolean;
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
