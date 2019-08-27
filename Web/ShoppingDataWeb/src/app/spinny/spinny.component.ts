import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SpinnyService } from './spinny.service';
import { startWith, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'sd-spinny',
  templateUrl: './spinny.component.html',
  styleUrls: ['./spinny.component.scss'],
})
export class SpinnyComponent implements OnInit, AfterViewInit {
  isVisible = false;

  constructor(private spinnyService: SpinnyService) {}

  ngOnInit() {
    // this.spinnyService.setSpinnyVisible.subscribe(isVisible => {
    //   this.isVisible = isVisible;
    // });
  }

  ngAfterViewInit() {
    this.spinnyService.setSpinnyVisible
      .pipe(
        startWith(null),
        delay(0),
        tap(isVisible => {
          this.isVisible = isVisible;
        })
      )
      .subscribe();
  }
}
