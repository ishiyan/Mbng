/** Enumerates indicator output types. */
export enum IndicatorOutputType {

  /** Holds a single value. */
  Scalar = 'scalar',

  /** Holds two values representing lower and upper lines of a band. */
  Band = 'band',

  /** Holds an array of values representing a heat-map column. */
  HeatMap = 'heatmap'
}
