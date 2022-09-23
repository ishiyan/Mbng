import { Bar } from '../../../data/entities/bar';
import { barComponentValue } from '../../../data/entities/bar-component';
import { BarComponent } from '../../../data/entities/bar-component.enum';
import { Quote } from '../../../data/entities/quote';
import { quoteComponentValue } from '../../../data/entities/quote-component';
import { QuoteComponent } from '../../../data/entities/quote-component.enum';
import { Scalar } from '../../../data/entities/scalar';
import { Trade } from '../../../data/entities/trade';
import { IndicatorMetadata } from './indicator-metadata.interface';
import { IndicatorOutput } from './indicator-output';
import { IndicatorOutputType } from './indicator-output-type.enum';
import { IndicatorType } from './indicator-type.enum';
import { Indicator } from './indicator.interface';

/** Implements Instrument interface for a line indicator. */
export abstract class LineIndicator implements Indicator {

  private barComponentFunc!: ((bar: Bar) => number);
  private quoteComponentFunc!: ((quote: Quote) => number);

  protected type!: IndicatorType;
  protected name!: string;
  protected description!: string;
  protected primed!: boolean;

  protected set barComponent(component: BarComponent) {
    this.barComponentFunc = barComponentValue(component);
  }

  protected set quoteComponent(component: QuoteComponent) {
    this.quoteComponentFunc = quoteComponentValue(component);
  }

  /** The name of the indicator. */
  public getName(): string { return this.name; }

  /** The description of the indicator. */
  public getDescription(): string { return this.name; }

  /** Indicates whether an indicator is primed. */
  public isPrimed(): boolean { return this.primed; }

  /** Describes a requested output data of an indicator. */
  public metadata(): IndicatorMetadata {
    return {
      type: this.type,
      outputs: [{kind: 0, type: IndicatorOutputType.Scalar, name: this.name, description: this.description }]
    };
  }

  /** Updates the value of the indicator given the next sample. */
  public abstract update(sample: number): number;

  /** Updates an indicator given the next scalar sample. */
  public updateScalar(sample: Scalar): IndicatorOutput {
    const scalar = new Scalar();
    scalar.time = sample.time;
    scalar.value = this.update(sample.value);
    return [scalar];
  }

  /** Updates an indicator given the next bar sample. */
  public updateBar(sample: Bar): IndicatorOutput {
    const scalar = new Scalar();
    scalar.time = sample.time;
    scalar.value = this.update(this.barComponentFunc(sample));
    return [scalar];
  }

  /** Updates an indicator given the next quote sample. */
  public updateQuote(sample: Quote): IndicatorOutput {
    const scalar = new Scalar();
    scalar.time = sample.time;
    scalar.value = this.update(this.quoteComponentFunc(sample));
    return [scalar];
  }

  /** Updates an indicator given the next trade sample. */
  public updateTrade(sample: Trade): IndicatorOutput {
    const scalar = new Scalar();
    scalar.time = sample.time;
    scalar.value = this.update(sample.price);
    return [scalar];
  }

  /** Updates the value of the line indicator given an array of scalar samples. */
  public updateScalars(array: Scalar[]): Scalar[] {
    const scalars: Scalar[] = [];
    for (const element of array) {
      const scalar = new Scalar();
      scalar.time = element.time;
      scalar.value = this.update(element.value);
      scalars.push(scalar);
    }

    return scalars;
  }

  /** Updates the value of the line indicator given an array of bar samples. */
  public updateBars(bars: Bar[]): Scalar[] {
    const scalars: Scalar[] = [];
    for (const bar of bars) {
      const scalar = new Scalar();
      scalar.time = bar.time;
      scalar.value = this.update(this.barComponentFunc(bar));
      scalars.push(scalar);
    }

    return scalars;
  }

  /** Updates the value of the line indicator given an array of quote samples. */
  public updateQuotes(quotes: Quote[]): Scalar[] {
    const scalars: Scalar[] = [];
    for (const quote of quotes) {
      const scalar = new Scalar();
      scalar.time = quote.time;
      scalar.value = this.update(this.quoteComponentFunc(quote));
      scalars.push(scalar);
    }

    return scalars;
  }

  /** Updates the value of the line indicator given an array of trade samples. */
  public updateTrades(trades: Trade[]): Scalar[] {
    const scalars: Scalar[] = [];
    for (const trade of trades) {
      const scalar = new Scalar();
      scalar.time = trade.time;
      scalar.value = this.update(trade.price);
      scalars.push(scalar);
    }

    return scalars;
  }
}
