import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BarComponent } from 'projects/mb/src/lib/data/entities/bar-component.enum';
import { QuoteComponent } from 'projects/mb/src/lib/data/entities/quote-component.enum';
import { JurikMovingAverageParams }
  from 'projects/mb/src/lib/trading/indicators/mark-jurik/jurik-moving-average/jurik-moving-average-params.interface';
import { JurikMovingAverageParamsDialogComponent }
  from 'projects/mb/src/lib/trading/indicators/mark-jurik/jurik-moving-average/jurik-moving-average-params-dialog.component';

@Component({
  selector: 'app-sample-jurik-moving-average-3',
  templateUrl: './sample-jurik-moving-average-3.component.html',
  styleUrls: ['./sample-jurik-moving-average-3.component.scss'],
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
export class SampleJurikMovingAverage3Component {
  private dialog = inject(MatDialog);
  private dialogRef1?: MatDialogRef<JurikMovingAverageParamsDialogComponent>;
  private dialogRef2?: MatDialogRef<JurikMovingAverageParamsDialogComponent>;

  protected initial1: JurikMovingAverageParams = {
    length: 6, phase: 0, barComponent: BarComponent.Close, quoteComponent: QuoteComponent.Mid
  };

  protected initial2: JurikMovingAverageParams = {
    length: 17, phase: -50, barComponent: BarComponent.Typical, quoteComponent: QuoteComponent.WeightedMid
  };

  protected instance1 = signal<JurikMovingAverageParams>(this.initial1)
  protected instance2 = signal<JurikMovingAverageParams>(this.initial2)

  protected openDialog1() {
    this.dialogRef1 = this.dialog.open(JurikMovingAverageParamsDialogComponent, {data: this.instance1()});
    this.dialogRef1.componentInstance.selectionChange.subscribe((jp: JurikMovingAverageParams) => {
      this.instance1.set(jp);
    });
  }

  protected openDialog2() {
    this.dialogRef2 = this.dialog.open(JurikMovingAverageParamsDialogComponent, {data: this.instance2()});
    this.dialogRef2.componentInstance.selectionChange.subscribe((jp: JurikMovingAverageParams) => {
      this.instance2.set(jp);
    });
  }
}
