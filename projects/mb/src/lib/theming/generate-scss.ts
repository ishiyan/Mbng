// import { DynamicScheme, hexFromArgb, TonalPalette } from '@material/material-color-utilities';
import { DynamicScheme, hexFromArgb, TonalPalette } from '@ktibow/material-color-utilities-nightly';

import { DynamicThemingParameters, generateLightDarkDynamicScheme, generateLightDynamicScheme } from './generate'

export function generateSCSS(params: DynamicThemingParameters, includeHighContrast: boolean): string {
  const light = generateLightDynamicScheme(params);

  // Extract all palettes from the DynamicScheme
  const colorPalettes: ColorPalettes = {
    primary: light.primaryPalette,
    secondary: light.secondaryPalette,
    tertiary: light.tertiaryPalette,
    neutral: light.neutralPalette,
    neutralVariant: light.neutralVariantPalette,
    error: light.errorPalette
  };

  let scss = generateSCSSTheme(colorPalettes, 'Color palettes are generated from ' +  params.getDescription());

  if (includeHighContrast) {
    const [lightContrast, darkContrast] = generateLightDarkDynamicScheme(params, true);
    scss += generateHighContrastOverrideMixinsSCSS(lightContrast, darkContrast, params.supportsDim());
  }

  return scss;
}

// The rest of the code is copied from:
// https://github.com/angular/components/blob/main/src/material/schematics/ng-generate/theme-color/index.ts
// with modifications:
// - generateSCSSTheme: change SCSS header comments,
// - getHighContrastOverides: added supportsDim functionality,
// - generateHighContrastOverrideMixinsSCSS: added supportsDim functionality.

// For each color tonal palettes are created using the following hue tones.
// https://m3.material.io/styles/color/system/how-the-system-works
const HUE_TONES = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

// Map of neutral hues to the previous/next hues that
// can be used to estimate them, in case they're missing.
const NEUTRAL_HUES = new Map<number, {prev: number; next: number}>([
  [4, {prev: 0, next: 10}],
  [6, {prev: 0, next: 10}],
  [12, {prev: 10, next: 20}],
  [17, {prev: 10, next: 20}],
  [22, {prev: 20, next: 25}],
  [24, {prev: 20, next: 25}],
  [87, {prev: 80, next: 90}],
  [92, {prev: 90, next: 95}],
  [94, {prev: 90, next: 95}],
  [96, {prev: 95, next: 98}],
]);

// Some of the color tokens refer to additional hue tones, but this only
// applies for the neutral color palette (ex. surface container is neutral
// palette's 94 tone).
// https://m3.material.io/styles/color/static/baseline
const NEUTRAL_HUE_TONES = [...HUE_TONES, ...NEUTRAL_HUES.keys()];

interface ColorPalettes {
  primary: TonalPalette;
  secondary: TonalPalette;
  tertiary: TonalPalette;
  neutral: TonalPalette;
  neutralVariant: TonalPalette;
  error: TonalPalette;
}

// Gets the scss representation of the provided color palettes.
function getColorPalettesSCSS(colorPalettes: ColorPalettes): string {
  let scss = '(\n';
  for (const [variant, palette] of Object.entries(colorPalettes)) {
    const paletteKey = variant.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    scss += '  ' + paletteKey + ': (\n';
    const tones = paletteKey === 'neutral' ? NEUTRAL_HUE_TONES : HUE_TONES;
    for (const tone of tones) {
      const color = hexFromArgb(palette.tone(tone));
      scss += '    ' + tone + ': ' + color + ',\n';
    }
    scss += '  ),\n';
  }
  scss += ');';
  return scss;
}

