import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { HilbertTransformerCycleEstimatorParams } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-params.interface';
import { HilbertTransformerCycleEstimatorParamsComponent } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-params.component';

@Component({
  selector: 'app-mb-hilbert-transformer-cycle-estimator-params-01-parameters',
  templateUrl: './hilbert-transformer-cycle-estimator-params-01-parameters.component.html',
  styleUrls: ['./hilbert-transformer-cycle-estimator-params-01-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    HilbertTransformerCycleEstimatorParamsComponent
  ]
})
export class HilbertTransformerCycleEstimatorParams01ParametersComponent {
  protected selected1: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
  };
  protected selected2: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1
  };
  protected selected3: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1, warmUpPeriod: 100
  };
  protected initial1: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
  };
  protected initial2: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1
  };
  protected initial3: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1, warmUpPeriod: 100
  };
}
