import { Bar } from './bar';

/** An [open, high, low, close, volume] bar. */
export class Ohlcv extends Bar {
  constructor(data?: any) {
    super(data);
  }
}

/*export namespace Ohlcv {
  export function fromJson(json?: any): Ohlcv {
    const ohlcv = new Ohlcv();
    if (json) {
      for (const property in json) {
        if (json.hasOwnProperty(property)) {
          (<any>ohlcv)[property] = (<any>json)[property];
        }
      }
    }
    return ohlcv;
  }

  export function toJson(ohlcv: Ohlcv, json?: any): any {
    json = typeof json === 'object' ? json : {};
    json['time'] = ohlcv.time ? ohlcv.time.toISOString() : <any>undefined;
    json['open'] = ohlcv.open;
    json['high'] = ohlcv.high;
    json['low'] = ohlcv.low;
    json['close'] = ohlcv.close;
    json['volume'] = ohlcv.volume;
    return json;
  }
}*/