// Gets the generated scss from the provided color palettes and theme types.
function generateSCSSTheme(colorPalettes: ColorPalettes, colorComment: string): string {
  let scss = [
    '// This file was generated using material color utilities code from',
    '// https://github.com/material-foundation/material-color-utilities/tree/main/typescript',
    '',
    "@use 'sass:map';",
    "@use '@angular/material' as mat;",
    '',
    '// Note: ' + colorComment,
    '$_palettes: ' + getColorPalettesSCSS(colorPalettes),
    '',
    '$_rest: (',
    '  secondary: map.get($_palettes, secondary),',
    '  neutral: map.get($_palettes, neutral),',
    '  neutral-variant: map.get($_palettes,  neutral-variant),',
    '  error: map.get($_palettes, error),',
    ');',
    '',
    '$primary-palette: map.merge(map.get($_palettes, primary), $_rest);',
    '$tertiary-palette: map.merge(map.get($_palettes, tertiary), $_rest);',
  ];

  return scss.join('\n');
}

// Gets map of system variables and their high contrast values.
function getHighContrastOverides(colorScheme: DynamicScheme, supportsDim: boolean): Map<string, string> {
  const overrides = new Map<string, string>();

  // Set system variables with values from primary palette
  overrides.set('primary', hexFromArgb(colorScheme.primary));
  overrides.set('on-primary', hexFromArgb(colorScheme.onPrimary));
  overrides.set('primary-container', hexFromArgb(colorScheme.primaryContainer));
  overrides.set('on-primary-container', hexFromArgb(colorScheme.onPrimaryContainer));
  overrides.set('inverse-primary', hexFromArgb(colorScheme.inversePrimary));
  overrides.set('primary-fixed', hexFromArgb(colorScheme.primaryFixed));
  overrides.set('primary-fixed-dim', hexFromArgb(colorScheme.primaryFixedDim));
  overrides.set('on-primary-fixed', hexFromArgb(colorScheme.onPrimaryFixed));
  overrides.set('on-primary-fixed-variant', hexFromArgb(colorScheme.onPrimaryFixedVariant));

  // Set system variables with values from secondary palette
  overrides.set('secondary', hexFromArgb(colorScheme.secondary));
  overrides.set('on-secondary', hexFromArgb(colorScheme.onSecondary));
  overrides.set('secondary-container', hexFromArgb(colorScheme.secondaryContainer));
  overrides.set('on-secondary-container', hexFromArgb(colorScheme.onSecondaryContainer));
  overrides.set('secondary-fixed', hexFromArgb(colorScheme.secondaryFixed));
  overrides.set('secondary-fixed-dim', hexFromArgb(colorScheme.secondaryFixedDim));
  overrides.set('on-secondary-fixed', hexFromArgb(colorScheme.onSecondaryFixed));
  overrides.set('on-secondary-fixed-variant', hexFromArgb(colorScheme.onSecondaryFixedVariant));

  // Set system variables with values from tertiary palette
  overrides.set('tertiary', hexFromArgb(colorScheme.tertiary));
  overrides.set('on-tertiary', hexFromArgb(colorScheme.onTertiary));
  overrides.set('tertiary-container', hexFromArgb(colorScheme.tertiaryContainer));
  overrides.set('on-tertiary-container', hexFromArgb(colorScheme.onTertiaryContainer));
  overrides.set('tertiary-fixed', hexFromArgb(colorScheme.tertiaryFixed));
  overrides.set('tertiary-fixed-dim', hexFromArgb(colorScheme.tertiaryFixedDim));
  overrides.set('on-tertiary-fixed', hexFromArgb(colorScheme.onTertiaryFixed));
  overrides.set('on-tertiary-fixed-variant', hexFromArgb(colorScheme.onTertiaryFixedVariant));

  // Set system variables with values from neutral palette
  overrides.set('background', hexFromArgb(colorScheme.background));
  overrides.set('on-background', hexFromArgb(colorScheme.onBackground));
  overrides.set('surface', hexFromArgb(colorScheme.surface));
  overrides.set('surface-dim', hexFromArgb(colorScheme.surfaceDim));
  overrides.set('surface-bright', hexFromArgb(colorScheme.surfaceBright));
  overrides.set('surface-container-low', hexFromArgb(colorScheme.surfaceContainerLow));
  overrides.set('surface-container-lowest', hexFromArgb(colorScheme.surfaceContainerLowest));
  overrides.set('surface-container', hexFromArgb(colorScheme.surfaceContainer));
  overrides.set('surface-container-high', hexFromArgb(colorScheme.surfaceContainerHigh));
  overrides.set('surface-container-highest', hexFromArgb(colorScheme.surfaceContainerHighest));
  overrides.set('on-surface', hexFromArgb(colorScheme.onSurface));
  overrides.set('shadow', hexFromArgb(colorScheme.shadow));
  overrides.set('scrim', hexFromArgb(colorScheme.scrim));
  overrides.set('surface-tint', hexFromArgb(colorScheme.surfaceTint));
  overrides.set('inverse-surface', hexFromArgb(colorScheme.inverseSurface));
  overrides.set('inverse-on-surface', hexFromArgb(colorScheme.inverseOnSurface));
  overrides.set('outline', hexFromArgb(colorScheme.outline));
  overrides.set('outline-variant', hexFromArgb(colorScheme.outlineVariant));

  // Set system variables with values from error palette
  overrides.set('error', hexFromArgb(colorScheme.error));
  overrides.set('on-error', hexFromArgb(colorScheme.onError));
  overrides.set('error-container', hexFromArgb(colorScheme.errorContainer));
  overrides.set('on-error-container', hexFromArgb(colorScheme.onErrorContainer));

  // Set system variables with values from neutral variant palette
  overrides.set('surface-variant', hexFromArgb(colorScheme.surfaceVariant));
  overrides.set('on-surface-variant', hexFromArgb(colorScheme.onSurfaceVariant));

  if (supportsDim) {
    overrides.set('primary-dim', hexFromArgb(colorScheme.primaryDim));
    overrides.set('secondary-dim', hexFromArgb(colorScheme.secondaryDim));
    overrides.set('tertiary-dim', hexFromArgb(colorScheme.tertiaryDim));
    overrides.set('error-dim', hexFromArgb(colorScheme.errorDim));
  }

  return overrides;
}

