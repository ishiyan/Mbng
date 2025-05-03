import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { FractalAdaptiveMovingAverageParams } from './fractal-adaptive-moving-average-params.interface';
import { FractalAdaptiveMovingAverageParamsComponent } from './fractal-adaptive-moving-average-params.component';

@Component({
  selector: 'mb-fractal-adaptive-moving-average-params-dialog',
  templateUrl: './fractal-adaptive-moving-average-params-dialog.component.html',
  styleUrls: ['./fractal-adaptive-moving-average-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    FractalAdaptiveMovingAverageParamsComponent
  ]
})
export class FractalAdaptiveMovingAverageParamsDialogComponent {
  protected data = inject<FractalAdaptiveMovingAverageParams>(MAT_DIALOG_DATA);
  protected params: FractalAdaptiveMovingAverageParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<FractalAdaptiveMovingAverageParams>();

  protected changed(param: FractalAdaptiveMovingAverageParams) {
    this.selectionChange.emit(param);
  }
}
