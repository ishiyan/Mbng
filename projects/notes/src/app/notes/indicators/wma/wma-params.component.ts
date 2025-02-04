import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { LineStyle, WeightedMovingAverageParamsComponent, LineStyleSelectorComponent } from 'mb';
import { WeightedMovingAverageParams } from 'mb';

import { Wma } from './wma.interface';

@Component({
  selector: 'app-wma-params',
  templateUrl: './wma-params.component.html',
  styleUrls: ['./wma-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconButton,
    MatIcon,
    LineStyleSelectorComponent,
    WeightedMovingAverageParamsComponent,
  ]
})
export class WmaParamsComponent {
  /** Specifies the input values. */
  readonly initial = input.required<Wma>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Wma>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Wma>();

  protected current!: Wma;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: WeightedMovingAverageParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
