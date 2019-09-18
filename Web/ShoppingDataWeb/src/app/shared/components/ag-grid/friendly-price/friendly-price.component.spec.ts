import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlyPriceComponent } from './friendly-price.component';

describe('FriendlyPriceComponent', () => {
  let component: FriendlyPriceComponent;
  let fixture: ComponentFixture<FriendlyPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendlyPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendlyPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
