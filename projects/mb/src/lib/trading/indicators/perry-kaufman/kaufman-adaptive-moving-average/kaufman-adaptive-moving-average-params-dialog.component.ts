import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { KaufmanAdaptiveMovingAverageLengthParams } from './kaufman-adaptive-moving-average-params.interface';
import { KaufmanAdaptiveMovingAverageSmoothingFactorParams } from './kaufman-adaptive-moving-average-params.interface';

@Component({
    selector: 'mb-kaufman-adaptive-moving-average-params-dialog',
    templateUrl: './kaufman-adaptive-moving-average-params-dialog.component.html',
    styleUrls: ['./kaufman-adaptive-moving-average-params-dialog.component.scss'],
    standalone: false
})
export class KaufmanAdaptiveMovingAverageParamsDialogComponent {

  protected params!: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams> =
    new EventEmitter<KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams>();

  constructor(private dialogRef: MatDialogRef<KaufmanAdaptiveMovingAverageParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams) {
    this.params = data;
  }

  protected changed(param: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams) {
    this.params = param;
    this.selectionChange.emit(this.params);
  }
}
