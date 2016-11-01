import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class CacheContextService {

  constructor(private localStorageService: LocalStorageService) {
  }

  get(key: string): any {
    return this.localStorageService.get(key);
  }

  set(key, value): void {
    this.localStorageService.set(key, value);
  }

  remove(key: string): void {
    this.localStorageService.remove(key);
  }

}

