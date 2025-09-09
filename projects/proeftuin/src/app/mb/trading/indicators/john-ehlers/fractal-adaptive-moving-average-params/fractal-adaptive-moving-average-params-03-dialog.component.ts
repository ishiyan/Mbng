import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HilbertTransformerCycleEstimatorType }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/hilbert-transformer/hilbert-transformer-cycle-estimator-type.enum';
import { FractalAdaptiveMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/fractal-adaptive-moving-average/fractal-adaptive-moving-average-params.interface';
import { FractalAdaptiveMovingAverageParamsDialogComponent }
  from 'projects/mb/src/lib/trading/indicators/john-ehlers/fractal-adaptive-moving-average/fractal-adaptive-moving-average-params-dialog.component';
  import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
  import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
  
@Component({
  selector: 'app-mb-fractal-adaptive-moving-average-params-03-dialog',
  templateUrl: './fractal-adaptive-moving-average-params-03-dialog.component.html',
  styleUrls: ['./fractal-adaptive-moving-average-params-03-dialog.component.scss'],
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
export class FractalAdaptiveMovingAverageParams03DialogComponent {
  private dialog = inject(MatDialog);
  private dialogRef1?: MatDialogRef<FractalAdaptiveMovingAverageParamsDialogComponent>;
  private dialogRef2?: MatDialogRef<FractalAdaptiveMovingAverageParamsDialogComponent>;

  protected initial1: FractalAdaptiveMovingAverageParams = {
    length: 16
  };

  protected initial2: FractalAdaptiveMovingAverageParams = {
    length: 16, slowestSmoothingFactor: 0.01,
    barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.SpreadBp
  };

  protected instance1 = signal<FractalAdaptiveMovingAverageParams>(this.initial1)
  protected instance2 = signal<FractalAdaptiveMovingAverageParams>(this.initial2)

  protected openDialog1() {
    this.dialogRef1 = this.dialog.open(FractalAdaptiveMovingAverageParamsDialogComponent, {data: this.instance1()});
    this.dialogRef1.componentInstance.selectionChange.subscribe((p: FractalAdaptiveMovingAverageParams) => {
      this.instance1.set(p);
    });
  }

  protected openDialog2() {
    this.dialogRef2 = this.dialog.open(FractalAdaptiveMovingAverageParamsDialogComponent, {data: this.instance2()});
    this.dialogRef2.componentInstance.selectionChange.subscribe((p: FractalAdaptiveMovingAverageParams) => {
      this.instance2.set(p);
    });
  }
}
