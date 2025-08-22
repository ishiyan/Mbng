// import { DynamicScheme, hexFromArgb } from '@material/material-color-utilities';
import { DynamicScheme, hexFromArgb } from '@ktibow/material-color-utilities-nightly';

import { DynamicThemingParameters, generateLightDarkDynamicScheme } from './generate'

export function generateCSS(params: DynamicThemingParameters, includeHighContrast: boolean): string {
  const [light, dark] = generateLightDarkDynamicScheme(params, false);
  const supportsDim = params.supportsDim();

  let css = '/* Note: Color palettes are generated from ' +  params.getDescription() + ' */\n';
  css += 'html {\n';
  css += getAllSysVariablesCSS(light, dark, supportsDim);

  // Add high contrast media query to overwrite the color values when the user specifies
  if (includeHighContrast) {
    const [lightContrast, darkContrast] = generateLightDarkDynamicScheme(params, true);
    css += getHighContrastOverridesCSS(lightContrast, darkContrast, supportsDim);
  }

  css += '}\n';
  return css;
}

// The rest of the code is copied from:
// https://github.com/angular/components/blob/main/src/material/schematics/ng-generate/theme-color/index.ts
// with modifications:
// - getColorSysVariablesCSS: added supportsDim functionality,
// - getAllSysVariablesCSS: added supportsDim functionality,
// - getHighContrastOverridesCSS: added supportsDim functionality.

// Gets CSS to define a system variable with light dark values.
function createLightDarkVar(
  leftSpacing: string,
  variableName: string,
  lightColor: number,
  darkColor: number,
  comment?: string,
) {
  const commentContent = comment ? ' /* ' + comment + ' */' : '';
  const lightDarkValue =
    'light-dark(' + hexFromArgb(lightColor) + ', ' + hexFromArgb(darkColor) + ');';
  return leftSpacing + '--mat-sys-' + variableName + ': ' + lightDarkValue + commentContent + '\n';
}

