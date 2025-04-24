import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { HilbertTransformerCycleEstimatorType }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-type.enum';
import { MesaAdaptiveMovingAverageLengthParams, MesaAdaptiveMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/mesa-adaptive-moving-average/mesa-adaptive-moving-average-params.interface';
import { MesaAdaptiveMovingAverageParamsComponent }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/mesa-adaptive-moving-average/mesa-adaptive-moving-average-params.component';
import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
  
@Component({
  selector: 'app-sample-mesa-adaptive-moving-average-params-2',
  templateUrl: './sample-mesa-adaptive-moving-average-params-2.component.html',
  styleUrls: ['./sample-mesa-adaptive-moving-average-params-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MesaAdaptiveMovingAverageParamsComponent
  ]
})
export class SampleMesaAdaptiveMovingAverageParams2Component {
  protected selected1: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39
  };
  protected initial1: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39
  };

  protected selected2: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05
  };
  protected initial2: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05
  };

  protected selected3: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator
  };
  protected initial3: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator
  };

  protected selected4: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator
  };
  protected initial4: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator
  };

  protected selected5: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    barComponent: BarComponent.Median
  };
  protected initial5: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    barComponent: BarComponent.Median
  };

  protected selected6: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    barComponent: BarComponent.Typical
  };
  protected initial6: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    barComponent: BarComponent.Typical
  };

  protected selected7: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    quoteComponent: QuoteComponent.Weighted
  };
  protected initial7: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    quoteComponent: QuoteComponent.Weighted
  };

  protected selected8: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    quoteComponent: QuoteComponent.SpreadBp
  };
  protected initial8: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    quoteComponent: QuoteComponent.SpreadBp
  };

  protected selected9: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    barComponent: BarComponent.Median, quoteComponent: QuoteComponent.Weighted
  };
  protected initial9: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    barComponent: BarComponent.Median, quoteComponent: QuoteComponent.Weighted
  };

  protected selected10: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };
  protected initial10: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };

  
  protected selected11: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    estimatorParams: {
      smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
    },
    barComponent: BarComponent.Median, quoteComponent: QuoteComponent.Weighted
  };
  protected initial11: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.PhaseAccumulator,
    estimatorParams: {
      smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
    },
    barComponent: BarComponent.Median, quoteComponent: QuoteComponent.Weighted
  };

  protected selected12: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    estimatorParams: {
      smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2, warmUpPeriod: 100
    },
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };
  protected initial12: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    estimatorParams: {
      smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2, warmUpPeriod: 100
    },
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };
}
