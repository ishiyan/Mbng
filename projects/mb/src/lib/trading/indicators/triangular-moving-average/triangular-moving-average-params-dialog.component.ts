import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { TriangularMovingAverageParams } from './triangular-moving-average-params.interface';
import { TriangularMovingAverageParamsComponent } from './triangular-moving-average-params.component';

@Component({
    selector: 'mb-triangular-moving-average-params-dialog',
    templateUrl: './triangular-moving-average-params-dialog.component.html',
    styleUrls: ['./triangular-moving-average-params-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CdkScrollable,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButton,
      MatIcon,
      TriangularMovingAverageParamsComponent
    ]
})
export class TriangularMovingAverageParamsDialogComponent {
  protected data = inject<TriangularMovingAverageParams>(MAT_DIALOG_DATA);

  protected params: TriangularMovingAverageParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<TriangularMovingAverageParams>();

  protected changed(param: TriangularMovingAverageParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
