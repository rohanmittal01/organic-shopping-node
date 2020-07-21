import { TestBed } from '@angular/core/testing';

import { LoggedinGuardService } from './loggedin-guard.service';

describe('LoggedinGuardService', () => {
  let service: LoggedinGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedinGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
