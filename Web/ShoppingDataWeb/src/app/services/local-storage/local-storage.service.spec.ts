import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
  });

  it(
    'should be created',
    inject([LocalStorageService], (service: LocalStorageService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'add should add an item to local storage',
    inject([LocalStorageService], (service: LocalStorageService) => {
      service.add('item', 'xxx');
      expect(localStorage.getItem('item')).toEqual('xxx');
    })
  );

  it(
    'containsKey should check if an item is in local storage',
    inject([LocalStorageService], (service: LocalStorageService) => {
      localStorage.setItem('item', 'xxx');
      expect(service.containsKey('item')).toBe(true);
    })
  );
});
