import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { ExponentialMovingAverageParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Ema } from './ema.interface';

@Component({
  selector: 'app-ema-params',
  templateUrl: './ema-params.component.html',
  styleUrls: ['./ema-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    ExponentialMovingAverageParamsComponent
  ]
})
export class EmaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Ema>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Ema>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Ema>();

  protected current!: Ema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: ExponentialMovingAverageLengthParams | ExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
