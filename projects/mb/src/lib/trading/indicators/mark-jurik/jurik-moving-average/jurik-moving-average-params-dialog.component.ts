import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { JurikMovingAverageParams } from './jurik-moving-average-params.interface';
import { JurikMovingAverageParamsComponent } from './jurik-moving-average-params.component';

@Component({
  selector: 'mb-jurik-moving-average-params-dialog',
  templateUrl: './jurik-moving-average-params-dialog.component.html',
  styleUrls: ['./jurik-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButton,
    MatIcon,
    JurikMovingAverageParamsComponent
  ]
})
export class JurikMovingAverageParamsDialogComponent {
  protected data = inject<JurikMovingAverageParams>(MAT_DIALOG_DATA);

  protected params: JurikMovingAverageParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<JurikMovingAverageParams>();

  protected changed(param: JurikMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
