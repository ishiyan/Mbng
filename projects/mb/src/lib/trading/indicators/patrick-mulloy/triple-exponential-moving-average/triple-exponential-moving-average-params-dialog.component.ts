import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { TripleExponentialMovingAverageLengthParams } from './triple-exponential-moving-average-params.interface';
import { TripleExponentialMovingAverageSmoothingFactorParams } from './triple-exponential-moving-average-params.interface';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TripleExponentialMovingAverageParamsComponent } from './triple-exponential-moving-average-params.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'mb-triple-exponential-moving-average-params-dialog',
    templateUrl: './triple-exponential-moving-average-params-dialog.component.html',
    styleUrls: ['./triple-exponential-moving-average-params-dialog.component.scss'],
    imports: [CdkScrollable, MatDialogContent, TripleExponentialMovingAverageParamsComponent, MatDialogActions, MatButton, MatDialogClose, MatIcon]
})
export class TripleExponentialMovingAverageParamsDialogComponent {

  protected params!: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams> =
    new EventEmitter<TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams>();

  constructor(private dialogRef: MatDialogRef<TripleExponentialMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams) {
    this.params = data;
  }

  protected changed(param: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
