import { } from 'jasmine';

import { KaufmanAdaptiveMovingAverage } from './kaufman-adaptive-moving-average';

// ng test mb  --code-coverage --include='**/indicators/**/*.spec.ts'
// ng test mb  --code-coverage --include='**/indicators/patrick-mulloy/double-exponential-moving-average/*.spec.ts'

/* eslint-disable max-len */
// Input data is taken from the TA-Lib (http://ta-lib.org/) tests,
//    test_data.c, TA_SREF_close_daily_ref_0_PRIV[252].
//
// Output data is taken from TA-Lib (http://ta-lib.org/) tests,
//    test_ma.c.
//
//   /*******************************/
//   /*  DEMA TEST - Metastock      */
//   /*******************************/
//
//   /* No output value. */
//   { 0, TA_ANY_MA_TEST, 0, 1, 1,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS, 0, 0, 0, 0},
//#ifndef TA_FUNC_NO_RANGE_CHECK
//   { 0, TA_ANY_MA_TEST, 0, 0, 251,  0, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_BAD_PARAM, 0, 0, 0, 0 },
//#endif
//
//   /* Test with period 14 */
//   { 0, TA_ANY_MA_TEST, 0, 0, 251, 14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,   0,  83.785, 26, 252-26 }, /* First Value */
//   { 0, TA_ANY_MA_TEST, 0, 0, 251, 14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,   1,  84.768, 26, 252-26 },
//   { 0, TA_ANY_MA_TEST, 0, 0, 251, 14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS, 252-27, 109.467, 26, 252-26 }, /* Last Value */
//
//   /* Test with 1 unstable price bar. Test for period 2, 14 */
//   { 1, TA_ANY_MA_TEST, 1, 0, 251,  2, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,   0,  93.960, 4, 252-4 }, /* First Value */
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  2, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,   1,  94.522, 4, 252-4 },
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  2, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS, 252-5, 107.94, 4, 252-4 }, /* Last Value */
//
//   { 1, TA_ANY_MA_TEST, 1, 0, 251,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,    0,  84.91,  (13*2)+2, 252-((13*2)+2) }, /* First Value */
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,    1,  84.97,  (13*2)+2, 252-((13*2)+2) },
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,    2,  84.80,  (13*2)+2, 252-((13*2)+2) },
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,    3,  85.14,  (13*2)+2, 252-((13*2)+2) },
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS,   20,  89.83,  (13*2)+2, 252-((13*2)+2) },
//   { 0, TA_ANY_MA_TEST, 1, 0, 251,  14, TA_MAType_DEMA, TA_COMPATIBILITY_METASTOCK, TA_SUCCESS, 252-((13*2)+2+1), 109.4676, (13*2)+2, 252-((13*2)+2) }, /* Last Value */

const input = [
  91.500000,94.815000,94.375000,95.095000,93.780000,94.625000,92.530000,92.750000,90.315000,92.470000,96.125000,
  97.250000,98.500000,89.875000,91.000000,92.815000,89.155000,89.345000,91.625000,89.875000,88.375000,87.625000,
  84.780000,83.000000,83.500000,81.375000,84.440000,89.250000,86.375000,86.250000,85.250000,87.125000,85.815000,
  88.970000,88.470000,86.875000,86.815000,84.875000,84.190000,83.875000,83.375000,85.500000,89.190000,89.440000,
  91.095000,90.750000,91.440000,89.000000,91.000000,90.500000,89.030000,88.815000,84.280000,83.500000,82.690000,
  84.750000,85.655000,86.190000,88.940000,89.280000,88.625000,88.500000,91.970000,91.500000,93.250000,93.500000,
  93.155000,91.720000,90.000000,89.690000,88.875000,85.190000,83.375000,84.875000,85.940000,97.250000,99.875000,
  104.940000,106.000000,102.500000,102.405000,104.595000,106.125000,106.000000,106.065000,104.625000,108.625000,
  109.315000,110.500000,112.750000,123.000000,119.625000,118.750000,119.250000,117.940000,116.440000,115.190000,
  111.875000,110.595000,118.125000,116.000000,116.000000,112.000000,113.750000,112.940000,116.000000,120.500000,
  116.620000,117.000000,115.250000,114.310000,115.500000,115.870000,120.690000,120.190000,120.750000,124.750000,
  123.370000,122.940000,122.560000,123.120000,122.560000,124.620000,129.250000,131.000000,132.250000,131.000000,
  132.810000,134.000000,137.380000,137.810000,137.880000,137.250000,136.310000,136.250000,134.630000,128.250000,
  129.000000,123.870000,124.810000,123.000000,126.250000,128.380000,125.370000,125.690000,122.250000,119.370000,
  118.500000,123.190000,123.500000,122.190000,119.310000,123.310000,121.120000,123.370000,127.370000,128.500000,
  123.870000,122.940000,121.750000,124.440000,122.000000,122.370000,122.940000,124.000000,123.190000,124.560000,
  127.250000,125.870000,128.860000,132.000000,130.750000,134.750000,135.000000,132.380000,133.310000,131.940000,
  130.000000,125.370000,130.130000,127.120000,125.190000,122.000000,125.000000,123.000000,123.500000,120.060000,
  121.000000,117.750000,119.870000,122.000000,119.190000,116.370000,113.500000,114.250000,110.000000,105.060000,
  107.000000,107.870000,107.000000,107.120000,107.000000,91.000000,93.940000,93.870000,95.500000,93.000000,
  94.940000,98.250000,96.750000,94.810000,94.370000,91.560000,90.250000,93.940000,93.620000,97.000000,95.000000,
  95.870000,94.060000,94.620000,93.750000,98.000000,103.940000,107.870000,106.060000,104.500000,105.000000,
  104.190000,103.060000,103.420000,105.270000,111.870000,116.000000,116.620000,118.280000,113.370000,109.000000,
  109.700000,109.250000,107.000000,109.190000,110.000000,109.200000,110.120000,108.000000,108.620000,109.750000,
  109.810000,109.000000,108.750000,107.870000
];

