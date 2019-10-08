import { TestBed, async, inject } from '@angular/core/testing';

import { StoreGuard } from './store.guard';

describe('StoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreGuard]
    });
  });

  it('should ...', inject([StoreGuard], (guard: StoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
