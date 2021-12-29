import { CurrencyCode } from '../../currencies/currency-code.enum';

/** An additional information for funds. */
export class Fund {
  /** A currency code. */
  currency!: CurrencyCode;

  /** A trading mode. */
  tradingMode?: string;

  /** An ISO 10962 *Classification of Financial Instruments* code. */
  cfi?: string;

  /** An issuer. */
  issuer?: string;

  /** A number of shares outstanding. */
  sharesOutstanding?: number;

  constructor(data?: Fund) {
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
    data['Issuer'] = this.issuer;
    data['SharesOutstanding'] = this.sharesOutstanding;
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
