/** A _scalar_ (value and time) entity. */
export class Scalar {
  /** The date and time. */
  time!: Date;

  /** The value. */
  value!: number;

  /*constructor(data?: any) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }*/

  /*toJSON(data?: any): any {
    data = typeof data === 'object' ? data : {};
    data['time'] = this.time ? this.time.toISOString() : <any>undefined;
    data['value'] = this.value;
    return data;
  }*/
}

/* eslint-disable , , , , , , , , , , , ,  */
