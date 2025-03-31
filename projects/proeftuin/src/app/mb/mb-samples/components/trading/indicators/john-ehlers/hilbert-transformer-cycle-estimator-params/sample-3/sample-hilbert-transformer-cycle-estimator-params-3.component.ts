import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HilbertTransformerCycleEstimatorParams } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-params.interface';
import { HilbertTransformerCycleEstimatorParamsDialogComponent } from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-params-dialog.component';

@Component({
  selector: 'app-sample-hilbert-transformer-cycle-estimator-params-3',
  templateUrl: './sample-hilbert-transformer-cycle-estimator-params-3.component.html',
  styleUrls: ['./sample-hilbert-transformer-cycle-estimator-params-3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ]
})
export class SampleHilbertTransformerCycleEstimatorParams3Component {
  private dialog = inject(MatDialog);
  private dialogRef1?: MatDialogRef<HilbertTransformerCycleEstimatorParamsDialogComponent>;
  private dialogRef2?: MatDialogRef<HilbertTransformerCycleEstimatorParamsDialogComponent>;

  protected initial1: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2
  };

  protected initial2: HilbertTransformerCycleEstimatorParams = {
    smoothingLength: 3, alphaEmaQuadratureInPhase: 0.3, alphaEmaPeriod: 0.1, warmUpPeriod: 100
  };

  protected instance1 = signal<HilbertTransformerCycleEstimatorParams>(this.initial1)
  protected instance2 = signal<HilbertTransformerCycleEstimatorParams>(this.initial2)

  protected openDialog1() {
    this.dialogRef1 = this.dialog.open(HilbertTransformerCycleEstimatorParamsDialogComponent, {data: this.instance1()});
    this.dialogRef1.componentInstance.selectionChange.subscribe((jp: HilbertTransformerCycleEstimatorParams) => {
      this.instance1.set(jp);
    });
  }

  protected openDialog2() {
    this.dialogRef2 = this.dialog.open(HilbertTransformerCycleEstimatorParamsDialogComponent, {data: this.instance2()});
    this.dialogRef2.componentInstance.selectionChange.subscribe((jp: HilbertTransformerCycleEstimatorParams) => {
      this.instance2.set(jp);
    });
  }
}
