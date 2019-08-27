import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SpinnyService {
  public setSpinnyVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line:variable-name
  private _stack: number;

  constructor() {
    this._stack = 0;
  }

  showSpinny(): void {
    this.setSpinnyVisible.emit(true);
    this._stack++;
  }

  hideSpinny(): void {
    this._stack--;
    if (this._stack <= 0) {
      this._stack = 0;
      this.setSpinnyVisible.emit(false);
    }
  }

  forceHideSpinny(): void {
    this._stack = 1;
    this.hideSpinny();
  }
}
