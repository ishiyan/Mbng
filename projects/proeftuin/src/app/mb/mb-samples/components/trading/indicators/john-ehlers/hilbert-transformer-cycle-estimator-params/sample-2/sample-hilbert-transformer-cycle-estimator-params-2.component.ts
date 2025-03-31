import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { HilbertTransformerCycleEstimatorParams } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-params.interface';
import { HilbertTransformerCycleEstimatorParamsComponent } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-params.component';

@Component({
  selector: 'app-sample-hilbert-transformer-cycle-estimator-params-2',
  templateUrl: './sample-hilbert-transformer-cycle-estimator-params-2.component.html',
  styleUrls: ['./sample-hilbert-transformer-cycle-estimator-params-2.component.scss'],
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
export class SampleHilbertTransformerCycleEstimatorParams2Component {
  protected selected1: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
  };
  protected selected2: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1, warmUpPeriod: 100
  };
  protected initial1: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
  };
  protected initial2: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1, warmUpPeriod: 100
  };
}
