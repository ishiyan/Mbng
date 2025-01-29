import { Component, output, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimpleMovingAverageParams } from './simple-moving-average-params.interface';

@Component({
  selector: 'mb-simple-moving-average-params-dialog',
  templateUrl: './simple-moving-average-params-dialog.component.html',
  styleUrls: ['./simple-moving-average-params-dialog.component.scss']
})
export class SimpleMovingAverageParamsDialogComponent {
  private dialogRef = inject<MatDialogRef<SimpleMovingAverageParamsDialogComponent>>(MatDialogRef);
  protected data = inject<SimpleMovingAverageParams>(MAT_DIALOG_DATA);


  protected params!: SimpleMovingAverageParams;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<SimpleMovingAverageParams>();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const data = this.data;

    this.params = data;
  }

  protected changed(param: SimpleMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
