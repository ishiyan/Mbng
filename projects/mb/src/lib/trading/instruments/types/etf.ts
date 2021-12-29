import { CurrencyCode } from '../../currencies/currency-code.enum';
import { InstrumentReference } from './instrument-reference';

/** An additional information for Exchange-Traded Funds. */
export class Etf {
  /** A currency code. */
  currency!: CurrencyCode;

  /** A trading mode. */
  tradingMode?: string;

  /** An ISO 10962 *Classification of Financial Instruments* code. */
  cfi?: string;

  /** A dividend frequency. */
  dividendFrequency?: string;

  /** An exposition type. */
  expositionType?: string;

  /** A fraction. */
  fraction?: string;

  /** A total expence ratio percentage. */
  totalExpenseRatio?: string;

  /** An index family. */
  indexFamily?: string;

  /** A launch date. */
  launchDate?: string;

  /** An issuer. */
  issuer?: string;

  /** An *Indicative Net Asset Value* instrument reference. */
  inav?: InstrumentReference;

  /** Gets or sets an underlying instrument reference. */
  underlying?: InstrumentReference;

  constructor(data?: Etf) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
      this.inav = data.inav && !(data.inav as any).toJSON ? new InstrumentReference(data.inav) : (this.inav as InstrumentReference);
      this.underlying = data.underlying && !(data.underlying as any).toJSON ? new InstrumentReference(data.underlying) :
        (this.underlying as InstrumentReference);
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    /* eslint-disable @typescript-eslint/dot-notation */
    data['Currency'] = this.currency;
    data['TradingMode'] = this.tradingMode;
    data['Cfi'] = this.cfi;
    data['DividendFrequency'] = this.dividendFrequency;
    data['ExpositionType'] = this.expositionType;
    data['Fraction'] = this.fraction;
    data['TotalExpenseRatio'] = this.totalExpenseRatio;
    data['IndexFamily'] = this.indexFamily;
    data['LaunchDate'] = this.launchDate;
    data['Issuer'] = this.issuer;
    data['Inav'] = this.inav ? this.inav.toJSON() : (undefined as any);
    data['Underlying'] = this.underlying ? this.underlying.toJSON() : (undefined as any);
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
