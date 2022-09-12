import { TestBed } from '@angular/core/testing';

import { OrganizerGuard } from './organizer.guard';

describe('OrganizerGuard', () => {
  let guard: OrganizerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrganizerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
