import { CurrencyCode } from '../../currencies/currency-code.enum';

/** An additional information for Exchange-Traded Vehicles. */
export class Etv {
  /** A currency code. */
  currency!: CurrencyCode;

  /** A trading mode. */
  tradingMode?: string;

  /** All-in fees. */
  allInFees?: string;

  /** An expence ratio percentage. */
  expenseRatio?: string;

  /** A dividend frequency. */
  dividendFrequency?: string;

  /** An issuer. */
  issuer?: string;

  /** A number of shares outstanding. */
  sharesOutstanding?: number;

  constructor(data?: Etv) {
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
    data['AllInFees'] = this.allInFees;
    data['ExpenseRatio'] = this.expenseRatio;
    data['DividendFrequency'] = this.dividendFrequency;
    data['Issuer'] = this.issuer;
    data['SharesOutstanding'] = this.sharesOutstanding;
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