// Gets CSS for color system variables.
function getColorSysVariablesCSS(
  lightScheme: DynamicScheme,
  darkScheme: DynamicScheme,
  supportsDim: boolean,
  isHighContrast: boolean = false,
): string {
  let css = '';

  // Add extra spacing for high contrast values since variables will be nested within a media query.
  let leftSpacing = ' '.repeat(isHighContrast ? 4 : 2);

  // Set system variables with values from primary palette
  css += leftSpacing + '/* Primary palette variables */\n';
  // For certain color variables the value is grabbed directly from the palette rather than the role
  // for the non high contrast values. The color roles keeps track of color tone relationships
  // (ex. primary and primary container) and can slightly change the colors. Grabbing the value
  // directly from the palette allows the colors to be consistent with how system color variables
  // are defined in scss.
  css += createLightDarkVar(
    leftSpacing,
    'primary',
    isHighContrast ? lightScheme.primary : lightScheme.primaryPalette.tone(40),
    isHighContrast ? darkScheme.primary : lightScheme.primaryPalette.tone(80),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-primary',
    isHighContrast ? lightScheme.onPrimary : lightScheme.primaryPalette.tone(100),
    isHighContrast ? darkScheme.onPrimary : darkScheme.primaryPalette.tone(20),
  );
  css += createLightDarkVar(
    leftSpacing,
    'primary-container',
    isHighContrast ? lightScheme.primaryContainer : lightScheme.primaryPalette.tone(90),
    isHighContrast ? darkScheme.primaryContainer : darkScheme.primaryPalette.tone(30),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-primary-container',
    isHighContrast ? lightScheme.onPrimaryContainer : lightScheme.primaryPalette.tone(10),
    isHighContrast ? darkScheme.onPrimaryContainer : darkScheme.primaryPalette.tone(90),
  );
  css += createLightDarkVar(
    leftSpacing,
    'inverse-primary',
    lightScheme.inversePrimary,
    darkScheme.inversePrimary,
  );
  css += createLightDarkVar(
    leftSpacing,
    'primary-fixed',
    isHighContrast ? lightScheme.primaryFixed : lightScheme.primaryPalette.tone(90),
    isHighContrast ? darkScheme.primaryFixed : darkScheme.primaryPalette.tone(90),
  );
  css += createLightDarkVar(
    leftSpacing,
    'primary-fixed-dim',
    isHighContrast ? lightScheme.primaryFixedDim : lightScheme.primaryPalette.tone(80),
    isHighContrast ? darkScheme.primaryFixedDim : darkScheme.primaryPalette.tone(80),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-primary-fixed',
    lightScheme.onPrimaryFixed,
    darkScheme.onPrimaryFixed,
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-primary-fixed-variant',
    lightScheme.onPrimaryFixedVariant,
    darkScheme.onPrimaryFixedVariant,
  );

  // Set system variables with values from secondary palette
  css += '\n' + leftSpacing + '/* Secondary palette variables */\n';
  css += createLightDarkVar(
    leftSpacing,
    'secondary',
    isHighContrast ? lightScheme.secondary : lightScheme.secondaryPalette.tone(40),
    isHighContrast ? darkScheme.secondary : darkScheme.secondaryPalette.tone(80),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-secondary',
    isHighContrast ? lightScheme.onSecondary : lightScheme.secondaryPalette.tone(100),
    isHighContrast ? darkScheme.onSecondary : darkScheme.secondaryPalette.tone(20),
  );
  css += createLightDarkVar(
    leftSpacing,
    'secondary-container',
    isHighContrast ? lightScheme.secondaryContainer : lightScheme.secondaryPalette.tone(90),
    isHighContrast ? darkScheme.secondaryContainer : darkScheme.secondaryPalette.tone(30),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-secondary-container',
    isHighContrast ? lightScheme.onSecondaryContainer : lightScheme.secondaryPalette.tone(10),
    isHighContrast ? darkScheme.onSecondaryContainer : darkScheme.secondaryPalette.tone(90),
  );
  css += createLightDarkVar(
    leftSpacing,
    'secondary-fixed',
    isHighContrast ? lightScheme.secondaryFixed : lightScheme.secondaryPalette.tone(90),
    isHighContrast ? darkScheme.secondaryFixed : darkScheme.secondaryPalette.tone(90),
  );
  css += createLightDarkVar(
    leftSpacing,
    'secondary-fixed-dim',
    isHighContrast ? lightScheme.secondaryFixedDim : lightScheme.secondaryPalette.tone(80),
    isHighContrast ? darkScheme.secondaryFixedDim : darkScheme.secondaryPalette.tone(80),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-secondary-fixed',
    lightScheme.onSecondaryFixed,
    darkScheme.onSecondaryFixed,
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-secondary-fixed-variant',
    lightScheme.onSecondaryFixedVariant,
    darkScheme.onSecondaryFixedVariant,
  );

  // Set system variables with values from tertiary palette
  css += '\n' + leftSpacing + '/* Tertiary palette variables */\n';
  css += createLightDarkVar(
    leftSpacing,
    'tertiary',
    isHighContrast ? lightScheme.tertiary : lightScheme.tertiaryPalette.tone(40),
    isHighContrast ? darkScheme.tertiary : darkScheme.tertiaryPalette.tone(80),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-tertiary',
    isHighContrast ? lightScheme.onTertiary : lightScheme.tertiaryPalette.tone(100),
    isHighContrast ? darkScheme.onTertiary : darkScheme.tertiaryPalette.tone(20),
  );
  css += createLightDarkVar(
    leftSpacing,
    'tertiary-container',
    isHighContrast ? lightScheme.tertiaryContainer : lightScheme.tertiaryPalette.tone(90),
    isHighContrast ? darkScheme.tertiaryContainer : darkScheme.tertiaryPalette.tone(30),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-tertiary-container',
    isHighContrast ? lightScheme.onTertiaryContainer : lightScheme.tertiaryPalette.tone(10),
    isHighContrast ? darkScheme.onTertiaryContainer : darkScheme.tertiaryPalette.tone(90),
  );
  css += createLightDarkVar(
    leftSpacing,
    'tertiary-fixed',
    isHighContrast ? lightScheme.tertiaryFixed : lightScheme.tertiaryPalette.tone(90),
    isHighContrast ? darkScheme.tertiaryFixed : darkScheme.tertiaryPalette.tone(90),
  );
  css += createLightDarkVar(
    leftSpacing,
    'tertiary-fixed-dim',
    isHighContrast ? lightScheme.tertiaryFixedDim : lightScheme.tertiaryPalette.tone(80),
    isHighContrast ? darkScheme.tertiaryFixedDim : darkScheme.tertiaryPalette.tone(80),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-tertiary-fixed',
    lightScheme.onTertiaryFixed,
    darkScheme.onTertiaryFixed,
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-tertiary-fixed-variant',
    lightScheme.onTertiaryFixedVariant,
    darkScheme.onTertiaryFixedVariant,
  );

  // Set system variables with values from neutral palette
  css += '\n' + leftSpacing + '/* Neutral palette variables */\n';
  css += createLightDarkVar(
    leftSpacing,
    'background',
    lightScheme.background,
    darkScheme.background,
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-background',
    lightScheme.onBackground,
    darkScheme.onBackground,
  );
  css += createLightDarkVar(leftSpacing, 'surface', lightScheme.surface, darkScheme.surface);
  css += createLightDarkVar(
    leftSpacing,
    'surface-dim',
    lightScheme.surfaceDim,
    darkScheme.surfaceDim,
  );
  css += createLightDarkVar(
    leftSpacing,
    'surface-bright',
    lightScheme.surfaceBright,
    darkScheme.surfaceBright,
  );
  css += createLightDarkVar(
    leftSpacing,
    'surface-container-low',
    lightScheme.surfaceContainerLow,
    darkScheme.surfaceContainerLow,
  );
  css += createLightDarkVar(
    leftSpacing,
    'surface-container-lowest',
    lightScheme.surfaceContainerLowest,
    darkScheme.surfaceContainerLowest,
  );
  css += createLightDarkVar(
    leftSpacing,
    'surface-container',
    lightScheme.surfaceContainer,
    darkScheme.surfaceContainer,
  );
  css += createLightDarkVar(
    leftSpacing,
    'surface-container-high',
    lightScheme.surfaceContainerHigh,
    darkScheme.surfaceContainerHigh,
  );
  css += createLightDarkVar(
    leftSpacing,
    'surface-container-highest',
    lightScheme.surfaceContainerHighest,
    darkScheme.surfaceContainerHighest,
  );
  css += createLightDarkVar(leftSpacing, 'on-surface', lightScheme.onSurface, darkScheme.onSurface);
  css += createLightDarkVar(leftSpacing, 'shadow', lightScheme.shadow, darkScheme.shadow);
  css += createLightDarkVar(leftSpacing, 'scrim', lightScheme.scrim, darkScheme.scrim);
  css += createLightDarkVar(
    leftSpacing,
    'surface-tint',
    lightScheme.surfaceTint,
    darkScheme.surfaceTint,
  );
  css += createLightDarkVar(
    leftSpacing,
    'inverse-surface',
    lightScheme.inverseSurface,
    darkScheme.inverseSurface,
  );
  css += createLightDarkVar(
    leftSpacing,
    'inverse-on-surface',
    lightScheme.inverseOnSurface,
    darkScheme.inverseOnSurface,
  );
  css += createLightDarkVar(leftSpacing, 'outline', lightScheme.outline, darkScheme.outline);
  css += createLightDarkVar(
    leftSpacing,
    'outline-variant',
    lightScheme.outlineVariant,
    darkScheme.outlineVariant,
  );
  css += createLightDarkVar(
    leftSpacing,
    'neutral10',
    lightScheme.neutralPalette.tone(10),
    darkScheme.neutralPalette.tone(10),
    'Variable used for the form field native select option text color',
  );

  // Set system variables with values from error palette
  css += '\n' + leftSpacing + '/* Error palette variables */\n';
  css += createLightDarkVar(
    leftSpacing,
    'error',
    isHighContrast ? lightScheme.error : lightScheme.errorPalette.tone(40),
    isHighContrast ? darkScheme.error : darkScheme.errorPalette.tone(80),
  );
  css += createLightDarkVar(leftSpacing, 'on-error', lightScheme.onError, darkScheme.onError);
  css += createLightDarkVar(
    leftSpacing,
    'error-container',
    isHighContrast ? lightScheme.errorContainer : lightScheme.errorPalette.tone(90),
    isHighContrast ? darkScheme.errorContainer : darkScheme.errorPalette.tone(30),
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-error-container',
    isHighContrast ? lightScheme.onErrorContainer : lightScheme.errorPalette.tone(10),
    isHighContrast ? darkScheme.onErrorContainer : darkScheme.errorPalette.tone(90),
  );

  // Set system variables with values from neutral variant palette
  css += '\n' + leftSpacing + '/* Neutral variant palette variables */\n';
  css += createLightDarkVar(
    leftSpacing,
    'surface-variant',
    lightScheme.surfaceVariant,
    darkScheme.surfaceVariant,
  );
  css += createLightDarkVar(
    leftSpacing,
    'on-surface-variant',
    lightScheme.onSurfaceVariant,
    darkScheme.onSurfaceVariant,
  );
  css += createLightDarkVar(
    leftSpacing,
    'neutral-variant20',
    lightScheme.neutralVariantPalette.tone(20),
    darkScheme.neutralVariantPalette.tone(20),
    'Variable used for the sidenav scrim (container background shadow when opened)',
  );

  if (supportsDim) {
    css += '\n' + leftSpacing + '/* Dim color versions */\n';
    css += createLightDarkVar(
      leftSpacing,
      'primary-dim',
      lightScheme.primaryDim,
      darkScheme.primaryDim,
    );
    css += createLightDarkVar(
      leftSpacing,
      'secondary-dim',
      lightScheme.secondaryDim,
      darkScheme.secondaryDim,
    );
    css += createLightDarkVar(
      leftSpacing,
      'tertiary-dim',
      lightScheme.tertiaryDim,
      darkScheme.tertiaryDim,
    );
    css += createLightDarkVar(
      leftSpacing,
      'error-dim',
      lightScheme.errorDim,
      darkScheme.errorDim,
    );
  }

  return css;
}

