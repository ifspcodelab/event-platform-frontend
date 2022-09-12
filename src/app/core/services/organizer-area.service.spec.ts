import { TestBed } from '@angular/core/testing';

import { OrganizerAreaService } from './organizer-area.service';

describe('OrganizerAreaService', () => {
  let service: OrganizerAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
