import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlyDateComponent } from './friendly-date.component';

describe('FriendlyDateComponent', () => {
  let component: FriendlyDateComponent;
  let fixture: ComponentFixture<FriendlyDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FriendlyDateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendlyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
