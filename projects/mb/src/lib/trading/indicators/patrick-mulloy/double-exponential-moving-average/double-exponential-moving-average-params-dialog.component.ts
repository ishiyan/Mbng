import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DoubleExponentialMovingAverageLengthParams } from './double-exponential-moving-average-params.interface';
import { DoubleExponentialMovingAverageSmoothingFactorParams } from './double-exponential-moving-average-params.interface';

@Component({
    selector: 'mb-double-exponential-moving-average-params-dialog',
    templateUrl: './double-exponential-moving-average-params-dialog.component.html',
    styleUrls: ['./double-exponential-moving-average-params-dialog.component.scss'],
    standalone: false
})
export class DoubleExponentialMovingAverageParamsDialogComponent {

  protected params!: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams> =
    new EventEmitter<DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams>();

  constructor(private dialogRef: MatDialogRef<DoubleExponentialMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams) {
    this.params = data;
  }

  protected changed(param: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
