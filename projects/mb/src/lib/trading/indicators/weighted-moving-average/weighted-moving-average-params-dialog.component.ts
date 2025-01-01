import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WeightedMovingAverageParams } from './weighted-moving-average-params.interface';

@Component({
    selector: 'mb-weighted-moving-average-params-dialog',
    templateUrl: './weighted-moving-average-params-dialog.component.html',
    styleUrls: ['./weighted-moving-average-params-dialog.component.scss'],
    standalone: false
})
export class WeightedMovingAverageParamsDialogComponent {

  protected params!: WeightedMovingAverageParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<WeightedMovingAverageParams> = new EventEmitter<WeightedMovingAverageParams>();

  constructor(private dialogRef: MatDialogRef<WeightedMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: WeightedMovingAverageParams) {
    this.params = data;
  }

  protected changed(param: WeightedMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
