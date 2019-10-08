import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '..';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService, LocalStorageService],
      imports: [HttpClientModule],
    });
  });

  it(
    'should be created',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    })
  );
});
