// import 'jasmine';

import { SimpleMovingAverage } from './simple-moving-average';

// ng test mb  --code-coverage --include='**/indicators/*.spec.ts'

// Test data taken from:
// Perry Kaufman, Trading Systems an Methods, 3rd edition, page 72.

const input = [
  64.59, 64.23, 65.26, 65.24, 65.07, 65.14, 64.98, 64.76, 65.11, 65.46,
  65.94, 66.10, 66.87, 66.56, 66.71, 66.19, 66.14, 66.64, 67.33, 68.18,
  67.48, 67.19, 66.46, 67.20, 67.62, 67.66, 67.89, 69.19, 69.68, 69.31,
  69.11, 69.27, 68.97, 69.11, 69.50, 69.70, 69.94, 69.11, 67.64, 67.75,
  67.47, 67.50, 68.18, 67.35, 66.74, 67.00, 67.46, 67.36, 67.37, 67.78,
  67.96
];

const expected3 = [
  Number.NaN, Number.NaN, 64.69, 64.91, 65.19, 65.15, 65.06, 64.96, 64.95, 65.11,
  65.50, 65.83, 66.30, 66.51, 66.71, 66.49, 66.35, 66.32, 66.70, 67.38,
  67.66, 67.62, 67.04, 66.95, 67.09, 67.49, 67.72, 68.25, 68.92, 69.39,
  69.37, 69.23, 69.12, 69.12, 69.19, 69.44, 69.71, 69.58, 68.90, 68.17,
  67.62, 67.57, 67.72, 67.68, 67.42, 67.03, 67.07, 67.27, 67.40, 67.50,
  67.70,
];

const expected5 = [
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, 64.88, 64.99, 65.14, 65.04, 65.01, 65.09,
  65.25, 65.47, 65.90, 66.19, 66.44, 66.49, 66.49, 66.45, 66.60, 66.90,
  67.15, 67.36, 67.33, 67.30, 67.19, 67.23, 67.37, 67.91, 68.41, 68.75,
  69.04, 69.31, 69.27, 69.15, 69.19, 69.31, 69.44, 69.47, 69.18, 68.83,
  68.38, 67.89, 67.71, 67.65, 67.45, 67.35, 67.35, 67.18, 67.19, 67.39,
  67.59,
];

const expected10 = [
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, 64.98,
  65.12, 65.31, 65.47, 65.60, 65.76, 65.87, 65.98, 66.17, 66.39, 66.67,
  66.82, 66.93, 66.89, 66.95, 67.04, 67.19, 67.37, 67.62, 67.86, 67.97,
  68.13, 68.34, 68.59, 68.78, 68.97, 69.17, 69.38, 69.37, 69.17, 69.01,
  68.85, 68.67, 68.59, 68.41, 68.14, 67.87, 67.62, 67.45, 67.42, 67.42,
  67.47,
];

const almostEqual = (exp: number, act: number): boolean => Math.abs(exp - act) < 10e-2;

describe('SimpleMovingAverage', () => {
  it('should return expected name', () => {
    const sma = new SimpleMovingAverage(7);
    expect(sma.getName()).toBe('sma(7)');
  });

  it('should throw if length is less than 2', () => {
    expect(() => { new SimpleMovingAverage(1); }).toThrow();
  });

  it('should calculate expected output and prime state for length 3', () => {
    const len = 3;
    const sma = new SimpleMovingAverage(len);

    for (let i = 0; i < len - 1; i++) {
      expect(Number.isNaN(sma.update(input[i]))).toBe(true);
      expect(sma.isPrimed()).toBe(false);
    }

    for (let i = len - 1; i < input.length; i++) {
      expect(almostEqual(expected3[i], sma.update(input[i]))).toBe(true);
      expect(sma.isPrimed()).toBe(true);
    }

    expect(Number.isNaN(sma.update(Number.NaN))).toBe(true);
  });

  it('should calculate expected output and prime state for length 5', () => {
    const len = 5;
    const sma = new SimpleMovingAverage(len);

    for (let i = 0; i < len - 1; i++) {
      expect(Number.isNaN(sma.update(input[i]))).toBe(true);
      expect(sma.isPrimed()).toBe(false);
    }

    for (let i = len - 1; i < input.length; i++) {
      expect(almostEqual(expected5[i], sma.update(input[i]))).toBe(true);
      expect(sma.isPrimed()).toBe(true);
    }

    expect(Number.isNaN(sma.update(Number.NaN))).toBe(true);
  });

  it('should calculate expected output and prime state for length 10', () => {
    const len = 10;
    const sma = new SimpleMovingAverage(len);

    for (let i = 0; i < len - 1; i++) {
      expect(Number.isNaN(sma.update(input[i]))).toBe(true);
      expect(sma.isPrimed()).toBe(false);
    }

    for (let i = len - 1; i < input.length; i++) {
      expect(almostEqual(expected10[i], sma.update(input[i]))).toBe(true);
      expect(sma.isPrimed()).toBe(true);
    }

    expect(Number.isNaN(sma.update(Number.NaN))).toBe(true);
  });
});
