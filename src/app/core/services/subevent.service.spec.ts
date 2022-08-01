import { TestBed } from '@angular/core/testing';

import { SubeventService } from './subevent.service';

describe('SubeventService', () => {
  let service: SubeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
