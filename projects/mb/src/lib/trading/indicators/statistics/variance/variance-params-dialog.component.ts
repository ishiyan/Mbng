import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { VarianceParams } from './variance-params.interface';
import { VarianceParamsComponent } from './variance-params.component';

@Component({
  selector: 'mb-variance-params-dialog',
  templateUrl: './variance-params-dialog.component.html',
  styleUrls: ['./variance-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    VarianceParamsComponent
  ]
})
export class VarianceParamsDialogComponent {
  protected data = inject<VarianceParams>(MAT_DIALOG_DATA);
  protected params: VarianceParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<VarianceParams>();

  protected changed(param: VarianceParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
