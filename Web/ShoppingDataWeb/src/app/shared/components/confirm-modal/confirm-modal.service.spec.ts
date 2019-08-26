import { TestBed, inject } from '@angular/core/testing';

import { ConfirmModalService } from './confirm-modal.service';
import { ModalModule } from 'ngx-bootstrap';

describe('ConfirmModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      providers: [ConfirmModalService],
    });
  });

  it(
    'should be created',
    inject([ConfirmModalService], (service: ConfirmModalService) => {
      expect(service).toBeTruthy();
    })
  );
});
