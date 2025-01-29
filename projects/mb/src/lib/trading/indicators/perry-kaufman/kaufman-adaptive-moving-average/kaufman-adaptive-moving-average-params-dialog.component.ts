import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { KaufmanAdaptiveMovingAverageLengthParams } from './kaufman-adaptive-moving-average-params.interface';
import { KaufmanAdaptiveMovingAverageSmoothingFactorParams } from './kaufman-adaptive-moving-average-params.interface';
import { KaufmanAdaptiveMovingAverageParamsComponent } from './kaufman-adaptive-moving-average-params.component';

@Component({
    selector: 'mb-kaufman-adaptive-moving-average-params-dialog',
    templateUrl: './kaufman-adaptive-moving-average-params-dialog.component.html',
    styleUrls: ['./kaufman-adaptive-moving-average-params-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CdkScrollable,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButton,
      MatIcon,
      KaufmanAdaptiveMovingAverageParamsComponent
    ]
})
export class KaufmanAdaptiveMovingAverageParamsDialogComponent {
  protected data = inject<KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams>(MAT_DIALOG_DATA);
  protected params: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams>();

  protected changed(param: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
