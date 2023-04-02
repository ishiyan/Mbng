import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StandardDeviationParams } from './standard-deviation-params.interface';

@Component({
  selector: 'mb-standard-deviation-params-dialog',
  templateUrl: './standard-deviation-params-dialog.component.html',
  styleUrls: ['./standard-deviation-params-dialog.component.scss']
})
export class StandardDeviationParamsDialogComponent {

  protected params!: StandardDeviationParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<StandardDeviationParams> = new EventEmitter<StandardDeviationParams>();

  constructor(private dialogRef: MatDialogRef<StandardDeviationParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: StandardDeviationParams) {
    this.params = data;
  }

  protected changed(param: StandardDeviationParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
