import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private platformId = inject(PLATFORM_ID);
  private memory = new Map<string, string>();
  private get isBrowser() { return isPlatformBrowser(this.platformId); }

  set<T>(key: string, value: T) {
    const v = JSON.stringify(value);
    if (this.isBrowser) localStorage.setItem(key, v); else this.memory.set(key, v);
  }
  get<T>(key: string): T | null {
    const v = this.isBrowser ? localStorage.getItem(key) : this.memory.get(key) ?? null;
    return v ? (JSON.parse(v) as T) : null;
  }
  remove(key: string) { if (this.isBrowser) localStorage.removeItem(key); else this.memory.delete(key); }
  clear() { if (this.isBrowser) localStorage.clear(); else this.memory.clear(); }
}