// Gets CSS for typography system variables.
function getTypographySysVariablesCSS(): string {
  let css = '';

  // Define typography variables to be used in the different typeface system variables
  css += '\n  /* Typography variables. Only used in the different typescale system variables. */\n';
  css += '  --mat-sys-brand-font-family: Roboto; /* The font-family to use for brand text. */\n';
  css += '  --mat-sys-plain-font-family: Roboto; /* The font-family to use for plain text. */\n';
  css += '  --mat-sys-bold-font-weight: 700; /* The font-weight to use for bold text. */\n';
  css += '  --mat-sys-medium-font-weight: 500; /* The font-weight to use for medium text. */\n';
  css += '  --mat-sys-regular-font-weight: 400; /* The font-weight to use for regular text. */\n\n';

  css += '  /* Typescale variables. */\n';
  css +=
    '  /* Warning: Risk of reduced fidelity from using the composite typography tokens (ex. --mat-sys-body-large) since\n';
  css +=
    '     tracking cannot be represented in the "font" property shorthand. Consider using the discrete properties instead. */\n';

  // Body large typescale variables
  css +=
    '  --mat-sys-body-large: var(--mat-sys-body-large-weight) var(--mat-sys-body-large-size) / var(--mat-sys-body-large-line-height) var(--mat-sys-body-large-font);\n';
  css += '  --mat-sys-body-large-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-body-large-line-height: 1.5rem;\n';
  css += '  --mat-sys-body-large-size: 1rem;\n';
  css += '  --mat-sys-body-large-tracking: 0.031rem;\n';
  css += '  --mat-sys-body-large-weight: var(--mat-sys-regular-font-weight);\n';

  // Body medium typescale system variables
  css += '\n  /* Body medium typescale */\n';
  css +=
    '  --mat-sys-body-medium: var(--mat-sys-body-medium-weight) var(--mat-sys-body-medium-size) / var(--mat-sys-body-medium-line-height) var(--mat-sys-body-medium-font);\n';
  css += '  --mat-sys-body-medium-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-body-medium-line-height: 1.25rem;\n';
  css += '  --mat-sys-body-medium-size: 0.875rem;\n';
  css += '  --mat-sys-body-medium-tracking: 0.016rem;\n';
  css += '  --mat-sys-body-medium-weight: var(--mat-sys-regular-font-weight);\n';

  // Body small typescale system variables
  css += '\n  /* Body small typescale */\n';
  css +=
    '  --mat-sys-body-small: var(--mat-sys-body-small-weight) var(--mat-sys-body-small-size) / var(--mat-sys-body-small-line-height) var(--mat-sys-body-small-font);\n';
  css += '  --mat-sys-body-small-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-body-small-line-height: 1rem;\n';
  css += '  --mat-sys-body-small-size: 0.75rem;\n';
  css += '  --mat-sys-body-small-tracking: 0.025rem;\n';
  css += '  --mat-sys-body-small-weight: var(--mat-sys-regular-font-weight);\n';

  // Display large typescale system variables
  css += '\n  /* Display large typescale */\n';
  css +=
    '  --mat-sys-display-large: var(--mat-sys-display-large-weight) var(--mat-sys-display-large-size) / var(--mat-sys-display-large-line-height) var(--mat-sys-display-large-font);\n';
  css += '  --mat-sys-display-large-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-display-large-line-height: 4rem;\n';
  css += '  --mat-sys-display-large-size: 3.562rem;\n';
  css += '  --mat-sys-display-large-tracking: -0.016rem;\n';
  css += '  --mat-sys-display-large-weight: var(--mat-sys-regular-font-weight);\n';

  // Display medium typescale system variables
  css += '\n  /* Display medium typescale */\n';
  css +=
    '  --mat-sys-display-medium: var(--mat-sys-display-medium-weight) var(--mat-sys-display-medium-size) / var(--mat-sys-display-medium-line-height) var(--mat-sys-display-medium-font);\n';
  css += '  --mat-sys-display-medium-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-display-medium-line-height: 3.25rem;\n';
  css += '  --mat-sys-display-medium-size: 2.812rem;\n';
  css += '  --mat-sys-display-medium-tracking: 0;\n';
  css += '  --mat-sys-display-medium-weight: var(--mat-sys-regular-font-weight);\n';

  // Display small typescale system variables
  css += '\n  /* Display small typescale */\n';
  css +=
    '  --mat-sys-display-small: var(--mat-sys-display-small-weight) var(--mat-sys-display-small-size) / var(--mat-sys-display-small-line-height) var(--mat-sys-display-small-font);\n';
  css += '  --mat-sys-display-small-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-display-small-line-height: 2.75rem;\n';
  css += '  --mat-sys-display-small-size: 2.25rem;\n';
  css += '  --mat-sys-display-small-tracking: 0;\n';
  css += '  --mat-sys-display-small-weight: var(--mat-sys-regular-font-weight);\n';

  // Headline large typescale system variables
  css += '\n  /* Headline large typescale */\n';
  css +=
    '  --mat-sys-headline-large: var(--mat-sys-headline-large-weight) var(--mat-sys-headline-large-size) / var(--mat-sys-headline-large-line-height) var(--mat-sys-headline-large-font);\n';
  css += '  --mat-sys-headline-large-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-headline-large-line-height: 2.5rem;\n';
  css += '  --mat-sys-headline-large-size: 2rem;\n';
  css += '  --mat-sys-headline-large-tracking: 0;\n';
  css += '  --mat-sys-headline-large-weight: var(--mat-sys-regular-font-weight);\n';

  // Headline medium typescale system variables
  css += '\n  /* Headline medium typescale */\n';
  css +=
    '  --mat-sys-headline-medium: var(--mat-sys-headline-medium-weight) var(--mat-sys-headline-medium-size) / var(--mat-sys-headline-medium-line-height) var(--mat-sys-headline-medium-font);\n';
  css += '  --mat-sys-headline-medium-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-headline-medium-line-height: 2.25rem;\n';
  css += '  --mat-sys-headline-medium-size: 1.75rem;\n';
  css += '  --mat-sys-headline-medium-tracking: 0;\n';
  css += '  --mat-sys-headline-medium-weight: var(--mat-sys-regular-font-weight);\n';

  // Headline small typescale system variables
  css += '\n  /* Headline small typescale */\n';
  css +=
    '  --mat-sys-headline-small: var(--mat-sys-headline-small-weight) var(--mat-sys-headline-small-size) / var(--mat-sys-headline-small-line-height) var(--mat-sys-headline-small-font);\n';
  css += '  --mat-sys-headline-small-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-headline-small-line-height: 2rem;\n';
  css += '  --mat-sys-headline-small-size: 1.5rem;\n';
  css += '  --mat-sys-headline-small-tracking: 0;\n';
  css += '  --mat-sys-headline-small-weight: var(--mat-sys-regular-font-weight);\n';

  // Label large typescale system variables
  css += '\n  /* Label large typescale */\n';
  css +=
    '  --mat-sys-label-large: var(--mat-sys-label-large-weight) var(--mat-sys-label-large-size) / var(--mat-sys-label-large-line-height) var(--mat-sys-label-large-font);\n';
  css += '  --mat-sys-label-large-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-label-large-line-height: 1.25rem;\n';
  css += '  --mat-sys-label-large-size: 0.875rem;\n';
  css += '  --mat-sys-label-large-tracking: 0.006rem;\n';
  css += '  --mat-sys-label-large-weight: var(--mat-sys-medium-font-weight);\n';
  css += '  --mat-sys-label-large-weight-prominent: var(--mat-sys-bold-font-weight);\n';

  // Label medium typescale system variables
  css += '\n  /* Label medium typescale */\n';
  css +=
    '  --mat-sys-label-medium: var(--mat-sys-label-medium-weight) var(--mat-sys-label-medium-size) / var(--mat-sys-label-medium-line-height) var(--mat-sys-label-medium-font);\n';
  css += '  --mat-sys-label-medium-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-label-medium-line-height: 1rem;\n';
  css += '  --mat-sys-label-medium-size: 0.75rem;\n';
  css += '  --mat-sys-label-medium-tracking: 0.031rem;\n';
  css += '  --mat-sys-label-medium-weight: var(--mat-sys-medium-font-weight);\n';
  css += '  --mat-sys-label-medium-weight-prominent: var(--mat-sys-bold-font-weight);\n';

  // Label small typescale system variables
  css += '\n  /* Label small typescale */\n';
  css +=
    '  --mat-sys-label-small: var(--mat-sys-label-small-weight) var(--mat-sys-label-small-size) / var(--mat-sys-label-small-line-height) var(--mat-sys-label-small-font);\n';
  css += '  --mat-sys-label-small-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-label-small-line-height: 1rem;\n';
  css += '  --mat-sys-label-small-size: 0.688rem;\n';
  css += '  --mat-sys-label-small-tracking: 0.031rem;\n';
  css += '  --mat-sys-label-small-weight: var(--mat-sys-medium-font-weight);\n';

  // Title large typescale system variables
  css += '\n  /* Title large typescale */\n';
  css +=
    '  --mat-sys-title-large: var(--mat-sys-title-large-weight) var(--mat-sys-title-large-size) / var(--mat-sys-title-large-line-height) var(--mat-sys-title-large-font);\n';
  css += '  --mat-sys-title-large-font: var(--mat-sys-brand-font-family);\n';
  css += '  --mat-sys-title-large-line-height: 1.75rem;\n';
  css += '  --mat-sys-title-large-size: 1.375rem;\n';
  css += '  --mat-sys-title-large-tracking: 0;\n';
  css += '  --mat-sys-title-large-weight: var(--mat-sys-regular-font-weight);\n';

  // Title medium typescale system variables
  css += '\n  /* Title medium typescale */\n';
  css +=
    '  --mat-sys-title-medium: var(--mat-sys-title-medium-weight) var(--mat-sys-title-medium-size) / var(--mat-sys-title-medium-line-height) var(--mat-sys-title-medium-font);\n';
  css += '  --mat-sys-title-medium-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-title-medium-line-height: 1.5rem;\n';
  css += '  --mat-sys-title-medium-size: 1rem;\n';
  css += '  --mat-sys-title-medium-tracking: 0.009rem;\n';
  css += '  --mat-sys-title-medium-weight: var(--mat-sys-medium-font-weight);\n';

  // Title small typescale system variables
  css += '\n  /* Title small typescale */\n';
  css +=
    '  --mat-sys-title-small: var(--mat-sys-title-small-weight) var(--mat-sys-title-small-size) / var(--mat-sys-title-small-line-height) var(--mat-sys-title-small-font);\n';
  css += '  --mat-sys-title-small-font: var(--mat-sys-plain-font-family);\n';
  css += '  --mat-sys-title-small-line-height: 1.25rem;\n';
  css += '  --mat-sys-title-small-size: 0.875rem;\n';
  css += '  --mat-sys-title-small-tracking: 0.006rem;\n';
  css += '  --mat-sys-title-small-weight: var(--mat-sys-medium-font-weight);\n';

  return css;
}

