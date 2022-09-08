import { TestBed } from '@angular/core/testing';

import { AccountDeletionService } from './account-deletion.service';

describe('AccountDeletionService', () => {
  let service: AccountDeletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountDeletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
