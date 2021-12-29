import { CurrencyCode } from '../../currencies/currency-code.enum';

/** An additional information for stocks. */
export class Stock {
  /** A currency code. */
  currency!: CurrencyCode;
  /** A trading mode. */
  tradingMode?: string;
  /** An ISO 10962 *Classification of Financial Instruments* code. */
  cfi?: string;
  /** An Industry Classification Benchmark code. */
  icb?: string;
  /** A number of shares outstanding. */
  sharesOutstanding?: number | undefined;

  constructor(data?: Stock) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    /* eslint-disable @typescript-eslint/dot-notation */
    data['Currency'] = this.currency;
    data['TradingMode'] = this.tradingMode;
    data['Cfi'] = this.cfi;
    data['Icb'] = this.icb;
    data['SharesOutstanding'] = this.sharesOutstanding;
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
