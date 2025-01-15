import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { T3ExponentialMovingAverageLengthParams } from './t3-exponential-moving-average-params.interface';
import { T3ExponentialMovingAverageSmoothingFactorParams } from './t3-exponential-moving-average-params.interface';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { T3ExponentialMovingAverageParamsComponent } from './t3-exponential-moving-average-params.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'mb-t3-exponential-moving-average-params-dialog',
    templateUrl: './t3-exponential-moving-average-params-dialog.component.html',
    styleUrls: ['./t3-exponential-moving-average-params-dialog.component.scss'],
    imports: [CdkScrollable, MatDialogContent, T3ExponentialMovingAverageParamsComponent, MatDialogActions, MatButton, MatDialogClose, MatIcon]
})
export class T3ExponentialMovingAverageParamsDialogComponent {

  protected params!: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams> =
    new EventEmitter<T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams>();

  constructor(private dialogRef: MatDialogRef<T3ExponentialMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams) {
    this.params = data;
  }

  protected changed(param: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
