import { Variant } from '@ktibow/material-color-utilities-nightly';

// https://github.com/material-foundation/material-color-utilities/tree/main/typescript

export enum DynamicThemingVariant {
  /** A Dynamic Color theme that is grayscale. */
  Monochrome = Variant.MONOCHROME,
  /** A Dynamic Color theme that is near grayscale. */
  Neutral = Variant.NEUTRAL,
  /**
  * A Dynamic Color theme with low to medium colorfulness and a Tertiary
  * TonalPalette with a hue related to the source color.
  *
  * The default Material You theme on Android 12 and 13.
  */
  TonalSpot = Variant.TONAL_SPOT,  
  /**
  * A Dynamic Color theme that maxes out colorfulness at each position in the
  * Primary Tonal Palette.
  */
  Vibrant = Variant.VIBRANT,
  /**
  * A Dynamic Color theme that is intentionally detached from the source color.
  */
  Expressive = Variant.EXPRESSIVE,
  /**
  * A scheme that places the source color in `Scheme.primaryContainer`.
  *
  * Primary Container is the source color, adjusted for color relativity.
  * It maintains constant appearance in light mode and dark mode.
  * This adds ~5 tone in light mode, and subtracts ~5 tone in dark mode.
  * Tertiary Container is the complement to the source color, using
  * `TemperatureCache`. It also maintains constant appearance.
  */
  Fidelity = Variant.FIDELITY,
  /**
  * A scheme that places the source color in `Scheme.primaryContainer`.
  *
  * Primary Container is the source color, adjusted for color relativity.
  * It maintains constant appearance in light mode and dark mode.
  * This adds ~5 tone in light mode, and subtracts ~5 tone in dark mode.
  * Tertiary Container is the complement to the source color, using
  * `TemperatureCache`. It also maintains constant appearance.
  */
  Content = Variant.CONTENT,
  /**
  * A playful theme - the source color's hue does not appear in the theme.
  */
  Rainbow = Variant.RAINBOW,
  /**
  * A playful theme - the source color's hue does not appear in the theme.
  */
  FruitSalad = Variant.FRUIT_SALAD
}