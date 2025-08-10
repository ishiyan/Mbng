import { afterNextRender, inject, Injectable, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

const DEFAULT_PRIMARY = '#000000';
const DEFAULT_TERTIARY = '#000000';

@Injectable({
  providedIn: 'root'
})
export class DynamicColorService implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private mutationObserver?: MutationObserver;
  private mutationObserverInitialized = false;

  readonly primaryColor = signal<string>(DEFAULT_PRIMARY);
  readonly tertiaryColor = signal<string>(DEFAULT_TERTIARY);

  /**
   * Manually trigger color update (useful after programmatic theme changes)
   */
  refreshColors(): void {
    this.updateColors();
  }

  constructor() {
    // If we are using Server-Side Rendering (SSR), this will not run
    this.initialize();

    // Defer initialization until we're in the browser
    afterNextRender(() => {
      this.initialize();
    });
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
  }

  private initialize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.mutationObserverInitialized) {
      return;
    }

    // Initialize the signals with current values
    this.updateColors();
    
    // Watch for class changes that might affect CSS custom properties
    this.mutationObserver = new MutationObserver(() => {
      // Use setTimeout to ensure CSS has updated
      setTimeout(() => this.updateColors(), 0);
    });
    
    this.mutationObserver.observe(this.document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.mutationObserverInitialized = true;
  }
  
  private updateColors(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const style = getComputedStyle(this.document.documentElement);
    const primaryRaw = style.getPropertyValue('--mat-sys-primary').trim();
    const tertiaryRaw = style.getPropertyValue('--mat-sys-tertiary').trim();
    const isDarkMode = this.document.documentElement.classList.contains('darkMode');

    // Extract the actual color from light-dark() function
    const primary = this.extractColorFromLightDark(primaryRaw, isDarkMode);
    const tertiary = this.extractColorFromLightDark(tertiaryRaw, isDarkMode);
 
    if (primary && primary !== this.primaryColor()) {
      this.primaryColor.set(primary);
    }

    if (tertiary && tertiary !== this.tertiaryColor()) {
      this.tertiaryColor.set(tertiary);
    }
  }
  
  private extractColorFromLightDark(colorValue: string, isDarkMode: boolean): string {
    // Check if it's a light-dark() function
    const lightDarkMatch = colorValue.match(/light-dark\(\s*([^,]+),\s*([^)]+)\s*\)/);
  
    if (lightDarkMatch) {
      const lightColor = lightDarkMatch[1].trim();
      const darkColor = lightDarkMatch[2].trim();
      return isDarkMode ? darkColor : lightColor;
    }
  
    // If it's not a light-dark() function, return the value as-is
    return colorValue;
  }
}
