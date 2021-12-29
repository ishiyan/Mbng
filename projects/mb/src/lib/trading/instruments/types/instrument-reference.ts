/** Contains information to reference an instrument. */
export class InstrumentReference {
  /** An exchange representations according to ISO 10383 *Market Identifier Code* (MIC). */
  mic?: string;

  /** An ISIN. */
  isin?: string;

  /** An optional symbol (ticker) of the security. */
  symbol?: string;

  /** A name of the instrument. */
  name?: string;

  constructor(data?: InstrumentReference) {
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
    data['Mic'] = this.mic;
    data['Isin'] = this.isin;
    data['Symbol'] = this.symbol;
    data['Name'] = this.name;
    /* eslint-enable @typescript-eslint/dot-notation */
    return data;
  }
}
