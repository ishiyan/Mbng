import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { T2ExponentialMovingAverageLengthParams } from './t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageSmoothingFactorParams } from './t2-exponential-moving-average-params.interface';

const guardLength = (object: any): object is T2ExponentialMovingAverageLengthParams => 'length' in object;

/** Function to calculate mnemonic of an __T2ExponentialMovingAverage__ indicator. */
export const t2ExponentialMovingAverageMnemonic =
  (params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams): string => {
  if (guardLength(params)) {
    const p = params as T2ExponentialMovingAverageLengthParams;
    return 't2ema('.concat(Math.floor(p.length).toString(), ', ', p.vFactor.toFixed(3), p.firstIsAverage ? ', sma' : '',
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  } else {
    const p = params as T2ExponentialMovingAverageSmoothingFactorParams;
    return 't2ema('.concat(p.smoothingFactor.toFixed(3), ', ', p.vFactor.toFixed(3),
      componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
  }
};

/** __T2 Exponential Moving Average__ line indicator computes the xxx, moving average (_T2EMA_).
 *
 */
export class T2ExponentialMovingAverage extends LineIndicator {
  private readonly smoothingFactor: number;
  private readonly firstIsAverage: boolean;
  private readonly length: number;
  private readonly length2: number;
  private readonly length3: number;
  private readonly length4: number;
  private readonly length5: number;
  private readonly length6: number;
  private readonly c1: number;
  private readonly c2: number;
  private readonly c3: number;
  private readonly c4: number;
  private count = 0;
  private e1 = 0;
  private e2 = 0;
  private e3 = 0;
  private e4 = 0;
  private e5 = 0;
  private e6 = 0;

  /**
   * Constructs an instance given a length in samples or a smoothing factor in (0, 1).
   **/
  public constructor(params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams){
    super();
    let len;
    let v;
    if (guardLength(params)) {
      const p = params as T2ExponentialMovingAverageLengthParams;
      len = Math.floor(p.length);
      if (len < 2) {
        throw new Error('length should be greater than 1');
      }

      v = p.vFactor;
      if (v < 0 || v > 1) {
        throw new Error('v-factor should be in range [0, 1]');
      }

      this.firstIsAverage = p.firstIsAverage;
      this.length = len;
      this.smoothingFactor = 2 / (len + 1);
    } else {
      const p = params as T2ExponentialMovingAverageSmoothingFactorParams;
      if (p.smoothingFactor <= 0 || p.smoothingFactor >= 1) {
        throw new Error('smoothing factor should be in range (0, 1)');
      }

      v = p.vFactor;
      if (v < 0 || v > 1) {
        throw new Error('v-factor should be in range [0, 1]');
      }

      this.firstIsAverage = false;
      this.smoothingFactor = p.smoothingFactor;
      this.length = Math.round(2 / this.smoothingFactor) - 1;
    }

    const v2 = v * v;
    this.c1 = -v2 * v;
    this.c2 = 3 * (v2 - this.c1);
    this.c3 = -6 * v2 - 3 * (v - this.c1);
    this.c4 = 1 + 3 * v - this.c1 + 3 * v2;

    const l = this.length;
    this.length2 = l * 2 - 1;
    this.length3 = l * 3 - 2;
    this.length4 = l * 4 - 3;
    this.length5 = l * 5 - 4;
    this.length6 = l * 6 - 5;

    this.mnemonic = t2ExponentialMovingAverageMnemonic(params);
    this.primed = false;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    const sf = this.smoothingFactor;
    const omsf = 1 - sf;
    if (this.primed) {      
      this.e1 = sf * sample + omsf * this.e1;
      this.e2 = sf * this.e1 + omsf * this.e2;
      this.e3 = sf * this.e2 + omsf * this.e3;
      this.e4 = sf * this.e3 + omsf * this.e4;
      this.e5 = sf * this.e4 + omsf * this.e5;
      this.e6 = sf * this.e5 + omsf * this.e6;
      return this.c1 * this.e6 + this.c2 * this.e5 + this.c3 * this.e4 + this.c4 * this.e3;
    } else { // Not primed.
      if (this.firstIsAverage) {
        if (this.length > this.count) {
          this.e1 += sample;
          if (this.length === ++this.count) {
            this.e1 /= this.length;
            this.e2 = this.e1;
          }
        } else if (this.length2 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 += this.e1;
          if (this.length2 === ++this.count) {
            this.e2 /= this.length;
            this.e3 = this.e2;
          }
        } else if (this.length3 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 += this.e2;
          if (this.length3 === ++this.count) {
            this.e3 /= this.length;
            this.e4 = this.e3;
          }
        } else if (this.length4 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          this.e4 += this.e3;
          if (this.length4 === ++this.count) {
            this.e4 /= this.length;
            this.e5 = this.e4;
          }
        } else if (this.length5 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          this.e4 = sf * this.e3 + omsf * this.e4;
          this.e5 += this.e4;
          if (this.length5 === ++this.count) {
            this.e5 /= this.length;
            this.e6 = this.e5;
          }
        } else {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          this.e4 = sf * this.e3 + omsf * this.e4;
          this.e5 = sf * this.e4 + omsf * this.e5;
          this.e6 += this.e5;
          if (this.length6 === ++this.count) {
            this.primed = true;
            this.e5 /= this.length;
            return this.c1 * this.e6 + this.c2 * this.e5 + this.c3 * this.e4 + this.c4 * this.e3;
          }
        }
      } else { // firstIsAverage is false.
        if (this.length > this.count) {
          if (1 === ++this.count) {
            this.e1 = sample;
          } else {
            this.e1 = sf * sample + omsf * this.e1;
            if (this.length === this.count) {
              this.e2 = this.e1;
            }
          }
        } else if (this.length2 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          if (this.length2 === ++this.count) {
            this.e3 = this.e2;
          }
        } else if (this.length3 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          if (this.length3 === ++this.count) {
            this.e4 = this.e3;
          }
        } else if (this.length4 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          this.e4 = sf * this.e3 + omsf * this.e4;
          if (this.length4 === ++this.count) {
            this.e5 = this.e4;
          }
        } else if (this.length5 > this.count) {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          this.e4 = sf * this.e3 + omsf * this.e4;
          this.e5 = sf * this.e4 + omsf * this.e5;
          if (this.length5 === ++this.count) {
            this.e6 = this.e5;
          }
        } else {
          this.e1 = sf * sample + omsf * this.e1;
          this.e2 = sf * this.e1 + omsf * this.e2;
          this.e3 = sf * this.e2 + omsf * this.e3;
          this.e4 = sf * this.e3 + omsf * this.e4;
          this.e5 = sf * this.e4 + omsf * this.e5;
          this.e6 = sf * this.e5 + omsf * this.e6;
          if (this.length6 === ++this.count) {
            this.primed = true;
            return this.c1 * this.e6 + this.c2 * this.e5 + this.c3 * this.e4 + this.c4 * this.e3;
          }
        }
      }  
    }

    return Number.NaN;
  }
}
