import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimpleMovingAverageParams } from './simple-moving-average-params.interface';

@Component({
    selector: 'mb-simple-moving-average-params-dialog',
    templateUrl: './simple-moving-average-params-dialog.component.html',
    styleUrls: ['./simple-moving-average-params-dialog.component.scss'],
    standalone: false
})
export class SimpleMovingAverageParamsDialogComponent {

  protected params!: SimpleMovingAverageParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<SimpleMovingAverageParams> = new EventEmitter<SimpleMovingAverageParams>();

  constructor(private dialogRef: MatDialogRef<SimpleMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: SimpleMovingAverageParams) {
    this.params = data;
  }

  protected changed(param: SimpleMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
