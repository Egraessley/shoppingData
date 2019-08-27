import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnyComponent } from './spinny.component';
import { SpinnyService } from './spinny.service';

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnyComponent],
  providers: [SpinnyService],
  exports: [SpinnyComponent],
})
export class SpinnyModule {}
