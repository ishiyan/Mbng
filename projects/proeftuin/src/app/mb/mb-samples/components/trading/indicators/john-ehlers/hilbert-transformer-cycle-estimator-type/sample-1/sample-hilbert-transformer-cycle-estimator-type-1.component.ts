import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

import { HilbertTransformerCycleEstimatorType } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-type.enum';
import { HilbertTransformerCycleEstimatorTypeComponent } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-type.component';

@Component({
  selector: 'app-sample-hilbert-transformer-cycle-estimator-type-1',
  templateUrl: './sample-hilbert-transformer-cycle-estimator-type-1.component.html',
  styleUrls: ['./sample-hilbert-transformer-cycle-estimator-type-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    HilbertTransformerCycleEstimatorTypeComponent
  ]
})
export class SampleHilbertTransformerCycleEstimatorType1Component {
  protected default = HilbertTransformerCycleEstimatorType.HomodyneDiscriminator;
  protected initial = HilbertTransformerCycleEstimatorType.DualDifferentiator;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';

  protected selectionChange(log: string, component: HilbertTransformerCycleEstimatorType): string {
    log += ' ' + component + ',' ;
    return log;
  }
}
