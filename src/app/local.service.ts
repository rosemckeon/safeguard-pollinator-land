import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;

  get<T>(key: string): T | null {
    const item = this.localStorage?.getItem(key);
    //console.log("LocalService.get", key, item);
    if (!item) {
      //console.log("no item")
      return null;
    }

    return this.isJSONValid(item) ? (JSON.parse(item) as T) : (item as T);
  }

  set(key: string, value: unknown): void {
    //console.log("LocalService.set", key, value);
    this.localStorage?.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.localStorage?.removeItem(key);
  }
  
  removeKeys(keys: string[]): void {
    keys.forEach(key => this.localStorage?.removeItem(key));
  }

  clear(): void {
    this.localStorage?.clear();
  }

  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }
  
}