// Gets the scss representation of the high contrast override mixins.
function generateHighContrastOverrideMixinsSCSS(
  lightHighContrastColorScheme: DynamicScheme,
  darkHighContrastColorScheme: DynamicScheme,
  supportsDim: boolean
): string {
  // Create private function to grab correct values based on theme-type
  let scss = '\n';
  scss += '\n@function _high-contrast-value($light, $dark, $theme-type) {\n';
  scss += '  @if ($theme-type == light) {\n';
  scss += '    @return $light;\n';
  scss += '  }\n';
  scss += '  @if ($theme-type == dark) {\n';
  scss += '    @return $dark;\n';
  scss += '  }\n';
  scss += '  @if ($theme-type == color-scheme) {\n';
  scss += '    @return light-dark(#{$light}, #{$dark});\n';
  scss += '  }\n';
  scss +=
    "  \n  @error 'Unknown theme-type #{$theme-type}. Expected light, dark, or color-scheme';\n";
  scss += '}\n';

  // Populate maps with color roles values for light and dark themes to pass into mixin
  const lightOverrides = getHighContrastOverides(lightHighContrastColorScheme, supportsDim);
  const darkOverrides = getHighContrastOverides(darkHighContrastColorScheme, supportsDim);

  // Create high contrast mixin with theme-type input that can be light, dark, or color-scheme.
  scss += '\n@mixin high-contrast-overrides($theme-type) {\n';
  scss += '  @include mat.theme-overrides((\n';
  for (const [key, value] of lightOverrides!.entries()) {
    scss +=
      '    ' +
      key +
      ': _high-contrast-value(' +
      value +
      ', ' +
      darkOverrides.get(key) +
      ', $theme-type),\n';
  }
  scss += '  ))\n';
  scss += ' }\n';

  return scss;
}
