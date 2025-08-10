import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { T3ExponentialMovingAverageLengthParams } from './t3-exponential-moving-average-params.interface';
import { T3ExponentialMovingAverageSmoothingFactorParams } from './t3-exponential-moving-average-params.interface';
import { T3ExponentialMovingAverageParamsComponent } from './t3-exponential-moving-average-params.component';

@Component({
  selector: 'mb-t3-exponential-moving-average-params-dialog',
  templateUrl: './t3-exponential-moving-average-params-dialog.component.html',
  styleUrls: ['./t3-exponential-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    T3ExponentialMovingAverageParamsComponent
  ]
})
export class T3ExponentialMovingAverageParamsDialogComponent {
  protected data = inject<T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);
  protected params: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams>();

  protected changed(param: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
