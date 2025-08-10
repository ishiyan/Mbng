import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { ExponentialMovingAverageLengthParams } from './exponential-moving-average-params.interface';
import { ExponentialMovingAverageSmoothingFactorParams } from './exponential-moving-average-params.interface';
import { ExponentialMovingAverageParamsComponent } from './exponential-moving-average-params.component';

@Component({
  selector: 'mb-exponential-moving-average-params-dialog',
  templateUrl: './exponential-moving-average-params-dialog.component.html',
  styleUrls: ['./exponential-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    ExponentialMovingAverageParamsComponent,
  ]
})
export class ExponentialMovingAverageParamsDialogComponent {
  protected data = inject<ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);

  protected params: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams>();

  protected changed(param: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
