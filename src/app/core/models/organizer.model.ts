import { EventDto } from './event.model';
import { AccountDto } from './account.model';
import { OrganizerType } from './organizer-type.model';

export interface OrganizerDto {
  id: string;
  type: OrganizerType;
  account: AccountDto;
}

export class OrganizerCreateDto {
  type: OrganizerType;
  accountId: string;

  constructor(type: OrganizerType, accountId: string) {
    this.type = type;
    this.accountId = accountId;
  }
}