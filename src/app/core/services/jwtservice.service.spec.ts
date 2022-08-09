import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwtservice.service';

describe('JwtserviceService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
