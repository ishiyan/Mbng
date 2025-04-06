import { ChangeDetectionStrategy, Component, AfterContentInit, effect, input, output } from '@angular/core';
import { MatSelectChange, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';

import { HilbertTransformerCycleEstimatorType } from './hilbert-transformer-cycle-estimator-type.enum';

interface Comp {
  enumeration: HilbertTransformerCycleEstimatorType;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'mb-hilbert-transformer-cycle-estimator-type',
  templateUrl: './hilbert-transformer-cycle-estimator-type.component.html',
  styleUrls: ['./hilbert-transformer-cycle-estimator-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectTrigger,
    MatOption
  ]
})
export class HilbertTransformerCycleEstimatorTypeComponent implements AfterContentInit {
  private initialized = false;

  protected comps: Comp[] = [
    { enumeration: HilbertTransformerCycleEstimatorType.HomodyneDiscriminator, name: 'Homodyne discriminator', selected: false },
    { enumeration: HilbertTransformerCycleEstimatorType.HomodyneDiscriminatorUnrolled, name: 'Homodyne discriminator unrolled', selected: false },
    { enumeration: HilbertTransformerCycleEstimatorType.PhaseAccumulator, name: 'Phase accumulator', selected: false },
    { enumeration: HilbertTransformerCycleEstimatorType.DualDifferentiator, name: 'Dual differentiator', selected: false }
  ];

  protected compSelected = this.comps[HilbertTransformerCycleEstimatorType.HomodyneDiscriminator.valueOf()];

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<HilbertTransformerCycleEstimatorType>();

  /** A label to display above the selector. */
  readonly label = input('Estimator type');

  protected selectionChanged(selection: MatSelectChange) {
    this.notify(selection.value.enumeration);
  }

  /** Specifies an initial value. */
  initial = input.required<HilbertTransformerCycleEstimatorType>();

  constructor() {
    effect(() => {
      const idxNew = this.initial().valueOf();
      const idxOld = this.compSelected.enumeration.valueOf();
      this.comps[idxOld].selected = false;
      this.comps[idxNew].selected = true;
      this.compSelected = this.comps[idxNew];
    });
  }

  ngAfterContentInit() {
    this.initialized = true;
    this.notify(this.compSelected.enumeration);
  }

  private notify(value: HilbertTransformerCycleEstimatorType) {
    if (this.initialized) {
      this.selectionChange.emit(value);
    }
  }
}
