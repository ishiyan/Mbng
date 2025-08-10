import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { StandardDeviationParams } from './standard-deviation-params.interface';
import { StandardDeviationParamsComponent } from './standard-deviation-params.component';

@Component({
  selector: 'mb-standard-deviation-params-dialog',
  templateUrl: './standard-deviation-params-dialog.component.html',
  styleUrls: ['./standard-deviation-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    StandardDeviationParamsComponent,
  ]
})
export class StandardDeviationParamsDialogComponent {
  protected data = inject<StandardDeviationParams>(MAT_DIALOG_DATA);
  protected params: StandardDeviationParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<StandardDeviationParams>();

  protected changed(param: StandardDeviationParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
