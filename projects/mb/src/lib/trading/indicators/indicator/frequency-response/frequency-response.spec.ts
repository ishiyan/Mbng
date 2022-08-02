import 'jasmine';
import { Filter } from './frequency-response.interface';
import { directRealFastFourierTransform, isValidSignalLength, prepareFrequencyDomain,
  prepareFilteredSignal, normalize } from './frequency-response';

// ng test mb  --code-coverage --include='**/frequency-response/*.spec.ts'

const almostEqual = (exp: number, act: number): boolean => Math.abs(exp - act) < Number.EPSILON;

describe('FrequencyResponse', () => {
  it('validates signal length', () => {
    const isValid = (len: number): boolean => {
      switch (len) {
        case 4:
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
          return true;
        default:
          return false
      }
    };

    const maxLength = 8199;
    for (let i = -1; i < maxLength; i++) {
      const expected = isValid(i);
      const actual = isValidSignalLength(i)
      expect(expected === actual).toBe(true);
    }
  });

  it('prepares frequency domain points', () => {
    const l = 7;
    const expected = [1 / l, 2 / l, 3 / l, 4 / l, 5 / l, 6 / l, 7 / l];
    const actual = [0, 0, 0, 0, 0, 0, 0];

    prepareFrequencyDomain(l, actual);

    for (let i = 0; i < expected.length - 1; i++) {
      expect(almostEqual(expected[i], actual[i])).toBe(true);
    }
  });

  it('prepares filtered signal', () => {
    const len = 7;
    const warmup = 5;
    const expected = [1000, 0, 0, 0, 0, 0, 0];

    class IdentityFilter implements Filter {
      update(sample: number): number {
        return sample;
      }
    }
    
    const actual = prepareFilteredSignal(len, new IdentityFilter(), warmup);

    for (let i = 0; i < len - 1; i++) {
      expect(almostEqual(expected[i], actual[i])).toBe(true);
    }
  });

  it('calculates FFT', () => {
    const expected = [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const actual = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    directRealFastFourierTransform(actual);

    for (let i = 0; i < expected.length - 1; i++) {
      expect(almostEqual(expected[i], actual[i])).toBe(true);
    }
  });

  it('normalizes array with zero max', () => {
    const expected = [1, 2, 3, 4, 5];
    const actual = [1, 2, 3, 4, 5];

    normalize(actual.length, actual, 0);

    for (let i = 0; i < expected.length - 1; i++) {
      expect(almostEqual(expected[i], actual[i])).toBe(true);
    }
  });

  it('normalizes array with positive max', () => {
    const max = 6;
    const expected = [2 / max, 3 / max, 4 / max, 5 / max, 6 / max];
    const actual = [2, 3, 4, 5, 6];

    normalize(actual.length, actual, 0);

    for (let i = 0; i < expected.length - 1; i++) {
      expect(almostEqual(expected[i], actual[i])).toBe(true);
    }
  });

});
