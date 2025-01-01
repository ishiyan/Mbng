import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { T2ExponentialMovingAverageLengthParams } from './t2-exponential-moving-average-params.interface';
import { T2ExponentialMovingAverageSmoothingFactorParams } from './t2-exponential-moving-average-params.interface';

@Component({
    selector: 'mb-t2-exponential-moving-average-params-dialog',
    templateUrl: './t2-exponential-moving-average-params-dialog.component.html',
    styleUrls: ['./t2-exponential-moving-average-params-dialog.component.scss'],
    standalone: false
})
export class T2ExponentialMovingAverageParamsDialogComponent {

  protected params!: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams> =
    new EventEmitter<T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams>();

  constructor(private dialogRef: MatDialogRef<T2ExponentialMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams) {
    this.params = data;
  }

  protected changed(param: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
