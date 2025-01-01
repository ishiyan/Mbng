import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ExponentialMovingAverageLengthParams } from './exponential-moving-average-params.interface';
import { ExponentialMovingAverageSmoothingFactorParams } from './exponential-moving-average-params.interface';

@Component({
    selector: 'mb-exponential-moving-average-params-dialog',
    templateUrl: './exponential-moving-average-params-dialog.component.html',
    styleUrls: ['./exponential-moving-average-params-dialog.component.scss'],
    standalone: false
})
export class ExponentialMovingAverageParamsDialogComponent {

  protected params!: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams> =
    new EventEmitter<ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams>();

  constructor(private dialogRef: MatDialogRef<ExponentialMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams) {
    this.params = data;
  }

  protected changed(param: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
