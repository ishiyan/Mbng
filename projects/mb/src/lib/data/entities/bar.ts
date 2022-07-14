/** An [open, high, low, close, volume] bar. */
export class Bar {
  /** The date and time.
   *
   * For _ohlcv_ bar entities it corresponds to the closing time, so that an _ohlcv_ bar accumulates lower-level entities
   * up to the closing date and time.
   */
  time!: Date;

  /** The opening price. */
  open!: number;

  /** The highest price. */
  high!: number;

  /** The lowest price. */
  low!: number;

  /** The closing price. */
  close!: number;

  /** The volume. */
  volume!: number;

  constructor(data?: any) {
    if (data) {
      for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
          (this as any)[property] = data[property];
        }
      }
    }
  }
}
