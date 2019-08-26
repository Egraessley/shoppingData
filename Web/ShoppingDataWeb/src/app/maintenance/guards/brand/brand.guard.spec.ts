import { TestBed, async, inject } from '@angular/core/testing';

import { BrandGuard } from './brand.guard';

describe('BrandGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandGuard]
    });
  });

  it('should ...', inject([BrandGuard], (guard: BrandGuard) => {
    expect(guard).toBeTruthy();
  }));
});
