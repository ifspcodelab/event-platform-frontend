import { AccountDto } from "./account.model";
import { SessionDto } from "./activity.model";

export enum RegistrationStatus {
  CONFIRMED = ("Confirmada"),
  WAITING_LIST = ("Lista de Espera"),
  WAITING_CONFIRMATION = ("Aguardando Confirmação"),
  CANCELED_BY_ADMIN = ("Cancelada pela Administração"),
  CANCELED_BY_USER = ("Cancelada pelo Participante"),
  CANCELED_BY_SYSTEM = ("Cancelada pelo Sistema"),
}

export interface RegistrationCreateDto {
  accountId: string;
}

export interface RegistrationDto {
  id: string;
  date: string;
  account: AccountDto;
  session: SessionDto;
  registrationStatus: RegistrationStatus;
  timeEmailWasSent: string;
  emailReplyDate: string;
}
