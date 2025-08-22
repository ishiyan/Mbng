import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { LOCAL_STORAGE } from 'mb';

export type LayoutMode = 'masonry' | 'grid' | 'list';

const defaultLayoutMode: LayoutMode = 'masonry';
const storageKey = 'notes-layout-mode';

@Injectable({
  providedIn: 'root'
})
export class LayoutSettingsService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
private readonly localStorage = inject(LOCAL_STORAGE);
readonly layoutMode = signal<LayoutMode>(defaultLayoutMode);
readonly rememberPreference = signal<boolean>(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadFromStorage();

    // Handle storage when rememberPreference changes
    effect(() => {
      const remember = this.rememberPreference();
      if (remember) {
        this.saveToStorage();
      } else {
        this.clearStorage();
      }
    });

    // Auto-save when layout changes (only if rememberPreference is true)
    effect(() => {
      if (this.rememberPreference()) {
        this.saveToStorage();
      }
    });
  }

  setLayoutMode(mode: LayoutMode): void {
    this.layoutMode.set(mode);
  }

  toggleLayoutMode(): void {
    const modes: LayoutMode[] = ['grid', 'masonry', 'list'];
    const currentIndex = modes.indexOf(this.layoutMode());
    const nextIndex = (currentIndex + 1) % modes.length;
    this.layoutMode.set(modes[nextIndex]);
  }
 
  private loadFromStorage(): void {
    // No isPlatformBrowser check needed here, as this is only called in the constructor
    if (this.localStorage) {
      const stored = this.localStorage.getItem(storageKey);
      if (stored) {
        try {
          this.layoutMode.set(stored as LayoutMode);
          return;
        } catch (error) {
          console.error('Invalid stored layout setting, ignoring:', error);
        }
      }
    }

    // No stored preference - use default
    this.layoutMode.set(defaultLayoutMode);
  }

  private saveToStorage(): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    this.localStorage.setItem(storageKey, this.layoutMode());
  }

  private clearStorage(): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    this.localStorage.removeItem(storageKey);
  }
}