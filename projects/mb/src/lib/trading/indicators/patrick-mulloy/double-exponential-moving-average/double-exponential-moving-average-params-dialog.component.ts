import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { DoubleExponentialMovingAverageLengthParams } from './double-exponential-moving-average-params.interface';
import { DoubleExponentialMovingAverageSmoothingFactorParams } from './double-exponential-moving-average-params.interface';
import { DoubleExponentialMovingAverageParamsComponent } from './double-exponential-moving-average-params.component';

@Component({
  selector: 'mb-double-exponential-moving-average-params-dialog',
  templateUrl: './double-exponential-moving-average-params-dialog.component.html',
  styleUrls: ['./double-exponential-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    DoubleExponentialMovingAverageParamsComponent,
  ]
})
export class DoubleExponentialMovingAverageParamsDialogComponent {
  protected data = inject<DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);
  protected params: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams>();

  protected changed(param: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
