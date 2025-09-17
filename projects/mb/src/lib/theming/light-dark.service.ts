import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';

import { LOCAL_STORAGE } from '../local-storage/local-storage';
import { DYNAMIC_THEMING_STORAGE_PREFIX } from './dynamic-theming-storage-prefix';

const PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';
const LIGHT = 'light';
const DARK = 'dark';

export type LightDark = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class LightDarkService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly localStorage = inject(LOCAL_STORAGE);
  private readonly overlay = inject(OverlayContainer);
  private readonly storagePrefix = inject(DYNAMIC_THEMING_STORAGE_PREFIX);
  private readonly storageKey: string = `${this.storagePrefix}-light-dark`;

  readonly lightDark = signal<LightDark>(LIGHT);
  readonly rememberPreference = signal<boolean>(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadFromStorage();
    effect(() => {
      const lightDark = this.lightDark();
      this.setClasses(lightDark);
    });

    // Handle storage when rememberPreference changes
    effect(() => {
      const remember = this.rememberPreference();
      if (remember) {
        this.saveToStorage();
      } else {
        this.clearStorage();
      }
    });

    // Auto-save when theme changes (only if rememberPreference is true)
    effect(() => {
      if (this.rememberPreference()) {
        this.saveToStorage();
      }
    });
  }

  toggle(): void {
    const current = this.lightDark();
    this.lightDark.set(current === LIGHT ? DARK : LIGHT);
  }

  isDark(): boolean {
    return this.lightDark() === DARK;
  }

  private setClasses(lightDark: LightDark): void {
    this.overlay.getContainerElement().style.colorScheme = lightDark;
    this.document.documentElement.style.colorScheme = lightDark;
  }

  private loadFromStorage(): void {
    // No isPlatformBrowser check needed here, as this is only called in the constructor
    if (this.localStorage) {
      const stored = this.localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          this.lightDark.set(stored as LightDark);
          this.rememberPreference.set(true);
          return;
        } catch (error) {
          console.error('Invalid stored light-dark setting, ignoring:', error);
        }
      }
    }

    // No stored preference - use system preference
    const prefersDark = window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches;
    this.lightDark.set(prefersDark ? DARK : LIGHT);
  }

  private saveToStorage(): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    this.localStorage.setItem(this.storageKey, this.lightDark());
  }

  private clearStorage(): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    this.localStorage.removeItem(this.storageKey);
  }
}