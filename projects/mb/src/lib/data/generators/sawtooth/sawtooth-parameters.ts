import { SawtoothShape } from './sawtooth-shape.enum';
import { amplitudeName, minimalValueName, isBiDirectionalName, sawtoothShapeName, objectName } from '../constants';

/** The input parameters for the sawtooth impulse generator. */
export class SawtoothParameters {
  private static readonly defaultAmplitude: number = 100;
  private static readonly defaultMinimalValue: number = 10;
  private static readonly defaultIsBiDirectional: boolean = false;
  private static readonly defaultSawtoothShape: SawtoothShape = SawtoothShape.Linear;

  /** The amplitude of the sawtooth impulse, should be positive. */
  amplitude: number = SawtoothParameters.defaultAmplitude;

  /** The minimum of the sawtooth impulse, should be positive. */
  minimalValue: number = SawtoothParameters.defaultMinimalValue;

  /** Whether the sawtooth impulse is reflected horizontally to form a triangle shape. */
  isBiDirectional: boolean = SawtoothParameters.defaultIsBiDirectional;

  /** The sawtooth shape. */
  sawtoothShape: SawtoothShape = SawtoothParameters.defaultSawtoothShape;

  constructor(data?: SawtoothParameters) {
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
    data[isBiDirectionalName] = this.isBiDirectional;
    data[sawtoothShapeName] = this.sawtoothShape;
    return data;
  }
}