// Gets CSS for elevation system variables.
function getElevationSysVariablesCSS(): string {
  let css = '';

  css += '\n  /* Box shadow colors. Only used in the elevation level system variables. */\n';
  css += '  --mat-sys-umbra-color: color-mix(in srgb, var(--mat-sys-shadow), transparent 80%);\n';
  css +=
    '  --mat-sys-penumbra-color: color-mix(in srgb, var(--mat-sys-shadow), transparent 86%);\n';
  css += '  --mat-sys-ambient-color: color-mix(in srgb, var(--mat-sys-shadow), transparent 88%);\n';

  css +=
    '\n  /* Elevation level system variables. These are used as the value for box-shadow CSS property. */\n';
  css +=
    '  --mat-sys-level0: 0px 0px 0px 0px var(--mat-sys-umbra-color), 0px 0px 0px 0px var(--mat-sys-penumbra-color), 0px 0px 0px 0px var(--mat-sys-ambient-color);\n';
  css +=
    '  --mat-sys-level1: 0px 2px 1px -1px var(--mat-sys-umbra-color), 0px 1px 1px 0px var(--mat-sys-penumbra-color), 0px 1px 3px 0px var(--mat-sys-ambient-color);\n';
  css +=
    '  --mat-sys-level2: 0px 3px 3px -2px var(--mat-sys-umbra-color), 0px 3px 4px 0px var(--mat-sys-penumbra-color), 0px 1px 8px 0px var(--mat-sys-ambient-color);\n';
  css +=
    '  --mat-sys-level3: 0px 3px 5px -1px var(--mat-sys-umbra-color), 0px 6px 10px 0px var(--mat-sys-penumbra-color), 0px 1px 18px 0px var(--mat-sys-ambient-color);\n';
  css +=
    '  --mat-sys-level4: 0px 5px 5px -3px var(--mat-sys-umbra-color), 0px 8px 10px 1px var(--mat-sys-penumbra-color), 0px 3px 14px 2px var(--mat-sys-ambient-color);\n';
  css +=
    '  --mat-sys-level5: 0px 7px 8px -4px var(--mat-sys-umbra-color), 0px 12px 17px 2px var(--mat-sys-penumbra-color), 0px 5px 22px 4px var(--mat-sys-ambient-color);\n';

  return css;
}

