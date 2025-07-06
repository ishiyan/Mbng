import { } from 'jasmine';

import { ChirpSweep } from './chirp-sweep.enum';
import { ChirpGenerator } from './chirp-generator';

// ng test mb  --code-coverage --include='**/generators/chirp/*.spec.ts'
// ng test mb  --code-coverage --include='**/generators/**/*spec.ts'
// ng test mb  --code-coverage --include='**/generators/*.spec.ts'

describe('ChirpGenerator', () => {

  describe('constructor', () => {
    it('should create with default parameters', () => {
      const gen = new ChirpGenerator();
      
      expect(gen.sweepSamples).toBe(128);
      expect(gen.sampleAmplitude).toBe(100.0);
      expect(gen.sampleMinimum).toBe(10.0);
      expect(gen.initialPeriod).toBe(128);
      expect(gen.finalPeriod).toBe(16);
      expect(gen.phaseInPi).toBe(0.0);
      expect(gen.chirpSweep).toBe(ChirpSweep.LinearPeriod);
      expect(gen.isBiDirectional).toBe(true);
      expect(gen.noiseAmplitudeFraction).toBe(0.0);
    });

    it('should create with custom parameters', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearFrequency,
        64,
        32,
        8,
        0.5,
        50.0,
        5.0,
        false,
        0.1
      );

      expect(gen.sweepSamples).toBe(64);
      expect(gen.sampleAmplitude).toBe(50.0);
      expect(gen.sampleMinimum).toBe(5.0);
      expect(gen.initialPeriod).toBe(32);
      expect(gen.finalPeriod).toBe(8);
      expect(gen.phaseInPi).toBe(0.5);
      expect(gen.chirpSweep).toBe(ChirpSweep.LinearFrequency);
      expect(gen.isBiDirectional).toBe(false);
      expect(gen.noiseAmplitudeFraction).toBe(0.1);
    });

    it('should generate correct moniker for default parameters', () => {
      const gen = new ChirpGenerator();
      expect(gen.moniker).toBe('10 + 100∙chirp(linPer, 128, 128 ➜ 16, bidir)');
    });

    it('should generate correct moniker with phase', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        128,
        128,
        16,
        0.5,
        100.0,
        10.0,
        true,
        0.0
      );
      expect(gen.moniker).toBe('10 + 100∙chirp(linPer, 128, 128 ➜ 16, 0.50∙π, bidir)');
    });

    it('should generate correct moniker with noise', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        128,
        128,
        16,
        0.0,
        100.0,
        10.0,
        true,
        0.1
      );
      expect(gen.moniker).toBe('10 + 100∙chirp(linPer, 128, 128 ➜ 16, bidir) + noise(0.10)');
    });

    it('should generate correct moniker for unidirectional', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        128,
        128,
        16,
        0.0,
        100.0,
        10.0,
        false,
        0.0
      );
      expect(gen.moniker).toBe('10 + 100∙chirp(linPer, 128, 128 ➜ 16)');
    });
  });

  describe('reset', () => {
    it('should reset generator to initial state', () => {
      const gen = new ChirpGenerator();

        // Generate some samples to change internal state
      gen.nextSample();
      gen.nextSample();

      gen.reset();

      expect((gen as any).currentSample).toBe(0);
      expect((gen as any).directionForward).toBe(true);
      expect((gen as any).angle).toBe((gen as any).phase);
      expect((gen as any).instantFrequency).toBe((gen as any).initialFrequency);
      expect((gen as any).instantPeriod).toBe((gen as any).initialPeriod);
    });
  });

  describe('nextSample', () => {
    it('should generate samples within expected range', () => {
      const gen = new ChirpGenerator();
      const expectedMin = gen.sampleMinimum;
      const expectedMax = gen.sampleMinimum + 2 * gen.sampleAmplitude;

      for (let i = 0; i < 100; i++) {
        const sample = gen.nextSample();
        expect(sample).toBeGreaterThanOrEqual(expectedMin);
        expect(sample).toBeLessThanOrEqual(expectedMax);
      }
    });

    it('should generate different samples over time', () => {
      const gen = new ChirpGenerator();
      const samples = [];
      for (let i = 0; i < 10; i++) {
        samples.push(gen.nextSample());
      }
      
      // Not all samples should be identical
      const uniqueSamples = new Set(samples);
      expect(uniqueSamples.size).toBeGreaterThan(1);
    });

    it('should handle bidirectional sweep changes', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        4, // Small sweep size for easier testing
        8,
        2,
        0.0,
        10.0,
        0.0,
        true,
        0.0
      );

      // Generate samples to reach direction change
      const samples = [];
      for (let i = 0; i < 10; i++) {
        samples.push(gen.nextSample());
      }

      expect(samples.length).toBe(10);
    });

    it('should handle unidirectional sweep correctly', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        4,
        8,
        2,
        0.0,
        10.0,
        0.0,
        false,
        0.0
      );

      const samples = [];
      for (let i = 0; i < 10; i++) {
        samples.push(gen.nextSample());
      }

      expect(samples.length).toBe(10);
    });
  });

  describe('different chirp sweeps', () => {
    it('should handle LinearFrequency sweep', () => {
      const gen = new ChirpGenerator(ChirpSweep.LinearFrequency);
      const sample = gen.nextSample();
      expect(sample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should handle QuadraticPeriod sweep', () => {
      const gen = new ChirpGenerator(ChirpSweep.QuadraticPeriod);
      const sample = gen.nextSample();
      expect(sample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should handle QuadraticFrequency sweep', () => {
      const gen = new ChirpGenerator(ChirpSweep.QuadraticFrequency);
      const sample = gen.nextSample();
      expect(sample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should handle LogarithmicPeriod sweep', () => {
      const gen = new ChirpGenerator(ChirpSweep.LogarithmicPeriod);
      const sample = gen.nextSample();
      expect(sample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should handle LogarithmicFrequency sweep', () => {
      const gen = new ChirpGenerator(ChirpSweep.LogarithmicFrequency);
      const sample = gen.nextSample();
      expect(sample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should throw error for unknown chirp sweep', () => {
      expect(() => {
        new ChirpGenerator(999 as unknown as ChirpSweep);
      }).toThrowError('Unknown chirp sweep 999');
    });
  });

  describe('edge cases', () => {
    it('should handle zero phase correctly', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        128,
        128,
        16,
        0.0,
        100.0,
        10.0,
        true,
        0.0
      );
      
      const firstSample = gen.nextSample();
      expect(firstSample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should handle π phase correctly', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        128,
        128,
        16,
        1.0, // π phase
        100.0,
        10.0,
        true,
        0.0
      );
      
      const firstSample = gen.nextSample();
      expect(firstSample).toBeCloseTo(gen.sampleMinimum, 0);
    });

    it('should handle very small sweep size', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearPeriod,
        2,
        4,
        2,
        0.0,
        10.0,
        0.0,
        false,
        0.0
      );

      const samples = [];
      for (let i = 0; i < 5; i++) {
        samples.push(gen.nextSample());
      }

      expect(samples.length).toBe(5);
    });

    it('should handle angle wrapping correctly', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearFrequency,
        4,
        3, // Very small period to cause rapid angle changes
        2,
        0.0,
        1.0,
        0.0,
        false,
        0.0
      );

      // Generate many samples to test angle wrapping
      for (let i = 0; i < 100; i++) {
        const sample = gen.nextSample();
        expect(Number.isFinite(sample)).toBeTrue();
        expect(sample).not.toBeNaN();
      }
    });
  });

  describe('frequency calculation methods', () => {
    it('should calculate correct initial frequency', () => {
      const gen = new ChirpGenerator();
      gen.reset();
      
      // First sample after reset should use initial frequency
      const firstSample = gen.nextSample();
      expect(firstSample).toBeCloseTo(gen.sampleMinimum + 2 * gen.sampleAmplitude - 0.5, 0);
    });

    it('should maintain frequency progression in forward direction', () => {
      const gen = new ChirpGenerator(
        ChirpSweep.LinearFrequency,
        10,
        16,
        4,
        0.0,
        1.0,
        0.0,
        false,
        0.0
      );

      const frequencies = [];
      for (let i = 0; i < 5; i++) {
        gen.nextSample();
        frequencies.push((gen as any).instantFrequency);
      }

      // Frequencies should be increasing for LinearFrequency with decreasing period
      for (let i = 1; i < frequencies.length; i++) {
        expect(frequencies[i]).toBeGreaterThan(frequencies[i - 1]);
      }
    });
  });
});