import { TestBed } from '@angular/core/testing';

import { AlterMyDataPasswordService } from './alter-my-data-password.service';

describe('AlterMyDataPasswordService', () => {
  let service: AlterMyDataPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlterMyDataPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
