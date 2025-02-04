import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { T3ExponentialMovingAverageLengthParams, T3ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { T3ExponentialMovingAverageParamsComponent, LineStyleSelectorComponent } from 'mb';
import { LineStyle } from 'mb';

import { T3ema } from './t3ema.interface';

@Component({
  selector: 'app-t3ema-params',
  templateUrl: './t3ema-params.component.html',
  styleUrls: ['./t3ema-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    T3ExponentialMovingAverageParamsComponent
  ]
})
export class T3emaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<T3ema>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<T3ema>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<T3ema>();

  protected current!: T3ema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
