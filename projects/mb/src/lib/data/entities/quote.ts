/** A price _quote_ (bid/ask price and size pair). */
export class Quote {
  /** The date and time. */
  time!: Date;

  /** The bid price. */
  bidPrice!: number;

  /** The bid size. */
  bidSize!: number;

  /** The ask price. */
  askPrice!: number;

  /** The ask size. */
  askSize!: number;

  constructor(data?: any) {
    if (data) {
      for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
          (this as any)[property] = data[property];
        }
      }
    }
  }

  /*toJSON(data?: any): any {
    data = typeof data === 'object' ? data : {};
    data.time = this.time ? this.time.toISOString() : undefined;
    data.bidPrice = this.bidPrice;
    data.bidSize = this.bidSize;
    data.askPrice = this.askPrice;
    data.askSize = this.askSize;
    return data;
  }*/
}
