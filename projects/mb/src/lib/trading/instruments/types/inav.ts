import { CurrencyCode } from '../../currencies/currency-code.enum';
import { InstrumentReference } from './instrument-reference';

/** An additional information for Indicative Net Asset Values. */
export class Inav {
  /** A currency code. */
  currency!: CurrencyCode;

  /** A target instrument reference. */
  target?: InstrumentReference;

  constructor(data?: Inav) {
    if (data) {
      for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
      this.target = (data.target && !(data.target).toJSON) ? new InstrumentReference(data.target) :
        (this.target as InstrumentReference);
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.Currency = this.currency;
    data.Target = this.target ? this.target.toJSON() : (undefined as any);
    return data;
  }
}
