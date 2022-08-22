import { AccountDto } from './account.model';
import { OrganizerType } from './organizer-type.model';

export interface OrganizerSubeventDto {
  id: string;
  type: OrganizerType;
  account: AccountDto;
}

export class OrganizerSubeventCreateDto {
  type: OrganizerType;
  accountId: string;

  constructor(type: OrganizerType, accountId: string) {
    this.type = type;
    this.accountId = accountId;
  }
}
