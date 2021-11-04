import { TestBed } from '@angular/core/testing';

import { FormGuardService } from './form-guard.service';

describe('FormGuardService', () => {
  let service: FormGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
