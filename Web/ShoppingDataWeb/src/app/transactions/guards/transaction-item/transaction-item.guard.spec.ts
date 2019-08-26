import { TestBed, async, inject } from '@angular/core/testing';

import { TransactionItemGuard } from './transaction-item.guard';

describe('TransactionItemGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionItemGuard]
    });
  });

  it('should ...', inject([TransactionItemGuard], (guard: TransactionItemGuard) => {
    expect(guard).toBeTruthy();
  }));
});
