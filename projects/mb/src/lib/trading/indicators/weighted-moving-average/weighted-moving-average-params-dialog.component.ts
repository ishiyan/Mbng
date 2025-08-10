import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { WeightedMovingAverageParams } from './weighted-moving-average-params.interface';
import { WeightedMovingAverageParamsComponent } from './weighted-moving-average-params.component';

@Component({
  selector: 'mb-weighted-moving-average-params-dialog',
  templateUrl: './weighted-moving-average-params-dialog.component.html',
  styleUrls: ['./weighted-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    WeightedMovingAverageParamsComponent
  ]
})
export class WeightedMovingAverageParamsDialogComponent {
  protected data = inject<WeightedMovingAverageParams>(MAT_DIALOG_DATA);

  protected params: WeightedMovingAverageParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<WeightedMovingAverageParams>();

  protected changed(param: WeightedMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
