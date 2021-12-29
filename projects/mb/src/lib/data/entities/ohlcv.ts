/** An [open, high, low, close, volume] bar. */
export class Ohlcv {
  /** The date and time.
   *
   * For _ohlcv_ bar entities it corresponds to the closing time, so that an _ohlcv_ bar accumulates lower-level entities
   * up to the closing date and time.
   */
  time!: Date;

  /** The opening price. */
  open!: number;

  /** The highest price. */
  high!: number;

  /** The lowest price. */
  low!: number;

  /** The closing price. */
  close!: number;

  /** The volume. */
  volume!: number;

  /*constructor(data?: any) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }*/

  /*public toJSON(data?: any): any {
    data = typeof data === 'object' ? data : {};
    data['time'] = this.time ? this.time.toISOString() : <any>undefined;
    data['open'] = this.open;
    data['high'] = this.high;
    data['low'] = this.low;
    data['close'] = this.close;
    data['volume'] = this.volume;
    return data;
  }*/
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
