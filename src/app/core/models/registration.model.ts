import { AccountDto } from "./account.model";
import { RegistrationStatus } from "./registration.status";

export interface RegistrationDto {
  id: string,
  date: string,
  account: AccountDto,
  registrationStatus: RegistrationStatus,
  timeEmailWasSent: string
}

