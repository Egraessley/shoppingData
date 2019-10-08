import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  containsKey(key: string): boolean {
    return !!this.get(key);
  }

  add(key: string, value: any): LocalStorageService {
    localStorage.setItem(key, value);
    return this;
  }

  get(key: string, mapper?: (input: any) => any): string {
    const defaultMapper = input => input;
    const resolvedMapper = mapper || defaultMapper;
    return resolvedMapper.call(this, localStorage.getItem(key));
  }

  remove(key: string): LocalStorageService {
    localStorage.removeItem(key);
    return this;
  }

  getKeys(): ReadonlyArray<string> {
    return <ReadonlyArray<string>>Object.keys(localStorage);
  }

  find(keywords: ReadonlyArray<string>): string {
    const key = this.getKeys().find(item =>
      keywords.every(value => item.indexOf(value) >= 0)
    );

    return this.get(key);
  }

  clear(): LocalStorageService {
    localStorage.clear();
    return this;
  }
}
