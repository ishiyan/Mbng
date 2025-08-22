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

// import { argbFromHex, DynamicScheme, Hct, TonalPalette } from '@material/material-color-utilities';
import { argbFromHex, DynamicScheme, Hct, TonalPalette, Variant, Platform } from '@ktibow/material-color-utilities-nightly';

import { DynamicThemingVariant } from './dynamic-theming-variant.enum';

// SpecVersion is not exported from the package, so we define it locally.
export type SpecVersion = '2021' | '2025';

const PLATFORM = 'phone';

// DynamicSchemeOptions is not exported from the package, so we define it locally based on the usage.
export type DynamicSchemeOptions = {
  sourceColorHct: Hct;
  variant: Variant;
  contrastLevel: number;
  isDark: boolean;
  platform: Platform;
  specVersion: SpecVersion;
  tertiaryPalette?: TonalPalette;
};

export class DynamicThemingParameters {
  constructor(
    public primaryColor: string,
    public tertiaryColor: string,
    public useTertiaryColor: boolean,
    public variant: DynamicThemingVariant,
    public specVersion: SpecVersion,
    public contrastLevel: number
  ) { }

  getDescription(): string {
    let str = `primary color: ${this.primaryColor}, `;
    if (this.useTertiaryColor) {
      str += `tertiary color: ${this.tertiaryColor}, `;
    }
    return `${str}variant: ${this.variant}, spec version: ${this.specVersion}, platform: ${PLATFORM}`;
  }

  supportsDim(): boolean {
    return this.specVersion !== '2021';
  }
}

function makeDynamicSchemeOptions(
  sourceColorHct: Hct, tertiary: TonalPalette | undefined, variant: DynamicThemingVariant,
  contrast: number, spec: SpecVersion, dark: boolean): DynamicSchemeOptions {
  return {
    sourceColorHct,
    variant: variant as number,
    contrastLevel: contrast,
    isDark: dark,
    platform: PLATFORM,
    specVersion: spec,
    ...(tertiary && { tertiaryPalette: tertiary }),
  };
}

export function generateLightDarkDynamicScheme(
  params: DynamicThemingParameters, highContrast: boolean): [DynamicScheme, DynamicScheme] {
  const sourceColorHct = Hct.fromInt(argbFromHex(params.primaryColor));
  const tertiaryPalette = params.useTertiaryColor ? TonalPalette.fromHct(Hct.fromInt(argbFromHex(params.tertiaryColor))) : undefined;
  const contrast = highContrast ? 1 : params.contrastLevel;

  const light = new DynamicScheme(makeDynamicSchemeOptions(
    sourceColorHct, tertiaryPalette, params.variant, contrast, params.specVersion, false));
  const dark = new DynamicScheme(makeDynamicSchemeOptions(
    sourceColorHct, tertiaryPalette, params.variant, contrast, params.specVersion, true));

  return [light, dark];
}

export function generateLightDynamicScheme(params: DynamicThemingParameters): DynamicScheme {
  const sourceColorHct = Hct.fromInt(argbFromHex(params.primaryColor));
  const tertiaryPalette = params.useTertiaryColor ? TonalPalette.fromHct(Hct.fromInt(argbFromHex(params.tertiaryColor))) : undefined;

  return new DynamicScheme(makeDynamicSchemeOptions(
    sourceColorHct, tertiaryPalette, params.variant, params.contrastLevel, params.specVersion, false));
}