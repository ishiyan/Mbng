import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, Signal, signal } from '@angular/core';

// Based on the Material Foundation dynamic theming utilities
//
// https://github.com/material-foundation/material-color-utilities
// https://github.com/material-foundation/material-theme-builder
// https://github.com/importantimport/material-color-utilities/tree/dev/typescript
// npm install @material/material-color-utilities
//
// The above mentioned package was published more than a year ago and doesn't
// reflect the latest changes in the repo.
// It supports only the old '2021' specification, not the new '2025' one.
//
// We have to use either an external nightly builds or a fork which updates more regularly.
//
// (1) an external nightly build
// https://www.npmjs.com/package/@ktibow/material-color-utilities-nightly
// npm i @ktibow/material-color-utilities-nightly
//
// (2) a fork updated more frequently
// https://www.npmjs.com/package/@poupe/material-color-utilities
// npm i @poupe/material-color-utilities
// https://github.com/poupe-ui/material-color-utilities
//
// Another repo using material-color-utilities
// https://github.com/Nerwyn/material-you-utilities

// import { argbFromHex, DynamicScheme, Hct, hexFromArgb, TonalPalette } from '@material/material-color-utilities';
import { argbFromHex, DynamicScheme, Hct, hexFromArgb, TonalPalette, Variant, Platform } from '@ktibow/material-color-utilities-nightly';

import { LOCAL_STORAGE } from '../local-storage/local-storage';
import { DynamicColorService } from './dynamic-color.service';
import { DynamicThemingVariant } from './dynamic-theming-variant.enum';
import { DYNAMIC_THEMING_STORAGE_PREFIX } from './dynamic-theming-storage-prefix';
import { SpecVersion, DynamicThemingParameters, generateLightDarkDynamicScheme } from './generate'

@Injectable({
  providedIn: 'root'
})
export class DynamicThemingService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dcs = inject(DynamicColorService);
  private readonly localStorage = inject(LOCAL_STORAGE);
  private readonly storagePrefix = inject(DYNAMIC_THEMING_STORAGE_PREFIX);
  private readonly storageKey: string = `${this.storagePrefix}-dynamic-theming`;

  readonly primaryColor = signal<string>(this.dcs.primaryColor());
  readonly tertiaryColor = signal<string>(this.dcs.tertiaryColor());
  readonly useTertiaryColor = signal<boolean>(false);
  readonly variant = signal<DynamicThemingVariant>(DynamicThemingVariant.Fidelity);
  readonly contrastLevel = signal<number>(0);
  readonly specVersion = signal<SpecVersion>('2025');
  readonly rememberTheme = signal<boolean>(false);

  readonly currentParameters: Signal<DynamicThemingParameters> = computed(() => {
    return new DynamicThemingParameters(
      this.primaryColor(),
      this.tertiaryColor(),
      this.useTertiaryColor(),
      this.variant(),
      this.specVersion(),
      Math.max(-1, Math.min(this.contrastLevel(), 1))
    );
  });

  private themeSchemes: Signal<[DynamicScheme, DynamicScheme, boolean]> = computed(() => {
    const params = this.currentParameters();

    // console.log('DynamicThemingService computing start:', params);
    const [light, dark] = generateLightDarkDynamicScheme(params, false);

    return  [light, dark, params.supportsDim()];
  });

  constructor() {
    // Load saved settings on startup
    this.loadFromStorage();

    // Apply theme changes
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const [lightScheme, darkScheme, supportsDim] = this.themeSchemes();
      const properties = getThemeProperties(lightScheme, darkScheme, supportsDim);
      const style = this.document.documentElement.style;

      for (const [property, [lightArgb, darkArgb]] of Object.entries(properties)) {
        style.setProperty(property, `light-dark(${hexFromArgb(lightArgb)}, ${hexFromArgb(darkArgb)})`);
      }
    });

    // Handle storage when rememberTheme changes
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const remember = this.rememberTheme();
      if (remember) {
        this.saveToStorage(null);
      } else {
        this.clearStorage();
      }
    });

    // Auto-save when theme settings change (only if rememberTheme is true)
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const params = this.currentParameters();

      // Only save if rememberTheme is enabled
      if (this.rememberTheme()) {
          this.saveToStorage(params);
      }
    });
  }

  private saveToStorage(params: DynamicThemingParameters|null): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    const paramsToSave = params || this.currentParameters();
    this.localStorage.setItem(this.storageKey, JSON.stringify(paramsToSave));
  }

  private loadFromStorage(): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    const stored = this.localStorage.getItem(this.storageKey);
    if (!stored) {
      return;
    }

    try {
      const storage = JSON.parse(stored) as DynamicThemingParameters;

      this.primaryColor.set(storage.primaryColor);
      this.tertiaryColor.set(storage.tertiaryColor);
      this.useTertiaryColor.set(storage.useTertiaryColor);
      this.variant.set(storage.variant);
      this.specVersion.set(storage.specVersion);
      this.contrastLevel.set(storage.contrastLevel);
      this.rememberTheme.set(true);
    } catch (error) {
      console.error('Invalid stored theming settings, ignoring:', error);
    }
  }

  private clearStorage(): void {
    if (!isPlatformBrowser(this.platformId) || !this.localStorage) {
      return;
    }

    this.localStorage.removeItem(this.storageKey);
  }
}

