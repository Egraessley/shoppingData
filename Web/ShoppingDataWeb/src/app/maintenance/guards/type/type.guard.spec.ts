import { TestBed, async, inject } from '@angular/core/testing';

import { TypeGuard } from './type.guard';

describe('TypeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeGuard]
    });
  });

  it('should ...', inject([TypeGuard], (guard: TypeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
