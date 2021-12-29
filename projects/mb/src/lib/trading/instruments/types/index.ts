import { CurrencyCode } from '../../currencies/currency-code.enum';

/** An additional information for indices. */
export class Index {
  /** A currency code. */
  currency!: CurrencyCode;

  /** A kind of an index. */
  kind?: string;

  /** A family of an index. */
  family?: string;

  /** A calculation frequency of an index. */
  calculationFrequency?: string;

  /** A weighting of an index. */
  weighting?: string;

  /** A capping factor of an index. */
  cappingFactor?: string;

  /** An Industry Classification Benchmark code. */
  icb?: string;

  /** A base date of an index. */
  baseDate?: string;

  /** A base level of an index. */
  baseLevel?: string;

  constructor(data?: Index) {
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
    data['Kind'] = this.kind;
    data['Family'] = this.family;
    data['CalculationFrequency'] = this.calculationFrequency;
    data['Weighting'] = this.weighting;
    data['CappingFactor'] = this.cappingFactor;
    data['Icb'] = this.icb;
    data['BaseDate'] = this.baseDate;
    data['BaseLevel'] = this.baseLevel;
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
