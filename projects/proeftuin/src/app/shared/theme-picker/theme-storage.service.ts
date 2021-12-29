import { Injectable, EventEmitter } from '@angular/core';
import { Theme } from './theme';

@Injectable()
export class ThemeStorageService {
  static storageKey = 'theme-storage-current-name';

  onThemeUpdate: EventEmitter<Theme> = new EventEmitter<Theme>();

  storeTheme(theme: Theme) {
    try {
      window.localStorage[ThemeStorageService.storageKey] = theme.name;
    } catch { }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorageService.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorageService.storageKey);
    } catch { }
  }
}
