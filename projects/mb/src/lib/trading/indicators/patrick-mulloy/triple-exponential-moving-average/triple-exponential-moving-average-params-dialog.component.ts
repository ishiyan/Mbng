import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { TripleExponentialMovingAverageLengthParams } from './triple-exponential-moving-average-params.interface';
import { TripleExponentialMovingAverageSmoothingFactorParams } from './triple-exponential-moving-average-params.interface';
import { TripleExponentialMovingAverageParamsComponent } from './triple-exponential-moving-average-params.component';

@Component({
  selector: 'mb-triple-exponential-moving-average-params-dialog',
  templateUrl: './triple-exponential-moving-average-params-dialog.component.html',
  styleUrls: ['./triple-exponential-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    TripleExponentialMovingAverageParamsComponent,
  ]
})
export class TripleExponentialMovingAverageParamsDialogComponent {
  protected data = inject<TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);
  protected params: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams>();

  protected changed(param: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
