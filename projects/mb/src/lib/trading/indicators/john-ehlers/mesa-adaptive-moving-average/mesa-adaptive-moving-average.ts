import { componentPairMnemonic } from '../../indicator/component-pair-mnemonic';
import { LineIndicator } from '../../indicator/line-indicator';
import { HilbertTransformerCycleEstimatorType } from '../hilbert-transformer/hilbert-transformer-cycle-estimator-type.enum';
import { HilbertTransformerCycleEstimatorParams } from '../hilbert-transformer/hilbert-transformer-cycle-estimator-params.interface';
import { HilbertTransformerCycleEstimator } from '../hilbert-transformer/hilbert-transformer-cycle-estimator.interface';
import { createEstimator } from '../hilbert-transformer/hilbert-transformer-common';
import { MesaAdaptiveMovingAverageLengthParams } from './mesa-adaptive-moving-average-params.interface';
import { MesaAdaptiveMovingAverageSmoothingFactorParams } from './mesa-adaptive-moving-average-params.interface';
 
const guardLength = (object: any): object is MesaAdaptiveMovingAverageLengthParams => 'fastestLength' in object;

const estimatorMnemonic = (
  estimatorType?: HilbertTransformerCycleEstimatorType,
  estimatorParams?: HilbertTransformerCycleEstimatorParams): string => {
  if (!estimatorType) {
    estimatorType = HilbertTransformerCycleEstimatorType.HomodyneDiscriminator;
  }

  let mnem = "";
  switch (estimatorType) {
    case HilbertTransformerCycleEstimatorType.HomodyneDiscriminator:
      if (!estimatorParams) {
        return "";
      }
      if (estimatorParams &&
        estimatorParams.smoothingLength === 4 &&
        estimatorParams.alphaEmaQuadratureInPhase === 0.2 &&
        estimatorParams.alphaEmaPeriod === 0.2) {
        return "";
      }
      mnem = "hd";
      break;
    case HilbertTransformerCycleEstimatorType.HomodyneDiscriminatorUnrolled:
      mnem = "hdu";
      if (estimatorParams &&
        estimatorParams.smoothingLength === 4 &&
        estimatorParams.alphaEmaQuadratureInPhase === 0.2 &&
        estimatorParams.alphaEmaPeriod === 0.2) {
        return mnem + ", ";
      }
      break;
    case HilbertTransformerCycleEstimatorType.PhaseAccumulator:
      mnem = "pa";
      if (estimatorParams &&
        estimatorParams.smoothingLength === 4 &&
        estimatorParams.alphaEmaQuadratureInPhase === 0.15 &&
        estimatorParams.alphaEmaPeriod === 0.25) {
        return mnem + ", ";
      }
      break;
    case HilbertTransformerCycleEstimatorType.DualDifferentiator:
      mnem = "dd";
      if (estimatorParams &&
        estimatorParams.smoothingLength === 4 &&
        estimatorParams.alphaEmaQuadratureInPhase === 0.15 &&
        estimatorParams.alphaEmaPeriod === 0.15) {
        return mnem + ", ";
      }
      break;
    default:
      return "";
  }

  if (estimatorParams) {
    mnem = mnem.concat("(",
      Math.floor(estimatorParams.smoothingLength).toString(), ", ",
      estimatorParams.alphaEmaQuadratureInPhase.toFixed(3), ", ",
      estimatorParams.alphaEmaPeriod.toFixed(3), ")");
  }

  return mnem + ", ";
};