// Gets CSS for shape system variables.
function getShapeSysVariablesCSS(): string {
  let css = '';
  css += '  --mat-sys-corner-extra-large: 28px;\n';
  css += '  --mat-sys-corner-extra-large-top: 28px 28px 0 0;\n';
  css += '  --mat-sys-corner-extra-small: 4px;\n';
  css += '  --mat-sys-corner-extra-small-top: 4px 4px 0 0;\n';
  css += '  --mat-sys-corner-full: 9999px;\n';
  css += '  --mat-sys-corner-large: 16px;\n';
  css += '  --mat-sys-corner-large-end: 0 16px 16px 0;\n';
  css += '  --mat-sys-corner-large-start: 16px 0 0 16px;\n';
  css += '  --mat-sys-corner-large-top: 16px 16px 0 0;\n';
  css += '  --mat-sys-corner-medium: 12px;\n';
  css += '  --mat-sys-corner-none: 0;\n';
  css += '  --mat-sys-corner-small: 8px;\n';
  return css;
}

// Gets CSS for state system variables.
function getStateSysVariablesCSS(): string {
  let css = '';
  css += '  --mat-sys-dragged-state-layer-opacity: 0.16;\n';
  css += '  --mat-sys-focus-state-layer-opacity: 0.12;\n';
  css += '  --mat-sys-hover-state-layer-opacity: 0.08;\n';
  css += '  --mat-sys-pressed-state-layer-opacity: 0.12;\n';
  return css;
}