function getThemeProperties(light: DynamicScheme, dark: DynamicScheme, supportsDim: boolean) {
  return {
    '--mat-sys-surface-dim': [light.surfaceDim, dark.surfaceDim],
    '--mat-sys-surface-bright': [light.surfaceBright, dark.surfaceBright],
    '--mat-sys-surface-container-lowest': [light.surfaceContainerLowest, dark.surfaceContainerLowest],
    '--mat-sys-surface-container-low': [light.surfaceContainerLow, dark.surfaceContainerLow],
    '--mat-sys-surface-container': [light.surfaceContainer, dark.surfaceContainer],
    '--mat-sys-surface-container-high': [light.surfaceContainerHigh, dark.surfaceContainerHigh],
    '--mat-sys-surface-container-highest': [light.surfaceContainerHighest, dark.surfaceContainerHighest],
    '--mat-sys-primary': [light.primary, dark.primary],
    '--mat-sys-primary-fixed': [light.primaryFixed, dark.primaryFixed],
    '--mat-sys-primary-fixed-dim': [light.primaryFixedDim, dark.primaryFixedDim],
    '--mat-sys-on-primary': [light.onPrimary, dark.onPrimary],
    '--mat-sys-on-primary-fixed': [light.onPrimaryFixed, dark.onPrimaryFixed],
    '--mat-sys-on-primary-fixed-variant': [light.onPrimaryFixedVariant, dark.onPrimaryFixedVariant],
    '--mat-sys-primary-container': [light.primaryContainer, dark.primaryContainer],
    '--mat-sys-on-primary-container': [light.onPrimaryContainer, dark.onPrimaryContainer],
    '--mat-sys-secondary': [light.secondary, dark.secondary],
    '--mat-sys-on-secondary': [light.onSecondary, dark.onSecondary],
    '--mat-sys-secondary-container': [light.secondaryContainer, dark.secondaryContainer],
    '--mat-sys-secondary-fixed': [light.secondaryFixed, dark.secondaryFixed],
    '--mat-sys-on-secondary-fixed': [light.onSecondaryFixed, dark.onSecondaryFixed],
    '--mat-sys-secondary-fixed-dim': [light.secondaryFixedDim, dark.secondaryFixedDim],
    '--mat-sys-on-secondary-fixed-variant': [light.onSecondaryFixedVariant, dark.onSecondaryFixedVariant],
    '--mat-sys-on-secondary-container': [light.onSecondaryContainer, dark.onSecondaryContainer],
    '--mat-sys-tertiary': [light.tertiary, dark.tertiary],
    '--mat-sys-on-tertiary': [light.onTertiary, dark.onTertiary],
    '--mat-sys-tertiary-container': [light.tertiaryContainer, dark.tertiaryContainer],
    '--mat-sys-on-tertiary-container': [light.onTertiaryContainer, dark.onTertiaryContainer],
    '--mat-sys-on-tertiary-fixed': [light.onTertiaryFixed, dark.onTertiaryFixed],
    '--mat-sys-on-tertiary-fixed-variant': [light.onTertiaryFixedVariant, dark.onTertiaryFixedVariant],
    '--mat-sys-tertiary-fixed': [light.tertiaryFixed, dark.tertiaryFixed],
    '--mat-sys-tertiary-fixed-dim': [light.tertiaryFixedDim, dark.tertiaryFixedDim],
    '--mat-sys-neutral-variant20': [light.neutralVariantPalette.tone(20), dark.neutralVariantPalette.tone(20)],
    '--mat-sys-neutral10': [light.neutralVariantPalette.tone(10), dark.neutralVariantPalette.tone(10)],
    '--mat-sys-error': [light.error, dark.error],
    '--mat-sys-on-error': [light.onError, dark.onError],
    '--mat-sys-error-container': [light.errorContainer, dark.errorContainer],
    '--mat-sys-on-error-container': [light.onErrorContainer, dark.onErrorContainer],
    '--mat-sys-background': [light.background, dark.background],
    '--mat-sys-on-background': [light.onBackground, dark.onBackground],
    '--mat-sys-surface': [light.surface, dark.surface],
    '--mat-sys-on-surface': [light.onSurface, dark.onSurface],
    '--mat-sys-surface-tint': [light.surfaceTint, dark.surfaceTint],
    '--mat-sys-surface-variant': [light.surfaceVariant, dark.surfaceVariant],
    '--mat-sys-on-surface-variant': [light.onSurfaceVariant, dark.onSurfaceVariant],
    '--mat-sys-outline': [light.outline, dark.outline],
    '--mat-sys-outline-variant': [light.outlineVariant, dark.outlineVariant],
    '--mat-sys-shadow': [light.shadow, dark.shadow],
    '--mat-sys-scrim': [light.scrim, dark.scrim],
    '--mat-sys-inverse-surface': [light.inverseSurface, dark.inverseSurface],
    '--mat-sys-inverse-on-surface': [light.inverseOnSurface, dark.inverseOnSurface],
    '--mat-sys-inverse-primary': [light.inversePrimary, dark.inversePrimary],

    // Combine multiple conditional properties in one block
    ...(supportsDim && {
      '--mat-sys-primary-dim': [light.primaryDim, dark.primaryDim],
      '--mat-sys-secondary-dim': [light.secondaryDim, dark.secondaryDim],
      '--mat-sys-tertiary-dim': [light.tertiaryDim, dark.tertiaryDim],
      '--mat-sys-error-dim': [light.errorDim, dark.errorDim],
    }),
  };
}
