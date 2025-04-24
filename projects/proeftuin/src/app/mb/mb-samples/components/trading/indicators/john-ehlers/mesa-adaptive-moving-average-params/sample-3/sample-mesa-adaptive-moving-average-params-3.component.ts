import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HilbertTransformerCycleEstimatorType }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-type.enum';
import { MesaAdaptiveMovingAverageLengthParams, MesaAdaptiveMovingAverageSmoothingFactorParams }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/mesa-adaptive-moving-average/mesa-adaptive-moving-average-params.interface';
import { MesaAdaptiveMovingAverageParamsDialogComponent }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/mesa-adaptive-moving-average/mesa-adaptive-moving-average-params-dialog.component';
  import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
  import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
  
@Component({
  selector: 'app-sample-mesa-adaptive-moving-average-params-3',
  templateUrl: './sample-mesa-adaptive-moving-average-params-3.component.html',
  styleUrls: ['./sample-mesa-adaptive-moving-average-params-3.component.scss'],
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
export class SampleMesaAdaptiveMovingAverageParams3Component {
  private dialog = inject(MatDialog);
  private dialogRef1?: MatDialogRef<MesaAdaptiveMovingAverageParamsDialogComponent>;
  private dialogRef2?: MatDialogRef<MesaAdaptiveMovingAverageParamsDialogComponent>;

  protected initial1: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitLength: 3, slowLimitLength: 39,
    estimatorType: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator
  };

  protected initial2: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = {
    fastLimitSmoothingFactor: 0.5, slowLimitSmoothingFactor: 0.05,
    estimatorType: HilbertTransformerCycleEstimatorType.DualDifferentiator,
    estimatorParams: {
      smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2, warmUpPeriod: 100
    },
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };

  protected instance1 = signal<MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams>(this.initial1)
  protected instance2 = signal<MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams>(this.initial2)

  protected openDialog1() {
    this.dialogRef1 = this.dialog.open(MesaAdaptiveMovingAverageParamsDialogComponent, {data: this.instance1()});
    this.dialogRef1.componentInstance.selectionChange.subscribe((p: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams) => {
      this.instance1.set(p);
    });
  }

  protected openDialog2() {
    this.dialogRef2 = this.dialog.open(MesaAdaptiveMovingAverageParamsDialogComponent, {data: this.instance2()});
    this.dialogRef2.componentInstance.selectionChange.subscribe((p: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams) => {
      this.instance2.set(p);
    });
  }
}
