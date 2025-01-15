import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { TriangularMovingAverageParams } from './triangular-moving-average-params.interface';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TriangularMovingAverageParamsComponent } from './triangular-moving-average-params.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'mb-triangular-moving-average-params-dialog',
    templateUrl: './triangular-moving-average-params-dialog.component.html',
    styleUrls: ['./triangular-moving-average-params-dialog.component.scss'],
    imports: [CdkScrollable, MatDialogContent, TriangularMovingAverageParamsComponent, MatDialogActions, MatButton, MatDialogClose, MatIcon]
})
export class TriangularMovingAverageParamsDialogComponent {

  protected params!: TriangularMovingAverageParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<TriangularMovingAverageParams> = new EventEmitter<TriangularMovingAverageParams>();

  constructor(private dialogRef: MatDialogRef<TriangularMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: TriangularMovingAverageParams) {
    this.params = data;
  }

  protected changed(param: TriangularMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
