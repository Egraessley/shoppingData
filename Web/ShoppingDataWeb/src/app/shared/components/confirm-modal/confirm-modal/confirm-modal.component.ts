import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

export enum ConfirmResult {
  Cancel = 0,
  Yes = 1,
  No = 2,
}

@Component({
  selector: 'sd-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() message: string = null;
  @Input() title = 'Confirm';
  @Input() allowCancel = false;
  private result: ConfirmResult = ConfirmResult.Cancel;
  @Output() closed = new EventEmitter<ConfirmResult>();

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    let sub = this.bsModalService.onHidden.subscribe(() => {
      this.closed.emit(this.result);
      sub.unsubscribe();
      sub = null;
    });
  }

  public onYes(): void {
    this.result = ConfirmResult.Yes;
    this.close();
  }

  public onNo(): void {
    this.result = ConfirmResult.No;
    this.close();
  }

  public close(): void {
    this.bsModalRef.hide();
  }
}
