﻿import { HilbertTransformerCycleEstimator } from './hilbert-transformer-cycle-estimator.interface';
import { HilbertTransformerCycleEstimatorParams } from './hilbert-transformer-cycle-estimator-params.interface';

export const defaultMinPeriod = 6;
export const defaultMaxPeriod = 50;
export const htLength = 7;
export const quadratureIndex = htLength / 2;

/** Shift all elements to the right and place the new value at index zero. */
export function push(array: number[], value: number): void {
  for (let i = array.length - 1; i > 0; i--) {
    array[i] = array[i - 1];
  }
  array[0] = value;
}

export function correctAmplitude(previousPeriod: number): number {
  const a = 0.54;
  const b = 0.075;
  return a + b * previousPeriod;
}

export function ht(array: number[]): number {
  const a = 0.0962;
  const b = 0.5769;
  let value = 0;
  value += a * array[0];
  value += b * array[2];
  value -= b * array[4];
  value -= a * array[6];
  return value;
}

export function adjustPeriod(period: number, periodPrevious: number): number {
  const minPreviousPeriodFactor = 0.67;
  const maxPreviousPeriodFactor = 1.5;

  let temp = maxPreviousPeriodFactor * periodPrevious;
  if (period > temp) {
    period = temp;
  } else {
    temp = minPreviousPeriodFactor * periodPrevious;
    if (period < temp)
      period = temp;
  }

  if (period < defaultMinPeriod)
    period = defaultMinPeriod;
  else if (period > defaultMaxPeriod)
    period = defaultMaxPeriod;
  return period;
}

export function fillWmaFactors(length: number, factors: number[]): void {
	if (length === 4) {
		factors[0] = 4./10.;
		factors[1] = 3./10.;
		factors[2] = 2./10.;
		factors[3] = 1./10.;
	} else if (length === 3) {
		factors[0] = 3./6.;
		factors[1] = 2./6.;
		factors[2] = 1./6.;
	} else { // if length === 2
		factors[0] = 2./3.;
		factors[1] = 1./6.;
	}
}

export function verifyParameters(params: HilbertTransformerCycleEstimatorParams): string | undefined {
	const invalid = "invalid cycle estimator parameters";
	const minLen  = 2;
	const maxLen  = 4;

	const length = Math.floor(params.smoothingLength);
	if (length < minLen || length > maxLen) {
		return invalid + "smoothingLength should be in range [2, 4]";
	}

	const alphaQuad = params.alphaEmaQuadratureInPhase;
	if (alphaQuad <= 0 || alphaQuad >= 1) {
		return invalid + "alphaEmaQuadratureInPhase should be in range (0, 1)";
	}

	const alphaPeriod = params.alphaEmaPeriod;
	if (alphaPeriod <= 0 || alphaPeriod >=1) {
		return invalid + "alphaEmaPeriod should be in range (0, 1)";
	}

  return undefined;
}
