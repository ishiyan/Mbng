/** Enumerates indicator types. */
export enum IndicatorType {

  /** Identifies the __Simple Moving Average__ (SMA) indicator. */
  SimpleMovingAverage,

  /** Identifies the __Weighted Moving Average__ (WMA) indicator. */
  WeightedMovingAverage,

  /** Identifies the __Triangular Moving Average__ (TRIMA) indicator. */
  TriangularMovingAverage,

  /** Identifies the __Exponential Moving Average__ (EMA) indicator. */
  ExponentialMovingAverage,

  /** Identifies the __Double Exponential Moving Average__ (DEMA) indicator. */
  DoubleExponentialMovingAverage,

  /** Identifies the __Triple Exponential Moving Average__ (TEMA) indicator. */
  TripleExponentialMovingAverage,

  /** Identifies the __T3 Exponential Moving Average__ (T3EMA) indicator. */
  T3ExponentialMovingAverage,

  /** Identifies the __Kaufman Adaptive Moving Average__ (KAMA) indicator. */
  KaufmanAdaptiveMovingAverage,

	/** Identifies the __Jurik Moving Average__ (JMA) indicator. */
	JurikMovingAverage,

	/** Identifies the Ehler's __MESA Adaptive Moving Average__ (MAMA) indicator. */
	MesaAdaptiveMovingAverage,

	/** Identifies the Ehler's __Fractal Adaptive Moving Average__ (FRAMA) indicator. */
	FractalAdaptiveMovingAverage,

  /** Identifies the __Bollinger Bands__ (BB) indicator. */
  BollingerBands,

  /** Identifies the __Variance__ (VAR) indicator. */
  Variance,

  /** Identifies the __Standard Deviation__ (STDEV) indicator. */
  StandardDeviation,

  /** Identifies the __Goertzel power spectrum__ (GOERTZEL) indicator. */
  GoertzelSpectrum
}
