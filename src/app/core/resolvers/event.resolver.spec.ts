import { TestBed } from '@angular/core/testing';

import { EventResolver } from './event.resolver';

describe('EventResolver', () => {
  let resolver: EventResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EventResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
