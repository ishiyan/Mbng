import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { T2ExponentialMovingAverageLengthParams } from './t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageSmoothingFactorParams } from './t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageParamsComponent } from './t2-exponential-moving-average-params.component';

@Component({
    selector: 'mb-t2-exponential-moving-average-params-dialog',
    templateUrl: './t2-exponential-moving-average-params-dialog.component.html',
    styleUrls: ['./t2-exponential-moving-average-params-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CdkScrollable,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButton,
      MatIcon,
      T2ExponentialMovingAverageParamsComponent
    ]
})
export class T2ExponentialMovingAverageParamsDialogComponent {
  protected data = inject<T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);
  protected params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams>();

  protected changed(param: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
