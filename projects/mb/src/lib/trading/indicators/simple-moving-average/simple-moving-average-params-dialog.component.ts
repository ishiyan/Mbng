import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { SimpleMovingAverageParams } from './simple-moving-average-params.interface';
import { SimpleMovingAverageParamsComponent } from './simple-moving-average-params.component';

@Component({
  selector: 'mb-simple-moving-average-params-dialog',
  templateUrl: './simple-moving-average-params-dialog.component.html',
  styleUrls: ['./simple-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButton,
    MatIcon,
    SimpleMovingAverageParamsComponent
  ]
})
export class SimpleMovingAverageParamsDialogComponent {
  protected data = inject<SimpleMovingAverageParams>(MAT_DIALOG_DATA);

  protected params: SimpleMovingAverageParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<SimpleMovingAverageParams>();

  protected changed(param: SimpleMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
