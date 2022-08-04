import { AccountDto } from "./account.model";

export interface SpeakerDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  curriculum: string;
  lattes: string;
  linkedin: string;
  phoneNumber: string;
  account: AccountDto;
}

export class SpeakerCreateDto {
  name: string;
  email: string;
  cpf: string;
  curriculum: string;
  lattes: string;
  linkedin: string;
  phoneNumber: string;
  accountId?: string;

  constructor(
    name: string,
    email: string,
    cpf: string,
    curriculum: string,
    lattes: string,
    linkedin: string,
    phoneNumber: string,
    accountId?: string
  ) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.curriculum = curriculum;
    this.lattes = lattes;
    this.linkedin = linkedin;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.accountId = accountId;
  }
}
