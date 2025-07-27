import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, Signal, signal } from '@angular/core';

// https://github.com/material-foundation/material-color-utilities
// https://github.com/material-foundation/material-theme-builder
// https://github.com/importantimport/material-color-utilities/tree/dev/typescript
// npm install @material/material-color-utilities
// https://github.com/Rrothschild18/runtime-angular-material/blob/main/src/app/app.component.ts
// https://medium.com/@raultonello18/angular-material-m3-dynamic-runtime-colors-6d6d1036d2bb
import { argbFromHex, DynamicScheme, Hct, hexFromArgb, TonalPalette } from '@material/material-color-utilities';

import { DynamicColorService } from './dynamic-color.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicThemingService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private dcs = inject(DynamicColorService);

  primaryThemeColor = signal<string>(this.dcs.primaryColor());
  tertiaryThemeColor = signal<string>(this.dcs.tertiaryColor());

  private themeSchemes: Signal<[DynamicScheme, DynamicScheme]> = computed(() => {
    const primary = this.primaryThemeColor();
    const tertiary = this.tertiaryThemeColor();
    console.log('DynamicThemingService computing start:', { primary, tertiary });
    const sourceColorHct = Hct.fromInt(argbFromHex(primary));
    const tertiaryHct = Hct.fromInt(argbFromHex(tertiary));
    const primaryLight = getDynamicScheme(sourceColorHct, tertiaryHct, false);
    const primaryDark = getDynamicScheme(sourceColorHct, tertiaryHct, true);
    console.log('DynamicThemingService computing end:', primaryLight.primary, primaryDark.primary, primaryLight.tertiary, primaryDark.tertiary);
    return [primaryLight, primaryDark];
  });

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const [lightScheme, darkScheme] = this.themeSchemes();
      const properties = getThemeProperties(lightScheme, darkScheme);
      //const target = this.document.documentElement;
      const style = this.document.documentElement.style;
      //const computedStyle = getComputedStyle(target);
      //const primary = computedStyle.getPropertyValue('--mat-sys-primary').trim();
      //console.log('ThemingService primary:', primary);
      for (const [property, [lightArgb, darkArgb]] of Object.entries(properties)) {
        style.setProperty(property, `light-dark(${hexFromArgb(lightArgb)}, ${hexFromArgb(darkArgb)})`);
      }
    });
  }
}

function getDynamicScheme(sourceColorHct: Hct, tertiaryHct: Hct, isDark: boolean) {
  // from https://github.com/material-foundation/material-color-utilities/blob/ca894db8b6aebb2833f1805ae61573c92e3f1660/typescript/scheme/scheme_content.ts
  // but without the DislikeAnalyzer to ensure the given colors are not changed.
  // This should be the same effect as checking the 'Color match' checkbox in
  // the material theme builder https://material-foundation.github.io/material-theme-builder
  return new DynamicScheme({
    sourceColorArgb: sourceColorHct.toInt(),
    variant: 5, // Variant.FIDELITY,
    contrastLevel: 0,
    isDark,
    primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma),
    secondaryPalette: TonalPalette.fromHueAndChroma(
      sourceColorHct.hue,
      Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5),
    ),
    tertiaryPalette: TonalPalette.fromHct(tertiaryHct),
    neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0),
    neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0 + 4.0),
  });
}

function getThemeProperties(light: DynamicScheme, dark: DynamicScheme) {
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
  };
}
