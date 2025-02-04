import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { T2ExponentialMovingAverageParamsComponent, LineStyleSelectorComponent } from 'mb';
import { LineStyle } from 'mb';

import { T2ema } from './t2ema.interface';

@Component({
  selector: 'app-t2ema-params',
  templateUrl: './t2ema-params.component.html',
  styleUrls: ['./t2ema-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    T2ExponentialMovingAverageParamsComponent
  ]
})
export class T2emaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<T2ema>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<T2ema>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<T2ema>();

  protected current!: T2ema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
