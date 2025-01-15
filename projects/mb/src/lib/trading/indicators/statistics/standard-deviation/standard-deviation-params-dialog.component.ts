import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { StandardDeviationParams } from './standard-deviation-params.interface';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { StandardDeviationParamsComponent } from './standard-deviation-params.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'mb-standard-deviation-params-dialog',
    templateUrl: './standard-deviation-params-dialog.component.html',
    styleUrls: ['./standard-deviation-params-dialog.component.scss'],
    imports: [CdkScrollable, MatDialogContent, StandardDeviationParamsComponent, MatDialogActions, MatButton, MatDialogClose, MatIcon]
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
