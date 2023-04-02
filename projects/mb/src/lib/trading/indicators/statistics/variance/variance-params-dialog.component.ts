import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { VarianceParams } from './variance-params.interface';

@Component({
  selector: 'mb-variance-params-dialog',
  templateUrl: './variance-params-dialog.component.html',
  styleUrls: ['./variance-params-dialog.component.scss']
})
export class VarianceParamsDialogComponent {

  protected params!: VarianceParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<VarianceParams> = new EventEmitter<VarianceParams>();

  constructor(private dialogRef: MatDialogRef<VarianceParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: VarianceParams) {
    this.params = data;
  }

  protected changed(param: VarianceParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
