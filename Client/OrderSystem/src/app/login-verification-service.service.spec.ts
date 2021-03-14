import { TestBed } from '@angular/core/testing';

import { LoginVerificationServiceService } from './login-verification-service.service';

describe('LoginVerificationServiceService', () => {
  let service: LoginVerificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginVerificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
