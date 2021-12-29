import { InstrumentType } from './types/instrument-type.enum';
import { ExchangeMic } from './../markets/exchange-mic.enum';
import { Stock } from './types/stock';
import { Etf } from './types/etf';
import { Etv } from './types/etv';
import { Inav } from './types/inav';
import { Fund } from './types/fund';
import { Index } from './types';

/** Contains information to describe an instrument. */
export class Instrument {
  /** An optional symbol (ticker) of the security. */
  symbol?: string;

  /** A name of the instrument. */
  name?: string;

  /** An optional textual description for the instrument. */
  description?: string;

  /** The instrument type. */
  type!: InstrumentType;

  /** An exchange representations according to ISO 10383 Market Identifier Code (MIC). */
  mic!: ExchangeMic;

  /** An *ISIN*. */
  isin?: string;

  /** An additional information for stocks. */
  stock?: Stock;

  /** An additional information for Exchange-Traded Vehicles. */
  etv?: Etv;

  /** An additional information for Exchange-Traded Funds. */
  etf?: Etf;

  /** An additional information for *Indicative Net Asset Values*. */
  inav?: Inav;

  /** An additional information for funds. */
  fund?: Fund;

  /** An additional information for indices. */
  index?: Index;

  constructor(data?: Instrument) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
      this.stock = data.stock && !(data.stock as any).toJSON ? new Stock(data.stock) : (this.stock as Stock);
      this.etv = data.etv && !(data.etv as any).toJSON ? new Etv(data.etv) : (this.etv as Etv);
      this.etf = data.etf && !(data.etf as any).toJSON ? new Etf(data.etf) : (this.etf as Etf);
      this.inav = data.inav && !(data.inav as any).toJSON ? new Inav(data.inav) : (this.inav as Inav);
      this.fund = data.fund && !(data.fund as any).toJSON ? new Fund(data.fund) : (this.fund as Fund);
      this.index = data.index && !(data.index as any).toJSON ? new Index(data.index) : (this.index as Index);
    }
    if (!data) {
      this.type = InstrumentType.Undefined;
      this.mic = ExchangeMic.Xxxx;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    /* eslint-disable @typescript-eslint/dot-notation */
    data['Symbol'] = this.symbol;
    data['Name'] = this.name;
    data['Description'] = this.description;
    data['Type'] = this.type;
    data['Mic'] = this.mic;
    data['Isin'] = this.isin;
    data['Stock'] = this.stock ? this.stock.toJSON() : (undefined as any);
    data['Etv'] = this.etv ? this.etv.toJSON() : (undefined as any);
    data['Etf'] = this.etf ? this.etf.toJSON() : (undefined as any);
    data['Inav'] = this.inav ? this.inav.toJSON() : (undefined as any);
    data['Fund'] = this.fund ? this.fund.toJSON() : (undefined as any);
    data['Index'] = this.index ? this.index.toJSON() : (undefined as any);
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
