export class SimpleMovingAverage {
  private name: string;
  private window: Array<number>;
  private windowLength: number;
  private windowSum: number;
  private windowCount: number;
  private lastIndex: number;
  private primed: boolean;

  /**
   * Constructs an instance given a length in samples.
   * Th length should be an integer greater than 1.
   **/
  public constructor(length: number){
    length = Math.floor(length);
    if (length < 2) {
      throw new Error('length should be greater than 1');
    }

    this.name = 'sma('.concat(length.toString(), ')');
    this.window = new Array<number>(length);
    this.windowLength = length;
    this.windowSum = 0;
    this.windowCount = 0;
    this.lastIndex = length - 1;
    this.primed = false;
  }

  /** The name of the indicator. */
  public getName(): string { return this.name; }

  /** Indicates whether the indicator is primed. */
  public isPrimed(): boolean { return this.primed; }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    if (this.primed) {
      this.windowSum += sample - this.window[0];
      for (let i = 0; i < this.lastIndex; i++) {
        this.window[i] = this.window[i+1];
      }

      this.window[this.lastIndex] = sample;
    } else {
      this.windowSum += sample;
      this.window[this.windowCount] = sample;
      this.windowCount++;

      if (this.windowLength > this.windowCount) {
        return Number.NaN;
      }

      this.primed = true;
    }

    return this.windowSum / this.windowLength;
  }
}
