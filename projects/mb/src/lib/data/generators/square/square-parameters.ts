import { amplitudeName, minimalValueName, objectName } from '../constants';

/** The input parameters for the square impulse generator. */
export class SquareParameters {
  private static readonly defaultAmplitude: number = 100;
  private static readonly defaultMinimalValue: number = 10;

  /** The amplitude of the square impulse, should be positive. */
  amplitude: number = SquareParameters.defaultAmplitude;

  /** The minimum of square impulse, should be positive. */
  minimalValue: number = SquareParameters.defaultMinimalValue;

  constructor(data?: SquareParameters) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === objectName ? data : {};
    data[amplitudeName] = this.amplitude;
    data[minimalValueName] = this.minimalValue;
    return data;
  }
}