// Gets CSS for all system variables.
function getAllSysVariablesCSS(
  lightColorScheme: DynamicScheme,
  darkColorScheme: DynamicScheme,
  supportsDim: boolean
): string {
  let css = '';

  css += '  /* COLOR SYSTEM VARIABLES */\n';
  css += '  color-scheme: light;\n\n';
  css += getColorSysVariablesCSS(lightColorScheme, darkColorScheme, supportsDim);

  css += '\n  /* TYPOGRAPHY SYSTEM VARIABLES */\n';
  css += getTypographySysVariablesCSS();

  css += '\n  /* ELEVATION SYSTEM VARIABLES */\n';
  css += getElevationSysVariablesCSS();

  css += '\n  /* SHAPE SYSTEM VARIABLES */\n';
  css += getShapeSysVariablesCSS();

  css += '\n  /* STATE SYSTEM VARIABLES */\n';
  css += getStateSysVariablesCSS();

  return css;
}

// Gets CSS for high contrast color values to be automatically used when users specify.
function getHighContrastOverridesCSS(
  lightColorScheme: DynamicScheme,
  darkColorScheme: DynamicScheme,
  supportsDim: boolean
): string {
  let css = '\n';
  css += '  @media (prefers-contrast: more) {\n';
  css += getColorSysVariablesCSS(lightColorScheme, darkColorScheme, supportsDim, /* isHighContrast */ true);
  css += '  }\n';
  return css;
}
