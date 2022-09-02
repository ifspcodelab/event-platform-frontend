import { TestBed } from '@angular/core/testing';

import { MyDataAlterPasswordService } from './my-data-alter-password.service';

describe('AlterMyDataPasswordService', () => {
  let service: MyDataAlterPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDataAlterPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
