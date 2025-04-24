import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { MesaAdaptiveMovingAverageLengthParams } from './mesa-adaptive-moving-average-params.interface';
import { MesaAdaptiveMovingAverageSmoothingFactorParams } from './mesa-adaptive-moving-average-params.interface';
import { MesaAdaptiveMovingAverageParamsComponent } from './mesa-adaptive-moving-average-params.component';

@Component({
  selector: 'mb-mesa-adaptive-moving-average-params-dialog',
  templateUrl: './mesa-adaptive-moving-average-params-dialog.component.html',
  styleUrls: ['./mesa-adaptive-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    MesaAdaptiveMovingAverageParamsComponent
  ]
})
export class MesaAdaptiveMovingAverageParamsDialogComponent {
  protected data = inject<MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);
  protected params: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams>();

  protected changed(param: MesaAdaptiveMovingAverageLengthParams | MesaAdaptiveMovingAverageSmoothingFactorParams) {
    this.selectionChange.emit(param);
  }
}
