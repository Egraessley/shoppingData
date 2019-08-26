import { Injectable } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import {
  ConfirmModalComponent,
  ConfirmResult,
} from './confirm-modal/confirm-modal.component';
import { Observable } from 'rxjs';

@Injectable()
export class ConfirmModalService {
  private modal: any;
  private modalOptions: ModalOptions = new ModalOptions();

  constructor(private modalService: BsModalService) {
    this.modalOptions.ignoreBackdropClick = true;
    this.modalOptions.keyboard = false;
  }

  public show(
    message: string,
    allowCancel: boolean = false
  ): Observable<ConfirmResult> {
    return new Observable(observer => {
      this.modal = this.modalService.show(
        ConfirmModalComponent,
        this.modalOptions
      );
      this.modal.content.allowCancel = allowCancel;
      this.modal.content.message = message;
      let sub = this.modal.content.closed.subscribe((result: ConfirmResult) => {
        this.modal = null;
        sub.unsubscribe();
        sub = null;
        observer.next(result);
        observer.complete();
      });
    });
  }

  public hide(): void {
    if (this.modal) {
      this.modal.hide();
      this.modal = null;
    }
  }
}