describe('KaufmanAdaptiveMovingAverage', () => {
  const epsilon = 10e-2;

  it('should return expected mnemonic', () => {
    let kama = new KaufmanAdaptiveMovingAverage({length: 7, firstIsAverage: true});
    expect(kama.getMnemonic()).toBe('kama(7, sma)');
    kama = new KaufmanAdaptiveMovingAverage({length: 7, firstIsAverage: false});
    expect(kama.getMnemonic()).toBe('kama(7)');
    kama = new KaufmanAdaptiveMovingAverage({smoothingFactor: 0.12345});
    expect(kama.getMnemonic()).toBe('kama(0.123)');
  });

  it('should throw if length is less than 2', () => {
    expect(() => { new KaufmanAdaptiveMovingAverage({length: 1, firstIsAverage: true}); }).toThrow();
  });

  it('should throw if smoothing factor is less or equal to 0', () => {
    expect(() => { new KaufmanAdaptiveMovingAverage({smoothingFactor: 0}); }).toThrow();
  });

  it('should throw if smoothing factor is greater or equal to 1', () => {
    expect(() => { new KaufmanAdaptiveMovingAverage({smoothingFactor: 1}); }).toThrow();
  });

  it('should calculate expected output and prime state for length 2, first is SMA', () => {
    const len = 2;
    const kama = new KaufmanAdaptiveMovingAverage({length: len, firstIsAverage: true});

    for (let i = 0; i < 2*len - 1; i++) {
      expect(kama.update(input[i])).toBeNaN();
      expect(kama.isPrimed()).toBe(false);
    }

    for (let i = 2*len - 1; i < input.length; i++) {
      const act = kama.update(input[i]);
      expect(kama.isPrimed()).toBe(true);

      if (i === 251) {
        expect(act).toBeCloseTo(107.94, epsilon);
      }
    }

    expect(kama.update(Number.NaN)).toBeNaN();
  });

  it('should calculate expected output and prime state for length 14, first is SMA', () => {
    const len = 14;
    const kama = new KaufmanAdaptiveMovingAverage({length: len, firstIsAverage: true});

    for (let i = 0; i < 2*len - 1; i++) {
      expect(kama.update(input[i])).toBeNaN();
      expect(kama.isPrimed()).toBe(false);
    }

    for (let i = 2*len - 1; i < input.length; i++) {
      const act = kama.update(input[i]);
      expect(kama.isPrimed()).toBe(true);

      if (i === 251) {
        expect(act).toBeCloseTo(109.4676, epsilon);
      }
    }

    expect(kama.update(Number.NaN)).toBeNaN();
  });

  it('should calculate expected output and prime state for length 2, first is NOT SMA', () => {
    const len = 2;
    const kama = new KaufmanAdaptiveMovingAverage({length: len, firstIsAverage: false});

    for (let i = 0; i < 2*len - 1; i++) {
      expect(kama.update(input[i])).toBeNaN();
      expect(kama.isPrimed()).toBe(false);
    }

    for (let i = 2*len - 1; i < input.length; i++) {
      const act = kama.update(input[i]);
      expect(kama.isPrimed()).toBe(true);

      if (i === 251) {
        expect(act).toBeCloseTo(107.94, epsilon);
      }
    }

    expect(kama.update(Number.NaN)).toBeNaN();
  });

  it('should calculate expected output and prime state for length 14, first is NOT SMA', () => {
    const len = 14;
    const kama = new KaufmanAdaptiveMovingAverage({length: len, firstIsAverage: false});

    for (let i = 0; i < 2*len - 1; i++) {
      expect(kama.update(input[i])).toBeNaN();
      expect(kama.isPrimed()).toBe(false);
    }

    for (let i = 2*len - 1; i < input.length; i++) {
      const act = kama.update(input[i]);
      expect(kama.isPrimed()).toBe(true);

      if (i === 251) {
        expect(act).toBeCloseTo(109.4676, epsilon);
      }
    }

    expect(kama.update(Number.NaN)).toBeNaN();
  });
});
