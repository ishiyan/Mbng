import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams } from 'mb';
import {  DoubleExponentialMovingAverageParamsComponent, LineStyleSelectorComponent } from 'mb';
import { LineStyle } from 'mb';

import { Dema } from './dema.interface';

@Component({
  selector: 'app-dema-params',
  templateUrl: './dema-params.component.html',
  styleUrls: ['./dema-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    DoubleExponentialMovingAverageParamsComponent
  ]
})
export class DemaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Dema>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Dema>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Dema>();

  protected current!: Dema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
