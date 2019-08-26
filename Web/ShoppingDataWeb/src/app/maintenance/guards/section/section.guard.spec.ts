import { TestBed, async, inject } from '@angular/core/testing';

import { SectionGuard } from './section.guard';

describe('SectionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionGuard]
    });
  });

  it('should ...', inject([SectionGuard], (guard: SectionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
