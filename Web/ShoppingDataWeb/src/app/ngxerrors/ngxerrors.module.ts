import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxErrorDirective } from './ngxerror.directive';
import { NgxErrorsDirective } from './ngxerrors.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxErrorDirective, NgxErrorsDirective],
  exports: [NgxErrorDirective, NgxErrorsDirective],
})
export class NgxErrorsModule {}
