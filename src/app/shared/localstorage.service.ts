import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage;
    }
  }

  getItem(key: string): any {
    if (this.storage) {
      const item = this.storage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
    return null;
  }

  setItem(key: string, value: any): void {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
}
