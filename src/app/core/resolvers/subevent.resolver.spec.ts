import { TestBed } from '@angular/core/testing';

import { SubeventResolver } from './subevent.resolver';

describe('SubeventResolver', () => {
  let resolver: SubeventResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubeventResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
