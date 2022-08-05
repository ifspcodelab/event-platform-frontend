import { TestBed } from '@angular/core/testing';

import { OrganizerSubeventService } from './organizer-subevent.service';

describe('OrganizerSubeventService', () => {
  let service: OrganizerSubeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerSubeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
