import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { HilbertTransformerCycleEstimatorParams } from './hilbert-transformer-cycle-estimator-params.interface';
import { HilbertTransformerCycleEstimatorParamsComponent } from './hilbert-transformer-cycle-estimator-params.component';

@Component({
  selector: 'mb-hilbert-transformer-cycle-estimator-params-dialog',
  templateUrl: './hilbert-transformer-cycle-estimator-params-dialog.component.html',
  styleUrls: ['./hilbert-transformer-cycle-estimator-params-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButton,
    MatIcon,
    HilbertTransformerCycleEstimatorParamsComponent
  ]
})
export class HilbertTransformerCycleEstimatorParamsDialogComponent {
  protected data = inject<HilbertTransformerCycleEstimatorParams>(MAT_DIALOG_DATA);

  protected params: HilbertTransformerCycleEstimatorParams = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<HilbertTransformerCycleEstimatorParams>();

  protected changed(param: HilbertTransformerCycleEstimatorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
