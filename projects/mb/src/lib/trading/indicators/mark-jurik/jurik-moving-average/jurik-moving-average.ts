import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { JurikMovingAverageParams } from './jurik-moving-average-params.interface';

/** Function to calculate mnemonic of a __JurikMovingAverage__ indicator. */
export const jurikMovingAverageMnemonic = (params: JurikMovingAverageParams): string =>
  'jma('.concat(
    params.length.toString(),
    ', ',
    params.phase.toString(),
    componentPairMnemonic(params.barComponent, params.quoteComponent),
    ')');

/** Jurik Moving Average line indicator. */
export class JurikMovingAverage extends LineIndicator {


  private window: Array<number>;
  private windowLength: number;
  private windowSum: number;
  private windowCount: number;
  private lastIndex: number;

  /**
   * Constructs an instance given a length in samples.
   * The length should be an integer greater than 1.
   **/
  public constructor(params: JurikMovingAverageParams){
    super();
    const length = Math.floor(params.length);
    if (length < 2) {
      throw new Error('length should be greater than 1');
    }

    this.mnemonic = jurikMovingAverageMnemonic(params);
    this.window = new Array<number>(length);
    this.windowLength = length;
    this.windowSum = 0;
    this.windowCount = 0;
    this.lastIndex = length - 1;
    this.primed = false;
  }

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