/** Function to calculate mnemonic of an __MesaAdaptiveMovingAverage__ indicator. */
export const mesaAdaptiveMovingAverageMnemonic =
  (params: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams): string => {
    if (guardLength(params)) {
      const p = params as MesaAdaptiveMovingAverageLengthParams;
      return 'mama('.concat(Math.floor(p.fastLimitLength).toString(),
        ', ', Math.floor(p.slowLimitLength).toString(), ', ',
        estimatorMnemonic(p.estimatorType, p.estimatorParams),
        componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
    } else {
      const p = params as MesaAdaptiveMovingAverageSmoothingFactorParams;
      return 'mama('.concat(p.fastLimitSmoothingFactor.toFixed(3),
        ', ', p.slowLimitSmoothingFactor.toFixed(3), ', ',
        estimatorMnemonic(p.estimatorType, p.estimatorParams),
        componentPairMnemonic(p.barComponent, p.quoteComponent), ')');
    }
  };

/** __Mesa Adaptive Moving Average__ (_MAMA_, or Ehler's Mother of All Moving Averages)
 * is an EMA with the smoothing factor, α, being changed with each new sample within the fast and the slow
 * limit boundaries which are the constant parameters of MAMA:
 *
 * MAMAᵢ = αᵢPᵢ + (1 - αᵢ)*MAMAᵢ₋₁,  αs ≤ αᵢ ≤ αf
 *
 * The αf is the α of the fast (shortest, default suggested value 0.5 or 3 samples) limit boundary.
 *
 * The αs is the α of the slow (longest, default suggested value 0.05 or 39 samples) limit boundary.
 *
 * The concept of MAMA is to relate the phase rate of change, as measured by a Hilbert Transformer
 * estimator, to the EMA smoothing factor α, thus making the EMA adaptive.
 *
 * The cycle phase is computed from the arctangent of the ratio of the Quadrature component to the
 * InPhase component. The rate of change is obtained by taking the difference of successive phase
 * measurements. The α is computed as the fast limit αf divided by the phase rate of change.
 * Any time there is a negative phase rate of change the value of α is set to the fast limit αf;
 * if the phase rate of change is large, the α is bounded at the slow limit αs.
 *
 * The Following Adaptive Moving Average (FAMA) is produced by applying the MAMA to the first
 * MAMA indicator.
 *
 * By using an α in FAMA that is the half the value of the α in MAMA, the FAMA has steps in
 * time synchronization with MAMA, but the vertical movement is not as great.
 *
 * As a result, MAMA and FAMA do not cross unless there has been a major change in the
 * market direction. This suggests an adaptive moving average crossover system that is
 * virtually free of whipsaw trades.
 *
 * Reference:
 * John Ehlers, Rocket Science for Traders, Wiley, 2001, 0471405671, pp 177-184.
 */
export class MesaAdaptiveMovingAverage extends LineIndicator {
  private readonly htce: HilbertTransformerCycleEstimator;
  private readonly alphaFastLimit: number;
  private readonly alphaSlowLimit: number;
  private previousPhase: number;
  private mama: number;
  private fama: number;
  private isPhaseCached: boolean;
  mnemonicFama: string;

  /**
   * Constructs an instance given a length in samples or a smoothing factor in (0, 1).
   **/
  public constructor(params: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams) {
    super();

    if (guardLength(params)) {
      const p = params as MesaAdaptiveMovingAverageLengthParams;

      const fastLen = Math.floor(p.fastLimitLength);
      if (fastLen < 2) {
        throw new Error('fast limit length should be greater than 1');
      }

      const slowLen = Math.floor(p.slowLimitLength);
      if (slowLen < 2) {
        throw new Error('slow limit length should be greater than 1');
      }

      this.alphaFastLimit = 2 / (fastLen + 1);
      this.alphaSlowLimit = 2 / (slowLen + 1);
    } else {
      const p = params as MesaAdaptiveMovingAverageSmoothingFactorParams;

      this.alphaFastLimit = p.fastLimitSmoothingFactor;
      if (p.fastLimitSmoothingFactor <= 0 || p.fastLimitSmoothingFactor >= 1) {
        throw new Error('fast limit smoothing factor should be in range (0, 1)');
      }

      this.alphaSlowLimit = p.slowLimitSmoothingFactor;
      if (p.slowLimitSmoothingFactor <= 0 || p.slowLimitSmoothingFactor >= 1) {
        throw new Error('slow limit smoothing factor should be in range (0, 1)');
      }
    }

    this.htce = createEstimator(params.estimatorType, params.estimatorParams);
    this.mnemonic = mesaAdaptiveMovingAverageMnemonic(params);
    this.mnemonicFama = this.mnemonic.replace('mama', 'fama');
    this.primed = false;
    this.isPhaseCached = false;
    this.previousPhase = 0;
    this.mama = 0;
    this.fama = 0;
  }

  /** Updates the value of the indicator given the next sample. */
  public update(sample: number): number {
    if (Number.isNaN(sample)) {
      return sample;
    }

    const epsilon = 0.00000001;

    let temp;

    if (this.primed) {
      temp = Math.abs(sample - this.window[this.efficiencyRatioLength]);
      this.absoluteDeltaSum += temp - this.absoluteDelta[1];

      for (let i = 0; i < this.efficiencyRatioLength; i++) {
        const j = i + 1;
        this.window[i] = this.window[j];
        this.absoluteDelta[i] = this.absoluteDelta[j];
      }

      this.window[this.efficiencyRatioLength] = sample;
      this.absoluteDelta[this.efficiencyRatioLength] = temp;
      const delta = Math.abs(sample - this.window[0]);

      if (this.absoluteDeltaSum <= delta || this.absoluteDeltaSum < epsilon) {
        temp = 1;
      } else {
        temp = delta / this.absoluteDeltaSum;
      }

      temp = this.alphaSlowest + temp * this.alphaDiff;
      this.value += (sample - this.value) * temp * temp;

      return this.value;
    } else { // Not primed.
      this.window[this.windowCount] = sample;

      if (0 < this.windowCount) {
        temp = Math.abs(sample - this.window[this.windowCount - 1]);
        this.absoluteDelta[this.windowCount] = temp;
        this.absoluteDeltaSum += temp;
      }

      if (this.efficiencyRatioLength === this.windowCount) {
        this.primed = true;
        const delta = Math.abs(sample - this.window[0]);

        if (this.absoluteDeltaSum <= delta || this.absoluteDeltaSum < epsilon) {
          temp = 1;
        } else {
          temp = delta / this.absoluteDeltaSum;
        }

        temp = this.alphaSlowest + temp * this.alphaDiff;
        this.value = this.window[this.efficiencyRatioLength - 1];
        this.value += (sample - this.value) * temp * temp;

        return this.value;
      } else {
        this.windowCount++;
      }
    }

    return Number.NaN;
  }
}
