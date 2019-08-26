import { TestBed, async, inject } from '@angular/core/testing';

import { TransactionListGuard } from './transaction-list.guard';

describe('TransactionListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionListGuard]
    });
  });

  it('should ...', inject([TransactionListGuard], (guard: TransactionListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
